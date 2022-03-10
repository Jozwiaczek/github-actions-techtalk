import { createPullRequestNote } from '../utils';
import { getMergedTodayReleasePRs, updateProductionPrTitle } from './prepareProductionPR.utils';

const prepareProductionPR = async (github: OctoGithub, context: OctoContext) => {
  const prsReleasedToday = await getMergedTodayReleasePRs(github, context);
  await updateProductionPrTitle(github, context, prsReleasedToday.length);

  await createPullRequestNote(
    github,
    context,
    'production-pr-note',
    'Check **[production deployment guide](https://youtu.be/XqZsoesa55w?t=27)** before merging ❗️',
    'Request your teammate for code review.',
  );
};

export default prepareProductionPR;
