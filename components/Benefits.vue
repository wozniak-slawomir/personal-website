<template>
  <div class="container py-16 md:py-24 lg:py-32 px-6 md:px-12">
    <!-- Header -->
    <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-20 text-[var(--primary-text-color)]">
      {{ $t("benefits.title") }}
    </h2>

    <!-- Benefits Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
      <!-- Benefit 1: Peace of Mind -->
      <div class="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:bg-[var(--primary-color)]/5 transition-colors duration-300">
        <div class="w-20 h-20 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center mb-2">
          <PhMoonStars class="text-[var(--primary-color)]" :size="40" weight="fill" />
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-[var(--primary-text-color)]">
          {{ $t("benefits.peace.title") }}
        </h3>
        <p class="text-lg text-[var(--secondary-text-color)] leading-relaxed">
          {{ $t("benefits.peace.description") }}
        </p>
      </div>

      <!-- Benefit 2: Money Savings -->
      <div class="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:bg-[var(--primary-color)]/5 transition-colors duration-300">
        <div class="w-20 h-20 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center mb-2">
          <PhPiggyBank class="text-[var(--primary-color)]" :size="40" weight="fill" />
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-[var(--primary-text-color)]">
          {{ $t("benefits.savings.title") }}
        </h3>
        <p class="text-lg text-[var(--secondary-text-color)] leading-relaxed">
          {{ $t("benefits.savings.description") }}
        </p>
      </div>

      <!-- Benefit 3: Comfortable Relationship -->
      <div class="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:bg-[var(--primary-color)]/5 transition-colors duration-300">
        <div class="w-20 h-20 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center mb-2">
          <PhHandshake class="text-[var(--primary-color)]" :size="40" weight="fill" />
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-[var(--primary-text-color)]">
          {{ $t("benefits.relationship.title") }}
        </h3>
        <p class="text-lg text-[var(--secondary-text-color)] leading-relaxed">
          {{ $t("benefits.relationship.description") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhMoonStars, PhPiggyBank, PhHandshake } from '@phosphor-icons/vue'
import { provide } from 'vue'

provide('weight', 'fill')
</script>
