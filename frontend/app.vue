<template>
  <div>
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import '~/assets/index.css'
import { DEFAULT_LOCALE } from '~/const/defaultLocale'
import { onBeforeMount } from 'vue'
const { setLocale } = useI18n()

useHead({
  title: 'Slawomir Wozniak - Software Engineering',
})

onBeforeMount(() =>{
  const languageStored = localStorage.getItem('language')
  if (languageStored) {
    setLocale(languageStored || DEFAULT_LOCALE)
  }
})

</script>