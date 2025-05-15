<script>
import SideBar from './components/sidebar/SideBar.vue'
import { sidebarWidth } from './components/sidebar/state'

export default {
  components: { SideBar},
  setup() {
    return { sidebarWidth }
  }
}

</script>

<template>
  <SideBar/>
  <div :style="{ 'margin-left': sidebarWidth  }">
    <router-view />
  </div>
</template>