const Evilplan = require('../models/Evilplan'); // we need the Animal models, attached to this are all the mongoose methods to query or create things in our DB. eg Animal.find(), Animal.create()

// index route GET - /animals
function index(req, res) {
  Evilplan.find() // finds all the plans
    // .populate('user')
    // .populate('comments.user')
    .then((plans) => res.status(200).json(plans)) // if found, sends back the plans in an JSON array
    .catch(() => res.status(404).json({ message: 'Not Found index function' })); // if any error, sends back 404 not found message
}

// create route - POST to /animals
function create(req, res, next) {
  // console.log(req.currentUser);
  console.log(req.body);
  // req.body.user = req.currentUser //attaching a user key to the body, making it values currentUser from secureRoute
  Evilplan.create(req.body) // creates a new animal based on the JSON object sent as the body of the request
    .then((plan) => res.status(201).json(plan)) // if it succesfully creates, sends back that new animal
    .catch(next); // otherwise we send the errors
}

module.exports = {
  index, // using es6 object shorthand, same as saying index:index
  create
};
