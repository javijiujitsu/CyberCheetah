var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');

const User    = require('../models/user');
const Career  = require('../models/career');
const Task    = require('../models/task');

/* Save a new task. */
router.post('/savecreatedtask', (req, res, next) => {
  const saveTask = new Task({
    name: req.body.name,
    description: req.body.description,
    estimatedlength: req.body.estimatedlength,
    created_: req.body.created_,
    resource: req.body.resource
  });

  saveTask.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Task Saved!',
      id: saveTask._id
    });
  });
});




module.exports = router;
