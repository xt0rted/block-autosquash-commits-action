workflow "Push actions" {
  resolves = [
    "gimenete/eslint-action",
    "Block Autosquash Commits",
  ]
  on = "push"
}

action "gimenete/eslint-action" {
  uses = "gimenete/eslint-action@master"
  secrets = ["GITHUB_TOKEN"]
}

action "Block Autosquash Commits" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
}
