class PullRequestChecker {
    constructor(context, pulls, repos) {
        this.context = context;
        this.pulls = pulls;
        this.repos = repos;
    }

    async go()
    {
        const commits = await this.pulls.listCommits(this.context.issue);

        console.log(`Number of commits in the pull request: ${commits.data.length}`);

        let blockedCommits = 0;
        for (const commit of commits.data) {
            const isAutosquash = commit.commit.message.startsWith("fixup!") || commit.commit.message.startsWith("squash!");

            if (isAutosquash) {
                console.log(`Commit ${commit.sha} is an autosquash commit: ${commit.url}`);

                blockedCommits++;
            }
        }
        console.log(`Commits to block: ${blockedCommits}`)

        return blockedCommits;
    }
}

module.exports = PullRequestChecker;
