var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');

const User    = require('../models/user');
const Career  = require('../models/career');
const Task    = require('../models/task');

/* GET Career listing. */
router.get('/getcareer', (req, res, next) => {
  Career.find((err, careerList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(careerList);
  });
});

/* CREATE a new Career. */
router.post('/createcareer', (req, res, next) => {
  const newCareer = new Career({
    name: req.body.name,
    description: req.body.description,
    universities: req.body.universities,
    certification: req.body.certification,
    resource: req.body.resource,
    idtask: req.body.idtask
    //ID task is being converted to a string

  });

  newCareer.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Career created!',
      id: newCareer._id
    });
  });
});

/* GET a single Career. Generate a task with a .populate */
router.get('/getsinglecareer/:id', (req, res) => {
  /*Task.find()*/

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Career.findById(req.params.id, (err, NewCareer) => {
    Task.find()
    .populate("name")
    .populate("description")
    .populate("estimatedlength")
    .populate("resource")
    .populate("created_")
      if (err) {
        res.json(err);
        return;
      }

      res.json(NewCareer);
    });
});

/* Edti Career */

router.put('/editcareer/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    name: req.body.name,
    description: req.body.description,
    universities: req.body.universities,
    certification: req.body.certification,
    resource: req.body.resource,
    idtask: req.body.idtask
  };

  Career.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Career updated successfully'
    });
  });
});

/* DELETE a career. */
router.delete('/deletecareer/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Career.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Career has been removed!'
    });
  });
});


module.exports = router;
