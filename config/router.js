const router = require('express').Router();
const evilplans = require('../controllers/evilplans');
const users = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router
  .route('/evilplans')
  .get(evilplans.index)
  .post(evilplans.create); // secure route

router.route('/evilplans/:id').get(evilplans.show);
// .put(secureRoute, legends.update) //secure route
// .delete(secureRoute, legends.remove) //secure route

router
  .route('/evilplans/:id/comments')
  .post(secureRoute, evilplans.commentCreate); // secure route
// .get(evilplans.commentsShow)

router.route('/register').post(users.register);

router.route('/login').post(users.login);

router.route('/profile').get(secureRoute, users.profile); // secure route

module.exports = router; // exporting our router module for use in index.js
