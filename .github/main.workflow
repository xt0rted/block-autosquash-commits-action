workflow "Pull requests" {
  on = "pull_request"
  resolves = ["Block Autosquash Commits"]
}

action "Block Autosquash Commits" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Push actions" {
  resolves = [
    "Install Dependencies",
    "ESLint",
  ]
  on = "push"
}

action "Install Dependencies" {
  uses = "docker://node:12-alpine"
  runs = "npm ci"
}

action "ESLint" {
  uses = "xt0rted/eslint-action@d9bd6dd0a116fc40c6d7a478c856eefd63bd4d07"
    needs = ["Install Dependencies"]
  secrets = ["GITHUB_TOKEN"]
}
