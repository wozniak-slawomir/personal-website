<template>
  <BlogPost
    :title="t('blog.uncensoredLlmIde.title')"
    :dates="t('blog.uncensoredLlmIde.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.intro') }}
      </p>

      <div class="mt-6 mb-6">
        <NuxtImg
          src="/blog/niecenzurowany-model-w-edytorze/og-image.jpg"
          :alt="t('blog.uncensoredLlmIde.heroImage.alt')"
          class="w-full rounded-lg shadow-lg"
          width="1600"
          height="1067"
        />
        <p class="text-sm text-[var(--secondary-text-color)] mt-2 italic text-center">
          {{ t('blog.uncensoredLlmIde.heroImage.caption') }}
        </p>
      </div>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.overRefusal.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.overRefusal.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.overRefusal.content2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.abliteration.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.abliteration.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.abliteration.content2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.venice.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.venice.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.venice.content2') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.uncensoredLlmIde.venice.list1') }}</li>
        <li>{{ t('blog.uncensoredLlmIde.venice.list2') }}</li>
        <li>{{ t('blog.uncensoredLlmIde.venice.list3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.ollama.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.ollama.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.ollama.content2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.ide.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.ide.intro') }}
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        {{ t('blog.uncensoredLlmIde.ide.cursor.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.ide.cursor.content') }}
      </p>
      <p class="mt-4">
        <a
          href="https://docs.venice.ai/guides/integrations/cursor"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >{{ t('blog.uncensoredLlmIde.ide.cursor.linkLabel') }}</a>
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        {{ t('blog.uncensoredLlmIde.ide.copilot.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.ide.copilot.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.ide.copilot.content2') }}
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        {{ t('blog.uncensoredLlmIde.ide.opencode.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.ide.opencode.content') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.performance.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.performance.content') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.security.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.security.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.security.content2') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.uncensoredLlmIde.security.list1') }}</li>
        <li>{{ t('blog.uncensoredLlmIde.security.list2') }}</li>
        <li>{{ t('blog.uncensoredLlmIde.security.list3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.uncensoredLlmIde.summary.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.uncensoredLlmIde.summary.content') }}
      </p>

      <p class="mt-8">
        {{ t('blog.uncensoredLlmIde.closing') }}<br>
        <strong>{{ t('blog.uncensoredLlmIde.signature') }}</strong>
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.uncensoredLlmIde.tags').split(', ')]
  useHead({
    title: t('blog.uncensoredLlmIde.meta.title'),
  })

  useSeoMeta({
    title: t('blog.uncensoredLlmIde.meta.title'),
    description: t('blog.uncensoredLlmIde.meta.description'),
    keywords: t('blog.uncensoredLlmIde.tags'),
    ogTitle: t('blog.uncensoredLlmIde.title'),
    ogDescription: t('blog.uncensoredLlmIde.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/niecenzurowany-model-w-edytorze/og-image.jpg',
    ogUrl: `https://slawomir-wozniak.pl${localePath('/blog/niecenzurowany-model-w-edytorze')}`,
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
