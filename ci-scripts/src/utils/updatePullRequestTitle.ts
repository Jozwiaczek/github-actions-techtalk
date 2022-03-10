/**
 * Updates title of current pull request.
 *
 * @param github - GitHub API client
 * @param context - Script context
 * @param newTitle - New title for the current pull request
 */
const updatePullRequestTitle = async (
  github: OctoGithub,
  context: OctoContext,
  newTitle: string,
): Promise<void> => {
  await github.rest.pulls.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
    title: newTitle,
  });
};

export default updatePullRequestTitle;
