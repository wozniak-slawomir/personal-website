<template>
  <div class="container text-center my-32">
    <h1 class="text-4xl mb-6">
      {{ $t('services.interested') }}
    </h1>
    <button
      class="px-8 py-5 rounded-full bg-[color:var(--secondary-color)] md:inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300"
      @click="onContactClick"
    >
      {{ $t('common.contact') }}
    </button>
  </div>
</template>
  
  <script setup lang="ts">
  const { $event } = useNuxtApp()
  
  const onContactClick = () => {
    $event('ContactModal:Open')
  }
  
  </script>