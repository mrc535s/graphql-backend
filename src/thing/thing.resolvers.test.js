/**
 * thing.resolvers.test.js - unit tests for thing.resolvers.test
 */

 import { thingResolvers } from './thing.resolvers';
 import Thing from './thing.model';
 import User from '../user/user.model';

 describe('thing Resolvers Unit Test Suite', () => {
    const MOCK_ERROR_MSG = 'ERROR';
    const MOCK_ERROR = new Error(MOCK_ERROR_MSG);
    const thingMockData = {
        maxPay: 10,
        minPay: 1,
        company: 'Some Company',
        userId: 1
    };
    const filterObj = {};

    beforeEach(() => {
		jest.clearAllMocks();
    });

    it('should find all things', async () => {
        Thing.find = jest.fn().mockResolvedValue(thingMockData);
        const result = await thingResolvers.Query.things(thingMockData, filterObj);
        expect(result).toEqual(thingMockData);
    });

    it('find all should return an error if db find fails', async () => {
        Thing.find = jest.fn().mockRejectedValue(MOCK_ERROR);
        const result = await thingResolvers.Query.things(thingMockData, filterObj);
        expect(result).toEqual(MOCK_ERROR);
    });

    it('should add add a thing and return thing as output', async () => {
        Thing.create = jest.fn().mockResolvedValue(thingMockData);
        const result = await thingResolvers.Mutation.addThing(thingMockData, filterObj);
        expect(result).toEqual(thingMockData);
    });


    it('create should return an error if db find fails', async () => {
        Thing.create = jest.fn().mockRejectedValue(MOCK_ERROR);
        const result = await thingResolvers.Mutation.addThing(thingMockData, filterObj);
        expect(result).toEqual(MOCK_ERROR);
    });

    it('should return user if thing has userId and user is found', async () => {
        const mockUser = {
            userId: 1,
            firstName: 'Mike'
        }
        User.findById = jest.fn().mockResolvedValue(mockUser);
        const user = await thingResolvers.thing.user(thingMockData);
        expect(user).toEqual(mockUser);
        
    });

    it('should return null if thing does not have userid', async () => {
        const {userId, ...newthingMockData } = thingMockData;
        const user = await thingResolvers.thing.user(newthingMockData);
        expect(user).toBeNull();
    });
 });