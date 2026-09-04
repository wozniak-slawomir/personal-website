<template>
  <BlogPost
    :title="t('blog.pixelWithoutCapi.title')"
    :dates="t('blog.pixelWithoutCapi.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.whatIs') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.pixelWithoutCapi.purposeTitle') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.purpose') }}
      </p>

      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.intro1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.intro2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.intro3Prefix') }}
        <a
          href="https://www.facebook.com/business/help/204114281278521"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >{{ t('blog.pixelWithoutCapi.intro3Link') }}</a>{{ t('blog.pixelWithoutCapi.intro3Suffix') }}
      </p>

      <div class="mt-6 mb-6">
        <img
          src="/services/meta-capi.jpg"
          :alt="t('blog.pixelWithoutCapi.image1.alt')"
          class="w-full rounded-lg shadow-lg"
        >
        <p class="text-sm text-gray-400 mt-2 italic text-center">
          {{ t('blog.pixelWithoutCapi.image1.caption') }}
        </p>
      </div>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.pixelWithoutCapi.point1.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.point1.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.point1.content2') }}
      </p>
      <p class="mt-4 font-bold">
        {{ t('blog.pixelWithoutCapi.point1.question') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.pixelWithoutCapi.point2.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.point2.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.point2.content2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.pixelWithoutCapi.point3.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.point3.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.point3.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.point3.content3') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.pixelWithoutCapi.solution.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.solution.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.solution.content2') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.pixelWithoutCapi.solution.list1') }}</li>
        <li>{{ t('blog.pixelWithoutCapi.solution.list2') }}</li>
        <li>{{ t('blog.pixelWithoutCapi.solution.list3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.pixelWithoutCapi.control.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.control.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.pixelWithoutCapi.control.content2') }}
      </p>

      <p class="mt-8 mb-8 font-semibold">
        <NuxtLink
          :to="localePath('/oferta/meta-capi-pixel')"
          class="underline hover:text-primary-400 transition-colors"
        >
          {{ t('blog.pixelWithoutCapi.offerLink') }}
        </NuxtLink>
      </p>

      <p class="mt-8">
        {{ t('blog.pixelWithoutCapi.closing') }}<br>
        <strong>{{ t('blog.pixelWithoutCapi.signature') }}</strong>
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = t('blog.pixelWithoutCapi.tags').split(', ')
  useHead({
    title: t('blog.pixelWithoutCapi.meta.title'),
  })

  useSeoMeta({
    title: t('blog.pixelWithoutCapi.meta.title'),
    description: t('blog.pixelWithoutCapi.meta.description'),
    keywords: t('blog.pixelWithoutCapi.tags'),
    ogTitle: t('blog.pixelWithoutCapi.title'),
    ogDescription: t('blog.pixelWithoutCapi.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/pixel-bez-capi/og-image.jpg',
    ogUrl: `https://slawomir-wozniak.pl${localePath('/blog/pixel-bez-capi')}`,
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
