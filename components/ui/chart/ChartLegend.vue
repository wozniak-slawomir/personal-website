<script setup lang="ts">
import type { ChartConfig } from './index'

interface Props {
  config: ChartConfig
  vertical?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false
})
</script>

<template>
  <div 
    class="flex gap-4 text-sm"
    :class="vertical ? 'flex-col' : 'flex-row flex-wrap justify-center'"
  >
    <div 
      v-for="(value, key) in config" 
      :key="key"
      class="flex items-center gap-2"
    >
      <div 
        class="w-3 h-3 rounded-sm"
        :style="{ backgroundColor: value.color }"
      />
      <span class="text-gray-300">{{ value.label }}</span>
    </div>
  </div>
</template>
