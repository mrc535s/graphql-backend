/**
 * job.model.test.js - Unit tests for job.model.js
 * created by: michael carney
 */

 import Job from './job.model';
 describe('Job Model Tests', () => {
    it('should throw validation error for required undefined fields', () => {
        const user = new Job({company: "some company"});
        user.validate(err => {
            expect(err.errors.maxPay).toBeDefined();
            expect(err.errors.minPay).toBeDefined();
            expect(err.errors.company).toBeUndefined();
        })
    });
 });