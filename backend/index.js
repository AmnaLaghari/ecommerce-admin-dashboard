const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productRoutes = require('./routes/products')
const revenueRoutes = require('./routes/revenue')
app.use('/api/products', productRoutes)
app.use('/api/revenue', revenueRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
