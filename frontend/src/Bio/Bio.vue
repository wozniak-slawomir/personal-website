<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center md:text-left">BIO</h1>
    <div class="mb-0 mt-10 flex flex-wrap lg:my-10">
      <button @click="bioState = 'story'" :class="{ 'active': bioState === 'story' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0 ">
        STORY
      </button>
      <button @click="bioState = 'career'" :class="{ 'active': bioState === 'career' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        CAREER
      </button>
      <button @click="bioState = 'achievements'" :class="{ 'active': bioState === 'achievements' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        ACHIEVEMENTS
      </button>
      <button @click="bioState = 'personal life'" :class="{ 'active': bioState === 'personal life' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        PERSONAL LIFE
      </button>
      <button @click="bioState = 'skills'" :class="{ 'active': bioState === 'skills' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        SKILLS
      </button>
    </div>
    <div>
      <div class="bg-[#393939] rounded-2xl w-12/12 flex justify-between flex-col p-8 mt-0 shadow">
        <div v-if="bioState === 'story'" class="mb-10 overflow-clip">
          <p>
            Passionate about learning. I taught myself software engineering and worked in the industry for 5 years as a
            frontend developer. <br>
            I Speak Polish, English and Spanish. Currently learning French.<br><br>

            In 2024 I decided to start studying Business Psychology. I wanted to understand the human mind and how it
            can be applied to business. <br>
            You can follow my journey on my blog here, or on <a href="https://www.instagram.com/wozniaakslawek/"
              target="_blank" class="text-blue-500 underline">instagram</a>. <br><br>

            In 2021 I simply packed my things and travelled througout Europe. I visited 10 countries in 3 months. I had
            the most fun in my life.
            Finally stayed in Spain for 6 months. <br>
          </p>
        </div>
        <div v-if="bioState === 'career'" class="text-sm text-[color:#929292] mb-10">
          <div class="mb-4" v-for="(position, index) in carrerPositions" :key="position.title">
            <hr class="my-6 border-[color:#929292]" v-if="index !== 0">
            <h3 class="text-3xl text-white font-bold">{{ position.title }}</h3>
            <h4 class="text-xl text-white">{{ position.company }}</h4>
            <div class="mb-5 mt-1">{{ position.dateStart.getMonth() + 1 }}/{{ position.dateStart.getFullYear() }} - {{
        position.dateEnd.getMonth() + 1 }}/{{ position.dateEnd.getFullYear() }}
            </div>
            <ul class="list-disc pl-3">
              <li v-for="point in position.keyPoints" :key="point">{{ point }}</li>
            </ul>
            <div class="mt-3 text-white">Technology used: {{ position.technology.join(", ") }}</div>
          </div>
        </div>
        <p v-if="bioState === 'achievements'" class=" text-xl mb-10">
          ACHIEVEMENTS
        </p>
        <p v-if="bioState === 'personal life'" class="text-xl mb-10">
          PERSONAL LIFE
        </p>
        <p v-if="bioState === 'skills'" class="text-xl mb-10">SKILLS</p>
        <button v-if="expandBio" @click="expandBio = !expandBio" class="self-start text-sm">
          SEE LESS
          <PhCaretUp :size="20" class="inline align-bottom ml-2" />
        </button>
        <button v-if="!expandBio" @click="expandBio = !expandBio" class="self-start text-sm">
          SEE MORE
          <PhCaretDown :size="20" class="inline align-bottom ml-2" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue";
import { ref } from "vue";

const bioState = ref<BioState>("story");
const expandBio = ref(false);

const carrerPositions = [
  {
    title: "Frontend Team Leader",
    company: "Cognitran",
    dateStart: new Date("2022-12-1"),
    dateEnd: new Date("2024-02-28"),
    keyPoints: [
      `Successfully led the entire project development lifecycle, delivering a compelling Minimum Viable Product
      (MVP) that exceeded client expectations. Transformed a basic demo app into a cutting-edge solution,
      garnering high client satisfaction.`,
      `Provided expert guidance and mentorship to a team of full-stack developers, resulting in a cohesive and
      high-performing development team. Led frontend codebase decisions, ensuring optimal performance and
      user experience.`,
      `Implemented seamless integrations with multiple project environments, facilitating efficient data exchange
        and collaboration among team members.`,
    ],
    technology: ["React", "Redux", "Typescript", "HTML5", "SCSS", "Jest", "Testing Library"]
  },
  {
    title: "Frontend Developer",
    company: "Wirtualna Polska",
    dateStart: new Date("2022-05-01"),
    dateEnd: new Date("2022-11-30"),
    keyPoints: [
      `Demonstrated a proactive approach in maintaining high code quality and best practices through active
        participation in code reviews.`,
      `Built scalable and maintainable frontend solutions by employing React hook-based and Redux approaches.`,
      `Tested frontend code using Jest and Testing Library, leading to improved code quality and reduced bugs.`,
    ],
    technology: ["React", "Redux", "Typescript", "HTML5", "Styled Components", "Jest", "Testing Library"]
  },
  {
    title: "Frontend Developer",
    company: "Nordea",
    dateStart: new Date("2021-05-01"),
    dateEnd: new Date("2022-04-30"),
    keyPoints: [
      `Successfully introduced Typescript to the codebase, enhancing code quality, maintainability, and catching
      bugs at compile-time.`,
      `As the sole frontend developer in an 8-member team, played a pivotal role in making informed decisions
      related to frontend architecture, technologies, and best practices.`,
      `Took ownership of maintaining and updating ESLint rules and helpers, ensuring consistent code style and
        enforcing best practices throughout the codebase.`,
    ],
    technology: ["React", "Redux", "Typescript", "HTML5", "Styled Components", "Jest", "Testing Library"]
  },
  {
    title: "Frontend Developer",
    company: "Webwave",
    dateStart: new Date("2020-04-01"),
    dateEnd: new Date("2021-04-30"),
    keyPoints: [
      `Participating in full lifecycle of development for company web application using Vue.js framework and OOP
      paradigm for the application's engine`,
      `Created and maintained reusable components and modules for the company's design system, ensuring consisency among all modules`,
      `Took ownership of maintaining and updating ESLint rules and helpers, ensuring consistent code style and
        enforcing best practices throughout the codebase.`,
    ],
    technology: ["React", "Redux", "Typescript", "HTML5", "Styled Components", "Jest", "Testing Library"],
  }
];

</script>

<style scoped lang="css">
.active {
  background-color: #474b59;
}
</style>