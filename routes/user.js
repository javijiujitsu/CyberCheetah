var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');

const Career  = require('../models/career');
const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Get user profile
router.get('/getsingleuser/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id, (err, UserProfile) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(UserProfile);
    });
});

/* Edit User */
router.post('/edituser/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    username: req.body.username,
    email: req.body.email
  };

  User.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'User updated successfully'
    });
  });
});













module.exports = router;
