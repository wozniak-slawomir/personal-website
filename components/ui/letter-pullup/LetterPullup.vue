<template>
  <component 
    :is="tag"
    class="flex justify-center"
  >
    <Motion
      v-for="(letter, index) in letters"
      :key="`${letter}-${index}`"
      as="span"
      :initial="pullupVariant.initial"
      :animate="pullupVariant.animate"
      :transition="{
        delay: index * (props.delay ? props.delay : 0.05),
      }"
      :class="
        cn(
          'font-display text-center font-bold tracking-[-0.02em] text-gray-900 dark:text-white drop-shadow-sm md:text-4xl md:leading-[5rem]',
          props.className,
        )
      "
    >
      <span v-if="letter === ' '">&nbsp;</span>
      <span v-else>{{ letter }}</span>
    </Motion>
  </component>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { cn } from '@/lib/utils'

interface LetterPullupProps {
  className?: string;
  words: string;
  delay?: number;
  tag?: string;
}

const props = withDefaults(defineProps<LetterPullupProps>(), {
  delay: 0.05,
  className: '',
  tag: 'h1',
})

const letters = computed(() => props.words.split(''))

const pullupVariant = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
}
</script>
