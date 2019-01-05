import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

/**
 * Here is the our user schema which will be used to
 * validate the data sent to our database.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  gitHubUserName: {
    type: String
  },
  type: {
    type: Array
  }
});

/**
 * This property will ensure our virtuals (including "id")
 * are set on the user when we use it.
 */
userSchema.set('toObject', { virtuals: true });

// /**
//  * This is a helper method which converts mongoose properties
//  * from objects to strings, numbers, and booleans.
//  */
// userSchema.method('toGraph', () => {
//   return JSON.parse(JSON.stringify(this));
// });

/**
 * Never save the password directly onto the model,
 * always encrypt first.
 * Needs to be tested, but no sure how yet.
 */
userSchema.pre('save', function preSave(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt
      .genSalt(5)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(next);
  }
});

/**
 * Adds a method on the user object which we can use
 * to compare a user's password with.
 */
userSchema.method('comparePassword', function comparePassword(
  candidate
) {
  if (!this.password) {
    throw new Error('User has not been configured with a password.');
  }
  if (!candidate) {
    return false;
  }
  return bcrypt.compare(candidate, this.password);
});

/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
export default mongoose.model('User', userSchema);