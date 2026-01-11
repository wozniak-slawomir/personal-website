<template>
  <div class="container my-32">
    <LazyCalculatorContainer />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('tools.calculator.title') + ' - Sławomir Woźniak',
  meta: [
    {
      name: 'description',
      content: t('tools.calculator.description')
    }
  ]
})
</script>
