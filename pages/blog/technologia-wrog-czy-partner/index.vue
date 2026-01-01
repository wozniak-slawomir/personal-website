<template>
  <BlogPost
    :title="t('blog.technologyPartner.title')"
    :dates="t('blog.technologyPartner.dates')"
    :tags="tags"
  >
    <template #content>
      <p>{{ t('blog.technologyPartner.intro') }}</p>
      
      <p class="mt-4">
        {{ t('blog.technologyPartner.content1') }}
      </p>

      <p class="mt-4">
        {{ t('blog.technologyPartner.content2Prefix') }}
        <a
          href="https://creators.facebook.com/tools/meta-business-suite/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >Meta Business Suite</a>{{ t('blog.technologyPartner.content2Suffix') }}
      </p>

      <figure>
        <NuxtPicture
          src="/blog/technologia-wrog-czy-partner/frustration.jpg"
          alt="Me frustrated with technology"
          class="mt-8 w-full m-auto block"
          width="800"
          height="600"
          preload
        />
        <figcaption class="text-center mt-2">
          {{ t('blog.technologyPartner.figure1.caption') }}
        </figcaption>
      </figure>

      <p class="mt-4">
        {{ t('blog.technologyPartner.content3') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.technologyPartner.deadEnd1.title') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.technologyPartner.deadEnd1.contentPrefix') }}
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >YouTube</a>{{ t('blog.technologyPartner.deadEnd1.contentSuffix') }}
      </p>

      <p class="mt-4">
        {{ t('blog.technologyPartner.deadEnd1.result') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.technologyPartner.deadEnd2.title') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.technologyPartner.deadEnd2.content') }}
      </p>

      <p class="mt-4">
        {{ t('blog.technologyPartner.deadEnd2.result') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.technologyPartner.alternative.title') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.technologyPartner.alternative.content') }}
      </p>

      <figure>
        <NuxtPicture
          src="/blog/technologia-wrog-czy-partner/partnership.png"
          alt="Me laughing with my friend"
          class="mt-8 w-full m-auto block"
          width="800"
          height="600"
          preload
        />
        <figcaption class="text-center mt-2">
          {{ t('blog.technologyPartner.figure2.caption') }}
        </figcaption>
      </figure>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.technologyPartner.caseStudy.title') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.technologyPartner.caseStudy.intro1') }}
        <a
          href="https://youtu.be/0jPsJDoR4SI"
          class="font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://youtu.be/0jPsJDoR4SI
        </a>
      </p>

      <p class="mt-4">
        {{ t('blog.technologyPartner.caseStudy.intro2') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.technologyPartner.caseStudy.step1.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.technologyPartner.caseStudy.step1.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.technologyPartner.caseStudy.step2.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.technologyPartner.caseStudy.step2.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.technologyPartner.caseStudy.step3.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.technologyPartner.caseStudy.step3.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.technologyPartner.caseStudy.step4.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.technologyPartner.caseStudy.step4.content') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.technologyPartner.whyHere.title') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.technologyPartner.whyHere.content') }}
      </p>

      <p class="mt-4">
        {{ t('blog.technologyPartner.closing') }}
        <a
          href="https://youtu.be/0jPsJDoR4SI"
          class="font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://youtu.be/0jPsJDoR4SI
        </a>
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.technologyPartner.tags').split(', ')]
  useHead({
    title: t('blog.technologyPartner.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.technologyPartner.meta.title'),
    description: t('blog.technologyPartner.meta.description'),
    keywords: t('blog.technologyPartner.tags'),
    ogTitle: t('blog.technologyPartner.title'),
    ogDescription: t('blog.technologyPartner.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/technologia-wrog-czy-partner/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/technologia-wrog-czy-partner',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
