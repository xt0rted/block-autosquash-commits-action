# Block Autosquash Commits Action

![badge](https://action-badges.now.sh/xt0rted/block-autosquash-commits-action) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=xt0rted/block-autosquash-commits-action)](https://dependabot.com)

A Github Action to prevent merging pull requests containing [autosquash](https://git-scm.com/docs/git-rebase#git-rebase---autosquash) commit messages.

## How it works

If any commit message in the pull request starts with `fixup!` or `squash!` the check status will be set to `error`.

## Usage

```workflow
workflow "Push" {
  on = "push"
  resolves = ["Block Autosquash Commits"]
}

action "Block Autosquash Commits" {
  uses = "xt0rted/block-autosquash-commits-action@master"
  secrets = ["GITHUB_TOKEN"]
}
```

You'll also need to add a [required status check](https://help.github.com/en/articles/enabling-required-status-checks) rule for your action to block merging if it detects any `fixup!` or `squash!` commits.
