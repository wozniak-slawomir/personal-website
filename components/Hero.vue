<template>
  <div class="relative container min-h-screen overflow-hidden pt-[var(--navbar-height)] flex items-center">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full p-6 md:p-12 lg:p-16">
      <!-- Left side: Text and CTA -->
      <div class="max-w-2xl order-2 md:order-1">
        <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
          <span class="text-[var(--primary-text-color)] drop-shadow-lg">{{ $t("hero.title") }}</span>
          <span class="text-[var(--primary-color)]">.</span>
        </h1>
        <div class="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-[var(--secondary-text-color)] font-light">
          {{ $t("hero.subtitle") }}
        </div>
        <ul class="space-y-3 md:space-y-4 text-base md:text-lg mb-8 md:mb-12">
          <li class="flex items-center text-[var(--primary-text-color)]">
            <PhCheckCircle 
              class="mr-3 text-[var(--primary-color)] flex-shrink-0" 
              :size="24" 
            />
            <span>{{ $t("hero.software.feature1") }}</span>
          </li>
          <li class="flex items-center text-[var(--primary-text-color)]">
            <PhCheckCircle 
              class="mr-3 text-[var(--primary-color)] flex-shrink-0" 
              :size="24" 
            />
            <span>{{ $t("hero.software.feature2") }}</span>
          </li>
          <li class="flex items-center text-[var(--primary-text-color)]">
            <PhCheckCircle 
              class="mr-3 text-[var(--primary-color)] flex-shrink-0" 
              :size="24" 
            />
            <span>{{ $t("hero.software.feature3") }}</span>
          </li>
        </ul>
        <button
          class="px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3] text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:opacity-50 w-full sm:w-auto"
          @click="onContactClick"
        >
          {{ $t("common.contact") }}
        </button>
      </div>

      <!-- Right side: Photo -->
      <div class="flex items-center justify-center order-1 md:order-2">
        <NuxtPicture
          src="/code-portrait.png"
          class="object-cover object-center rounded-2xl max-w-[280px] sm:max-w-[350px] md:max-w-[450px] w-full"
          :alt="$t('alt.portrait')"
          preload
          :img-attrs="{
            class: 'rounded-2xl'
          }"
          sizes="280px sm:350px md:450px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCheckCircle } from '@phosphor-icons/vue'
import { provide } from 'vue'
const { $event } = useNuxtApp()

provide('weight', 'fill')

const onContactClick = () => {
  $event('ContactModal:Open')
}
</script>

