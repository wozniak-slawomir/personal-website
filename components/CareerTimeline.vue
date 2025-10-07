<template>
  <Timeline
    :items="timelineComponentItems"
    :title="t('bio.menu.career')"
  >
    <template
      v-for="item in timelineItems"
      :key="item.id"
      #[item.id]
    >
      <div
        class="w-full rounded-2xl bg-[rgba(0,0,0,0.1)] p-6 shadow-lg"
      >
        <p
          class="mb-2 text-sm font-semibold text-neutral-500 md:hidden dark:text-neutral-400"
        >
          {{ t(item.date) }}
        </p>
        <h3 class="mb-1 text-xl font-bold text-neutral-800 dark:text-neutral-200">
          {{ t(item.title) }}
        </h3>
        <p
          v-if="item.company || item.employmentType"
          class="mb-1 text-neutral-500 dark:text-neutral-400"
        >
          <span v-if="item.company">{{ t(item.company) }}</span>
          <span v-if="item.company && item.employmentType"> · </span>
          <span v-if="item.employmentType">{{ t(item.employmentType) }}</span>
        </p>
        <p
          v-if="item.location"
          class="mb-3 text-neutral-500 dark:text-neutral-400"
        >
          {{ t(item.location) }}
        </p>
        <div v-if="Array.isArray(item.description)">
          <ul class="list-disc space-y-1 pl-5 text-neutral-600 dark:text-neutral-300">
            <li
              v-for="point in item.description"
              :key="point"
            >
              {{ t(point) }}
            </li>
          </ul>
        </div>
        <p
          v-else
          class="text-neutral-600 dark:text-neutral-300"
        >
          {{ t(item.description) }}
        </p>
      </div>
    </template>
  </Timeline>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Timeline from '~/components/ui/timeline/Timeline.vue'

const { t } = useI18n()

const timelineItems = ref([
  {
    id: 'mozaiq',
    date: 'bio.career.mozaiq.dates',
    title: 'bio.career.mozaiq.title',
    company: 'bio.career.mozaiq.company',
    employmentType: 'bio.career.mozaiq.employmentType',
    location: 'bio.career.mozaiq.location',
    description: [
      'bio.career.mozaiq.keyPoints1',
      'bio.career.mozaiq.keyPoints2',
      'bio.career.mozaiq.keyPoints3',
      'bio.career.mozaiq.keyPoints4',
    ],
  },
  {
    id: 'selfEmployed',
    date: 'bio.career.selfEmployed.dates',
    title: 'bio.career.selfEmployed.title',
    company: 'bio.career.selfEmployed.company',
    location: 'bio.career.selfEmployed.location',
    description: [
      'bio.career.selfEmployed.keyPoints1',
      'bio.career.selfEmployed.keyPoints2',
      'bio.career.selfEmployed.keyPoints3',
      'bio.career.selfEmployed.keyPoints4',
      'bio.career.selfEmployed.keyPoints5',
    ],
  },
  {
    id: 'cognitran',
    date: 'bio.career.cognitran.dates',
    title: 'bio.career.cognitran.title',
    company: 'bio.career.cognitran.company',
    location: 'bio.career.cognitran.location',
    description: [
      'bio.career.cognitran.keyPoints1',
      'bio.career.cognitran.keyPoints2',
      'bio.career.cognitran.keyPoints3',
      'bio.career.cognitran.keyPoints4',
      'bio.career.cognitran.keyPoints5',
    ],
  },
  {
    id: 'wirtualnaPolska',
    date: 'bio.career.wirtualnaPolska.dates',
    title: 'bio.career.wirtualnaPolska.title',
    company: 'bio.career.wirtualnaPolska.company',
    location: 'bio.career.wirtualnaPolska.location',
    description: [
      'bio.career.wirtualnaPolska.keyPoints1',
      'bio.career.wirtualnaPolska.keyPoints2',
      'bio.career.wirtualnaPolska.keyPoints3',
    ],
  },
  {
    id: 'nordea',
    date: 'bio.career.nordea.dates',
    title: 'bio.career.nordea.title',
    company: 'bio.career.nordea.company',
    location: 'bio.career.nordea.location',
    description: [
      'bio.career.nordea.keyPoints1',
      'bio.career.nordea.keyPoints2',
      'bio.career.nordea.keyPoints3',
    ],
  },
])

const timelineComponentItems = computed(() =>
  timelineItems.value.map(item => ({
    id: item.id,
    label: t(item.date),
  })),
)
</script>


