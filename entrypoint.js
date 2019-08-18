const { Toolkit } = require("actions-toolkit");
const PullRequestChecker = require(".");

const { context, exit, github: {
    pulls,
    repos
}, log } = new Toolkit({ secrets: ["GITHUB_TOKEN"] });

const prChecker = new PullRequestChecker(context, pulls, repos, log);

prChecker.go()
    .then((result) =>
    {
        if (result === 0){
            exit.success("No autosquash commits found");
        } else {
            exit.failure(`${result} commit(s) need to be squashed`);
        }
    });
