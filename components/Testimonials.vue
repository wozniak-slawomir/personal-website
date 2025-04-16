<template>
  <div class="container mt-32 overflow-hidden relative">
    <h2 class="text-5xl font-bold my-10 text-center md:text-left z-50">
      {{ $t('testimonials.title') }}
    </h2>
    <div class="testimonials-mask">
      <Marquee
        pause-on-hover
      >
        <div
          v-for="(testimonial, index) in topTestimonials"
          :key="index"
          class="flex flex-col w-[350px] h-full p-7 justify-between rounded-2xl glassmorphism mb-6"
        >
          <q class="text-2xl italic">
            {{ testimonial.text }}
          </q>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <p>{{ testimonial.name }}</p>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </Marquee>
      <Marquee
        pause-on-hover
        reverse
      >
        <div
          v-for="(testimonial, index) in bottomTestimonials"
          :key="index"
          class="flex flex-col w-[350px] h-full p-7 justify-between rounded-2xl glassmorphism mb-6"
        >
          <q class="text-2xl italic">
            {{ testimonial.text }}
          </q>
          <div class="flex flex-col text-[color:var(--tertiary-text-color)]">
            <p>{{ testimonial.name }}</p>
            <p>{{ testimonial.position }}{{ testimonial.company }}</p>
          </div>
        </div>
      </Marquee>
    </div>
  </div>
</template>

<script setup lang="ts">
import Marquee from './ui/marquee/Marquee.vue'
import { computed } from 'vue'
const { t } = useI18n()


const testimonials = computed(() => [
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
  {
    text: t('testimonials.chojankowski.text'),
    name: t('testimonials.chojankowski.name'),
    position: t('testimonials.chojankowski.position'),
    company: t('testimonials.chojankowski.company'),
  },
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

const topTestimonials = computed(() => testimonials.value.slice(0, testimonials.value.length / 2))
const bottomTestimonials = computed(() => testimonials.value.slice(testimonials.value.length / 2))
</script>