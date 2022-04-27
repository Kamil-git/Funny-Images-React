const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      required:true,
      type: String
    },
    lastName: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require:true,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Registered User"],
    },
    isAccountVerified: { type: Boolean, default: false },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    passwordChangeAt: Date,
    passwordRessetToken: String,
    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

//Hash password

userSchema.pre("save", async function (next) {
  if(!this.isModified('password')){
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//match password 
userSchema.methods.isPasswordMatched = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

//Compile schema into model
const User = mongoose.model("User", userSchema)

module.exports = User
