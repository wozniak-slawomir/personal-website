<template>
  <div class="container my-32">
    <LazySurveyContainer />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('survey.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('survey.meta.description')
    }
  ]
})
</script>
