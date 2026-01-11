<template>
  <BlogPost
    :title="t('blog.googleSearchConsole.title')"
    :dates="t('blog.googleSearchConsole.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.intro1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.intro2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.intro3Prefix') }}
        <a
          href="https://search.google.com/search-console/about"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >{{ t('blog.googleSearchConsole.intro3Link') }}</a>{{ t('blog.googleSearchConsole.intro3Suffix') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.googleSearchConsole.point1.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.point1.content1') }}
        <a
          href="https://www.google.pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >{{ t('blog.googleSearchConsole.point1.googleLink') }}</a>{{ t('blog.googleSearchConsole.point1.content2') }}
      </p>
      <p class="mt-4 font-bold">
        {{ t('blog.googleSearchConsole.point1.question') }}
      </p>

      <div class="mt-6 mb-6">
        <NuxtPicture
          src="blog/google-search-console/performance.png"
          :alt="t('blog.googleSearchConsole.image1.alt')"
          class="w-full rounded-lg shadow-lg"
          :imgAttrs="{ class: 'w-full rounded-lg' }"
        />
        <p class="text-sm text-gray-400 mt-2 italic text-center">
          {{ t('blog.googleSearchConsole.image1.caption') }}
        </p>
      </div>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.googleSearchConsole.point2.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.point2.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.point2.content2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.googleSearchConsole.point3.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.point3.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.point3.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.point3.content3') }}
      </p>

      <div class="mt-6 mb-6">
        <NuxtPicture
          src="blog/google-search-console/complexity.png"
          :alt="t('blog.googleSearchConsole.image2.alt')"
          class="w-full rounded-lg shadow-lg"
          :imgAttrs="{ class: 'w-full rounded-lg' }"
        />
        <p class="text-sm text-gray-400 mt-2 italic text-center">
          {{ t('blog.googleSearchConsole.image2.caption') }}
        </p>
      </div>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.googleSearchConsole.solution.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.solution.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.solution.content2') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.googleSearchConsole.solution.list1') }}</li>
        <li>{{ t('blog.googleSearchConsole.solution.list2') }}</li>
        <li>{{ t('blog.googleSearchConsole.solution.list3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.googleSearchConsole.control.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.control.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.googleSearchConsole.control.content2') }}
      </p>

      <p class="mt-8 mb-8 font-semibold">
        <NuxtLink
          to="/contact"
          class="underline hover:text-primary-400 transition-colors"
        >
          {{ t('blog.googleSearchConsole.offerLink') }}
        </NuxtLink>
      </p>

      <p class="mt-8">
        {{ t('blog.googleSearchConsole.closing') }}<br>
        <strong>{{ t('blog.googleSearchConsole.signature') }}</strong>
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = t('blog.googleSearchConsole.tags').split(', ')
  useHead({
    title: t('blog.googleSearchConsole.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.googleSearchConsole.meta.title'),
    description: t('blog.googleSearchConsole.meta.description'),
    keywords: t('blog.googleSearchConsole.tags'),
    ogTitle: t('blog.googleSearchConsole.title'),
    ogDescription: t('blog.googleSearchConsole.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/google-search-console/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/google-search-console',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
