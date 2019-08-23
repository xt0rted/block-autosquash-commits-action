const { setFailed } = require("@actions/core");
const { Toolkit } = require("actions-toolkit");
const { addProblemMatcher } = require("./problemMatcher");
const PullRequestChecker = require("./pullRequestChecker");

const {
    context,
    github: { pulls, repos }
} = new Toolkit({ secrets: ["GITHUB_TOKEN"] });

async function run() {
    try {
        addProblemMatcher("git-autosquash.json");

        const result = await new PullRequestChecker(context, pulls, repos).go();

        if (result === 0) {
            console.log("No autosquash commits found");
        } else {
            setFailed(`${result} commit(s) need to be squashed`);
        }
    } catch (error) {
        setFailed(error.message);
    }
}

run();
