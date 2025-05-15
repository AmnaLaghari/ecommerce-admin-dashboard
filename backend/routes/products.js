const express = require('express')
const router = express.Router()
const upload = require('../utils/cloudinary') // multer + cloudinary storage
const { addProduct, getProducts } = require('../controllers/productsController')

router.post('/', upload.single('images'), addProduct)
router.get('/', getProducts)

module.exports = router
