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
        class="w-full rounded-2xl p-6 shadow-lg bg-[rgba(0,0,0,0.1)]"
      >
        <h3 class="mb-2 text-xl font-bold text-neutral-800 dark:text-neutral-200">
          {{ t(item.title) }}
          <span
            v-if="item.company"
            class="font-normal text-neutral-500 dark:text-neutral-400"
          >
            @ {{ t(item.company) }}
          </span>
        </h3>
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
    id: 'entrepreneur',
    date: 'bio.career.entrepreneur.dates',
    title: 'bio.career.entrepreneur.title',
    description: [
      'bio.career.entrepreneur.keyPoints1',
      'bio.career.entrepreneur.keyPoints2',
      'bio.career.entrepreneur.keyPoints3',
      'bio.career.entrepreneur.keyPoints4',
    ],
  },
  {
    id: 'mozaiq',
    date: 'bio.career.mozaiq.dates',
    title: 'bio.career.mozaiq.title',
    company: 'bio.career.mozaiq.company',
    description: [
      'bio.career.mozaiq.keyPoints1',
      'bio.career.mozaiq.keyPoints2',
      'bio.career.mozaiq.keyPoints3',
      'bio.career.mozaiq.keyPoints4',
      'bio.career.mozaiq.keyPoints5',
    ],
  },
  {
    id: 'enet',
    date: 'bio.career.enet.dates',
    title: 'bio.career.enet.title',
    company: 'bio.career.enet.company',
    description: ['bio.career.enet.keyPoints1', 'bio.career.enet.keyPoints2'],
  },
  {
    id: 'cognitran',
    date: 'bio.career.cognitran.dates',
    title: 'bio.career.cognitran.title',
    company: 'bio.career.cognitran.company',
    description: [
      'bio.career.cognitran.keyPoints1',
      'bio.career.cognitran.keyPoints2',
      'bio.career.cognitran.keyPoints3',
    ],
  },
  {
    id: 'wp',
    date: 'bio.career.wp.dates',
    title: 'bio.career.wp.title',
    company: 'bio.career.wp.company',
    description: [
      'bio.career.wp.keyPoints1',
      'bio.career.wp.keyPoints2',
      'bio.career.wp.keyPoints3',
    ],
  },
  {
    id: 'nordea',
    date: 'bio.career.nordea.dates',
    title: 'bio.career.nordea.title',
    company: 'bio.career.nordea.company',
    description: [
      'bio.career.nordea.keyPoints1',
      'bio.career.nordea.keyPoints2',
      'bio.career.nordea.keyPoints3',
    ],
  },
  {
    id: 'webwave',
    date: 'bio.career.webwave.dates',
    title: 'bio.career.webwave.title',
    company: 'bio.career.webwave.company',
    description: [
      'bio.career.webwave.keyPoints1',
      'bio.career.webwave.keyPoints2',
      'bio.career.webwave.keyPoints3',
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


