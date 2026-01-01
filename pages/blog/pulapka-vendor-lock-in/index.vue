<template>
  <BlogPost
    :title="t('blog.vendorLockIn.title')"
    :dates="t('blog.vendorLockIn.dates')"
    :tags="tags"
  >
    <template #content>
      <p>{{ t('blog.vendorLockIn.intro') }}</p>
      
      <p class="mt-4">
        {{ t('blog.vendorLockIn.absurd') }}
      </p>

      <p class="mt-4 font-semibold">
        {{ t('blog.vendorLockIn.question') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.vendorLockIn.whatIs.titlePrefix') }}
        <a
          href="https://pl.wikipedia.org/wiki/Uzale%C5%BCnienie_od_dostawcy"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >Vendor Lock-in</a>{{ t('blog.vendorLockIn.whatIs.titleSuffix') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.whatIs.definition') }}
      </p>

      <p class="mt-4 font-semibold">
        {{ t('blog.vendorLockIn.whatIs.lostFreedom') }}
      </p>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.whatIs.trapIntro') }}
      </p>

      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>
          {{ t('blog.vendorLockIn.whatIs.trap1Prefix') }}
          <a
            href="https://aws.amazon.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary-400 transition-colors"
          >AWS</a> {{ t('blog.vendorLockIn.whatIs.trap1Middle') }} <a
            href="https://azure.microsoft.com/pl-pl"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary-400 transition-colors"
          >Azure</a>{{ t('blog.vendorLockIn.whatIs.trap1Suffix') }}
        </li>
        <li>{{ t('blog.vendorLockIn.whatIs.trap2') }}</li>
        <li>{{ t('blog.vendorLockIn.whatIs.trap3') }}</li>
      </ul>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.whatIs.effect') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.vendorLockIn.cost.title') }}
      </h2>

      <p class="mt-4 italic">
        {{ t('blog.vendorLockIn.cost.bait') }}
      </p>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.cost.baitExplanation') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.vendorLockIn.cost.risksTitle') }}
      </h3>

      <ul class="list-disc list-inside mt-4 space-y-2">
        <li><strong>{{ t('blog.vendorLockIn.cost.risk1Title') }}</strong> {{ t('blog.vendorLockIn.cost.risk1') }}</li>
        <li><strong>{{ t('blog.vendorLockIn.cost.risk2Title') }}</strong> {{ t('blog.vendorLockIn.cost.risk2') }}</li>
        <li>
          <strong>{{ t('blog.vendorLockIn.cost.risk3Title') }}</strong>
          {{ t('blog.vendorLockIn.cost.risk3Prefix') }}
          <a
            href="https://pl.wikipedia.org/wiki/Oprogramowanie_jako_us%C5%82uga"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary-400 transition-colors"
          >SaaS</a>{{ t('blog.vendorLockIn.cost.risk3Suffix') }}
        </li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.vendorLockIn.sovereignty.title') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.sovereignty.intro') }}
      </p>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.sovereignty.demand') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.vendorLockIn.sovereignty.rule1.titlePrefix') }}
        <a
          href="https://pl.wikipedia.org/wiki/Otwarte_oprogramowanie"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-primary-400 transition-colors"
        >Open Source</a>
      </h3>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.sovereignty.rule1.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.vendorLockIn.sovereignty.rule2.title') }}
      </h3>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.sovereignty.rule2.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.vendorLockIn.sovereignty.rule3.title') }}
      </h3>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.sovereignty.rule3.content') }}
      </p>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.vendorLockIn.reclaim.title') }}
      </h2>

      <p class="mt-4">
        {{ t('blog.vendorLockIn.reclaim.content') }}
      </p>

      <p class="mt-6 font-semibold">
        {{ t('blog.vendorLockIn.reclaim.closing') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.vendorLockIn.tags').split(', ')]
  useHead({
    title: t('blog.vendorLockIn.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.vendorLockIn.meta.title'),
    description: t('blog.vendorLockIn.meta.description'),
    keywords: t('blog.vendorLockIn.tags'),
    ogTitle: t('blog.vendorLockIn.title'),
    ogDescription: t('blog.vendorLockIn.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/pulapka-vendor-lock-in/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/pulapka-vendor-lock-in',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
