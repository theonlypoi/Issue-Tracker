(function() {
  'use strict';
   const passport = require('passport');
   const config = require('../configuration/config');
   const jwtStrategy = require('passport-jwt').Strategy;
   const extractJwt = require('passport-jwt').ExtractJwt;

   const verifyUser = require('../actions/signin');
   const localStrategy = require('passport-local').Strategy;

   const bcrypt = require('bcryptjs');

   const localOptions = {
     usernameField: 'email',
     passwordField: 'password'
   };

   const localLogin = new localStrategy(localOptions, (email,password,done) => {
     return verifyUser(email)
              .then((validUser) => {
                bcrypt.compareSync(password,validUser.password)
                      .then((validPassword) => {
                        if(validPassword) {
                          return done(null,validUser);
                        }
                        return done(null,false);
                      });
              })
              .catch(err => done(err,false));
   });

   passport.use(localLogin);

   // module.export = {localLogin};
})();
