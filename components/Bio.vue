<template>
  <div class="container mt-32">
    <!-- Header Section with Photo -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-12 lg:mb-0">
      <div class="lg:col-span-2 order-2 lg:order-1">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left leading-tight">
          {{ bioTitle }}
        </h2>
        <p class="text-xl md:text-2xl leading-relaxed mt-6 text-[var(--secondary-text-color)]">
          {{ $t('bio.intro') }}
        </p>
      </div>
      <div class="flex justify-center lg:justify-end order-1 lg:order-2">
        <div class="relative">
          <div class="absolute -inset-1 rounded-2xl blur opacity-30" />
          <NuxtPicture
            src="/bio/me-bio.png"
            :alt="$t('alt.slawomir')"
            class="relative rounded-2xl shadow-2xl max-w-[280px] md:max-w-[320px] w-full"
            :img-attrs="{
              class: 'rounded-2xl'
            }"
          />
        </div>
      </div>
    </div>
    
    <!-- Story Section -->
    <div class="glassmorphism rounded-2xl p-8 md:p-12 shadow-xl">
      <div class="max-w-4xl mx-auto space-y-8">
        <div class="text-lg md:text-xl leading-relaxed space-y-6 text-[var(--secondary-text-color)]">
          <p>
            {{ $t('bio.story1') }}
          </p>
          <p>
            {{ $t('bio.story2') }}
          </p>
          <p>
            {{ $t('bio.story3') }}
          </p>
        </div>

        <!-- Authority Section -->
        <div class="mt-12 pt-8 border-t border-gray-700">
           <div class="flex flex-col md:flex-row gap-8 items-center">
             <div class="w-full md:w-1/3">
                <NuxtPicture
                  src="/bio/z-grzesiakiem.jpeg"
                  alt="Mateusz Grzesiak"
                  class="rounded-xl shadow-lg w-full"
                  :img-attrs="{ class: 'rounded-xl' }"
                />
             </div>
             <div class="w-full md:w-2/3">
               <p class="text-lg md:text-xl leading-relaxed text-[var(--secondary-text-color)] italic">
                 "{{ $t('bio.authority.description') }}"
               </p>
             </div>
           </div>
        </div>

        <!-- Intercultural Section -->
        <div class="mt-12 pt-8 border-t border-gray-700">
           <div class="flex flex-col gap-8">
             <div class="flex flex-col md:flex-row gap-8 items-center">
               <div class="w-full md:w-2/3 order-2 md:order-1">
                 <p class="text-lg md:text-xl leading-relaxed text-[var(--secondary-text-color)]">
                   {{ $t('bio.intercultural.description1') }}
                 </p>
               </div>
               <div class="w-full md:w-1/3 order-1 md:order-2">
                  <NuxtPicture
                    src="/bio/maroko.jpeg"
                    alt="Maroko"
                    class="rounded-xl shadow-lg w-full"
                    :img-attrs="{ class: 'rounded-xl' }"
                  />
               </div>
             </div>
             
             <div class="flex flex-col md:flex-row gap-8 items-center">
               <div class="w-full md:w-1/3">
                  <NuxtPicture
                    src="/bio/szwajcaria.jpeg"
                    alt="Szwajcaria"
                    class="rounded-xl shadow-lg w-full"
                    :img-attrs="{ class: 'rounded-xl' }"
                  />
               </div>
               <div class="w-full md:w-2/3">
                 <p class="text-lg md:text-xl leading-relaxed text-[var(--secondary-text-color)]">
                   {{ $t('bio.intercultural.description2') }}
                 </p>
               </div>
             </div>
           </div>
        </div>

        <!-- Public Speaking Section -->
        <div class="mt-12 pt-8 border-t border-gray-700">
           <div class="flex flex-col gap-8">
             <div class="flex flex-col md:flex-row gap-8 items-center">
               <div class="w-full md:w-1/3">
                  <NuxtPicture
                    src="/bio/edducamp-wystapienie.jpeg"
                    alt="Wystąpienie Edducamp"
                    class="rounded-xl shadow-lg w-full"
                    :img-attrs="{ class: 'rounded-xl' }"
                  />
               </div>
               <div class="w-full md:w-2/3">
                 <p class="text-lg md:text-xl leading-relaxed text-[var(--secondary-text-color)]">
                   {{ $t('bio.public_speaking.description1') }}
                 </p>
               </div>
             </div>
             
             <div class="flex flex-col md:flex-row gap-8 items-center">
               <div class="w-full md:w-2/3 order-2 md:order-1">
                 <p class="text-lg md:text-xl leading-relaxed text-[var(--secondary-text-color)]">
                   {{ $t('bio.public_speaking.description2') }}
                 </p>
               </div>
               <div class="w-full md:w-1/3 order-1 md:order-2">
                  <NuxtPicture
                    src="/bio/pitch-dating.jpeg"
                    alt="Pitch Dating"
                    class="rounded-xl shadow-lg w-full"
                    :img-attrs="{ class: 'rounded-xl' }"
                  />
               </div>
             </div>
           </div>
        </div>

        <!-- Higher Education Section -->
        <div class="mt-12 pt-8 border-t border-gray-700">
           <div class="flex flex-col md:flex-row gap-8 items-center">
             <div class="w-full md:w-1/3">
                <NuxtPicture
                  src="/bio/psychologia-w-biznesie.jpg"
                  alt="Psychologia w biznesie"
                  class="rounded-xl shadow-lg w-full"
                  :img-attrs="{ class: 'rounded-xl' }"
                />
             </div>
             <div class="w-full md:w-2/3 space-y-6">
               <p class="text-lg md:text-xl leading-relaxed text-[var(--secondary-text-color)]">
                 {{ $t('bio.education.description1') }}
               </p>
               <p class="text-lg md:text-xl leading-relaxed text-[var(--secondary-text-color)]">
                 {{ $t('bio.education.description2') }}
               </p>
             </div>
           </div>
        </div>

        <!-- Benefits Section -->
        <div class="mt-12 pt-8 border-t border-gray-700">
          <h3 class="text-2xl md:text-3xl font-bold mb-8 text-center">
            {{ $t('bio.benefits.title') }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-gray-700/50 hover:border-[var(--primary-color)]/50 transition-colors">
              <div class="flex items-center gap-3 mb-3">
                <PhShieldCheck 
                  class="text-[var(--primary-color)] flex-shrink-0" 
                  :size="28" 
                  weight="fill"
                />
                <span class="font-semibold text-lg">{{ $t('bio.benefits.security.title') }}</span>
              </div>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t('bio.benefits.security.description') }}
              </p>
            </div>
            <div class="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-gray-700/50 hover:border-[var(--primary-color)]/50 transition-colors">
              <div class="flex items-center gap-3 mb-3">
                <PhLightning 
                  class="text-[var(--primary-color)] flex-shrink-0" 
                  :size="28" 
                  weight="fill"
                />
                <span class="font-semibold text-lg">{{ $t('bio.benefits.agency.title') }}</span>
              </div>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t('bio.benefits.agency.description') }}
              </p>
            </div>
            <div class="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-gray-700/50 hover:border-[var(--primary-color)]/50 transition-colors">
              <div class="flex items-center gap-3 mb-3">
                <PhHandshake 
                  class="text-[var(--primary-color)] flex-shrink-0" 
                  :size="28" 
                  weight="fill"
                />
                <span class="font-semibold text-lg">{{ $t('bio.benefits.understanding.title') }}</span>
              </div>
              <p class="text-[var(--secondary-text-color)]">
                {{ $t('bio.benefits.understanding.description') }}
              </p>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-12 pt-8 border-t border-gray-700 text-center">
          <p class="text-xl md:text-2xl leading-relaxed font-medium mb-8">
            {{ $t('bio.cta') }}
          </p>
          <button
            class="px-10 md:px-14 py-4 md:py-5 rounded-full font-semibold text-lg bg-gradient-to-r from-[var(--primary-color)] to-[#f3eba3] text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:opacity-50"
            @click="onContactClick"
          >
            {{ $t("common.contact") }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PhShieldCheck, PhLightning, PhHandshake } from '@phosphor-icons/vue'

const { t } = useI18n()
const { $event } = useNuxtApp()

const bioTitle = computed(() => {
  return t('bio.title.programming')
})

const onContactClick = () => {
  $event('ContactModal:Open')
}
</script>