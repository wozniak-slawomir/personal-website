<template>
  <div>
    <section class="mb-10">
      <h2 class="text-3xl font-bold mb-4">{{ t(`${prefix}.whoFor.title`) }}</h2>
      <p class="text-[var(--secondary-text-color)] mb-8 max-w-3xl">
        {{ t(`${prefix}.whoFor.intro`) }}
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
      <h2 class="text-3xl font-bold mb-4">{{ t(`${prefix}.problem.title`) }}</h2>
      <p class="text-[var(--secondary-text-color)] leading-relaxed mb-4">
        {{ t(`${prefix}.problem.p1`) }}
      </p>
      <p class="text-[var(--secondary-text-color)] leading-relaxed">
        {{ t(`${prefix}.problem.p2`) }}
      </p>
    </section>

    <section class="mb-10">
      <h2 class="text-3xl font-bold mb-4">{{ t(`${prefix}.process.title`) }}</h2>
      <p class="text-[var(--secondary-text-color)] mb-8 max-w-3xl">
        {{ t(`${prefix}.process.subtitle`) }}
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
      <h2 class="text-3xl font-bold mb-6">{{ t(`${prefix}.includesMore.title`) }}</h2>
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
      <h2 class="text-3xl font-bold mb-4">{{ t(`${prefix}.whyCustom.title`) }}</h2>
      <p class="text-[var(--secondary-text-color)] leading-relaxed mb-4">
        {{ t(`${prefix}.whyCustom.p1`) }}
      </p>
      <p class="text-[var(--secondary-text-color)] leading-relaxed">
        {{ t(`${prefix}.whyCustom.p2`) }}
      </p>
    </section>

    <slot />

    <section class="mb-10">
      <h2 class="text-3xl font-bold mb-8">{{ t(`${prefix}.faq.title`) }}</h2>
      <p class="text-[var(--secondary-text-color)] mb-8 max-w-3xl">
        {{ t(`${prefix}.faq.subtitle`) }}
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
      <h2 class="text-3xl font-bold mb-6">{{ t(`${prefix}.related.title`) }}</h2>
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
</template>

<script setup lang="ts">
import { PhCaretDown, PhCheckCircle } from '@phosphor-icons/vue'
import type { FaqItem } from '@/const/schemaOrg'

const props = defineProps<{
  prefix: string
  faqItems: readonly FaqItem[]
  relatedArticles: readonly { path: string, title: string }[]
}>()

const { t } = useI18n()
const localePath = useLocalePath()
const openFaq = ref<number | null>(null)

const whoForItems = computed(() => [
  { title: `${props.prefix}.whoFor.item1.title`, text: `${props.prefix}.whoFor.item1.text` },
  { title: `${props.prefix}.whoFor.item2.title`, text: `${props.prefix}.whoFor.item2.text` },
  { title: `${props.prefix}.whoFor.item3.title`, text: `${props.prefix}.whoFor.item3.text` },
])

const processSteps = computed(() => [
  { title: `${props.prefix}.process.step1.title`, description: `${props.prefix}.process.step1.description` },
  { title: `${props.prefix}.process.step2.title`, description: `${props.prefix}.process.step2.description` },
  { title: `${props.prefix}.process.step3.title`, description: `${props.prefix}.process.step3.description` },
  { title: `${props.prefix}.process.step4.title`, description: `${props.prefix}.process.step4.description` },
])

const includesMoreItems = computed(() => [
  `${props.prefix}.includesMore.item1`,
  `${props.prefix}.includesMore.item2`,
  `${props.prefix}.includesMore.item3`,
  `${props.prefix}.includesMore.item4`,
  `${props.prefix}.includesMore.item5`,
])
</script>
