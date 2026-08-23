<template>
  <div class="pt-[var(--navbar-height)] pb-20">
    <div class="container mt-10 lg:mt-20">
      <BackButton class="mb-6" />

      <div class="max-w-5xl mx-auto">
        <section class="text-center mb-14">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {{ t('offer.website.heroTitle') }}
          </h1>
          <p class="text-lg md:text-xl text-[var(--secondary-text-color)] max-w-3xl mx-auto mb-10">
            {{ t('offer.website.heroSubtitle') }}
          </p>

          <div class="rounded-2xl overflow-hidden border border-gray-700/30 shadow-2xl">
            <img
              src="/services/website.jpg"
              :alt="t('offer.website.title')"
              class="w-full h-auto"
            >
          </div>
        </section>

        <section class="glassmorphism rounded-3xl p-8 md:p-10 border border-gray-700/30 mb-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 class="text-2xl font-bold mb-6">{{ t('offer.website.whatIncludes') }}</h2>
              <ul class="space-y-4">
                <li v-for="i in 3" :key="i" class="flex items-start gap-3">
                  <PhCheckCircle :size="20" weight="fill" class="text-[var(--primary-color)] mt-0.5" />
                  <span>{{ t(`pricing.packages.authority.feature${i}`) }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-black/20 rounded-2xl p-6 md:p-8 border border-white/10">
              <p class="text-sm text-[var(--secondary-text-color)] mb-2">{{ t('offer.priceFrom') }}</p>
              <p class="text-4xl font-bold mb-6">{{ formattedPrice }}</p>
              <p class="text-[var(--secondary-text-color)] mb-8">
                {{ t('offer.website.offerSubtitle') }}
              </p>

              <div class="flex flex-col sm:flex-row gap-3">
                <NuxtLink
                  :to="{ path: localePath('/contact'), query: { package: 'authority' } }"
                  class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[image:var(--primary-gradient)] text-black font-bold hover:bg-[image:var(--secondary-gradient)] transition-all"
                >
                  {{ t('offer.scheduleCall') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/oferta')"
                  class="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-colors"
                >
                  {{ t('offer.backToOffer') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-3xl font-bold mb-4">{{ t('offer.website.whoFor.title') }}</h2>
          <p class="text-[var(--secondary-text-color)] mb-8 max-w-3xl">
            {{ t('offer.website.whoFor.intro') }}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="item in whoForItems"
              :key="item.title"
              class="glassmorphism rounded-2xl p-6 border border-gray-700/30"
            >
              <h3 class="text-xl font-bold mb-3">{{ t(item.title) }}</h3>
              <p class="text-[var(--secondary-text-color)] leading-relaxed">
                {{ t(item.text) }}
              </p>
            </div>
          </div>
        </section>

        <section class="glassmorphism rounded-3xl p-8 md:p-10 border border-gray-700/30 mb-10">
          <h2 class="text-3xl font-bold mb-4">{{ t('offer.website.problem.title') }}</h2>
          <p class="text-[var(--secondary-text-color)] leading-relaxed mb-4">
            {{ t('offer.website.problem.p1') }}
          </p>
          <p class="text-[var(--secondary-text-color)] leading-relaxed">
            {{ t('offer.website.problem.p2') }}
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-3xl font-bold mb-4">{{ t('offer.website.process.title') }}</h2>
          <p class="text-[var(--secondary-text-color)] mb-8 max-w-3xl">
            {{ t('offer.website.process.subtitle') }}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(step, index) in processSteps"
              :key="step.title"
              class="glassmorphism rounded-2xl p-6 border border-gray-700/30"
            >
              <div class="w-10 h-10 rounded-full bg-[var(--primary-color)] text-black font-bold flex items-center justify-center mb-4">
                {{ index + 1 }}
              </div>
              <h3 class="text-xl font-bold mb-2">{{ t(step.title) }}</h3>
              <p class="text-[var(--secondary-text-color)] leading-relaxed">
                {{ t(step.description) }}
              </p>
            </div>
          </div>
        </section>

        <section class="glassmorphism rounded-3xl p-8 md:p-10 border border-gray-700/30 mb-10">
          <h2 class="text-3xl font-bold mb-6">{{ t('offer.website.includesMore.title') }}</h2>
          <ul class="space-y-4">
            <li
              v-for="item in includesMoreItems"
              :key="item"
              class="flex items-start gap-3"
            >
              <PhCheckCircle :size="20" weight="fill" class="text-[var(--primary-color)] mt-0.5 flex-shrink-0" />
              <span>{{ t(item) }}</span>
            </li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-3xl font-bold mb-4">{{ t('offer.website.whyCustom.title') }}</h2>
          <p class="text-[var(--secondary-text-color)] leading-relaxed mb-4">
            {{ t('offer.website.whyCustom.p1') }}
          </p>
          <p class="text-[var(--secondary-text-color)] leading-relaxed">
            {{ t('offer.website.whyCustom.p2') }}
          </p>
        </section>

        <OfferExamples tag="website" />

        <section class="mb-10">
          <h2 class="text-3xl font-bold mb-8">{{ t('offer.website.faq.title') }}</h2>
          <p class="text-[var(--secondary-text-color)] mb-8 max-w-3xl">
            {{ t('offer.website.faq.subtitle') }}
          </p>
          <div class="space-y-4">
            <div
              v-for="(item, index) in faqItems"
              :key="item.question"
              class="glassmorphism rounded-xl overflow-hidden border border-gray-700/30 transition-all duration-300"
              :class="{ 'shadow-xl': openFaq === index }"
            >
              <button
                class="w-full flex items-center justify-between p-6 md:p-8 text-left"
                @click="openFaq = openFaq === index ? null : index"
              >
                <h3 class="text-xl md:text-2xl font-bold pr-4">
                  {{ t(item.question) }}
                </h3>
                <PhCaretDown
                  class="text-[var(--primary-color)] flex-shrink-0 transition-transform duration-300"
                  :class="{ 'rotate-180': openFaq === index }"
                  :size="24"
                  weight="bold"
                />
              </button>
              <div
                class="grid transition-[grid-template-rows] duration-300"
                :class="openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              >
                <div class="overflow-hidden">
                  <p class="px-6 md:px-8 pb-6 md:pb-8 text-lg text-[var(--secondary-text-color)] leading-relaxed">
                    {{ t(item.answer) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-3xl font-bold mb-6">{{ t('offer.website.related.title') }}</h2>
          <ul class="space-y-3">
            <li v-for="article in relatedArticles" :key="article.path">
              <NuxtLink
                :to="localePath(article.path)"
                class="underline hover:text-[var(--primary-color)] transition-colors"
              >
                {{ t(article.title) }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCaretDown, PhCheckCircle } from '@phosphor-icons/vue'
import { PRICING_PACKAGES } from '@/const/pricing'
import { WEBSITE_FAQ_ITEMS } from '@/const/schemaOrg'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const openFaq = ref<number | null>(null)

const formattedPrice = computed(() => {
  return `${new Intl.NumberFormat('pl-PL').format(PRICING_PACKAGES.authority.price)} PLN netto`
})

const whoForItems = [
  { title: 'offer.website.whoFor.item1.title', text: 'offer.website.whoFor.item1.text' },
  { title: 'offer.website.whoFor.item2.title', text: 'offer.website.whoFor.item2.text' },
  { title: 'offer.website.whoFor.item3.title', text: 'offer.website.whoFor.item3.text' },
] as const

const processSteps = [
  { title: 'offer.website.process.step1.title', description: 'offer.website.process.step1.description' },
  { title: 'offer.website.process.step2.title', description: 'offer.website.process.step2.description' },
  { title: 'offer.website.process.step3.title', description: 'offer.website.process.step3.description' },
  { title: 'offer.website.process.step4.title', description: 'offer.website.process.step4.description' },
] as const

const includesMoreItems = [
  'offer.website.includesMore.item1',
  'offer.website.includesMore.item2',
  'offer.website.includesMore.item3',
  'offer.website.includesMore.item4',
  'offer.website.includesMore.item5',
] as const

const faqItems = WEBSITE_FAQ_ITEMS

const relatedArticles = [
  { path: '/blog/czy-potrzebujesz-strony', title: 'blog.needWebsite.title' },
  { path: '/blog/profesjonalna-strona-www', title: 'blog.professionalWebsite.title' },
  { path: '/blog/psychologia-perswazji', title: 'blog.persuasionPsychology.title' },
] as const

watch(locale, () => {
  useSeoMeta({
    title: t('seo.website.title'),
    description: t('seo.website.description'),
    ogTitle: t('seo.website.title'),
    ogDescription: t('seo.website.description'),
    ogSiteName: t('seo.ogSiteName'),
    ogUrl: 'https://slawomir-wozniak.pl/oferta/strona-internetowa',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
