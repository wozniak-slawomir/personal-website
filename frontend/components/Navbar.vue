<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--secondary-color)] py-5 px-16 flex flex-wrap justify-center md:justify-between items-center fixed top-0 left-0 z-20"
  >
    <img
      src="~/assets/logo.png"
      class="w-[400px]"
      alt="Slawomir Wozniak"
    >
    <div class="h-full">
      <button
        class="px-8 py-5 rounded-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-[color:var(--secondary-color)] hidden md:inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300"
        @click="$emit('showContactModal')"
      >
        Contact me
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineEmits(['showContactModal'])
</script>