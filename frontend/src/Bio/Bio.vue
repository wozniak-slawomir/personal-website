<template>
  <div class="mx-64 flex flex-col">
    <h1 class="text-5xl font-bold">BIO</h1>
    <div class="mt-10 flex">
      <button
        @click="bioState = 0"
        v-bind:style="
          bioState === 0
            ? 'background-color: #474b59'
            : 'background-color: #393939'
        "
        class="text-l p-3 rounded-3xl hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow"
      >
        STORY
      </button>
      <button
        @click="bioState = 1"
        v-bind:style="
          bioState === 1
            ? 'background-color: #474b59'
            : 'background-color: #393939'
        "
        class="text-l p-3 rounded-3xl hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow"
      >
        CAREER
      </button>
      <button
        @click="bioState = 2"
        v-bind:style="
          bioState === 2
            ? 'background-color: #474b59'
            : 'background-color: #393939'
        "
        class="text-l p-3 rounded-3xl hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow"
      >
        ACHIEVEMENTS
      </button>
      <button
        @click="bioState = 3"
        v-bind:style="
          bioState === 3
            ? 'background-color: #474b59'
            : 'background-color: #393939'
        "
        class="text-l p-3 rounded-3xl hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow"
      >
        PERSONAL LIFE
      </button>
      <button
        @click="bioState = 4"
        v-bind:style="
          bioState === 4
            ? 'background-color: #474b59'
            : 'background-color: #393939'
        "
        class="text-l p-3 rounded-3xl hover:bg-[#464646] h-15 mr-5 px-5 duration-300 shadow"
      >
        SKILLS
      </button>
    </div>
    <div>
      <div class="flex">
        <div
          v-bind:style="bioState === 0 ? 'translate: 0 -25px' : ''"
          class="mb-0 translate-y-[25px] translate-x-1 transition-all arrow"
        >
          <PhCaretUp weight="fill" :size="80" :color="'#393939'" />
        </div>
        <div
          v-bind:style="bioState === 1 ? 'translate: 0 -25px' : ''"
          class="mb-0 translate-y-[25px] translate-x-[37px] transition-all arrow"
        >
          <PhCaretUp weight="fill" :size="80" :color="'#393939'" />
        </div>
        <div
          v-bind:style="bioState === 2 ? 'translate: 0 -25px' : ''"
          class="mb-0 translate-y-[25px] translate-x-[105px] transition-all arrow"
        >
          <PhCaretUp weight="fill" :size="80" :color="'#393939'" />
        </div>
        <div
          v-bind:style="bioState === 3 ? 'translate: 0 -25px' : ''"
          class="mb-0 translate-y-[25px] translate-x-[207px] transition-all arrow"
        >
          <PhCaretUp weight="fill" :size="80" :color="'#393939'" />
        </div>
        <div
          v-bind:style="bioState === 4 ? 'translate: 0 -25px' : ''"
          class="mb-0 translate-y-[25px] translate-x-[270px] transition-all arrow"
        >
          <PhCaretUp weight="fill" :size="80" :color="'#393939'" />
        </div>
      </div>
      <div
        class="bg-[#393939] rounded-2xl w-12/12 flex justify-between flex-col p-8 mt-0 shadow"
      >
        <p
          v-bind:style="expandBio ? 'max-height: none' : 'max-height: 90px'"
          v-if="bioState === 0"
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
        <p v-if="bioState === 1" class="text-xl mb-10">CAREER</p>
        <p v-if="bioState === 2" class="text-xl mb-10">ACHIEVEMENTS</p>
        <p v-if="bioState === 3" class="text-xl mb-10">PERSONAL LIFE</p>
        <p v-if="bioState === 4" class="text-xl mb-10">SKILLS</p>
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

const expandBio = ref(false);
const bioState = ref(0);
</script>

<style scoped>
.arrow {
  margin-bottom: -35px;
  margin-top: -10px;
}
</style>
