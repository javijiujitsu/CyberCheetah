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

module.exports = router;
