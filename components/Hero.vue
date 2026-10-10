<template>
  <div class="relative flex min-h-svh flex-col overflow-hidden pt-[var(--navbar-height)] md:h-svh">
    <div class="container flex min-h-0 flex-1 items-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full p-6 md:px-12 md:pt-8 md:pb-4 lg:px-16">
      <!-- Left side: Text and CTA -->
      <div class="max-w-2xl order-2 md:order-1">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          <span class="text-[var(--primary-text-color)] drop-shadow-lg">{{ $t("hero.title") }}</span>
        </h1>
        <div class="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-[var(--secondary-text-color)] font-light">
          {{ $t("hero.subtitle") }}
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink
            :to="localePath('/contact')"
            class="px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3] text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:opacity-50 w-full sm:w-auto text-center"
          >
            {{ $t("common.contact") }}
          </NuxtLink>
        </div>
      </div>

      <!-- Right side: Photo -->
      <div class="flex items-center justify-center order-1 md:order-2 md:min-h-0 md:h-full">
        <NuxtPicture
          src="/code-portrait.png"
          class="object-contain object-center rounded-2xl max-w-[280px] sm:max-w-[350px] md:max-w-[450px] w-full md:max-h-[calc(100svh-var(--navbar-height)-11rem)]"
          :alt="$t('alt.portrait')"
          preload
          :img-attrs="{
            class: 'rounded-2xl md:max-h-[calc(100svh-var(--navbar-height)-11rem)] md:w-auto md:object-contain'
          }"
          sizes="280px sm:350px md:450px"
        />
      </div>
      </div>
    </div>

    <div class="mt-2 shrink-0 pb-5 md:pb-8">
      <p class="mb-4 text-center text-sm text-[var(--tertiary-text-color)]">
        {{ $t('hero.companies') }}
      </p>
      <div class="company-marquee">
        <Marquee pause-on-hover class="[--duration:50s] [--gap:4.5rem]">
          <a
            v-for="company in companies"
            :key="company.name"
            :href="company.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="company.name"
            class="flex items-center"
          >
            <img
              :src="company.src"
              alt=""
              class="h-7 md:h-8 w-auto opacity-50 transition-opacity duration-300 hover:opacity-80"
            >
          </a>
        </Marquee>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import Marquee from './ui/marquee/Marquee.vue'

const localePath = useLocalePath()

const companies = [
  { name: 'Mozaiq', src: '/logos/mozaiq.png', href: 'https://www.mozaiq.com/' },
  { name: 'Kingfisher', src: '/logos/kingfisher.png', href: 'https://www.kingfisher.com/' },
  { name: 'WebWave', src: '/logos/webwave.png', href: 'https://webwave.me/' },
  { name: 'Nordea', src: '/logos/nordea.png', href: 'https://www.nordea.com/' },
  { name: 'Wirtualna Polska', src: '/logos/wirtualna-polska.png', href: 'https://holding.wp.pl/' },
  { name: 'Cognitran', src: '/logos/cognitran.png', href: 'https://cognitran.com/' },
  { name: 'Tebra', src: '/logos/tebra.png', href: 'https://www.tebra.com/' },
]

provide('weight', 'fill')
</script>

<style scoped>
.company-marquee {
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
</style>

