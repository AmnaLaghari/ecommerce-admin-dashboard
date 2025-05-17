const express = require('express')
const router = express.Router()
const { getRevenueSummary, getRevenueOverTime, getOrdersByCategory, getEngagementSummary, getRevenueByCategory, getTopCategoryAndProduct, getMonthlyRevenue } = require('../controllers/revenueController')

router.get('/summary', getRevenueSummary)
router.get('/sales-over-time', getRevenueOverTime)
router.get('/orders-by-category', getOrdersByCategory) 
router.get('/engagement-summary', getEngagementSummary)
router.get('/revenue-by-category', getRevenueByCategory)
router.get('/top-single', getTopCategoryAndProduct)
router.get('/monthly-revenue', getMonthlyRevenue)

module.exports = router
