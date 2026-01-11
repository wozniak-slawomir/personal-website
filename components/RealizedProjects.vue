<template>
  <div
    ref="realizedProjectsSection"
    class="overflow-hidden"
  >
    <div class="container mt-32">
      <h2 class="text-5xl font-bold my-10 text-center uppercase md:text-left">
        {{ $t('projects.title') }}
      </h2>
      <p class="text-xl text-center md:text-left mb-10 -mt-8 text-[var(--muted-foreground)]">
        {{ $t('projects.subtitle') }}
      </p>

      <masonry-wall
        :items="filteredItems"
        :gap="24"
        :min-columns="columnsNum"
        :ssr-columns="columnsNum"
        :rtl="rtl"
      >
        <template #default="{ item }">
          <div class="relative rounded-2xl overflow-hidden group min-h-fit">
            <NuxtLink :to="getItemLink(item.link)">
              <NuxtPicture
                :src="item.image"
                :alt="item.name"
                class="w-full md:h-full object-cover max-h-[800px]"
                height="650"
                width="450"
                @load="fixLibraryBug"
              />
              <div
                class="bottom-0 left-0 right-0 p-5 opacity-100
                glassmorphism-mobile
                group-hover:opacity-100 transition-opacity duration-300 xl:opacity-0 xl:absolute
                xl:bg-[linear-gradient(to_top,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0.5)_80%,_transparent_100%)]
                xl:group-hover:opacity-100 "
              >
                <h3 class="text-2xl font-bold text-white uppercase">
                  {{ item.name }}
                </h3>
                <p
                  v-if="item.description"
                  class="text-white my-2"
                >
                  {{ item.description }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const localePath = useLocalePath()



const props = defineProps<{
  tags?: string[]
}>()

const columnsNum = ref(4)


const handleResize = () => {
  const screenWidth = window.innerWidth
  if (screenWidth >= 1280) {
    columnsNum.value = 4
  } else if (screenWidth >= 1024) {
    columnsNum.value = 3
  } else if (screenWidth >= 600) {
    columnsNum.value = 2
  } else {
    columnsNum.value = 1
  }
}

const rtl = ref(true)

const fixLibraryBug = () => {
  rtl.value = false
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const { items } = useContentItems()

const getItemLink = (link: string) => {
  // External links start with http(s) - use as-is
  if (link.startsWith('http')) return link
  // Internal links - wrap with localePath
  return localePath(link)
}

const filteredItems = computed(() => {
  let baseItems = items.value

  if (props.tags?.length) {
    baseItems = baseItems.filter((item) => props.tags?.some((tag) => item.tags.includes(tag)))
  }

    return baseItems
      .filter((item) => item.tags.includes('portfolio'))
      .reverse()
})

</script>

<style scoped>
    @media (max-width: 1280px) {
      .glassmorphism-mobile {
        @apply border-2 border-[var(--border-color)] bg-gradient-to-bl from-[rgba(255,255,255,0.1)] to-transparent;
      }
    }
</style>