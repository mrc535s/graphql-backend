import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
import schema from './schema';
/// This feels dirty being at the top level.
import GitHubUsersAPI from './user/user.github';

import mongoose from 'mongoose';
import logger from './common/logger';
mongoose.connect('mongodb+srv://jwipe:Just4jwipe@cluster0-yqjvd.mongodb.net/test?retryWrites=true', { useCreateIndex: true, useNewUrlParser: true } );

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
    schema,
    debug: true,
    tracing: true,
    introspection: true,
    playground: true,
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

const app = express();

app.use(bodyParser());

//TODO: combine format configuration
//TODO: separate prod/non prod configuration
//TODO: Fix colors
//TODO: Ensure all data is being logged for request/response graphql
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.simple()
}));
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
    logger.log('info', `Running a GraphQL API server at localhost:${PORT}/graphql`)
);