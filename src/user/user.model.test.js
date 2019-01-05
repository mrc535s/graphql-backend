/**
 * User Model Tests
 */
import User from './user.model';

describe('User Model Suite', () => {
    beforeEach(() => {
		jest.clearAllMocks();
    });

    
    it('should throw validation error for required undefined fields', () => {
        const user = new User({firstName: "Mike"});
        user.validate(err => {
            expect(err.errors.email).toBeDefined();
            expect(err.errors.firstName).toBeUndefined();
        })
    });

    it('should return false if password does not exist', async () => {
        const user = new User({firstName: "Mike"});
        expect(() => user.comparePassword()).toThrow();
    });

    it('should return false if password does not exist', async () => {
        const user = new User({firstName: "Mike", password: "password"});
        const err = await user.comparePassword();
        expect(err).toBeFalsy();
    });

    it('should return false if passwords do not match', async () => {
        const user = new User({firstName: "Mike", password: "password"});
        const err = await user.comparePassword("wrongpassword");
        expect(err).toBeFalsy();
    });

});