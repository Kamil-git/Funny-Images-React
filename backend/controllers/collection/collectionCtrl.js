const asyncHandler = require("express-async-handler")
const validateId = require("../utils/validateId")
const cloudUploadImg = require("../utils/cloudConn")
const Collection = require("../../model/collection/Collection")

const createCollectionCtrl = asyncHandler(async (req, res) => {
  const localPath = `${req.file.filename}`

  const imgUploaded = await cloudUploadImg(localPath)

  try {
    const collection = await Collection.create({
      user: req.user._id,
      name: req.body.name,
      tags: req.body.tags,
      imageLink: imgUploaded?.url,
    })

    res.json(collection)
  } catch (error) {
    res.json(error)
  }
})
const fetchCollectionCtrl = asyncHandler(async (req, res) => {
  try {
    const collections = await Collection.find({})
      .populate("user")
      .populate("comments")
      .populate("items")
      .sort("-createdAt")
    res.json(collections)
  } catch (error) {
    res.json(error)
  }
})
const fetchCollectionItems = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const collection = await Collection.findById(id)
      .populate("items")
      .sort("-createdAt")
    res.json(collection)
  } catch (error) {
    res.json(error)
  }
})

const updateCollectionCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const collection = await Collection.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        tags: req.body.tags,
      },
      { new: true, runValidators: true }
    )
    res.json(collection)
  } catch (error) {}
})

const deleteCollection = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const collection = await Collection.findByIdAndDelete(id)
    res.json(collection)
  } catch (error) {
    res.json(error)
  }
})





module.exports = {
  updateCollectionCtrl,
  deleteCollection,
  fetchCollectionItems,
  fetchCollectionCtrl,
  createCollectionCtrl,

}
