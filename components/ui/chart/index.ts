import type { Ref } from 'vue'

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
    icon?: any
  }
}

export { default as ChartContainer } from './ChartContainer.vue'
export { default as ChartLegend } from './ChartLegend.vue'
