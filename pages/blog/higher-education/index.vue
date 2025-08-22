<template>
  <BlogPost
    :title="t('blog.higherEducation.title')"
    :dates="t('blog.higherEducation.dates')"
    :tags="tags"
  >
    <template #content>
      <p>{{ t('blog.higherEducation.content1') }}</p>
      <p class="mt-2">
        {{ t('blog.higherEducation.content2') }}
      </p>
      <p>{{ t('blog.higherEducation.content3') }}</p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content4') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content5') }}
      </p>

      <figure>
        <NuxtPicture
          src="/blog/higher-education/handstand.jpg"
          alt="handstand"
          class="mt-8 w-64 m-auto block"
          width="320"
          height="426"
        />
        <figcaption class="text-center mt-2">
          {{ t('blog.higherEducation.content6') }}
        </figcaption>
      </figure>

      <p class="mt-8">
        {{ t('blog.higherEducation.content7') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content8') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content9') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content10') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content11') }}
      </p>

      <NuxtPicture
        src="/blog/higher-education/enrollment-confirmation.png"
        alt="potwierdzenie zapisu na studia"
        class="mt-8 w-128 m-auto"
        width="320"
        height="84"
      />

      <p class="mt-4">
        {{ t('blog.higherEducation.content12') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content13') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content14') }}
      </p>

      <h2 class="mt-4">
        <strong>{{ t('blog.higherEducation.content15') }}</strong>
      </h2>

      <p class="mt-4">
        {{ t('blog.higherEducation.content16') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content17') }}
      </p>

      <NuxtPicture
        src="/blog/higher-education/friendship.jpg"
        alt="me"
        class="mt-8 w-64 m-auto rotate-180"
        width="500"
        height="375"
      />

      <p class="mt-4">
        {{ t('blog.higherEducation.content18') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.conclusion') }}
        <span class="font-semibold underline">{{ t('blog.higherEducation.content19') }}</span>
      </p>

      <h2 class="mt-4">
        <strong>{{ t('blog.higherEducation.content20') }}</strong>
      </h2>

      <p class="mt-4">
        {{ t('blog.higherEducation.content21') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content22') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content23') }}
      </p>

      <NuxtPicture
        src="/blog/higher-education/contest.png"
        alt="contest"
        class="mt-8 w-128 m-auto block"
        width="270"
        height="100"
      />

      <p class="mt-4">
        {{ t('blog.higherEducation.content24') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content25') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.conclusion') }}
        <span class="font-semibold underline">{{ t('blog.higherEducation.content26') }}</span>
      </p>

      <h2 class="mt-4">
        <strong>{{ t('blog.higherEducation.content27') }}</strong>
      </h2>

      <p class="mt-4">
        {{ t('blog.higherEducation.content28') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content29') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content30') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.conclusion') }}
        <span class="font-semibold underline">{{ t('blog.higherEducation.content31') }}</span>
      </p>

      <h2 class="mt-4">
        <strong>{{ t('blog.higherEducation.content32') }}</strong>
      </h2>

      <p class="mt-4">
        {{ t('blog.higherEducation.content33') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content34') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content35') }}
      </p>

      <figure>
        <NuxtPicture
          src="/blog/higher-education/interview.png"
          alt="interview"
          class="mt-8 w-64 m-auto block"
          width="320"
          height="426"
        />
        <figcaption class="text-center mt-2">
          {{ t('blog.higherEducation.content36') }}
        </figcaption>
      </figure>

      <p class="mt-4">
        {{ t('blog.higherEducation.content37') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.conclusion') }}
        <span class="font-semibold underline">{{ t('blog.higherEducation.content38') }}</span>
      </p>

      <h2 class="mt-4">
        <strong>{{ t('blog.higherEducation.content39') }}</strong>
      </h2>

      <p class="mt-4">
        {{ t('blog.higherEducation.content40') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content41') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content42') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.conclusion') }}
        <span class="font-semibold underline">{{ t('blog.higherEducation.content43') }}</span>
      </p>

      <hr class="mt-8">

      <p class="mt-4">
        {{ t('blog.higherEducation.content44') }}
      </p>

      <p class="mt-4">
        {{ t('blog.higherEducation.content45') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.higherEducation.tags').split(', ')]
  useHead({
    title: t('blog.higherEducation.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.higherEducation.meta.title'),
    description: t('blog.higherEducation.meta.description'),
    keywords: t('blog.higherEducation.tags'),
    ogTitle: t('blog.higherEducation.title'),
    ogDescription: t('blog.higherEducation.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: '/og-image.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/higher-education',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>