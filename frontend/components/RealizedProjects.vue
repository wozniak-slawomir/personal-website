<template>
  <div class="overflow-hidden">
    <div class="container mt-32">
      <h1 class="text-5xl font-bold my-10 text-center uppercase md:text-left">
        {{ $t('projects.title') }}
      </h1>
      <div class="mb-5 mt-10 flex flex-wrap lg:my-10 gap-5">
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'business' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter = activeFilter === 'business' ? 'all' : 'business'"
        >
          {{ $t('projects.filter.business') }}
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'portfolio' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter = activeFilter === 'portfolio' ? 'all' : 'portfolio'"
        >
          {{ $t('projects.filter.portfolio') }}
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'blog' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter = activeFilter === 'blog' ? 'all' : 'blog'"
        >
          {{ $t('projects.filter.blog') }}
        </button>
      </div>
      <masonry-wall
        :items="filteredItems"
        :gap="24"
        :max-columns="3"
      >
        <template #default="{item}">
          <div class="relative rounded-2xl overflow-hidden group min-h-fit">
            <a
              :href="item.link"
              target="_blank"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover max-h-[800px]"
              >
              <div class="bottom-0 left-0 right-0 backdrop-blur-md bg-[#393939] p-5 opacity-100 group-hover:opacity-100 transition-opacity duration-300 xl:backdrop-brightness-50 xl:opacity-0 xl:absolute xl:bg-transparent">
                <h1 class="text-2xl font-bold text-white uppercase">
                  {{ item.name }}
                </h1>
                <p class="text-white my-2">
                  {{ item.description }}
                </p>
              </div>
            </a>
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowDownRight } from '@phosphor-icons/vue'

const { t } = useI18n()

const items = computed(() => [
  {
    name: 'hiszpanbet',
    image: new URL('../assets/projects/hiszpanbet.png', import.meta.url).href,
    description: t('projects.hiszpanbet'),
    tags: ['business', 'portfolio'] as Card[],
    link: 'https://www.hiszpanbet.pl',
  },
])

type Card = 'business' | 'portfolio' | 'blog' | 'all'

const activeFilter = ref<Card>('all')

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') {
    return items.value
  } else {
    return items.value.filter((item) => item.tags.includes(activeFilter.value)) 
  }
})

</script>