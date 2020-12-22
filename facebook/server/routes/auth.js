const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require('../controllers/auth');

/* Login */
router.post("/login",  authController.login);

/* Register */
router.post("/register", authController.register);

/* Facebook auth */
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    successRedirect: process.env.FRONTEND_URL
  })
);

router.get(
  "/auth/facebook/callback",
  authController.facebook_callback
 );

 /* Logout */
router.get("/logout", authController.logout);

/* Check if user is logged in */
router.get('/checkAuth', authController.checkAuth);

/* Send back token based on user session */
router.get('/getToken', authController.getUserToken);

module.exports = router;