import { computed } from 'vue'
import { contentItems } from '@/const/contentItems'

export const useContentItems = () => {
  const { t } = useI18n()

  const items = computed(() => {
    return contentItems.map(item => ({
      ...item,
      name: typeof item.name === 'function' ? item.name(t) : item.name,
      description: typeof item.description === 'function' ? item.description(t) : item.description,
    }))
  })

  return {
    items,
    contentItems
  }
}
