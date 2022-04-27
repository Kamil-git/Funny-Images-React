const User = require("../../model/user/User")
const asyncHandler = require("express-async-handler")
const generateToken = require("../../config/token/generateToken")
const validateId = require("../utils/validateId")


//--------------------------------------Register
const userRegisterCtrl = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) throw new Error("User already exists")
  try {
    //Register user
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

//Login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const userFound = await User.findOne({ email })
  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid credentials")
  }
})

//Users
const fetchUsersCtrl = asyncHandler(async (req, res) => {
  console.log(req.headers)
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})

//Delete user
const deleteUsersCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    res.json(deletedUser)
  } catch (error) {
    res.json(error)
  }
})

//user details
const fetchUserDetailsCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  //check if user id is valid
  validateId(id)

  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

//user profile

const userProfileCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const myProfile = await User.findById(id)
    res.json(myProfile)
  } catch (error) {
    res.json(error)
  }
})

//update profile
const updateUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.user

  validateId(id)
  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  )

  res.json(user)
})

//update password

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
}
