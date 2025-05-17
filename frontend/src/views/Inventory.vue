<template>
  <div class="px-5">
    <div class="card my-5">
      <div class="card-body py-2 px-4">
        <h3>Product Management</h3>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <ProductFilters v-model="filters" />
        <table class="table">
          <thead class="inventory-table-heading">
            <tr>
              <th> <fa icon="image" class="icon"/> </th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Avg. Daily Sales</th>
              <th>stock</th>
              <th>Stock Cover</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-for="product in filteredProducts" :key="product.id" class="inventory-table-cols">
            <tr class="inventory-table-cols" >
              <th><img :src="product.images" alt="product image"  width="50px" height="50px"/></th>
              <th class="inventory-table-cols">{{ product.name }}</th>
              <th class="inventory-table-cols">{{ product.category }}</th>
              <th class="inventory-table-cols">${{ product.price }}</th>
              <th class="inventory-table-cols text-center">{{ product.avgDailySales.toFixed(2) }}</th>
              <th class="inventory-table-cols">
                {{ product.stock }}
                <span :class="getStockStatus(product).class" class="ms-2 fw-bold">
                  ({{ getStockStatus(product).label }})
                </span>
              </th>
              <th class="inventory-table-cols text-center">{{ (product.stock / product.avgDailySales).toFixed(0) }}</th>
              <th class="inventory-table-cols">{{ product.createdAt }}</th>
              <th>
                <button class="edit-btn" @click="openModal(product)">
                  <fa icon="pen" class="icon"/>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <UpdateStockModal
      :showModal="showModal"
      :selectedProduct="selectedProduct"
      @close="closeModal"
      @save="saveStock"
    />
</template>
  
<script setup>
  import { ref, onMounted, computed } from 'vue'
  import UpdateStockModal from '../components/modal/UpdateStockModal.vue'
  import ProductFilters from '../components/filters/ProductFilters.vue'
  
  const products = ref([])
  const loading = ref(true)
  const showModal = ref(false)
  const selectedProduct = ref(null)
  const filters = ref({
    stockStatus: '',
    category: '',
    sortBy: '',
    search: ''
  })


  function getStockStatus(product) {
    const { stock, avgDailySales } = product

    if (stock === 0) {
      return { label: 'Out of Stock', class: 'text-danger' }
    }

    if (!avgDailySales || avgDailySales === 0) {
      return { label: 'In Stock', class: 'text-success' }
    }

    const stockCoverDays = stock / avgDailySales

    if (stockCoverDays < 5) {
      return { label: 'Low Inventory', class: 'text-warning' }
    }

    return { label: 'In Stock', class: 'text-success' }
  }



  function openModal(product) {
    selectedProduct.value = { ...product }
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
    selectedProduct.value = null
  }

  async function saveStock(updatedProduct) {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${updatedProduct.id}/stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: updatedProduct.stock })
      })

      if (!res.ok) throw new Error('Failed to update stock')

      const index = products.value.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        products.value[index].stock = updatedProduct.stock
      }

      closeModal()
    } catch (err) {
      console.error(err)
      alert('Failed to update stock')
    }
  }

  const filteredProducts = computed(() => {

    let result = products.value.filter(product => {
      const stock = product.stock
      const status = stock === 0 ? 'out' : stock <= 20 ? 'low' : 'in'

      if (filters.value.stockStatus && filters.value.stockStatus !== status) return false
      if (filters.value.category && product.category.toLowerCase() !== filters.value.category.toLowerCase()) return false
      if (filters.value.search && !product.name.toLowerCase().includes(filters.value.search.toLowerCase())) return false

      return true
    })

    result = [...result]

    const sortBy = filters.value.sortBy
    if (filters.value.sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.value.sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price)
    } else if (filters.value.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (filters.value.sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    return result
  })

  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products')
      const data = await res.json()
      products.value = data
    } catch (err) {
      console.error('Failed to load products:', err)
    }
  })
</script>

  