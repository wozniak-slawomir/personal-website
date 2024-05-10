<template>
  <footer class="h-64 bg-[--secondary-color] px-10 py-10 my-32 text-gray-300 lg:px-64">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-5">
      <img src="/logo.png" alt="logo" class="max-w-[400px] w-full lg:h-[30px]" />
      <div class="flex gap-5 invert">
        <a href="https://www.linkedin.com/in/slawek-wozniak/" target="_blank">
          <img
            src="/footer logos/LinkedIn.svg"
            alt="LinkedIn"
            class="h-12"
          />
        </a>
        <a href="https://github.com/wozniak-slawomir" target="_blank">
          <img
            src="/footer logos/GitHub.svg"
            alt="GitHub"
            class="h-12"
          />
        </a>
        <a href="mailto:wozniakslawomir.contact@gmail.com" target="_blank">
          <img
            src="/footer logos/Mail.svg"
            alt="Mail"
            class="h-12"
          />
        </a>
        <a
          href="https://www.instagram.com/wozniaakslawek?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
        >
          <img
            src="/footer logos/Instagram.svg"
            alt="Instagram"
            class="h-12"
          />
        </a>
      </div>
    </div>
    <hr class="opacity-40 lg:my-10 my-7" />
    <div class="flex justify-between text-center flex-col gap-1 sm:flex-row sm:gap-0">
      <p>Swarzędz 62-020 Poland</p>
      <p>NIP: 7011029927 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; © {{ date }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const date = new Date().getFullYear();
</script>
