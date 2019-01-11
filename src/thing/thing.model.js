import mongoose from 'mongoose';

/**
 * Here is the our user schema which will be used to
 * validate the data sent to our database.
 */


const thingModel = new mongoose.Schema({
    type: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        type: String
    },
    thingDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

thingModel.set('toObject', { virtuals: true });


/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
export default mongoose.model('Thing', thingModel);