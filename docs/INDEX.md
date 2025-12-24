# RepoFetch Documentation Index

Welcome to the RepoFetch documentation! This guide helps you navigate all available resources.

## Quick Links

### 🚀 Getting Started (5 minutes)
- **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in under 5 minutes
  - Prerequisites
  - Installation steps
  - Basic usage examples
  - Next steps

### 📖 Documentation Overview

| Document | Purpose | Audience |
|----------|---------|----------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup guide | New users |
| [README.md](README.md) | Project overview and features | Everyone |
| [SETUP.md](SETUP.md) | Detailed installation guide | Users setting up the project |
| [USAGE.md](USAGE.md) | Comprehensive usage reference | Active users |
| [API.md](API.md) | API and function documentation | Developers |
| [EXAMPLES.md](EXAMPLES.md) | Code samples and use cases | Developers & integrators |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Issue diagnosis and solutions | Users with problems |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines | Contributors |

## Documentation by Use Case

### 🎯 I want to...

#### Install and Run RepoFetch
1. Read: [QUICKSTART.md](QUICKSTART.md)
2. If issues: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

#### Use RepoFetch for My Project
1. Read: [USAGE.md](USAGE.md)
2. See: [EXAMPLES.md](EXAMPLES.md)
3. Reference: [API.md](API.md)

#### Integrate RepoFetch into My Application
1. Review: [EXAMPLES.md](EXAMPLES.md) - Integration section
2. Reference: [API.md](API.md) - Functions and data structures
3. Check: [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

#### Configure GitHub App
1. Read: [SETUP.md](SETUP.md) - GitHub App Configuration
2. Reference: [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Authentication Issues

#### Fix a Problem
1. Check: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Search for your error message
3. Follow the solutions provided

#### Contribute to RepoFetch
1. Read: [CONTRIBUTING.md](CONTRIBUTING.md)
2. Set up: [SETUP.md](SETUP.md) - Development Setup
3. Review: Code standards and testing guidelines

#### Understand the Project
1. Read: [README.md](README.md) - Project overview
2. Read: [PROJECT_ONBOARDING.md](PROJECT_ONBOARDING.md) - Project structure
3. Reference: [API.md](API.md) - Available scripts

## Documentation Structure

### Root Directory
```
/
├── README.md                    # Main project overview
├── QUICKSTART.md               # Quick start guide
├── SETUP.md                    # Detailed setup
├── USAGE.md                    # Usage reference
├── CONTRIBUTING.md             # Contribution guidelines
├── PROJECT_ONBOARDING.md       # Project structure
├── TODO.md                     # Development roadmap
└── docs/
    ├── INDEX.md                # This file
    ├── API.md                  # API documentation
    ├── EXAMPLES.md             # Code examples
    └── TROUBLESHOOTING.md      # Troubleshooting guide
```

## Key Sections

### Setup & Installation
- [QUICKSTART.md](QUICKSTART.md) - Fast setup (5 minutes)
- [SETUP.md](SETUP.md) - Detailed setup (20 minutes)
- [SETUP.md#github-app-configuration](SETUP.md#github-app-configuration) - GitHub App setup

### Usage & Commands
- [USAGE.md](USAGE.md) - Complete usage reference
- [README.md#available-scripts](README.md#available-scripts) - Script overview
- [API.md](API.md) - Detailed API documentation

### Code & Integration
- [EXAMPLES.md](EXAMPLES.md) - Practical code examples
- [EXAMPLES.md#integration-examples](EXAMPLES.md#integration-examples) - Integration patterns
- [EXAMPLES.md#automation-examples](EXAMPLES.md#automation-examples) - Automation scripts

### Troubleshooting
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Main troubleshooting guide
- [TROUBLESHOOTING.md#authentication-issues](TROUBLESHOOTING.md#authentication-issues) - Auth problems
- [TROUBLESHOOTING.md#network-and-api-issues](TROUBLESHOOTING.md#network-and-api-issues) - API issues

### Contributing
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [CONTRIBUTING.md#development-setup](CONTRIBUTING.md#development-setup) - Dev environment
- [CONTRIBUTING.md#pull-request-process](CONTRIBUTING.md#pull-request-process) - PR process

## Available Scripts

### 1. fetchRepos.js
**Purpose**: Fetch and analyze AI-focused repositories

**Usage**:
```bash
node scripts/fetchRepos.js [--json] [--analytics]
```

**Docs**: [USAGE.md#1-ai-projects-fetcher](USAGE.md#1-ai-projects-fetcher)

### 2. get_all_repos.js
**Purpose**: Fetch all accessible repositories

**Usage**:
```bash
node scripts/get_all_repos.js [--json] [--analytics]
```

**Docs**: [USAGE.md#2-all-repositories-fetcher](USAGE.md#2-all-repositories-fetcher)

### 3. repos_to_json.js
**Purpose**: Advanced JSON export with multiple formats

**Usage**:
```bash
node scripts/repos_to_json.js {all|ai-only|both}
```

**Docs**: [USAGE.md#3-advanced-json-export](USAGE.md#3-advanced-json-export)

### 4. repository_analytics.js
**Purpose**: Comprehensive analytics and insights

**Usage**:
```bash
node scripts/repository_analytics.js [--json]
```

**Docs**: [README.md#4-repository-analytics](README.md#4-repository-analytics)

## Common Tasks

### Run AI Repository Fetcher
```bash
node scripts/fetchRepos.js
# See: [USAGE.md#1-ai-projects-fetcher](USAGE.md#1-ai-projects-fetcher)
```

### Export to JSON
```bash
node scripts/fetchRepos.js --json
# See: [USAGE.md#json-output](USAGE.md#json-output)
```

### Generate Analytics Report
```bash
node scripts/repository_analytics.js
# See: [README.md#repository-analytics-features](README.md#repository-analytics-features)
```

### Integrate into JavaScript
```javascript
// See: [EXAMPLES.md#javascript-integration](EXAMPLES.md#javascript-integration)
```

### Create Automation Scripts
```bash
# See: [EXAMPLES.md#automation-examples](EXAMPLES.md#automation-examples)
```

## FAQ

### Q: Where do I start?
**A**: Read [QUICKSTART.md](QUICKSTART.md) first. It takes 5 minutes and gets you running.

### Q: How do I use the scripts?
**A**: Check [USAGE.md](USAGE.md) for complete command reference and examples.

### Q: How do I fix an error?
**A**: Search [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for your error message.

### Q: How do I integrate RepoFetch into my app?
**A**: See [EXAMPLES.md#integration-examples](EXAMPLES.md#integration-examples).

### Q: How do I contribute?
**A**: Read [CONTRIBUTING.md](CONTRIBUTING.md).

### Q: Where are the scripts?
**A**: In the `scripts/` directory. See [API.md](API.md) for full API documentation.

### Q: Where are the output files saved?
**A**: In the `output/` directory. See [README.md#auto-saved-files](README.md#auto-saved-files).

## Learning Paths

### Path 1: New User (15 minutes)
1. [QUICKSTART.md](QUICKSTART.md) (5 min)
2. [README.md](README.md) (5 min)
3. Run a script (5 min)

### Path 2: Active User (1 hour)
1. [QUICKSTART.md](QUICKSTART.md) (5 min)
2. [USAGE.md](USAGE.md) (30 min)
3. [EXAMPLES.md](EXAMPLES.md) (15 min)
4. Try examples (10 min)

### Path 3: Developer/Integrator (2 hours)
1. [QUICKSTART.md](QUICKSTART.md) (5 min)
2. [API.md](API.md) (30 min)
3. [EXAMPLES.md](EXAMPLES.md) (45 min)
4. [SETUP.md](SETUP.md) - Dev setup (20 min)
5. Write integration code (20 min)

### Path 4: Contributor (3 hours)
1. [CONTRIBUTING.md](CONTRIBUTING.md) (15 min)
2. [SETUP.md](SETUP.md) - Dev setup (20 min)
3. [API.md](API.md) (30 min)
4. [CODE_STYLE](CODE_STYLE.md) - Code standards (15 min)
5. Make contribution (90 min)

## Search Guide

### Find by Topic

**Authentication & Security**
- [SETUP.md#github-app-configuration](SETUP.md#github-app-configuration)
- [TROUBLESHOOTING.md#authentication-issues](TROUBLESHOOTING.md#authentication-issues)

**Configuration**
- [QUICKSTART.md#3-configure-github-app](QUICKSTART.md#3-configure-github-app)
- [SETUP.md](SETUP.md)

**Commands & Usage**
- [USAGE.md#command-reference](USAGE.md#command-reference)
- [README.md#available-scripts](README.md#available-scripts)

**Code Examples**
- [EXAMPLES.md#basic-usage-examples](EXAMPLES.md#basic-usage-examples)
- [EXAMPLES.md#integration-examples](EXAMPLES.md#integration-examples)

**Troubleshooting**
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Development**
- [CONTRIBUTING.md#development-setup](CONTRIBUTING.md#development-setup)
- [API.md](API.md)

## Document Versions

| Document | Last Updated | Version |
|----------|-------------|---------|
| README.md | 2024-12-23 | 1.0 |
| QUICKSTART.md | 2024-12-23 | 1.0 |
| SETUP.md | 2024-12-23 | 1.0 |
| USAGE.md | 2024-12-23 | 1.0 |
| CONTRIBUTING.md | 2024-12-23 | 1.0 |
| API.md | 2024-12-24 | 1.0 |
| EXAMPLES.md | 2024-12-24 | 1.0 |
| TROUBLESHOOTING.md | 2024-12-24 | 1.0 |

## Getting Help

### Documentation Issues
- **Typo or unclear?**: Check [CONTRIBUTING.md#improve-documentation](CONTRIBUTING.md#improve-documentation)
- **Missing information?**: Open an issue on GitHub

### Usage Questions
- **How do I...?**: Check [USAGE.md](USAGE.md) first
- **Still stuck?**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Bug Reports
- **Script error?**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Issue persists?**: Open GitHub issue with error details

### Feature Requests
- See [CONTRIBUTING.md#suggest-features](CONTRIBUTING.md#suggest-features)

## Quick Reference

### Commands
```bash
# Install
npm install

# AI projects
node scripts/fetchRepos.js

# All repositories
node scripts/get_all_repos.js

# Export JSON
node scripts/repos_to_json.js all

# Analytics
node scripts/repository_analytics.js
```

### Files
- **Private Key**: `config/fetchreposapp.2025-12-23.private-key.pem`
- **Output**: `output/`
- **Scripts**: `scripts/`
- **Config**: `config/`

### Configuration
- **APP_ID**: 2501453
- **INSTALLATION_ID**: 100314666
- **Node.js**: 14+

---

**Last Updated**: December 24, 2025

For the latest documentation, visit the [docs/](.) directory or check [README.md](README.md).