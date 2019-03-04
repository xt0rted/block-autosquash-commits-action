workflow "Pull request actions" {
  resolves = ["gimenete/eslint-action"]
  on = "pull_request"
}

action "gimenete/eslint-action" {
  uses = "gimenete/eslint-action@master"
  secrets = ["GITHUB_TOKEN"]
}
