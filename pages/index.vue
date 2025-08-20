<template>
  <div>
    <Hero />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

watch(locale, () => {
  useSeoMeta({
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    ogTitle: t('seo.ogTitle'),
    ogDescription: t('seo.ogDescription'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: '/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
