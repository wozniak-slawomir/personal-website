<template>
  <div>
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import '~/assets/index.css'
import { DEFAULT_LOCALE } from '~/const/defaultLocale'
import { computed, onBeforeMount } from 'vue'

const { t, locale, setLocale } = useI18n()

const title = computed(() => `Sławomir Woźniak - ${t('hero.software.engineering')}`)

useHead({
  title: title.value,
})

onBeforeMount(() =>{
  const languageStored = localStorage.getItem('language')
  if (languageStored) {
    setLocale(languageStored || DEFAULT_LOCALE)
  }
})

watch(locale, () => {
    useHead({
  title: title.value,
  })
})
</script>