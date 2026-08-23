<template>
  <div class="container py-16 md:py-24 lg:py-32 px-6 md:px-12">
    <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 text-[var(--primary-text-color)]">
      {{ $t("faq.title") }}
    </h2>
    <p class="text-lg md:text-xl text-center text-[var(--secondary-text-color)] mb-12 md:mb-16 max-w-3xl mx-auto">
      {{ $t("faq.subtitle") }}
    </p>

    <div class="max-w-4xl mx-auto space-y-4">
      <div
        v-for="(item, index) in HOME_FAQ_ITEMS"
        :key="item.question"
        class="glassmorphism rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
        :class="{ 'shadow-xl': openIndex === index }"
      >
        <button
          class="w-full flex items-center justify-between p-6 md:p-8 text-left"
          @click="toggleFaq(index)"
        >
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)] pr-4">
            {{ $t(item.question) }}
          </h3>
          <PhCaretDown
            class="text-[var(--primary-color)] flex-shrink-0 transition-transform duration-300"
            :class="{ 'rotate-180': openIndex === index }"
            :size="24"
            weight="bold"
          />
        </button>
        <div
          class="overflow-hidden transition-all duration-300"
          :style="{ maxHeight: openIndex === index ? '500px' : '0' }"
        >
          <div class="px-6 md:px-8 pb-6 md:pb-8">
            <p class="text-lg text-[var(--secondary-text-color)] leading-relaxed">
              {{ $t(item.answer) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCaretDown } from '@phosphor-icons/vue'
import { HOME_FAQ_ITEMS } from '~/const/schemaOrg'

const openIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
