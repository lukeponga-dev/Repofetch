# RepoFetch Troubleshooting Guide

This guide helps you diagnose and resolve common issues with RepoFetch.

## Table of Contents

1. [Authentication Issues](#authentication-issues)
2. [Network and API Issues](#network-and-api-issues)
3. [File System Issues](#file-system-issues)
4. [Output and Formatting Issues](#output-and-formatting-issues)
5. [Performance Issues](#performance-issues)
6. [Environment Issues](#environment-issues)
7. [Advanced Troubleshooting](#advanced-troubleshooting)

## Authentication Issues

### Error: "Invalid private key"

**Symptoms:**

```
❌ Error: Invalid private key
```

**Causes:**

- Private key file is corrupted
- Private key file path is incorrect
- Private key has wrong permissions

**Solutions:**

1. **Verify the private key file exists:**

   ```bash
   # Check if file exists
   ls -la config/fetchreposapp.2025-12-23.private-key.pem

   # On Windows
   dir config\fetchreposapp.2025-12-23.private-key.pem
   ```

2. **Check file permissions:**

   ```bash
   # Linux/Mac
   chmod 600 config/fetchreposapp.2025-12-23.private-key.pem

   # Windows (run as Administrator)
   icacls "config\fetchreposapp.2025-12-23.private-key.pem" /grant:r "%username%:F"
   ```

3. **Verify private key format:**

   ```bash
   # Should start with -----BEGIN RSA PRIVATE KEY-----
   head -1 config/fetchreposapp.2025-12-23.private-key.pem

   # Should end with -----END RSA PRIVATE KEY-----
   tail -1 config/fetchreposapp.2025-12-23.private-key.pem
   ```

4. **Re-download the private key:**
   - Go to GitHub App settings
   - Generate a new private key
   - Replace the existing key file
   - Update the path in scripts if needed

### Error: "Incorrect APP_ID or INSTALLATION_ID"

**Symptoms:**

```
❌ Error: Invalid GitHub App configuration
```

**Causes:**

- APP_ID doesn't match the GitHub App
- INSTALLATION_ID is incorrect
- GitHub App has been deleted or moved to different account

**Solutions:**

1. **Verify APP_ID:**

   ```bash
   # Find in script file
   grep -n "appId" scripts/fetchRepos.js

   # Compare with GitHub App settings
   # Go to: https://github.com/settings/apps/your-app-name
   ```

2. **Verify INSTALLATION_ID:**

   ```bash
   # Find in script file
   grep -n "installationId" scripts/fetchRepos.js

   # Get correct installation ID from:
   # https://github.com/settings/apps/your-app-name/installations
   ```

3. **Update configuration:**
   - Edit the script file
   - Update APP_ID and INSTALLATION_ID
   - Test with `node scripts/fetchRepos.js`

### Error: "Insufficient permissions"

**Symptoms:**

```
❌ Error: Insufficient permissions for this operation
```

**Causes:**

- GitHub App doesn't have repository read permissions
- GitHub App scope is too restrictive

**Solutions:**

1. **Check GitHub App permissions:**

   - Go to https://github.com/settings/apps/your-app-name
   - Click "Permissions & events"
   - Ensure "Repository" permission is set to "Read-only"

2. **Update permissions:**

   - Edit the GitHub App settings
   - Add "Contents" and "Metadata" read permissions
   - Save changes
   - Re-install app on repositories

3. **Re-authorize app:**
   ```bash
   # Go to GitHub App installation page
   # https://github.com/settings/apps/your-app-name/installations
   # Click "Configure"
   # Select all repositories
   # Save
   ```

## Network and API Issues

### Error: "Cannot connect to GitHub API"

**Symptoms:**

```
❌ Error: getaddrinfo ENOTFOUND api.github.com
```

**Causes:**

- Internet connection is down
- GitHub API is temporarily unavailable
- Firewall is blocking GitHub API

**Solutions:**

1. **Check internet connection:**

   ```bash
   # Test connectivity
   ping api.github.com

   # On Windows
   ping github.com
   ```

2. **Check GitHub status:**

   - Visit https://www.githubstatus.com/
   - Look for service incidents

3. **Check firewall settings:**

   - Ensure firewall allows outbound HTTPS on port 443
   - Whitelist api.github.com if needed
   - Check proxy settings

4. **Retry with delay:**
   ```bash
   # Add delay between retries
   sleep 5
   node scripts/fetchRepos.js
   ```

### Error: "Rate limit exceeded"

**Symptoms:**

```
❌ Error: API rate limit exceeded
```

**Causes:**

- Too many requests to GitHub API
- Rate limit window hasn't reset yet
- Multiple scripts running simultaneously

**Solutions:**

1. **Wait for rate limit reset:**

   - GitHub API rate limits reset every hour
   - Wait 60 minutes before trying again

2. **Check rate limit status:**

   ```bash
   # Add this to a script to check rate limits
   curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/rate_limit | jq '.rate_limit'
   ```

3. **Implement rate limiting in your code:**

   ```javascript
   // Add delay between script runs
   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

   async function runWithDelay() {
     await delay(1000); // 1 second delay
     // Run script
   }
   ```

4. **Use GitHub Apps (higher rate limits):**
   - GitHub Apps get 5,000 requests/hour
   - Personal tokens get 60 requests/hour
   - This project uses GitHub Apps for better rate limits

### Error: "Connection timeout"

**Symptoms:**

```
❌ Error: ETIMEDOUT or Request timeout
```

**Causes:**

- Network is slow
- GitHub API is responding slowly
- Too many repositories to fetch

**Solutions:**

1. **Increase timeout:**

   - Edit script files
   - Increase request timeout value
   - Default is typically 30 seconds

2. **Improve network:**

   - Check internet speed
   - Reduce network congestion
   - Connect closer to network source

3. **Fetch fewer repositories:**
   - Use filtering
   - Paginate results
   - Process in smaller batches

## File System Issues

### Error: "ENOENT: no such file or directory"

**Symptoms:**

```
❌ Error: ENOENT: no such file or directory, open 'config/...'
```

**Causes:**

- File or directory doesn't exist
- Path is incorrect
- File was deleted

**Solutions:**

1. **Verify file exists:**

   ```bash
   # List directory contents
   ls -la config/

   # On Windows
   dir config\
   ```

2. **Check file path in script:**

   ```bash
   # Look for path references
   grep -n "private-key" scripts/fetchRepos.js
   ```

3. **Create missing directories:**

   ```bash
   # Create config directory
   mkdir -p config

   # Create output directory
   mkdir -p output
   ```

### Error: "EACCES: permission denied"

**Symptoms:**

```
❌ Error: EACCES: permission denied
```

**Causes:**

- File doesn't have read permissions
- Directory doesn't have write permissions
- Running as wrong user

**Solutions:**

1. **Fix file permissions:**

   ```bash
   # Linux/Mac
   chmod 644 config/*.pem
   chmod 755 config/
   chmod 755 output/

   # Windows (run as Administrator)
   icacls "config" /grant:r "%username%:F"
   icacls "output" /grant:r "%username%:F"
   ```

2. **Run as different user:**
   ```bash
   # Linux/Mac
   sudo chown $USER config/
   sudo chown $USER output/
   ```

### Error: "ENOSPC: no space left on device"

**Symptoms:**

```
❌ Error: ENOSPC: no space left on device
```

**Causes:**

- Disk is full
- Output files are too large
- Temporary files aren't being cleaned up

**Solutions:**

1. **Check disk space:**

   ```bash
   # Linux/Mac
   df -h

   # Windows
   dir C:\
   ```

2. **Clean old output files:**

   ```bash
   # Remove files older than 30 days
   find output/ -type f -mtime +30 -delete
   ```

3. **Compress old JSON files:**
   ```bash
   # Gzip old files
   gzip output/*.json
   ```

## Output and Formatting Issues

### Issue: "JSON output is truncated"

**Symptoms:**

- JSON file is incomplete
- jq commands fail with parsing errors

**Causes:**

- Process was interrupted
- Output was too large for buffer
- File write was incomplete

**Solutions:**

1. **Verify JSON is valid:**

   ```bash
   # Check if JSON is valid
   jq empty output/all_repositories_*.json

   # Check file size
   ls -lh output/all_repositories_*.json
   ```

2. **Re-run the script:**

   ```bash
   # Delete corrupted file
   rm output/corrupted_file.json

   # Run script again
   node scripts/get_all_repos.js --json
   ```

3. **Use streaming JSON parser:**
   ```bash
   # Process large JSON files in chunks
   jq -s '.[] | select(.stargazers_count > 10)' output/all_repositories_*.json
   ```

### Issue: "No repositories found"

**Symptoms:**

```
Total repositories: 0
No AI repositories found
```

**Causes:**

- GitHub App doesn't have access to repositories
- No repositories match filter criteria
- GitHub App isn't installed on any repositories

**Solutions:**

1. **Check GitHub App installation:**

   - Go to https://github.com/settings/apps/your-app-name/installations
   - Verify app is installed on repositories
   - Select repositories: "All repositories" or specific ones

2. **Check filter criteria:**

   - AI filter looks for 'ai' in repository name (case-insensitive)
   - Example: 'ai-chatbot' ✅, 'machine-learning' ❌

3. **Verify repository visibility:**
   ```bash
   # Run all repositories script to see if any repos are found
   node scripts/get_all_repos.js
   ```

### Issue: "Mixed emoji output"

**Symptoms:**

- Emoji characters are garbled
- Output shows strange characters instead of emojis

**Causes:**

- Terminal doesn't support UTF-8 encoding
- Locale settings are incorrect
- Output is being piped incorrectly

**Solutions:**

1. **Set UTF-8 encoding:**

   ```bash
   # Linux/Mac
   export LC_ALL=en_US.UTF-8
   export LANG=en_US.UTF-8

   # Windows (PowerShell)
   $env:PYTHONIOENCODING = "utf-8"
   ```

2. **Use different terminal:**

   - Try a different terminal emulator
   - Update terminal font to support emoji
   - Use Windows Terminal (supports UTF-8 well)

3. **Disable emoji in output:**
   - Edit script files
   - Replace emoji variables with plain text
   - Rerun scripts

## Performance Issues

### Issue: "Script is running very slowly"

**Symptoms:**

- Script takes >5 minutes to complete
- System is unresponsive

**Causes:**

- Large number of repositories
- Network latency
- Resource constraints

**Solutions:**

1. **Check system resources:**

   ```bash
   # Linux/Mac
   top -n 1 | head -20

   # Windows (PowerShell)
   Get-Process | Sort-Object cpu -Descending | Select-Object -First 10
   ```

2. **Implement pagination:**

   - Fetch repositories in smaller batches
   - Add pagination to API calls
   - Process data in chunks

3. **Cache results:**

   ```bash
   # Save results to file
   node scripts/get_all_repos.js --json > cached-repos.json

   # Use cached data instead of fetching again
   jq '.repositories' cached-repos.json
   ```

4. **Run in background:**

   ```bash
   # Linux/Mac
   nohup node scripts/get_all_repos.js --json > output.json &

   # Windows (PowerShell)
   Start-Process powershell -ArgumentList 'node scripts/get_all_repos.js --json' -WindowStyle Hidden
   ```

### Issue: "Memory usage is very high"

**Symptoms:**

- System runs out of memory
- Node process crashes
- "FATAL ERROR: CALL_AND_RETRY_LAST" error

**Causes:**

- Processing very large dataset
- Memory leak in script
- Insufficient available memory

**Solutions:**

1. **Increase Node.js heap size:**

   ```bash
   # Increase to 2GB
   node --max-old-space-size=2048 scripts/get_all_repos.js --json
   ```

2. **Process data in chunks:**

   ```javascript
   // Process repositories one at a time instead of loading all
   for (const repo of repositories) {
     processRepository(repo);
   }
   ```

3. **Stream data instead of buffering:**
   ```bash
   # Use streaming instead of loading entire JSON
   node scripts/get_all_repos.js --json | jq '.repositories[] | select(.language == "Python")'
   ```

## Environment Issues

### Error: "Node.js not found" or "node: command not found"

**Symptoms:**

```
command not found: node
'node' is not recognized as an internal or external command
```

**Causes:**

- Node.js is not installed
- Node.js is not in system PATH
- Using wrong Node.js installation

**Solutions:**

1. **Check if Node.js is installed:**

   ```bash
   node --version
   ```

2. **Install Node.js:**

   - Visit https://nodejs.org/
   - Download LTS version (14 or higher)
   - Follow installation instructions

3. **Add Node.js to PATH:**
   - Linux/Mac: Usually automatic
   - Windows: Reinstall Node.js and select "Add to PATH"
   - Or manually add Node.js bin directory to PATH

### Error: "npm ERR! Cannot find module"

**Symptoms:**

```
npm ERR! Cannot find module 'octokit'
```

**Causes:**

- Dependencies not installed
- node_modules directory is missing
- package.json is corrupted

**Solutions:**

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Verify package.json:**

   ```bash
   # Check file contents
   cat package.json

   # Should have octokit dependency
   grep octokit package.json
   ```

3. **Clear and reinstall:**

   ```bash
   # Remove node_modules
   rm -rf node_modules
   rm package-lock.json

   # Reinstall
   npm install
   ```

## Advanced Troubleshooting

### Enable Debug Logging

Add debug logging to scripts:

```javascript
// At top of script file
const DEBUG = process.env.DEBUG === "true";

function debugLog(...args) {
  if (DEBUG) {
    console.log("[DEBUG]", ...args);
  }
}

// Use in code
debugLog("Starting API request...");
```

Run with debug enabled:

```bash
DEBUG=true node scripts/fetchRepos.js
```

### Test GitHub App Configuration

Create a test script:

```javascript
// test-config.js
const { App } = require("octokit");
const fs = require("fs");

const appId = 2501453;
const installationId = 100314666;
const privateKeyPath = "./config/fetchreposapp.2025-12-23.private-key.pem";

async function testConfig() {
  try {
    console.log("Testing GitHub App configuration...");

    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    console.log("✅ Private key loaded");

    const app = new App({ appId, privateKey });
    console.log("✅ App initialized");

    const octokit = await app.getInstallationOctokit(installationId);
    console.log("✅ Octokit client created");

    const { data } = await octokit.request("GET /app");
    console.log("✅ API connection successful");
    console.log("App name:", data.name);
  } catch (error) {
    console.error("❌ Configuration test failed:", error.message);
    process.exit(1);
  }
}

testConfig();
```

Run the test:

```bash
node test-config.js
```

### Monitor API Rate Limits

```bash
#!/bin/bash
# monitor-rate-limits.sh

echo "Monitoring API rate limits..."

while true; do
  RATE_LIMIT=$(curl -s "https://api.github.com/rate_limit" | jq '.rate_limit')
  echo "Rate limit remaining: $(echo $RATE_LIMIT | jq '.remaining') / $(echo $RATE_LIMIT | jq '.limit')"
  echo "Reset at: $(echo $RATE_LIMIT | jq '.reset | todate')"

  sleep 60
done
```

### Generate Error Reports

```bash
#!/bin/bash
# generate-error-report.sh

ERROR_LOG="./logs/error-report-$(date +%Y-%m-%d).txt"
mkdir -p ./logs

echo "Error Report - $(date)" > "$ERROR_LOG"
echo "================================" >> "$ERROR_LOG"
echo "" >> "$ERROR_LOG"

echo "Testing each script..." >> "$ERROR_LOG"

# Test each script and capture errors
echo "Testing fetchRepos.js..." >> "$ERROR_LOG"
node scripts/fetchRepos.js 2>> "$ERROR_LOG" || echo "Script failed with exit code $?" >> "$ERROR_LOG"

echo "" >> "$ERROR_LOG"
echo "Testing get_all_repos.js..." >> "$ERROR_LOG"
node scripts/get_all_repos.js 2>> "$ERROR_LOG" || echo "Script failed with exit code $?" >> "$ERROR_LOG"

echo "" >> "$ERROR_LOG"
echo "System Information:" >> "$ERROR_LOG"
echo "Node version: $(node --version)" >> "$ERROR_LOG"
echo "npm version: $(npm --version)" >> "$ERROR_LOG"
echo "OS: $(uname -a)" >> "$ERROR_LOG"

echo "Error report saved to: $ERROR_LOG"
```

## Getting Help

If you're still experiencing issues:

1. **Check documentation:**

   - Review [SETUP.md](SETUP.md)
   - Check [USAGE.md](USAGE.md)
   - See [API.md](API.md)

2. **Enable debug logging:**

   - Add debug statements to scripts
   - Capture complete error messages
   - Check system logs

3. **Test components:**

   - Test GitHub App configuration
   - Verify network connectivity
   - Check file permissions

4. **Report issue:**
   - Create GitHub issue with:
     - Complete error message
     - Steps to reproduce
     - Environment details (Node.js version, OS)
     - Relevant debug logs
