<template>
  <div>
    <div class="container">
      <div class="flex justify-center items-center h-[60vh]">
        <div class="text-center">
          <h1 class="text-4xl font-bold">
            404
          </h1>
          <p class="text-lg">
            Page not found
          </p>
          <NuxtLink
            to="/"
            class="text-blue-500 hover:underline"
          >
            Go back to home
          </NuxtLink>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import '~/assets/index.css'

useHead({
title: '404 Page not found',
})

</script>