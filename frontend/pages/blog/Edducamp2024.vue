<template>
  <div class="max-w-2xl container mt-44 text-justify">
    <h1 class="text-4xl font-bold">
      {{ $t('blog.edducamp2024.title') }}
    </h1>
    <div>
      {{ $t('blog.edducamp2024.dates') }}
    </div>
    <div class="bg-[#393939] mt-16 py-4 rounded-xl px-8">
      <p>{{ $t('blog.edducamp2024.intro1') }}</p>
      <p>{{ $t('blog.edducamp2024.intro2') }}</p>
      <h2 class="mt-5 text-xl font-bold text-left">
        {{ $t('blog.edducamp2024.location.title') }}
      </h2>
      <img
        src="~assets/blog/edducamp/hilton.jpg"
        :alt="$t('blog.edducamp2024.location.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
      >
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
      <img
        src="~assets/blog/edducamp/negotiations.jpg"
        :alt="$t('blog.edducamp2024.negotiations.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
      >
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
      <img
        src="~assets/blog/edducamp/contest.jpg"
        :alt="$t('blog.edducamp2024.contest.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
      >
      <h2 class="mt-5 text-xl font-bold">
        {{ $t('blog.edducamp2024.interview.title') }}
      </h2>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.interview.description') }}
      </p>
      <img
        src="~assets/blog/edducamp/interview.png"
        :alt="$t('blog.edducamp2024.interview.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
      >
      <h2 class="mt-5 text-xl font-bold">
        {{ $t('blog.edducamp2024.summary.title') }}
      </h2>
      <p class="mt-2">
        {{ $t('blog.edducamp2024.summary.description1') }}
      </p>
      <p>
        {{ $t('blog.edducamp2024.summary.description2') }}
      </p>
      <img
        src="~assets/blog/edducamp/finish.jpg"
        :alt="$t('blog.edducamp2024.summary.alt')"
        class="mt-5 ml-auto mr-auto block w-80"
      >
      <p class="mt-10">
        {{ $t('blog.edducamp2024.closing') }}
      </p>
      <p class="font-bold mt-4">
        {{ $t('blog.edducamp2024.signature') }}
      </p>
    </div>
    <ContactMe />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

watch(locale, () => {
  useHead({
    title: t('blog.edducamp2024.meta.title'),
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: t('blog.edducamp2024.meta.description'),
      },
    ],
  })
}, { immediate: true })
</script>