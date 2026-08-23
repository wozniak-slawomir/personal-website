<template>
  <div>
    <div class="container">
      <BackButton class="mt-36" />
    </div>
    <main class="max-w-2xl container mt-16 text-justify">
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
        <p class="mt-8 mb-4">
          {{ t(serviceLinkCopy.before) }}
          <NuxtLink
            :to="localePath(serviceLink.path)"
            class="underline hover:text-primary-400 transition-colors font-semibold"
          >
            {{ t(serviceLinkCopy.label) }}
          </NuxtLink>
          {{ t(serviceLinkCopy.after) }}
        </p>
      </div>
      <CTASection />
    </main>
    <LatestBlogPosts />
  </div>
</template>

<script lang="ts" setup>
import { getBlogServiceLink, SERVICE_LINK_I18N } from '~/const/blogServiceLinks'

const props = defineProps<{
    title: string
    dates: string
    tags: string[]
}>()

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const serviceLink = computed(() => getBlogServiceLink(route.path))
const serviceLinkCopy = computed(() => SERVICE_LINK_I18N[serviceLink.value.variant])
</script>