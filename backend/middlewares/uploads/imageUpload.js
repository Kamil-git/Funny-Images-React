const multer = require("multer")
const sharp = require("sharp")
const path = require("path")
//storage
const multerStorage = multer.memoryStorage()

//file type checking
const multerFilter = (req, file, cb) => {
  //check file type

  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    )
  }
}

const imageUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 20000000 },
})

const imageResize = async (req, res, next) => {
  if (!req.file) return next()
  req.file.filename = `user-${req.user._id}-${req.file.originalname}`

  await sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .toFile(path.join(`backend/public/images/${req.file.filename}`))
  next()
}

module.exports = { imageUpload, imageResize }
