<template>
  <Navbar @show-contact-modal="showContactModal" />
  <Hero @show-contact-modal="showContactModal" />
  <Bio />
  <Testimonials />
  <Services @show-contact-modal="showContactModal" />
  <ContactModal
    v-if="renderContactModal"
    @hide-contact-modal="hideContactModal"
  />
  <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './Navbar.vue'
import Hero from './Hero.vue'
import Bio from './Bio/Bio.vue'
import Testimonials from './Testimonials/Testimonials.vue'
import Services from './Services/Services.vue'
import Footer from './Footer/Footer.vue'
import ContactModal from './ContactModal/ContactModal.vue'

const renderContactModal = ref(false)

const hideContactModal = () => {
  renderContactModal.value = false
  document.body.style.overflowY = 'auto'
}

const showContactModal = () => {
  renderContactModal.value = true
  document.body.style.overflowY = 'hidden'
}
</script>
