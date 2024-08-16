<template>
  <div
    class="fixed top-0 -z-50 -skew-x-12 duration-[5s]"
    :class="isScrolling ? 'right-96' : 'right-64'"
  >
    <div
      class="h-screen w-screen fixed top-0 bg-[color:var(--primary-color)] opacity-[0.05] grayscale-[30%] animate-bgAnimationFast delay-75" 
    />
    <div
      class="h-screen w-screen fixed top-0 bg-[color:var(--primary-color)] opacity-[0.05] grayscale-[30%] animate-bgAnimationMid delay-100" 
    />
    <div
      class="h-screen w-screen fixed top-0 bg-[color:var(--primary-color)] opacity-[0.05] grayscale-[30%] animate-bgAnimationSlow delay-1000" 
    />
  </div>
  <div
    class="fixed top-0 -z-50 -skew-x-12 duration-[5s]"
    :class="isScrolling ? '-left-[70vw]' : '-left-[75vw]'"
  >
    <div
      class="h-screen w-screen fixed top-0 bg-[color:var(--primary-color)] opacity-[0.05] grayscale-[30%] animate-bgAnimationFast delay-100" 
    />
    <div
      class="h-screen w-screen fixed top-0 bg-[color:var(--primary-color)] opacity-[0.05] grayscale-[30%] animate-bgAnimationMid delay-1000" 
    />
    <div
      class="h-screen w-screen fixed top-0 bg-[color:var(--primary-color)] opacity-[0.05] grayscale-[30%] animate-bgAnimationSlow delay-200" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// isScrolling is used to trigger the amplification of the background animation for 3 seconds
const isScrolling = ref(false)

const handleScroll = () => {
  isScrolling.value = true
  setTimeout(() => {
    isScrolling.value = false
  }, 5000)
  console.log('scrolling')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Leftovers from first draft, maybe useful later

// import { ref, onMounted, onBeforeUnmount } from 'vue'

// const count = ref(100)

// const handleScroll = () => {
//   count.value++
// }

// onMounted(() => {
//   window.addEventListener('scroll', handleScroll)

//   const interval = setInterval(() => {
//     if (count.value > 0) {
//       count.value = count.value - 2
//       console.log(count.value)
//     }
//   }, 10)

//   onBeforeUnmount(() => {
//     window.removeEventListener('scroll', handleScroll)
//     clearInterval(interval)
//   })
// })
</script>

<style scoped>
@keyframes backgroundAnimation {
  0% {
    transform: skewX(0deg);
  }
  100% {
    transform: skewX(12deg);
  }
  
}
</style>