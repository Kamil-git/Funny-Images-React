const asyncHandler = require("express-async-handler")


const Collection = require("../../model/collection/collection")

const createCollectionCtrl = asyncHandler(async (req, res) => {
  try {
    const collection = await Collection.create({
      user: req.user._id,
      name: req.body.name,
      tags:req.body.tags,
      imageLink:req.body.imageLink
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
      .sort("-createdAt")
    res.json(collections)
  } catch (error) {
    res.json(error)
  }
})
const fetchCollCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const collection = await Collection.findById(id)
      .populate("user")
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
      },
      { new: true, runValidators: true }
      
    )
    res.json(collection)
  } catch (error) {}
})

const deleteCollection = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const collection = await Collection.findByIdAndDelete(id)
        res.json(collection)
    } catch (error) {
        res.json(error)
    }
})

const addLike = asyncHandler(async (req, res) => {
  console.log(req.user)
  //1.Find the post to be liked
  const { collectionId } = req.body
  const collection = await Collection.findById(collectionId)
  const loginUserId = req?.user?._id
  const isLiked = collection.isLiked
  const isDisliked = collection.disLikes.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  )

  if (isDisliked) {
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $pull: { disLikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    )
    res.json(collection)
  }

  if (isLiked) {
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    )
    res.json(collection)
  } else {
    const collection = await Item.findByIdAndUpdate(
      itemId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    )
    res.json(collection)
  }
})
const addDislike = asyncHandler(async (req, res) => {
  const { collectionId } = req.body
  const collection = await Collection.findById(collectionId)

  const loginUserId = req.user._id
  const isDisliked = collection.isDisliked
  const alreadyLiked = collection.likes.find(
    (userId) => userId.toString() === loginUserId?.toString()
  )

  if (alreadyLiked) {
    const collection= await Collection.findOneAndUpdate(
      collectionId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    )
    res.json(collection)
  }
  if (isDisliked) {
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $pull: { disLikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    )
    res.json(collection)
  } else {
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $push: { disLikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    )
    res.json(collection)
  }
})

module.exports = {
  updateCollectionCtrl,
  deleteCollection,
  fetchCollCtrl,
  fetchCollectionCtrl,
  createCollectionCtrl,
  addLike,
  addDislike,
}
