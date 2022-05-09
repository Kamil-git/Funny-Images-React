const cloudinary = require("cloudinary")

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
})

const cloudUploadImg = async (img) => {
  try {
    const data = cloudinary.v2.uploader.upload(img, {
      resource_type: "image",
    })

    return {
      url: (await data).secure_url,
    }
  } catch (error) {
    return error
  }
}

module.exports = cloudUploadImg
