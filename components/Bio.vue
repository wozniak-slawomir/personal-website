<template>
  <div class="container mt-32">
    <h2 class="text-5xl font-bold text-center md:text-left">
      {{ bioTitle }}
    </h2>
    
    <div class="mt-10">
      <h3 class="text-3xl font-bold mb-6">
        {{ $t('bio.menu.story') }}
      </h3>
      <div class="glassmorphism rounded-2xl w-12/12 flex justify-between flex-col p-8 shadow">
        <div class="space-y-12">
          <div class="relative">
            <NuxtPicture
              width="300"
              height="225"
              src="/bio/spain.jpg"
              :alt="$t('alt.spain')"
              class="float-right ml-6 mb-4 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
            />
            <div class="text-lg leading-relaxed space-y-4">
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
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-600" />
            </div>
            <div class="relative flex justify-center">
              <span class="bg-[#1a1a1a] px-4 text-gray-400">•••</span>
            </div>
          </div>

          <div class="relative">
            <NuxtPicture
              width="200"
              height="250"
              src="/bio/book.jpg"
              :alt="$t('alt.book')"
              class="float-left mr-6 mb-4 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            />
            <div class="text-lg leading-relaxed space-y-4">
              <p>
                {{ $t('bio.story4') }}
              </p>
              <p>
                {{ $t('bio.story5') }}
              </p>
              <p>
                {{ $t('bio.story6') }} 
                <a
                  href="https://www.instagram.com/slawomirwozniakofficial/"
                  target="_blank"
                  class="text-blue-400 underline hover:text-blue-300 transition-colors"
                >
                  instagram
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <h3 class="text-3xl font-bold mb-6">
        {{ $t('bio.menu.achievements') }}
      </h3>
      <div class="glassmorphism rounded-2xl w-12/12 flex justify-between flex-col p-8 shadow">
        <ul class="list-disc pl-3">
          <li
            v-for="achievement in achievements"
            :key="achievement"
          >
            {{ achievement }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-10">
      <h3 class="text-3xl font-bold mb-6">
        {{ $t('bio.menu.personal.life') }}
      </h3>
      <div class="glassmorphism rounded-2xl w-12/12 flex justify-between flex-col p-8 shadow">
        <h3 class="font-bold text-3xl mb-8 text-center">
          {{ $t('bio.personal.life1') }}
        </h3>
        
        <div class="flex flex-wrap justify-center gap-8 mb-12">
          <div class="rounded-2xl shadow-2xl overflow-hidden">
            <NuxtPicture
              src="/bio/with-dog.jpg"
              :alt="$t('alt.dog')"
              class="h-96 w-auto object-cover"
              width="350"
              height="500"
            />
          </div>
          
          <div class="rounded-2xl shadow-2xl overflow-hidden md:translate-y-8">
            <NuxtPicture
              src="/bio/with-friends.jpg"
              :alt="$t('alt.friends')"
              class="h-96 w-auto object-cover"
              width="375"
              height="500"
            />
          </div>
        </div>

        <div class="relative my-16">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t-2 border-gradient-to-r from-transparent via-gray-600 to-transparent" />
          </div>
          <div class="relative flex justify-center">
            <div class="bg-[#1a1a1a] px-8 py-2 rounded-full border border-gray-600">
              <h3 class="font-bold text-2xl text-center text-white">
                {{ $t('bio.personal.life2') }}
              </h3>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-8 mb-10">
          <div class="rounded-2xl shadow-2xl overflow-hidden">
            <NuxtPicture
              src="/bio/gym.jpg"
              :alt="$t('alt.bodybuilding')"
              class="h-64 w-auto object-cover"
              width="500"
              height="375"
            />
          </div>
          
          <div class="rounded-2xl shadow-2xl overflow-hidden lg:translate-y-8">
            <NuxtPicture
              src="/bio/boxing.png"
              :alt="$t('alt.boxing')"
              class="h-64 w-auto object-cover"
              width="356"
              height="450"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()

const bioTitle = computed(() => {
  return t('bio.title.programming')
})

const achievements = computed(() => {
  return [
    t('bio.achievements.programming1'),
    t('bio.achievements.programming2'),
    t('bio.achievements.programming3'),
    t('bio.achievements.programming4'),
    t('bio.achievements.programming5'),
  ]
})



</script>