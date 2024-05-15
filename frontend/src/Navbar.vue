<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--secondary-color)] py-5 px-16 flex flex-wrap justify-between items-center fixed top-0 left-0 z-20">
    <img src="/logo.png" class="w-[400px]" />
    <div class="h-full">
      <button @click="showContactModal = true"
        class="px-8 py-5 rounded-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-[color:var(--secondary-color)] hidden md:inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-transform transform-gpu hover:-translate-y-1">
        Contact me
      </button>
    </div>
  </nav>
  <ContactModal @hideContactModal="showContactModal = false" v-if="showContactModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContactModal from './ContactModal/ContactModal.vue';
const showContactModal = ref(false);

</script>

<style scoped></style>
