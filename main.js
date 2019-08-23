const { Toolkit } = require("actions-toolkit");
const { addProblemMatcher } = require("./problemMatcher");
const PullRequestChecker = require("./pullRequestChecker");

const {
    context,
    exit,
    github: { pulls, repos }
} = new Toolkit({ secrets: ["GITHUB_TOKEN"] });

addProblemMatcher("git-autosquash.json");

const prChecker = new PullRequestChecker(context, pulls, repos);

prChecker.go()
    .then((result) => {
        if (result === 0) {
            exit.success("No autosquash commits found");
        } else {
            exit.failure(`${result} commit(s) need to be squashed`);
        }
    });
