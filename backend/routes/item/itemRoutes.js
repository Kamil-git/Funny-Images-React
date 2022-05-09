const express = require("express")
const {
  createItemCtrl,
  itemImgUploadCtrl,
  fetchItemCtrl,
  fetchItemsCtrl,
  updateItemCtrl,
  deleteItemCtrl,
  addLike,
  addDislike
} = require("../../controllers/items/itemCtrl")

const authMiddleware = require("../../middlewares/auth/authMiddleware")
const {
  imageResize,
  imageUpload,
} = require("../../middlewares/uploads/imageUpload")
const itemRoutes = express.Router()

itemRoutes.post(
  "/",
  authMiddleware,
  imageUpload.single("image"),
  imageResize,
  createItemCtrl
)
itemRoutes.put(
  "/like",
  authMiddleware,
  addLike,
  
)
itemRoutes.put(
  "/dislike",
  authMiddleware,
  addDislike,
  
)
itemRoutes.get("/", fetchItemsCtrl)
itemRoutes.get("/:id", fetchItemCtrl)
itemRoutes.put("/:id", updateItemCtrl)
itemRoutes.delete("/:id", authMiddleware, deleteItemCtrl)
module.exports = itemRoutes
