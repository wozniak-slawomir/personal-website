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
        <p v-if="bioState === 'career'" class="text-xl mb-10">CAREER</p>
        <p v-if="bioState === 'achievements'" class="text-xl mb-10">
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
</script>

<style scoped lang="css">
.active {
  background-color: #474b59;
}
</style>