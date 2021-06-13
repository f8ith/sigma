<template>
  <AppSidebar />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import AppFooter from './components/AppFooter.vue'
import AppSidebar from './components/AppSidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppSidebar,
  },
})
</script>
