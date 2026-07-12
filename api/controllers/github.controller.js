import { githubGraphQL } from '../utils/github.js';
import { errorHandler } from '../utils/error.js';

const CACHE_TTL_MS = 10 * 60 * 1000;
let cache = { data: null, fetchedAt: 0 };

const STATS_QUERY = `
  query {
    viewer {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      ownedRepos: repositories(ownerAffiliations: [OWNER]) {
        totalCount
      }
      collaborations: repositoriesContributedTo(
        includeUserRepositories: false
        contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
      ) {
        totalCount
      }
    }
  }
`;

export const getGithubStats = async (req, res, next) => {
  try {
    if (cache.data && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      return res.status(200).json(cache.data);
    }

    const data = await githubGraphQL(STATS_QUERY);
    const { viewer } = data;

    const stats = {
      totalContributions:
        viewer.contributionsCollection.contributionCalendar.totalContributions,
      weeks: viewer.contributionsCollection.contributionCalendar.weeks,
      totalRepos: viewer.ownedRepos.totalCount,
      totalCollaborations: viewer.collaborations.totalCount,
      profileUrl: `https://github.com/${viewer.login}`,
    };

    cache = { data: stats, fetchedAt: Date.now() };

    res.status(200).json(stats);
  } catch (error) {
    console.error('GitHub stats fetch failed:', error.message);
    next(errorHandler(502, 'Could not load GitHub stats'));
  }
};
