<template>
  <Navbar />
  <Hero />
  <Bio />
  <Testimonials />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./Navbar.vue";
import Hero from "./Hero.vue";
import Bio from "./Bio/Bio.vue";
import Footer from "./Footer/Footer.vue";
import Testimonials from "./Testimonials/Testimonials.vue";

export default defineComponent({
  components: { Navbar, Hero, Bio, Footer, Testimonials },
});
</script>
