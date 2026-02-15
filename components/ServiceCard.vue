<template>
  <article class="h-full glassmorphism rounded-2xl overflow-hidden border border-gray-700/30 hover:border-[var(--primary-color)]/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col">
    <div class="aspect-video overflow-hidden bg-black/20">
      <img 
        :src="image" 
        :alt="imageAlt"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div class="p-5 flex flex-col gap-3 flex-grow">
      <h3 class="font-bold text-lg">
        {{ title }}
      </h3>
      <p class="text-sm text-[var(--secondary-text-color)] flex-grow">
        {{ description }}
      </p>
      <NuxtLink
        :to="link"
        class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[image:var(--primary-gradient)] text-black font-semibold hover:bg-[image:var(--secondary-gradient)] transition-all mt-auto"
      >
        {{ buttonText }}
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  image: string
  imageAlt: string
  title: string
  description: string
  link: string
  buttonText: string
}

defineProps<Props>()
</script>
