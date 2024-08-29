<template>
  <div class="container mt-64">
    <h1 class="text-5xl text-center md:text-left font-semibold uppercase">
      {{ $t('services.services') }}
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8">
      <div class="bg-[#393939] py-4 rounded-xl px-8">
        <h2 class="text-l my-5">
          {{ $t('services.development.title') }}
        </h2>
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
        <h2 class="text-l my-5">
          {{ $t('services.coaching.title') }}
        </h2>
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
        <h2 class="text-l my-5">
          {{ $t('services.audits.title') }}
        </h2>
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
    <div class="text-center my-20">
      <h1 class="text-4xl mb-6">
        {{ $t('services.interested') }}
      </h1>
      <button
        class="px-8 py-5 rounded-full bg-[color:var(--secondary-color)] md:inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300"
        @click="onContactClick"
      >
        {{ $t('common.contact') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
const expandDevelopmentFeatures = ref(false)
const expandCoachingFeatures = ref(false)
const expandAuditsFeatures = ref(false)
const { $event } = useNuxtApp()

const onContactClick = () => {
  $event('ContactModal:Open')
}

</script>