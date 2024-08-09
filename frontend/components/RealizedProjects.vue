<template>
  <div class="overflow-hidden">
    <div class="container mt-32">
      <h1 class="text-5xl font-bold my-10 text-center md:text-left">
        REALIZED PROJECTS
      </h1>
      <div class="mb-5 mt-10 flex flex-wrap lg:my-10 gap-5">
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'business' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter === 'business' ? activeFilter = 'all' : activeFilter = 'business'"
        >
          business
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'portfolio' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter === 'portfolio' ? activeFilter = 'all' : activeFilter = 'portfolio'"
        >
          portfolio
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'blog' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter === 'blog' ? activeFilter = 'all' : activeFilter = 'blog'"
        >
          blog
        </button>
      </div>
      <masonry-wall
        :items="filteredItems"
        :gap="24"
        :max-columns="3"
      >
        <template #default="{item}">
          <div class="relative rounded-2xl overflow-hidden group min-h-fit">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover"
            >
            <div class="bottom-0 left-0 right-0 backdrop-blur-md bg-[#393939] p-5 opacity-100 group-hover:opacity-100 transition-opacity duration-300 xl:backdrop-brightness-50 xl:opacity-0 xl:absolute xl:bg-transparent">
              <h1 class="text-2xl font-bold text-white uppercase">
                {{ item.name }}
              </h1>
              <p class="text-white my-2">
                {{ item.description }}
              </p>
              <div class="items-center mt-4 flex justify-between w-full">
                <a
                  href="#"
                  class="bg-white rounded-full text-black px-5 py-1 hover:text-[#f5f5f5] hover:bg-black duration-300"
                >
                  <span>View project</span>
                </a>
                <div class="gap-5 items-center hidden lg:flex">
                  <p
                    v-for="tag in item.tags"
                    :key="tag"
                    class="underline underline-offset-4 duration-150 capitalize hover:underline-offset-8"
                  >
                    {{ tag }}
                  </p>
                </div>
                <PhArrowDownRight class="w-5 h-5" />
              </div>
            </div>
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
    tags: ['business', 'portfolio'],
  },
  {
    name: 'hiszpanbet',
    image: new URL('../assets/projects/hiszpanbet.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['business', 'portfolio', 'blog'],
  },
  {
    name: 'placeholder 2',
    image: new URL('../assets/projects/placeholder2.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['blog'],
  },
  {
    name: 'placeholder 3',
    image: new URL('../assets/projects/placeholder3.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['blog', 'portfolio'],
  },
  {
    name: 'placeholder 4',
    image: new URL('../assets/projects/placeholder4.jpg', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['blog', 'portfolio', 'business'],
  },
  {
    name: 'placeholder 5',
    image: new URL('../assets/projects/placeholder5.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['blog'],
  },
  {
    name: 'placeholder 6',
    image: new URL('../assets/projects/placeholder6.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['business'],
  },
]

//FIX AFTER RELOAD THERE ARE 2 COLUMNS INSTEAD OF 3 DESPITE min-columns=3

type Card = 'business' | 'portfolio' | 'blog' | 'all'

const activeFilter = ref<Card>('all')

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') {
    return items
  } else {
    return items.filter((item) => item.tags.includes(activeFilter.value)) 
  }
})

</script>