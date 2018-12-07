(function() {
  'use strict';
  const express = require('express');
  const pool = require('./dbconfig.js');
  const router = express.Router();
  const bcrypt = require('bcryptjs');

  router.route('/')
        .post(function(req,res,next){
            (async() => {
              var parameters = [];
              var salt = bcrypt.genSaltSync(10);

              
              parameters.push(req.body.username);
              parameters.push(req.body.usermail);
              parameters.push(req.body.userrole);
              parameters.push(req.body.active);

              var hash = bcrypt.hashSync(req.body.userpassword, salt);
              parameters.push(hash);

              // Decoding the hash To be used in Login
              // bcrypt.compareSync("correct password", hash); // true
              // bcrypt.compareSync("wrong password", hash); // false

              const client = await pool.connect();

              try{
                const result = await client.query('select * from insertUserDetails($1,$2,$3,$4,$5)',parameters);
                // console.log(result.rows);
                if(result.rows[0].insertuserdetails == false) {
                  res.status(500).json({
                    message: "Data Insertion Failed"
                  });
                } else {
                  res.send("Data Successfully Inserted");
                }
              } finally {
                client.release();
              }
            })().catch(e => {return next(e);});
        });

  module.exports = router;

})();
