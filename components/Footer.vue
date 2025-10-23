<template>
  <footer class="container py-10 !mt-32 text-gray-300">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-5">
      <NuxtPicture
        src="/logo.png"
        :alt="$t('alt.slawomir')"
        class="max-w-[425px] w-full lg:h-[30px]"
        width="425"
        height="30"
      />
      <div class="flex gap-5 text-white">
        <a
          href="https://www.linkedin.com/in/slawek-wozniak/"
          aria-label="Linkedin link"
          target="_blank"
        >
          <PhLinkedinLogo
            :size="45"
            class="h-12"
          />
        </a>
        <a
          href="https://github.com/wozniak-slawomir"
          aria-label="Github link"
          target="_blank"
        >
          <PhGithubLogo
            :size="45"
            class="h-12"
          />
        </a>
        <a
          href="mailto:contact@slawomir-wozniak.pl"
          aria-label="Mail link"
          target="_blank"
        >
          <PhEnvelopeSimple
            :size="45"
            class="h-12"
          />
        </a>
        <a
          href="https://www.instagram.com/slawomirwozniakofficial/"
          aria-label="Instagram link"
          target="_blank"
        >
          <PhInstagramLogo
            :size="45"
            class="h-12"
          />
        </a>
        <a
          href="tel:+48571205570"
          aria-label="Phone link"
          target="_blank"
        >
          <PhPhone
            :size="45"
            class="h-12"
          />
        </a>
      </div>
    </div>
    <hr class="border-[#464646] lg:my-10 my-7">
    <div class="flex justify-between items-center text-center flex-col gap-1 sm:flex-row sm:gap-0">
      <span>Swarzędz 62-020 {{ $t('footer.poland') }}</span>
      <div
        class="mt-2 md:mt-0"
      >
        <span
          class="text-lg font-semibold"
        >
          {{ $t('footer.partners') }}</span>
        <NuxtLink
          to="https://www.piotrchojankowski.pl"
          target="_blank"
          class="mt-4 block"
        >
          <NuxtPicture
            src="/partners/piotrchojankowski.png"
            alt="Piotr Chojankowski"
            class="h-16 m-auto rounded-lg"
            width="150"
            height="70"
          />
        </NuxtLink>
      </div>
      <div class="mt-4 md:mt-0">
        <span>NIP: 7011029927</span>
        <span class="ml-5">© {{ date }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PhInstagramLogo, PhGithubLogo, PhLinkedinLogo, PhEnvelopeSimple, PhPhone } from '@phosphor-icons/vue'
const date = new Date().getFullYear()
</script>