<template>
  <div>
    <RealizedProjects />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

watch(locale, () => {
  useSeoMeta({
    title: t('seo.portfolio.title'),
    description: t('seo.portfolio.description'),
    keywords: t('seo.keywords'),
    ogTitle: t('seo.portfolio.title'),
    ogDescription: t('seo.portfolio.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: '/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/portfolio',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
