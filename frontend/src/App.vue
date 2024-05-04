<template>
  <Navbar />
  <Hero />
  <Bio />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./Navbar.vue";
import Hero from "./Hero.vue";
import Bio from "./Bio/Bio.vue";

export default defineComponent({
  components: { Navbar, Hero, Bio },
});
</script>
