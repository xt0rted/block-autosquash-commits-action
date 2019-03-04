const { Toolkit } = require("actions-toolkit");
const PullRequestChecker = require(".");

const { context, exit, github: {
    pulls,
    repos
}, log } = new Toolkit();

const prChecker = new PullRequestChecker(context, pulls, repos, log);

prChecker.go()
    .then((result) =>
    {
        if (result){
            exit.success("No autosquash commits found");
        } else {
            exit.failure("Found autosquash commits");
        }
    });
