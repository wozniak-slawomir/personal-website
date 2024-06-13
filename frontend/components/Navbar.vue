<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--secondary-color)] py-3 px-5 flex justify-between items-center fixed top-0 left-0 z-30 md:px-16 select-none"
  >
    <img
      src="~/assets/logo.png"
      class="max-w-[400px] w-full mr-3 md:mr-0"
      alt="Slawomir Wozniak"
    >
    <div class="flex">
      <div
        class="mr-5 p-3 bg-[#393939] cursor-pointer hover:bg-[#474b59] w-20 text-center sm:w-24 h-min z-20"
        :class="isMenuOpen ? 'rounded-t-[25px]' : 'rounded-[25px]'"
        @click=" isMenuOpen = !isMenuOpen"
      >
        <PhGlobe
          size="25"
          class="inline align-middle mx-1"
        />
        <p class="align-middle mx-1 hidden sm:inline uppercase">
          {{ i18next.language }}
        </p>
      </div>
      <div
        v-if="isMenuOpen"
        class="absolute rounded-[25px] top-8 pt-10 pb-2 bg-[#393939] z-10 sm:w-24"
      >
        <div class="flex flex-col">
          <button
            class="p-2 rounded-md w-20 text-center sm:text-left sm:pl-[18px] hover:font-bold sm:w-32"
            @click="changeLanguage('en')"
          >
            <PhGlobe
              size="25"
              class="hidden sm:inline align-middle mx-1"
            />
            <p class="align-middle mx-1 inline">
              EN
            </p>
          </button>
          <button
            class="p-2 rounded-md w-20 text-center sm:text-left sm:pl-[18px] hover:font-bold sm:w-32"
            @click="changeLanguage('pl')"
          >
            <PhGlobe
              size="25"
              class="hidden sm:inline align-middle mx-1"
            />
            <p class="align-middle mx-1 inline">
              PL
            </p>
          </button>
          <button
            class="p-2 rounded-md w-20 text-center sm:text-left sm:pl-[18px] hover:font-bold sm:w-32"
            @click="changeLanguage('fr')"
          >
            <PhGlobe
              size="25"
              class="hidden sm:inline align-middle mx-1"
            />
            <p class="align-middle mx-1 inline">
              FR
            </p>
          </button>
          <button
            class="p-2 rounded-md w-20 text-center sm:text-left sm:pl-[18px] hover:font-bold sm:w-32"
            @click="changeLanguage('es')"
          >
            <PhGlobe
              size="25"
              class="hidden sm:inline align-middle mx-1"
            />
            <p class="align-middle mx-1 inline">
              ES
            </p>
          </button>
        </div>
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
import i18next from 'i18next'

const isMenuOpen = ref(false)

const changeLanguage = (language: string) => {
  i18next.changeLanguage(language)
  isMenuOpen.value = false
}

</script>