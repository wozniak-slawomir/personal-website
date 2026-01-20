<template>
  <BlogPost
    :title="t('blog.unstableUSA.title')"
    :dates="t('blog.unstableUSA.dates')"
    :tags="tags"
  >
    <template #content>
      <p class="mt-4">
        {{ t('blog.unstableUSA.intro1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.unstableUSA.intro2') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.unstableUSA.socialMedia.title') }}
      </h2>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>Facebook?</li>
        <li>Twitter?</li>
        <li>Instagram?</li>
        <li>Tik Tok?</li>
        <li>Youtube?</li>
      </ul>
      <p class="mt-4">
        {{ t('blog.unstableUSA.socialMedia.conclusion') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.unstableUSA.cloudStorage.title') }}
      </h2>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>Google Drive?</li>
        <li>Apple iCloud?</li>
        <li>Microsoft OneDrive?</li>
      </ul>
      <p class="mt-4">
        {{ t('blog.unstableUSA.cloudStorage.conclusion') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.unstableUSA.documents.title') }}
      </h2>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>Microsoft Word?</li>
        <li>Google Docs?</li>
        <li>LibreOffice?</li>
      </ul>
      <p class="mt-4">
        {{ t('blog.unstableUSA.documents.conclusion') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.unstableUSA.threat.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.unstableUSA.threat.content') }}
      </p>

      <h2 class="text-2xl font-bold mt-8 text-left">
        {{ t('blog.unstableUSA.alternatives.title') }}
      </h2>

      <h3 class="text-xl font-semibold mt-6 text-left">
        <a
          href="https://www.libreoffice.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary-400 transition-colors"
        >{{ t('blog.unstableUSA.alternatives.libreOffice.title') }}</a>
      </h3>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/niestabilne-usa-niestabilna-technologia/libre_office.png"
          alt="LibreOffice"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.unstableUSA.alternatives.libreOffice.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        <a
          href="https://proton.me/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary-400 transition-colors"
        >{{ t('blog.unstableUSA.alternatives.proton.title') }}</a>
      </h3>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/niestabilne-usa-niestabilna-technologia/proton.webp"
          alt="Proton"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.unstableUSA.alternatives.proton.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        <a
          href="https://matomo.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary-400 transition-colors"
        >{{ t('blog.unstableUSA.alternatives.matomo.title') }}</a>
      </h3>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/niestabilne-usa-niestabilna-technologia/matomo.png"
          alt="Matomo"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.unstableUSA.alternatives.matomo.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        <a
          href="https://www.limesurvey.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary-400 transition-colors"
        >{{ t('blog.unstableUSA.alternatives.limeSurvey.title') }}</a>
      </h3>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/niestabilne-usa-niestabilna-technologia/lime_survey.png"
          alt="LimeSurvey"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.unstableUSA.alternatives.limeSurvey.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        <a
          href="https://mistral.ai/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary-400 transition-colors"
        >{{ t('blog.unstableUSA.alternatives.mistral.title') }}</a>
      </h3>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/niestabilne-usa-niestabilna-technologia/mistral_ai.avif"
          alt="Mistral AI"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.unstableUSA.alternatives.mistral.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6 text-left">
        <a
          href="https://nextcloud.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary-400 transition-colors"
        >{{ t('blog.unstableUSA.alternatives.nextcloud.title') }}</a>
      </h3>
      <div class="flex justify-center my-4">
        <NuxtImg
          src="/blog/niestabilne-usa-niestabilna-technologia/nextcloud.png"
          alt="Nextcloud"
          class="rounded-lg max-w-full md:max-w-md"
        />
      </div>
      <p class="mt-4">
        {{ t('blog.unstableUSA.alternatives.nextcloud.content') }}
      </p>

      <p class="mt-8">
        {{ t('blog.unstableUSA.moreAlternatives.prefix') }}
        <a
          href="https://european-alternatives.eu/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >https://european-alternatives.eu/</a>{{ t('blog.unstableUSA.moreAlternatives.suffix') }}
      </p>

      <p class="mt-4">
        {{ t('blog.unstableUSA.myHelp') }}
      </p>

      <p class="mt-4">
        {{ t('blog.unstableUSA.myExperience') }}
      </p>

      <p class="mt-8 font-semibold">
        {{ t('blog.unstableUSA.closing') }}
      </p>
      <p class="mt-2">
        {{ t('blog.unstableUSA.signature') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.unstableUSA.tags').split(', ')]
  useHead({
    title: t('blog.unstableUSA.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.unstableUSA.meta.title'),
    description: t('blog.unstableUSA.meta.description'),
    keywords: t('blog.unstableUSA.tags'),
    ogTitle: t('blog.unstableUSA.title'),
    ogDescription: t('blog.unstableUSA.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/niestabilne-usa-niestabilna-technologia/libre_office.png',
    ogUrl: 'https://slawomir-wozniak.pl/blog/niestabilne-usa-niestabilna-technologia',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
