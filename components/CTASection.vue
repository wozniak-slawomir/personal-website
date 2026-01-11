<template>
  <div class="container my-32">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          {{ $t('cta.title') }}
        </h2>
        <p class="text-xl text-gray-300">
          {{ $t('cta.subtitle') }}
        </p>
      </div>


      <div class="text-center">
        <NuxtLink
          :to="localePath('/contact')"
          class="px-8 py-5 rounded-full bg-[color:var(--secondary-color)] inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300 text-lg"
        >
          {{ $t('cta.button') }}
        </NuxtLink>
        <p class="text-sm text-gray-400 mt-4 h-5">
        </p>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
const localePath = useLocalePath()
</script>