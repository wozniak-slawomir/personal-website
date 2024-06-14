<template>
  <footer class="bg-[--secondary-color] container py-10 !mt-32 text-gray-300">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-5">
      <img :src="getImageUrl('logo.png')" alt="logo" class="max-w-[400px] w-full lg:h-[30px]" />
      <div class="flex gap-5 text-white">
        <a href="https://www.linkedin.com/in/slawek-wozniak/" aria-label="Linkedin link" target="_blank">
          <PhLinkedinLogo :size="45" class="h-12" />
        </a>
        <a href="https://github.com/wozniak-slawomir" aria-label="Github link" target="_blank">
          <PhGithubLogo :size="45" class="h-12" />
        </a>
        <a href="mailto:wozniakslawomir.contact@gmail.com" aria-label="Mail link" target="_blank">
          <PhEnvelopeSimple :size="45" class="h-12" />
        </a>
        <a href="https://www.instagram.com/wozniaakslawek" aria-label="Instagram link" target="_blank">
          <PhInstagramLogo :size="45" class="h-12" />
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
const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
}
</script>