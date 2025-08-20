<template>
  <div>
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

const title = computed(() => `${t('hero.software.engineering')} - ${t('seo.ogSiteName')}`)

watch(locale, () => {
  useSeoMeta({
    title: title.value,
    description: t('seo.description'),
    keywords: 'software engineering, web development, programming, coding, full-stack development',
    ogTitle: title.value,
    ogDescription: t('seo.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: '/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/code',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
