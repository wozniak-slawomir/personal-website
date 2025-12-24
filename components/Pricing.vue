<template>
  <section class="py-20  text-white" id="pricing">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        {{ $t('pricing.title') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        <!-- Package 1: Authority -->
        <div class="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex flex-col hover:border-[#9c7942]/50 transition-colors duration-300">
          <h3 class="text-xl font-bold mb-2">{{ $t('pricing.packages.authority.title') }}</h3>
          <p class="text-gray-400 text-sm mb-6 min-h-[40px]">{{ $t('pricing.packages.authority.subtitle') }}</p>
          <div class="mb-6">
            <span class="text-3xl font-bold text-white">{{ formatPrice(PRICING_PACKAGES.authority.price) }}</span>
            <span class="text-sm text-gray-400 block">netto</span>
          </div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li v-for="i in 3" :key="i" class="flex items-start gap-2">
              <Check class="w-5 h-5 text-[#9c7942] flex-shrink-0 mt-0.5" />
              <span class="text-sm text-gray-300">{{ $t(`pricing.packages.authority.feature${i}`) }}</span>
            </li>
          </ul>
          <button @click="handleContact('authority')" class="w-full py-3 px-4 rounded-lg border border-[#9c7942] text-[#9c7942] hover:bg-[#9c7942] hover:text-white transition-colors font-semibold">
            {{ $t('pricing.packages.authority.button') }}
          </button>
        </div>

        <!-- Package 2: Independence (Highlighted) -->
        <div class="bg-[#1a1a1a] border-2 border-[#9c7942] rounded-xl p-6 flex flex-col relative shadow-[0_0_20px_rgba(156,121,69,0.2)] transform md:-translate-y-4 z-10">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#9c7942] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
            {{ $t('pricing.packages.independence.tag') }}
          </div>
          <h3 class="text-xl font-bold mb-2 text-[#9c7942]">{{ $t('pricing.packages.independence.title') }}</h3>
          <p class="text-gray-400 text-sm mb-6 min-h-[40px]">{{ $t('pricing.packages.independence.subtitle') }}</p>
          <div class="mb-6">
            <div class="text-xs text-gray-500 line-through mb-1">{{ $t('pricing.packages.independence.anchor') }}</div>
            <span class="text-3xl font-bold text-white">{{ formatPrice(PRICING_PACKAGES.independence.price) }}</span>
            <span class="text-sm text-gray-400 block">netto</span>
          </div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li v-for="i in 3" :key="i" class="flex items-start gap-2">
              <Check class="w-5 h-5 text-[#9c7942] flex-shrink-0 mt-0.5" />
              <span class="text-sm text-gray-300">{{ $t(`pricing.packages.independence.feature${i}`) }}</span>
            </li>
          </ul>
          <button @click="handleContact('independence')" class="w-full py-3 px-4 rounded-lg bg-[#9c7942] text-white hover:bg-[#b8935a] transition-colors font-bold shadow-lg">
            {{ $t('pricing.packages.independence.button') }}
          </button>
        </div>

        <!-- Package 3: Commerce -->
        <div class="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex flex-col hover:border-[#9c7942]/50 transition-colors duration-300">
          <h3 class="text-xl font-bold mb-2">{{ $t('pricing.packages.commerce.title') }}</h3>
          <p class="text-gray-400 text-sm mb-6 min-h-[40px]">{{ $t('pricing.packages.commerce.subtitle') }}</p>
          <div class="mb-6">
            <span class="text-3xl font-bold text-white">{{ formatPrice(PRICING_PACKAGES.commerce.price) }}</span>
            <span class="text-sm text-gray-400 block">netto</span>
          </div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li v-for="i in 2" :key="i" class="flex items-start gap-2">
              <Check class="w-5 h-5 text-[#9c7942] flex-shrink-0 mt-0.5" />
              <span class="text-sm text-gray-300">{{ $t(`pricing.packages.commerce.feature${i}`) }}</span>
            </li>
          </ul>
          <button @click="handleContact('commerce')" class="w-full py-3 px-4 rounded-lg border border-[#9c7942] text-[#9c7942] hover:bg-[#9c7942] hover:text-white transition-colors font-semibold">
            {{ $t('pricing.packages.commerce.button') }}
          </button>
        </div>

        <!-- Package 4: Partnership -->
        <div class="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex flex-col hover:border-[#9c7942]/50 transition-colors duration-300">
          <h3 class="text-xl font-bold mb-2">{{ $t('pricing.packages.partnership.title') }}</h3>
          <p class="text-gray-400 text-sm mb-6 min-h-[40px]">{{ $t('pricing.packages.partnership.subtitle') }}</p>
          <div class="mb-6">
            <span class="text-3xl font-bold text-white">{{ formatPrice(PRICING_PACKAGES.partnership.price) }}</span>
            <span class="text-sm text-gray-400 block">netto {{ $t('pricing.packages.partnership.period') }}</span>
          </div>
          <ul class="space-y-3 mb-8 flex-grow">
            <li v-for="i in 3" :key="i" class="flex items-start gap-2">
              <Check class="w-5 h-5 text-[#9c7942] flex-shrink-0 mt-0.5" />
              <span class="text-sm text-gray-300">{{ $t(`pricing.packages.partnership.feature${i}`) }}</span>
            </li>
          </ul>
          <button @click="handleContact('partnership')" class="w-full py-3 px-4 rounded-lg border border-[#9c7942] text-[#9c7942] hover:bg-[#9c7942] hover:text-white transition-colors font-semibold">
            {{ $t('pricing.packages.partnership.button') }}
          </button>
        </div>
      </div>

      <!-- Risk Reversal -->
      <div class="mt-16 flex flex-col items-center text-center">
        <div class="bg-[#9c7942]/10 p-4 rounded-full mb-4">
          <ShieldCheck class="w-8 h-8 text-[#9c7942]" />
        </div>
        <p class="text-lg text-gray-300 max-w-2xl font-medium">
          {{ $t('pricing.guarantee') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Check, ShieldCheck } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { PRICING_PACKAGES } from '@/const/pricing'

const { t } = useI18n()


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    useGrouping: true,
  }).format(price) + ' PLN'
}

const handleContact = (packageKey: string) => {
  return navigateTo({
    path: '/contact',
    query: {
      package: packageKey
    }
  })
}

// Schema.org JSON-LD
const schemaData = computed(() => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': Object.values(PRICING_PACKAGES).map((pkg, index) => ({
      '@type': pkg.schemaType,
      'position': index + 1,
      'name': t(`pricing.packages.${pkg.key}.title`),
      'description': t(`pricing.packages.${pkg.key}.subtitle`),
      'offers': {
        '@type': 'Offer',
        'price': pkg.price.toString(),
        'priceCurrency': pkg.currency,
        ...(pkg.period === 'month' ? {
          'priceSpecification': {
            '@type': 'UnitPriceSpecification',
            'price': pkg.price.toString(),
            'priceCurrency': pkg.currency,
            'unitCode': 'MON'
          }
        } : {})
      }
    }))
  }
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(schemaData.value))
    }
  ]
})
</script>
