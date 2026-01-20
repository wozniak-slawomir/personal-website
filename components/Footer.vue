<template>
  <footer class="container py-10 !mt-32 text-gray-300">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-5">
      <NuxtPicture src="/logo.png" :alt="$t('alt.slawomir')" class="max-w-[425px] w-full lg:h-[30px]" width="425"
        height="30" />
      <div class="flex flex-wrap gap-5 text-white justify-center">
        <a href="https://www.linkedin.com/in/wozniak-slawomir" aria-label="Linkedin link" target="_blank">
          <PhLinkedinLogo :size="45" class="h-12" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61582978407745" aria-label="Facebook link" target="_blank">
          <PhFacebookLogo :size="45" class="h-12" />
        </a>
        <a href="mailto:contact@slawomir-wozniak.pl" aria-label="Mail link" target="_blank">
          <PhEnvelopeSimple :size="45" class="h-12" />
        </a>
        <a href="https://www.instagram.com/slawomirwozniakofficial/" aria-label="Instagram link" target="_blank">
          <PhInstagramLogo :size="45" class="h-12" />
        </a>
        <a href="https://tiktok.com/@slawomirwozniakofficial" aria-label="TikTok link" target="_blank">
          <PhTiktokLogo :size="45" class="h-12" />
        </a>
        <a href="https://youtube.com/@SlawomirWozniakOfficial" aria-label="YouTube link" target="_blank">
          <PhYoutubeLogo :size="45" class="h-12" />
        </a>
        <a href="tel:+48571205570" aria-label="Phone link" target="_blank">
          <PhPhone :size="45" class="h-12" />
        </a>
      </div>
    </div>
    <hr class="border-[#464646] lg:my-10 my-7">
    <div class="flex justify-center gap-6 mb-8 text-sm font-semibold uppercase tracking-wider flex-wrap">
      <NuxtLink :to="localePath('/wizja')" class="hover:text-[var(--primary-color)] transition-colors">
        {{ $t('navbar.vision') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/bio')" class="hover:text-[var(--primary-color)] transition-colors">
        {{ $t('navbar.bio') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/blog')" class="hover:text-[var(--primary-color)] transition-colors">
        {{ $t('navbar.blog') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/narzedzia')" class="hover:text-[var(--primary-color)] transition-colors">
        {{ $t('navbar.tools') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/contact')" class="hover:text-[var(--primary-color)] transition-colors">
        {{ $t('common.contact') }}
      </NuxtLink>
    </div>
    <div class="flex justify-between items-center text-center flex-col gap-1 sm:flex-row sm:gap-0">
      <span>Poznań, {{ $t('footer.poland') }}</span>
      <div class="mt-2 md:mt-0">
        <span class="text-lg font-semibold">
          {{ $t('footer.partners') }}</span>
        <NuxtLink to="https://www.piotrchojankowski.pl" target="_blank" class="mt-4 block">
          <NuxtPicture src="/partners/piotrchojankowski.png" alt="Piotr Chojankowski" class="h-16 m-auto rounded-lg"
            width="150" height="70" />
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
import { PhInstagramLogo, PhLinkedinLogo, PhEnvelopeSimple, PhPhone, PhTiktokLogo, PhYoutubeLogo, PhFacebookLogo } from '@phosphor-icons/vue'

const localePath = useLocalePath()
const date = new Date().getFullYear()
</script>