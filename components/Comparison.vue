<template>
  <div class="container py-16 md:py-24 lg:py-32 px-6 md:px-12">
    <!-- Header -->
    <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 text-[var(--primary-text-color)]">
      {{ $t("comparison.title") }}
    </h2>

    <!-- Two Column Comparison -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
      <!-- Left Column: Old Way (Pain) -->
      <div class="space-y-6">
        <div class="text-center lg:text-left mb-8">
          <h3 class="text-2xl md:text-3xl font-bold text-red-500 mb-2">
            {{ $t("comparison.oldWay.title") }}
          </h3>
          <p class="text-[var(--secondary-text-color)] text-lg">
            {{ $t("comparison.oldWay.subtitle") }}
          </p>
        </div>

        <!-- Software House -->
        <div class="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900 rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
          <div class="flex items-start gap-4">
            <PhXCircle class="text-red-500 flex-shrink-0 mt-1" :size="32" weight="fill" />
            <div>
              <h4 class="text-xl font-bold text-[var(--primary-text-color)] mb-2">
                {{ $t("comparison.oldWay.softwareHouse.title") }}
              </h4>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t("comparison.oldWay.softwareHouse.description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Cheap Freelancer -->
        <div class="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900 rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
          <div class="flex items-start gap-4">
            <PhXCircle class="text-red-500 flex-shrink-0 mt-1" :size="32" weight="fill" />
            <div>
              <h4 class="text-xl font-bold text-[var(--primary-text-color)] mb-2">
                {{ $t("comparison.oldWay.freelancer.title") }}
              </h4>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t("comparison.oldWay.freelancer.description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Marketing Agencies -->
        <div class="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900 rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
          <div class="flex items-start gap-4">
            <PhXCircle class="text-red-500 flex-shrink-0 mt-1" :size="32" weight="fill" />
            <div>
              <h4 class="text-xl font-bold text-[var(--primary-text-color)] mb-2">
                {{ $t("comparison.oldWay.agencies.title") }}
              </h4>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t("comparison.oldWay.agencies.description") }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: New Way (Solution) -->
      <div class="space-y-6">
        <div class="text-center lg:text-left mb-8">
          <h3 class="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-2">
            {{ $t("comparison.newWay.title") }}
          </h3>
          <p class="text-[var(--secondary-text-color)] text-lg">
            {{ $t("comparison.newWay.subtitle") }}
          </p>
        </div>

        <!-- Fractional CTO -->
        <div class="bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)] rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
          <div class="flex items-start gap-4">
            <PhCheckCircle class="text-[var(--primary-color)] flex-shrink-0 mt-1" :size="32" weight="fill" />
            <div>
              <h4 class="text-xl font-bold text-[var(--primary-text-color)] mb-2">
                {{ $t("comparison.newWay.fractionalCTO.title") }}
              </h4>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t("comparison.newWay.fractionalCTO.description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Direct Contact -->
        <div class="bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)] rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
          <div class="flex items-start gap-4">
            <PhCheckCircle class="text-[var(--primary-color)] flex-shrink-0 mt-1" :size="32" weight="fill" />
            <div>
              <h4 class="text-xl font-bold text-[var(--primary-text-color)] mb-2">
                {{ $t("comparison.newWay.directContact.title") }}
              </h4>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t("comparison.newWay.directContact.description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Sovereignty -->
        <div class="bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)] rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
          <div class="flex items-start gap-4">
            <PhCheckCircle class="text-[var(--primary-color)] flex-shrink-0 mt-1" :size="32" weight="fill" />
            <div>
              <h4 class="text-xl font-bold text-[var(--primary-text-color)] mb-2">
                {{ $t("comparison.newWay.sovereignty.title") }}
              </h4>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t("comparison.newWay.sovereignty.description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Guarantee -->
        <div class="bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)] rounded-xl p-6 transform transition-transform duration-300 hover:scale-105">
          <div class="flex items-start gap-4">
            <PhCheckCircle class="text-[var(--primary-color)] flex-shrink-0 mt-1" :size="32" weight="fill" />
            <div>
              <h4 class="text-xl font-bold text-[var(--primary-text-color)] mb-2">
                {{ $t("comparison.newWay.guarantee.title") }}
              </h4>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t("comparison.newWay.guarantee.description") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCheckCircle, PhXCircle } from '@phosphor-icons/vue'
import { provide } from 'vue'

provide('weight', 'fill')
</script>
