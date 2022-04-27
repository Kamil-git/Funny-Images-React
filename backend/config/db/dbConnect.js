const mongoose = require('mongoose');
require("dotenv").config()

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to dabase: ${conn.connection.host}`.blue)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
module.exports = dbConnect;