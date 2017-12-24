const express   = require('express');
const bcrypt    = require('bcrypt');
const passport = require('passport');

var router = express.Router();
var mongoose = require('mongoose');

const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.post('/api/signup', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        // 400 for client errors (user needs to fix something)
        res.status(400).json({ message: 'Need both email and password' });
        return;
    }

    User.findOne(
      { email: req.body.email },
      (err, userFromDb) => {
          if (err) {
            // 500 for server errors (nothing user can do)
            res.status(500).json({ message: 'Email check went to shit' });
            return;
          }

          if (userFromDb) {
            // 400 for client errors (user needs to fix something)
            res.status(400).json({ message: 'Email already exists' });
            return;
          }

          const salt = bcrypt.genSaltSync(10);
          const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

          const theUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: scrambledPassword
          });

          theUser.save((err) => {
              if (err) {
                res.status(500).json({ message: 'User save went to shit' });
                return;
              }

              // Automatically logs them in after the sign up
              // (req.login() is defined by passport)
              req.login(theUser, (err) => {
                  if (err) {
                    res.status(500).json({ message: 'Login went to shit' });
                    return;
                  }

                  // Clear the encryptedPassword before sending
                  // (not from the database, just from the object)
                  theUser.password = undefined;

                  // Send the user's information to the frontend
                  res.status(200).json(theUser);
              }); // close req.login()
          }); // close theUser.save()
      }
    ); // close UserModel.findOne()
}); // close router.post('/signup', ...


// This is different because passport.authenticate() redirects
// (APIs normally shouldn't redirect)
router.post('/api/login', (req, res, next) => {
    const authenticateFunction =
      passport.authenticate('local', (err, theUser, extraInfo) => {
          // Errors prevented us from deciding if login was a success or failure
          if (err) {
            res.status(500).json({ message: 'Unknown login error' });
            return;
          }

          // Login failed for sure if "theUser" is empty
          if (!theUser) {
            // "extraInfo" contains feedback messages from LocalStrategy
            res.status(401).json(extraInfo);
            return;
          }

          // Login successful, save them in the session.
          req.login(theUser, (err) => {
              if (err) {
                res.status(500).json({ message: 'Session save error' });
                return;
              }

              // Clear the encryptedPassword before sending
              // (not from the database, just from the object)
              theUser.encryptedPassword = undefined;

              // Everything worked! Send the user's information to the client.
              res.status(200).json(theUser);
          });
      });

    authenticateFunction(req, res, next);
});






module.exports = router;
