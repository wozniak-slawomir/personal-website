<template>
  <div class="overflow-hidden">
    <div class="container mt-32">
      <!-- <div
      class="h-96 w-full absolute z-10 bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)] translate-x-[-20px] mt-[136px] sm:mt-[130px] md:mt-28 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1025px] xl:max-w-[1280px] 2xl:max-w-[1536px] scale-[101%]"
    /> -->
      <h1 class="text-5xl font-bold my-10 text-center md:text-left">
        REALIZED PROJECTS
      </h1>
      <div class="mb-0 mt-10 flex flex-wrap lg:my-10">
        <button
          :class="{ 'bg-[#474b59]': activeCard === 'cat1' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0 "
          @click="activeCard = 'cat1'"
        >
          Category 1
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeCard === 'cat2' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
          @click="activeCard = 'cat2'"
        >
          Category 2
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeCard === 'cat3' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
          @click="activeCard = 'cat3'"
        >
          Category 3
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeCard === 'cat4' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
          @click="activeCard = 'cat4'"
        >
          Category 4
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeCard === 'cat5' }"
          class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
          @click="activeCard = 'cat5'"
        >
          Category 5
        </button>
      </div>
      <div class="flex whitespace-nowrap gap-5 justify-center lg:gap-10">
        <div
          v-for="project in projects"
          :key="project.name"
          class="backdrop-brightness-50 relative flex overflow-hidden w-full min-w-[300px] aspect-[9/16] whitespace-normal rounded-2xl sm:min-w-[500px] lg:min-w-[900px] lg:aspect-video min-[2560px]:min-w-[1500px]"
        >
          <img
            :src="innerWidth > innerHeight ? project.desktopImage : project.mobileImage"
            :alt="project.name"
            class="absolute inset-0 object-cover w-full h-full"
          >
          <div
            v-if="activeCard === project.name"
            class="absolute inset-0 w-full h-full p-5 flex justify-between flex-col"
            :class="activeCard === project.name ? 'backdrop-brightness-[30%] backdrop-blur-sm' : ''"
          >
            <div>
              <h1 class="text-3xl font-semibold uppercase">
                {{ project.name }}
              </h1>
              <p class="max-w-96 my-5 text-2xl">
                {{ project.description }}
              </p>
            </div>
            <div class="flex justify-between">
              <div class="flex gap-5">
                <button class="bg-white px-6 py-1 rounded-full text-black duration-100 hover:bg-[#CCCCCC] active:opacity-50">
                  Visit this website
                </button>
              </div>
              <div class="gap-5 hidden lg:flex">
                <p
                  v-for="tag in project.tags"
                  :key="tag"
                  class="p-1 underline underline-offset-4"
                >
                  {{ tag }}
                </p>
              </div>
              <PhArrowDownRight
                class="text-white align-middle"
                size="30px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PhArrowDownRight} from '@phosphor-icons/vue'

const innerWidth = ref(0)
const innerHeight = ref(0)

onMounted(() => {
  innerWidth.value = window.innerWidth
  innerHeight.value = window.innerHeight
})

type Card = 
| 'placeholder 1'
| 'hiszpanbet'
| 'placeholder 2'

const activeCard = ref<Card>('hiszpanbet')

// mobile images are the same for now, when the layout is ready, I will change them
// tags are used by filters to show only projects from selected category

const projects = ref([
  {
    name: 'placeholder 1',
    desktopImage: new URL('../assets/projects/placeholder1.png', import.meta.url).href,
    mobileImage: new URL('../assets/projects/placeholder1.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['cat1', 'cat2'],
  },
  {
    name: 'hiszpanbet',
    desktopImage: new URL('../assets/projects/hiszpanbet.png', import.meta.url).href,
    mobileImage: new URL('../assets/projects/hiszpanbet.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: ['CATEGORY 1', 'CATEGORY 2', 'CATEGORY 3'],
  },
  {
    name: 'placeholder 2',
    desktopImage: new URL('../assets/projects/placeholder2.png', import.meta.url).href,
    mobileImage: new URL('../assets/projects/placeholder2.png', import.meta.url).href,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
    tags: 'cat3',
  },
])

console.log(projects)
</script>