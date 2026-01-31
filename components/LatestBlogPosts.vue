<template>
  <div class="container mt-32 mb-20">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
      <h2 class="text-5xl font-bold text-center md:text-left">
        {{ $t('latestPosts.title') }}
      </h2>
      <NuxtLink 
        :to="localePath('/blog')" 
        class="mt-4 md:mt-0 text-[var(--primary-color)] hover:underline transition-colors flex items-center gap-2 justify-center md:justify-start"
      >
        {{ $t('latestPosts.viewAll') }}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </NuxtLink>
    </div>
    
    <div class="relative group/carousel">
      <!-- Left Arrow -->
      <button 
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[var(--card-bg)]/90 hover:bg-[var(--primary-color)] text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 -translate-x-1/2 hover:scale-110"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <!-- Right Arrow -->
      <button 
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[var(--card-bg)]/90 hover:bg-[var(--primary-color)] text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 translate-x-1/2 hover:scale-110"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>

      <div 
        ref="scrollContainer"
        class="flex gap-6 overflow-x-auto pb-4 scroll-smooth cursor-grab active:cursor-grabbing"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
      >
        <NuxtLink
          v-for="(post, index) in latestBlogPosts"
          :key="index"
          :to="getPostLink(post.link)"
          class="group flex flex-col min-w-[320px] max-w-[320px] h-[400px] rounded-2xl glassmorphism overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl select-none"
          @click="handleCardClick"
        >
          <!-- Image Section -->
          <div class="w-full h-44 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent z-10 opacity-30"></div>
            <NuxtPicture
              :src="post.image"
              :alt="post.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
              width="320"
              height="176"
              :imgAttrs="{ class: 'w-full h-full object-cover' }"
            />
          </div>
          
          <!-- Content Section -->
          <div class="flex flex-col flex-1 p-6 justify-between">
            <div>
              <h3 class="text-xl font-bold mb-3 line-clamp-2 text-white group-hover:text-[var(--primary-color)] transition-colors">
                {{ post.name }}
              </h3>
              <p v-if="post.description" class="text-[var(--secondary-text-color)] text-sm line-clamp-3">
                {{ post.description }}
              </p>
            </div>
            
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
              <span class="text-[var(--primary-color)] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                {{ $t('latestPosts.readMore') }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const localePath = useLocalePath()
const { items } = useContentItems()

const scrollContainer = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeftPos = ref(0)
const hasDragged = ref(false)

const getPostLink = (link: string) => {
  if (link.startsWith('http')) return link
  return localePath(link)
}

const latestBlogPosts = computed(() => {
  return items.value
    .filter(item => item.tags.includes('blog'))
    .reverse()
    .slice(0, 8)
})

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -340, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 340, behavior: 'smooth' })
  }
}

const startDrag = (e: MouseEvent) => {
  if (!scrollContainer.value) return
  isDragging.value = true
  hasDragged.value = false
  startX.value = e.pageX - scrollContainer.value.offsetLeft
  scrollLeftPos.value = scrollContainer.value.scrollLeft
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !scrollContainer.value) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX.value) * 1.5
  if (Math.abs(walk) > 5) hasDragged.value = true
  scrollContainer.value.scrollLeft = scrollLeftPos.value - walk
}

const endDrag = () => {
  isDragging.value = false
}

const handleCardClick = (e: MouseEvent) => {
  if (hasDragged.value) {
    e.preventDefault()
  }
}
</script>

<style scoped>
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
div[class*="overflow-x-auto"] {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
div[class*="overflow-x-auto"]::-webkit-scrollbar {
  display: none;
}
</style>
