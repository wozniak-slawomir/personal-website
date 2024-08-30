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
        :min-columns="columnsNum"
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
import { ref, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()

let columnsNum = ref(4)

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

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const items = computed(() => [
  {
    name: 'hiszpanbet',
    image: new URL('../assets/projects/hiszpanbet.png', import.meta.url).href,
    description: t('projects.hiszpanbet'),
    tags: ['business', 'portfolio'],
    link: 'https://www.hiszpanbet.pl',
  },
  {
    name: t('projects.blog.instagram.italy.name'),
    image: new URL('../assets/projects/blog/instagram/italy.png', import.meta.url).href,
    description: t('projects.blog.instagram.italy.description'),
    tags: ['blog'],
    link: 'https://www.instagram.com/p/C-V8QkRsg8Q/?img_index=1',
  },
  {
    name: t('projects.blog.instagram.reels.relationships.name'),
    image: new URL('../assets/projects/blog/instagram/relationships.png', import.meta.url).href,
    description: t('projects.blog.instagram.reels.relationships.description'),
    tags: ['blog'],
    link: 'https://www.instagram.com/reel/C-GIvdts-xp/',
  },
  {
    name: t('projects.blog.instagram.reels.collective-illusions.name'),
    image: new URL('../assets/projects/blog/instagram/collective-illusions.png', import.meta.url).href,
    description: t('projects.blog.instagram.reels.collective-illusions.description'),
    tags: ['blog'],
    link: 'https://www.instagram.com/wozniaakslawek/reel/C9sDhuas6gA/',
  },
  {
    name: t('projects.blog.instagram.hiking.name'),
    image: new URL('../assets/projects/blog/instagram/hiking.png', import.meta.url).href,
    description: t('projects.blog.instagram.hiking.description'),
    tags: ['blog'],
    link: 'https://www.instagram.com/wozniaakslawek/p/C9K9U0RMfmH/',
  },
  {
    name: t('projects.blog.instagram.notes.name'),
    image: new URL('../assets/projects/blog/instagram/notes.png', import.meta.url).href,
    description: t('projects.blog.instagram.notes.description'),
    tags: ['blog'],
    link: 'https://www.instagram.com/wozniaakslawek/p/C6BwzvAMV0w',
  },
  {
    name: t('projects.blog.instagram.attribution.name'),
    image: new URL('../assets/projects/blog/instagram/attribution.png', import.meta.url).href,
    description: t('projects.blog.instagram.attribution.description'),
    tags: ['blog'],
    link: 'https://www.instagram.com/wozniaakslawek/p/C5a0trssz6A/',
  },
  {
    name: t('projects.blog.instagram.promotions.name'),
    image: new URL('../assets/projects/blog/instagram/promotions.png', import.meta.url).href,
    description: t('projects.blog.instagram.promotions.description'),
    tags: ['blog'],
    link: 'https://www.instagram.com/p/C8mXtXQsDw2',
  },
  {
    name: t('blog.edducamp2024.title'),
    image: new URL('../assets/blog/edducamp/interview.png', import.meta.url).href,
    description: t('blog.edducamp2024.intro1') + ' ' + t('blog.edducamp2024.intro2'),
    tags: ['blog'] as Card[],
    link: '/blog/edducamp2024',
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