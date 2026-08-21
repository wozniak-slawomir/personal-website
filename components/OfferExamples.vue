<template>
  <section v-if="examples.length" class="mb-10">
    <h2 class="text-3xl font-bold text-center mb-8">{{ t('offer.website.exampleProjects') }}</h2>
    <div :class="examples.length === 1 ? 'max-w-2xl mx-auto' : 'grid grid-cols-1 md:grid-cols-2 gap-6'">
      <a
        v-for="item in examples"
        :key="item.link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-xl overflow-hidden border border-gray-700/30 hover:border-[var(--primary-color)]/50 transition-colors block"
      >
        <div class="aspect-video overflow-hidden bg-black/20">
          <img
            :src="`/${item.offerImage}`"
            :alt="item.name"
            class="w-full h-full object-cover object-top"
          >
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: string
}>()

const { t } = useI18n()
const { items } = useContentItems()

const examples = computed(() =>
  items.value
    .filter((item) => item.tags.includes(props.tag) && item.offerImage)
    .reverse(),
)
</script>
