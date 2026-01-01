<template>
  <BlogPost
    :title="t('blog.gift.title')"
    :dates="t('blog.gift.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.gift.intro1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.gift.intro2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.gift.intro3') }}
      </p>
      <p class="mt-4">
        {{ t('blog.gift.intro4') }}
      </p>

    <div class="mt-6">
        <NuxtImg
          src="/blog/prezent-ktorego-nie-da-sie-kupic/plyta.png"
          alt="CD Cover"
          class="rounded-lg w-full md:w-1/2 mx-auto"
        />
      </div>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.gift.step1.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.gift.step1.contentPrefix') }}
        <a
          href="https://chatgpt.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >ChatGPT</a>{{ t('blog.gift.step1.contentSuffix') }}
      </p>
      <p class="mt-4 p-4 bg-gray-800 rounded-lg italic">
        {{ t('blog.gift.step1.example') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.gift.step2.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.gift.step2.content') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.gift.step2.list1') }}</li>
        <li>{{ t('blog.gift.step2.list2') }}</li>
        <li>{{ t('blog.gift.step2.list3') }}</li>
        <li>{{ t('blog.gift.step2.list4') }}</li>
        <li>{{ t('blog.gift.step2.list5') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.gift.step3.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.gift.step3.content') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.gift.step4.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.gift.step4.contentPrefix') }}
        <a
          href="https://www.musicful.ai/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >Musicful.ai</a>{{ t('blog.gift.step4.contentSuffix') }}
      </p>
      <div class="mt-6">
        <NuxtImg
          src="/blog/prezent-ktorego-nie-da-sie-kupic/music-studio.png"
          alt="Music Studio"
          class="rounded-lg w-full"
        />
      </div>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.gift.step5.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.gift.step5.content') }}
      </p>

      <p class="mt-8 font-semibold">
        {{ t('blog.gift.closing') }}
      </p>

      <h3 class="text-xl font-semibold mt-8">
        {{ t('blog.gift.reactions') }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <NuxtImg
          src="/blog/prezent-ktorego-nie-da-sie-kupic/reference1.png"
          alt="Reaction 1"
          class="rounded-lg w-full"
        />
        <NuxtImg
          src="/blog/prezent-ktorego-nie-da-sie-kupic/reference2.png"
          alt="Reaction 2"
          class="rounded-lg w-full"
        />
        <NuxtImg
          src="/blog/prezent-ktorego-nie-da-sie-kupic/reference3.png"
          alt="Reaction 3"
          class="rounded-lg w-full"
        />
      </div>

      <p class="mt-8 italic">
        {{ t('blog.gift.ps') }}
      </p>

      <p class="mt-8 font-bold">
        Sławomir Woźniak
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.gift.tags').split(', ')]
  useHead({
    title: t('blog.gift.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.gift.meta.title'),
    description: t('blog.gift.meta.description'),
    keywords: t('blog.gift.tags'),
    ogTitle: t('blog.gift.title'),
    ogDescription: t('blog.gift.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/prezent-ktorego-nie-da-sie-kupic/og-image.jpg',
    ogUrl: 'https://slawomir-wozniakofficial.pl/blog/prezent-ktorego-nie-da-sie-kupic',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
