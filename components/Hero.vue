<template>
  <div class="relative container min-h-screen overflow-hidden pt-[var(--navbar-height)]">
    <div 
      class="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 ease-in-out items-center hidden md:flex"
      :class="{ 'opacity-100': hoveredSection === 'programming' }"
    >
      <NuxtImg
        src="/code-portrait.png"
        class="object-cover object-center mx-auto"
        :alt="$t('alt.portrait')"
        width="450"
        height="675"
      />
    </div>
    <div 
      class="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 ease-in-out items-center hidden md:flex"
      :class="{ 'opacity-100': hoveredSection === 'psychology' }"
    >
      <NuxtImg
        src="/portrait.png"
        class="object-cover object-center mx-auto"
        :alt="$t('alt.portrait')"
        width="450"
        height="675"
      />
    </div>

    <div class="hidden md:flex absolute inset-0 items-center justify-center z-20 pointer-events-none">
      <div class="px-6 py-2 rounded-full backdrop-blur-md bg-white/10">
        <h2 class="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3]">
          {{ $t('hero.chooseSide') }}
        </h2>
      </div>
    </div>

    <NuxtLink 
      to="/code"
      class="section programming-section absolute left-0 top-0 w-1/2 h-full z-10 transition-all duration-700 ease-in-out hidden md:block opacity-50 hover:opacity-100"
      @mouseenter="hoveredSection = 'programming'"
    >
      <div class="relative z-20 h-full flex items-center justify-start p-8 md:p-12 lg:p-16">
        <div
          class="max-w-2xl transform transition-all duration-500 ease-out"
          :class="{ '-translate-y-2': hoveredSection === 'programming' }"
        >
          <h2 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span class="text-[var(--primary-text-color)] drop-shadow-lg">CODE</span>
            <span class="text-[var(--primary-color)]">.</span>
          </h2>
          <div class="text-xl md:text-2xl mb-8 text-[var(--secondary-text-color)] font-light">
            {{ $t("hero.software.engineering") }}
          </div>
          <ul
            class="space-y-3 text-lg opacity-80 transition-opacity duration-300"
            :class="{ 'opacity-100': hoveredSection === 'programming' }"
          >
            <li class="flex items-center text-[var(--primary-text-color)]">
              <PhCheckCircle 
                class="mr-3 text-[var(--primary-color)] flex-shrink-0" 
                :size="24" 
              />
              <span>{{ $t("hero.software.feature1") }}</span>
            </li>
            <li class="flex items-center text-[var(--primary-text-color)]">
              <PhCheckCircle 
                class="mr-3 text-[var(--primary-color)] flex-shrink-0" 
                :size="24" 
              />
              <span>{{ $t("hero.software.feature2") }}</span>
            </li>
            <li class="flex items-center text-[var(--primary-text-color)]">
              <PhCheckCircle 
                class="mr-3 text-[var(--primary-color)] flex-shrink-0" 
                :size="24" 
              />
              <span>{{ $t("hero.software.feature3") }}</span>
            </li>
          </ul>
        </div>
      </div>
    </NuxtLink>

    <NuxtLink 
      to="/mind"
      class="section psychology-section absolute right-0 top-0 w-1/2 h-full z-10 transition-all duration-700 ease-in-out hidden md:block opacity-50 hover:opacity-100"
      @mouseenter="hoveredSection = 'psychology'"
    >
      <div class="relative z-20 h-full flex items-center justify-end p-8 md:p-12 lg:p-16 container">
        <div
          class="max-w-2xl text-right transform transition-all duration-500 ease-out"
          :class="{ '-translate-y-2': hoveredSection === 'psychology' }"
        >
          <h2 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span class="text-[var(--primary-text-color)] drop-shadow-lg">MIND</span>
            <span class="text-[var(--primary-color)]">.</span>
          </h2>
          <div class="text-xl md:text-2xl mb-8 text-[var(--secondary-text-color)] font-light">
            {{ $t("hero.business.psychology") }}
          </div>
          <ul
            class="space-y-3 text-lg opacity-80 transition-opacity duration-300"
            :class="{ 'opacity-100': hoveredSection === 'psychology' }"
          >
            <li class="flex items-center justify-end text-[var(--primary-text-color)]">
              <span>{{ $t("hero.psychology.feature1") }}</span>
              <PhCheckCircle 
                class="ml-3 text-[var(--primary-color)] flex-shrink-0" 
                :size="24" 
              />
            </li>
            <li class="flex items-center justify-end text-[var(--primary-text-color)]">
              <span>{{ $t("hero.psychology.feature2") }}</span>
              <PhCheckCircle 
                class="ml-3 text-[var(--primary-color)] flex-shrink-0" 
                :size="24" 
              />
            </li>
            <li class="flex items-center justify-end text-[var(--primary-text-color)]">
              <span>{{ $t("hero.psychology.feature3") }}</span>
              <PhCheckCircle 
                class="ml-3 text-[var(--primary-color)] flex-shrink-0" 
                :size="24" 
              />
            </li>
          </ul>
        </div>
      </div>
    </NuxtLink>

    <div class="md:hidden relative z-10 h-full p-4 [perspective:1000px] flex flex-col justify-between">
      <div class="relative z-10 flex flex-col justify-center space-y-8 mt-auto mb-auto">
        <div class="px-4 py-2 rounded-full backdrop-blur-md bg-white/10 mx-auto mb-4">
          <h2 class="text-center text-3xl font-bold text-[var(--primary-text-color)]">
            {{ $t('hero.chooseSide') }}
          </h2>
        </div>
        <NuxtLink 
          to="/code"
          class="mobile-card programming-card transform-gpu [transform-style:preserve-3d]"
          :class="{ 
            'active-card': hoveredSection === 'programming',
            'inactive-card': hoveredSection === 'psychology'
          }"
          @mouseenter="hoveredSection = 'programming'"
        >
          <div class="relative bg-gradient-to-br from-[var(--secondary-color)]/95 via-[var(--primary-color)]/30 to-[var(--secondary-color)]/90 backdrop-blur-lg rounded-3xl border border-[var(--primary-color)]/30 shadow-2xl overflow-hidden">
            <div class="absolute -top-4 -right-4 transform rotate-12 hover:rotate-6 transition-transform duration-500">
              <div class="relative">
                <div class="absolute inset-0 bg-[var(--primary-color)]/20 rounded-2xl blur-xl transform scale-110" />
                <NuxtImg
                  src="/code-portrait.png"
                  class="relative object-cover rounded-2xl shadow-xl"
                  :alt="$t('alt.portrait')"
                  width="130"
                  height="195"
                />
              </div>
            </div>
            
            <div class="relative z-10 p-6 transform transition-all duration-700">
              <h2 class="text-4xl font-bold mb-4 leading-tight">
                <span class="bg-gradient-to-r from-[var(--primary-text-color)] to-[var(--primary-color)] bg-clip-text text-transparent drop-shadow-lg animate-pulse-subtle">CODE</span>
                <span class="text-[var(--primary-color)] animate-bounce-subtle">.</span>
              </h2>
              
              <div class="text-lg mb-5 text-[var(--secondary-text-color)] font-light opacity-90">
                {{ $t("hero.software.engineering") }}
              </div>
              
              <ul class="space-y-3">
                <li
                  v-for="(feature, index) in ['hero.software.feature1', 'hero.software.feature2', 'hero.software.feature3']" 
                  :key="feature"
                  class="flex items-center text-[var(--primary-text-color)] transform transition-all duration-500 hover:translate-x-2"
                  :style="{ animationDelay: `${index * 200}ms` }"
                >
                  <div class="mr-3 relative">
                    <div class="absolute inset-0 bg-[var(--primary-color)]/30 rounded-full blur-sm scale-150" />
                    <PhCheckCircle 
                      class="relative text-[var(--primary-color)] flex-shrink-0 animate-pulse-glow" 
                      :size="22" 
                    />
                  </div>
                  <span class="text-sm font-medium">{{ $t(feature) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink 
          to="/mind"
          class="mobile-card psychology-card transform-gpu [transform-style:preserve-3d]"
          :class="{ 
            'active-card': hoveredSection === 'psychology',
            'inactive-card': hoveredSection === 'programming'
          }"
          @mouseenter="hoveredSection = 'psychology'"
        >
          <div class="relative bg-gradient-to-bl from-[var(--primary-color)]/90 via-[var(--secondary-color)]/30 to-[var(--primary-color)]/95 backdrop-blur-lg rounded-3xl border border-[var(--secondary-color)]/30 shadow-2xl overflow-hidden">
            <div class="absolute -top-4 -right-4 transform -rotate-12 hover:-rotate-6 transition-transform duration-500">
              <div class="relative">
                <div class="absolute inset-0 bg-[var(--secondary-color)]/20 rounded-2xl blur-xl transform scale-110" />
                <NuxtImg
                  src="/portrait.png"
                  class="relative object-cover rounded-2xl shadow-xl"
                  :alt="$t('alt.portrait')"
                  width="130"
                  height="195"
                />
              </div>
            </div>
            
            <div class="relative z-10 p-6 transform transition-all duration-700">
              <h2 class="text-4xl font-bold mb-4 leading-tight">
                <span class="bg-gradient-to-r from-[var(--primary-text-color)] to-[var(--primary-color)] bg-clip-text text-transparent drop-shadow-lg animate-pulse-subtle">MIND</span>
                <span class="text-[var(--primary-color)] animate-bounce-subtle">.</span>
              </h2>
              
              <div class="text-lg mb-5 text-[var(--secondary-text-color)] font-light opacity-90">
                {{ $t("hero.business.psychology") }}
              </div>
              
              <ul class="space-y-3">
                <li
                  v-for="(feature, index) in ['hero.psychology.feature1', 'hero.psychology.feature2', 'hero.psychology.feature3']" 
                  :key="feature"
                  class="flex items-center text-[var(--primary-text-color)] transform transition-all duration-500 hover:translate-x-2"
                  :style="{ animationDelay: `${index * 200}ms` }"
                >
                  <div class="mr-3 relative">
                    <div class="absolute inset-0 bg-[var(--primary-color)]/30 rounded-full blur-sm scale-150" />
                    <PhCheckCircle 
                      class="relative text-[var(--primary-color)] flex-shrink-0 animate-pulse-glow" 
                      :size="22" 
                    />
                  </div>
                  <span class="text-sm font-medium">{{ $t(feature) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-8 mb-4 text-center">
        <button
          class="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3] text-black transition-all duration-500 shadow-2xl"
          @click="onContactClick"
        >
          {{ $t("common.contact") }}
        </button>
      </div>
    </div>

    <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
      <button
        class="px-12 py-4 rounded-full font-semibold bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3] text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:opacity-50 hidden md:block animate-[float-button_4s_ease-in-out_infinite] origin-center hover:translate-y-[-8px]"
        @click="onContactClick"
      >
        {{ $t("common.contact") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCheckCircle } from '@phosphor-icons/vue'
import { provide, ref } from 'vue'
const { $event } = useNuxtApp()

provide('weight', 'fill')

const hoveredSection = ref<'programming' | 'psychology'>('programming')

const onContactClick = () => {
  $event('ContactModal:Open')
}
</script>

<style lang="css" scoped>
.mobile-card {
  transform: translateZ(0) rotateX(2deg) rotateY(-2deg);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation: float 6s ease-in-out infinite;
}

.mobile-card:nth-child(odd) {
  animation-delay: -3s;
}

.mobile-card.active-card {
  transform: translateZ(20px) rotateX(0deg) rotateY(0deg) scale(1.02);
  filter: brightness(1.1);
}

.mobile-card.inactive-card {
  transform: translateZ(-10px) rotateX(4deg) rotateY(-4deg) scale(0.98);
  opacity: 0.8;
}

@keyframes float {
  0%, 100% { transform: translateZ(0) rotateX(2deg) rotateY(-2deg) translateY(0px); }
  50% { transform: translateZ(0) rotateX(2deg) rotateY(-2deg) translateY(-10px); }
}

@keyframes float-button {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
  50% { filter: drop-shadow(0 0 10px currentColor); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Mobile font adjustments */
@media screen and (max-width: 480px) {
  .mobile-card h2 {
    font-size: 2.5rem !important;
  }
  
  .mobile-card .text-lg {
    font-size: 1rem !important;
  }
  
  .mobile-card .text-sm {
    font-size: 0.875rem !important;
  }
}
</style>