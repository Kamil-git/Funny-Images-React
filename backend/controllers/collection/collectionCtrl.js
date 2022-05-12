const asyncHandler = require("express-async-handler")
const validateId = require("../utils/validateId")

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
      .populate("comments")
      .sort("-createdAt")
    res.json(collections)
  } catch (error) {
    res.json(error)
  }
})
const fetchCollCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const collection = await Collection.findById(id)
      .populate("user")
      .populate("comments")
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
        tags:req.body.tags
      },
      { new: true, runValidators: true }
      
    )
    res.json(collection)
  } catch (error) {}
})

const deleteCollection = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateId(id)
    try {
        const collection = await Collection.findByIdAndDelete(id)
        res.json(collection)
    } catch (error) {
        res.json(error)
    }
})

const toggleAddLikeToCollectionCtrl = asyncHandler(async (req, res) => {
  //1.Find the collection to be liked
  const { collectionId } = req.body
  const collection = await Collection.findById(collectionId)
  //2. Find the login user
  const loginUserId = req?.user?._id
  //3. Find is this user has liked this collection?
  const isLiked = collection?.isLiked
  //4.Chech if this user has dislikes this collection
  const alreadyDisliked = collection?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  )
  //5.remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    )
    res.json(collection)
  }
  //Toggle
  //Remove the user if he has liked the collection
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
    //add to likes
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    )
    res.json(collection)
  }
})

//------------------------------
//disLikes
//------------------------------

const toggleAddDislikeToCollectionCtrl = asyncHandler(async (req, res) => {
  //1.Find the collection to be disLiked
  const { collectionId } = req.body
  const collection = await Collection.findById(collectionId)
  //2.Find the login user
  const loginUserId = req?.user?._id
  //3.Check if this user has already disLikes
  const isDisLiked = collection?.isDisLiked
  //4. Check if already like this collection
  const alreadyLiked = collection?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  )
  //Remove this user from likes array if it exists
  if (alreadyLiked) {
    const collection = await Collection.findOneAndUpdate(
      collectionId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    )
    res.json(collection)
  }
  //Toggling
  //Remove this user from dislikes if already disliked
  if (isDisLiked) {
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    )
    res.json(collection)
  } else {
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
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
  toggleAddLikeToCollectionCtrl,
  toggleAddDislikeToCollectionCtrl
}
