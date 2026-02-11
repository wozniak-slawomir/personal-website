<script setup lang="ts">
const { t } = useI18n();

const email = defineModel<string>('email', { required: true });
const honeypot = defineModel<string>('honeypot', { required: true });

defineProps<{
    isValid: boolean;
}>();

const emit = defineEmits<{
    (e: 'start'): void;
}>();
</script>

<template>
    <div class="text-center space-y-8 py-12 animate-fade-in">
        <div class="inline-block p-4 rounded-full bg-[#252525] border border-[#9c7942] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#9c7942]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight">
            {{ t('feedback.title') }} <br />
            <span class="text-[#9c7942]">{{ t('feedback.subtitle') }}</span>
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            {{ t('feedback.description') }}
        </p>
        
        <div class="max-w-md mx-auto mt-8">
            <label class="text-sm text-gray-400 block mb-2 text-left">
                {{ t('feedback.email.label') }}
            </label>
            <input 
                v-model="email" 
                type="email" 
                maxlength="254"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none invalid:border-red-500"
                :placeholder="t('feedback.email.placeholder')" 
            />
            
            <input 
                v-model="honeypot" 
                type="text" 
                name="website" 
                autocomplete="off"
                tabindex="-1"
                aria-hidden="true"
                style="position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0;"
            />
        </div>
        
        <div class="flex justify-center mt-8">
            <button 
                @click="emit('start')"
                :disabled="!isValid"
                :class="[
                    'px-8 py-4 text-lg font-bold rounded-lg transition-all transform shadow-lg',
                    isValid
                        ? 'bg-[#9c7942] hover:bg-[#8a6b3a] text-white hover:scale-105 shadow-[#9c7942]/20'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                ]"
            >
                {{ t('feedback.start') }}
            </button>
        </div>
    </div>
</template>
