<template>
  <Navbar />
  <Hero />
</template>

<script lang="ts" >
import { defineComponent } from 'vue'
import Navbar from './Navbar.vue'
import Hero from './Hero.vue'

export default defineComponent({
  components: { Navbar, Hero },
})
</script>
