(function() {
  'use strict';

  const pool = require('../../dbconfig.js');

  exports.getProjectDetail = (req,res,next) => {
    (async() => {
      const client = await pool.connect();
      try {
          const result = await client.query("select * from getIssueForUser($1)",[req.decoded.id]);
          // console.log(result);
          res.status(200).json(result.rows);
      }finally {
        client.release();
      }
    })().catch(e => {return next(e);});
  };

  exports.editStatus = (req,res,next) => {
    (async() => {
      const client = await pool.connect();
      try {
          const result = await client.query("select * from editStatusByUser($1,$2)",[req.body.statusid,req.body.id]);
          if(!result.rows[0].editstatusbyuser){
            res.status(500).json({
              message: "Status Updation Failed"
            });
          }
          res.status(200).json({
            message: "Status Successfully Updated"
          });
      }finally {
        client.release();
      }
    })().catch(e => { return next(e); });
  };

  exports.getProjectLists = (req,res,next) => {
    (async() => {
      const client = await pool.connect();
      try{
        client.query("select * from getUserProjectById($1)",[req.decoded.id])
              .then(result => {
                res.status(200).json(result.rows);
              })
              .catch(e => {
                return next(e);
              })
      } finally {
        client.release();
      }
    })().catch(e => { return next(e); })
  }
})();
