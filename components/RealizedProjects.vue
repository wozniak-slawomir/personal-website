<template>
  <div
    ref="realizedProjectsSection"
    class="overflow-hidden"
  >
    <div class="container mt-24">
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
          <div
            class="relative min-h-fit w-full min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-[#1a1a1a] shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-[border-color,box-shadow] duration-300 group xl:shadow-none xl:hover:border-[var(--primary-color)]/40"
          >
            <NuxtLink
              :to="getItemLink(item.link)"
              class="flex w-full min-w-0 flex-col"
            >
              <NuxtPicture
                :src="item.image"
                :alt="item.name"
                class="block w-full max-w-full"
                height="650"
                width="450"
                :img-attrs="{
                  class: 'w-full max-w-full h-auto max-h-[800px] object-cover object-top',
                }"
                @load="fixLibraryBug"
              />
              <div
                class="project-caption bottom-0 left-0 right-0 p-5 opacity-100
                transition-opacity duration-300 group-hover:opacity-100
                xl:absolute xl:opacity-0 xl:group-hover:opacity-100"
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
    :deep(img) {
      max-width: 100%;
      height: auto;
    }

    .project-caption {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background-color: #1a1a1a;
    }

    @media (min-width: 1280px) {
      .project-caption {
        border-top: 0;
        background-color: transparent;
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.5) 80%,
          transparent 100%
        );
      }
    }
</style>