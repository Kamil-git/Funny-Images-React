const Item = require("../../model/Item/Item")
const asyncHandler = require("express-async-handler")
const validateId = require("../utils/validateId")
const cloudUploadImg = require("../utils/cloudConn")
const fs = require("fs")

const createItemCtrl = asyncHandler(async (req, res) => {
  const { collectionId, description, title } = req.body

  const localPath = `${req.file.filename}`

  const imgUploaded = await cloudUploadImg(localPath)
  try {
    const item = await Item.create({
      title: title,
      collectionId: collectionId,
      description: description,
      itemImg: imgUploaded?.url,
    })

    fs.unlinkSync(localPath)
    res.json(item)
  } catch (error) {
    res.json(error)
  }
})

//fetch all items
const fetchItemsCtrl = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find({}).populate("user")
    res.json(items)
  } catch (error) {}
})

const fetchItemCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const item = await Item.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes")
    res.json(item)
  } catch (error) {
    res.json(error)
  }
})
//update item
const updateItemCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)

  try {
    const item = await Item.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    )
    res.json(item)
  } catch (error) {
    res.json(error)
  }
})

//delete item
const deleteItemCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const item = await Item.findByIdAndDelete(id)
    res.json(item)
  } catch (error) {
    res.json(error)
  }
  res.json("Delete")
})

module.exports = {
  updateItemCtrl,
  createItemCtrl,

  fetchItemsCtrl,
  fetchItemCtrl,
  deleteItemCtrl,
}
