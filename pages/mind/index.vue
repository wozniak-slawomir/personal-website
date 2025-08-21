<template>
  <div>
    <div class="container mt-32 text-3xl lg:text-5xl text-gray-900 uppercase">
      <LetterPullup 
        :words="t('hero.business.psychology')" 
        :delay="0.08"
      />
    </div>
    <Bio mode="psychology" />
    <RealizedProjects :tags="['mind']" />
    <ContactMe />
    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import LetterPullup from '@/components/ui/letter-pullup/LetterPullup.vue'
const { t, locale } = useI18n()

const title = computed(() => `${t('hero.business.psychology')} - ${t('seo.ogSiteName')}`)

watch(locale, () => {
  useSeoMeta({
    title: title.value,
    description: t('seo.mind.description'),
    keywords: 'business psychology, psychology, mental wellbeing, coaching, stress management',
    ogTitle: title.value,
    ogDescription: t('seo.mind.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: '/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/mind',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
