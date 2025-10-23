<template>
  <div>
    <Hero />
    <Bio mode="programming" />
    <RealizedProjects :tags="['code']" />
    <Testimonials />
    <Services />
    <ContactMe />
    <Footer />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

watch(locale, () => {
  useSeoMeta({
    title: t('seo.title'),
    description: t('seo.homepage.description'),
    keywords: t('seo.keywords'),
    ogTitle: t('seo.ogTitle'),
    ogDescription: t('seo.homepage.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: '/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
