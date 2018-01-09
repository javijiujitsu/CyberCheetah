var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');

const User    = require('../models/user');
const Career  = require('../models/career');
const Task    = require('../models/task');

/*
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
*/

router.post('/:id/savetask',(req, res, next) => {
  Career.findById(req.params.id, (err, career) => {
    if (err || !career) { return next(new Error("404")); }

    const task = new Task({
      name      : req.body.name,
      description: req.body.description,
      estimatedlength    : req.body.estimatedlength,
      created_   : req.body.created_,
      resource: req.body.resource
    });

    task.save((err) => {
      if (err) {
        res.json(err);
        return;
      }


      career.idtask.push(task._id);
      career.save( (err) => {
        if (err) {
          return next(err);
        } else {
          res.json({
            message: 'New Task Saved!',
            id: task._id
          });
        }
      });
    });
  });
});




module.exports = router;
