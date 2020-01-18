const jwt = require('jsonwebtoken');
const User = require('../models/User');

// GET - /villains
function index(req, res) {
  User.find() // finds all the plans
    .then((user) => res.status(200).json(user)) // if found, sends back the plans in an JSON array
    .catch(() => res.status(404).json({ message: 'Not Found index function' })); // if any error, sends back 404 not found message
}

// GET - /villains/:id
function show(req, res) {
  // console.log(req.currentUser._id);
  // console.log(req.body);
  User.findById(req.params.id)
    .populate('plans')
    .then((user) => res.status(200).json(user))
    .catch((err) => res.json(err));
}

module.exports = {
  show,
  index
};
