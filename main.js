const { getInput, setFailed } = require("@actions/core");

const { addProblemMatcher } = require("./problemMatcher");
const PullRequestChecker = require("./pullRequestChecker");

async function run() {
    try {
        addProblemMatcher("git-autosquash.json");

        var result = await new PullRequestChecker(
            getInput("repo-token", { required: true })
        ).go();

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
