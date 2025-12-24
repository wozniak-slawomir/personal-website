<template>
  <div>
    <div class="container">
      <BackButton class="mt-36" />
    </div>
    <div class="max-w-2xl container mt-16 text-justify">
      <h1 class="text-4xl font-bold text-center">
        {{ props.title }}
      </h1>

      <div class="text-center mt-2">
        {{ props.dates }}
      </div>

      <div class="text-center mt-2">
        {{ props.tags.map(el => `#${el}`).join(' ') }}
      </div>

      <div class="glassmorphism mt-16 py-4 rounded-xl px-8">
        <slot name="content" />
      </div>
      <CTASection />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string
    dates: string
    tags: string[]
}>()
</script>

<style lang="scss" scoped>

</style>