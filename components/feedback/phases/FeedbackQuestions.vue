<script setup lang="ts">
import { DISCOVERY_SOURCES, type FeedbackQuestion } from '~/const/feedback';

const { t } = useI18n();

const props = defineProps<{
    questions: FeedbackQuestion[];
    progress: number;
    page: number;
    totalPages: number;
    error: string | null;
    isLastPage: boolean;
    canProceed: boolean;
}>();

const emit = defineEmits<{
    (e: 'next'): void;
    (e: 'prev'): void;
    (e: 'submit'): void;
}>();

const answers = defineModel<Record<string, string | number | boolean | null>>('answers', { required: true });
const comments = defineModel<Record<string, string>>('comments', { required: true });

function getSourceLabel(value: string): string {
    return t(`feedback.sources.${value}`);
}

function getQuestionText(questionId: string): string {
    return t(`feedback.questions.${questionId}`);
}
</script>

<template>
    <div class="space-y-8 py-8 animate-fade-in">
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-white mb-2">{{ t('feedback.title') }}</h2>
            <p class="text-gray-400">{{ t('feedback.page') }} {{ page }} {{ t('feedback.of') }} {{ totalPages }}</p>
            <div class="w-full bg-gray-800 rounded-full h-2 mt-4">
                <div class="bg-[#9c7942] h-2 rounded-full transition-all duration-300"
                    :style="{ width: progress + '%' }"></div>
            </div>
        </div>

        <div v-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {{ error }}
        </div>

        <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800">
            <div class="space-y-8">
                <div v-for="question in questions" :key="question.id" class="space-y-3">
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
                            <input v-model="comments[question.id]" type="text" maxlength="2000"
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
                        <textarea v-model="comments[question.id]" maxlength="2000"
                            class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none min-h-[80px]"
                            :placeholder="t('feedback.conditionalText.placeholder')" />
                    </div>

                    <div v-if="question.type === 'text'">
                        <textarea v-model="answers[question.id] as string" maxlength="2000"
                            class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none min-h-[100px]"
                            :placeholder="question.required ? t('feedback.answer.placeholder') : t('feedback.answer.optional.placeholder')" />
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-between gap-4 mt-8">
            <button @click="emit('prev')"
                class="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-all">
                {{ t('feedback.back') }}
            </button>
            <button @click="isLastPage ? emit('submit') : emit('next')" :disabled="!canProceed"
                :class="[
                    'px-8 py-3 font-bold rounded-lg transition-all',
                    canProceed
                        ? 'bg-[#9c7942] hover:bg-[#8a6b3a] text-white'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                ]">
                {{ !isLastPage ? t('feedback.next') : t('feedback.submit') }}
            </button>
        </div>
    </div>
</template>
