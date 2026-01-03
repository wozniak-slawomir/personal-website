<template>
  <BlogPost
    :title="t('blog.needWebsite.title')"
    :dates="t('blog.needWebsite.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.needWebsite.intro') }}
      </p>
      <p class="mt-4">
        {{ t('blog.needWebsite.businessCard') }}
      </p>

      <figure class="mt-8">
        <NuxtImg
          src="blog/czy-potrzebujesz-strony/google-search.png"
          :alt="t('blog.needWebsite.figure1.alt')"
          class="rounded-lg shadow-lg w-full"
          loading="lazy"
        />
        <figcaption class="text-sm text-gray-500 mt-2 text-center">
          {{ t('blog.needWebsite.figure1.caption') }}
        </figcaption>
      </figure>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.needWebsite.reasons.title') }}
      </h2>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.needWebsite.zmot.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.needWebsite.zmot.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.needWebsite.ownership.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.needWebsite.ownership.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.needWebsite.halo.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.needWebsite.halo.content') }}
      </p>

      <figure class="mt-6">
        <NuxtImg
          src="blog/czy-potrzebujesz-strony/og-image.jpg"
          :alt="t('blog.needWebsite.figure2.alt')"
          class="rounded-lg shadow-lg w-full"
          loading="lazy"
        />
        <figcaption class="text-sm text-gray-500 mt-2 text-center">
          {{ t('blog.needWebsite.figure2.caption') }}
        </figcaption>
      </figure>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.needWebsite.conclusion.title') }}
      </h2>
      <p class="mt-4 font-semibold">
        {{ t('blog.needWebsite.conclusion.content') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.needWebsite.tags').split(', ')]
  useHead({
    title: t('blog.needWebsite.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.needWebsite.meta.title'),
    description: t('blog.needWebsite.meta.description'),
    keywords: t('blog.needWebsite.tags'),
    ogTitle: t('blog.needWebsite.title'),
    ogDescription: t('blog.needWebsite.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/czy-potrzebujesz-strony/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/czy-potrzebujesz-strony',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
