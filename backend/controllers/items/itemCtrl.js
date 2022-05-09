const Item = require("../../model/Item/Item")
const asyncHandler = require("express-async-handler")
const validateId = require("../utils/validateId")
const cloudUploadImg = require("../utils/cloudConn")
const fs = require("fs")
const createItemCtrl = asyncHandler(async (req, res) => {
  validateId(req.body.user)

  try {
    const item = await Item.create(req.body)
    res.json(item)
  } catch (error) {
    res.json(error)
  }
})

const itemImgUploadCtrl = asyncHandler(async (req, res) => {
  // console.log(req.file.filename)
  //1. Get the path to the img
  const localPath = `backend/public/images/${req.file.filename}`
  //2.Upload to cloud
  // console.log(localPath)
  const imageUploaded = await cloudUploadImg(localPath)
  console.log(imageUploaded?.url)
  try {
    const item = await Item.create({
      ...req.body,
      image: imageUploaded?.url,
      user: _id,
      title: req.body.title,
    })

    res.json(item)
    fs.unlinkSync(localPath)
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
    const item = await Item.findById(id).populate("user").populate('disLikes').populate('likes')
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
const addLike = asyncHandler(async (req, res) => {
  console.log(req.user)
  //1.Find the post to be liked
  const { itemId } = req.body
  const item = await Item.findById(itemId)
  const loginUserId = req?.user?._id
  const isLiked = item.isLiked
  const isDisliked = item.disLikes.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  )

  if (isDisliked) {
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $pull: { disLikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    )
    res.json(item)
  }

  if (isLiked) {
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    )
    res.json(item)
  } else {
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    )
    res.json(item)
  }
})
const addDislike = asyncHandler(async (req, res) => {
  const { itemId } = req.body
  const item = await Item.findById(itemId)

  const loginUserId = req.user._id
  const isDisliked = item.isDisliked
  const alreadyLiked = item.likes.find(
    (userId) => userId.toString() === loginUserId?.toString()
  )

  if (alreadyLiked) {
    const item = await Item.findOneAndUpdate(
      itemId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    )
    res.json(item)
  }
  if (isDisliked) {
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $pull: { disLikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    )
    res.json(item)
  } else {
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $push: { disLikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    )
    res.json(item)
  }
})

module.exports = {
  updateItemCtrl,
  createItemCtrl,
  itemImgUploadCtrl,
  fetchItemsCtrl,
  fetchItemCtrl,
  deleteItemCtrl,
  addLike,
  addDislike,
}
