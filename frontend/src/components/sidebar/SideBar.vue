<script>
import SidebarLink from './SidebarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth } from './state.js'

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span class="logo" v-if="collapsed">
        <fa icon="cart-shopping" class="icon"/>
      </span>
      <img v-else src="../../assets/ecommerce-logo.png"/>
    </h1>

    <SidebarLink to="/" icon="fa fa-columns">Dashboard</SidebarLink>
    <SidebarLink to="/inventory" icon="fas fa-chart-bar">Inventory</SidebarLink>
    <SidebarLink to="/add-product" icon="fas fa-users">App Products</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <fa icon="angle-double-left" class="icon"/>
    </span>
  </div>
</template>


