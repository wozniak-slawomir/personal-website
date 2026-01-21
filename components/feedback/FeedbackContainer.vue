<script setup lang="ts">
import { ref, computed } from 'vue';
import { FEEDBACK_QUESTIONS, DISCOVERY_SOURCES, CLIENT_CHECK_PAGE_INDEX, CLIENT_QUESTIONS_PAGE_INDEX } from '~/const/feedback';

const { t } = useI18n();

type Phase = 'intro' | 'questions' | 'processing' | 'thank-you';

const currentPhase = ref<Phase>('intro');
const currentPage = ref(0);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

const email = ref('');
const answers = ref<Record<string, string | number | boolean | null>>({});
const comments = ref<Record<string, string>>({});

const isClient = computed(() => answers.value['is_client'] === true);

const currentQuestions = computed(() => {
    let pageIndex = currentPage.value;
    
    if (pageIndex >= CLIENT_QUESTIONS_PAGE_INDEX && !isClient.value && currentPage.value === CLIENT_QUESTIONS_PAGE_INDEX) {
        return [];
    }
    
    const questions = FEEDBACK_QUESTIONS[pageIndex] || [];
    
    if (!isClient.value) {
        return questions.filter(q => !q.clientOnly);
    }
    
    return questions;
});

const progressPercent = computed(() => {
    let answeredCount = 0;
    let totalRequired = 0;
    
    for (let i = 0; i < FEEDBACK_QUESTIONS.length; i++) {
        const questions = FEEDBACK_QUESTIONS[i];
        for (const q of questions) {
            if (q.clientOnly && !isClient.value) continue;
            
            if (q.required) {
                totalRequired++;
                if (answers.value[q.id] !== undefined && answers.value[q.id] !== null && answers.value[q.id] !== '') {
                    answeredCount++;
                }
            }
        }
    }
    
    return totalRequired > 0 ? Math.round((answeredCount / totalRequired) * 100) : 0;
});

const canProceed = computed(() => {
    const questions = currentQuestions.value;
    return questions.every(q => {
        if (!q.required) return true;
        const answer = answers.value[q.id];
        return answer !== undefined && answer !== null && answer !== '';
    });
});

function getSourceLabel(value: string): string {
    return t(`feedback.sources.${value}`);
}

function getQuestionText(questionId: string): string {
    return t(`feedback.questions.${questionId}`);
}

function startSurvey() {
    currentPhase.value = 'questions';
    currentPage.value = 0;
}

function nextPage() {
    if (currentPage.value === CLIENT_CHECK_PAGE_INDEX && !isClient.value) {
        currentPage.value = CLIENT_QUESTIONS_PAGE_INDEX + 1;
    } else if (currentPage.value < FEEDBACK_QUESTIONS.length - 1) {
        currentPage.value++;
    } else {
        submitSurvey();
    }
}

function prevPage() {
    if (currentPage.value === CLIENT_QUESTIONS_PAGE_INDEX + 1 && !isClient.value) {
        currentPage.value = CLIENT_CHECK_PAGE_INDEX;
    } else if (currentPage.value > 0) {
        currentPage.value--;
    } else {
        currentPhase.value = 'intro';
    }
}

async function submitSurvey() {
    if (!canProceed.value) return;

    isSubmitting.value = true;
    error.value = null;
    currentPhase.value = 'processing';

    try {
        const payload: Record<string, any> = {
            email: email.value || undefined
        };

        // Dynamically build payload from questions
        for (const page of FEEDBACK_QUESTIONS) {
            for (const q of page) {
                // Skip client-only questions if user is not a client
                if (q.clientOnly && !isClient.value) continue;

                const value = answers.value[q.id];
                
                // Add answer if present
                if (value !== undefined && value !== null && value !== '') {
                    payload[q.id] = value;
                }

                // Handle comments/details
                const comment = comments.value[q.id];
                if (comment && comment.trim() !== '') {
                    if (q.conditionalText) {
                        // For conditional text (like boolean "yes"), logic maps to _details
                        payload[`${q.id}_details`] = comment;
                    } else if (q.hasComment) {
                        // For standard comments, maps to _comment
                        payload[`${q.id}_comment`] = comment;
                    }
                }
            }
        }

        await $fetch('/api/feedback/responses', {
            method: 'POST',
            body: payload,
        });

        setTimeout(() => {
            currentPhase.value = 'thank-you';
        }, 1500);
    } catch (e: unknown) {
        const err = e as { statusMessage?: string };
        error.value = err.statusMessage || 'Wystąpił błąd podczas wysyłania ankiety';
        currentPhase.value = 'questions';
    } finally {
        isSubmitting.value = false;
    }
}

function getDisplayPageNumber() {
    if (!isClient.value && currentPage.value > CLIENT_QUESTIONS_PAGE_INDEX) {
        return currentPage.value;
    }
    return currentPage.value + 1;
}

function getDisplayTotalPages() {
    if (!isClient.value && answers.value['is_client'] !== undefined) {
        return FEEDBACK_QUESTIONS.length - 1;
    }
    return FEEDBACK_QUESTIONS.length;
}
</script>

<template>
    <div class="w-full max-w-4xl mx-auto p-4 md:p-8">
        <div v-if="currentPhase === 'intro'" class="text-center space-y-8 py-12 animate-fade-in">
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
                <input v-model="email" type="email" 
                    class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none"
                    :placeholder="t('feedback.email.placeholder')" />
            </div>
            
            <div class="flex justify-center mt-8">
                <button @click="startSurvey"
                    class="px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-[#9c7942]/20">
                    {{ t('feedback.start') }}
                </button>
            </div>
        </div>

        <div v-if="currentPhase === 'questions'" class="space-y-8 py-8 animate-fade-in">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-white mb-2">{{ t('feedback.title') }}</h2>
                <p class="text-gray-400">{{ t('feedback.page') }} {{ getDisplayPageNumber() }} {{ t('feedback.of') }} {{ getDisplayTotalPages() }}</p>
                <div class="w-full bg-gray-800 rounded-full h-2 mt-4">
                    <div class="bg-[#9c7942] h-2 rounded-full transition-all duration-300"
                        :style="{ width: progressPercent + '%' }"></div>
                </div>
            </div>

            <div v-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
                {{ error }}
            </div>

            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800">
                <div class="space-y-8">
                    <div v-for="question in currentQuestions" :key="question.id" class="space-y-3">
                        <p class="text-white font-medium">
                            {{ getQuestionText(question.id) }}
                            <span v-if="!question.required" class="text-gray-500 text-sm">({{ t('feedback.optional') }})</span>
                        </p>

                        <div v-if="question.type === 'select'" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <button v-for="source in DISCOVERY_SOURCES" :key="source.value"
                                @click="answers[question.id] = source.value"
                                :class="[
                                    'p-3 rounded-lg border-2 text-center transition-all text-sm',
                                    answers[question.id] === source.value
                                        ? 'bg-[#9c7942]/20 border-[#9c7942] text-white'
                                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                                ]">
                                {{ getSourceLabel(source.value) }}
                            </button>
                        </div>

                        <div v-if="question.type === 'scale'">
                            <div class="flex justify-between items-center gap-1 mb-2">
                                <div class="flex gap-1 flex-1 justify-center">
                                    <button v-for="n in 10" :key="n" @click="answers[question.id] = n"
                                        :class="[
                                            'w-10 h-10 rounded-full border-2 transition-all text-sm font-bold',
                                            answers[question.id] === n
                                                ? 'bg-[#9c7942] border-[#9c7942] text-white'
                                                : 'border-gray-600 text-gray-400 hover:border-[#9c7942] hover:text-white'
                                        ]">
                                        {{ n }}
                                    </button>
                                </div>
                            </div>
                            <div v-if="question.hasComment" class="mt-3">
                                <input v-model="comments[question.id]" type="text"
                                    class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-[#9c7942] focus:outline-none"
                                    :placeholder="t('feedback.comment.placeholder')" />
                            </div>
                        </div>

                        <div v-if="question.type === 'boolean'" class="flex gap-4">
                            <button @click="answers[question.id] = true"
                                :class="[
                                    'flex-1 p-4 rounded-lg border-2 transition-all',
                                    answers[question.id] === true
                                        ? 'bg-[#9c7942]/20 border-[#9c7942] text-white'
                                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                                ]">
                                {{ t('feedback.yes') }}
                            </button>
                            <button @click="answers[question.id] = false"
                                :class="[
                                    'flex-1 p-4 rounded-lg border-2 transition-all',
                                    answers[question.id] === false
                                        ? 'bg-[#9c7942]/20 border-[#9c7942] text-white'
                                        : 'border-gray-700 text-gray-400 hover:border-gray-500'
                                ]">
                                {{ t('feedback.no') }}
                            </button>
                        </div>
                        <div v-if="question.type === 'boolean' && question.conditionalText && answers[question.id] === true" class="mt-3">
                            <textarea v-model="comments[question.id]"
                                class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none min-h-[80px]"
                                :placeholder="t('feedback.conditionalText.placeholder')" />
                        </div>

                        <div v-if="question.type === 'text'">
                            <textarea v-model="answers[question.id] as string"
                                class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none min-h-[100px]"
                                :placeholder="question.required ? t('feedback.answer.placeholder') : t('feedback.answer.optional.placeholder')" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between gap-4 mt-8">
                <button @click="prevPage"
                    class="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-all">
                    {{ t('feedback.back') }}
                </button>
                <button @click="nextPage" :disabled="!canProceed"
                    :class="[
                        'px-8 py-3 font-bold rounded-lg transition-all',
                        canProceed
                            ? 'bg-[#9c7942] hover:bg-[#8a6b3a] text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    ]">
                    {{ currentPage < FEEDBACK_QUESTIONS.length - 1 ? t('feedback.next') : t('feedback.submit') }}
                </button>
            </div>
        </div>

        <div v-if="currentPhase === 'processing'" class="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div class="relative w-24 h-24 mb-8">
                <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div class="absolute top-0 left-0 w-full h-full border-4 border-[#9c7942] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">{{ t('feedback.processing') }}</h3>
            <p class="text-gray-400 animate-pulse">{{ t('feedback.wait') }}</p>
        </div>

        <div v-if="currentPhase === 'thank-you'" class="text-center space-y-8 py-12 animate-fade-in">
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
    </div>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
