<template>
  <div class="text-[color:var(--primary-text-color)]">
    <Navbar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './Navbar.vue'

export default defineComponent({
  components: {Navbar},
})
</script>
