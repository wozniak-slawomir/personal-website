<template>
  <div class="container py-16 md:py-24 lg:py-32 px-6 md:px-12">
    <!-- Header -->
    <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 text-[var(--primary-text-color)]">
      {{ $t("process.title") }}
    </h2>
    <p class="text-lg md:text-xl text-center text-[var(--secondary-text-color)] mb-12 md:mb-20 max-w-3xl mx-auto">
      {{ $t("process.subtitle") }}
    </p>

    <!-- Process Steps -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
      <!-- Step 1: Diagnosis -->
      <div class="relative flex flex-col items-center text-center space-y-4 p-6 glassmorphism rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div class="w-16 h-16 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-black font-bold text-2xl mb-2">
            1
          </div>
          <PhStethoscope class="text-[var(--primary-color)]" :size="48" weight="duotone" />
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)]">
            {{ $t("process.step1.title") }}
          </h3>
          <p class="text-[var(--secondary-text-color)] leading-relaxed">
            {{ $t("process.step1.description") }}
          </p>
          <!-- Arrow for desktop -->
          <PhArrowRight 
            class="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 text-[var(--primary-color)]" 
            :size="20" 
            weight="bold" 
          />
        </div>

        <!-- Step 2: Plan -->
        <div class="relative flex flex-col items-center text-center space-y-4 p-6 glassmorphism rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div class="w-16 h-16 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-black font-bold text-2xl mb-2">
            2
          </div>
          <PhClipboardText class="text-[var(--primary-color)]" :size="48" weight="duotone" />
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)]">
            {{ $t("process.step2.title") }}
          </h3>
          <p class="text-[var(--secondary-text-color)] leading-relaxed">
            {{ $t("process.step2.description") }}
          </p>
          <!-- Arrow for desktop -->
          <PhArrowRight 
            class="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 text-[var(--primary-color)]" 
            :size="20" 
            weight="bold" 
          />
        </div>

        <!-- Step 3: Implementation -->
        <div class="relative flex flex-col items-center text-center space-y-4 p-6 glassmorphism rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div class="w-16 h-16 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-black font-bold text-2xl mb-2">
            3
          </div>
          <PhHammer class="text-[var(--primary-color)]" :size="48" weight="duotone" />
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)]">
            {{ $t("process.step3.title") }}
          </h3>
          <p class="text-[var(--secondary-text-color)] leading-relaxed">
            {{ $t("process.step3.description") }}
          </p>
          <!-- Arrow for desktop -->
          <PhArrowRight 
            class="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 text-[var(--primary-color)]" 
            :size="20" 
            weight="bold" 
          />
        </div>

        <!-- Step 4: Handover -->
        <div class="relative flex flex-col items-center text-center space-y-4 p-6 glassmorphism rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <div class="w-16 h-16 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-black font-bold text-2xl mb-2">
            4
          </div>
          <PhKey class="text-[var(--primary-color)]" :size="48" weight="duotone" />
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)]">
            {{ $t("process.step4.title") }}
          </h3>
          <p class="text-[var(--secondary-text-color)] leading-relaxed">
            {{ $t("process.step4.description") }}
          </p>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { PhStethoscope, PhClipboardText, PhHammer, PhKey, PhArrowRight } from '@phosphor-icons/vue'
import { provide } from 'vue'

provide('weight', 'duotone')
</script>
