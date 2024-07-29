<template>
  <div class="overflow-hidden">
    <div class="container mt-32">
      <!-- <div
      class="h-96 w-full absolute z-10 bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)] translate-x-[-20px] mt-[136px] sm:mt-[130px] md:mt-28 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1025px] xl:max-w-[1280px] 2xl:max-w-[1536px] scale-[101%]"
    /> -->
      <h1 class="text-5xl font-bold my-10 text-center md:text-left">
        REALIZED PROJECTS
      </h1>
      <div class="flex whitespace-nowrap gap-5 justify-center lg:gap-20">
        <div
          v-for="project in projects"
          :key="project.name"
          class="bg-white flex overflow-hidden w-full min-w-[300px] aspect-[9/16] whitespace-normal rounded-2xl lg:min-w-[1100px] lg:aspect-video min-[2560px]:min-w-[1500px]"
        >
          <img
            :src="project.image"
            :alt="project.name"
            class="object-cover w-full h-full"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    name: 'Placeholder 1',
    image: '../assets/projects/placeholder1.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
  },
  {
    name: 'Hiszpanbet',
    image: '../assets/projects/hiszpanbet.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
  },
  {
    name: 'Placeholder 2',
    image: '../assets/projects/placeholder2.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies. Nullam nec purus nec libero ultricies ultricies.',
  },
]
</script>