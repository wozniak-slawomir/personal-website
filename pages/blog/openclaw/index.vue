<template>
  <BlogPost
    :title="t('blog.openclaw.title')"
    :dates="t('blog.openclaw.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.openclaw.intro') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.openclaw.whatIs.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.openclaw.whatIs.content') }}
      </p>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/openclaw/openclaw.png"
          alt="OpenClaw"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>

      <p class="mt-4">
        {{ t('blog.openclaw.excitement') }}
      </p>

      <p class="mt-4">
        {{ t('blog.openclaw.riskIntro') }}
      </p>

      <p class="mt-4">
        {{ t('blog.openclaw.shellAccess') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.openclaw.promptInjection.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.openclaw.promptInjection.content1') }}
      </p>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/openclaw/promptinjection.png"
          alt="Prompt Injection"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.openclaw.promptInjection.content2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.openclaw.sensitiveData.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.openclaw.sensitiveData.content') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.openclaw.vibecoding.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.openclaw.vibecoding.content1') }}
      </p>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/openclaw/vibecoding.jpeg"
          alt="Vibecoding"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.openclaw.vibecoding.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.openclaw.vibecoding.content3') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.openclaw.howToSafely.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.openclaw.howToSafely.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.openclaw.howToSafely.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.openclaw.howToSafely.content3') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.openclaw.tags').split(', ')]
  useHead({
    title: t('blog.openclaw.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.openclaw.meta.title'),
    description: t('blog.openclaw.meta.description'),
    keywords: t('blog.openclaw.tags'),
    ogTitle: t('blog.openclaw.title'),
    ogDescription: t('blog.openclaw.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/openclaw/openclaw.png',
    ogUrl: 'https://slawomir-wozniak.pl/blog/openclaw',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
