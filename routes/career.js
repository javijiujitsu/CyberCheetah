var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Career = require('../models/career');

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
    //ID task is being converting to a string

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

/* GET a single Career. */
router.get('/getsinglecareer/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Career.findById(req.params.id, (err, NewCareer) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(NewCareer);
    });
});

module.exports = router;
