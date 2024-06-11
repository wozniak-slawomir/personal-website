<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--secondary-color)] py-3 px-5 flex justify-center md:justify-between items-center fixed top-0 left-0 z-20 md:px-16"
  >
    <img
      :src="getImageUrl('logo.png')"
      class="max-w-[400px] w-full mr-20 md:mr-0"
      alt="Slawomir Wozniak"
    >
    <div class="flex">
      <div
        class="mr-5 p-3 bg-[#393939] rounded-full duration-300 md:duration-200 delay-[400ms] cursor-pointer w-20 text-center md:w-32 lg:inline-block fixed top-72 right-[-75px] md:right-[-13px] lg:static border-8 border-[color:var(--secondary-color)] pr-32 lg:pr-3 h-min"
        :class="!isMenuOpen ? 'translate-x-28 md:scale-0' : 'lg:translate-x-36'"
        @click="spaChoice"
      >
        <PhGlobe
          size="25"
          class="hidden lg:inline align-middle mx-1"
        />
        <p class="inline align-middle mx-1">
          SPA
        </p>
      </div>
      <div
        class="mr-5 p-3 bg-[#393939] rounded-full duration-300 md:duration-200 delay-300 cursor-pointer w-20 text-center md:w-32 lg:inline-block fixed top-56 right-[-75px] md:right-[-13px] lg:static border-8 border-[color:var(--secondary-color)] pr-32 lg:pr-3 h-min"
        :class="!isMenuOpen ? 'translate-x-28 md:scale-0' : 'lg:translate-x-36'"
        @click="freChoice"
      >
        <PhGlobe
          size="25"
          class="hidden lg:inline align-middle mx-1"
        />
        <p class="inline align-middle mx-1">
          FRE
        </p>
      </div>
      <div
        class="mr-5 p-3 bg-[#393939] rounded-full duration-300 md:duration-200 delay-200 cursor-pointer w-20 text-center md:w-32 lg:inline-block fixed top-40 right-[-75px] md:right-[-13px] lg:static border-8 border-[color:var(--secondary-color)] pr-32 lg:pr-3 h-min"
        :class="!isMenuOpen ? 'translate-x-28 md:scale-0' : 'lg:translate-x-36'"
        @click="polChoice"
      >
        <PhGlobe
          size="25"
          class="hidden lg:inline align-middle mx-1"
        />
        <p class="inline align-middle mx-1">
          POL
        </p>
      </div>
      <div
        class="mr-5 p-3 bg-[#393939] rounded-full duration-300 md:duration-200 delay-100 cursor-pointer w-20 text-center lg:w-32 lg:inline-block fixed top-24 right-[-75px] md:right-[-13px] lg:static border-8 border-[color:var(--secondary-color)] pr-32 lg:pr-3 h-min"
        :class="!isMenuOpen ? 'translate-x-28 md:scale-0' : 'lg:translate-x-36'"
        @click="engChoice"
      >
        <PhGlobe
          size="25"
          class="hidden lg:inline align-middle mx-1"
        />
        <p class="inline align-middle mx-1">
          ENG
        </p>
      </div>
      <div
        class="mr-5 p-3 bg-[#393939] rounded-full duration-200 cursor-pointer inline-block hover:bg-[#474b59] w-20 text-center lg:w-32 fixed right-0 top-[10px] md:static border-8 border-[color:var(--secondary-color)] h-min"
        :class="isMenuOpen ? 'lg:scale-0' : ''"
        @click=" isMenuOpen = !isMenuOpen"
      >
        <PhGlobe
          size="25"
          class="hidden lg:inline align-middle mx-1"
        />
        <p class="align-middle mx-1 inline">
          {{ activeLang }}
        </p>
      </div>
      <!-- <button @click="$emit('showContactModal')"
        class="px-8 py-5 rounded-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-[color:var(--secondary-color)] hidden md:inline-block font-semibold bg-[image:var(--primary-gradient)] text-black transition-all transform-gpu hover:-translate-y-1 hover:bg-[image:var(--secondary-gradient)] active:opacity-50 duration-300">
        Contact me
      </button> -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import { PhGlobe } from '@phosphor-icons/vue'
import { ref } from 'vue'

const getImageUrl = (name: string) => {
  return new URL(`./assets/images/${name}`, import.meta.url).href
}

const isMenuOpen = ref(false)
const activeLang = ref('ENG')

const engChoice = () => {
  activeLang.value = 'ENG'
  isMenuOpen.value = false
}

const polChoice = () => {
  activeLang.value = 'POL'
  isMenuOpen.value = false
}

const freChoice = () => {
  activeLang.value = 'FRE'
  isMenuOpen.value = false
}

const spaChoice = () => {
  activeLang.value = 'SPA'
  isMenuOpen.value = false
}
</script>