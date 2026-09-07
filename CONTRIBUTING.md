# Contributing to Ai-Pulse

Thank you for your interest in contributing to **Ai-Pulse**! 🎉

Ai-Pulse is an open-source AI Usage Intelligence platform that helps users understand how they use AI tools such as ChatGPT, Claude, Gemini, Perplexity, and Grok.

We welcome bug fixes, improvements, documentation updates, accessibility improvements, UI enhancements, testing, and new features.

## Getting Started

### Prerequisites

Before contributing, make sure you have:

* Node.js 20 or newer
* Git
* A GitHub account
* A Supabase project for local development
* A code editor such as VS Code

Bun is recommended, but npm can also be used.

### Fork the Repository

1. Open the Ai-Pulse repository on GitHub.
2. Click **Fork**.
3. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/Ai-Pulse.git
cd Ai-Pulse
```

Replace `YOUR_USERNAME` with your GitHub username.

### Install Dependencies

Using Bun:

```bash
bun install
```

Or using npm:

```bash
npm install
```

### Configure Environment Variables

Create your local environment file based on the project's environment requirements.

Do not commit secrets, API keys, service-role keys, or other private credentials to GitHub.

### Start the Development Server

Using Bun:

```bash
bun run dev
```

Or using npm:

```bash
npm run dev
```

The application should then be available through the local development URL shown in your terminal.

## Project Structure

Some of the main areas of the project are:

```text
Ai-Pulse/
├── extension/                 # Chrome extension
├── public/                    # Public/static assets
├── src/
│   ├── components/            # React components and UI
│   ├── hooks/                 # Custom React hooks
│   ├── integrations/          # Supabase and other integrations
│   ├── lib/                   # Server functions and utilities
│   └── routes/                # Application routes
├── supabase/
│   └── migrations/            # Database migrations
├── README.md
├── package.json
└── vite.config.ts
```

If you are unsure where to make a change, open an existing related component or ask in the GitHub issue before starting.

## Finding Something to Work On

If you are new to the project, start with issues labeled:

* `good first issue` — beginner-friendly tasks
* `help wanted` — contributions where additional help is welcome
* `documentation` — documentation improvements
* `bug` — bug fixes
* `enhancement` — new functionality or improvements
* `accessibility` — accessibility improvements
* `testing` — tests and test infrastructure

Before starting work on an issue, check whether someone else is already working on it.

If the issue is not assigned, leave a comment saying that you would like to work on it.

## Creating an Issue

Before opening a new issue:

1. Search existing issues to make sure the problem or feature has not already been reported.
2. Use the appropriate issue template when available.
3. Provide enough information for another contributor to reproduce or understand the problem.
4. Include screenshots, logs, or relevant details when they are useful.

For bugs, please include:

* What happened
* What you expected to happen
* Steps to reproduce
* Browser/OS information when relevant
* Screenshots or error messages when applicable

For feature requests, explain:

* The problem the feature solves
* The proposed solution
* Any alternative solutions you considered

## Creating a Branch

Please create a separate branch for each contribution.

For example:

```bash
git checkout -b feature/dashboard-empty-state
```

Recommended naming patterns:

```text
feature/<short-description>
fix/<short-description>
docs/<short-description>
test/<short-description>
refactor/<short-description>
```

Avoid doing unrelated work in the same branch.

## Making Changes

When contributing code:

* Keep changes focused on the issue you are solving.
* Follow the existing project structure.
* Reuse existing components and utilities where possible.
* Use TypeScript consistently.
* Follow the existing Tailwind CSS and UI patterns.
* Keep components readable and maintainable.
* Avoid unnecessary dependencies.
* Do not commit secrets or credentials.
* Do not modify unrelated files without a reason.

### UI Changes

For UI contributions:

* Maintain the existing Ai-Pulse design language.
* Check both desktop and mobile layouts.
* Make interactive elements keyboard accessible.
* Preserve readable contrast and clear visual hierarchy.
* Avoid unnecessary changes to existing behavior.

### Database Changes

If your contribution changes the database:

* Add an appropriate Supabase migration.
* Do not manually modify production data.
* Consider Row Level Security (RLS) requirements.
* Make sure users cannot access another user's private data.

## Testing Your Changes

Before opening a pull request, make sure your changes work locally.

Run the available project checks:

```bash
bun run build
```

or:

```bash
npm run build
```

Also manually test the functionality you changed.

For UI changes, check:

* Desktop layout
* Mobile layout
* Loading states
* Empty states
* Error states
* Keyboard navigation where applicable

If you add tests, make sure they are reliable and focused on the behavior being tested.

## Commit Guidelines

Keep commit messages short and descriptive.

Good examples:

```text
Add dashboard empty state
Fix mobile dashboard layout
Add loading skeletons
Improve extension error handling
Update contribution documentation
```

Avoid vague messages such as:

```text
changes
update
fixed stuff
new things
```

## Pull Requests

When your work is ready:

1. Commit your changes.
2. Push your branch to your fork.

```bash
git push origin feature/dashboard-empty-state
```

3. Open a Pull Request against the main Ai-Pulse repository.
4. Clearly describe what you changed and why.
5. Link the issue your PR addresses.

For example:

```text
Closes #3
```

### Pull Request Checklist

Before submitting your PR, make sure:

* [ ] The change addresses the related issue.
* [ ] The project builds successfully.
* [ ] I tested my changes locally.
* [ ] I did not commit secrets or credentials.
* [ ] I kept the PR focused on one main purpose.
* [ ] I checked the UI on relevant screen sizes.
* [ ] I updated documentation if necessary.
* [ ] I added tests where appropriate.
* [ ] My commit messages are descriptive.

## Code Review

All pull requests may be reviewed before being merged.

Reviewers may request changes related to:

* Correctness
* Maintainability
* Security
* Accessibility
* Performance
* UI consistency
* Testing
* Documentation

Please treat review comments as part of the collaborative development process.

## Security

Please **do not report security vulnerabilities through public GitHub issues**.

Do not publish:

* API keys
* Passwords
* Supabase service-role keys
* Authentication tokens
* Private credentials
* Personal user data

If you discover a security vulnerability, contact the project maintainer privately before publicly disclosing the issue.

## Chrome Extension Contributions

Ai-Pulse includes a Chrome extension under:

```text
extension/
```

When modifying the extension:

* Test the extension locally using Chrome's developer tools.
* Verify that existing authentication/token behavior continues to work.
* Avoid collecting or logging sensitive user information.
* Keep the extension lightweight where possible.
* Test changes to background/service-worker behavior carefully.

## Documentation Contributions

Documentation improvements are always welcome.

You can contribute by improving:

* Installation instructions
* Setup instructions
* API documentation
* Extension documentation
* Troubleshooting guides
* Screenshots and examples
* Developer documentation
* Typographical or grammatical errors

Even small documentation improvements are valuable.

## Good First Issues

If you are contributing to Ai-Pulse for the first time, look for issues labeled:

**`good first issue`**

These issues are intentionally scoped to help new contributors get familiar with the project.

If you get stuck, don't hesitate to ask questions in the issue before making large changes.

## Contributor Recognition

Contributors who make meaningful improvements to Ai-Pulse may be recognized in the project's contributor history and documentation.

We appreciate contributions of all sizes, including:

* Code
* Bug reports
* Tests
* Documentation
* Accessibility improvements
* UI/UX improvements
* Ideas and feedback

## Thank You ❤️

Every contribution helps make Ai-Pulse better.

Whether you submit your first typo fix or build a major feature, thank you for taking the time to contribute!

Happy coding! 🚀
