# Linslade Galaxy FC — Admin Panel Setup

This document explains how to access and set up the admin panel. There are two steps: creating a GitHub token, and logging in with the admin password.

---

## Who needs to do what

| Task | Who |
|---|---|
| Create the GitHub token | **Philip** (one-time, ~5 minutes) |
| Set the admin password | **Siobhan** (one-time, via Settings tab) |
| Day-to-day admin use | **Philip** |

---

## Step 1 — Create a GitHub Personal Access Token (Philip)

The admin panel saves changes directly to the website's files on GitHub. To do this it needs a **Personal Access Token (PAT)** — a kind of password that lets the admin panel make changes on your behalf.

### 1a — Create a GitHub account (if you don't have one)

Go to [github.com](https://github.com) and sign up for a free account.

Siobhan then needs to add you as a collaborator:
- She goes to: `github.com/siobhankoshodge/linslade-galaxy-fc` → **Settings** → **Collaborators** → **Add people** → enter your GitHub username

You will receive an email invitation — click **Accept invitation**.

### 1b — Create the token

1. Sign in to [github.com](https://github.com)
2. Click your profile picture (top right) → **Settings**
3. Scroll to the bottom of the left sidebar → click **Developer settings**
4. Click **Personal access tokens** → **Fine-grained tokens**
5. Click **Generate new token**
6. Fill in:
   - **Token name:** `Linslade Galaxy FC Admin`
   - **Expiration:** 1 year (or "No expiration")
   - **Repository access:** select **Only select repositories** → choose `linslade-galaxy-fc`
7. Under **Repository permissions**, find **Contents** and set it to **Read and write**
8. Click **Generate token** at the bottom
9. **Copy the token immediately** — GitHub only shows it once. It starts with `github_pat_`

Store it somewhere safe (e.g. your phone's notes app or a password manager). You will need to paste it into the admin panel each time you log in.

---

## Step 2 — Log in to the admin panel

**Admin URL:** `https://siobhankoshodge.github.io/linslade-galaxy-fc/admin/`

1. Go to the URL above
2. Enter the **admin password** (ask Siobhan for this)
3. Click **Continue**
4. Paste your **GitHub token** into the token field
5. Click **Enter admin**

You are now logged in. Changes take about 30 seconds to appear on the live site.

> **Note:** The token is only kept while your browser tab is open. Next time you visit the admin, you will need to paste it again. This is intentional — it keeps the site secure.

---

## For Siobhan — setting the admin password

The default password (`galaxyfc`) must be changed before giving Philip access.

1. Log in to the admin panel using the default password and your GitHub token
2. Go to the **Settings** tab
3. Enter a new password (at least 8 characters) and confirm it
4. Click **Save new password**
5. Share the new password with Philip securely (e.g. by phone or Signal — not email)

You can change the password again at any time from the Settings tab.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "Incorrect password" | Check caps lock. Ask Siobhan to confirm the password or reset it via Settings. |
| "Invalid token" | The token may have expired. Create a new one following Step 1b above. |
| "Token lacks permission" | When creating the token, make sure **Contents** is set to **Read and write** (not just Read). |
| Changes not appearing on the site | Wait 60 seconds and refresh. GitHub Pages can take up to 2 minutes to rebuild. |
| "Could not reach GitHub API" | Check your internet connection. |

---

## What the admin panel can do

| Tab | What you can edit |
|---|---|
| **News** | Add, edit and delete news articles. Set which article is featured on the homepage. |
| **Fixtures** | Add, edit and delete upcoming fixtures for any team. |
| **Results** | Add, edit and delete match results for any team. |
| **Teams** | Edit the manager name, training times and description for each of the 25 teams. |
| **Sponsors** | Add, edit and delete club sponsors. |
| **FA Embeds** | Enter FA Full-Time lrcodes once provided by MKDDL and Beds Girls League secretaries. |

---

*Last updated: June 2026*
