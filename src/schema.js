import {makeExecutableSchema} from 'graphql-tools';
import {merge} from 'lodash';

import {userSchema} from './user/user.schema';
import {userResolvers} from './user/user.resolvers';

import {jobsSchema} from './job/job.schema';
import {jobResolvers} from './job/job.resolvers';

import rootSchema from './common/root.schema';

const resolvers = merge(jobResolvers, userResolvers);
const typeDefs = [rootSchema, jobsSchema, userSchema];

export default makeExecutableSchema({
  typeDefs, resolvers
});