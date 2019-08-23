const { getInput, setFailed } = require("@actions/core");

const PullRequestChecker = require("./pullRequestChecker");

async function run() {
    try {
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
