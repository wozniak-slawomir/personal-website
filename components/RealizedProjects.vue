<template>
  <div
    ref="realizedProjectsSection"
    class="overflow-hidden"
  >
    <div class="container mt-32">
      <h2 class="text-5xl font-bold my-10 text-center uppercase md:text-left">
        {{ $t('projects.title') }}
      </h2>
      <div class="mb-5 mt-10 flex flex-wrap lg:my-10 gap-5">
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'business' }"
          class="text-l p-3 flex-1 rounded-3xl glassmorphism hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter = activeFilter === 'business' ? 'all' : 'business'"
        >
          {{ $t('projects.filter.business') }}
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'portfolio' }"
          class="text-l p-3 flex-1 rounded-3xl glassmorphism hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter = activeFilter === 'portfolio' ? 'all' : 'portfolio'"
        >
          {{ $t('projects.filter.portfolio') }}
        </button>
        <button
          :class="{ 'bg-[#474b59]': activeFilter === 'blog' }"
          class="text-l p-3 flex-1 rounded-3xl glassmorphism hover:bg-[#464646] h-15 w-full duration-300 shadow uppercase lg:max-w-fit lg:px-20 lg:mb-0"
          @click="activeFilter = activeFilter === 'blog' ? 'all' : 'blog'"
        >
          {{ $t('projects.filter.blog') }}
        </button>
      </div>
      <masonry-wall
        :items="filteredItems"
        :gap="24"
        :min-columns="columnsNum"
        :ssr-columns="columnsNum"
        :rtl="rtl"
        :class="isSectionExpanded ? 'max-h-none' : 'max-h-[800px] masonry-wall-mask'"
        class="overflow-hidden duration-300"
      >
        <template #default="{ item }">
          <div class="relative rounded-2xl overflow-hidden group min-h-fit">
            <NuxtLink :to="item.link">
              <NuxtImg
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
      <div class="relative pt-10">
        <button
          class="py-3 px-20 glassmorphism hover:bg-[#464646] duration-300 flex justify-center items-center mx-auto rounded-3xl"
          @click="toggleSection"
        >
          {{ isSectionExpanded ? $t('projects.show.less') : $t('projects.show.more') }}
          <PhCaretDown
            size="30"
            class="text-white ml-3 transform transition-transform duration-300"
            :class="isSectionExpanded ? 'rotate-180' : ''"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'

type Card = 'business' | 'portfolio' | 'blog' | 'all'

const props = defineProps<{
  tags?: string[]
}>()

const { t } = useI18n()

const columnsNum = ref(4)
const activeFilter = ref<Card>('all')
const isSectionExpanded = ref(false)
const realizedProjectsSection = ref<HTMLElement | null>(null)

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

const toggleSection = () => {
  isSectionExpanded.value = !isSectionExpanded.value
  if (!isSectionExpanded.value) {
    scrollToSection()
  }
}

const scrollToSection = () => {
  if (realizedProjectsSection.value) {
    realizedProjectsSection.value.scrollIntoView({ behavior: 'smooth' })
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

const items = computed(() => [
  {
    name: 'hiszpanbet',
    image: 'projects/hiszpanbet.png',
    description: t('projects.hiszpanbet'),
    tags: ['business', 'portfolio', 'code'],
    link: 'https://www.hiszpanbet.pl',
  },
  {
    name: t('projects.blog.instagram.italy.name'),
    image: 'projects/blog/instagram/italy.png',
    description: t('projects.blog.instagram.italy.description'),
    tags: ['blog', 'mind'],
    link: 'https://www.instagram.com/p/C-V8QkRsg8Q/?img_index=1',
  },
  {
    name: t('projects.blog.instagram.reels.relationships.name'),
    image: 'projects/blog/instagram/relationships.png',
    description: t('projects.blog.instagram.reels.relationships.description'),
    tags: ['blog', 'mind'],
    link: 'https://www.instagram.com/reel/C-GIvdts-xp/',
  },
  {
    name: t('projects.blog.instagram.reels.collective-illusions.name'),
    image: 'projects/blog/instagram/collective-illusions.png',
    description: t('projects.blog.instagram.reels.collective-illusions.description'),
    tags: ['blog', 'mind'],
    link: 'https://www.instagram.com/slawomirwozniakofficial/reel/C9sDhuas6gA/',
  },
  {
    name: t('projects.blog.instagram.hiking.name'),
    image: 'projects/blog/instagram/hiking.png',
    description: t('projects.blog.instagram.hiking.description'),
    tags: ['blog', 'mind'],
    link: 'https://www.instagram.com/slawomirwozniakofficial/p/C9K9U0RMfmH/',
  },
  {
    name: t('projects.blog.instagram.notes.name'),
    image: 'projects/blog/instagram/notes.png',
    description: t('projects.blog.instagram.notes.description'),
    tags: ['blog', 'mind'],
    link: 'https://www.instagram.com/slawomirwozniakofficial/p/C6BwzvAMV0w',
  },
  {
    name: t('projects.blog.instagram.attribution.name'),
    image: 'projects/blog/instagram/attribution.png',
    description: t('projects.blog.instagram.attribution.description'),
    tags: ['blog', 'mind'],
    link: 'https://www.instagram.com/slawomirwozniakofficial/p/C5a0trssz6A/',
  },
  {
    name: t('blog.edducamp2024.title'),
    image: 'blog/edducamp/interview.png',
    description: t('blog.edducamp2024.intro1') + ' ' + t('blog.edducamp2024.intro2'),
    tags: ['blog', 'mind'],
    link: '/blog/edducamp2024',
  },
  {
    name: 'PiotrChojankowski.pl',
    image: 'projects/piotrchojankowski.png',
    description: t('projects.piotrchojankowski'),
    tags: ['business', 'portfolio', 'code'],
    link: 'https://www.piotrchojankowski.pl',
  },
  {
    name: t('projects.blog.higherEducation'),
    image: 'projects/blog/higher-education.jpg',
    tags: ['blog', 'mind'],
    link: '/blog/higher-education',
  },
  {
    name: 'eccdna.pl',
    image: 'projects/eccdna.png',
    tags: ['portfolio', 'code'],
    description: t('projects.eccdna'),
    link: 'https://eccdna.pl',
  },
  {
    name: t('blog.socialLearningTheory.title'),
    image: 'projects/blog/social-learning-theory.png',
    tags: ['blog', 'mind'],
    link: '/blog/social-learning-theory',
  },
])

const filteredItems = computed(() => {
  let baseItems = items.value

  if (props.tags?.length) {
    baseItems = baseItems.filter((item) => props.tags?.some((tag) => item.tags.includes(tag)))
  }

  if (activeFilter.value === 'all') {
    return baseItems.slice(0).reverse()
  } else {
    return baseItems
      .filter((item) => item.tags.includes(activeFilter.value))
      .reverse()
  }
})

</script>

<style scoped>
    @media (max-width: 1280px) {
      .glassmorphism-mobile {
        @apply border-2 border-[var(--border-color)] bg-gradient-to-bl from-[rgba(255,255,255,0.1)] to-transparent;
      }
    }
</style>