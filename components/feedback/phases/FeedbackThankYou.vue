<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <div class="text-center space-y-8 py-12 animate-fade-in">
        <div class="inline-block p-4 rounded-full bg-[#252525] border border-green-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 class="text-3xl font-bold text-white">{{ t('feedback.thankYou.title') }}</h2>
        <p class="text-gray-400 max-w-md mx-auto">
            {{ t('feedback.thankYou.message') }}
        </p>
        <a href="/"
            class="inline-block mt-8 px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all">
            {{ t('feedback.backHome') }}
        </a>
    </div>
</template>
