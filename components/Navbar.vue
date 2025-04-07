<template>
  <nav
    class="w-full h-[var(--navbar-height)] bg-[color:var(--secondary-color)] py-5 flex fixed top-0 z-20"
  >
    <div class="container justify-between items-center flex">
      <NuxtImg
        src="/logo.png"
        class="max-w-[400px] min-w-[100px] mr-3 md:mr-0"
        :alt="$t('alt.slawomir')"
        width="400"
        height="30"
      />
      <div class="flex">
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
              v-for="item in (locales)"
              :key="item.code"
              class="p-2 rounded-md w-14 text-center sm:text-left sm:pl-[18px] hover:font-bold sm:w-full hover:scale-110 duration-150"
              @click="changeLanguage(item.code)"
            >
              <span
                class="fi fis rounded-full w-6 h-6 align-middle mx-1"
                :class="item.code === 'en' ? 'fi-gb' : 'fi-' + item.code.toLowerCase()"
              />
              <span class="align-middle mx-1 hidden sm:inline uppercase">{{ item.code }}</span>
            </button>
          </div>
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

const changeLanguage = (language: typeof locale.value) => {
  setLocale(language)
  localStorage.setItem('language', language)
  isMenuOpen.value = false
}
</script>