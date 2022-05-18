const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required:true,
      trim: true,
    },
    description: {
      type: String,
      required:true
    },
    collectionId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Collection',
      required:true
    },
    itemImg: {
      type: String,
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



const Item = mongoose.model("Item", itemSchema)
module.exports = Item
