const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(products)
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
}


const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body
    const images = req.file?.path || null

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images,
        category
      }
    })

    res.status(201).json({ message: 'Product added', product: newProduct })
  } catch (err) {
    console.error('Error adding product:', err)
    res.status(500).json({ message: 'Failed to add product', error: err.message })
  }
}

const updateProductStock = async (req, res) => {
  const productId = parseInt(req.params.id)
  const { stock } = req.body

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { stock: parseInt(stock) }
    })

    res.status(200).json(updatedProduct)
  } catch (err) {
    console.error('❌ Error updating stock:', err)
    res.status(500).json({ message: 'Failed to update stock' })
  }
}

module.exports = {
  addProduct,
  getProducts,
  updateProductStock
}