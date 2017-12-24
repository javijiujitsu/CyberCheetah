const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');

const User          = require('../models/user');

// Save the user's ID in the bowl (called when user logs in)
passport.serializeUser((userFromDb, next) => {
    next(null, userFromDb._id);
});


// Retrieve the user's info from the DB with the ID we got from the bowl
passport.deserializeUser((idFromBowl, next) => {
    User.findById(
      idFromBowl,
      (err, userFromDb) => {
          if (err) {
            next(err);
            return;
          }

          next(null, userFromDb);
      }
    );
});


// email & password login strategy
passport.use(new LocalStrategy(
  {
    username: 'blahEmail',    // sent through AJAX from Angular
    password: 'blahPassword'  // sent through AJAX from Angular
  },
  (theEmail, thePassword, next) => {

      User.findOne(
        { email: theEmail },
        (err, userFromDb) => {
            if (err) {
              next(err);
              return;
            }

            if (userFromDb === null) {
              next(null, false, { message: 'Incorrect email' });
              return;
            }

            if (bcrypt.compareSync(thePassword, userFromDb.encryptedPassword) === false) {
              next(null, false, { message: 'Incorrect password' });
              return;
            }

            next(null, userFromDb);
        }
      ); // close User.findOne()

  } // close (theEmail, thePassword, next) => {
));
