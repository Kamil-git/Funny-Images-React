const express = require("express")
const passport = require("passport")

const CLIENT_URL = "http://localhost:3000"

const socialMediaRoutes = express.Router()

socialMediaRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["profile"] })
)

socialMediaRoutes.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: CLIENT_URL,
    successRedirect: CLIENT_URL,
  })
)

module.exports = socialMediaRoutes
