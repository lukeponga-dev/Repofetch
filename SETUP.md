# RepoFetch Setup Guide

Detailed setup instructions for RepoFetch - AI Projects Repository Fetcher

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [GitHub App Configuration](#github-app-configuration)
4. [Authentication Setup](#authentication-setup)
5. [Project Configuration](#project-configuration)
6. [Testing Your Setup](#testing-your-setup)
7. [Troubleshooting](#troubleshooting)

## System Requirements

### Required Software
- **Node.js** (version 14.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
  
- **npm** (Node Package Manager)
  - Usually comes with Node.js
  - Verify installation: `npm --version`

### GitHub Requirements
- GitHub account
- Repository access permissions
- GitHub App (for authenticated API access)

## Installation

### 1. Project Setup

```bash
# Navigate to the project directory
cd /workspaces/Repofetch

# Install dependencies
npm install
```

### 2. Verify Installation

```bash
# Check if Node.js is installed
node --version
# Should output: v14.x.x or higher

# Check if npm is installed
npm --version
# Should output: 6.x.x or higher

# Verify octokit package installation
npm list octokit
# Should show: octokit@^5.0.5
```

## GitHub App Configuration

### Why Use a GitHub App?
GitHub Apps provide:
- **Better security** than personal access tokens
- **Granular permissions** control
- **Higher rate limits** for API requests
- **Organization-level access** management

### Creating a GitHub App

1. **Navigate to GitHub Settings**
   - Go to your GitHub profile/settings
   - Click "Developer settings" → "GitHub Apps"

2. **Create New GitHub App**
   - Click "New GitHub App"
   - Fill in the required fields:
     - **GitHub App name**: `RepoFetch App` (or your choice)
     - **Description**: `Repository fetching for AI projects`
     - **Homepage URL**: Your project URL (optional)

3. **Set Permissions**
   - **Repository permissions**:
     - **Contents**: Read
     - **Metadata**: Read
     - **Issues**: Read (optional)
     - **Pull requests**: Read (optional)

4. **App Permissions**
   - Subscribe to events:
     - **Installation**
     - **Installation repositories**

5. **Where can this GitHub App be installed?**
   - Select "Any account" or "Only on this account"

6. **Generate Private Key**
   - Click "Generate a private key" button
   - Download the generated `.pem` file
   - **Important**: Save this file securely!

### Installing the GitHub App

1. **Navigate to your GitHub App**
   - Go to the app you just created

2. **Install the App**
   - Click "Install App"
   - Choose "All repositories" or "Only select repositories"
   - Click "Install"

3. **Note Installation ID**
   - After installation, note the installation ID from the URL
   - Example: `https://github.com/settings/installations/123456`
   - The number `123456` is your installation ID

## Authentication Setup

### 1. Prepare Private Key

```bash
# Move your downloaded private key to the project directory
mv ~/Downloads/your-app.private-key.pem /workspaces/Repofetch/

# Ensure proper permissions (Unix/Linux/macOS)
chmod 600 /workspaces/Repofetch/your-app.private-key.pem
```

### 2. Update Configuration Files

For each script (`fetchRepos.js`, `get_all_repos.js`, `repos_to_json.js`), update:

```javascript
// Configuration values
const APP_ID = YOUR_APP_ID_HERE;           // From GitHub App settings
const INSTALLATION_ID = YOUR_INSTALL_ID;    // From installation URL
const PRIVATE_KEY_PATH = "/path/to/your/private-key.pem";
```

### 3. Verify Configuration

```bash
# Test basic connectivity
node -e "
const { App } = require('octokit');
const fs = require('fs');

const appId = YOUR_APP_ID;
const privateKey = fs.readFileSync('/path/to/private-key.pem', 'utf8');
const app = new App({ appId, privateKey });

app.getInstallationOctokit(YOUR_INSTALLATION_ID)
  .then(() => console.log('✅ Authentication successful'))
  .catch(err => console.error('❌ Authentication failed:', err.message));
"
```

## Project Configuration

### Current Configuration (Pre-configured)

The project comes with sample configuration:
- **App ID**: `2501453`
- **Installation ID**: `100314666`
- **Private Key**: `fetchreposapp.2025-12-19.private-key.pem`

### Custom Configuration

To use your own GitHub App, update all three scripts:

**fetchRepos.js:**
```javascript
const appId = YOUR_APP_ID;
const installationId = YOUR_INSTALL_ID;
const privateKeyPath = "/workspaces/Repofetch/your-private-key.pem";
```

**get_all_repos.js:**
```javascript
const APP_ID = YOUR_APP_ID;
const INSTALLATION_ID = YOUR_INSTALL_ID;
const PRIVATE_KEY_PATH = "/workspaces/Repofetch/your-private-key.pem";
```

**repos_to_json.js:**
```javascript
const APP_ID = YOUR_APP_ID;
const INSTALLATION_ID = YOUR_INSTALL_ID;
const PRIVATE_KEY_PATH = "/workspaces/Repofetch/your-private-key.pem";
```

## Testing Your Setup

### 1. Basic Connectivity Test

```bash
# Test AI repository fetcher
node fetchRepos.js
```

Expected output:
```
--- Your AI Projects ---
🤖 ai-project-1
🤖 ai-project-2
```

### 2. JSON Output Test

```bash
# Test JSON output
node fetchRepos.js --json
```

Expected output:
```json
{
  "total_ai_repositories": 2,
  "repositories": [...]
}
```

### 3. All Repositories Test

```bash
# Test all repositories fetcher
node get_all_repos.js
```

Expected output:
```
🔄 Fetching all repositories (this may take a moment)...
✅ Success! Found 10 repositories.

  1. 🌍 username/repo1
  2. 🔒 username/private-repo
```

### 4. Advanced JSON Export Test

```bash
# Test all repositories JSON export
node repos_to_json.js all
```

## Troubleshooting

### Common Issues

#### 1. Authentication Errors

**Error**: `Error: Private key is invalid`
```bash
# Check if private key exists and is readable
ls -la /workspaces/Repofetch/fetchreposapp.2025-12-19.private-key.pem

# Check file permissions (should be 600 or 400)
chmod 600 /workspaces/Repofetch/fetchreposapp.2025-12-19.private-key.pem
```

**Error**: `Error: App not found`
```bash
# Verify App ID is correct
# Check GitHub App settings for the correct App ID
```

#### 2. Permission Errors

**Error**: `Error: Repository access denied`
- Ensure your GitHub App has repository permissions
- Check if the app is installed on the correct account
- Verify the installation ID is correct

#### 3. Network/Rate Limit Issues

**Error**: `Error: API rate limit exceeded`
- GitHub Apps have higher rate limits than unauthenticated requests
- Consider implementing request throttling for large datasets

#### 4. File System Errors

**Error**: `ENOENT: no such file or directory`
- Ensure you're in the correct directory (`/workspaces/Repofetch`)
- Check that the private key file exists
- Verify file paths are correct

### Getting Help

1. **Check the main [README.md](README.md)** for additional troubleshooting
2. **Review GitHub App documentation**: https://docs.github.com/en/apps
3. **Check GitHub API status**: https://www.githubstatus.com/
4. **Verify permissions**: Ensure your GitHub App has the correct repository access

### Environment Verification

Create a test script to verify your environment:

```bash
# Create test-environment.js
cat > test-environment.js << 'EOF'
console.log('=== Environment Check ===');

// Check Node.js version
console.log('Node.js version:', process.version);

// Check npm version
console.log('npm version:', process.env.npm_version || 'Not set');

// Check file permissions
const fs = require('fs');
const privateKeyPath = '/workspaces/Repofetch/fetchreposapp.2025-12-19.private-key.pem';

try {
  const stats = fs.statSync(privateKeyPath);
  console.log('Private key exists: Yes');
  console.log('Private key permissions:', stats.mode.toString(8).slice(-3));
} catch (err) {
  console.log('Private key exists: No');
}

// Check dependencies
try {
  require('octokit');
  console.log('Octokit package: Available');
} catch (err) {
  console.log('Octokit package: Not installed');
}

console.log('=== End Check ===');
EOF

# Run the test
node test-environment.js
```

This setup guide should get you up and running with RepoFetch! For quick reference, see the [QUICKSTART.md](QUICKSTART.md) guide.
