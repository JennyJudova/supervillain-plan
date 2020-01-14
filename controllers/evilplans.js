/* eslint-disable no-underscore-dangle */
const Evilplan = require('../models/Evilplan'); // we need the Animal models, attached to this are all the mongoose methods to query or create things in our DB. eg Animal.find(), Animal.create()

// GET - /evilplans
function index(req, res) {
  Evilplan.find() // finds all the plans
    .populate('user')
    .populate('comments.user')
    .then((plans) => res.status(200).json(plans)) // if found, sends back the plans in an JSON array
    .catch(() => res.status(404).json({ message: 'Not Found index function' })); // if any error, sends back 404 not found message
}

// POST - /evilplans
function create(req, res, next) {
  req.body.user = req.currentUser; // attaching a user key to the body, making it values currentUser from secureRoute
  Evilplan.create(req.body) // creates a new animal based on the JSON object sent as the body of the request
    .then((plan) => res.status(201).json(plan)) // if it succesfully creates, sends back that new animal
    .catch(next); // otherwise we send the errors
}

// GET - /evilplans/:id
function show(req, res) {
  Evilplan.findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then((evilplan) => {
      if (!evilplan) return res.status(404).json({ message: 'Not Found' });
      res.status(200).json(evilplan);
    })
    .catch(() => res.status(404).json({ message: 'Not Found ' }));
}

// PUT - /evilplans/:id
function update(req, res, next) {
  Evilplan.findById(req.params.id)
    .then((evilplan) => {
      if (!evilplan) return res.sendStatus(404).json({ message: 'Not Found' });
      evilplan.set(req.body); // update the properties with the data from the request // set. merges two objects together
    })
    .then((evilplan) => evilplan.save()) // save is inbuilt)
    .then((evilplan) => res.status(202).json(evilplan))
    .catch(next);
}

// Delete - /legends/:id
function remove(req, res) {
  Evilplan
    // .findByIdAndRemove(req.params.id) // find and delete in one go
    .findById(req.params.id)
    .then((evilplan) => {
      if (!evilplan.user.equals(req.currentUser._id))
        return res.status(401).json({ message: 'Not Authorised' });
      return evilplan.remove();
    })
    .then((evilplan) => res.status(204).json(evilplan))
    .catch((err) => res.status(400).json(err));
}

// POST -  /evilplans/:id/comments
function commentCreate(req, res, next) {
  req.body.user = req.currentUser;
  Evilplan.findById(req.params.id)
    .then((evilplan) => {
      if (!evilplan) return res.status(404).json({ message: 'not found' });
      evilplan.comments.push(req.body);
      return evilplan.save();
    })
    .then((evilplan) => res.status(201).json(evilplan))
    .catch(next);
}

// PUT - evilplans/:id/comments/:commentId
function commentUpdate(req, res, next) {
  Evilplan.findById(req.params.id)
    .then((evilplan) => {
      // find the evilplan using it's id, if you can't find it then throw 404
      if (!evilplan) return res.status(404).json({ message: 'Not Found' });
      // find the comment using the comment id
      const comment = evilplan.comments.id(req.params.commentId);
      // check that I'm the owner of the comment
      if (!comment.user.equals(req.currentUser._id))
        return res.status(401).json({ message: 'Not Authorised' });

      comment.set(req.body); // the .set method comes from mongoose, it merges the old object with our new information for the update
      evilplan.save();
      return comment.save();
    })
    .then((evilplan) => res.status(202).json(evilplan)) // once that legend has been saved, we send it back to the client to show that is updated.
    .catch(next); // if anything goes wrong we send back the error response
}

// DELETE - evilplans/:id/comments/:commentId
function commentDelete(req, res) {
  // console.log(req.body.user)
  // console.log(req.currentUser)
  req.body.user = req.currentUser;
  Evilplan.findById(req.params.id)
    .then((evilplan) => {
      if (!evilplan) return res.status(404).json({ message: 'Not found' });
      const comment = evilplan.comments.id(req.params.commentId);
      comment.remove();
      return evilplan.save();
    })
    .then((evilplan) => res.status(202).json(evilplan))
    .catch((err) => res.status(400).json(err));
}

module.exports = {
  index, // using es6 object shorthand, same as saying index:index
  create,
  show,
  update,
  remove,
  commentCreate,
  commentUpdate,
  commentDelete
};
