import {ApolloServer} from 'apollo-server';
import express from 'express';
import schema from './schema';
/// This feels dirty being at the top level.
import GitHubUsersAPI from './user/user.github';

import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://jwipe:Just4jwipe@cluster0-yqjvd.mongodb.net/test?retryWrites=true', { useCreateIndex: true, useNewUrlParser: true } );

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
    schema,
    dataSources: () => {
        return {
            gitHubUsersAPI: new GitHubUsersAPI()
        };
    }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
// server.listen().then(({ url }) => {
// console.log(`🚀  Server ready at ${url}`);
// });

// const app = express();
// server.applyMiddleware({ app });

// app.listen({ port: process.env.PORT || 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// );

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});