const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../../model/user/User")

const authMiddleware = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        //find the user by id
        const user = await User.findById(decoded?.id).select("-password")
        //attach the user to the request object
        req.user = user
        next()
      }
    } catch (error) {
      console.error(error)
      res.json('Error invalid token')
    }
  }
})

module.exports = authMiddleware
