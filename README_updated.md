# RepoFetch - AI Projects Repository Fetcher

A focused Node.js application for fetching and displaying AI-related GitHub repositories using GitHub Apps with JSON output capabilities.

## Features

- **GitHub App Integration**: Fetch repositories using GitHub Apps with private key authentication
- **AI Project Filtering**: Automatically filters repositories containing 'ai' in the name
- **Multiple Output Formats**: Display as formatted list, emoji-coded, or structured JSON
- **JSON Export**: Export repository data to JSON files with timestamps
- **Flexible Filtering**: Get all repositories or AI-only repositories
- **Rich Metadata**: Include detailed repository information (stars, forks, language, etc.)

## Files Overview

### Core Scripts

1. **`fetchRepos.js`** - AI-focused GitHub App script
   - Fetches repository data using GitHub Apps
   - Filters repositories containing 'ai' in the name
   - **New**: Supports JSON output with `--json` or `-j` flag
   - Displays AI projects with 🤖 emoji format (default) or JSON

2. **`get_all_repos.js`** - Comprehensive repository fetcher
   - Fetches ALL repositories from your installation
   - **New**: Supports JSON output with `--json` or `-j` flag
   - Displays all repositories with 🔒/🌍 privacy indicators
   - Includes AI project identification

3. **`repos_to_json.js`** - Dedicated JSON export tool
   - Advanced JSON output with multiple format options
   - Three output modes: all repositories, AI-only, or combined summary
   - Always saves output to timestamped JSON files
   - Comprehensive repository metadata

## Usage

### Run the AI Project Fetcher

```bash
# Standard output (emoji format)
node fetchRepos.js

# JSON output with file export
node fetchRepos.js --json
# or
node fetchRepos.js -j
```

### Run All Repositories Fetcher

```bash
# Standard output (formatted list)
node get_all_repos.js

# JSON output with file export
node get_all_repos.js --json
# or
node get_all_repos.js -j
```

### Advanced JSON Export

```bash
# Export all repositories as JSON
node repos_to_json.js all

# Export only AI repositories as JSON
node repos_to_json.js ai-only

# Export both summary and detailed data
node repos_to_json.js both
```

## Example Output

### Standard AI Projects Output
```
--- Your AI Projects ---
🤖 ai-chatbot
🤖 machine-learning-tools
🤖 ai-image-processor
```

### JSON Output Structure
```json
{
  "total_ai_repositories": 3,
  "repositories": [
    {
      "id": 123456789,
      "name": "ai-chatbot",
      "full_name": "username/ai-chatbot",
      "description": "An intelligent chatbot",
      "private": false,
      "html_url": "https://github.com/username/ai-chatbot",
      "clone_url": "https://github.com/username/ai-chatbot.git",
      "ssh_url": "git@github.com:username/ai-chatbot.git",
      "language": "Python",
      "stargazers_count": 42,
      "forks_count": 7,
      "open_issues_count": 3,
      "size": 1024,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-12-10T14:22:33Z",
      "pushed_at": "2024-12-09T16:45:12Z",
      "default_branch": "main"
    }
  ]
}
```

## Requirements

- Node.js
- GitHub App setup
- Private key file for GitHub App authentication
- GitHub App with repository access permissions

## Configuration

### GitHub App Setup
1. Create a GitHub App in your GitHub account
2. Generate a private key file
3. Update the configuration in the script:
   - `APP_ID` / `appId`: Your GitHub App ID (currently: 2501453)
   - `PRIVATE_KEY_PATH` / `privateKeyPath`: Path to your private key file
   - `INSTALLATION_ID` / `installationId`: Your installation ID (currently: 100314666)

## Dependencies

- `octokit`: GitHub API client for JavaScript
- `fs`: File system module (built-in)

Install dependencies:
```bash
npm install
```

## Project Structure

```
/workspaces/Repofetch/
├── fetchRepos.js               # AI-focused script with JSON support
├── get_all_repos.js            # All repositories fetcher with JSON support
├── repos_to_json.js            # Dedicated JSON export tool
├── fetchreposapp.2025-12-19.private-key.pem  # Private key
├── package.json                # Project dependencies
└── README.md                   # This file
```

## JSON Output Features

### Auto-saved Files
All JSON outputs are automatically saved to timestamped files:
- `ai_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from fetchRepos.js)
- `all_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from get_all_repos.js)
- `repositories_{format}_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from repos_to_json.js)

### Repository Metadata Included
Each repository object in JSON output includes:
- Basic info: id, name, full_name, description
- URLs: html_url, clone_url, ssh_url
- Status: private, language
- Statistics: stargazers_count, forks_count, open_issues_count, size
- Timestamps: created_at, updated_at, pushed_at
- Branch: default_branch
- AI flag: is_ai_project (where applicable)

## Troubleshooting

### Authentication Issues
- Check that your private key file exists and is readable
- Verify your GitHub App ID and installation ID
- Ensure your GitHub App has repository access permissions

### No AI Projects Found
- Verify you have repositories with 'ai' in the name
- Check that the repositories are accessible to your GitHub App
- Consider case sensitivity in filtering

### JSON Output Issues
- Ensure you have write permissions in the current directory
- Check that the `--json` or `-j` flag is properly formatted
- Verify that the output format parameter for repos_to_json.js is valid

### API Rate Limits
- GitHub API has rate limits for requests
- Authentication increases rate limits
- Consider implementing request throttling if needed

## Migration from Original

The enhanced scripts maintain backward compatibility:
- All original functionality still works without changes
- JSON features are opt-in via command-line flags
- Existing usage patterns remain unchanged

### Adding JSON to Existing Workflows
Simply add `--json` or `-j` to any existing command:
```bash
# Old way
node fetchRepos.js

# New way with JSON
node fetchRepos.js --json
