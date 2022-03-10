// Identification for already existed pull request notes
const COMMENT_BASE_SIGNATURE = 'via Intent GitHub Actions';

/**
 * Creates comment note in current pull request.
 *
 * @param github - GitHub API client
 * @param context - Script context
 * @param id - Identifier of the note/comment (e.g., "release-warning").
 * @param title - Title of the note/comment (e.g., "Release warning")
 * @param body - Note/Comment body
 */
const createPullRequestNote = async (
  github: OctoGithub,
  context: OctoContext,
  id: string,
  title: string,
  body: string,
): Promise<void> => {
  const baseRequest = {
    owner: context.repo.owner,
    repo: context.repo.repo,
  };

  const baseCommentRequest = {
    ...baseRequest,
    issue_number: context.issue.number,
  };

  const commentSignature = `_${COMMENT_BASE_SIGNATURE} [${id}]_`;
  const newLine = '\n\n';

  const comment = {
    ...baseCommentRequest,
    body: `## ${title}\n${newLine}${body}${newLine}${commentSignature}`,
  };

  const pullRequestComments = (await github.rest.issues.listComments(baseCommentRequest)).data;
  const alreadyExistCommentId = pullRequestComments.find(
    (existedComment) =>
      existedComment.user.type === 'Bot' && existedComment.body.includes(commentSignature),
  )?.id;

  if (alreadyExistCommentId) {
    await github.rest.issues.updateComment({
      ...baseRequest,
      comment_id: alreadyExistCommentId,
      body: comment.body,
    });
  }

  if (!alreadyExistCommentId) {
    await github.rest.issues.createComment(comment);
  }
};

export default createPullRequestNote;
