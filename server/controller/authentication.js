(function() {
  'use strict';
  // This is the file where json web token will be generated and will be sent when
 // a user logged in.

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const config = require('../configuration/config.js');

    const tokenForUser = (user) => {
      return jwt.sign({id: user.userid,name: user.username,roletype: user.roletype},config.secretkey,{
        expiresIn: 60 * 60 * 60
      });
    }

    // Further code will be written here for user and admin verification
    const verifyUser =  (req,res,next) => {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];

      if(token) {
        jwt.verify(token,config.secretkey,function(err,decoded) {
          if(err) {
            var err = new Error("You are not authenticated!");
            err.status = 401;
            return next(err);
          } else {
            // console.log(decoded);
            req.decoded = decoded;
            next();
          }
        });
      } else {
        var err = new Error("Unauthorized Access");
        err.status = 403;
        return next(err);
      }
    }

    const verifyAdmin = (req,res,next) => {
        if(req.decoded.roletype === 'admin') {
          next();
        }
        else {
          var err = new Error("You are not authorized to perform this task");
          err.status = 403;
          return next(err);
        }
    };

    module.exports = {tokenForUser,verifyUser,verifyAdmin}
})();
