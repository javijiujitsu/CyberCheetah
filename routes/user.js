var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');

const Career  = require('../models/career');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// getting a specific profile
router.get("/users/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .exec(
      (err, userFromDb) => {
        if (err) {
          console.log("User details error ", err);
          res.status(500).json({
            errorMessage: "User details went wrong"
          });
          return;
        }
        res.status(200).json(userFromDb);
      }
    );
});




















module.exports = router;
