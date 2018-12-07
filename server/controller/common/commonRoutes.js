(function() {
  'use strict';

  const Authentication = require('../authentication.js');
  const pool = require('../../dbconfig.js');
  const bcrypt = require('bcryptjs');
  const async_lib = require('async');
  const nodemailer = require('nodemailer');
  const crypto = require('crypto');

  const fromMail = 'samantaray.subhasarthak@gmail.com';
  const pass = 'bitan@18303';

  var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: fromMail,
    pass: pass
  }
});

  exports.login = (req,res) => {
    // console.log("request body",req.body);
  //  console.log("request session:",req.sessionID);
    if(req.user){
      const token = Authentication.tokenForUser(req.user);
      var isAdmin = false;
      var id = req.user.userid;
      if(req.user.roletype === 'admin'){
         isAdmin = true;
      }
      //req.session.user = req.user;
      console.log(req.user);
      res.status(200).json({
        status: 'Login Successful',
        success: true,
        isAdmin: isAdmin,
        id: id,
        token: token
      });
    } else {
      res.status(500).json({
        message: 'Invalid'
      });
    }

  }

  exports.logout = (req,res) => {
    console.log(req);
    if(Authentication.verifyUser || Authentication.verifyAdmin){
      req.session.destroy(function (err) {
        if(err) { return next(err); }
        req.logOut();
        res.status(200).json({
          message: 'Successfully logged out!'
        })
      });
    }
    else{
      res.status(401).json({
        message: 'You are not logged in!'
      });
    }
  }

  exports.forgetPassword = (req,res,next) => {
    (async() => {
      const client = await pool.connect();

      try {
          // First retrieve the user whether the user exists or not
          const result = await client.query('select * from UserMaster where usermail = ($1)',[req.body.usermail]);

          if(result.rows.length > 0){
            const user = result.rows[0];
            // If user found then create a temporary token and update the db along with its expiry time
            const token = crypto.randomBytes(16).toString("hex");
            console.log(token);
            console.log(req.body.usermail);

            const time_now = Date.now();
            console.log(time_now + 300000);
              // after successful token creation update the db
            client.query('select * from setToken($1,$2)',[token,req.body.usermail])
                    .then(result => {
                      // after database updation successful send mail further instructions
                       var data = {
                         to: '2subhasarthak@gmail.com',
                         from: fromMail,
                         template: 'password.reset',
                         subject: 'Request for password reset!',
                         html: `<p> Enter Token ${token} for password reset.`
                       };

                       smtpTransport.sendMail(data, function(err) {
                            if (!err) {
                              return res.json({ message: 'Kindly check your email for further instructions' });
                            } else {
                              return next(err);
                            }
                          });
                    })
                    .catch(e => { return next(e);})
        } else {
          var err = new Error("No such user");
          err.status = 404;
          return next(err);
        }
      }finally {
        client.release();
      }
    })().catch( e => { return next(e) });
  }

  exports.status = (req,res,next) => {
    (async() => {
      const client = await pool.connect();
      try {
        client.query('select * from getStatus()')
              .then(result => {
                res.status(200).json(result.rows);
              })
              .catch(e => {return next(e)});
      }finally {
          client.release();
      }
    })().catch(e => {return next(e)});
  }

  exports.priority = (req,res,next) => {
    (async() => {
      const client = await pool.connect();
      try {
        client.query('select * from getPriority()')
              .then(result => {
                res.status(200).json(result.rows);
              })
              .catch(e => {return next(e) } );
      } finally {
        client.release();
      }
    })().catch(e => { return next(e) });
  }

  exports.projects = (req,res,next) => {
    (async() => {
      const client = await pool.connect();

      try{
        client.query("select * from getProjects()")
              .then(result => {
                res.status(200).json(result.rows);
              })
              .catch(e => {return next(e)});
      }
      finally {
        client.release();
      }

    })().catch(e => { return next(e) });
  }


  exports.userprojects = (req,res,next) => {
    (async() => {
      const client = await pool.connect();

      try{
        client.query("select * from getUserProject()")
              .then(result => {
                res.status(200).json(result.rows);
              })
              .catch(e => { return next(e) });
      }
      finally {
        client.release();
      }

    })().catch(e => {return next(e)});
  }


  exports.users = (req,res,next) => {
    (async() => {
      const client = await pool.connect();

      try{
        client.query("select * from getUserDetails()")
              .then(result => {
                res.status(200).json(result.rows);
              })
              .catch(e => {return next(e)});
      }
      finally {
        client.release();
      }

    })().catch(e => {return next(e)});
  }

  exports.issuetype = (req,res,next) => {
    (async() => {
      const client = await pool.connect();

      try{
        client.query("select * from getIssueType()")
              .then(result => {
                res.status(200).json(result.rows);
              })
              .catch(e => {return next(e)});
      }
      finally {
        client.release();
      }

    })().catch(e => {return next(e)});
  }
})();
