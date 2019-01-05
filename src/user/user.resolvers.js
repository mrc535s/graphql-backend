import User from './user.model';

export const userResolvers = {
    Query: {
        async users(_, { filter = {} }) {
            try {
                const users = await User.find({}, null, filter);
                return users;
            } catch(err) {
                return err;
            }
        }
    },
    Mutation: {
        async addUser(_, { input }) {
            try {
                const user = await User.create(input);
                return user;
            } catch (err) {
                return err;
            }

        }
    },
    User: {
        github: async (_source, {id}, { dataSources }) => {
            try {
                const gitHubUserName = _source.gitHubUserName;
                if (gitHubUserName) {
                    const numRepos = await dataSources.gitHubUsersAPI.getUserRepoCount(gitHubUserName);
                    return {
                        userName: gitHubUserName,
                        numRepos
                    };
                }
                return null;
            } catch (err) {
                return err;
            }
        }
    }

}