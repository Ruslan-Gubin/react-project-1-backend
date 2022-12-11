import { cloudinary } from "./cloudinary.js";
 
const cloudinaryImagesMethod = async (file, folder) => {
return new Promise(resolve => {
  cloudinary.uploader.upload(file, {folder}, (err, res) => {
    if (err) return res.status(500).send('upload image error')
    resolve({
      public_id: res.public_id,
      url: res.secure_url
    })
  })
})
}

const cloudinaryImagesRemove = async (imag ) => {
 await cloudinary.uploader.destroy(imag, (err, res) => {
    if (err) return res.status(500).send('destroy image error')
  })
}

export {cloudinaryImagesMethod, cloudinaryImagesRemove}