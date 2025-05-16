const express = require('express')
const router = express.Router()
const upload = require('../utils/cloudinary') // multer + cloudinary storage
const { addProduct, getProducts, updateProductStock } = require('../controllers/productsController')

router.post('/', upload.single('images'), addProduct)
router.get('/', getProducts)
router.put('/:id/stock', updateProductStock)

module.exports = router
