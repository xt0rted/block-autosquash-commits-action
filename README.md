# Block Autosquash Commits Action

[![CI](https://github.com/xt0rted/block-autosquash-commits-action/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/xt0rted/block-autosquash-commits-action/actions/workflows/ci.yml)
[![CodeQL](https://github.com/xt0rted/block-autosquash-commits-action/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/xt0rted/block-autosquash-commits-action/actions/workflows/codeql-analysis.yml)

A Github Action to prevent merging pull requests containing [autosquash](https://git-scm.com/docs/git-rebase#git-rebase---autosquash) commit messages.

## How it works

If any commit message in the pull request starts with `fixup!` or `squash!` the check status will be set to `error`.

>⚠️ GitHub's API only returns the first 250 commits of a PR so if you're working on a really large PR your fixup commits might not be detected.

## Usage

```yaml
name: Block on fixup commits

on: pull_request_target

jobs:
  message-check:
    runs-on: ubuntu-latest

    steps:
      - uses: xt0rted/block-autosquash-commits-action@v2
```

Either the [`pull_request`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) or [`pull_request_target`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_target) events can be used to trigger the workflow.

You'll also need to add a [required status check](https://help.github.com/en/articles/enabling-required-status-checks) rule for your action to block merging if it detects any `fixup!` or `squash!` commits.

## Token permissions

If your repository is using [token permissions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#permissions) you'll need to set `pull-request: read` on either the workflow or the job.

### Workflow config

```yaml
name: Block on fixup commits

on: pull_request_target

permissions:
  pull-requests: read

jobs:
  message-check:
    runs-on: ubuntu-latest

    steps:
      - uses: xt0rted/block-autosquash-commits-action@v2
```

### Job config

```yaml
name: Block on fixup commits

on: pull_request_target

jobs:
  message-check:
    runs-on: ubuntu-latest

    permissions:
      pull-requests: read

    steps:
      - uses: xt0rted/block-autosquash-commits-action@v2
```

## Options

Name | Allowed values | Description
-- | -- | --
`repo-token` | `GITHUB_TOKEN` (default) or PAT | `GITHUB_TOKEN` token or a repo scoped PAT.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
