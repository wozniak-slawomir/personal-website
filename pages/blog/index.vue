<template>
  <div class="container mt-32 mb-20">
    <h1 class="text-5xl font-bold my-10 text-center uppercase md:text-left">
      {{ $t('projects.filter.blog') }}
    </h1>
    <div class="flex flex-col gap-10 max-w-4xl mx-auto">
      <div
        v-for="item in blogItems"
        :key="item.name"
        class="relative rounded-2xl overflow-hidden group min-h-fit w-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <NuxtLink :to="item.link" class="block relative">
           <NuxtPicture
              :src="item.image"
              :alt="item.name"
              class="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              width="1200"
              height="400"
            />
            <div
              class="absolute bottom-0 left-0 right-0 p-4 md:p-8
              bg-gradient-to-t from-black/90 via-black/60 to-transparent
              flex flex-col justify-end h-full"
            >
              <h2 class="text-sm md:text-3xl font-bold text-white uppercase mb-2 md:mb-4 drop-shadow-md">
                {{ item.name }}
              </h2>
              <p v-if="item.description" class="text-white text-xs md:text-lg max-w-3xl drop-shadow-sm line-clamp-1">
                {{ item.description }}
              </p>
            </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { items } = useContentItems()

const blogItems = computed(() => {
  return items.value
    .filter(item => item.tags.includes('blog'))
    .reverse()
})
</script>
