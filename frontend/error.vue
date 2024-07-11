<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="flex justify-center items-center h-[60vh]">
        <div class="text-center">
          <h1 class="text-4xl font-bold">
            404
          </h1>
          <p class="text-lg">
            {{ $t('404.not.found') }}
          </p>
          <NuxtLink
            to="/"
            class="text-blue-500 hover:underline"
          >
            {{ $t('404.back') }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import '~/assets/index.css'
import { DEFAULT_LOCALE } from '~/const/defaultLocale'
import { onBeforeMount } from 'vue'
const { setLocale } = useI18n()

useHead({
title: '404 Page not found',
})

onBeforeMount(() =>{
  const languageStored = localStorage.getItem('language')
  if (languageStored) {
    setLocale(languageStored || DEFAULT_LOCALE)
  }
})
</script>