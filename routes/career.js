const express = require('express');
const multer = require('multer');
const mongoose   = require('mongoose');

const CareerModel = require('../models/career');

const router  = express.Router();

const myUpload = multer({
  dest: __dirname + '/../public/uploads/' });


router.post('/api/careers',
myUpload.single('careerPicture'),
(req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to make a career' });
    return;
  }

    const theCareer = new CareerModel ({
      name: req.body.careerName,
      certification: req.body.careerCertification,
      resource: req.body.careerResource,
      user: req.user._id
    });

    if (req.file) {
      theCareer.picture = '/uploads/' + req.file.filename;
    }

    theCareer.save((err) => {
      // Unknow error from the database
      if (err && theCareer.errors === undefined) {
        res.status(500).json({ message: 'Career did not save' });
        return;
      }

      // // Validation error
      // if (err && theTravelPost.errors) {
      //   res.status(400).json({
      //     titleError: theTravelPost.error.title,
      //     descriptionError: theTravelPost.error.description
      //   });
      //   return;
      // }

      req.user.encryptedPassword = undefined;
      theCareer.user = req.user;

      res.status(200).json(theCareer);
    });
});

// routes to Edit careers
router.get('/api/careers', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Log in to see Careers.' });
    return;
  }

  CareerModel
    .find()

    // Retrives all the info of the owners
    .populate('user', { encryptedPassword: 0 })

    .exec((err, allTheCareers) => {
      if (err) {
        res.status(500).json({ message: 'Failed to edit Careers' });
        return;
      }
      console.log(allTheCareers);
      res.status(200).json(allTheCareers);
    });
});


// // Find and Update record
// router.post('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
//   const updates = {
//     title: req.body.title,
//     description: req.body.description,
//   };
//
//   TravelPost.findByIdAndUpdate(req.params.id, updates, (err, post) => {
//     if (err) {
//       return res.render('post/edit', {
//         post,
//         errors: post.errors
//       });
//     }
//     if (!post) {
//       return next(new Error('404'));
//     }
//     return res.redirect(`/`);
//   });
// });
router.delete('/api/careers/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  CareerModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Career has been deleted!'
    });
  })
});

module.exports = router;
