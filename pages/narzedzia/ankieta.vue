<template>
  <div class="container my-32">
    <LazySurveyContainer />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: 'Ankieta - Osobowość a zarobki programistów - Sławomir Woźniak',
  meta: [
    {
      name: 'description',
      content: 'Sprawdź jak Twoja osobowość wpływa na zarobki w IT. Wypełnij krótką ankietę i porównaj swoje wyniki z innymi programistami.'
    }
  ]
})
</script>
