import Thing from './thing.model';
import User from '../user/user.model';

export const thingResolvers = {
    Query: {
        async things(_, { filter = {} }) {
            try{
                const things = await Thing.find({}, null, filter);
                return things;
            } catch(err) {
                return err;
            }
        }
    },
    Mutation: {
        async addThing(_, { input }) {
            try {
                const thing = await Thing.create(input);
                return thing;
            } catch(err) {
                return err;
            }

        }
    },
    Thing: {
        async user(thing) {
            try {
                if (thing && thing.userId) {
                    const user = await User.findById(thing.userId);
                    return user;
                }
                return null;
            } catch(err) {
                return err;
            }

        }
    }
};