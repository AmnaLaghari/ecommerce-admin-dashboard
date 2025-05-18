import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Inventory from '../views/Inventory.vue'
import AddProduct from '../views/AddProduct.vue'
import Revenue from '../views/Revenue.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Revenue },
  { path: '/inventory', name: 'Inventory', component: Inventory },
  { path: '/add-product', name: 'AddProduct', component: AddProduct },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
