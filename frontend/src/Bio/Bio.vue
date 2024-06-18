<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center md:text-left">BIO</h1>
    <div class="mb-0 mt-10 flex flex-wrap lg:my-10">
      <button @click="bioState = 'story'" :class="{ 'active': bioState === 'story' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0 ">
        STORY
      </button>
      <button @click="bioState = 'career'" :class="{ 'active': bioState === 'career' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        CAREER
      </button>
      <button @click="bioState = 'achievements'" :class="{ 'active': bioState === 'achievements' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        ACHIEVEMENTS
      </button>
      <button @click="bioState = 'personal life'" :class="{ 'active': bioState === 'personal life' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        PERSONAL LIFE
      </button>
      <button @click="bioState = 'skills'" :class="{ 'active': bioState === 'skills' }"
        class="text-l p-3 flex-1 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0">
        SKILLS
      </button>
    </div>
    <div>
      <div class="bg-[#393939] rounded-2xl w-12/12 flex justify-between flex-col p-8 mt-0 shadow">
        <div v-if="bioState === 'story'" class="overflow-clip">
          <p>
            Passionate about learning. I taught myself software engineering and worked in the industry for 5 years as a
            frontend developer. <br>
            I speak Polish, English and Spanish. Currently learning French.<br><br>
          </p>
          <p>
            In 2021 I simply packed my things and travelled throughout Europe. I visited 10 countries in 3 months. I had
            the most fun in my life.
            Finally stayed in Spain for 6 months. <br><br>
            <img :src="getImageUrl('bio/spain.jpg')" alt="car in sunset in Spain" class="my-5 mx-auto max-h-[300px]" />
          </p>
          <p>
            In 2024 I decided to start studying Business Psychology. I wanted to understand the human mind and how it
            can be applied to business. <br>
            And precisely that is what you can expect from me. I have a deep understanding of technology, management and
            delivering business value. <br><br>
            <img :src="getImageUrl('bio/book.jpg')" alt="car in sunset in Spain" class="my-5 mx-auto max-h-[300px]" />
            You can follow my journey on my blog here, or on <a href="https://www.instagram.com/wozniaakslawek/"
              target="_blank" class="text-blue-400 underline">instagram</a>. <br><br>
          </p>
        </div>
        <div v-if="bioState === 'career'" class="text-sm text-[color:#929292]">
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
        <div v-if="bioState === 'achievements'">
          <ul class="list-disc pl-3">
            <li v-for="achievement in achievements" :key="achievement">{{ achievement }}</li>
          </ul>
        </div>
        <div v-if="bioState === 'personal life'">
          <h3 class="font-bold text-xl mb-3">Father of a dog and a cat. In a happy relationship with an
            amazing
            girlfriend.
          </h3>
          <div class="flex flex-wrap">
            <img :src="getImageUrl('bio/with-dog.jpg')" alt="with dog" class="mt-3 mx-auto max-h-[500px]" />
            <img :src="getImageUrl('bio/with-girlfriend.jpg')" alt="with girlfriend"
              class="mt-3 mx-auto max-h-[500px]" />
          </div>
          <hr class="my-6 border-[color:#929292]">
          <h3 class="font-bold text-xl mb-3">A big fan of martial arts and bodybuilding</h3>
          <div class="flex flex-wrap">
            <img :src="getImageUrl('bio/gym.jpg')" alt="bodybuilding" class="mt-3 mx-auto max-h-[500px]" />
            <img :src="getImageUrl('bio/boxing.png')" alt="boxing" class="mt-3 mx-auto max-h-[500px]" />
          </div>
        </div>
        <div v-if="bioState === 'skills'">
          <div class="flex flex-wrap">
            <img :src="getImageUrl('bio/workstation.jpg')" alt="workstation" class="mr-auto max-h-[500px]" />
            <div class="flex-1 px-5">
              <div class="flex flex-wrap">
                <div class="flex-1">
                  <h4 class="text-xl font-bold my-3 text-white">Hard skills proficient:</h4>
                  <ul class="list-disc pl-4">
                    <li v-for="skill in skills.hard.proficient" :key="skill">{{ skill }}</li>
                  </ul>
                </div>
                <div class="flex-1">
                  <h4 class="text-xl my-3 font-bold text-white">Hard skills used:</h4>
                  <ul class="list-disc pl-4">
                    <li v-for="skill in skills.hard.used" :key="skill">{{ skill }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <div class="flex flex-col-reverse md:flex-row">
              <div class="flex-1 mr-5">
                <h3 class="text-3xl text-white font-bold">Soft skills</h3>
                <ul class="list-disc pl-4 mt-6">
                  <li v-for="skill in skills.soft" :key="skill">{{ skill }}</li>
                </ul>
              </div>
              <img :src="getImageUrl('bio/travel.jpg') " alt="travel"
                class="ml-auto mr-auto md:mr-0 mt-5 mb-5 w-full md:w-auto h-auto md:h-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const bioState = ref<BioState>("story");

const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
}

const carrerPositions = [
  {
    title: "Frontend Developer",
    company: "E Net Production",
    dateStart: new Date("2024-04"),
    dateEnd: new Date(),
    keyPoints: [
      `Rapidly onboarded and delivered several complex tasks in a timespan of weeks`,
      `Utilizing Vue.js to develop e-commerce platform used by thousands of users`,
    ],
    technology: ["Vue", "Typescript", "HTML5", "SCSS"]
  },
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

const achievements = [
  "Succesfully delivered a frontend part of MVP while leading a small team of developers",
  "Launched my own team and succesfully planning and managing software projects",
  "Learned Spanish in 1 year",
  "Travelled to 14 countries",
  "Taught more that 10 kids mathemathics as a high school student",
]

const skills = {
  hard: {
    proficient: ["React", "Redux", "Typescript", "Vue.js", "Javascript", "HTML5", "SCSS", "Bootstrap", "Jest", "Testing Library", "Git", "Axios", "ESLint", "REST", "JSON", "Webpack", "NPM", "OOP"],
    used: ["JQuery", "Scrum", "Node.js", "Express", "Linux", "Docker", "Rust", "MUI"]

  },
  soft: ["Leadership", "Communication", "Problem-solving", "Teamwork", "Adaptability", "Time management", "Creativity", "Critical thinking", "Conflict resolution", "Decision making", "Empathy", "Flexibility", "Persuasion", "Stress management", "Tolerance", "Work ethic"]
}

</script>

<style scoped lang="css">
.active {
  background-color: #474b59;
}
</style>