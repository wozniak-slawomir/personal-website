<template>
  <div class="container my-32">
    <LazyFeedbackContainer />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.feedback.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.feedback.description')
    }
  ]
})
</script>
