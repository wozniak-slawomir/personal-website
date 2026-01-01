<template>
  <BlogPost
    :title="t('blog.professionalWebsite.title')"
    :dates="t('blog.professionalWebsite.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.intro1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.intro2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.professionalWebsite.step1.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.step1.content1') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.professionalWebsite.step1.list1') }}</li>
        <li>
          {{ t('blog.professionalWebsite.step1.list2Prefix') }}
          <a
            href="https://pl.wikipedia.org/wiki/Handel_elektroniczny"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary-400 transition-colors"
          >E-commerce</a>{{ t('blog.professionalWebsite.step1.list2Suffix') }}
        </li>
        <li>{{ t('blog.professionalWebsite.step1.list3') }}</li>
      </ul>
      <p class="mt-4 font-semibold">
        {{ t('blog.professionalWebsite.step1.conclusion') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.professionalWebsite.step2.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.step2.intro') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.professionalWebsite.optionA.titlePrefix') }}
        <a
          href="https://pl.wix.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >Wix</a>, <a
          href="https://www.squarespace.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >Squarespace</a>{{ t('blog.professionalWebsite.optionA.titleSuffix') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.optionA.content') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.professionalWebsite.optionA.pro') }}</li>
        <li>{{ t('blog.professionalWebsite.optionA.con') }}</li>
      </ul>
      <p class="mt-4 font-semibold">
        {{ t('blog.professionalWebsite.optionA.verdict') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.professionalWebsite.optionB.titlePrefix') }}
        <a
          href="https://wordpress.com/pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >WordPress</a>{{ t('blog.professionalWebsite.optionB.titleSuffix') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.optionB.content') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.professionalWebsite.optionB.pro') }}</li>
        <li>{{ t('blog.professionalWebsite.optionB.con') }}</li>
      </ul>
      <p class="mt-4 font-semibold">
        {{ t('blog.professionalWebsite.optionB.verdict') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.professionalWebsite.optionC.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.optionC.content') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>
          {{ t('blog.professionalWebsite.optionC.proPrefix') }}
          <a
            href="https://pl.wikipedia.org/wiki/Core_Web_Vitals"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary-400 transition-colors"
          >Core Web Vitals</a>{{ t('blog.professionalWebsite.optionC.proSuffix') }}
        </li>
        <li>{{ t('blog.professionalWebsite.optionC.con') }}</li>
      </ul>
      <p class="mt-4 font-semibold">
        {{ t('blog.professionalWebsite.optionC.verdict') }}
      </p>



      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.professionalWebsite.step3.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.step3.content1') }}
      </p>
      <p class="mt-4 font-semibold">
        {{ t('blog.professionalWebsite.step3.advice') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.professionalWebsite.step4.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.step4.content1') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.professionalWebsite.step4.tip1') }}</li>
        <li>{{ t('blog.professionalWebsite.step4.tip2') }}</li>
        <li>{{ t('blog.professionalWebsite.step4.tip3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.professionalWebsite.summary.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.summary.diy') }}
      </p>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.summary.expertIntro') }}
      </p>
      <ol class="list-decimal list-inside mt-4 space-y-2">
        <li>{{ t('blog.professionalWebsite.summary.reason1') }}</li>
        <li>{{ t('blog.professionalWebsite.summary.reason2') }}</li>
        <li>{{ t('blog.professionalWebsite.summary.reason3') }}</li>
      </ol>
      <p class="mt-4">
        {{ t('blog.professionalWebsite.summary.dontRisk') }}
      </p>
      <p class="mt-4 font-semibold">
        {{ t('blog.professionalWebsite.summary.partner') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.professionalWebsite.tags').split(', ')]
  useHead({
    title: t('blog.professionalWebsite.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.professionalWebsite.meta.title'),
    description: t('blog.professionalWebsite.meta.description'),
    keywords: t('blog.professionalWebsite.tags'),
    ogTitle: t('blog.professionalWebsite.title'),
    ogDescription: t('blog.professionalWebsite.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/profesjonalna-strona-www/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/profesjonalna-strona-www',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
