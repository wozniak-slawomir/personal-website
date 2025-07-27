<template>
  <BlogPost
    :title="t('blog.value.title')"
    :dates="t('blog.value.dates')"
    :tags="tags"
  >
    <template #content>
      <p>{{ t('blog.value.content1') }}</p>
      <p class="mt-4">
        {{ t('blog.value.content2a') }}
        <a
          href="https://80000hours.org"
          class="font-semibold underline"
        >
          80,000 Hours
        </a>.
        {{ t('blog.value.content2b') }}
      </p>
      <p class="mt-4">
        {{ t('blog.value.content3') }}
      </p>
      <figure>
        <NuxtImg
          src="/blog/value/80000hours.webp"
          alt="80k hours book"
          class="mt-8 w-64 m-auto"
          width="320"
          height="426"
        />
        <figcaption class="text-center mt-2">
          {{ t('blog.value.figure1.caption') }}
        </figcaption>
      </figure>
      <p class="mt-4">
        {{ t('blog.value.content4') }}
      </p>
      <ul class="list-disc pl-6 mt-4">
        <li>{{ t('blog.value.list1a') }}<strong>{{ t('blog.value.notValue') }}</strong>{{ t('blog.value.list1b') }}</li>
        <li>{{ t('blog.value.list2a') }}<strong>{{ t('blog.value.notValue') }}</strong>{{ t('blog.value.list2b') }}</li>
        <li>{{ t('blog.value.list3a') }}<strong>{{ t('blog.value.notValue') }}</strong>{{ t('blog.value.list3b') }}</li>
        <li>{{ t('blog.value.list4a') }}<strong>{{ t('blog.value.isValue') }}</strong>{{ t('blog.value.list4b') }}</li>
        <li>{{ t('blog.value.list5a') }}<strong>{{ t('blog.value.isValue') }}</strong>{{ t('blog.value.list5b') }}</li>
        <li>{{ t('blog.value.list6a') }}<strong>{{ t('blog.value.isValue') }}</strong>{{ t('blog.value.list6b') }}</li>
      </ul>
      <p class="mt-4">
        {{ t('blog.value.content5') }}
      </p>
      <p class="mt-4">
        {{ t('blog.value.content6a') }}
        <a 
          href="https://github.com/wozniak-slawomir/insta-coffee"
          class="font-semibold underline"
        >
          Insta Coffee
        </a>.
        {{ t('blog.value.content6b') }}
      </p>
      <NuxtImg
        src="/blog/value/insta-coffee-logo.png"
        alt="Insta Coffee logo"
        class="mt-8 w-full m-auto"
        width="560"
        height="125"
      />
      <p class="mt-4">
        {{ t('blog.value.content7a') }}<strong>{{ t('blog.value.notValuePast') }}</strong>{{ t('blog.value.content7b') }}
      </p>
      <p class="mt-4">
        {{ t('blog.value.content8a') }}
        <a
          href="https://eccdna.pl"
          class="font-semibold underline"
        >eccDNA</a>.
        {{ t('blog.value.content8b') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.value.tags').split(', ')]
  useHead({
    title: t('blog.value.meta.title'),
    meta: [
      {
        name: 'description',
        content: t('blog.value.meta.description'),
      },
      {
        name: 'keywords',
        content: tags,
      },
      {
        property: 'og:title',
        content: t('blog.value.title'),
      },
      {
        property: 'og:description',
        content: t('blog.value.meta.description'),
      },
      {
        property: 'og:image',
        content: 'projects/blog/value.jpg',
      },
      {
        property: 'og:url',
        content: 'https://slawomir-wozniak.pl/blog/value',
      },
    ],
  })
}, { immediate: true })
</script>