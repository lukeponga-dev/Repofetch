# RepoFetch Usage Guide

Comprehensive usage guide for RepoFetch - AI Projects Repository Fetcher

## Table of Contents

1. [Overview](#overview)
2. [Command Reference](#command-reference)
3. [Output Formats](#output-formats)
4. [Advanced Usage](#advanced-usage)
5. [Use Cases](#use-cases)
6. [Integration Examples](#integration-examples)
7. [Best Practices](#best-practices)

## Overview

RepoFetch provides three main scripts for different repository fetching scenarios:

- **`fetchRepos.js`** - AI-focused repository fetcher
- **`get_all_repos.js`** - Complete repository inventory
- **`repos_to_json.js`** - Advanced JSON export with multiple formats

## Command Reference

### 1. AI Projects Fetcher (`fetchRepos.js`)

**Purpose**: Fetch repositories containing 'ai' in the name with optional JSON export.

#### Basic Usage

```bash
# Standard output (emoji format)
node fetchRepos.js
```

**Output Example**:
```
--- Your AI Projects ---
🤖 ai-chatbot
🤖 machine-learning-tools
🤖 ai-image-processor
🤖 ai-data-analyzer
```

#### JSON Output

```bash
# JSON output with console display
node fetchRepos.js --json

# Short form
node fetchRepos.js -j
```

**JSON Output Structure**:
```json
{
  "total_ai_repositories": 4,
  "repositories": [
    {
      "id": 123456789,
      "name": "ai-chatbot",
      "full_name": "username/ai-chatbot",
      "description": "An intelligent chatbot implementation",
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

### 2. All Repositories Fetcher (`get_all_repos.js`)

**Purpose**: Fetch all accessible repositories with privacy indicators and optional JSON export.

#### Basic Usage

```bash
# Standard output (formatted list)
node get_all_repos.js
```

**Output Example**:
```
🔄 Fetching all repositories (this may take a moment)...

✅ Success! Found 15 repositories.

  1. 🌍 username/ai-chatbot
  2. 🌍 username/web-app
  3. 🔒 username/private-project
  4. 🌍 username/machine-learning-tools
  5. 🔒 username/internal-tools
```

#### JSON Output

```bash
# JSON output with detailed metadata
node get_all_repos.js --json

# Short form
node get_all_repos.js -j
```

### 3. Advanced JSON Export (`repos_to_json.js`)

**Purpose**: Export repository data in multiple formats with comprehensive metadata.

#### Available Formats

```bash
# Export all repositories
node repos_to_json.js all

# Export only AI repositories
node repos_to_json.js ai-only

# Export summary + detailed data
node repos_to_json.js both
```

#### Format Details

**`all` Format**:
- Complete list of all accessible repositories
- Full metadata for each repository
- Ideal for complete inventory

**`ai-only` Format**:
- Filtered list of repositories containing 'ai' in name
- Same metadata as 'all' format
- Focused on AI-related projects

**`both` Format**:
- Summary statistics
- All repositories with AI flag
- AI repositories in separate section
- Comprehensive analysis-ready data

## Output Formats

### Standard Output (Console)

- **AI Repositories**: Emoji-coded with 🤖
- **All Repositories**: Privacy indicators (🌍 public, 🔒 private)
- **Formatted numbering**: Padded for easy reading
- **Rich metadata**: Repository names, descriptions, statistics

### JSON Output

#### Auto-saved Files

All JSON outputs are automatically saved to timestamped files:

- **`ai_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json`** (from fetchRepos.js)
- **`all_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json`** (from get_all_repos.js)
- **`repositories_{format}_YYYY-MM-DDTHH-MM-SS-sssZ.json`** (from repos_to_json.js)

#### Metadata Included

Each repository object includes:

**Basic Information**:
- `id`: Unique GitHub repository ID
- `name`: Repository name
- `full_name`: Owner/repo format
- `description`: Repository description
- `private`: Privacy status (boolean)

**URLs**:
- `html_url`: GitHub web interface URL
- `clone_url`: HTTPS clone URL
- `ssh_url`: SSH clone URL

**Statistics**:
- `stargazers_count`: Number of stars
- `forks_count`: Number of forks
- `open_issues_count`: Number of open issues
- `size`: Repository size in KB

**Technical Details**:
- `language`: Primary programming language
- `default_branch`: Default branch name
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `pushed_at`: Last push timestamp

**AI Detection** (where applicable):
- `is_ai_project`: Boolean flag for AI-related repositories

## Advanced Usage

### Pipeline Integration

```bash
# Fetch and process AI repositories
node fetchRepos.js --json | jq '.repositories[] | select(.stargazers_count > 10) | .name'

# Count repositories by language
node repos_to_json.js all | jq '.repositories | group_by(.language) | map({language: .[0].language, count: length})'
```

### Automated Reporting

```bash
#!/bin/bash
# daily-report.sh

echo "=== Daily Repository Report ==="
echo "Date: $(date)"
echo

echo "AI Projects:"
node fetchRepos.js
echo

echo "Repository Statistics:"
node repos_to_json.js both | jq '.summary'
echo

echo "Top AI Projects by Stars:"
node fetchRepos.js --json | jq -r '.repositories | sort_by(.stargazers_count) | reverse | .[0:3] | .[] | "\(.name): \(.stargazers_count) stars"'
```

### Filter and Analysis

```bash
# Find repositories without descriptions
node repos_to_json.js all | jq '.repositories[] | select(.description == null) | .full_name'

# Identify large repositories (>10000 KB)
node repos_to_json.js all | jq '.repositories[] | select(.size > 10000) | {name: .full_name, size: .size}'

# Find recently updated repositories
node repos_to_json.js all | jq '.repositories[] | select(.updated_at > "2024-01-01") | .full_name'
```

## Use Cases

### 1. Project Portfolio Management

```bash
# Generate portfolio overview
node repos_to_json.js both > portfolio-report.json

# Extract key metrics
jq '.summary' portfolio-report.json
```

### 2. AI Project Discovery

```bash
# Find all AI projects
node fetchRepos.js

# Export detailed AI project data
node repos_to_json.js ai-only > ai-projects.json

# Analyze AI project statistics
jq '.repositories | group_by(.language) | map({language: .[0].language, count: length, avg_stars: (map(.stargazers_count) | add / length)})' ai-projects.json
```

### 3. Repository Audit

```bash
# Comprehensive repository audit
node get_all_repos.js --json > full-inventory.json

# Check for private repositories
jq '.repositories | map(select(.private == true)) | length' full-inventory.json

# Identify outdated repositories
jq '.repositories | map(select(.updated_at < "2023-01-01")) | .[].full_name' full-inventory.json
```

### 4. Development Workflow Integration

```bash
# Pre-commit hook - check repository status
#!/bin/bash
if node fetchRepos.js --json | jq -e '.repositories[] | select(.open_issues_count > 50)' > /dev/null; then
    echo "Warning: Some AI projects have >50 open issues"
fi
```

## Integration Examples

### JavaScript Integration

```javascript
const { exec } = require('child_process');
const fs = require('fs');

async function getAIRepositories() {
  return new Promise((resolve, reject) => {
    exec('node fetchRepos.js --json', (error, stdout, stderr) => {
      if (error) reject(error);
      else {
        const data = JSON.parse(stdout);
        resolve(data.repositories);
      }
    });
  });
}

// Usage
getAIRepositories().then(repos => {
  console.log(`Found ${repos.length} AI repositories`);
  repos.forEach(repo => {
    console.log(`${repo.name}: ${repo.stargazers_count} stars`);
  });
});
```

### Python Integration

```python
import subprocess
import json

def get_all_repositories():
    result = subprocess.run(['node', 'get_all_repos.js', '--json'], 
                          capture_output=True, text=True)
    data = json.loads(result.stdout)
    return data['repositories']

# Usage
repos = get_all_repositories()
print(f"Found {len(repos)} repositories")
```

### Shell Scripting

```bash
#!/bin/bash
# analyze-repos.sh

# Get all repositories in JSON format
node repos_to_json.js all > temp-repos.json

# Analysis functions
count_repos() {
    jq '.total_repositories' temp-repos.json
}

count_ai_repos() {
    jq '.repositories | map(select(.name | test("ai"; "i"))) | length' temp-repos.json
}

get_top_languages() {
    jq -r '.repositories | group_by(.language) | map({language: .[0].language, count: length}) | sort_by(.count) | reverse | .[0:5][] | "\(.language): \(.count)"' temp-repos.json
}

# Generate report
echo "Repository Analysis Report"
echo "========================="
echo "Total Repositories: $(count_repos)"
echo "AI Repositories: $(count_ai_repos)"
echo
echo "Top Languages:"
get_top_languages
```

## Best Practices

### 1. Error Handling

```bash
# Always check for errors
if ! node fetchRepos.js > /dev/null 2>&1; then
    echo "Failed to fetch repositories"
    exit 1
fi
```

### 2. Rate Limiting

```bash
# Implement delays between requests
sleep 1
node fetchRepos.js
sleep 1
node get_all_repos.js
```

### 3. Data Validation

```bash
# Validate JSON output
if ! node fetchRepos.js --json | jq empty > /dev/null 2>&1; then
    echo "Invalid JSON output"
    exit 1
fi
```

### 4. Automation Scripts

```bash
# Create reusable script
cat > run-report.sh << 'EOF'
#!/bin/bash
REPORT_DIR="./reports/$(date +%Y-%m-%d)"
mkdir -p "$REPORT_DIR"

echo "Generating daily repository report..."

# AI Projects
node fetchRepos.js > "$REPORT_DIR/ai-projects.txt"
node fetchRepos.js --json > "$REPORT_DIR/ai-projects.json"

# Full Inventory
node get_all_repos.js > "$REPORT_DIR/all-repos.txt"
node get_all_repos.js --json > "$REPORT_DIR/all-repos.json"

# Comprehensive Analysis
node repos_to_json.js both > "$REPORT_DIR/comprehensive.json"

echo "Report generated in $REPORT_DIR"
EOF

chmod +x run-report.sh
```

### 5. Monitoring and Alerts

```bash
#!/bin/bash
# monitor-repos.sh

# Check for high issue counts
HIGH_ISSUES=$(node fetchRepos.js --json | jq -r '.repositories[] | select(.open_issues_count > 20) | .name' | wc -l)

if [ "$HIGH_ISSUES" -gt 0 ]; then
    echo "⚠️  Warning: $HIGH_ISSUES AI projects have >20 open issues"
    node fetchRepos.js --json | jq -r '.repositories[] | select(.open_issues_count > 20) | "\(.name): \(.open_issues_count) issues"'
fi
```

### 6. Performance Optimization

```bash
# Use JSON output for large datasets
node get_all_repos.js --json > large-dataset.json

# Process data offline
jq '.repositories | map(select(.stargazers_count > 100)) | length' large-dataset.json
```

This usage guide covers all aspects of RepoFetch functionality. For setup instructions, see [SETUP.md](SETUP.md), and for quick start, see [QUICKSTART.md](QUICKSTART.md).
