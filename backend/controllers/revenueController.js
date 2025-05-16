const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const dayjs = require('dayjs')

const getRevenueSummary = async (req, res) => {
  try {
    const totalOrders = await prisma.order.count()

    const revenueData = await prisma.orderItem.aggregate({
      _sum: {
        quantity: true,
        price: true
      }
    })

    const revenue = await prisma.orderItem.findMany({
      select: {
        quantity: true,
        price: true
      }
    })

    const totalRevenue = revenue.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0)

    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0

    const trafficData = await prisma.dailyTraffic.findMany()

    const totalVisitors = trafficData.reduce((sum, entry) => sum + entry.visitors, 0)
    const totalDays = trafficData.length

    const dau = totalDays > 0 ? Math.round(totalVisitors / totalDays) : 0

    const conversionRate = dau > 0 ? (totalOrders / dau) * 100 : 0

    res.json({
      totalOrders,
      totalRevenue,
      avgOrderValue,
      dau,
      conversionRate
    })
  } catch (err) {
    console.error('Error fetching revenue summary:', err)
    res.status(500).json({ message: 'Failed to fetch summary' })
  }
}


const getRevenueOverTime = async (req, res) => {
  const groupBy = req.query.groupBy || 'daily' // 'daily', 'weekly', 'monthly'

  const groupFormat = groupBy === 'monthly'
    ? 'YYYY-MM'
    : groupBy === 'weekly'
    ? 'YYYY-[W]WW'
    : 'YYYY-MM-DD'

  try {
    const orders = await prisma.orderItem.findMany({
      include: {
        order: true
      }
    })

    const revenueMap = {}

    for (const item of orders) {
      const dateKey = dayjs(item.order.createdAt).format(groupFormat)
      const revenue = item.quantity * item.price

      revenueMap[dateKey] = (revenueMap[dateKey] || 0) + revenue
    }

    const result = Object.entries(revenueMap)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    res.json(result)
  } catch (err) {
    console.error('Failed to fetch revenue:', err)
    res.status(500).json({ message: 'Failed to fetch revenue over time' })
  }
}

const getOrdersByCategory = async (req, res) => {
  try {
    const items = await prisma.orderItem.findMany({
      include: { product: true }
    })

    const categoryCount = {}

    for (const item of items) {
      const category = item.product.category
      categoryCount[category] = (categoryCount[category] || 0) + 1
    }

    const result = Object.entries(categoryCount)
      .map(([category, orders]) => ({ category, orders }))

    res.json(result)
  } catch (err) {
    console.error('Error getting orders by category:', err)
    res.status(500).json({ message: 'Failed to fetch data' })
  }
}

const getEngagementSummary = async (req, res) => {
  try {
    const traffic = await prisma.dailyTraffic.findMany()
    const orders = await prisma.order.findMany()
    const daysCount = traffic.length
    const totalVisitors = traffic.reduce((sum, day) => sum + day.visitors, 0)
    const avgDAU = daysCount ? totalVisitors / daysCount : 0
    const buyersByDate = {}

    for (const order of orders) {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      if (!buyersByDate[date]) buyersByDate[date] = new Set()
      buyersByDate[date].add(order.buyerId)
    }

    const avgDailyBuyers = Object.values(buyersByDate)
      .reduce((sum, buyersSet) => sum + buyersSet.size, 0) / daysCount

    const conversionRate = avgDAU > 0 ? (avgDailyBuyers / avgDAU) * 100 : 0

    res.json({
      avgDAU: Math.round(avgDAU),
      avgDailyBuyers: Math.round(avgDailyBuyers),
      conversionRate: Number(conversionRate.toFixed(2))
    })
  } catch (err) {
    console.error('Error calculating conversion rate:', err)
    res.status(500).json({ message: 'Failed to load engagement summary' })
  }
}

const getRevenueByCategory = async (req, res) => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      include: { product: true }
    })

    const revenueMap = {}

    for (const item of orderItems) {
      const category = item.product.category
      const revenue = item.quantity * item.price
      revenueMap[category] = (revenueMap[category] || 0) + revenue
    }

    const totalRevenue = Object.values(revenueMap).reduce((a, b) => a + b, 0)

    const result = Object.entries(revenueMap).map(([category, revenue]) => ({
      category,
      revenue,
      percent: ((revenue / totalRevenue) * 100).toFixed(2)
    }))

    res.json(result)
  } catch (err) {
    console.error('Error fetching revenue by category:', err)
    res.status(500).json({ message: 'Failed to load revenue split' })
  }
}

const getTopCategoryAndProduct = async (req, res) => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      include: { product: true }
    })

    const categoryMap = {}
    const productMap = {}

    for (const item of orderItems) {
      const { category, name, id, image } = item.product
      const revenue = item.quantity * item.price

      categoryMap[category] = (categoryMap[category] || 0) + revenue

      if (!productMap[id]) {
        productMap[id] = { name, revenue: 0 }
      }
      productMap[id].revenue += revenue
    }

    const topCategory = Object.entries(categoryMap)
      .map(([category, revenue]) => ({ category, revenue }))
      .sort((a, b) => b.revenue - a.revenue)[0]

    const topProduct = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)[0]

    res.json({ topCategory, topProduct })
  } catch (err) {
    console.error('Error fetching top category/product:', err)
    res.status(500).json({ message: 'Failed to fetch data' })
  }
}

module.exports = { getRevenueSummary, getRevenueOverTime, getOrdersByCategory, getEngagementSummary, getRevenueByCategory, getTopCategoryAndProduct }
