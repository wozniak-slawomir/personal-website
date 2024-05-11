<template>
  <Navbar />
  <Hero />
  <Bio />
  <Services />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./Navbar.vue";
import Hero from "./Hero.vue";
import Bio from "./Bio/Bio.vue";
import Services from "./Services/Services.vue";
import Footer from "./Footer/Footer.vue";

export default defineComponent({
  components: { Navbar, Hero, Bio, Services, Footer },
});
</script>
