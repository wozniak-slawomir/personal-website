<template>
  <div>
    <Navbar @show-contact-modal="showContactModal" />
    <Hero @show-contact-modal="showContactModal" />
    <Bio />
    <RealizedProjects />
    <Testimonials />
    <Services @show-contact-modal="showContactModal" />
    <ContactModal
      v-if="renderContactModal"
      @hide-contact-modal="hideContactModal"
    />
    <BackgroundAnimation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
