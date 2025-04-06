<template>
  <div class="container mt-64">
    <h2 class="text-5xl text-center md:text-left font-semibold uppercase">
      {{ $t('services.services') }}
    </h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8">
      <div class="bg-[#393939] py-4 rounded-xl px-8">
        <h3 class="text-l my-5">
          {{ $t('services.development.title') }}
        </h3>
        <hr class="border-[#666666]">
        <div class="my-5 text-[#bbbbbb]">
          <p>{{ $t('services.development.description') }}</p>
          <ul class="pl-7 my-4 list-disc">
            <li>{{ $t('services.development.points1') }}</li>
            <li>{{ $t('services.development.points2') }}</li>
          </ul>
        </div>
        <!-- <button @click="expandDevelopmentFeatures = !expandDevelopmentFeatures"
                    class="text-l my-4 pt-2 w-full flex justify-between">
                    Features
                    <PhCaretDown v-if="!expandDevelopmentFeatures" :size="20" class="inline align-middle ml-2" />
                    <PhCaretUp v-if="expandDevelopmentFeatures" :size="20" class="inline align-middle ml-2" />
                </button> -->
      </div>
      <div class="bg-[#393939] py-4 rounded-xl px-8">
        <h3 class="text-l my-5">
          {{ $t('services.coaching.title') }}
        </h3>
        <hr class="border-[#666666]">
        <div class="my-5 text-[#bbbbbb]">
          <p>{{ $t('services.coaching.description') }}</p>
          <ul class="pl-7 my-4 list-disc">
            <li>{{ $t('services.coaching.points1') }}</li>
            <li>{{ $t('services.coaching.points2') }}</li>
            <li>{{ $t('services.coaching.points3') }}</li>
          </ul>
        </div>
        <!-- <button @click="expandCoachingFeatures = !expandCoachingFeatures"
                    class="text-l my-4 pt-2 w-full flex justify-between">
                    Features
                    <PhCaretDown v-if="!expandCoachingFeatures" :size="20" class="inline align-middle ml-2" />
                    <PhCaretUp v-if="expandCoachingFeatures" :size="20" class="inline align-middle ml-2" />
                </button> -->
      </div>
      <div class="bg-[#393939] py-4 rounded-xl px-8">
        <h3 class="text-l my-5">
          {{ $t('services.audits.title') }}
        </h3>
        <hr class="border-[#666666]">
        <div class="my-5 text-[#bbbbbb]">
          <p>{{ $t('services.audits.description') }}</p>
          <ul class="pl-7 my-4 list-disc">
            <li>{{ $t('services.audits.points1') }}</li>
            <li>{{ $t('services.audits.points2') }}</li>
          </ul>
        </div>
        <!-- <button @click="expandAuditsFeatures = !expandAuditsFeatures"
                    class="text-l my-4 pt-2 w-full flex justify-between">
                    Features
                    <PhCaretDown v-if="!expandAuditsFeatures" :size="20" class="inline align-middle ml-2" />
                    <PhCaretUp v-if="expandAuditsFeatures" :size="20" class="inline align-middle ml-2" />
                </button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
const expandDevelopmentFeatures = ref(false)
const expandCoachingFeatures = ref(false)
const expandAuditsFeatures = ref(false)

</script>