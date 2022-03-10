/**
 * Lists pull requests based on provided options.
 *
 * @param github - GitHub API client
 * @param context - Script context
 * @param options - Listing options
 */
const getPullRequests = async (
  github: OctoGithub,
  context: OctoContext,
  options: PullsListBaseOpt,
) =>
  github.rest.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ...options,
  });

export default getPullRequests;
