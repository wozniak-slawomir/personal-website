<template>
  <div class="container mt-32 mb-20">
    <BackButton class="mb-6" />
    <h1 class="text-5xl font-bold my-10 text-center uppercase">
      {{ $t('projects.filter.blog') }}
    </h1>
    <p class="text-center text-xl text-[var(--secondary-text-color)] max-w-2xl mb-12 mx-auto">
      {{ $t('blog.subtitle') }}
    </p>
    <div class="flex flex-col gap-10 max-w-4xl mx-auto">
      <article
        v-for="item in blogItems"
        :key="item.name"
        class="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--primary-color)]/30"
      >
        <NuxtLink :to="getItemLink(item.link)" class="flex flex-col md:flex-row h-full">
           <!-- Content Section (Left) -->
           <div class="flex-1 flex flex-col justify-center items-start p-8 text-left order-2 md:order-1 relative z-10 bg-[var(--card-bg)]">
              <h2 class="text-2xl md:text-3xl font-bold uppercase mb-4 drop-shadow-sm group-hover:text-[var(--primary-color)] transition-colors">
                {{ item.name }}
              </h2>
              <p v-if="item.description" class="text-[var(--secondary-text-color)] text-base md:text-lg max-w-lg line-clamp-3">
                {{ item.description }}
              </p>
           </div>

           <!-- Image Section (Right) -->
           <div class="w-full md:w-2/5 h-64 md:h-auto order-1 md:order-2 overflow-hidden relative">
             <div class="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent md:hidden z-10"></div> <!-- Mobile gradient for blend -->
             <NuxtPicture
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                width="800"
                height="600"
                :imgAttrs="{ class: 'w-full h-full object-cover' }"
              />
           </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { items } = useContentItems()

const getItemLink = (link: string) => {
  // External links start with http(s) - use as-is
  if (link.startsWith('http')) return link
  // Internal links - wrap with localePath
  return localePath(link)
}

const blogItems = computed(() => {
  return items.value
    .filter(item => item.tags.includes('blog'))
    .reverse()
})
</script>
