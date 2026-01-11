<template>
  <div class="min-h-[50vh] flex flex-col">
    <div class="container my-32 flex-grow">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ $t('tools.title') }}
          </h1>
          <p class="text-xl text-gray-300">
            {{ $t('tools.subtitle') }}
          </p>
        </div>
        
        <div class="grid gap-6">
        <NuxtLink :to="localePath('/narzedzia/kalkulator')" 
          class="glassmorphism p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all duration-300 flex items-center justify-between group">
          <div>
            <h2 class="text-2xl font-bold mb-2 group-hover:text-[var(--primary-color)] transition-colors">
              {{ $t('tools.calculator.title') }}
            </h2>
            <p class="text-gray-400">
              {{ $t('tools.calculator.description') }}
            </p>
          </div>
          <div class="text-[var(--primary-color)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: t('tools.title') + ' - Sławomir Woźniak',
  meta: [
    {
      name: 'description',
      content: t('tools.description')
    }
  ]
})
</script>
