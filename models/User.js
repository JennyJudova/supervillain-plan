/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    bio: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

userSchema.virtual('plans', {
  ref: 'Evilplan',
  localField: '_id',
  foreignField: 'user'
  // autopopulate: true
});

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.password;
    delete json.email;
    return json;
    // return {
    //   username: json.username
    // }
  }
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if (
    this.isModified('password') &&
    this._passwordConfirmation !== this.password
  ) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// Check on login
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

// userSchema.plugin(require('mongoose-autopopulate'));
userSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('User', userSchema);
