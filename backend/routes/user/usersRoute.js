const express = require("express")
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  blockUserCtrl,
  unBlockUserCtrl
} = require("../../controllers/users/usersController")

const authMiddleware = require("../../middlewares/auth/authMiddleware")
const userRoutes = express.Router()

userRoutes.post("/register", userRegisterCtrl)
userRoutes.post("/login", loginUserCtrl)
userRoutes.get("/", authMiddleware, fetchUsersCtrl)
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl)
userRoutes.put("/:id", authMiddleware, updateUserCtrl)
userRoutes.put('/block-user/:id', authMiddleware, blockUserCtrl)
userRoutes.put('/unblock-user/:id', authMiddleware, unBlockUserCtrl)
userRoutes.put("/password/update", authMiddleware, updateUserPasswordCtrl)
userRoutes.delete("/:id", deleteUsersCtrl)
userRoutes.get("/:id", fetchUserDetailsCtrl)

module.exports = userRoutes
