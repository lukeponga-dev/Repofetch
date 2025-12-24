# RepoFetch Examples

This document provides practical examples and code snippets for using RepoFetch in various scenarios.

## Table of Contents

1. [Basic Usage Examples](#basic-usage-examples)
2. [Advanced Usage Examples](#advanced-usage-examples)
3. [Integration Examples](#integration-examples)
4. [Automation Examples](#automation-examples)
5. [Data Analysis Examples](#data-analysis-examples)
6. [Reporting Examples](#reporting-examples)

## Basic Usage Examples

### Getting Started

```bash
# Install dependencies
npm install

# Test basic functionality
node scripts/fetchRepos.js

# Get all repositories
node scripts/get_all_repos.js
```

### Simple AI Project Discovery

```bash
# Find all AI projects
node scripts/fetchRepos.js

# Output with emoji indicators
# 🤖 ai-chatbot
# 🤖 machine-learning-tools
# 🤖 ai-image-processor
```

### JSON Export for Processing

```bash
# Export AI projects as JSON
node scripts/fetchRepos.js --json > ai-projects.json

# Export all repositories
node scripts/get_all_repos.js --json > all-repos.json
```

## Advanced Usage Examples

### Filtering and Processing with jq

```bash
# Get AI projects with more than 10 stars
node scripts/fetchRepos.js --json | jq '.repositories[] | select(.stargazers_count > 10)'

# Count repositories by language
node scripts/get_all_repos.js --json | jq '.repositories | group_by(.language) | map({language: .[0].language, count: length})'

# Find repositories without descriptions
node scripts/get_all_repos.js --json | jq '.repositories[] | select(.description == null) | .full_name'

# Get top 5 most starred repositories
node scripts/get_all_repos.js --json | jq '.repositories | sort_by(.stargazers_count) | reverse | .[0:5] | .[] | "\(.full_name): \(.stargazers_count) stars"'
```

### Complex Filtering

```bash
# Find AI projects in Python with more than 5 stars
node scripts/fetchRepos.js --json | jq '.repositories[] | select(.language == "Python" and .stargazers_count > 5)'

# Get repositories updated in the last 30 days
node scripts/get_all_repos.js --json | jq '.repositories[] | select(.updated_at > "2024-11-24") | .full_name'

# Find large repositories (>10MB)
node scripts/get_all_repos.js --json | jq '.repositories[] | select(.size > 10240) | {name: .full_name, size: .size}'
```

## Integration Examples

### JavaScript Integration

```javascript
const { exec } = require('child_process');
const fs = require('fs');

class RepoFetchClient {
  constructor() {
    this.scriptPath = './scripts/';
  }

  async getAIRepositories() {
    return new Promise((resolve, reject) => {
      exec(`node ${this.scriptPath}fetchRepos.js --json`, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(JSON.parse(stdout));
      });
    });
  }

  async getAllRepositories() {
    return new Promise((resolve, reject) => {
      exec(`node ${this.scriptPath}get_all_repos.js --json`, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(JSON.parse(stdout));
      });
    });
  }

  async getRepositoryAnalytics() {
    return new Promise((resolve, reject) => {
      exec(`node ${this.scriptPath}repository_analytics.js --json`, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(JSON.parse(stdout));
      });
    });
  }

  async exportRepositories(format = 'all') {
    return new Promise((resolve, reject) => {
      exec(`node ${this.scriptPath}repos_to_json.js ${format}`, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(JSON.parse(stdout));
      });
    });
  }
}

// Usage example
async function main() {
  const client = new RepoFetchClient();
  
  try {
    const aiRepos = await client.getAIRepositories();
    console.log(`Found ${aiRepos.total_ai_repositories} AI repositories`);
    
    const analytics = await client.getRepositoryAnalytics();
    console.log(`Total repositories: ${analytics.summary.total_repositories}`);
    
    const allRepos = await client.getAllRepositories();
    const pythonRepos = allRepos.filter(repo => repo.language === 'Python');
    console.log(`Found ${pythonRepos.length} Python repositories`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

### Python Integration

```python
import subprocess
import json
from datetime import datetime

class RepoFetchClient:
    def __init__(self, script_path='./scripts/'):
        self.script_path = script_path
    
    def run_script(self, script_name, args=None):
        cmd = ['node', f'{self.script_path}{script_name}']
        if args:
            cmd.extend(args)
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            raise Exception(f"Script failed: {result.stderr}")
        return result.stdout
    
    def get_ai_repositories(self):
        output = self.run_script('fetchRepos.js', ['--json'])
        return json.loads(output)
    
    def get_all_repositories(self):
        output = self.run_script('get_all_repos.js', ['--json'])
        return json.loads(output)
    
    def get_repository_analytics(self):
        output = self.run_script('repository_analytics.js', ['--json'])
        return json.loads(output)
    
    def export_repositories(self, format_type='all'):
        output = self.run_script('repos_to_json.js', [format_type])
        return json.loads(output)

# Usage example
def main():
    client = RepoFetchClient()
    
    try:
        # Get AI repositories
        ai_repos = client.get_ai_repositories()
        print(f"Found {ai_repos['total_ai_repositories']} AI repositories")
        
        # Get analytics
        analytics = client.get_repository_analytics()
        print(f"Total repositories: {analytics['summary']['total_repositories']}")
        
        # Find most popular AI projects
        popular_ai = sorted(ai_repos['repositories'], 
                          key=lambda x: x['stargazers_count'], 
                          reverse=True)[:3]
        
        print("Top 3 AI projects:")
        for repo in popular_ai:
            print(f"  {repo['name']}: {repo['stargazers_count']} stars")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

### Shell Script Integration

```bash
#!/bin/bash
# repo-fetch-wrapper.sh

SCRIPT_DIR="./scripts"
OUTPUT_DIR="./output"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to run script and save output
run_and_save() {
    local script_name=$1
    local args=$2
    local output_file=$3
    
    echo "Running $script_name..."
    if [ -n "$args" ]; then
        node "$SCRIPT_DIR/$script_name" $args > "$OUTPUT_DIR/${output_file}_${TIMESTAMP}.txt"
        node "$SCRIPT_DIR/$script_name" $args --json > "$OUTPUT_DIR/${output_file}_${TIMESTAMP}.json"
    else
        node "$SCRIPT_DIR/$script_name" > "$OUTPUT_DIR/${output_file}_${TIMESTAMP}.txt"
    fi
    echo "Saved to $OUTPUT_DIR/${output_file}_${TIMESTAMP}.*"
}

# Main execution
case "$1" in
    "ai")
        run_and_save "fetchRepos.js" "--json" "ai_repositories"
        ;;
    "all")
        run_and_save "get_all_repos.js" "--json" "all_repositories"
        ;;
    "analytics")
        run_and_save "repository_analytics.js" "--json" "analytics"
        ;;
    "export")
        FORMAT=${2:-"all"}
        run_and_save "repos_to_json.js" "$FORMAT" "export_$FORMAT"
        ;;
    "full")
        run_and_save "fetchRepos.js" "--json" "ai_repositories"
        run_and_save "get_all_repos.js" "--json" "all_repositories"
        run_and_save "repository_analytics.js" "--json" "analytics"
        run_and_save "repos_to_json.js" "both" "comprehensive"
        ;;
    *)
        echo "Usage: $0 {ai|all|analytics|export|full} [format]"
        echo "  ai       - Fetch AI repositories"
        echo "  all      - Fetch all repositories"
        echo "  analytics - Generate analytics report"
        echo "  export   - Export repositories (format: all|ai-only|both)"
        echo "  full     - Run all reports"
        exit 1
        ;;
esac
```

## Automation Examples

### Daily Report Generator

```bash
#!/bin/bash
# daily-report.sh

REPORT_DIR="./reports/$(date +%Y-%m-%d)"
mkdir -p "$REPORT_DIR"

echo "Generating daily repository report for $(date +%Y-%m-%d)..."

# Generate AI projects report
echo "🤖 AI Projects Report" > "$REPORT_DIR/ai-projects.txt"
node scripts/fetchRepos.js >> "$REPORT_DIR/ai-projects.txt"
node scripts/fetchRepos.js --json > "$REPORT_DIR/ai-projects.json"

# Generate full repository report
echo "📊 All Repositories Report" > "$REPORT_DIR/all-repositories.txt"
node scripts/get_all_repos.js >> "$REPORT_DIR/all-repositories.txt"
node scripts/get_all_repos.js --json > "$REPORT_DIR/all-repositories.json"

# Generate analytics report
echo "📈 Analytics Report" > "$REPORT_DIR/analytics.txt"
node scripts/repository_analytics.js >> "$REPORT_DIR/analytics.txt"
node scripts/repository_analytics.js --json > "$REPORT_DIR/analytics.json"

# Generate comprehensive export
node scripts/repos_to_json.js both > "$REPORT_DIR/comprehensive.json"

# Generate summary
echo "📋 Daily Summary" > "$REPORT_DIR/summary.txt"
echo "Date: $(date)" >> "$REPORT_DIR/summary.txt"
echo "" >> "$REPORT_DIR/summary.txt"

# Extract key metrics
AI_COUNT=$(node scripts/fetchRepos.js --json | jq '.total_ai_repositories')
ALL_COUNT=$(node scripts/get_all_repos.js --json | jq '.repositories | length')
TOTAL_STARS=$(node scripts/repository_analytics.js --json | jq '.summary.total_stars')

echo "AI Projects: $AI_COUNT" >> "$REPORT_DIR/summary.txt"
echo "Total Repositories: $ALL_COUNT" >> "$REPORT_DIR/summary.txt"
echo "Total Stars: $TOTAL_STARS" >> "$REPORT_DIR/summary.txt"

echo "✅ Report generated in $REPORT_DIR"
```

### Weekly Analysis Script

```bash
#!/bin/bash
# weekly-analysis.sh

WEEK_DIR="./reports/week-$(date +%Y-%U)"
mkdir -p "$WEEK_DIR"

echo "Running weekly repository analysis..."

# Generate comprehensive data
node scripts/repos_to_json.js both > "$WEEK_DIR/week-data.json"

# Extract trends and insights
node scripts/repository_analytics.js --json > "$WEEK_DIR/week-analytics.json"

# Generate trend report
cat > "$WEEK_DIR/trend-report.md" << EOF
# Weekly Repository Analysis - $(date +%Y-%m-%d)

## Summary
EOF

# Add analytics summary
node scripts/repository_analytics.js --json | jq -r '
"### Repository Overview
- Total Repositories: \(.summary.total_repositories)
- AI Projects: \(.summary.ai_projects)
- Total Stars: \(.summary.total_stars)
- Average Stars per Repo: \(.summary.average_stars_per_repo | round)

### Top Languages
" + (
  .languages | to_entries | sort_by(-.value.count) | .[0:5] | map(
    "- \(.key): \(.value.count) repos (\(.value.percentage)%)"
  ) | join("\n")
)

### Most Active Repositories
" + (
  .popularity.top_starred[0:3] | map(
    "- \(.full_name): \(.stargazers_count) stars"
  ) | join("\n")
)' >> "$WEEK_DIR/trend-report.md"

echo "✅ Weekly analysis completed in $WEEK_DIR"
```

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

echo "🔍 Repository Health Check"
echo "========================="

# Check for repositories with high issue counts
HIGH_ISSUES=$(node scripts/fetchRepos.js --json | jq -r '.repositories[] | select(.open_issues_count > 20) | .name' | wc -l)
if [ "$HIGH_ISSUES" -gt 0 ]; then
    echo "⚠️  Warning: $HIGH_ISSUES AI projects have >20 open issues"
    node scripts/fetchRepos.js --json | jq -r '.repositories[] | select(.open_issues_count > 20) | "  - \(.name): \(.open_issues_count) issues"'
fi

# Check for inactive repositories
INACTIVE=$(node scripts/get_all_repos.js --json | jq '[.repositories[] | select(.updated_at < "2024-01-01")] | length')
echo "📅 Inactive repositories (not updated since 2024): $INACTIVE"

# Check for repositories without descriptions
NO_DESC=$(node scripts/get_all_repos.js --json | jq '[.repositories[] | select(.description == null or .description == "")] | length')
echo "📝 Repositories without descriptions: $NO_DESC"

# Check for large repositories
LARGE=$(node scripts/get_all_repos.js --json | jq '[.repositories[] | select(.size > 50000)] | length')
echo "📦 Large repositories (>50MB): $LARGE"

echo ""
echo "✅ Health check completed"
```

## Data Analysis Examples

### Language Distribution Analysis

```bash
#!/bin/bash
# language-analysis.sh

echo "📊 Programming Language Analysis"
echo "================================"

# Get all repositories data
node scripts/get_all_repos.js --json > temp-repos.json

# Analyze language distribution
echo "### Language Distribution"
jq -r '
.repositories | 
group_by(.language) | 
map({language: .[0].language, count: length, total_stars: (map(.stargazers_count) | add)}) |
sort_by(.count) | reverse |
.[] | 
"\(.language): \(.count) repos (avg stars: \((.total_stars / .count) | round))"' temp-repos.json

# Find most popular languages by stars
echo ""
echo "### Languages by Total Stars"
jq -r '
.repositories | 
group_by(.language) | 
map({language: .[0].language, total_stars: (map(.stargazers_count) | add)}) |
sort_by(.total_stars) | reverse |
.[] | 
"\(.language): \(.total_stars) stars"' temp-repos.json

# Clean up
rm temp-repos.json
```

### Repository Age Analysis

```bash
#!/bin/bash
# age-analysis.sh

echo "📅 Repository Age Analysis"
echo "=========================="

# Get repository data
node scripts/get_all_repos.js --json > temp-repos.json

# Calculate repository ages
echo "### Repository Age Distribution"
jq -r '
.repositories | 
map(.created_at | fromdateiso8601) |
map(now - .) |
map(. / (60 * 60 * 24 * 30)) |  # Convert to months
{
  "avg": (add / length),
  "min": min,
  "max": max
} |
"Average age: \(.avg | round) months
Youngest: \(.min | round) months
Oldest: \(.max | round) months"' temp-repos.json

# Find recently created repositories
echo ""
echo "### Recently Created (last 6 months)"
jq -r '
.repositories | 
map(select(.created_at > "2024-06-24")) |
sort_by(.created_at) | reverse |
.[] | 
"\(.full_name) (created: \(.created_at))"' temp-repos.json

# Clean up
rm temp-repos.json
```

### Popularity Metrics Analysis

```bash
#!/bin/bash
# popularity-analysis.sh

echo "⭐ Repository Popularity Analysis"
echo "================================="

# Get repository data
node scripts/get_all_repos.js --json > temp-repos.json

# Top repositories by stars
echo "### Top 10 Repositories by Stars"
jq -r '
.repositories | 
sort_by(.stargazers_count) | reverse |
.[0:10] |
.[] | 
"\(.stargazers_count | tostring | . + " stars") | \(.full_name)"' temp-repos.json

# Star distribution
echo ""
echo "### Star Distribution"
jq -r '
.repositories | 
map(.stargazers_count) |
{
  "0": map(select(. == 0)) | length,
  "1-10": map(select(. > 0 and . <= 10)) | length,
  "11-50": map(select(. > 10 and . <= 50)) | length,
  "51-100": map(select(. > 50 and . <= 100)) | length,
  "101-500": map(select(. > 100 and . <= 500)) | length,
  "500+": map(select(. > 500)) | length
} |
to_entries | 
.[] | 
"\(.key): \(.value) repos"' temp-repos.json

# Fork analysis
echo ""
echo "### Most Forked Repositories"
jq -r '
.repositories | 
sort_by(.forks_count) | reverse |
.[0:5] |
.[] | 
"\(.forks_count | tostring | . + " forks") | \(.full_name)"' temp-repos.json

# Clean up
rm temp-repos.json
```

## Reporting Examples

### Markdown Report Generator

```bash
#!/bin/bash
# generate-markdown-report.sh

REPORT_FILE="./reports/repository-report-$(date +%Y-%m-%d).md"
mkdir -p "./reports"

echo "Generating markdown report..."

# Create report header
cat > "$REPORT_FILE" << EOF
# Repository Report - $(date +%Y-%m-%d)

Generated on: $(date)

EOF

# Add AI projects section
echo "## AI Projects" >> "$REPORT_FILE"
node scripts/fetchRepos.js >> "$REPORT_FILE"

# Add analytics section
echo "" >> "$REPORT_FILE"
echo "## Analytics Summary" >> "$REPORT_FILE"
node scripts/repository_analytics.js >> "$REPORT_FILE"

# Add detailed statistics
echo "" >> "$REPORT_FILE"
echo "## Detailed Statistics" >> "$REPORT_FILE"

# Get JSON data for processing
AI_DATA=$(node scripts/fetchRepos.js --json)
ALL_DATA=$(node scripts/get_all_repos.js --json)

# Add language statistics
echo "### Language Distribution" >> "$REPORT_FILE"
echo "$ALL_DATA" | jq -r '
.repositories | 
group_by(.language) | 
map({language: .[0].language, count: length}) |
sort_by(.count) | reverse |
.[] | 
"- \(.language): \(.count) repositories"' >> "$REPORT_FILE"

# Add most popular repositories
echo "" >> "$REPORT_FILE"
echo "### Most Popular Repositories" >> "$REPORT_FILE"
echo "$ALL_DATA" | jq -r '
.repositories | 
sort_by(.stargazers_count) | reverse |
.[0:10] |
.[] | 
"- \(.full_name): \(.stargazers_count) stars"' >> "$REPORT_FILE"

echo "✅ Report generated: $REPORT_FILE"
```

### HTML Report Generator

```bash
#!/bin/bash
# generate-html-report.sh

REPORT_FILE="./reports/repository-report-$(date +%Y-%m-%d).html"
mkdir -p "./reports"

# Get data
AI_JSON=$(node scripts/fetchRepos.js --json)
ALL_JSON=$(node scripts/get_all_repos.js --json)
ANALYTICS_JSON=$(node scripts/repository_analytics.js --json)

# Generate HTML report
cat > "$REPORT_FILE" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Repository Report - $(date +%Y-%m-%d)</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 5px; }
        .section { margin: 20px 0; }
        .repo-list { list-style: none; padding: 0; }
        .repo-item { padding: 10px; border-bottom: 1px solid #eee; }
        .stats { display: flex; flex-wrap: wrap; gap: 20px; }
        .stat-card { background: #f9f9f9; padding: 15px; border-radius: 5px; min-width: 200px; }
        .chart { margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Repository Report</h1>
        <p>Generated on $(date)</p>
    </div>

    <div class="section">
        <h2>Summary Statistics</h2>
        <div class="stats">
EOF

# Add statistics cards
echo "$ANALYTICS_JSON" | jq -r '
.summary |
"<div class=\"stat-card\">
    <h3>Total Repositories</h3>
    <p>\(.total_repositories)</p>
</div>
<div class=\"stat-card\">
    <h3>AI Projects</h3>
    <p>\(.ai_projects)</p>
</div>
<div class=\"stat-card\">
    <h3>Total Stars</h3>
    <p>\(.total_stars)</p>
</div>
<div class=\"stat-card\">
    <h3>Average Stars per Repo</h3>
    <p>\(.average_stars_per_repo | round)</p>
</div>"' >> "$REPORT_FILE"

# Add AI projects list
cat >> "$REPORT_FILE" << EOF
        </div>
    </div>

    <div class="section">
        <h2>AI Projects</h2>
        <ul class="repo-list">
EOF

echo "$AI_JSON" | jq -r '
.repositories[] |
"<li class=\"repo-item\">
    <strong>\(.name)</strong> - \(.description // "No description")
    <br>
    <small>Language: \(.language // "Unknown") | Stars: \(.stargazers_count) | Forks: \(.forks_count)</small>
</li>"' >> "$REPORT_FILE"

# Close HTML
cat >> "$REPORT_FILE" << EOF
        </ul>
    </div>
</body>
</html>
EOF

echo "✅ HTML report generated: $REPORT_FILE"
```

### JSON Report Generator

```bash
#!/bin/bash
# generate-json-report.sh

REPORT_FILE="./reports/repository-report-$(date +%Y-%m-%d).json"
mkdir -p "./reports"

echo "Generating comprehensive JSON report..."

# Combine all data into single report
jq -n \
  --argjson ai "$(node scripts/fetchRepos.js --json)" \
  --argjson all "$(node scripts/get_all_repos.js --json)" \
  --argjson analytics "$(node scripts/repository_analytics.js --json)" \
  --argjson export "$(node scripts/repos_to_json.js both)" \
  '{
    "report_metadata": {
      "generated_at": now | strftime("%Y-%m-%dT%H:%M:%SZ"),
      "version": "1.0",
      "description": "Comprehensive repository report"
    },
    "ai_projects": $ai,
    "all_repositories": $all,
    "analytics": $analytics,
    "export_data": $export
  }' > "$REPORT_FILE"

echo "✅ JSON report generated: $REPORT_FILE"
```

These examples demonstrate various ways to use RepoFetch for different purposes, from simple repository discovery to complex data analysis and automated reporting. Choose the examples that best fit your use case and adapt them as needed.