<template>
  <Navbar @showContactModal="showContactModal" />
  <Hero @showContactModal="showContactModal" />
  <Bio />
  <ContactModal @hideContactModal="hideContactModal" v-if="renderContactModal"/>
  <Footer />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./Navbar.vue";
import Hero from "./Hero.vue";
import Bio from "./Bio/Bio.vue";
import Footer from "./Footer/Footer.vue";
import ContactModal from "./ContactModal/ContactModal.vue";

const renderContactModal = ref(false);

const showContactModal = () => {
  renderContactModal.value = true;
};

const hideContactModal = () => {
  renderContactModal.value = false;
};
</script>
