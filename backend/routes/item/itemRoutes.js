const express = require("express")
const {
  createItemCtrl,
 
  fetchItemCtrl,
  fetchItemsCtrl,
  updateItemCtrl,
  deleteItemCtrl,
  
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
  imageUpload.single("itemImg"),
  imageResize,
  createItemCtrl
    
)

itemRoutes.get("/", fetchItemsCtrl)
itemRoutes.get("/:id", fetchItemCtrl)
itemRoutes.put("/:id", updateItemCtrl)
itemRoutes.delete("/:id", authMiddleware, deleteItemCtrl)
module.exports = itemRoutes
