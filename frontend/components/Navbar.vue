<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--secondary-color)] py-5 px-16 flex justify-between items-center fixed top-0 left-0 z-20"
  >
    <img
      src="~/assets/logo.png"
      class="max-w-[400px] min-w-[100px] mr-3 md:mr-0"
      :alt="$t('alt.slawomir')"
    >
    <div class="gap-8 justify-end w-full mr-20 hidden xl:flex">
      <button
        class="p-3 px-5 text-xl rounded-full duration-150 hover:bg-[#393939]"
        @click="scroll('bio')"
      >
        {{ $t('bio.title') }}
      </button>
      <button
        class="p-3 px-5 text-xl rounded-full duration-150 hover:bg-[#393939]"
        @click="scroll('realizedProjects')"
      >
        {{ $t('projects.title') }}
      </button>
      <button
        class="p-3 px-5 text-xl rounded-full duration-150 hover:bg-[#393939]"
        @click="scroll('testimonials')"
      >
        {{ $t('testimonials.title') }}
      </button>
      <button
        class="p-3 px-5 text-xl rounded-full duration-150 hover:bg-[#393939]"
        @click="scroll('services')"
      >
        {{ $t('services.title') }}
      </button>
    </div>
    <div class="flex gap-20">
      <div
        class="p-3 bg-[#393939] cursor-pointer hover:bg-[#474b59] w-14 text-center sm:w-24 h-min z-20"
        :class="isMenuOpen ? 'rounded-t-[25px]' : 'rounded-[25px]'"
        @click=" isMenuOpen = !isMenuOpen"
      >
        <span
          class="fi fis rounded-full w-6 h-6 align-middle mx-1"
          :class="locale === 'en' ? 'fi-gb' : 'fi-' + locale"
        />
        <p class="align-middle mx-1 hidden sm:inline uppercase">
          {{ locale }}
        </p>
      </div>
      <div
        v-if="isMenuOpen"
        v-on-click-outside="() => isMenuOpen = false"
        class="absolute rounded-[25px] top-8 pt-10 pb-2 bg-[#393939] z-10 sm:w-24"
      >
        <div class="flex flex-col">
          <!-- weird bug in library -->
          <button
            v-for="item in (locales as unknown as string[])"
            :key="item"
            class="p-2 rounded-md w-14 text-center sm:text-left sm:pl-[18px] hover:font-bold sm:w-full hover:scale-110 duration-150"
            @click="changeLanguage(item)"
          >
            <span
              class="fi fis rounded-full w-6 h-6 align-middle mx-1"
              :class="item === 'en' ? 'fi-gb' : 'fi-' + item"
            />
            <span class="align-middle mx-1 hidden sm:inline uppercase">{{ item }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import { vOnClickOutside } from '@vueuse/components'
const { locales, locale, setLocale } = useI18n()

const isMenuOpen = ref(false)

const changeLanguage = (language : string) => {
  setLocale(language)
  localStorage.setItem('language', language)
  isMenuOpen.value = false
}

const sectionTopValues: { [key: string]: number } = {
  bio: 800,
  realizedProjects: 2100,
  testimonials: 2700,
  services: 3500,
}

const scroll = (section: string) => {
  const topValue = sectionTopValues[section]
  if (topValue !== undefined) {
    window.scrollTo({ top: topValue, left: 0, behavior: 'smooth' })
  }
}

</script>