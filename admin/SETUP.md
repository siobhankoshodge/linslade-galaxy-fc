# Linslade Galaxy FC — Admin Panel

The admin panel is available at:

`https://linsladegalaxyfc.co.uk/admin/`

Administrators sign in with the club's admin password. They do not need a GitHub account or a GitHub token.

## One-time setup for Siobhan

In Netlify, open the Linslade Galaxy project and go to **Project configuration → Environment variables**. Add:

| Variable | Value |
|---|---|
| `GITHUB_ADMIN_TOKEN` | The fine-grained GitHub token for `siobhankoshodge/linslade-galaxy-fc`, with Contents read/write access |
| `ADMIN_PASSWORD` | A strong password to share securely with approved administrators |
| `ADMIN_SESSION_SECRET` | A separate long random value used to protect login sessions |

After saving the variables, trigger a new Netlify deployment.

## Day-to-day use

1. Visit `https://linsladegalaxyfc.co.uk/admin/`.
2. Enter the admin password.
3. Make and save the required changes.
4. Sign out when finished.

Admin sessions last up to eight hours and are cleared from the browser when the user signs out. The GitHub token remains private inside Netlify.

## Changing access

- To change the shared admin password, update `ADMIN_PASSWORD` in Netlify and redeploy.
- To revoke publishing access, revoke the fine-grained token in GitHub and replace `GITHUB_ADMIN_TOKEN` in Netlify.
- Keep the token and environment-variable values out of email, chat and the website repository.

## What the admin panel can do

| Tab | What you can edit |
|---|---|
| **News** | Add, edit and delete news articles, including the homepage feature |
| **Fixtures** | Add, edit and delete upcoming fixtures |
| **Results** | Add, edit and delete published results |
| **Teams** | Edit manager names, training details and descriptions for the 23 active teams |
| **Sponsors** | Add, edit and assign sponsors to one or more teams |

Changes are committed to GitHub and normally appear after Netlify finishes its next deployment.

## Troubleshooting

| Message | What to check |
|---|---|
| “Admin access has not been configured” | Confirm all three environment variables exist in Netlify, then redeploy |
| “Incorrect password” | Check capitalisation or update `ADMIN_PASSWORD` in Netlify |
| “Your admin session has expired” | Sign in again |
| A save fails with a permissions message | Check that the GitHub token is valid and has Contents read/write access to this repository |

*Last updated: October 2026*
