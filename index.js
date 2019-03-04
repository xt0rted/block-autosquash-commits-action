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
        this.log(`Commits for this PR: ${commits.data.length}`);

        const shouldBlock = commits.data.some((commit) =>
            commit.commit.message.startsWith("fixup!") || commit.commit.message.startsWith("squash!")
        );
        this.log(`Should block: ${shouldBlock}`);

        return !shouldBlock;
    }
}

module.exports = PullRequestChecker;
