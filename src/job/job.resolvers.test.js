/**
 * job.resolvers.test.js - unit tests for job.resolvers.test
 */

 import { jobResolvers } from './job.resolvers';
 import Job from './job.model';
 import User from '../user/user.model';

 describe('Job Resolvers Unit Test Suite', () => {
    const MOCK_ERROR_MSG = 'ERROR';
    const MOCK_ERROR = new Error(MOCK_ERROR_MSG);
    const jobMockData = {
        maxPay: 10,
        minPay: 1,
        company: 'Some Company',
        userId: 1
    };
    const filterObj = {};

    beforeEach(() => {
		jest.clearAllMocks();
    });

    it('should find all jobs', async () => {
        Job.find = jest.fn().mockResolvedValue(jobMockData);
        const result = await jobResolvers.Query.jobs(jobMockData, filterObj);
        expect(result).toEqual(jobMockData);
    });

    it('find all should return an error if db find fails', async () => {
        Job.find = jest.fn().mockRejectedValue(MOCK_ERROR);
        const result = await jobResolvers.Query.jobs(jobMockData, filterObj);
        expect(result).toEqual(MOCK_ERROR);
    });

    it('should add add a job and return job as output', async () => {
        Job.create = jest.fn().mockResolvedValue(jobMockData);
        const result = await jobResolvers.Mutation.addJob(jobMockData, filterObj);
        expect(result).toEqual(jobMockData);
    });


    it('create should return an error if db find fails', async () => {
        Job.create = jest.fn().mockRejectedValue(MOCK_ERROR);
        const result = await jobResolvers.Mutation.addJob(jobMockData, filterObj);
        expect(result).toEqual(MOCK_ERROR);
    });

    it('should return user if job has userId and user is found', async () => {
        const mockUser = {
            userId: 1,
            firstName: 'Mike'
        }
        User.findById = jest.fn().mockResolvedValue(mockUser);
        const user = await jobResolvers.Job.user(jobMockData);
        expect(user).toEqual(mockUser);
        
    });

    it('should return null if job does not have userid', async () => {
        const {userId, ...newJobMockData } = jobMockData;
        const user = await jobResolvers.Job.user(newJobMockData);
        expect(user).toBeNull();
    });
 });