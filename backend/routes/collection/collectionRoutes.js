const express = require("express")
const {
  updateCollectionCtrl,
  deleteCollection,
  fetchCollCtrl,
  fetchCollectionCtrl,
  createCollectionCtrl,
} = require("../../controllers/collection/collectionCtrl")
const authMiddleware = require('../../middlewares/auth/authMiddleware')
const collectionRoutes = express.Router()

collectionRoutes.post("/", authMiddleware, createCollectionCtrl)
collectionRoutes.get("/", fetchCollectionCtrl)
collectionRoutes.get("/:id", authMiddleware, fetchCollCtrl)
collectionRoutes.put("/:id", authMiddleware, updateCollectionCtrl)
collectionRoutes.delete("/:id", authMiddleware, deleteCollection)




module.exports = collectionRoutes
