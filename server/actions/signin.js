(function(){
  'use strict';
  const pool = require('../dbconfig.js');

  /* This function checks whether a user with the given email and password exists or not.
     If any user with the given email exists, then it returns that user else it returns null. */

  const verifyUser = (email,password) => {

    var params = [];
    params.push(email);
    params.push(password);

    (async() => {
      const client = await pool.connect();

      try {
        var result = await client.query("select * from loginDetails($1,$2)",params);
        if(result.rows.length > 0){
          var user = result.rows[0]
          return user;
        } else {
          return null;
        }
      } finally {
        client.release();
      }
    })().catch(e => {return next(e);});

  }

  module.exports = { verifyUser };
})();
