<script setup lang="ts">
import type { ChartConfig } from './index'

interface Props {
  config: ChartConfig
  class?: string
}

const props = defineProps<Props>()

// Provide chart config to child components
provide('chartConfig', props.config)
</script>

<template>
  <div 
    :class="props.class"
    :style="{
      '--chart-1': config.desktop?.color || '#9c7942',
      '--chart-2': config.mobile?.color || '#60a5fa',
      '--chart-3': '#10b981',
      '--chart-4': '#f59e0b',
      '--chart-5': '#ef4444',
      '--chart-6': '#8b5cf6',
    }"
  >
    <slot />
  </div>
</template>
