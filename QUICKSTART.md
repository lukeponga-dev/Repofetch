# RepoFetch Quick Start Guide

Get up and running with RepoFetch in under 5 minutes!

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (usually comes with Node.js)
- A **GitHub App** with repository access permissions

## 1. Clone or Download the Project

```bash
# If you have the project as a git repository
git clone <your-repo-url>
cd Repofetch

# Or if you have the files directly
cd /path/to/Repofetch
```

## 2. Install Dependencies

```bash
npm install
```

This installs the `octokit` package needed for GitHub API integration.

## 3. Configure GitHub App (One-time Setup)

### Option A: Use Existing Configuration
The project comes pre GitHub App-configured with sample credentials. The scripts are ready to use immediately.

### Option B: Configure Your Own GitHub App
1. Create a GitHub App in your GitHub account
2. Generate a private key file
3. Update the configuration in each script:
   - `APP_ID` / `appId`: Your GitHub App ID
   - `INSTALLATION_ID` / `installationId`: Your installation ID  
   - `PRIVATE_KEY_PATH` / `privateKeyPath`: Path to your private key file

## 4. Test the Setup

```bash
# Test AI repository fetcher
node fetchRepos.js

# Test all repositories fetcher
node get_all_repos.js

# Test JSON export
node repos_to_json.js all
```

## 5. Basic Usage Examples

### Get Your AI Projects
```bash
node fetchRepos.js
# Output: 🤖 ai-chatbot
#         🤖 machine-learning-tools
```

### Get All Repositories with JSON Output
```bash
node get_all_repos.js --json
# Outputs JSON to console and saves to file
```

### Export Detailed JSON Reports
```bash
# All repositories
node repos_to_json.js all

# AI repositories only  
node repos_to_json.js ai-only

# Summary + detailed data
node repos_to_json.js both
```

## 🎉 You're Ready!

That's it! You can now fetch and export your GitHub repositories. Check the main [README.md](README.md) for advanced usage and troubleshooting.

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the different output formats and options
- Set up your own GitHub App for personalized access
- Check out the [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
