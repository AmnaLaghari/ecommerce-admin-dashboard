const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const products = require('./data/products.json')
const orders = require('./data/orders.json')

// Revenue endpoint
app.get('/api/revenue', (req, res) => {
  res.json(orders)
})

// Products endpoint
app.get('/api/products', (req, res) => {
  res.json(products)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
