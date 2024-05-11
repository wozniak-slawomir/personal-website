<template>
  <footer class="bg-[--secondary-color] px-10 py-10 mt-32 text-gray-300 lg:px-64">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-5">
      <img src="/logo.png" alt="logo" class="max-w-[400px] w-full lg:h-[30px]" />
      <div class="flex gap-5 text-white">
        <a href="https://www.linkedin.com/in/slawek-wozniak/" target="_blank">
          <PhLinkedinLogo :size="45" class="h-12"/>
        </a>
        <a href="https://github.com/wozniak-slawomir" target="_blank">
          <PhGithubLogo :size="45" class="h-12"/>
        </a>
        <a href="mailto:wozniakslawomir.contact@gmail.com" target="_blank">
          <PhEnvelopeSimple :size="45" class="h-12"/>
        </a>
        <a
          href="https://www.instagram.com/wozniaakslawek"
          target="_blank"
        >
          <PhInstagramLogo :size="45" class="h-12"/>
        </a>
      </div>
    </div>
    <hr class="border-[#464646] lg:my-10 my-7" />
    <div class="flex justify-between text-center flex-col gap-1 sm:flex-row sm:gap-0">
      <span>Swarzędz 62-020 Poland</span>
      <div>
        <span>NIP: 7011029927</span>
        <span class="ml-5">© {{ date }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PhInstagramLogo, PhGithubLogo, PhLinkedinLogo, PhEnvelopeSimple } from '@phosphor-icons/vue';
const date = new Date().getFullYear();
</script>