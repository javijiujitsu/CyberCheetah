const express   = require('express');
const bcrypt    = require('bcrypt');
const passport = require('passport');

var router = express.Router();
var mongoose = require('mongoose');

const User = require('../models/user');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
















module.exports = router;
