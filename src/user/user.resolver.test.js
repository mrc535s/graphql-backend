/**
 * user.resolver.test.js - Unit tests for user.resolver.js
 * created by: michael carneys
 */
import User from './user.model';
import {userResolvers} from './user.resolvers';

describe('User Resolver Suite', () => {
    const userMockData = {
        id: 1,
        name: 'Mike'
    };
    const NUM_REPOS = 1;
    const MOCK_ERROR_MSG = 'ERROR';
    const filterObj = {
        filter: {},
        id: {},
        dataSources: {
            gitHubUsersAPI: {
                getUserRepoCount: function (userName) {
                    return NUM_REPOS;
                }
            }
        }
    };
    const MOCK_ERROR = new Error(MOCK_ERROR_MSG);

    beforeEach(() => {
		jest.clearAllMocks();
    });
    
    it('should find all users', async () => {
        User.find = jest.fn().mockResolvedValue(userMockData);
        User.find.mockResolvedValue(userMockData);
        const result = await userResolvers.Query.users(userMockData, filterObj);
        expect(result).toEqual(userMockData);
    });

    it('find all should return an error if db find fails', async () => {
        User.find = jest.fn().mockRejectedValue(MOCK_ERROR);
        const result = await userResolvers.Query.users(userMockData, filterObj);
        expect(result).toEqual(MOCK_ERROR);
    });

    it('should add add a user and return user as output', async () => {
        User.create = jest.fn().mockResolvedValue(userMockData);
        const result = await userResolvers.Mutation.addUser(userMockData, filterObj);
        expect(result).toEqual(userMockData);
    });


    it('create should return an error if db find fails', async () => {
        User.create = jest.fn().mockRejectedValue(MOCK_ERROR);
        const result = await userResolvers.Mutation.addUser(userMockData, filterObj);
        expect(result).toEqual(MOCK_ERROR);
    });

    it ('should return null if no githubUserName is provided', async () => {
        const mockSource = {
            gitHubUserName: null
        }
        const result = await userResolvers.User.github(mockSource, filterObj, filterObj);
        expect(result).toBeNull();
    });

    it ('should return a githubUserName and numRepos object if username is provided', async () => {
        const mockSource = {
            gitHubUserName: 'mrc535s'
        }
        const result = await userResolvers.User.github(mockSource, filterObj, filterObj);
        expect(result.numRepos).toEqual(NUM_REPOS);
        expect(result.userName).toEqual(mockSource.gitHubUserName);
    });

    it ('github should return error if network error', async () => {
        const mockSource = {
            gitHubUserName: 'mrc535s'
        }
       
        filterObj.dataSources.gitHubUsersAPI.getUserRepoCount = jest.fn().mockRejectedValue(MOCK_ERROR);
        const result = await userResolvers.User.github(mockSource, filterObj, filterObj);
        expect(result).toEqual(MOCK_ERROR);
    });
});