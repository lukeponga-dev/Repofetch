# Contributing to RepoFetch

Thank you for your interest in contributing to RepoFetch! This document provides guidelines and information for contributors.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Documentation](#documentation)
7. [Pull Request Process](#pull-request-process)
8. [Issue Reporting](#issue-reporting)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful** and inclusive in your language and actions
- **Be collaborative** and help others learn
- **Be constructive** in feedback and criticism
- **Stay focused** on what is best for the community
- **Show empathy** towards other community members

## How to Contribute

There are many ways to contribute to RepoFetch:

### 🐛 Report Bugs

- Use the issue tracker to report bugs
- Include clear steps to reproduce the issue
- Provide environment details (Node.js version, OS, etc.)

### 💡 Suggest Features

- Open an issue with the "enhancement" label
- Describe the feature and its potential benefits
- Consider implementation complexity

### 📝 Improve Documentation

- Fix typos, improve clarity, add examples
- Update guides and references
- Add missing documentation

### 🔧 Code Contributions

- Fix bugs or implement features
- Improve performance or code quality
- Add new output formats or filters

### 🧪 Testing

- Add test cases for existing functionality
- Test on different environments
- Verify compatibility with different Node.js versions

## Development Setup

### Prerequisites

- Node.js 14+
- Git
- A GitHub account for testing GitHub App integration

### Setup Process

1. **Fork the Repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Repofetch.git
   cd Repofetch
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a Test Environment**

   ```bash
   # Create a test GitHub App for development
   # Update configuration in scripts as needed
   ```

4. **Verify Setup**

   ```bash
   # Test basic functionality
   node fetchRepos.js

   # Test JSON output
   node fetchRepos.js --json
   ```

### Development Workflow

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**

   - Follow coding standards
   - Write tests for new functionality
   - Update documentation

3. **Test Thoroughly**

   ```bash
   # Test all scripts
   node fetchRepos.js
   node get_all_repos.js
   node repos_to_json.js all

   # Test error scenarios
   # Test with invalid configurations
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Then create a Pull Request on GitHub
   ```

## Coding Standards

### JavaScript Style Guide

- **Use consistent indentation** (2 spaces)
- **Use meaningful variable names**
- **Add comments for complex logic**
- **Use async/await for asynchronous operations**
- **Handle errors gracefully**

### Code Examples

#### Good

```javascript
async function fetchAIRepositories() {
  try {
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    const app = new App({ appId, privateKey });
    const octokit = await app.getInstallationOctokit(installationId);

    const { data } = await octokit.request("GET /installation/repositories");
    return data.repositories.filter((repo) =>
      repo.name.toLowerCase().includes("ai")
    );
  } catch (error) {
    console.error("❌ Error fetching repositories:", error.message);
    throw error;
  }
}
```

#### Avoid

```javascript
function fetch() {
  const k = fs.readFileSync(p, "utf8");
  const a = new App({ appId, privateKey: k });
  return a.getInstallationOctokit(i).then((o) => {
    return o
      .request("GET /installation/repositories")
      .then((r) => r.data.repositories);
  });
}
```

### File Organization

- **One main export per file**
- **Consistent naming conventions**
- **Group related functionality together**
- **Keep configuration at the top**

### Error Handling

```javascript
// Use try-catch for async operations
try {
  // Operation that might fail
} catch (error) {
  console.error("❌ Descriptive error message:", error.message);
  // Provide fallback or re-throw if needed
  throw error;
}
```

## Testing Guidelines

### Manual Testing

Always test your changes manually:

```bash
# Test basic functionality
node fetchRepos.js

# Test JSON output
node fetchRepos.js --json

# Test all repository fetcher
node get_all_repos.js

# Test advanced JSON export
node repos_to_json.js both
```

### Test Scenarios

1. **Happy Path Tests**

   - Normal operation with valid configuration
   - Multiple repositories
   - AI project filtering
   - JSON output generation

2. **Edge Cases**

   - No repositories found
   - No AI repositories
   - Private repositories
   - Large numbers of repositories

3. **Error Scenarios**

   - Invalid private key
   - Wrong GitHub App ID
   - Missing installation ID
   - Network connectivity issues

4. **Integration Tests**
   - File system operations
   - JSON serialization
   - CLI argument parsing
   - Output formatting

### Automated Testing (Future)

When adding automated tests:

```javascript
// Example test structure
const { App } = require("octokit");
const fs = require("fs");

describe("fetchRepos.js", () => {
  test("should fetch AI repositories", async () => {
    // Test implementation
  });

  test("should handle JSON output", async () => {
    // Test JSON generation
  });
});
```

## Documentation

### Code Documentation

- **Add JSDoc comments for functions**
- **Explain complex algorithms**
- **Document configuration options**
- **Include usage examples**

```javascript
/**
 * Fetches repositories containing 'ai' in the name
 * @param {Object} options - Configuration options
 * @param {number} options.appId - GitHub App ID
 * @param {number} options.installationId - Installation ID
 * @param {string} options.privateKeyPath - Path to private key
 * @returns {Promise<Array>} Array of AI repository objects
 */
async function fetchAIRepositories({ appId, installationId, privateKeyPath }) {
  // Implementation
}
```

### User Documentation

When adding new features:

1. **Update README.md** with feature overview
2. **Update USAGE.md** with detailed examples
3. **Update QUICKSTART.md** if it's a core feature
4. **Add examples** to relevant sections

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
2. **Update documentation**
3. **Check code style** with your linter
4. **Test edge cases**
5. **Verify no breaking changes**

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (describe)

## Testing

- [ ] Manual testing completed
- [ ] All scripts tested
- [ ] Edge cases verified
- [ ] No breaking changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Examples added/updated
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on different environments
4. **Documentation review**
5. **Final approval** and merge

### After Merge

- **Delete feature branch**
- **Update changelog** (if applicable)
- **Close related issues**
- **Announce changes** (if significant)

## Issue Reporting

### Bug Reports

Use the following template:

```markdown
**Bug Description**
Clear description of the bug

**Environment**

- Node.js version:
- Operating System:
- RepoFetch version:

**Steps to Reproduce**

1. Step one
2. Step two
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Error Messages**
Include any error messages

**Additional Context**
Any other relevant information
```

### Feature Requests

Use the following template:

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Screenshots, mockups, or examples
```

## Getting Help

### Before Asking Questions

1. **Check existing documentation** (README.md, SETUP.md, USAGE.md)
2. **Search existing issues** for similar problems
3. **Review recent commits** for related changes

### Asking Questions

1. **Be specific** about your problem
2. **Include environment details**
3. **Provide error messages** (if any)
4. **Show what you've tried** to solve it

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: For private security concerns

## Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to RepoFetch! Your help makes this project better for everyone. 🚀
