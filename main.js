const { Toolkit } = require("actions-toolkit");
const PullRequestChecker = require(".");
const path = require("path");

const {
    context,
    exit,
    github: { pulls, repos }
} = new Toolkit({ secrets: ["GITHUB_TOKEN"] });

const prChecker = new PullRequestChecker(context, pulls, repos);

const matchersPath = path.join(__dirname, ".github");
console.log(`::[add-matcher]${path.join(matchersPath, "git-autosquash.json")}`);

prChecker.go()
    .then((result) => {
        if (result === 0) {
            exit.success("No autosquash commits found");
        } else {
            exit.failure(`${result} commit(s) need to be squashed`);
        }
    });
