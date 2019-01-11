/**
 * thing.model.test.js - Unit tests for thing.model.js
 * created by: michael carney
 */

 import Thing from './thing.model';
 describe('Thing Model Tests', () => {
    it('should throw validation error for required undefined fields', () => {
        const thing = new Thing({type: "some company"});
        thing.validate(err => {
            expect(err.errors.description).toBeDefined();
            expect(err.errors.image).toBeUndefined();
        })
    });
 });