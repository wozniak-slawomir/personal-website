<template>
  <div class="container">
    <h1 class="text-5xl font-bold text-center md:text-left">BIO</h1>
    <div class="mb-0 mt-10 flex flex-wrap lg:my-10">
      <button
        @click="bioState = 'story'"
        :class="{ 'active': bioState === 'story' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0 "
      >
        STORY
      </button>
      <button
        @click="bioState = 'career'"
        :class="{ 'active': bioState === 'career' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
      >
        CAREER
      </button>
      <button
        @click="bioState = 'achievements'"
        :class="{ 'active': bioState === 'achievements' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
      >
        ACHIEVEMENTS
      </button>
      <button
        @click="bioState = 'personal life'"
        :class="{ 'active': bioState === 'personal life' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
      >
        PERSONAL LIFE
      </button>
      <button
        @click="bioState = 'skills'"
        :class="{ 'active': bioState === 'skills' }"
        class="text-l p-3 rounded-3xl bg-[#393939] hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow mb-5 lg:mb-0"
      >
        SKILLS
      </button>
    </div>
    <div>
      <div
        class="bg-[#393939] rounded-2xl w-12/12 flex justify-between flex-col p-8 mt-0 shadow"
      >
        <p
          v-bind:class="expandBio ? ' max-h-full' : 'max-h-[90px]'"
          v-if="bioState === 'story'"
          class="text-xl mb-10 overflow-clip"
        >
          STORY Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Doloribus quia totam consectetur cum placeat eligendi iusto eos libero
          rem repellat obcaecati provident nam quam veniam magnam, aliquid
          sapiente tenetur temporibus? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Asperiores sunt id error. Similique provident
          nostrum, modi earum est accusamus, perferendis deserunt odio
          accusantium reprehenderit odit architecto ipsam quibusdam dolor
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Soluta quae voluptatum enim optio voluptate iste exercitationem totam,
          sint odio, quibusdam reprehenderit fugiat maiores doloribus nemo
          possimus delectus dicta impedit necessitatibus! Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Assumenda dolores natus labore
          fugiat deserunt ad culpa perspiciatis commodi. Cum tempora quod
          maiores cupiditate, corrupti perferendis eos ex distinctio eligendi
          ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Sint ullam nisi ipsam dolorum distinctio mollitia error laborum esse
          consequuntur nihil ad adipisci atque aliquam commodi quisquam
          explicabo, voluptatem perspiciatis dolor?
        </p>
        <p v-if="bioState === 'career'" class="text-xl mb-10">CAREER</p>
        <p v-if="bioState === 'achievements'" class="text-xl mb-10">
          ACHIEVEMENTS
        </p>
        <p v-if="bioState === 'personal life'" class="text-xl mb-10">
          PERSONAL LIFE
        </p>
        <p v-if="bioState === 'skills'" class="text-xl mb-10">SKILLS</p>
        <button
          v-if="expandBio"
          @click="expandBio = !expandBio"
          class="self-start text-sm"
        >
          SEE LESS<PhCaretUp :size="20" class="inline align-bottom ml-2" />
        </button>
        <button
          v-if="!expandBio"
          @click="expandBio = !expandBio"
          class="self-start text-sm"
        >
          SEE MORE<PhCaretDown :size="20" class="inline align-bottom ml-2" />
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