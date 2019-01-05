/**
 * user.github.test.js - Unit Tests for User Github
 * Created by: Michael Carney
 */

 import GitHubUsersAPI from './user.github';
 
 const gitHubApi = new GitHubUsersAPI();

 describe('GitHub Users API Tests', () => {

    beforeEach(() => {
		jest.clearAllMocks();
    });

    const userMockData = {
        id: 1,
        name: 'Mike',
        public_repos: 1
    };

    it ('should return a users object if user is found', async () => {
        gitHubApi.get = jest.fn().mockResolvedValue(userMockData);
        const user = await gitHubApi.getUser(1);
        expect(user).toEqual(userMockData);
    });

    it ('should return a user repo count if user and user.public_repos exists', async () => {
        gitHubApi.get = jest.fn().mockResolvedValue(userMockData);
        const repos = await gitHubApi.getUserRepoCount(1);
        expect(repos).toEqual(userMockData.public_repos);
    });

    it ('should return null if user and user.public_repos does not exist', async () => {
        gitHubApi.get = jest.fn().mockResolvedValue(null);
        const repos = await gitHubApi.getUserRepoCount(1);
        expect(repos).toBeNull();
    });
 })