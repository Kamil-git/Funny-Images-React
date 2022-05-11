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

module.exports = { updateCollectionCtrl, deleteCollection, fetchCollCtrl, fetchCollectionCtrl, createCollectionCtrl}
