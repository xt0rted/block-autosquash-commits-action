const { debug, error } = require("@actions/core");
const {
    context,
    GitHub,
} = require("@actions/github");

class PullRequestChecker {
    constructor(repoToken) {
        this.client = new GitHub(repoToken);
    }

    async process() {
        const commits = await this.client.pulls.listCommits({
            ...context.repo,
            pull_number: context.issue.number,
        });

        debug(`${commits.data.length} commits in the pull request`);

        let blockedCommits = 0;
        for (const commit of commits.data) {
            const isAutosquash = commit.commit.message.startsWith("fixup!") || commit.commit.message.startsWith("squash!");

            if (isAutosquash) {
                error(`Commit ${commit.sha} is an autosquash commit: ${commit.url}`);

                blockedCommits++;
            }
        }

        if (blockedCommits) {
            throw Error(`${blockedCommits} commit(s) need to be squashed`);
        }
    }
}

module.exports = PullRequestChecker;
