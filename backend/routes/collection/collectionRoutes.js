const express = require("express")
const {
  updateCollectionCtrl,
  deleteCollection,
  fetchCollectionItems,
  fetchCollectionCtrl,
  createCollectionCtrl,


} = require("../../controllers/collection/collectionCtrl")
const authMiddleware = require("../../middlewares/auth/authMiddleware")
const { imageUpload, imageResize } = require("../../middlewares/uploads/imageUpload")
const collectionRoutes = express.Router()

collectionRoutes.post(
  "/",
  authMiddleware,
  imageUpload.single("imageLink"),
  imageResize,
  createCollectionCtrl
)
collectionRoutes.get("/", fetchCollectionCtrl)

collectionRoutes.put("/:id", authMiddleware, updateCollectionCtrl)
collectionRoutes.delete("/:id", authMiddleware, deleteCollection)



module.exports = collectionRoutes
