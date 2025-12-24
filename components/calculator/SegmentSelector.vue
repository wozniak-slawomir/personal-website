<script setup lang="ts">
import { USER_SEGMENTS } from '~/const/userSegments';
import { useCalculator } from '~/composables/useCalculator';
import type { UserSegment } from '~/types/calculator';
import {
  Palette,
  Code,
  TrendingUp,
  ShoppingCart,
  Building2,
  User,
} from 'lucide-vue-next';

const { setSegment } = useCalculator();
const emit = defineEmits<{
  (e: 'selected', segment: UserSegment): void;
}>();

const iconComponents: Record<string, any> = {
  'palette': Palette,
  'code': Code,
  'trending-up': TrendingUp,
  'shopping-cart': ShoppingCart,
  'building-2': Building2,
  'user': User,
};

const selectSegment = (segment: UserSegment) => {
  setSegment(segment);
  emit('selected', segment);
};
</script>

<template>
  <div class="text-center space-y-8 py-8 animate-fade-in">
    <div class="space-y-4">
      <h2 class="text-2xl md:text-3xl font-bold text-white">
        {{ $t('calculator.segment.title') }}
      </h2>
      <p class="text-gray-400 max-w-xl mx-auto">
        {{ $t('calculator.segment.description') }}
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
      <button
        v-for="segment in USER_SEGMENTS"
        :key="segment.id"
        @click="selectSegment(segment.id)"
        class="group relative bg-[#252525] border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-[#9c7942] hover:bg-[#2a2a2a] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9c7942] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
      >
        <div class="flex flex-col items-center space-y-3">
          <div class="w-14 h-14 rounded-full bg-[#1a1a1a] border border-gray-600 flex items-center justify-center group-hover:border-[#9c7942] group-hover:bg-[#9c7942]/10 transition-colors">
            <component
              :is="iconComponents[segment.icon]"
              class="w-7 h-7 text-gray-400 group-hover:text-[#9c7942] transition-colors"
            />
          </div>
          <div class="text-center">
            <h3 class="text-white font-semibold text-sm md:text-base group-hover:text-[#9c7942] transition-colors">
              {{ $t(segment.labelKey) }}
            </h3>
            <p class="text-xs text-gray-500 mt-1 hidden md:block">
              {{ $t(segment.descriptionKey) }}
            </p>
          </div>
        </div>
        
        <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4 text-[#9c7942]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
