const router = require('express').Router();
const evilplans = require('../controllers/evilplans');

router
  .route('/evilplans')
  .get(evilplans.index)
  .post(evilplans.create); // secure route

module.exports = router; // exporting our router module for use in index.js
