(function() {
  'use strict';
  const pool = require('./dbconfig.js');
  const express = require('express');
  const router = express.Router();
  const passport = require('passport');

  // Route for registration
  router.route('/')
        .post(function(req,res,next) {
            passport.authenticate('local',function(err,usr,info){
              if(err) {return next(err); }
              if(!usr) { return res.status(401).json({err:info})};
              req.logIn(usr,function(err){
                if(err){
                  return res.status(500).json({err:'could not login user'});
                }
                console.log(usr);
              });
              res.json(usr)
            });

        });

        module.exports = router; // possible error
})();
