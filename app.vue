<template>
  <div class="dark">
    <AuroraBackground />
    <div class="z-1 relative">
      <Navbar />
      <NuxtPage />
      <ContactModal />
    </div>
  </div>
</template>

<script setup lang="ts">
import '~/assets/index.css'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { DEFAULT_LOCALE } from '~/const/defaultLocale'
import { computed, onBeforeMount } from 'vue'

const { t, locale, setLocale } = useI18n()

const title = computed(() => `Sławomir Woźniak - ${t('hero.software.engineering')}`)

useHead({
  title: title.value,
})

onBeforeMount(() =>{
  const languageStored = localStorage.getItem('language') as typeof locale.value
  if (languageStored) {
    setLocale(languageStored || DEFAULT_LOCALE)
  }
})

watch(locale, () => {
  useHead({
    title: title.value,
    htmlAttrs: {
      lang: locale.value,
    },
  })
  useSeoMeta({
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    ogTitle: t('seo.ogTitle'),
    ogDescription: t('seo.ogDescription'),
    ogSiteName: t('seo.ogSiteName'),
  })
}, { immediate: true })

</script>
