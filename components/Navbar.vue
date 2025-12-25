<template>
  <nav class="transition-all w-full h-[var(--navbar-height)] py-5 flex fixed top-0 z-20"
    :class="{ 'bg-[linear-gradient(to_bottom,var(--secondary-color)_0%,rgba(0,0,0,0.4)_70%,transparent_100%)]': navbarDarker }">
    <div class="scroll-progress-bar" />
    <div class="container justify-between items-center flex">
      <NuxtLink to="/">
        <NuxtPicture src="/logo.png" class="max-w-full md:max-w-[425px] min-w-[100px]" preload :alt="$t('alt.slawomir')"
          width="425" height="30" />
      </NuxtLink>
      <div class="flex items-center gap-4 relative">
        <div class="hidden xl:flex items-center gap-4">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to"
            class="hover:text-[var(--primary-color)] transition-colors duration-300 font-semibold text-sm uppercase"
            :class="{ 'text-[var(--primary-color)]': isActive(link.to) }">
            {{ link.label }}
          </NuxtLink>

          <!-- Social Media Icons - subtle and secondary -->
          <div class="flex items-center gap-2 ml-2 border-l border-gray-700 pl-4">
            <a href="https://www.linkedin.com/in/wozniak-slawomir" aria-label="Linkedin" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhLinkedinLogo :size="20" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582978407745" aria-label="Facebook" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhFacebookLogo :size="20" />
            </a>
            <a href="https://www.instagram.com/slawomirwozniakofficial/" aria-label="Instagram" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhInstagramLogo :size="20" />
            </a>
            <a href="https://tiktok.com/@slawomirwozniakofficial" aria-label="TikTok" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhTiktokLogo :size="20" />
            </a>
            <a href="https://youtube.com/@SlawomirWozniakOfficial" aria-label="YouTube" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhYoutubeLogo :size="20" />
            </a>
          </div>

          <!-- Newsletter CTA - appears when navbar is sticky -->
          <NuxtLink v-if="navbarDarker" to="/newsletter"
            class="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3] text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] active:opacity-50 text-sm uppercase">
            {{ $t('navbar.newsletter') }}
          </NuxtLink>
        </div>

        <button ref="mobileNavButton" type="button"
          class="xl:hidden p-3 ml-2 rounded-full border border-gray-700 hover:border-white transition-colors duration-300"
          :aria-expanded="isNavMenuOpen" aria-controls="mobile-nav" @click="isNavMenuOpen = !isNavMenuOpen">
          <span class="sr-only">Toggle navigation</span>
          <span class="block w-5 h-0.5 bg-white transition-transform duration-300"
            :class="isNavMenuOpen ? 'translate-y-[6px] rotate-45' : ''" />
          <span class="block w-5 h-0.5 bg-white my-1 transition-opacity duration-300"
            :class="isNavMenuOpen ? 'opacity-0' : 'opacity-100'" />
          <span class="block w-5 h-0.5 bg-white transition-transform duration-300"
            :class="isNavMenuOpen ? '-translate-y-[6px] -rotate-45' : ''" />
        </button>
        <div class="relative hidden xl:block">
          <div class="p-1.5 bg-[#393939] cursor-pointer hover:bg-[#474b59] w-auto min-w-[36px] text-center h-min z-20 flex items-center justify-center"
            :class="isMenuOpen ? 'rounded-t-[18px]' : 'rounded-[18px]'" @click="isMenuOpen = !isMenuOpen">
            <img :src="`/flags/${locale === 'en' ? 'gb' : locale}.svg`" :alt="`${locale === 'en' ? 'gb' : locale} flag`"
              class="rounded-full w-5 h-5 align-middle select-none" />
          </div>
          <div v-if="isMenuOpen" v-on-click-outside="() => isMenuOpen = false"
            class="absolute rounded-b-[18px] top-full right-0 pt-1 pb-1 bg-[#393939] z-30 w-[36px] -mt-1 flex flex-col items-center shadow-lg overflow-hidden">
            <div class="flex flex-col w-full">
              <button v-for="item in (locales)" :key="item.code"
                class="p-1.5 w-full hover:bg-[#505463] transition-colors duration-150 flex justify-center"
                @click="changeLanguage(item.code)">
                <img :src="`/flags/${item.code === 'en' ? 'gb' : item.code.toLowerCase()}.svg`"
                  :alt="`${item.code === 'en' ? 'gb' : item.code.toLowerCase()} flag`"
                  class="rounded-full w-5 h-5 align-middle select-none" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isNavMenuOpen" id="mobile-nav" class="xl:hidden absolute left-0 right-0 top-[calc(100%+1rem)] z-10">
        <div class="rounded-2xl border border-gray-700 bg-[#1a1a1a]/95 backdrop-blur p-4 flex flex-col gap-2 shadow-xl">
          <NuxtLink v-for="link in navLinks" :key="`mobile-${link.to}`" :to="link.to"
            class="uppercase text-sm font-semibold py-2 px-3 rounded-xl hover:text-[var(--primary-color)] transition-colors duration-200"
            :class="{ 'text-[var(--primary-color)]': isActive(link.to) }" @click="isNavMenuOpen = false">
            {{ link.label }}
          </NuxtLink>

          <!-- Newsletter CTA for mobile - always visible -->
          <NuxtLink to="/newsletter"
            class="w-full px-4 py-3 mt-2 rounded-xl font-semibold bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3] text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] active:opacity-50 text-sm uppercase text-center"
            @click="isNavMenuOpen = false">
            {{ $t('navbar.newsletter') }}
          </NuxtLink>

          <div class="border-t border-gray-700 my-2"></div>

          <!-- Social Media Icons for mobile -->
          <div class="flex justify-center gap-4 py-2">
            <a href="https://www.linkedin.com/in/wozniak-slawomir" aria-label="Linkedin" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhLinkedinLogo :size="24" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582978407745" aria-label="Facebook" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhFacebookLogo :size="24" />
            </a>
            <a href="https://www.instagram.com/slawomirwozniakofficial/" aria-label="Instagram" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhInstagramLogo :size="24" />
            </a>
            <a href="https://tiktok.com/@slawomirwozniakofficial" aria-label="TikTok" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhTiktokLogo :size="24" />
            </a>
            <a href="https://youtube.com/@SlawomirWozniakOfficial" aria-label="YouTube" target="_blank"
              class="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300">
              <PhYoutubeLogo :size="24" />
            </a>
          </div>

          <div class="border-t border-gray-700 my-2"></div>

          <div class="flex flex-col gap-1">
            <span class="text-xs uppercase text-gray-400 px-3 py-1">{{ $t('navbar.language') }}</span>
            <button v-for="item in locales" :key="`mobile-${item.code}`"
              class="flex items-center gap-3 py-2 px-3 rounded-xl hover:text-[var(--primary-color)] transition-colors duration-200 text-sm"
              :class="{ 'text-[var(--primary-color)]': locale === item.code }"
              @click="changeLanguage(item.code); isNavMenuOpen = false">
              <img :src="`/flags/${item.code === 'en' ? 'gb' : item.code.toLowerCase()}.svg`"
                :alt="`${item.code === 'en' ? 'gb' : item.code.toLowerCase()} flag`" class="rounded-full w-5 h-5" />
              <span class="uppercase">{{ item.code === 'en' ? 'English' : item.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import { PhInstagramLogo, PhLinkedinLogo, PhTiktokLogo, PhYoutubeLogo, PhFacebookLogo } from '@phosphor-icons/vue'

const { locales, locale, setLocale, t } = useI18n()
const route = useRoute()


const isMenuOpen = ref(false)
const isNavMenuOpen = ref(false)
const scrollPosition = ref(0)
const navbarDarker = ref(false)
const mobileNavButton = ref<HTMLButtonElement | null>(null)

const navLinks = computed(() => [
  { to: '/portfolio', label: t('navbar.portfolio') },
  { to: '/blog', label: t('navbar.blog') },
  { to: '/wizja', label: t('navbar.vision') },
  { to: '/bio', label: t('navbar.bio') },
  { to: '/contact', label: t('common.contact') },
])

const changeLanguage = (language: typeof locale.value) => {
  setLocale(language)
  localStorage.setItem('language', language)
  isMenuOpen.value = false
  isNavMenuOpen.value = false
}

const isActive = (path: string) => route.path === path



const handleClickOutside = (event: Event) => {
  if (!isNavMenuOpen.value) return

  const target = event.target as Element
  const mobileNav = document.getElementById('mobile-nav')
  const button = mobileNavButton.value

  if (mobileNav && !mobileNav.contains(target) && button && !button.contains(target)) {
    isNavMenuOpen.value = false
  }
}

const updateScroll = () => {
  scrollPosition.value = window.scrollY
  navbarDarker.value = scrollPosition.value > 100
  const scrollHeight = document.body.scrollHeight - window.innerHeight
  const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) : 0
  document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`)
}

watch(() => route.fullPath, () => {
  isNavMenuOpen.value = false
  isMenuOpen.value = false
})

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
  document.addEventListener('click', handleClickOutside)
  updateScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  document.removeEventListener('click', handleClickOutside)
})

</script>

<style lang="css" scoped>
.scroll-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: var(--scroll-progress, 0%);
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
  transition: width 0.2s ease;
  z-index: 30;
}
</style>