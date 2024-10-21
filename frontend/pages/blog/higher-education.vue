<template>
  <BlogPost
    title="Dlaczego zacząłem edukację wyższą i dlaczego warto?"
    dates="2024-10-21"
  >
    <template #content />
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

watch(locale, () => {
    useHead({
        title: t('blog.higherEducation.meta.title'),
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: t('blog.higherEducation.meta.description'),
            },
        ],
    })
}, { immediate: true })
</script>