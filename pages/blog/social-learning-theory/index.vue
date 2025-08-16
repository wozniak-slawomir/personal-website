<template>
  <BlogPost
    :title="t('blog.socialLearningTheory.title')"
    :dates="t('blog.socialLearningTheory.dates')"
    :tags="tags"
  >
    <template #content>
      <h2 class="font-bold">
        {{ t('blog.socialLearningTheory.content1') }}
      </h2>

      <p class="mt-2">
        {{ t('blog.socialLearningTheory.content2') }}
      </p>

      <p class="mt-2">
        {{ t('blog.socialLearningTheory.bandura1') }} <a
          class="text-blue-400 underline"
          href="#reference[1]"
        >[1]</a>
        {{ t('blog.socialLearningTheory.bandura2') }}
      </p>

      <NuxtImg
        src="/blog/social-learning-theory/photo1.jpg"
        alt="People laughing"
        class="mt-4 mx-auto"
        width="550"
        height="367"
      />

      <div class="mt-4">
        {{ t('blog.socialLearningTheory.content3') }}
        <ul class="mt-4 list-disc list-inside">
          <li>{{ t('blog.socialLearningTheory.example1') }}</li>
          <li>{{ t('blog.socialLearningTheory.example2') }}</li>
          <li>{{ t('blog.socialLearningTheory.example3') }}</li>
        </ul>
      </div>

      <p class="mt-2">
        {{ t('blog.socialLearningTheory.content5') }}
      </p>

      <p class="mt-4">
        {{ t('blog.socialLearningTheory.content6') }}
      </p>

      <p class="mt-2">
        <a
          class="text-blue-400 underline"
          href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1008030"
        >
          {{ t('blog.socialLearningTheory.hotStudy') }}
        </a>
        {{ t('blog.socialLearningTheory.content7') }}
        <a
          class="text-blue-400 underline"
          href="#reference[2]"
        >
          {{ t('blog.socialLearningTheory.linkRef2') }}
        </a>
        {{ t('blog.socialLearningTheory.content14') }}
      </p>
      <div class="mt-2">
        {{ t('blog.socialLearningTheory.content8') }}
        <ul class="list-disc list-inside">
          <li>{{ t('blog.socialLearningTheory.stat1') }}</li>
          <li>{{ t('blog.socialLearningTheory.stat2') }}</li>
          <li>{{ t('blog.socialLearningTheory.stat3') }}</li>
        </ul>
      </div>
      <p class="mt-2">
        {{ t('blog.socialLearningTheory.content9') }}
      </p>
      <NuxtImg
        src="/blog/social-learning-theory/photo2.jpg"
        alt="Fast food"
        class="mt-4 mx-auto"
        width="550"
        height="367"
      />
      <p class="mt-2">
        {{ t('blog.socialLearningTheory.content10') }}
        <a
          class="text-blue-400 underline"
          href="#reference[3]"
        >
          {{ t('blog.socialLearningTheory.linkRef3') }}
        </a>.
        <a
          class="text-blue-400 underline"
          href="https://pubmed.ncbi.nlm.nih.gov/10028217/"
        >{{ t('blog.socialLearningTheory.study1999') }}</a>
      </p>
      <p class="mt-2">
        {{ t('blog.socialLearningTheory.content11') }}
      </p>
      <NuxtImg
        src="/blog/social-learning-theory/clusters.png"
        alt="Social network"
        class="mt-4 mx-auto"
        height="568"
        width="568"
      />
      <p class="mt-2">
        {{ t('blog.socialLearningTheory.content12') }}
      </p>

      <div class="mt-4">
        {{ t('blog.socialLearningTheory.content13') }}
        <ul class="list-disc list-inside">
          <li>{{ t('blog.socialLearningTheory.summary1') }}</li>
          <li>{{ t('blog.socialLearningTheory.summary2') }}</li>
          <li>{{ t('blog.socialLearningTheory.summary3') }}</li>
          <li>{{ t('blog.socialLearningTheory.summary4') }}</li>
        </ul>
      </div>

      <p class="mt-6">
        {{ t('blog.socialLearningTheory.closing') }}
      </p>

      <h2 class="mt-6 font-bold">
        {{ t('blog.socialLearningTheory.bibliography') }}
      </h2>
      <p
        id="reference[1]"
        class="mt-2"
      > 
        {{ t('blog.socialLearningTheory.reference1') }}
      </p>
      <p
        id="reference[2]"
      > 
        {{ t('blog.socialLearningTheory.reference2') }}
      </p>
      <p
        id="reference[3]"
      > 
        {{ t('blog.socialLearningTheory.reference3') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">

const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.socialLearningTheory.tags').split(', ')]
  useHead({
    title: t('blog.socialLearningTheory.title'),
    meta: [
      {
        name: 'description',
        content: t('blog.socialLearningTheory.meta.description'),
      },
      {
        name: 'keywords',
        content: t('blog.socialLearningTheory.tags'),
      },
      {
        property: 'og:title',
        content: t('blog.socialLearningTheory.title'),
      },
      {
        property: 'og:description',
        content: t('blog.socialLearningTheory.meta.description'),
      },
    ],
  })
}, { immediate: true })
</script>