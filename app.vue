<template>
  <div class="dark">
      <div class="z-1 relative">
        <Navbar />
        <NuxtPage />
        <Footer />
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

// Generate hreflang tags for SEO (including x-default)
const i18nHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
}))
</script>
