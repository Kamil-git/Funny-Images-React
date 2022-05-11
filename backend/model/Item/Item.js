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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
