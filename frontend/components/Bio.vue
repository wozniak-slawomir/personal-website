<template>
  <div class="container mt-32">
    <h1 class="text-5xl font-bold text-center md:text-left">
      BIO
    </h1>
    <div class="mb-0 mt-10 flex flex-wrap lg:my-10">
      <button
        :class="{ 'bg-[#474b59]': bioState === 'story' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0 "
        @click="bioState = 'story'"
      >
        {{ $t("bio.menu.story") }}
      </button>
      <button
        :class="{ 'bg-[#474b59]': bioState === 'career' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
        @click="bioState = 'career'"
      >
        {{ $t("bio.menu.career") }}
      </button>
      <button
        :class="{ 'bg-[#474b59]': bioState === 'achievements' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
        @click="bioState = 'achievements'"
      >
        {{ $t("bio.menu.achievements") }}
      </button>
      <button
        :class="{ 'bg-[#474b59]': bioState === 'personal life' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
        @click="bioState = 'personal life'"
      >
        {{ $t("bio.menu.personal.life") }}
      </button>
      <button
        :class="{ 'bg-[#474b59]': bioState === 'skills' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
        @click="bioState = 'skills'"
      >
        {{ $t("bio.menu.skills") }}
      </button>
    </div>
    <div>
      <div class="bg-[#393939] rounded-2xl w-12/12 flex justify-between flex-col p-8 mt-0 shadow">
        <div
          v-if="bioState === 'story'"
          class="overflow-clip"
        >
          <p>
            {{ $t('bio.story1') }} <br>
            {{ $t('bio.story2') }}<br><br>
          </p>
          <p>
            {{ $t('bio.story3') }} <br><br>
            <img
              src="~/assets/bio/spain.jpg"
              alt="car in sunset in Spain"
              class="my-5 mx-auto max-h-[300px]"
            >
          </p>
          <p>
            {{ $t('bio.story4') }}<br>
            {{ $t('bio.story5') }} <br><br>
            <img
              src="~/assets/bio/book.jpg"
              alt="car in sunset in Spain"
              class="my-5 mx-auto max-h-[300px]"
            >
            {{ $t('bio.story6') }} <a
              href="https://www.instagram.com/wozniaakslawek/"
              target="_blank"
              class="text-blue-400 underline"
            >instagram</a>. <br><br>
          </p>
        </div>
        <div
          v-if="bioState === 'career'"
          class="text-sm text-[color:#929292]"
        >
          <div
            v-for="(position, index) in careerPositions"
            :key="position.title"
            class="mb-4"
          >
            <hr
              v-if="index !== 0"
              class="my-6 border-[color:#929292]"
            >
            <h3 class="text-3xl text-white font-bold">
              {{ position.title }}
            </h3>
            <h4 class="text-xl text-white">
              {{ position.company }}
            </h4>
            <div class="mb-5 mt-1">
              {{ position.dateStart.getMonth() + 1 }}/{{ position.dateStart.getFullYear() }} - {{
                position.dateEnd.getMonth() + 1 }}/{{ position.dateEnd.getFullYear() }}
            </div>
            <ul class="list-disc pl-3">
              <li
                v-for="point in position.keyPoints"
                :key="point"
              >
                {{ point }}
              </li>
            </ul>
            <div class="mt-3 text-white">
              <p>
                {{ $t('bio.career.technology') }}: 
                {{ position.technology.join(', ') }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="bioState === 'achievements'">
          <ul class="list-disc pl-3">
            <li
              v-for="achievement in achievements"
              :key="achievement"
            >
              {{ achievement }}
            </li>
          </ul>
        </div>
        <div v-if="bioState === 'personal life'">
          <h3 class="font-bold text-xl mb-3">
            {{ $t('bio.personal.life1') }}
          </h3>
          <div class="flex flex-wrap">
            <img
              src="~/assets/bio/with-dog.jpg"
              alt="with dog"
              class="mt-3 mx-auto max-h-[500px]"
            >
            <img
              src="~/assets/bio/with-friends.jpg"
              alt="with girlfriend"
              class="mt-3 mx-auto max-h-[500px]"
            >
          </div>
          <hr class="my-6 border-[color:#929292]">
          <h3 class="font-bold text-xl mb-3">
            {{ $t('bio.personal.life2') }}
          </h3>
          <div class="flex flex-wrap">
            <img
              src="~/assets/bio/gym.jpg"
              alt="bodybuilding"
              class="mt-3 mx-auto max-h-[500px]"
            >
            <img
              src="~/assets/bio/boxing.png"
              alt="boxing"
              class="mt-3 mx-auto max-h-[500px]"
            >
          </div>
        </div>
        <div v-if="bioState === 'skills'">
          <div class="flex flex-wrap">
            <img
              src="~/assets/bio/workstation.jpg"
              alt="workstation"
              class="mr-auto max-h-[500px]"
            >
            <div class="flex-1 px-5">
              <div class="flex flex-wrap">
                <div class="flex-1">
                  <h4 class="text-xl font-bold my-3 text-white">
                    Hard skills proficient:
                  </h4>
                  <ul class="list-disc pl-4">
                    <li
                      v-for="skill in skills.hard.proficient"
                      :key="skill"
                    >
                      {{ skill }}
                    </li>
                  </ul>
                </div>
                <div class="flex-1">
                  <h4 class="text-xl my-3 font-bold text-white">
                    Hard skills used:
                  </h4>
                  <ul class="list-disc pl-4">
                    <li
                      v-for="skill in skills.hard.used"
                      :key="skill"
                    >
                      {{ skill }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <div class="flex flex-col-reverse md:flex-row">
              <div class="flex-1 mr-5">
                <h3 class="text-3xl text-white font-bold">
                  Soft skills
                </h3>
                <ul class="list-disc pl-4 mt-6">
                  <li
                    v-for="skill in skills.soft"
                    :key="skill"
                  >
                    {{ skill }}
                  </li>
                </ul>
              </div>
              <img
                src="~/assets/bio/travel.jpg"
                alt="travel"
                class="ml-auto mr-auto md:mr-0 mt-5 mb-5 w-full md:w-auto h-auto md:h-[500px]"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'
const { t } = useI18n()

type BioState =
  | 'story'
  | 'career'
  | 'achievements'
  | 'personal life'
  | 'skills';

const bioState = ref<BioState>('story')

const careerPositions = computed(() => [
  {
    title: t('bio.career.enet.title'),
    company: t('bio.career.enet.company'),
    dateStart: new Date('2024-04'),
    dateEnd: new Date(),
    keyPoints: [
      t('bio.career.enet.keyPoints1'),
      t('bio.career.enet.keyPoints2'),
    ],
    technology: ['Vue', 'Typescript', 'HTML5', 'SCSS'],
  },
  {
    title: t('bio.career.cognitran.title'),
    company: t('bio.career.cognitran.company'),
    dateStart: new Date('2022-12-01'),
    dateEnd: new Date('2024-02-28'),
    keyPoints: [
      t('bio.career.cognitran.keyPoints1'),
      t('bio.career.cognitran.keyPoints2'),
      t('bio.career.cognitran.keyPoints3'),
    ],
    technology: ['React', 'Redux', 'Typescript', 'HTML5', 'SCSS', 'Jest', 'Testing Library'],
  },
  {
    title: t('bio.career.wp.title'),
    company: t('bio.career.wp.company'),
    dateStart: new Date('2022-05-01'),
    dateEnd: new Date('2022-11-30'),
    keyPoints: [
      t('bio.career.wp.keyPoints1'),
      t('bio.career.wp.keyPoints2'),
      t('bio.career.wp.keyPoints3'),
    ],
    technology: ['React', 'Redux', 'Typescript', 'HTML5', 'Styled Components', 'Jest', 'Testing Library'],
  },
  {
    title: t('bio.career.nordea.title'),
    company: t('bio.career.nordea.company'),
    dateStart: new Date('2021-05-01'),
    dateEnd: new Date('2022-04-30'),
    keyPoints: [
      t('bio.career.nordea.keyPoints1'),
      t('bio.career.nordea.keyPoints2'),
      t('bio.career.nordea.keyPoints3'),
    ],
    technology: ['React', 'Redux', 'Typescript', 'HTML5', 'Styled Components', 'Jest', 'Testing Library'],
  },
  {
    title: t('bio.career.webwave.title'),
    company: t('bio.career.webwave.company'),
    dateStart: new Date('2020-04-01'),
    dateEnd: new Date('2021-04-30'),
    keyPoints: [
      t('bio.career.webwave.keyPoints1'),
      t('bio.career.webwave.keyPoints2'),
      t('bio.career.webwave.keyPoints3'),
    ],
    technology: ['React', 'Redux', 'Typescript', 'HTML5', 'Styled Components', 'Jest', 'Testing Library'],
  },
])

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