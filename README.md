# Block Autosquash Commits Action

![badge](https://github.com/xt0rted/block-autosquash-commits-action/workflows/Push%20actions/badge.svg) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=xt0rted/block-autosquash-commits-action)](https://dependabot.com)

A Github Action to prevent merging pull requests containing [autosquash](https://git-scm.com/docs/git-rebase#git-rebase---autosquash) commit messages.

## How it works

If any commit message in the pull request starts with `fixup!` or `squash!` the check status will be set to `error`.

## Usage

```yaml
on: pull_request

name: Pull Requests

jobs:
  message-check:
    name: Block Autosquash Commits

    runs-on: ubuntu-latest

    steps:
      - name: Block Autosquash Commits
        uses: xt0rted/block-autosquash-commits-action@master
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

You'll also need to add a [required status check](https://help.github.com/en/articles/enabling-required-status-checks) rule for your action to block merging if it detects any `fixup!` or `squash!` commits.
