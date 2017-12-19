const express   = require('express');
const bcrypt    = require('bcrypt');
const passport = require('passport');

var router = express.Router();
var mongoose = require('mongoose');

const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.post('/process-signup', (req, res, next) => {
  if (!req.body.signupUsername || !req.body.signupPassword) {
    res.status(400).json({
      errorMessage: "We need both username and password."
    });
    return;
  }
  User.findOne({
      username: req.body.signupUsername
    },
    (err, userFromDb) => {
      if (err) {
        res.status(500).json({
          errorMessage: "Error finding username."
        });
        return;
      }
      if (userFromDb) {
        res.status(400).json({
          errorMessage: "Username is taken."
        });
				return;
      }
      const salt = bcryptjs.genSaltSync(10);
      const hashPass = bcryptjs.hashSync(req.body.signupPassword, salt);

      const theUser = new User ({
        username: req.body.signupUsername,
        password: hashPass
      });

      theUser.save((err) => {
        if (err) {
          console.log("User save error: ", err)
          res.status(500).json({errorMessage: "Error saving user."});
          return;
        }

        req.login(theUser, (err) => {
          if (err) {
            console.log("User auto login error: ", err);
            res.status(500).json({
              errorMessage: "Error logging in"
            });
						return;
          }
          theUser.encryptedPassword = undefined;
          res.status(200).json(theUser);
        });
      });
    }
  );
});














module.exports = router;
