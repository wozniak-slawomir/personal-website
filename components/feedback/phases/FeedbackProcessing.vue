<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <div class="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div class="relative w-24 h-24 mb-8">
            <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
            <div class="absolute top-0 left-0 w-full h-full border-4 border-[#9c7942] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ t('feedback.processing') }}</h3>
        <p class="text-gray-400 animate-pulse">{{ t('feedback.wait') }}</p>
    </div>
</template>
