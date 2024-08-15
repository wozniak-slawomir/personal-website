<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="flex justify-center items-center h-[60vh]">
        <div class="text-center">
          <h1 class="text-4xl font-bold">
            {{ error.statusCode }}
          </h1>
          <p class="text-lg">
            {{ errorMessage }}
          </p>
          <NuxtLink
            to="/"
            class="text-blue-500 hover:underline"
          >
            {{ $t('error.back') }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import '~/assets/index.css'
import { DEFAULT_LOCALE } from '~/const/defaultLocale'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale, setLocale } = useI18n()

const error = ref({
  statusCode: 404,
  message: t('error.not.found'),
})

const title = computed(() => `${error.value.statusCode} ${error.value.message}`)

useHead({
  title: title.value,
})

onBeforeMount(() => {
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

const errorMessage = computed(() => {
  if (error.value.statusCode === 404) {
    return t('error.not.found')
  } else if (error.value.statusCode === 500) {
    return t('error.internal.server')
  } else {
    return error.value.message
  }
})
</script>