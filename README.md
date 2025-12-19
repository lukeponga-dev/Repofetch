# 🚀 RepoFetch - AI Projects Repository Fetcher

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![GitHub](https://img.shields.io/badge/GitHub-App%20Integration-blue.svg)](https://docs.github.com/en/apps)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

A powerful Node.js application for fetching and managing GitHub repositories with a focus on AI projects. Built with GitHub Apps integration for secure, high-performance repository access and multiple export formats.

## ✨ Features

- **🔐 GitHub App Integration**: Secure authentication using GitHub Apps with private key
- **🤖 AI Project Filtering**: Smart filtering for repositories containing 'ai' in the name
- **📊 Multiple Output Formats**: Console display, emoji-coded lists, or structured JSON
- **💾 JSON Export**: Auto-save repository data to timestamped JSON files
- **🎯 Flexible Queries**: Fetch all repositories or filter for AI-only projects
- **📈 Rich Metadata**: Complete repository information (stars, forks, language, timestamps)
- **⚡ High Performance**: Optimized with GitHub Apps for higher API rate limits
- **🛠️ CLI Ready**: Perfect for automation, scripts, and CI/CD pipelines

## 🚀 Quick Start

New to RepoFetch? Get started in under 5 minutes!

👉 **[Start with QUICKSTART.md](QUICKSTART.md)** - For immediate setup and basic usage

Looking for detailed information? Check out these guides:

- 📖 **[SETUP.md](SETUP.md)** - Comprehensive setup and configuration guide
- 📖 **[USAGE.md](USAGE.md)** - Complete usage reference with examples
- 🛠️ **[This README](#)** - Project overview and quick reference

## 📁 Project Structure

```
/workspaces/Repofetch/
├── 📜 QUICKSTART.md              # 5-minute setup guide
├── 📜 SETUP.md                   # Detailed setup instructions
├── 📜 USAGE.md                   # Complete usage reference
├── 📜 README.md                  # This file (project overview)
├── 📄 fetchRepos.js              # AI-focused repository fetcher
├── 📄 get_all_repos.js           # Complete repository inventory
├── 📄 repos_to_json.js           # Advanced JSON export tool
├── 📄 package.json               # Project dependencies
└── 🔑 fetchreposapp.2025-12-19.private-key.pem  # GitHub App private key
```

## 🛠️ Available Scripts

### 1. AI Projects Fetcher (`fetchRepos.js`)
Fetches repositories containing 'ai' in the name with optional JSON export.

```bash
# Standard output
node fetchRepos.js
# Output: 🤖 ai-chatbot
#         🤖 machine-learning-tools

# JSON output
node fetchRepos.js --json
# or
node fetchRepos.js -j
```

### 2. All Repositories Fetcher (`get_all_repos.js`)
Fetches all accessible repositories with privacy indicators.

```bash
# Standard output
node get_all_repos.js
# Output: 🌍 username/repo1
#         🔒 username/private-repo

# JSON output
node get_all_repos.js --json
# or
node get_all_repos.js -j
```

### 3. Advanced JSON Export (`repos_to_json.js`)
Advanced export with multiple format options.

```bash
# Export all repositories
node repos_to_json.js all

# Export only AI repositories
node repos_to_json.js ai-only

# Export summary + detailed data
node repos_to_json.js both
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
      "default_branch": "main"
    }
  ]
}
```

## 🔧 Requirements

- **Node.js** (version 14 or higher)
- **GitHub App** with repository access permissions
- **Private key file** for GitHub App authentication
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
- **Private Key**: `fetchreposapp.2025-12-19.private-key.pem`

For setting up your own GitHub App, see the detailed guide in **[SETUP.md](SETUP.md)**.

## 💡 Common Use Cases

### Project Portfolio Management
```bash
# Generate portfolio overview
node repos_to_json.js both > portfolio-report.json
```

### AI Project Discovery
```bash
# Find all AI projects
node fetchRepos.js

# Export detailed AI project data
node repos_to_json.js ai-only > ai-projects.json
```

### Repository Audit
```bash
# Comprehensive repository audit
node get_all_repos.js --json > full-inventory.json
```

### CI/CD Integration
```bash
# Check repository status in build scripts
if node fetchRepos.js --json | jq -e '.repositories[] | select(.open_issues_count > 50)' > /dev/null; then
    echo "Warning: Some AI projects have >50 open issues"
fi
```

## 🔄 Auto-saved Files

All JSON outputs are automatically saved to timestamped files:
- `ai_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from fetchRepos.js)
- `all_repositories_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from get_all_repos.js)
- `repositories_{format}_YYYY-MM-DDTHH-MM-SS-sssZ.json` (from repos_to_json.js)

## 🛠️ Advanced Usage

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
echo "=== Daily Repository Report ==="
echo "Date: $(date)"
echo

echo "AI Projects:"
node fetchRepos.js
echo

echo "Repository Statistics:"
node repos_to_json.js both | jq '.summary'
```

For more advanced examples and integrations, see **[USAGE.md](USAGE.md)**.

## 🐛 Troubleshooting

### Authentication Issues
- Check that your private key file exists and is readable
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

1. **📖 Documentation**: Check [SETUP.md](SETUP.md) and [USAGE.md](USAGE.md)
2. **🐛 Issues**: Report bugs or request features in the project repository
3. **💬 Community**: Join discussions in the project issues
4. **📧 Contact**: Reach out through the project's contact information

---

**Made with ❤️ for developers who love AI projects and efficient tooling.**

Ready to get started? Jump to **[QUICKSTART.md](QUICKSTART.md)** for the fastest path to productivity!
