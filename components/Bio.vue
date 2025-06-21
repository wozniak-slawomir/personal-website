<template>
  <div class="container mt-32">
    <h2 class="text-5xl font-bold text-center md:text-left">
      BIO
    </h2>
    <div class="mb-0 mt-10 lg:my-10">
      <MorphingTabs
        :tabs="bioTabs"
        :active-tab="bioState"
        @update:active-tab="bioState = $event"
      />
    </div>
    <div>
      <div class="glassmorphism rounded-2xl w-12/12 flex justify-between flex-col p-8 mt-0 shadow">
        <div
          v-if="bioState === storyKey"
          class="space-y-12"
        >
          <div class="relative">
            <NuxtImg
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
            <NuxtImg
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
        <div v-if="bioState === careerKey">
          <CareerTimeline />
        </div>
        <div v-if="bioState === achievementsKey">
          <ul class="list-disc pl-3">
            <li
              v-for="achievement in achievements"
              :key="achievement"
            >
              {{ achievement }}
            </li>
          </ul>
        </div>
        <div v-show="bioState === personalLifeKey">
          <h3 class="font-bold text-3xl mb-8 text-center">
            {{ $t('bio.personal.life1') }}
          </h3>
          
          <div class="flex flex-wrap justify-center gap-8 mb-12">
            <div class="rounded-2xl shadow-2xl overflow-hidden">
              <NuxtImg
                src="/bio/with-dog.jpg"
                :alt="$t('alt.dog')"
                class="h-96 w-auto object-cover"
                width="350"
                height="500"
              />
            </div>
            
            <div class="rounded-2xl shadow-2xl overflow-hidden md:translate-y-8">
              <NuxtImg
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
              <NuxtImg
                src="/bio/gym.jpg"
                :alt="$t('alt.bodybuilding')"
                class="h-64 w-auto object-cover"
                width="500"
                height="375"
              />
            </div>
            
            <div class="rounded-2xl shadow-2xl overflow-hidden lg:translate-y-8">
              <NuxtImg
                src="/bio/boxing.png"
                :alt="$t('alt.boxing')"
                class="h-64 w-auto object-cover"
                width="356"
                height="450"
              />
            </div>
          </div>
        </div>
        <div v-show="bioState === skillsKey">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div class="relative flex items-center group overflow-hidden rounded-2xl shadow-2xl">
              <NuxtImg
                src="/bio/workstation.jpg"
                :alt="$t('alt.workstation')"
                width="800"
                height="500"
                class="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div class="space-y-8">
              <div class="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/30">
                <h4 class="text-xl font-bold mb-4 text-white flex items-center">
                  <span class="w-3 h-3 bg-green-500 rounded-full mr-3" />
                  {{ $t('bio.skills.hard.proficient') }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in skills.hard.proficient"
                    :key="skill"
                    class="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              
              <div class="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/30">
                <h4 class="text-xl font-bold mb-4 text-white flex items-center">
                  <span class="w-3 h-3 bg-yellow-500 rounded-full mr-3" />
                  {{ $t('bio.skills.hard.used') }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in skills.hard.used"
                    :key="skill"
                    class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:bg-purple-600/30 transition-colors"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div class="lg:order-2 flex justify-center group overflow-hidden rounded-2xl shadow-2xl">
              <NuxtImg
                src="/bio/travel.jpg"
                :alt="$t('alt.travel')"
                class="object-cover mx-auto transition-transform duration-300 group-hover:scale-105"
                height="500"
                width="375"
              />
            </div>
            
            <div class="lg:order-1 bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm border border-gray-700/30">
              <h3 class="text-3xl text-white font-bold mb-6 flex items-center">
                <span class="w-4 h-4 bg-orange-500 rounded-full mr-3" />
                {{ $t('bio.skills.soft') }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="skill in skills.soft"
                  :key="skill"
                  class="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <span class="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                  <span class="text-gray-300">{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MorphingTabs from './ui/morphing-tabs/MorphingTabs.vue'
import CareerTimeline from './CareerTimeline.vue'
const { t } = useI18n()

const bioTabs = computed(() => [
  {
    key: 'story',
    label: t('bio.menu.story'),
  },
  {
    key: 'career',
    label: t('bio.menu.career'),
  },
  {
    key: 'achievements',
    label: t('bio.menu.achievements'),
  },
  {
    key: 'personalLife',
    label: t('bio.menu.personal.life'),
  },
  {
    key: 'skills',
    label: t('bio.menu.skills'),
  },
])

const [storyKey, careerKey, achievementsKey, personalLifeKey, skillsKey] = bioTabs.value.map(tab => tab.key)
const bioState = ref<string>(storyKey)



const achievements = computed(() => [
  t('bio.achievements1'),
  t('bio.achievements2'),
  t('bio.achievements3'),
  t('bio.achievements4'),
  t('bio.achievements5'),
])

const skills = computed(() => ({
  hard: {
    proficient: ['React', 'Redux', 'Typescript', 'Vue.js', 'Javascript', 'HTML5', 'SCSS', 'Bootstrap', 'Jest', 'Testing Library', 'Git', 'Axios', 'ESLint', 'REST', 'JSON', 'Webpack', 'NPM', 'OOP'],
    used: ['JQuery', 'Scrum', 'Node.js', 'Express', 'Linux', 'Docker', 'Rust', 'MUI'],

  },
  soft: [
    t('bio.skills.leadership'),
    t('bio.skills.communication'),
    t('bio.skills.problem.solving'),
    t('bio.skills.teamwork'),
    t('bio.skills.adaptability'),
    t('bio.skills.time.management'),
    t('bio.skills.creativity'),
    t('bio.skills.critical.thinking'),
    t('bio.skills.conflict.resolution'),
    t('bio.skills.decision.making'),
    t('bio.skills.empathy'),
    t('bio.skills.flexibility'),
    t('bio.skills.persuasion'),
    t('bio.skills.stress.management'),
    t('bio.skills.tolerance'),
    t('bio.skills.work.ethic'),
  ],
}
))

</script>