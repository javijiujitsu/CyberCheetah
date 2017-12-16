var express = require('express');
var router = express.Router();

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

module.exports = router;
