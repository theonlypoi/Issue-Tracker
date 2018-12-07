(function() {
  'use strict';
  const express = require('express');
  const router = express.router();

  const passport = require('passport');
  const passportService = require('../services/passportservices');
  const authentication = require('./authentication');

//  const requireAuth = passport.authenticate('jwt',{session: false});

  // Here I will try to authenticate before going to any route or
  // Putting in other words I will specify which routes the user can access and
  // which routes the admin can access.


  module.exports = router;
})();
