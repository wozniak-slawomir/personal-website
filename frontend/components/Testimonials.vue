<template>
  <div class="container mt-32 overflow-hidden">
    <div
      class="h-[550px] w-full absolute z-10 bg-gradient-to-r from-[var(--secondary-color)] via-transparent to-[var(--secondary-color)] translate-x-[-20px] mt-[136px] sm:mt-[130px] md:mt-32 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1025px] xl:max-w-[1280px] 2xl:max-w-[1536px] scale-[101%]"
    />
    <!-- scale is set to 101% to prevent little lines on the edges that sometimes appear -->
    <h1 class="text-5xl font-bold my-10 text-center md:text-left z-50">
      {{ $t('testimonials.title') }}
    </h1>
    <div class="flex animate-slide whitespace-nowrap gap-[24px] ml-[-350px]">
      <!-- ml is set to -350px to prevent blocks from getting squished -->
      <div
        v-for="testimonial in topTestimonials"
        :key="testimonial.text"
        class="w-full inline-block whitespace-normal"
      >
        <div
          class=" flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mb-6"
        >
          <h2 class="text-2xl">
            {{ testimonial.text }}
          </h2>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </div>
      <div
        v-for="testimonial in topTestimonials"
        :key="testimonial.text"
        class="w-full inline-block whitespace-normal"
      >
        <div
          class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mb-6"
        >
          <h2 class="text-2xl">
            {{ testimonial.text }}
          </h2>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </div>
      <div
        v-for="testimonial in topTestimonials"
        :key="testimonial.text"
        class="w-full inline-block whitespace-normal"
      >
        <div
          class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939] mb-6"
        >
          <h2 class="text-2xl">
            {{ testimonial.text }}
          </h2>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex animate-slide whitespace-nowrap gap-[24px] ml-[-175px]">
      <div
        v-for="testimonial in bottomTestimonials"
        :key="testimonial.text"
        class="w-full inline-block whitespace-normal"
      >
        <div
          class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939]"
        >
          <h2 class="text-2xl">
            {{ testimonial.text }}
          </h2>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </div>
      <div
        v-for="testimonial in bottomTestimonials"
        :key="testimonial.text"
        class="w-full inline-block whitespace-normal"
      >
        <div
          class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939]"
        >
          <h2 class="text-2xl">
            {{ testimonial.text }}
          </h2>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </div>
      <div
        v-for="testimonial in bottomTestimonials"
        :key="testimonial.text"
        class="w-full inline-block whitespace-normal"
      >
        <div
          class="flex flex-col w-[350px] h-[250px] p-7 justify-between rounded-2xl bg-gradient-to-t from-[var(--secondary-color)] to-[#393939]"
        >
          <h2 class="text-2xl">
            {{ testimonial.text }}
          </h2>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const { t } = useI18n()

// the number of top and bottom testimonials should be the same, otherwise the animation will not work, in case more is needed, the animation should be adjusted
const topTestimonials = computed(() => [
    {
        text: t('testimonials.richardson.text'),
        name: t('testimonials.richardson.name'),
        position: t('testimonials.richardson.position'),
        company: t('testimonials.richardson.company'),
    },
    {
        text: t('testimonials.sobisz.text'),
        name: t('testimonials.sobisz.name'),
        position: t('testimonials.sobisz.position'),
        company: t('testimonials.sobisz.company'),
    },
    {
        text: t('testimonials.wuss.text'),
        name: t('testimonials.wuss.name'),
        position: t('testimonials.wuss.position'),
        company: t('testimonials.wuss.company'),
    },
])

const bottomTestimonials = computed(() => [
    {
        text: t('testimonials.wojcik.text'),
        name: t('testimonials.wojcik.name'),
        position: t('testimonials.wojcik.position'),
        company: t('testimonials.wojcik.company'),
    },
    {
        text: t('testimonials.swierszcz.text'),
        name: t('testimonials.swierszcz.name'),
        position: t('testimonials.swierszcz.position'),
        company: t('testimonials.swierszcz.company'),
    },
    {
        text: t('testimonials.hiszpan.text'),
        name: t('testimonials.hiszpan.name'),
        position: t('testimonials.hiszpan.position'),
        company: t('testimonials.hiszpan.company'),
    },
])
</script>