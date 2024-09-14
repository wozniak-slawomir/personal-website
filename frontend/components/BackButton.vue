/* From Uiverse.io by AKAspidey01 */ 
<template>
  <button
    class="text-center rounded-2xl h-10 relative text-white text-lg font-semibold group"
    type="button"
    @click="goBack"
  >
    <div
      class="bg-[#393939] rounded-xl h-[80%] w-[33%] flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[106%] z-10 duration-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        height="20px"
        width="20px"
      >
        <path
          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          fill="#ffffff"
        />
        <path
          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          fill="#ffffff"
        />
      </svg>
    </div>
    <p class="ml-12">
      {{ $t('common.goBack') }}
    </p>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.push('/')
}

</script>