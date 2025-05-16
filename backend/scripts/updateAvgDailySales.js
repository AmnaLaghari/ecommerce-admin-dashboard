const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function updateAvgDailySalesForAllProducts() {
    const products = await prisma.product.findMany()

    for (const product of products) {
        const orderItems = await prisma.orderItem.findMany({
            where: { productId: product.id },
            include: { order: true }
        })

        if (orderItems.length === 0) {
            await prisma.product.update({
                where: { id: product.id },
                data: { avgDailySales: 0 }
            })
            continue
        }

        const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0)
        const dates = orderItems.map(item => new Date(item.order.createdAt))
        const firstDate = new Date(Math.min(...dates))
        const lastDate = new Date(Math.max(...dates))

        const daysSold = Math.max((lastDate - firstDate) / (1000 * 60 * 60 * 24), 1) // min 1 day
        const avgDailySales = totalQuantity / daysSold

        await prisma.product.update({
            where: { id: product.id },
            data: { avgDailySales }
        })

        console.log(`Updated Product ID ${product.id} - avgDailySales: ${avgDailySales.toFixed(2)}`)
    }
}

updateAvgDailySalesForAllProducts()
    .catch(err => {
        console.error('Failed to update avgDailySales:', err)
    })
    .finally(() => {
        prisma.$disconnect()
    })

module.exports = { updateAvgDailySalesForAllProducts }