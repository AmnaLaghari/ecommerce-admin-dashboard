<template>
	<div class="container my-5">
		<div class="card my-5">
			<div class="card-body py-2 px-4">
				<h3>Revenue Overview</h3>
			</div>
		</div>
		<div class="row" v-if="summary">
			<div class="col-md-2">
				<KpiCard title="Total Orders" :value="summary.totalOrders" icon="shopping-cart" />
			</div>
			<div class="col-md-2">
				<KpiCard title="Revenue" :value="`$ ${summary.totalRevenue.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        })}`" icon="money-bill" />
			</div>
			<div class="col-md-2">
				<KpiCard title="Avg Order Value" :value="`$ ${summary.avgOrderValue.toFixed(0)}`" icon="chart-line" />
			</div>
			<div class="col-md-6">
				<EngagementCard />
			</div>
		</div>
		<div class="row">
			<div class="col-md-8">
				<div class="card my-4 p-3 chart shadow-sm">
					<RevenueLineChart :data="revenueData" />
				</div>
			</div>
			<div class="col-md-4">
				<div class="my-4 chart">
					<TopSingleHighlights :data="topHighlight" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="card p-4 my-4 shadow-sm">
					<RevenueByCategoryChart :data="revenueSplit" />
				</div>
			</div>
			<div class="col-md-6">
				<div class="card p-4 my-4 shadow-sm">
					<OrdersByCategoryChart :data="categoryOrders" />
				</div>
				<div class="card p-4 my-4 shadow-sm">
					<MonthlyRevenueChart :data="monthlyGrowth" />
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import KpiCard from '../components/card/KpiCard.vue'
import RevenueLineChart from '../components/charts/RevenueLineChart.vue'
import OrdersByCategoryChart from '../components/charts/OrdersByCategoryChart.vue'
import EngagementCard from '../components/card/EngagementCard.vue'
import RevenueByCategoryChart from '../components/charts/RevenueByCategoryChart.vue'
import TopSingleHighlights from '..//components/charts/TopSingleHighlights.vue'
import MonthlyRevenueChart from '../components/charts/MonthlyRevenueChart.vue'

const summary = ref(null)
const revenueData = ref([])
const categoryOrders = ref([])
const revenueSplit = ref([])
const topHighlight = ref({ topCategory: {}, topProduct: {} })
const monthlyGrowth = ref([])

onMounted(async () => {
	const res_summary = await fetch(`${import.meta.env.VITE_API_URL}/api/revenue/summary`)
	summary.value = await res_summary.json()
	const res_rev = await fetch(`${import.meta.env.VITE_API_URL}/api/revenue/sales-over-time?groupBy=daily`)
	revenueData.value = await res_rev.json()
	const res_catg = await fetch(`${import.meta.env.VITE_API_URL}/api/revenue/orders-by-category`)
	categoryOrders.value = await res_catg.json()
	const res_rev_catg = await fetch(`${import.meta.env.VITE_API_URL}/api/revenue/revenue-by-category`)
	revenueSplit.value = await res_rev_catg.json()
	const res_top = await fetch(`${import.meta.env.VITE_API_URL}/api/revenue/top-single`)
	topHighlight.value = await res_top.json()
	const res_monthly = await fetch(`${import.meta.env.VITE_API_URL}/api/revenue/monthly-revenue`)
	monthlyGrowth.value = await res_monthly.json()


})
</script>
