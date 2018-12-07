(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const passport = require('passport');
  const Authentication = require('../controller/authentication.js');
  const requireSignIn = passport.authenticate('local',{session:true});

  const common = require('../controller/common/commonRoutes');
  const admin = require('../controller/admin/adminRoutes');
  const user = require('../controller/user/userRoutes');

 // Common request handlers login,logout and changePassword
  router.post('/login',requireSignIn,common.login);
  router.get('/logout',common.logout);
  router.post('/forgetPassword',common.forgetPassword);
  router.get('/getStatus',Authentication.verifyUser,common.status);
  router.get('/getPriority',Authentication.verifyUser,Authentication.verifyAdmin,common.priority);
  router.get('/getProjects',Authentication.verifyUser,Authentication.verifyAdmin,common.projects);
  router.get('/getUsers',Authentication.verifyUser,Authentication.verifyAdmin,common.users);
  router.get('/getUserProject',Authentication.verifyUser,Authentication.verifyAdmin,common.userprojects);
  router.get('/issuetype',Authentication.verifyUser,Authentication.verifyAdmin,common.issuetype);

  // Routes for the admin
  router.get('/admin/getDetails',admin.getDetails);
  router.get('/admin/getUserRoles',Authentication.verifyUser,Authentication.verifyAdmin,admin.getUserRoles);
  router.post('/admin/assignIssue',Authentication.verifyUser,Authentication.verifyAdmin,admin.assignIssue);
  router.post('/admin/editIssue',Authentication.verifyUser,Authentication.verifyAdmin,admin.editIssue);
  router.post('/admin/registerUser',admin.registerUser);
  router.post('/admin/registerProject',Authentication.verifyUser,Authentication.verifyAdmin,admin.registerProject);
  router.post('/admin/assignProject',Authentication.verifyUser,Authentication.verifyAdmin,admin.assignProject);

  // Routes for the user
  router.get('/user/getUserProjectDetail',Authentication.verifyUser,user.getProjectDetail);
  router.get('/user/getUserProjects',Authentication.verifyUser,user.getProjectLists);
  router.post('/user/updateStatus',Authentication.verifyUser,user.editStatus);
  module.exports = router;
})();
