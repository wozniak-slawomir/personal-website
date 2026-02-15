<template>
  <div class="pt-[var(--navbar-height)] pb-20">
    <div class="container mt-10 lg:mt-20">
      <BackButton class="mb-6" />

      <div class="max-w-5xl mx-auto">
        <section class="text-center mb-14">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {{ t('pricing.packages.commerce.title') }}
          </h1>
          <p class="text-lg md:text-xl text-[var(--secondary-text-color)] max-w-3xl mx-auto mb-10">
            {{ t('pricing.packages.commerce.subtitle') }}
          </p>

          <div class="rounded-2xl overflow-hidden border border-gray-700/30 shadow-2xl">
            <img
              src="/services/woocommerce.png"
              :alt="t('pricing.packages.commerce.title')"
              class="w-full h-auto"
            >
          </div>
        </section>

        <section class="glassmorphism rounded-3xl p-8 md:p-10 border border-gray-700/30 mb-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 class="text-2xl font-bold mb-6">{{ t('offer.website.whatIncludes') }}</h2>
              <ul class="space-y-4">
                <li v-for="i in 2" :key="i" class="flex items-start gap-3">
                  <PhCheckCircle :size="20" weight="fill" class="text-[var(--primary-color)] mt-0.5" />
                  <span>{{ t(`pricing.packages.commerce.feature${i}`) }}</span>
                </li>
              </ul>
            </div>

            <div class="bg-black/20 rounded-2xl p-6 md:p-8 border border-white/10">
              <p class="text-sm text-[var(--secondary-text-color)] mb-2">{{ t('offer.priceFrom') }}</p>
              <p class="text-4xl font-bold mb-6">{{ formattedPrice }}</p>
              <p class="text-[var(--secondary-text-color)] mb-8">
                {{ t('pricing.packages.commerce.subtitle') }}
              </p>

              <div class="flex flex-col sm:flex-row gap-3">
                <NuxtLink
                  :to="{ path: '/contact', query: { package: 'commerce' } }"
                  class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[image:var(--primary-gradient)] text-black font-bold hover:bg-[image:var(--secondary-gradient)] transition-all"
                >
                  {{ t('offer.scheduleCall') }}
                </NuxtLink>
                <NuxtLink
                  to="/oferta"
                  class="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-colors"
                >
                  {{ t('offer.backToOffer') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h2 class="text-3xl font-bold text-center mb-8">{{ t('offer.website.exampleProjects') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://akademia.nimbleninja.pl/"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl overflow-hidden border border-gray-700/30 hover:border-[var(--primary-color)]/50 transition-colors block"
            >
              <img
                src="/projects/akademianinjaslandscape.png"
                alt="Example 1"
                class="w-full h-auto"
              >
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCheckCircle } from '@phosphor-icons/vue'
import { PRICING_PACKAGES } from '@/const/pricing'

const { locale, t } = useI18n()

const formattedPrice = computed(() => {
  return `${new Intl.NumberFormat('pl-PL').format(PRICING_PACKAGES.commerce.price)} PLN netto`
})

watch(locale, () => {
  useSeoMeta({
    title: `${t('pricing.packages.commerce.title')} - ${t('seo.ogSiteName')}`,
    description: t('pricing.packages.commerce.subtitle'),
    ogTitle: `${t('pricing.packages.commerce.title')} - ${t('seo.ogSiteName')}`,
    ogDescription: t('pricing.packages.commerce.subtitle'),
    ogSiteName: t('seo.ogSiteName'),
    ogUrl: 'https://slawomir-wozniak.pl/oferta/suwerenny-handel',
    twitterCard: 'summary_large_image',
  })
}, { immediate: true })
</script>
