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
    "gimenete/eslint-action",
  ]
  on = "push"
}

action "gimenete/eslint-action" {
  uses = "gimenete/eslint-action@master"
  secrets = ["GITHUB_TOKEN"]
}
