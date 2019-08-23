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

        console.log(`Number of commits in the pull request: ${commits.data.length}`);

        let blockedCommits = 0;
        for (const commit of commits.data) {
            const isAutosquash = commit.commit.message.startsWith("fixup!") || commit.commit.message.startsWith("squash!");

            if (isAutosquash) {
                error(`Commit ${commit.sha} is an autosquash commit: ${commit.url}`);

                blockedCommits++;
            }
        }
        console.log(`Commits to block: ${blockedCommits}`)

        return blockedCommits;
    }
}

module.exports = PullRequestChecker;
