const colors = require("colors")
const express = require("express")
require("dotenv").config()
const dbConnect = require("./config/db/dbConnect")
const userRoutes = require("./controllers/users/usersRoute")
const { errorHandler} = require("./middlewares/error/errorHandler")
const cookieParser = require('cookie-parser')





//server
const app = express()
dbConnect()
//middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//users route
app.use("/api/users", userRoutes)

//error handler
app.use(errorHandler)
//server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`.cyan))
