# 🚀 RepoFetch - AI Projects Repository Fetcher

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-App%20Integration-blue.svg)](https://docs.github.com/en/apps)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

A powerful Node.js application for fetching and managing GitHub repositories with a focus on AI projects. Built with GitHub Apps integration for secure, high-performance repository access and multiple export formats.

## ✨ Features

- **🔐 GitHub App Integration**: Secure authentication using GitHub Apps with private key
- **🤖 AI Project Filtering**: Smart filtering for repositories containing 'ai' in the name
- **📊 Repository Analytics**: Comprehensive insights on languages, popularity, age, and activity
- **📈 Rich Metadata**: Complete repository information (stars, forks, language, timestamps)
- **💾 JSON Export**: Auto-save repository data to timestamped JSON files
- **🎯 Flexible Queries**: Fetch all repositories or filter for AI-only projects
- **⚡ High Performance**: Optimized with GitHub Apps for higher API rate limits
- **🛠️ CLI Ready**: Perfect for automation, scripts, and CI/CD pipelines

## 🚀 Quick Start

New to RepoFetch? Get started in under 5 minutes!

👉 **[Start with docs/QUICKSTART.md](docs/QUICKSTART.md)** - For immediate setup and basic usage

Looking for detailed information? Check out these guides:

- 📖 **[docs/SETUP.md](docs/SETUP.md)** - Comprehensive setup and configuration guide
- 📖 **[docs/USAGE.md](docs/USAGE.md)** - Complete usage reference with examples
- 🛠️ **[This README](#)** - Project overview and quick reference

## 📁 Project Structure

```
Repofetch/
├── config/                          # Configuration files
│   └── fetchreposapp.2025-12-23.private-key.pem
├── docs/                            # Documentation
│   ├── QUICKSTART.md               # 5-minute setup guide
│   ├── SETUP.md                    # Detailed setup instructions
│   ├── USAGE.md                    # Complete usage reference
│   ├── PROJECT_ONBOARDING.md       # New contributor guide
│   ├── CONTRIBUTING.md             # Contribution guidelines
│   └── TODO.md                     # Development roadmap
├── scripts/                         # Main application scripts
│   ├── fetchRepos.js              # AI-focused repository fetcher
│   ├── get_all_repos.js           # Complete repository inventory
│   ├── repos_to_json.js           # Advanced JSON export tool
│   └── repository_analytics.js    # Comprehensive analytics engine
├── output/                          # Generated JSON data
│   ├── all_repositories_*.json
│   ├── all_repositories_quick_analytics_*.json
│   ├── repositories_all_*.json
│   ├── repositories_ai-only_*.json
│   ├── repositories_both_*.json
│   └── repository_analytics_*.json
├── package.json                     # Project configuration
└── README.md                        # This file (project overview)
```

## 🛠️ Available Scripts

### 1. AI Projects Fetcher (`scripts/fetchRepos.js`)

Fetches repositories containing 'ai' in the name with optional JSON export and analytics.

```bash
# Standard output
node scripts/fetchRepos.js
# Output: 🤖 ai-chatbot
#         🤖 machine-learning-tools

# JSON output
node scripts/fetchRepos.js --json
# or
node scripts/fetchRepos.js -j

# AI Repository Analytics
node scripts/fetchRepos.js --analytics
# or
node scripts/fetchRepos.js -a

# Analytics with JSON export
node scripts/fetchRepos.js --analytics --json
```

### 2. All Repositories Fetcher (`scripts/get_all_repos.js`)

Fetches all accessible repositories with privacy indicators and optional analytics.

```bash
# Standard output
node scripts/get_all_repos.js
# Output: 🌍 username/repo1
#         🔒 username/private-repo

# JSON output
node scripts/get_all_repos.js --json
# or
node scripts/get_all_repos.js -j

# Quick Analytics Report
node scripts/get_all_repos.js --analytics
# or
node scripts/get_all_repos.js -a

# Analytics with JSON export
node scripts/get_all_repos.js --analytics --json
```

### 3. Advanced JSON Export (`scripts/repos_to_json.js`)

Advanced export with multiple format options.

```bash
# Export all repositories
node scripts/repos_to_json.js all

# Export only AI repositories
node scripts/repos_to_json.js ai-only

# Export summary + detailed data
node scripts/repos_to_json.js both
```

### 4. Repository Analytics (`scripts/repository_analytics.js`)

Comprehensive analytics and insights about your repositories.

```bash
# Display formatted analytics report
node scripts/repository_analytics.js

# Export analytics as JSON
node scripts/repository_analytics.js --json
# or
node scripts/repository_analytics.js -j
```

## 📊 Example Output

### Standard AI Projects Output

```
--- Your AI Projects ---
🤖 ai-chatbot
🤖 machine-learning-tools
🤖 ai-image-processor
🤖 ai-data-analyzer
```

### JSON Output Structure

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
      "default_branch": "main",
      "is_ai_project": true
    }
  ]
}
```

## 📊 Repository Analytics Features

The analytics engine provides comprehensive insights across multiple dimensions:

### Summary Statistics

- Total repositories, AI projects, and regular projects
- Aggregate stars, forks, and open issues
- Average metrics per repository
- Top repositories by popularity metrics

### Language Analysis

- Repository count by programming language
- Total and average stars per language
- Size distribution across languages
- Most popular and most starred languages

### Popularity Metrics

- Top 10 repositories by stars and forks
- Popularity distribution buckets (0, 1-10, 11-50, 51-100, 101-500, 500+ stars)
- Comparative analysis across all repositories

### Age & Activity Analysis

- Repository age distribution
- Recent activity tracking (updates within 30 days, pushes within 7 days)
- Activity percentage and inactive repository identification
- Timeline-based insights

### Size & Privacy Analysis

- Storage size analysis and distribution
- Public vs private repository breakdown
- Largest repositories by size
- Privacy distribution statistics

### Example Analytics Output

```bash
node scripts/repository_analytics.js
```

```
================================================================================
🚀 REPOSITORY ANALYTICS REPORT
================================================================================

📊 SUMMARY
Total Repositories: 171
AI Projects: 12
Regular Projects: 159
Total Stars: 1,247
Total Forks: 89
Average Stars per Repo: 7

💻 TOP LANGUAGES
JavaScript: 45 repos (26%) - 567 ⭐
Python: 23 repos (13%) - 234 ⭐
TypeScript: 18 repos (11%) - 123 ⭐
HTML: 15 repos (9%) - 89 ⭐
CSS: 12 repos (7%) - 67 ⭐

⭐ TOP STARRED REPOSITORIES
portfolio: 156 ⭐ (JavaScript)
ai-chatbot: 89 ⭐ (Python)
machine-learning: 67 ⭐ (Python)

📅 AGE ANALYSIS
Average Age: 18 months
Recently Updated (30 days): 45
Recently Active (7 days): 23

🔐 PRIVACY DISTRIBUTION
Public: 91 (53%)
Private: 80 (47%)

================================================================================
```

## 🔧 Requirements

- **Node.js** (version 14 or higher)
- **GitHub App** with repository access permissions
- **Private key file** for GitHub App authentication (located in `config/`)
- **npm** (usually comes with Node.js)

## 📦 Dependencies

- **`octokit`** (^5.0.5) - GitHub API client for JavaScript

Install dependencies:

```bash
npm install
```

## 🔐 GitHub App Configuration

The project comes pre-configured with sample GitHub App credentials:

- **App ID**: `2501453`
- **Installation ID**: `100314666`
- **Private Key**: `config/fetchreposapp.2025-12-23.private-key.pem`

For setting up your own GitHub App, see the detailed guide in **[docs/SETUP.md](docs/SETUP.md)**.

## 💡 Common Use Cases

### Project Portfolio Management

```bash
# Generate portfolio overview
node scripts/repos_to_json.js both > portfolio-report.json
```

### AI Project Discovery

```bash
# Find all AI projects
node scripts/fetchRepos.js

# Export detailed AI project data
node scripts/repos_to_json.js ai-only > ai-projects.json
```

### Repository Audit

```bash
# Comprehensive repository audit
node scripts/get_all_repos.js --json > full-inventory.json
```

### Repository Analytics & Insights

```bash
# Generate comprehensive analytics report
node scripts/repository_analytics.js

# Export analytics data for further analysis
node scripts/repository_analytics.js --json > analytics-report.json

# Analyze specific metrics
node scripts/repository_analytics.js --json | jq '.summary.total_stars'
```

### CI/CD Integration

```bash
# Check repository status in build scripts
if node scripts/fetchRepos.js --json | jq -e '.repositories[] | select(.open_issues_count > 50)' > /dev/null; then
    echo "Warning: Some AI projects have >50 open issues"
fi
```

## 🔄 Auto-saved Files

All JSON outputs are automatically saved to timestamped files in the `output/` directory:

- `ai_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/fetchRepos.js --json)
- `ai_repositories_analytics_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/fetchRepos.js --analytics)
- `all_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/get_all_repos.js --json)
- `all_repositories_quick_analytics_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/get_all_repos.js --analytics)
- `repositories_all_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/repos_to_json.js all)
- `repositories_ai-only_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/repos_to_json.js ai-only)
- `repositories_both_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/repos_to_json.js both)
- `repository_analytics_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from scripts/repository_analytics.js)

## 🛠️ Advanced Usage

### Pipeline Integration

```bash
# Fetch and process AI repositories
node scripts/fetchRepos.js --json | jq '.repositories[] | select(.stargazers_count > 10) | .name'

# Count repositories by language
node scripts/repos_to_json.js all | jq '.repositories | group_by(.language) | map({language: .[0].language, count: length})'
```

### Automated Reporting

```bash
#!/bin/bash
echo "=== Daily Repository Report ==="
echo "Date: $(date)"
echo

echo "AI Projects:"
node scripts/fetchRepos.js
echo

echo "Repository Statistics:"
node scripts/repos_to_json.js both | jq '.summary'
```

For more advanced examples and integrations, see **[USAGE.md](USAGE.md)**.

## 🐛 Troubleshooting

### Authentication Issues

- Check that your private key file exists in the `config/` directory and is readable
- Verify your GitHub App ID and installation ID
- Ensure your GitHub App has repository access permissions

### No AI Projects Found

- Verify you have repositories with 'ai' in the name
- Check that the repositories are accessible to your GitHub App
- Consider case sensitivity in filtering

### API Rate Limits

- GitHub Apps provide higher rate limits than unauthenticated requests
- Consider implementing request throttling for large datasets

For detailed troubleshooting, see **[SETUP.md](SETUP.md#troubleshooting)**.

## 🤝 Contributing

Want to improve RepoFetch? Here's how to contribute:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**: `node fetchRepos.js`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the project files for details.

## 🙏 Acknowledgments

- Built with [Octokit](https://github.com/octokit/octokit.js) - GitHub API client
- Inspired by the need for better AI project management
- Thanks to the GitHub Apps documentation and community

## 📞 Support

Need help? Here's where to find assistance:

1. **📖 Documentation**: Check [docs/SETUP.md](docs/SETUP.md) and [docs/USAGE.md](docs/USAGE.md)
2. **🐛 Issues**: Report bugs or request features in the project repository
3. **💬 Community**: Join discussions in the project issues
4. **📧 Contact**: Reach out through the project's contact information

---

**Made with ❤️ for developers who love AI projects and efficient tooling.**

Ready to get started? Jump to **[docs/QUICKSTART.md](docs/QUICKSTART.md)** for the fastest path to productivity!
