# RepoFetch API Documentation

This document provides detailed API documentation for all RepoFetch scripts and their functions.

## Table of Contents

1. [fetchRepos.js](#fetchreposjs)
2. [get_all_repos.js](#get_all_reposjs)
3. [repos_to_json.js](#repos_to_jsonjs)
4. [repository_analytics.js](#repository_analyticsjs)
5. [Common Data Structures](#common-data-structures)
6. [Error Handling](#error-handling)

## fetchRepos.js

### Overview

Fetches repositories containing 'ai' in the name from GitHub using GitHub App authentication.

### Usage

```bash
node fetchRepos.js [options]
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--json` | `-j` | Output repositories in JSON format |
| `--analytics` | `-a` | Generate analytics report for AI repositories |

### Functions

#### `fetchAIRepositories()`

Fetches all repositories and filters for AI-related ones.

**Returns:** `Promise<Array>` - Array of repository objects

**Example:**
```javascript
const repos = await fetchAIRepositories();
console.log(`Found ${repos.length} AI repositories`);
```

#### `displayRepositories(repositories, format)`

Displays repositories in the specified format.

**Parameters:**
- `repositories` (Array): Array of repository objects
- `format` (string): 'console' or 'json'

#### `generateAnalytics(repositories)`

Generates analytics for AI repositories.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Object with analytics data

### Configuration

The script uses the following environment variables or hardcoded values:

- `APP_ID`: GitHub App ID (default: 2501453)
- `INSTALLATION_ID`: Installation ID (default: 100314666)
- `PRIVATE_KEY_PATH`: Path to private key file (default: '../config/fetchreposapp.2025-12-23.private-key.pem')

## get_all_repos.js

### Overview

Fetches all accessible repositories from GitHub using GitHub App authentication.

### Usage

```bash
node get_all_repos.js [options]
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--json` | `-j` | Output repositories in JSON format |
| `--analytics` | `-a` | Generate quick analytics report |

### Functions

#### `fetchAllRepositories()`

Fetches all repositories accessible to the GitHub App.

**Returns:** `Promise<Array>` - Array of repository objects

#### `displayRepositories(repositories, format)`

Displays repositories with privacy indicators.

**Parameters:**
- `repositories` (Array): Array of repository objects
- `format` (string): 'console' or 'json'

#### `generateQuickAnalytics(repositories)`

Generates quick analytics for all repositories.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Object with analytics data

### Configuration

Same as `fetchRepos.js`.

## repos_to_json.js

### Overview

Advanced JSON export tool with multiple format options for repository data.

### Usage

```bash
node repos_to_json.js <format>
```

### Formats

| Format | Description |
|--------|-------------|
| `all` | Export all repositories |
| `ai-only` | Export only AI repositories |
| `both` | Export summary + detailed data |

### Functions

#### `exportRepositories(format)`

Exports repositories in the specified format.

**Parameters:**
- `format` (string): 'all', 'ai-only', or 'both'

**Returns:** Object with exported data

#### `generateSummary(repositories)`

Generates summary statistics for repositories.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Summary statistics object

### Configuration

Same as other scripts.

## repository_analytics.js

### Overview

Comprehensive analytics engine for repository data analysis and insights.

### Usage

```bash
node repository_analytics.js [options]
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--json` | `-j` | Output analytics in JSON format |

### Functions

#### `generateAnalytics(repositories)`

Generates comprehensive analytics for repositories.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Comprehensive analytics object

#### `analyzeLanguages(repositories)`

Analyzes programming language distribution.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Language analysis object

#### `analyzePopularity(repositories)`

Analyzes repository popularity metrics.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Popularity analysis object

#### `analyzeAge(repositories)`

Analyzes repository age and activity.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Age analysis object

#### `analyzeSize(repositories)`

Analyzes repository size distribution.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Size analysis object

#### `analyzePrivacy(repositories)`

Analyzes privacy distribution.

**Parameters:**
- `repositories` (Array): Array of repository objects

**Returns:** Privacy analysis object

### Configuration

Same as other scripts.

## Common Data Structures

### Repository Object

```javascript
{
  "id": 123456789,                    // GitHub repository ID
  "name": "repository-name",          // Repository name
  "full_name": "username/repository", // Full repository name
  "description": "Repository description",
  "private": false,                   // Privacy status
  "html_url": "https://github.com/username/repository",
  "clone_url": "https://github.com/username/repository.git",
  "ssh_url": "git@github.com:username/repository.git",
  "language": "JavaScript",           // Primary language
  "stargazers_count": 42,             // Number of stars
  "forks_count": 7,                   // Number of forks
  "open_issues_count": 3,             // Number of open issues
  "size": 1024,                       // Size in KB
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-12-10T14:22:33Z",
  "pushed_at": "2024-12-09T16:45:12Z",
  "default_branch": "main",
  "is_ai_project": true               // AI project flag (when applicable)
}
```

### Analytics Object

```javascript
{
  "summary": {
    "total_repositories": 100,
    "ai_projects": 12,
    "regular_projects": 88,
    "total_stars": 1247,
    "total_forks": 89,
    "average_stars_per_repo": 12.47
  },
  "languages": [
    {
      "language": "JavaScript",
      "count": 45,
      "percentage": 45,
      "total_stars": 567,
      "average_stars": 12.6
    }
  ],
  "popularity": {
    "top_starred": [...],
    "top_forked": [...],
    "distribution": {...}
  },
  "age": {
    "average_age_months": 18,
    "recently_updated": 45,
    "recently_active": 23
  },
  "size": {
    "average_size_kb": 2048,
    "largest_repositories": [...],
    "distribution": {...}
  },
  "privacy": {
    "public": 53,
    "private": 47,
    "public_percentage": 53,
    "private_percentage": 47
  }
}
```

## Error Handling

All scripts implement consistent error handling patterns:

### Common Error Types

1. **Authentication Errors**
   - Invalid private key
   - Incorrect App ID or Installation ID
   - Missing permissions

2. **Network Errors**
   - GitHub API connectivity issues
   - Rate limiting
   - Timeout errors

3. **File System Errors**
   - Missing private key file
   - Permission issues
   - Disk space issues

### Error Handling Pattern

```javascript
try {
  // Operation that might fail
  const result = await someOperation();
  return result;
} catch (error) {
  console.error("❌ Error description:", error.message);
  // Provide fallback or re-throw
  throw error;
}
```

### Exit Codes

- `0`: Success
- `1`: General error
- `2`: Authentication error
- `3`: Network error
- `4`: File system error

## Dependencies

All scripts depend on:

- **octokit** (^5.0.5): GitHub API client for JavaScript
- **fs**: Node.js file system module
- **path**: Node.js path module

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_ID` | GitHub App ID | 2501453 |
| `INSTALLATION_ID` | Installation ID | 100314666 |
| `PRIVATE_KEY_PATH` | Path to private key | ../config/fetchreposapp.2025-12-23.private-key.pem |

## Output Files

All JSON outputs are automatically saved to timestamped files in the `output/` directory:

- `ai_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json`
- `all_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json`
- `repositories_{format}_YYYY-MM-DDTHH-MM-SS-sssZ.json`
- `repository_analytics_YYYY-MM-DDTHH-MM-SS-sssZ.json`

## Rate Limits

GitHub Apps provide higher rate limits than unauthenticated requests:

- **Authenticated requests**: 5,000 requests per hour
- **Unauthenticated requests**: 60 requests per hour

The scripts implement automatic retry logic for rate-limited requests.

## Security Considerations

- Private keys should be kept secure and never committed to version control
- GitHub App should have minimal required permissions
- Consider using environment variables for sensitive configuration
- Regularly rotate GitHub App private keys