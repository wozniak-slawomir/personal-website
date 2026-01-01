<template>
  <BlogPost
    :title="t('blog.meetingThatCouldBeVideo.title')"
    :dates="t('blog.meetingThatCouldBeVideo.dates')"
    :tags="tags"
  >
    <template #content>
      <h2 class="text-2xl font-bold mt-8">
        <a
          href="https://www.linkedin.com/posts/evanfish_the-shocking-amount-of-meetings-we-face-today-activity-7396562926754770944-1rwH/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-primary-400 transition-colors"
        >{{ t('blog.meetingThatCouldBeVideo.problem.title') }}</a>
      </h2>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.intro') }}
      </p>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.problem.content') }}
      </p>
        <figure>
            <NuxtPicture
                src="/blog/spotkanie-ktore-moglo-byc-wideo/meeting.jpg"
                alt="Spotkanie, które mogło być wideo"
                class="mt-8 w-full m-auto block"
                width="800"
                height="600"
                preload
            />
        </figure>
      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.meetingThatCouldBeVideo.myStance.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.myStance.intro') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.meetingThatCouldBeVideo.myStance.list1') }}</li>
        <li>{{ t('blog.meetingThatCouldBeVideo.myStance.list2') }}</li>
        <li>{{ t('blog.meetingThatCouldBeVideo.myStance.list3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.meetingThatCouldBeVideo.whenToMeet.title') }}
      </h2>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>
          <strong>{{ t('blog.meetingThatCouldBeVideo.whenToMeet.list1.title') }}</strong>
          {{ t('blog.meetingThatCouldBeVideo.whenToMeet.list1.content') }}
        </li>
        <li>
          <strong>{{ t('blog.meetingThatCouldBeVideo.whenToMeet.list2.title') }}</strong>
          {{ t('blog.meetingThatCouldBeVideo.whenToMeet.list2.content') }}
        </li>
        <li>
          <strong>{{ t('blog.meetingThatCouldBeVideo.whenToMeet.list3.title') }}</strong>
          {{ t('blog.meetingThatCouldBeVideo.whenToMeet.list3.content') }}
        </li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.meetingThatCouldBeVideo.whenNotToMeet.title') }}
      </h2>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.meetingThatCouldBeVideo.whenNotToMeet.list1') }}</li>
        <li>{{ t('blog.meetingThatCouldBeVideo.whenNotToMeet.list2') }}</li>
        <li>{{ t('blog.meetingThatCouldBeVideo.whenNotToMeet.list3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.meetingThatCouldBeVideo.solution.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.solution.content') }}
      </p>

      <h3 class="text-xl font-semibold mt-6">
        {{ t('blog.meetingThatCouldBeVideo.examples.title') }}
      </h3>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>
          <a href="https://www.loom.com/looms" target="_blank" rel="noopener noreferrer" class="underline">Loom</a> (prekursor)
        </li>
        <li>
          <a href="https://cap.so/" target="_blank" rel="noopener noreferrer" class="underline">Cap.so</a> (alternatywa open source, tutaj nie tylko jest dostępna za darmo, ale także masz pewność prywatności)
        </li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.meetingThatCouldBeVideo.howItWorks.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.howItWorks.intro') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>{{ t('blog.meetingThatCouldBeVideo.howItWorks.list1') }}</li>
        <li>{{ t('blog.meetingThatCouldBeVideo.howItWorks.list2') }}</li>
        <li>{{ t('blog.meetingThatCouldBeVideo.howItWorks.list3') }}</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.meetingThatCouldBeVideo.advantages.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.advantages.intro') }}
      </p>
      <ul class="list-disc list-inside mt-4 space-y-2">
        <li>
          <strong>
            {{ t('blog.meetingThatCouldBeVideo.advantages.list1.titlePrefix') }}
            <a
              href="https://pl.wikipedia.org/wiki/Asynchroniczno%C5%9B%C4%87"
              target="_blank"
              rel="noopener noreferrer"
              class="underline hover:text-primary-400 transition-colors"
            >{{ t('blog.meetingThatCouldBeVideo.advantages.list1.titleLink') }}</a>{{ t('blog.meetingThatCouldBeVideo.advantages.list1.titleSuffix') }}
          </strong>
          {{ t('blog.meetingThatCouldBeVideo.advantages.list1.content') }}
        </li>
        <li>
          <strong>
            {{ t('blog.meetingThatCouldBeVideo.advantages.list2.titlePrefix') }}
            <a
              href="https://pl.wikipedia.org/wiki/Skalowalno%C5%9B%C4%87"
              target="_blank"
              rel="noopener noreferrer"
              class="underline hover:text-primary-400 transition-colors"
            >{{ t('blog.meetingThatCouldBeVideo.advantages.list2.titleLink') }}</a>{{ t('blog.meetingThatCouldBeVideo.advantages.list2.titleSuffix') }}
          </strong>
          {{ t('blog.meetingThatCouldBeVideo.advantages.list2.content') }}
        </li>
      </ul>

      <h2 class="text-2xl font-bold mt-8">
        {{ t('blog.meetingThatCouldBeVideo.howToImplement.title') }}
      </h2>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.howToImplement.content1') }}
      </p>
      <p class="mt-4">
        {{ t('blog.meetingThatCouldBeVideo.howToImplement.content2') }}
      </p>

      <p class="mt-8 font-semibold">
        {{ t('blog.meetingThatCouldBeVideo.closing') }}
      </p>
    </template>
  </BlogPost>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const tags = ref<string[]>([])

watch(locale, () => {
  tags.value = [...t('blog.meetingThatCouldBeVideo.tags').split(', ')]
  useHead({
    title: t('blog.meetingThatCouldBeVideo.meta.title'),
  })
  
  useSeoMeta({
    title: t('blog.meetingThatCouldBeVideo.meta.title'),
    description: t('blog.meetingThatCouldBeVideo.meta.description'),
    keywords: t('blog.meetingThatCouldBeVideo.tags'),
    ogTitle: t('blog.meetingThatCouldBeVideo.title'),
    ogDescription: t('blog.meetingThatCouldBeVideo.meta.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogImage: 'blog/spotkanie-ktore-moglo-byc-wideo/mock.jpg',
    ogUrl: 'https://slawomir-wozniak.pl/blog/spotkanie-ktore-moglo-byc-wideo',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
