const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');

const User          = require('../models/user');

passport.serializeUser((userFromDb, done) => {
	done(null, userFromDb._id);
});

passport.deserializeUser((idFromSession, done) => {
	User.findById(
		idFromSession,
		(err, userFromDb) => {
			if(err){
				done(err);
				return;
			}
			done(null, userFromDb);
		}
	);
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'loginUsername',
			passwordField: 'loginPassword'
		},
		(sentUsername, sentPassword, done) => {
			User.findOne(
				{ username: sentUsername },
				(err, userFromDb) => {
					if(err){
						done(err);
						return;
					}
					if(!userFromDb){
						done(null, false, { message: "Wrong Username" });
						return;
					}
					const isPasswordGood =
					bcrypt.compareSync(sentPassword, userFromDb.password);
					if(!isPasswordGood){
						done(null, false, { message: "Wrong Password" });
						return;
					}
					done(null, userFromDb);
				}
			);
		}
	)
);
