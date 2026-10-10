import { createHmac, timingSafeEqual } from 'node:crypto';

const REPO = 'siobhankoshodge/linslade-galaxy-fc';
const BRANCH = 'main';
const GITHUB_API = `https://api.github.com/repos/${REPO}/contents/`;
const SESSION_SECONDS = 8 * 60 * 60;

const JSON_PATHS = new Set([
  'data/news.json',
  'data/fixtures.json',
  'data/results.json',
  'data/teams.json',
  'data/sponsors.json',
  'data/embeds.json'
]);

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    },
    body: JSON.stringify(body)
  };
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.GITHUB_ADMIN_TOKEN || '';
}

function sign(value) {
  return createHmac('sha256', sessionSecret()).update(value).digest('base64url');
}

function createSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function validSession(event) {
  const header = event.headers.authorization || event.headers.Authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !sessionSecret()) return false;
  if (!safeEqual(signature, sign(payload))) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number(data.exp) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function allowedPath(path) {
  if (JSON_PATHS.has(path)) return true;
  return /^images(?:\/sponsors)?\/[a-z0-9][a-z0-9-]*\.(?:png|jpe?g|webp)$/i.test(path);
}

async function github(path, options = {}) {
  const token = process.env.GITHUB_ADMIN_TOKEN;
  if (!token) throw new Error('GITHUB_ADMIN_TOKEN is not configured in Netlify.');

  const result = await fetch(GITHUB_API + path.split('/').map(encodeURIComponent).join('/'), {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const data = await result.json().catch(() => ({}));
  if (!result.ok) {
    const error = new Error(data.message || `GitHub request failed (${result.status}).`);
    error.statusCode = result.status;
    throw error;
  }
  return data;
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return response(405, { error: 'Method not allowed.' });

  let input;
  try {
    input = JSON.parse(event.body || '{}');
  } catch {
    return response(400, { error: 'Invalid request.' });
  }

  if (input.action === 'login') {
    const configuredPassword = process.env.ADMIN_PASSWORD || '';
    if (!configuredPassword || !sessionSecret() || !process.env.GITHUB_ADMIN_TOKEN) {
      return response(503, { error: 'Admin access has not been configured in Netlify yet.' });
    }
    if (!safeEqual(input.password || '', configuredPassword)) {
      return response(401, { error: 'Incorrect password.' });
    }
    return response(200, { session: createSession(), expiresIn: SESSION_SECONDS });
  }

  if (!validSession(event)) return response(401, { error: 'Your admin session has expired. Please sign in again.' });
  if (!allowedPath(input.path || '')) return response(400, { error: 'That file cannot be managed through the admin panel.' });

  try {
    if (input.action === 'get') {
      return response(200, await github(input.path));
    }

    if (input.action === 'put') {
      if (typeof input.content !== 'string' || input.content.length > 7_000_000) {
        return response(413, { error: 'The file is too large.' });
      }
      const body = {
        message: String(input.message || 'Update website content').slice(0, 120),
        content: input.content,
        branch: BRANCH
      };
      if (input.sha) body.sha = input.sha;
      return response(200, await github(input.path, { method: 'PUT', body: JSON.stringify(body) }));
    }

    return response(400, { error: 'Unknown action.' });
  } catch (error) {
    return response(error.statusCode || 500, { error: error.message || 'Admin request failed.' });
  }
}
