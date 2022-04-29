# Block Merge Commits Action

[![CI](https://github.com/Morishiri/block-merge-commits-action/workflows/CI/badge.svg)](https://github.com/Morishiri/block-merge-commits-action/actions?query=workflow%3ACI)
[![CodeQL](https://github.com/Morishiri/block-merge-commits-action/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/Morishiri/block-merge-commits-action/actions/workflows/codeql-analysis.yml)

A Github Action to prevent merging pull requests containing merge commits.

## How it works

If any commit in the pull request is a merge commit, the check status will be set to `error`.

>⚠️ GitHub's API only returns the first 250 commits of a PR so if you're working on a really large PR your merge commits might not be detected.

## Usage

```yaml
on: pull_request

name: Pull Requests

jobs:
  message-check:
    name: Block Merge Commits

    runs-on: ubuntu-latest

    steps:
      - name: Block Merge Commits
        uses: Morishiri/block-merge-commits-action@v2
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

You'll also need to add a [required status check](https://help.github.com/en/articles/enabling-required-status-checks) rule for your action to block merging if it detects merge commits.

### Control Permissions

If your repository is using [control permissions](https://github.blog/changelog/2021-04-20-github-actions-control-permissions-for-github_token/) you'll need to set `pull-request: read` on either the workflow or the job.

#### Workflow Config

```yaml
on: pull_request

name: Pull Request

permissions:
  pull-requests: read

jobs:
  message-check:
    name: Block Merge Commits

    runs-on: ubuntu-latest

    steps:
      - name: Block Merge Commits
        uses: Morishiri/block-merge-commits-action@v2
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

#### Job Config

```yaml
on: pull_request

name: Pull Request

jobs:
  message-check:
    name: Block Merge Commits

    runs-on: ubuntu-latest

    permissions:
      pull-requests: read

    steps:
      - name: Block Merge Commits
        uses: Morishiri/block-merge-commits-action@v2
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```
