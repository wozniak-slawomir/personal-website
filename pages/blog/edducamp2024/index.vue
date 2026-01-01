<template>
  <BlogPost
    :title="$t('blog.edducamp2024.title')"
    :dates="$t('blog.edducamp2024.dates')"
    :tags="tags"
  >
    <template #content>
      <p>{{ $t('blog.edducamp2024.intro1') }}</p>
      <p>{{ $t('blog.edducamp2024.intro2') }}</p>
      <h2 class="mt-5 text-xl font-bold text-left">
        {{ $t('blog.edducamp2024.location.titlePrefix') }}
        <a
          href="https://www.hilton.com/pl/hotels/wawcthx-hampton-warsaw-city-centre/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary transition-colors"
        >Hampton by Hilton Warsaw City Centre</a>.
      </h2>
      <NuxtPicture
        src="/blog/edducamp/hilton.jpg"
        :alt="$t('blog.edducamp2024.location.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
        width="320"
        height="426"
        preload
      />
      <p class="mt-5">
        {{ $t('blog.edducamp2024.location.description') }}
      </p>
      <p>
        {{ $t('blog.edducamp2024.location.negative') }}
      </p>
      <h2 class="mt-5 text-xl font-bold">
        {{ $t('blog.edducamp2024.content.title') }}
      </h2>
      <p class="mt-5">
        {{ $t('blog.edducamp2024.content.description1') }}
      </p>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.content.description2') }}
      </p>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.content.description3') }}
      </p>
      <NuxtPicture
        src="/blog/edducamp/negotiations.jpg"
        :alt="$t('blog.edducamp2024.negotiations.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
        width="320"
        height="426"
      />
      <p class="mt-2">
        {{ $t('blog.edducamp2024.content.negative') }}
      </p>
      <h2 class="mt-5 text-xl font-bold">
        {{ $t('blog.edducamp2024.social.title') }}
      </h2>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.social.description') }}
      </p>
      <h2 class="mt-5 text-xl font-bold">
        {{ $t('blog.edducamp2024.contest.title') }}
      </h2>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.contest.description') }}
      </p>
      <NuxtPicture
        src="/blog/edducamp/contest.jpg"
        :alt="$t('blog.edducamp2024.contest.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
        width="320"
        height="426"
      />
      <h2 class="mt-5 text-xl font-bold">
        {{ $t('blog.edducamp2024.interview.title') }}
      </h2>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.interview.description') }}
      </p>
      <NuxtPicture
        src="/blog/edducamp/interview.png"
        :alt="$t('blog.edducamp2024.interview.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
        width="320"
        height="426"
      />
      <h2 class="mt-5 text-xl font-bold">
        {{ $t('blog.edducamp2024.summary.title') }}
      </h2>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.summary.description1') }}
      </p>
      <p>
        {{ $t('blog.edducamp2024.summary.description2') }}
      </p>
      <NuxtPicture
        src="/blog/edducamp/finish.jpg"
        :alt="$t('blog.edducamp2024.summary.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
        width="320"
        height="426"
      />
      <p class="mt-10">
        {{ $t('blog.edducamp2024.closing') }}
      </p>
      <p class="font-bold mt-4">
        {{ $t('blog.edducamp2024.signature') }}
      </p>
      <p class="mt-6">
        {{ $t('blog.edducamp2024.eventLink') }}
        <a
          href="https://edducamp.pl/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary transition-colors"
        >edducamp.pl</a>
      </p>
    </template>
  </blogpost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.edducamp2024.tags').split(', ')]
  useHead({
    title: t('blog.edducamp2024.meta.title'),
    meta: [
      {
        name: 'description',
        content: t('blog.edducamp2024.meta.description'),
      },
      {
        name: 'keywords',
        content: t('blog.socialLearningTheory.tags'),
      },
      {
        property: 'og:title',
        content: t('blog.edducamp2024.meta.title'),
      },
      {
        property: 'og:description',
        content: t('blog.edducamp2024.meta.description'),
      },
    ],
  })
}, { immediate: true })
</script>