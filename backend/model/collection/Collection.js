const mongoose = require("mongoose")

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      
    },
    imageLink: {
      type: String,
    },
    tags:{
      type:String
    }
  },
  {
    timestamps: true,
  }
)

const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection
