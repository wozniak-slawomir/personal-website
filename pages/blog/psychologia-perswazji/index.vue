<template>
  <BlogPost
    :title="t('blog.persuasionPsychology.title')"
    :dates="t('blog.persuasionPsychology.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.intro1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.intro2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.persuasionPsychology.howBetter.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.howBetter.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.howBetter.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.howBetter.content3') }}
      </p>

      <figure class="my-8">
        <img
          src="/blog/psychologia-perswazji/heatmap.png"
          :alt="t('blog.persuasionPsychology.heatmap.alt')"
          class="rounded-lg w-full"
        />
        <figcaption class="text-sm text-gray-400 mt-2 text-center">
          {{ t('blog.persuasionPsychology.heatmap.caption') }}
        </figcaption>
      </figure>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.persuasionPsychology.model.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.model.intro') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.persuasionPsychology.step1.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step1.content') }}
      </p>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step1.declarative') }}
      </p>
      <figure class="my-4">
        <img
          src="/blog/psychologia-perswazji/declarative-hero.png"
          :alt="t('blog.persuasionPsychology.step1.declarativeAlt')"
          class="rounded-lg w-full"
        />
      </figure>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step1.persuasive') }}
      </p>
      <figure class="my-4">
        <img
          src="/blog/psychologia-perswazji/persuasive-hero.png"
          :alt="t('blog.persuasionPsychology.step1.persuasiveAlt')"
          class="rounded-lg w-full"
        />
      </figure>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.persuasionPsychology.step2.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step2.content') }}
      </p>
      <figure class="my-4">
        <img
          src="/blog/psychologia-perswazji/social-proof.png"
          :alt="t('blog.persuasionPsychology.step2.alt')"
          class="rounded-lg w-full"
        />
      </figure>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.persuasionPsychology.step3.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step3.content') }}
      </p>
      <figure class="my-4">
        <img
          src="/blog/psychologia-perswazji/comparison.png"
          :alt="t('blog.persuasionPsychology.step3.alt')"
          class="rounded-lg w-full"
        />
      </figure>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.persuasionPsychology.step4.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step4.content') }}
      </p>
      <figure class="my-4">
        <img
          src="/blog/psychologia-perswazji/benefits.png"
          :alt="t('blog.persuasionPsychology.step4.alt')"
          class="rounded-lg w-full"
        />
      </figure>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.persuasionPsychology.step5.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step5.content') }}
      </p>
      <figure class="my-4">
        <img
          src="/blog/psychologia-perswazji/faq.png"
          :alt="t('blog.persuasionPsychology.step5.alt')"
          class="rounded-lg w-full"
        />
      </figure>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.persuasionPsychology.step6.title') }}
      </h3>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.step6.content') }}
      </p>
      <figure class="my-4">
        <img
          src="/blog/psychologia-perswazji/cta.png"
          :alt="t('blog.persuasionPsychology.step6.alt')"
          class="rounded-lg w-full"
        />
      </figure>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.persuasionPsychology.conclusion.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.conclusion.simple') }}
      </p>
      <p class="mt-4 font-semibold">
        {{ t('blog.persuasionPsychology.conclusion.tech') }}
      </p>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.conclusion.offer') }}
      </p>
      <p class="mt-4">
        {{ t('blog.persuasionPsychology.conclusion.meeting') }}
      </p>
      <p class="mt-8">
        {{ t('blog.persuasionPsychology.closing') }}
      </p>
      <p class="font-semibold">
        {{ t('blog.persuasionPsychology.signature') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.persuasionPsychology.tags').split(', ')]
  useHead({
    title: t('blog.persuasionPsychology.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.persuasionPsychology.meta.title'),
    description: t('blog.persuasionPsychology.meta.description'),
    keywords: t('blog.persuasionPsychology.tags'),
    ogTitle: t('blog.persuasionPsychology.title'),
    ogDescription: t('blog.persuasionPsychology.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/psychologia-perswazji/heatmap.png',
    ogUrl: 'https://slawomir-wozniak.pl/blog/psychologia-perswazji',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
