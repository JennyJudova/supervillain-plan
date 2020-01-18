const router = require('express').Router();
const evilplans = require('../controllers/evilplans');
const users = require('../controllers/auth');
const villains = require('../controllers/villains');
const secureRoute = require('../lib/secureRoute');

// EVILPLANS
router
  .route('/evilplans')
  .get(evilplans.index)
  .post(evilplans.create); // secure route

router
  .route('/evilplans/:id')
  .get(evilplans.show)
  .put(secureRoute, evilplans.update) // secure route
  .delete(secureRoute, evilplans.remove); // secure route

router
  .route('/evilplans/:id/comments')
  .post(secureRoute, evilplans.commentCreate); // secure route
// .get(evilplans.commentsShow)

router
  .route('/evilplans/:id/comments/:commentID')
  .put(secureRoute, evilplans.commentUpdate) // secure route
  .delete(secureRoute, evilplans.commentDelete); // secure route

// VILLAINS
router.route('/villains').get(villains.index);

router.route('/villains/:id').get(villains.show);

// USERS
router.route('/register').post(users.register);

router.route('/login').post(users.login);

router.route('/profile').get(secureRoute, users.profile); // secure route

module.exports = router; // exporting our router module for use in index.js
