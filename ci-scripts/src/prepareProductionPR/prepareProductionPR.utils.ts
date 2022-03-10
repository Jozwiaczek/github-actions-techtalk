import { getPullRequests, updatePullRequestTitle } from '../utils';

const isToday = (someDate?: string): boolean => {
  if (!someDate) {
    return false;
  }

  const inputDate = new Date(someDate);
  const today = new Date();
  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  );
};

const getProductionPRTitle = (currentDayCounterRelease: number): string => {
  const formatter = new Intl.DateTimeFormat('pl');
  const currentFormattedDate = formatter.format(new Date());
  const counterTag = currentDayCounterRelease > 0 ? ` | #${currentDayCounterRelease + 1}` : '';

  return `Release | ${currentFormattedDate}${counterTag}`;
};

export const getMergedTodayReleasePRs = async (
  github: OctoGithub,
  context: OctoContext,
): Promise<Array<OctoPullRequest>> => {
  const recentlyClosedPrs = await getPullRequests(github, context, {
    state: 'closed',
    sort: 'updated',
  });

  return recentlyClosedPrs.data.filter(
    ({ merged_at, title }) => isToday(merged_at) && title.includes('Release'),
  );
};

export const updateProductionPrTitle = async (
  github: OctoGithub,
  context: OctoContext,
  releasedPrsTodayTotal: number,
): Promise<void> => {
  const newTitle = getProductionPRTitle(releasedPrsTodayTotal);

  await updatePullRequestTitle(github, context, newTitle);
};
