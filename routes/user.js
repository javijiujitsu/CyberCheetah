var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');

const Career  = require('../models/career');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Returning the profile for the User
router.get('/userprofile', (req, res, next) => {
  User.find((err, profileList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(profileList);
  });
});








module.exports = router;














module.exports = router;
