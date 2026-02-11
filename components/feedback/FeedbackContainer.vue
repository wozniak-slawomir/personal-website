<script setup lang="ts">
import { ref, computed } from 'vue';
import { FEEDBACK_QUESTIONS, CLIENT_CHECK_PAGE_INDEX, CLIENT_QUESTIONS_PAGE_INDEX } from '~/const/feedback';
import { isValidEmail } from '~/lib/utils';
import FeedbackIntro from './phases/FeedbackIntro.vue';
import FeedbackQuestions from './phases/FeedbackQuestions.vue';
import FeedbackProcessing from './phases/FeedbackProcessing.vue';
import FeedbackThankYou from './phases/FeedbackThankYou.vue';

const { t } = useI18n();

type Phase = 'intro' | 'questions' | 'processing' | 'thank-you';

const currentPhase = ref<Phase>('intro');
const currentPage = ref(0);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

const email = ref('');
const honeypot = ref(''); // Honeypot for bot detection
const answers = ref<Record<string, string | number | boolean | null>>({});
const comments = ref<Record<string, string>>({});

const isClient = computed(() => answers.value['is_client'] === true);

function shouldShowQuestion(q: any): boolean {
    if (!q.condition) return true;
    return answers.value[q.condition.questionId] === q.condition.value;
}

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
            if (!shouldShowQuestion(q)) continue;
            
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

const isEmailValid = computed(() => {
    if (!email.value || email.value.trim() === '') {
        return true; // Empty email is valid (optional field)
    }
    // Email format validation
    return isValidEmail(email.value);
});

const canProceed = computed(() => {
    const questions = currentQuestions.value;
    return questions.every(q => {
        if (!shouldShowQuestion(q)) return true;
        if (!q.required) return true;
        const answer = answers.value[q.id];
        return answer !== undefined && answer !== null && answer !== '';
    });
});

const displayPageNumber = computed(() => {
    if (!isClient.value && currentPage.value > CLIENT_QUESTIONS_PAGE_INDEX) {
        return currentPage.value;
    }
    return currentPage.value + 1;
});

const displayTotalPages = computed(() => {
    if (!isClient.value && answers.value['is_client'] !== undefined) {
        return FEEDBACK_QUESTIONS.length - 1;
    }
    return FEEDBACK_QUESTIONS.length;
});

const isLastPage = computed(() => {
    return currentPage.value >= FEEDBACK_QUESTIONS.length - 1;
});

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
            email: email.value || undefined,
            website: honeypot.value // Include honeypot field
        };

        // Dynamically build payload from questions
        for (const page of FEEDBACK_QUESTIONS) {
            for (const q of page) {
                // Skip client-only questions if user is not a client
                if (q.clientOnly && !isClient.value) continue;
                // Skip questions that don't meet their conditions
                if (!shouldShowQuestion(q)) continue;

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

        const { csrf } = useCsrf()
        await $fetch('/api/feedback/responses', {
            method: 'POST',
            headers: {
                'csrf-token': csrf
            },
            body: payload,
        });

        setTimeout(() => {
            currentPhase.value = 'thank-you';
        }, 1500);
    } catch (e: unknown) {
        const err = e as { statusCode?: number; statusMessage?: string };
        
        // Handle rate limiting
        if (err.statusCode === 429) {
            error.value = t('feedback.rateLimitError') || 'Too many submissions. Please try again later.';
        } else {
            error.value = err.statusMessage || t('feedback.submitError') || 'An error occurred while submitting the survey';
        }
        
        currentPhase.value = 'questions';
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <div class="w-full max-w-4xl mx-auto p-4 md:p-8">
        <FeedbackIntro
            v-if="currentPhase === 'intro'"
            v-model:email="email"
            v-model:honeypot="honeypot"
            :is-valid="isEmailValid"
            @start="startSurvey"
        />

        <FeedbackQuestions
            v-if="currentPhase === 'questions'"
            v-model:answers="answers"
            v-model:comments="comments"
            :questions="currentQuestions"
            :progress="progressPercent"
            :page="displayPageNumber"
            :total-pages="displayTotalPages"
            :error="error"
            :is-last-page="isLastPage"
            :can-proceed="canProceed"
            @prev="prevPage"
            @next="nextPage"
            @submit="submitSurvey"
        />

        <FeedbackProcessing
            v-if="currentPhase === 'processing'"
        />

        <FeedbackThankYou
            v-if="currentPhase === 'thank-you'"
        />
    </div>
</template>
