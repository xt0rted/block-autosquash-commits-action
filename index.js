class PullRequestChecker {
    constructor(context, pulls, repos, log) {
        this.context = context;
        this.pulls = pulls;
        this.repos = repos;
        this.log = log;
    }

    async go()
    {
        const commits = await this.pulls.listCommits(this.context.issue());

        this.log(`Number of commits in the pull request: ${commits.data.length}`);

        let blockedCommits = 0;
        for (const commit of commits.data) {
            const isAutosquash = commit.commit.message.startsWith("fixup!") || commit.commit.message.startsWith("squash!");

            if (isAutosquash) {
                this.log.info(`Commit ${commit.sha} is an autosquash commit: ${commit.url}`);

                blockedCommits++;
            }
        }
        this.log(`Commits to block: ${blockedCommits}`)

        return blockedCommits;
    }
}

module.exports = PullRequestChecker;
