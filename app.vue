<template>
  <div class="dark">
    <div class="z-1 relative">
      <Navbar />
      <NuxtPage />

    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/index.css'
import { DEFAULT_LOCALE } from '~/const/defaultLocale'
import { onBeforeMount } from 'vue'

const { locale, setLocale } = useI18n()

onBeforeMount(() => {
  const languageStored = localStorage.getItem('language') as typeof locale.value
  if (languageStored) {
    setLocale(languageStored || DEFAULT_LOCALE)
  }
})

watch(locale, () => {
  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
  })
}, { immediate: true })

</script>
