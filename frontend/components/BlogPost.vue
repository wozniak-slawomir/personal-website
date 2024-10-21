<template>
  <BackButton class="mt-36 ml-4 sm:ml-16" />
  <div class="max-w-2xl container mt-16 text-justify">
    <h1 class="text-4xl font-bold text-center">
      {{ props.title }}
    </h1>

    <div class="text-center mt-2">
      {{ props.dates }}
    </div>

    <div class="bg-[#393939] mt-16 py-4 rounded-xl px-8">
      <slot name="content" />
    </div>
    <ContactMe />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>

</style>