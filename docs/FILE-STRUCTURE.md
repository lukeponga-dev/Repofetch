# RepoFetch File Structure

This document describes the complete file structure and organization of the RepoFetch project.

## Project Overview

```
Repofetch/
├── 📄 Project Configuration & Documentation
│   ├── README.md                          # Main project documentation
│   ├── QUICKSTART.md                     # 5-minute quick start guide
│   ├── SETUP.md                          # Detailed setup instructions
│   ├── USAGE.md                          # Complete usage reference
│   ├── CONTRIBUTING.md                   # Contribution guidelines
│   ├── PROJECT_ONBOARDING.md             # Project onboarding guide
│   ├── TODO.md                           # Development roadmap
│   ├── package.json                      # Project dependencies
│   ├── package-lock.json                 # Locked dependency versions
│   └── .gitignore                        # Git ignore rules
│
├── 📁 config/                            # Configuration files
│   └── fetchreposapp.2025-12-23.private-key.pem    # GitHub App private key
│
├── 📁 docs/                              # Comprehensive documentation
│   ├── INDEX.md                          # Documentation hub & navigation
│   ├── API.md                            # API reference & function docs
│   ├── EXAMPLES.md                       # Code examples & integrations
│   └── TROUBLESHOOTING.md                # Troubleshooting guide
│
├── 📁 scripts/                           # Main application scripts
│   ├── fetchRepos.js                    # AI repository fetcher
│   ├── get_all_repos.js                 # Complete repository inventory
│   ├── repos_to_json.js                 # Advanced JSON export tool
│   └── repository_analytics.js          # Analytics engine
│
├── 📁 output/                            # Generated JSON output files
│   ├── all_repositories_*.json           # All repositories export
│   ├── repositories_all_*.json           # Alternative all repos export
│   ├── repositories_ai-only_*.json       # AI-only repositories
│   ├── repositories_both_*.json          # Combined export format
│   ├── all_repositories_quick_analytics_*.json  # Analytics snapshot
│   └── repository_analytics_*.json       # Full analytics report
│
├── 📁 node_modules/                      # Dependencies (auto-installed)
│   └── octokit/                          # GitHub API client library
│       ├── dist-bundle/
│       ├── dist-src/
│       ├── dist-types/
│       └── ... (other dependencies)
│
└── 📁 .vscode/                           # VS Code settings (optional)
```

## Directory Details

### Root Directory

The root directory contains project-level files and configuration:

| File                    | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `README.md`             | Main project documentation and feature overview |
| `QUICKSTART.md`         | Fast setup guide (5 minutes)                    |
| `SETUP.md`              | Detailed installation and configuration         |
| `USAGE.md`              | Comprehensive command reference                 |
| `CONTRIBUTING.md`       | Guidelines for contributing to the project      |
| `PROJECT_ONBOARDING.md` | New contributor guide and project structure     |
| `TODO.md`               | Development roadmap and future features         |
| `package.json`          | Project metadata and dependencies               |
| `package-lock.json`     | Locked versions for reproducible installs       |
| `.gitignore`            | Git ignore patterns                             |

### config/ - Configuration

Contains sensitive configuration files and GitHub App credentials:

```
config/
└── fetchreposapp.2025-12-23.private-key.pem
    └── GitHub App private key for authentication
```

**Security Note**: Never commit this file to version control. It's in `.gitignore` by default.

### docs/ - Documentation

Comprehensive documentation organized for easy navigation:

```
docs/
├── INDEX.md
│   └── Documentation hub and navigation guide
│       - Quick links by use case
│       - Learning paths for different users
│       - Search guide and FAQ
│       - Cross-references to all docs
│
├── API.md
│   └── Complete API reference
│       - Script function documentation
│       - Data structures (Repository, Analytics objects)
│       - Configuration options
│       - Error handling patterns
│       - Security considerations
│
├── EXAMPLES.md
│   └── Practical code examples
│       - Basic usage examples
│       - Advanced filtering with jq
│       - JavaScript integration
│       - Python integration
│       - Shell script integration
│       - Automation scripts
│       - Data analysis examples
│       - Report generation examples
│
└── TROUBLESHOOTING.md
    └── Issue diagnosis and solutions
        - Authentication issues
        - Network and API issues
        - File system issues
        - Output formatting issues
        - Performance issues
        - Environment issues
        - Advanced debugging techniques
```

### scripts/ - Application Scripts

The core scripts that power RepoFetch:

```
scripts/
├── fetchRepos.js
│   └── AI-focused repository fetcher
│       - Fetches repositories with 'ai' in the name
│       - Supports JSON output and analytics
│       - Auto-saves results to output/
│
├── get_all_repos.js
│   └── Complete repository inventory
│       - Fetches all accessible repositories
│       - Shows privacy indicators (public/private)
│       - Supports analytics and JSON export
│
├── repos_to_json.js
│   └── Advanced JSON export tool
│       - Multiple export formats (all, ai-only, both)
│       - Generates summary statistics
│       - Comprehensive metadata
│
└── repository_analytics.js
    └── Analytics and insights engine
        - Language distribution analysis
        - Popularity metrics
        - Repository age analysis
        - Size distribution
        - Privacy analysis
        - Activity tracking
```

### output/ - Generated Data

Contains auto-saved JSON files from script runs:

```
output/
├── all_repositories_2025-12-23T20-27-50-129Z.json
│   └── All accessible repositories (auto-saved with timestamp)
│
├── repositories_all_2025-12-23T20-58-37-663Z.json
│   └── Alternative all repositories export
│
├── all_repositories_quick_analytics_2025-12-23T19-45-04-599Z.json
│   └── Quick analytics snapshot
│
├── repository_analytics_2025-12-23T20-26-50-536Z.json
│   └── Comprehensive analytics report
│
└── repositories_{format}_YYYY-MM-DDTHH-MM-SS-sssZ.json
    └── Export format variations (all, ai-only, both)
```

**File Naming Convention**: `{type}_{name}_YYYY-MM-DDTHH-MM-SS-sssZ.json`

- Timestamp allows multiple versions without conflicts
- ISO 8601 format ensures proper sorting

### node_modules/ - Dependencies

Auto-installed dependencies (git-ignored):

```
node_modules/
├── octokit/               # GitHub API client (main dependency)
├── (other peer dependencies)
└── .bin/                  # Executable scripts
```

**Installation**: Run `npm install` to populate this directory.

## File Organization

### By Purpose

**Documentation Files**

- Root: `README.md`, `QUICKSTART.md`, `SETUP.md`, `USAGE.md`
- Detailed: `CONTRIBUTING.md`, `PROJECT_ONBOARDING.md`
- Reference: `docs/API.md`, `docs/EXAMPLES.md`
- Troubleshooting: `docs/TROUBLESHOOTING.md`
- Navigation: `docs/INDEX.md`

**Configuration Files**

- `package.json` - Project metadata and dependencies
- `package-lock.json` - Dependency lock file
- `config/fetchreposapp.2025-12-23.private-key.pem` - GitHub App key
- `.gitignore` - Version control ignore rules

**Application Code**

- `scripts/fetchRepos.js` - AI project fetcher
- `scripts/get_all_repos.js` - All repositories fetcher
- `scripts/repos_to_json.js` - JSON export tool
- `scripts/repository_analytics.js` - Analytics engine

**Generated Output**

- `output/*.json` - Auto-saved JSON reports

### By Accessibility

**Public (Always Visible)**

- All `.md` files (documentation)
- `package.json` (project metadata)
- `scripts/` directory (application code)

**Private (Git-Ignored)**

- `node_modules/` - Dependencies
- `config/*.pem` - Private keys
- Sensitive configuration files

**Output (Generated)**

- `output/*.json` - Generated data files
- New files created with each script run

## File Types

### Markdown (.md)

- `README.md` - Project overview
- `QUICKSTART.md` - Quick start guide
- `SETUP.md` - Setup instructions
- `USAGE.md` - Usage reference
- `CONTRIBUTING.md` - Contributing guide
- `docs/INDEX.md` - Documentation index
- `docs/API.md` - API documentation
- `docs/EXAMPLES.md` - Code examples
- `docs/TROUBLESHOOTING.md` - Troubleshooting

### JSON Files (.json)

- `package.json` - Project configuration
- `package-lock.json` - Dependency lock
- `output/*.json` - Generated reports

### JavaScript (.js)

- `scripts/*.js` - Application scripts (Node.js)

### Private Key (.pem)

- `config/*.pem` - GitHub App private keys (KEEP SECURE!)

## Usage Paths

### Common File Access Patterns

**Getting Started**

```
README.md
  ↓
QUICKSTART.md
  ↓
scripts/fetchRepos.js
```

**Detailed Setup**

```
SETUP.md
  ↓
config/ (GitHub App key)
  ↓
scripts/ (run any script)
```

**Learning Commands**

```
USAGE.md
  ↓
docs/EXAMPLES.md
  ↓
scripts/ (try examples)
```

**Troubleshooting**

```
docs/TROUBLESHOOTING.md
  ↓
docs/API.md (reference)
  ↓
scripts/ (review code)
```

**Integration Development**

```
docs/API.md
  ↓
docs/EXAMPLES.md
  ↓
scripts/ (study code)
```

## Size Information

### Approximate Sizes

| Directory       | Size     | Purpose          |
| --------------- | -------- | ---------------- |
| `docs/`         | ~500 KB  | Documentation    |
| `scripts/`      | ~50 KB   | Application code |
| `config/`       | ~5 KB    | Configuration    |
| `node_modules/` | ~100+ MB | Dependencies     |
| `output/`       | Variable | Generated data   |

### Cleanup

To reduce disk usage:

```bash
# Remove old output files (30+ days)
find output/ -type f -mtime +30 -delete

# Compress old JSON files
gzip output/*.json

# Remove node_modules (can be reinstalled)
rm -rf node_modules/
npm install  # Reinstall when needed
```

## Naming Conventions

### Script Files

- Kebab-case: `fetch-repos.js`, `get-all-repos.js`
- Camel-case for internal functions

### Output Files

- Format: `{type}_{name}_YYYY-MM-DDTHH-MM-SS-sssZ.json`
- Example: `all_repositories_2025-12-23T20-27-50-129Z.json`
- Always include ISO 8601 timestamp

### Configuration Files

- Versioned keys: `fetchreposapp.2025-12-23.private-key.pem`
- Includes app name, date, and file type

### Documentation Files

- Uppercase with underscores: `README.md`, `SETUP.md`
- Docs folder: lowercase with extension `docs/API.md`

## Git Ignore Strategy

Files excluded from version control:

```
# Dependencies
node_modules/

# Private keys and secrets
config/*.pem
config/*-private-key.pem

# Generated files
output/*.json
*.tmp

# Environment
.env
.env.local

# IDE files
.vscode/
.idea/
*.swp
```

## Adding New Files

When adding new files to the project:

1. **Documentation**: Place in `docs/` with descriptive name
2. **Scripts**: Place in `scripts/` with kebab-case naming
3. **Configuration**: Place in `config/` - add to `.gitignore` if sensitive
4. **Output**: Let auto-save to `output/` with timestamp
5. **Dependencies**: Update `package.json` and run `npm install`

## Directory Permissions

Recommended permissions:

```bash
# Linux/Mac
chmod 755 scripts/          # Executable directory
chmod 755 config/           # Readable directory
chmod 600 config/*.pem      # Private key (owner only)
chmod 755 output/           # Output directory
chmod 644 *.md              # Documentation files
chmod 644 *.json            # JSON files
```

## Quick Reference

| Task           | Location                                      |
| -------------- | --------------------------------------------- |
| Get started    | [QUICKSTART.md](../QUICKSTART.md)             |
| Learn commands | [USAGE.md](../USAGE.md)                       |
| Fix problems   | [docs/TROUBLESHOOTING.md](TROUBLESHOOTING.md) |
| View examples  | [docs/EXAMPLES.md](EXAMPLES.md)               |
| API reference  | [docs/API.md](API.md)                         |
| Install        | Run `npm install`                             |
| Run scripts    | `node scripts/*.js`                           |
| Check output   | `output/` directory                           |
| See config     | `config/` directory                           |

---

**Last Updated**: December 24, 2025

For more information, see [docs/INDEX.md](INDEX.md) or [README.md](../README.md).
