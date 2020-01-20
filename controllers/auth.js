/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/environment');

// register USER
function register(req, res) {
  User.create(req.body)
    .then((user) => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res
        .status(201)
        .json({ message: `Thanks for Registering ${user.username}`, token });
    })
    .catch((err) => res.status(422).json(err));
}

// LOGIN USER
function login(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' });
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.status(202).json({ message: `Welcome back ${user.username}`, token });
    })
    .catch(() => res.status(401).json({ message: 'Unauthorised' }));
}

function profile(req, res) {
  // console.log(req.currentUser._id);
  // console.log(req.body);
  User.findById(req.currentUser._id)
    .populate('plans')
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
}

// profile route -/profile/edit // or /villains/edit ???
function update(req, res, next) {
  User.findById(req.currentUser._id)
    .then((user) => {
      // if (req.params.id === (req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      user.set(req.body);
      return user.save();
    })
    .then((user) => res.status(202).json(user))
    .catch(next);
}

module.exports = {
  register,
  login,
  profile,
  update
};
