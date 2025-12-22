<template>
  <div class="container py-16 md:py-24 lg:py-32 px-6 md:px-12">
    <!-- Header -->
    <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 md:mb-6 text-[var(--primary-text-color)]">
      {{ $t("faq.title") }}
    </h2>
    <p class="text-lg md:text-xl text-center text-[var(--secondary-text-color)] mb-12 md:mb-16 max-w-3xl mx-auto">
      {{ $t("faq.subtitle") }}
    </p>

    <!-- FAQ Items -->
    <div class="max-w-4xl mx-auto space-y-4">
      <!-- FAQ 1 -->
      <div 
        class="glassmorphism rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
        :class="{ 'shadow-xl': openIndex === 0 }"
      >
        <button
          @click="toggleFaq(0)"
          class="w-full flex items-center justify-between p-6 md:p-8 text-left"
        >
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)] pr-4">
            {{ $t("faq.q1.question") }}
          </h3>
          <PhCaretDown 
            class="text-[var(--primary-color)] flex-shrink-0 transition-transform duration-300" 
            :class="{ 'rotate-180': openIndex === 0 }"
            :size="24" 
            weight="bold" 
          />
        </button>
        <div 
          class="overflow-hidden transition-all duration-300"
          :style="{ maxHeight: openIndex === 0 ? '500px' : '0' }"
        >
          <div class="px-6 md:px-8 pb-6 md:pb-8">
            <p class="text-lg text-[var(--secondary-text-color)] leading-relaxed">
              {{ $t("faq.q1.answer") }}
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ 2 -->
      <div 
        class="glassmorphism rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
        :class="{ 'shadow-xl': openIndex === 1 }"
      >
        <button
          @click="toggleFaq(1)"
          class="w-full flex items-center justify-between p-6 md:p-8 text-left"
        >
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)] pr-4">
            {{ $t("faq.q2.question") }}
          </h3>
          <PhCaretDown 
            class="text-[var(--primary-color)] flex-shrink-0 transition-transform duration-300" 
            :class="{ 'rotate-180': openIndex === 1 }"
            :size="24" 
            weight="bold" 
          />
        </button>
        <div 
          class="overflow-hidden transition-all duration-300"
          :style="{ maxHeight: openIndex === 1 ? '500px' : '0' }"
        >
          <div class="px-6 md:px-8 pb-6 md:pb-8">
            <p class="text-lg text-[var(--secondary-text-color)] leading-relaxed">
              {{ $t("faq.q2.answer") }}
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ 3 -->
      <div 
        class="glassmorphism rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
        :class="{ 'shadow-xl': openIndex === 2 }"
      >
        <button
          @click="toggleFaq(2)"
          class="w-full flex items-center justify-between p-6 md:p-8 text-left"
        >
          <h3 class="text-xl md:text-2xl font-bold text-[var(--primary-text-color)] pr-4">
            {{ $t("faq.q3.question") }}
          </h3>
          <PhCaretDown 
            class="text-[var(--primary-color)] flex-shrink-0 transition-transform duration-300" 
            :class="{ 'rotate-180': openIndex === 2 }"
            :size="24" 
            weight="bold" 
          />
        </button>
        <div 
          class="overflow-hidden transition-all duration-300"
          :style="{ maxHeight: openIndex === 2 ? '500px' : '0' }"
        >
          <div class="px-6 md:px-8 pb-6 md:pb-8">
            <p class="text-lg text-[var(--secondary-text-color)] leading-relaxed">
              {{ $t("faq.q3.answer") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'

const openIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
