# Troubleshooting Releases

If you encounter `Resource not accessible by personal access token` or 403 errors during the release step:

## 1. Check `DEPLOY_GITHUB_TOKEN` Permissions
You are using a secret named `DEPLOY_GITHUB_TOKEN`.
*   **If using a Fine-grained Personal Access Token:**
    *   Ensure it has **Read and Write** access to **Contents** (to create releases/tags).
    *   Ensure it has access to this specific repository.
*   **If using a Classic Personal Access Token:**
    *   Ensure the `public_repo` (or `repo` for private) scope is checked.

## 2. GitHub Actions Settings
Go to **Settings > Actions > General** in your repository.
*   Under **Workflow permissions**, select **Read and write permissions**.
*   Check **Allow GitHub Actions to create and approve pull requests**.

## 3. NPM Token
Ensure `NPM_TOKEN` is a valid "Automation" token from npmjs.com.
