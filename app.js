(function() {
  'use strict';
  require('dotenv').config({path: './secret.env'});
  const express = require('express');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const flash = require('connect-flash');
  const session = require('express-session');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcryptjs');
  const pgSession = require('connect-pg-simple')(session);
  const passport = require('passport');
  const localStrategy = require('passport-local').Strategy;

  const async_lib = require('async');

  const pool = require('./server/dbconfig.js');
  const cors = require('cors');


  var app = express();
  const port = process.env.PORT || 8080;
  const host = 'localhost';

  /* Avoid CORS problem */
  const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "allowedHeaders": ['Content-Type','Authorization','x-access-token']
  };

  app.use(cors(corsOptions));
  app.options('*',cors(corsOptions));

  // console.log("Body Parser Being Used.");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // console.log("Don't know why bodyParser is not working.");

  app.use(flash());
  app.use(morgan('dev'));

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool: pool
    }),
    cookie: { secure: false }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  const localOptions = {
    usernameField: 'email',
    passwordField: 'password'
  };

  const localLogin = new localStrategy(localOptions, (email,password,done,next) => {
    var params = [];
    params.push(email);
    params.push(password);
    var user = null;
    (async() => {
      const client = await pool.connect();

      try {
        var result = await client.query("select * from loginDetails($1,$2)",params);

        if(result.rows.length > 0){
          user = result.rows[0];
          console.log(user);
          if(!user) {
            return done(null,false,{message: 'Wrong usermail and/or password'})
          };
          bcrypt.compare(password,user.password,function(err,res) {
              if(err) {return done(err,false);}
              if(!res) {return done(err,false,{message: 'Wrong usermail and/or password'}) };

              return done(null,user);
            });
        } else {
            var err = {
              status: 500,
              message: "Issue Updation Failed!"
            }
            return done(err,false,{message: 'Wrong usermail and/or password'});
        }
      } finally {
        client.release();
      }
    })().catch(e => {return next(e);});

  });

  passport.use(localLogin);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


  const registration = require('./server/registration');
  const login = require('./server/routes/authentication');

  app.use('/registration',registration);
  app.use('/',login);

// Error Handler (Only pass the error in json format)
  app.use(function(err,req,res,next){
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
  app.listen(port,host,function(){
    console.log(`listening at http://${host}:${port}`);
  });

})();
