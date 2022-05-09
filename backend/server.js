const colors = require("colors")
const express = require("express")
require("dotenv").config()
const dbConnect = require("./config/db/dbConnect")
const userRoutes = require("./routes/user/usersRoute")
const { errorHandler} = require("./middlewares/error/errorHandler")
const itemRoutes = require("./routes/item/itemRoutes")
const commentRoute = require('./routes/comment/commentRoute')
const categoryRoute = require("./routes/category/categoryRoute")
const cors = require("cors")
dbConnect()
//server
const app = express()

//middleware
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//users route
app.use("/api/users", userRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/comments', commentRoute)
app.use("/api/category", categoryRoute)
//error handler
app.use(errorHandler)
//server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`.cyan))
