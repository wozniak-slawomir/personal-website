<template>
  <div class="overflow-hidden">
    <div class="container mt-32">
      <h1 class="text-5xl font-bold my-10 text-center md:text-left">
        REALIZED PROJECTS
      </h1>
      <div class="mb-5 mt-10 flex flex-wrap lg:my-10 gap-5">
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'CATEGORY 1' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow lg:max-w-fit lg:px-20 lg:mb-0 "
          @click="activeFilter === 'CATEGORY 1' ? activeFilter = 'ALL' : activeFilter = 'CATEGORY 1'"
        >
          Category 1
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'CATEGORY 2' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter === 'CATEGORY 2' ? activeFilter = 'ALL' : activeFilter = 'CATEGORY 2'"
        >
          Category 2
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'CATEGORY 3' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter === 'CATEGORY 3' ? activeFilter = 'ALL' : activeFilter = 'CATEGORY 3'"
        >
          Category 3
        </button>
      </div>
      <masonry-wall
        :items="filteredItems"
        :gap="24"
        :max-columns="3"
        :min-columns="3"
        :column-width="300"
      >
        <template #default="{item}">
          <div class="relative rounded-2xl overflow-hidden">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-fit object-cover"
            >
            <!-- <div class="absolute bottom-0 left-0 right-0 bg-[#393939] bg-opacity-90 p-5">
              <h1 class="text-2xl font-bold text-white">
                {{ item.name }}
              </h1>
              <p class="text-white">
                {{ item.description }}
              </p>
              <div class="flex items-center mt-5">
                <a
                  href="#"
                  class="text-white hover:text-[#f5f5f5] duration-300"
                >
                  <span>View project</span>
                  <PhArrowDownRight class="w-5 h-5 ml-2" />
                </a>
              </div>
            </div> -->
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PhArrowDownRight } from '@phosphor-icons/vue'

const items = [
{
    name: 'placeholder 1',
    image: new URL('../assets/projects/placeholder1.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['CATEGORY 1', 'CATEGORY 2'],
  },
  {
    name: 'hiszpanbet',
    image: new URL('../assets/projects/hiszpanbet.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['CATEGORY 1', 'CATEGORY 2', 'CATEGORY 3'],
  },
  {
    name: 'placeholder 2',
    image: new URL('../assets/projects/placeholder2.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['CATEGORY 3'],
  },
  {
    name: 'placeholder 3',
    image: new URL('../assets/projects/placeholder2.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['CATEGORY 3'],
  },
]

//FIX AFTER RELOAD THERE ARE 2 COLUMNS INSTEAD OF 3 DESPITE min-columns=3

type Card = 'CATEGORY 1' | 'CATEGORY 2' | 'CATEGORY 3' | 'ALL'

const activeFilter = ref<Card>('ALL')

const filteredItems = computed(() => {
  if (activeFilter.value === 'ALL') {
    return items
  } else {
    return items.filter((item) => item.tags.includes(activeFilter.value)) 
  }
})

</script>