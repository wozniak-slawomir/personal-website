<template>
  <BlogPost
    :title="t('blog.changesOnProfile.title')"
    :dates="t('blog.changesOnProfile.dates')"
    :tags="tags"
  >
    <template #content>
      <p>{{ t('blog.changesOnProfile.intro') }}</p>
      <NuxtImg
        src="/blog/zmiany-na-profilu/see-you-later.png"
        alt="See you later"
        class="my-5"
      />
      
      <h2 class="mt-5 text-xl font-bold text-left">
        {{ t('blog.changesOnProfile.howItLooked.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.howItLooked.content1') }}
      </p>
      <ul class="list-disc pl-6 mt-4">
        <li>{{ t('blog.changesOnProfile.howItLooked.list1') }}</li>
        <li>{{ t('blog.changesOnProfile.howItLooked.list2') }}</li>
        <li>{{ t('blog.changesOnProfile.howItLooked.list3') }}</li>
        <li>{{ t('blog.changesOnProfile.howItLooked.list4') }}</li>
        <li>{{ t('blog.changesOnProfile.howItLooked.list5') }}</li>
      </ul>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.howItLooked.content2') }}
      </p>

      <h2 class="mt-5 text-xl font-bold text-left">
        {{ t('blog.changesOnProfile.nextStage.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.nextStage.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.nextStage.content2') }}
      </p>

      <h2 class="mt-5 text-xl font-bold text-left">
        {{ t('blog.changesOnProfile.whatWillChange.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.whatWillChange.content1') }}
      </p>
      <ul class="list-disc pl-6 mt-4">
        <li>{{ t('blog.changesOnProfile.whatWillChange.example1') }}</li>
        <li>{{ t('blog.changesOnProfile.whatWillChange.example2') }}</li>
      </ul>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.whatWillChange.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.whatWillChange.weekly') }}
      </p>
      <ul class="list-disc pl-6 mt-4">
        <li>
          {{ t('blog.changesOnProfile.whatWillChange.weeklyPost') }}
        </li>
        <li>
          {{ t('blog.changesOnProfile.whatWillChange.weeklyVideo1') }}
          <a
            href="https://www.youtube.com/@SlawomirWozniakOfficial"
            class="font-semibold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ t('blog.changesOnProfile.whatWillChange.weeklyVideo2') }}
          </a>
          {{ t('blog.changesOnProfile.whatWillChange.weeklyVideo3') }}
        </li>
      </ul>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.whatWillChange.newsletter1') }}
        <a
          href="/newsletter"
          class="font-semibold underline"
        >
          {{ t('blog.changesOnProfile.whatWillChange.newsletter2') }}
        </a>
      </p>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.whatWillChange.content3') }}
      </p>

      <h2 class="mt-5 text-xl font-bold text-left">
        {{ t('blog.changesOnProfile.nextStep.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.nextStep.content1') }}
        <a
          href="https://slawomir-wozniak.pl/newsletter"
          class="font-semibold underline"
        >
          tutaj
        </a>
        {{ t('blog.changesOnProfile.nextStep.content2') }}
      </p>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.nextStep.content3') }}
        <a
          href="https://www.youtube.com/@SlawomirWozniakOfficial"
          class="font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          tutaj
        </a>
      </p>

      <h2 class="mt-5 text-xl font-bold text-left">
        {{ t('blog.changesOnProfile.closing.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.closing.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.changesOnProfile.closing.content2') }}
        <a
          href="https://www.youtube.com/@SlawomirWozniakOfficial"
          class="font-semibold underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.youtube.com/@SlawomirWozniakOfficial
        </a>
      </p>
      <NuxtImg
        src="/blog/zmiany-na-profilu/bye.png"
        alt="Bye"
        class="my-5"
      />
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.changesOnProfile.tags').split(', ')]
  useHead({
    title: t('blog.changesOnProfile.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.changesOnProfile.meta.title'),
    description: t('blog.changesOnProfile.meta.description'),
    keywords: t('blog.changesOnProfile.tags'),
    ogTitle: t('blog.changesOnProfile.title'),
    ogDescription: t('blog.changesOnProfile.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/zmiany-na-profilu/og-image.png',
    ogUrl: 'https://slawomir-wozniak.pl/blog/zmiany-na-profilu',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
