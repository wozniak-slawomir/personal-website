<template>
  <div class="pt-[var(--navbar-height)] pb-20">
    <Bio />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

watch(locale, () => {
  useSeoMeta({
    title: t('seo.bio.title'),
    description: t('seo.bio.description'),
    keywords: t('seo.keywords'),
    ogTitle: t('seo.bio.title'),
    ogDescription: t('seo.bio.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: '/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/bio',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
