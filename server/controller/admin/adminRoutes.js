(function() {
  'use strict';

   const pool = require('../../dbconfig.js');
   const bcrypt = require('bcryptjs');

   exports.getDetails = (req,res) => {
     (async() => {
       const client = await pool.connect();
       try{
         const result = await client.query('select * from getAllIssues()');
         res.json(result.rows);
       } finally {
         client.release();
       }
     })().catch(e => console.log(e));
   }

   exports.assignIssue = (req,res) => {
     (async() =>{
       const client = await pool.connect();
       try{
         const result = await client.query("select * from issueAssignment($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
         [req.body.projectid,req.body.moduletype,req.body.assignmentdetails,req.body.status,req.body.assignedby,req.body.assignedto,
           req.body.priority,req.body.startdate,req.body.enddate,req.body.assignmenttitle]);

           console.log(result);
           if(!result.rows[0].issueassignment){
             var err = {
               status: 500,
               message: "Issue Assignment Failed!"
             }
             next(err);
           }
           res.status(200).json({
             message: "Issue Assignment Successful!"
           });
       } finally {
         client.release();
       }
     })().catch(e => console.log(e));
   }

   exports.editIssue = (req,res) => {
     (async() =>{
       const client = await pool.connect();
       try{
         const result = await client.query("select * from editIssue($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
         [req.body.id,req.body.projectid,req.body.moduletype,req.body.assignmentdetails,req.body.status,req.body.assignedby,req.body.assignedto,
           req.body.priority,req.body.startdate,req.body.enddate,req.body.assignmenttitle]);

           console.log(result);
           if(!result.rows[0].editissue){
             var err = {
               status: 500,
               message: "Issue Updation Failed!"
             }
             next(err);
           }
           res.status(200).json({
             message: "Issue Updation Successful!"
           });
       } finally {
         client.release();
       }
     })().catch(e => console.log(e));
   }


   exports.registerUser = (req,res,next) => {
     (async() =>{
       const client = await pool.connect();

       var salt = bcrypt.genSaltSync(10);
       var hash = bcrypt.hashSync(req.body.userpassword, salt);
       
       try{
         const result = await client.query("select * from insertUserDetails($1,$2,$3,$4,$5)",
         [req.body.username,req.body.usermail,req.body.userrole,req.body.active,hash]);


           if(!result.rows[0].insertuserdetails){
             var err = {
               status: 500,
               message: "New user insertion Failed!"
             }
             next(err);
           }
           res.status(200).json({
             message: "New user registration Successful!"
           });
       } finally {
          client.release();
       }
     })().catch(e => {return next(e)});
   }

   exports.registerProject = (req,res,next) => {
     (async() => {
       const client = await pool.connect();
       try{
         const result = await client.query("select * from insertProjectDetails($1,$2,$3,$4,$5,$6)",
         [req.body.projectname,req.body.client,req.body.description,req.body.startdate,req.body.enddate,req.body.active]);


           if(!result.rows[0].insertprojectdetails){
             var err = {
               status: 500,
               message: "Project Insertion Failed!"
             }
             next(err);
           }
           res.status(200).json({
             message: "Project Insertion Successful!"
           });
       }
       finally {
         client.release();
       }
     })().catch( e => {return next(e)});
   }

   exports.assignProject = (req,res,next) => {
     (async() => {
       const client = await pool.connect();
       try{
         const result = await client.query("select * from insertUserProjectDetails($1,$2,$3)",
         [req.body.userid,req.body.projectid,req.body.active]);


           if(!result.rows[0].insertuserprojectdetails){
             var err = {
               status: 500,
               message: 'Project Assignment Failed..'
             }
             next(err);
           }
           res.status(200).json({
             message: "Project Assignment Successful!"
           });
       }
       finally {
         client.release();
       }
     })().catch( e => {return next(e)});
   }

   exports.getUserRoles = (req,res,next) => {
     (async() => {
       const client = await pool.connect();
       try{
         const result = await client.query("select * from getUserRoles()");
         res.status(200).json(result.rows);
       }
       finally {
         client.release();
       }
     })().catch( e => {return next(e)});
   }
})();
