<template>
  <BlogPost
    :title="t('blog.aiStrateg.title')"
    :dates="t('blog.aiStrateg.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.aiStrateg.intro') }}
      </p>
      <p class="mt-4">
        {{ t('blog.aiStrateg.solution') }}
      </p>
      <p class="mt-4">
        {{ t('blog.aiStrateg.checkModel') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.aiStrateg.step1.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.aiStrateg.step1.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.aiStrateg.step1.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.aiStrateg.step1.content3') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.aiStrateg.step2.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.aiStrateg.step2.intro') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.aiStrateg.role.title') }}
      </h3>
      <p class="mt-4 p-4 bg-gray-800 rounded-lg italic">
        {{ t('blog.aiStrateg.role.example') }}
      </p>
      <p class="mt-4">
        {{ t('blog.aiStrateg.role.explanation') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.aiStrateg.role.point1') }}</li>
        <li>{{ t('blog.aiStrateg.role.point2') }}</li>
        <li>{{ t('blog.aiStrateg.role.point3') }}</li>
        <li>{{ t('blog.aiStrateg.role.point4') }}</li>
        <li>{{ t('blog.aiStrateg.role.point5') }}</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.aiStrateg.context.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.aiStrateg.context.intro') }}
      </p>
      <div class="mt-4 p-4 bg-gray-800 rounded-lg">
        <p class="font-semibold">{{ t('blog.aiStrateg.context.docExample.motto') }}</p>
        <p class="mt-2">{{ t('blog.aiStrateg.context.docExample.mottoContent') }}</p>
        <p class="font-semibold mt-4">{{ t('blog.aiStrateg.context.docExample.bio') }}</p>
        <p class="mt-2">{{ t('blog.aiStrateg.context.docExample.bioContent') }}</p>
        <p class="font-semibold mt-4">{{ t('blog.aiStrateg.context.docExample.shortDesc') }}</p>
        <p class="mt-2">{{ t('blog.aiStrateg.context.docExample.shortDescContent') }}</p>
      </div>
      <p class="mt-4">
        {{ t('blog.aiStrateg.context.cta') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.aiStrateg.task.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.aiStrateg.task.intro') }}
      </p>
      <p class="mt-4 p-4 bg-gray-800 rounded-lg italic">
        {{ t('blog.aiStrateg.task.example') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.aiStrateg.format.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.aiStrateg.format.intro') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.aiStrateg.format.point1') }}</li>
        <li>{{ t('blog.aiStrateg.format.point2') }}</li>
        <li>{{ t('blog.aiStrateg.format.point3') }}</li>
      </ul>
      <p class="mt-4">
        {{ t('blog.aiStrateg.format.outro') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.aiStrateg.finalPrompt.title') }}
      </h3>
      <div class="mt-4 p-4 bg-gray-800 rounded-lg italic">
        <p>{{ t('blog.aiStrateg.finalPrompt.content') }}</p>
      </div>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.aiStrateg.step3.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.aiStrateg.step3.content1') }}
      </p>
      <p class="mt-4 p-4 bg-gray-800 rounded-lg italic">
        {{ t('blog.aiStrateg.step3.examplePrompt') }}
      </p>
      <p class="mt-4">
        {{ t('blog.aiStrateg.step3.content2') }}
      </p>
      <p class="mt-4 font-semibold">
        {{ t('blog.aiStrateg.step3.closing') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.aiStrateg.bonus.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.aiStrateg.bonus.content') }}
      </p>

      <p class="mt-8 font-semibold">
        {{ t('blog.aiStrateg.closing') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.aiStrateg.tags').split(', ')]
  useHead({
    title: t('blog.aiStrateg.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.aiStrateg.meta.title'),
    description: t('blog.aiStrateg.meta.description'),
    keywords: t('blog.aiStrateg.tags'),
    ogTitle: t('blog.aiStrateg.title'),
    ogDescription: t('blog.aiStrateg.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/ai-strateg/chess.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/ai-strateg',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
