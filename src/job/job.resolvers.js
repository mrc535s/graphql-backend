import Job from './job.model';
import User from '../user/user.model';
import { UserInputError } from 'apollo-server';

export const jobResolvers = {
    Query: {
        async jobs(_, { filter = {} }) {
            try{
                const jobs = await Job.find({}, null, filter);
                return jobs;
            } catch(err) {
                return err;
            }
        }
    },
    Mutation: {
        async addJob(_, { input }) {
            try {
                const job = await Job.create(input);
                return job;
            } catch(err) {
                return err;
            }

          }
    },
    Job: {
        async user(job) {
            try {
                if (job && job.userId) {
                    const user = await User.findById(job.userId);
                    return user;
                }
                return null;
            } catch(err) {
                return err;
            }

        }
    }

}