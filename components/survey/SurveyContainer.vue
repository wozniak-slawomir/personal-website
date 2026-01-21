<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { TIPI_QUESTIONS, EMPLOYMENT_TYPES } from '~/const/survey';
import { calculateBigFive, getPersonalityProfile, type PersonalityProfile } from '~/utils/personality';

type Phase = 'intro' | 'screening' | 'personality' | 'employment' | 'processing' | 'thank-you' | 'already-submitted';

const currentPhase = ref<Phase>('intro');
const personalityPage = ref(0);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

// Survey data
const answers = ref<Record<string, number>>({});
const results = ref<PersonalityProfile | null>(null);
const employment = ref({
    type: '',
    experience: 0,
    salary: 0,
});

const currentQuestions = computed(() => TIPI_QUESTIONS[personalityPage.value] || []);

const canProceedPersonality = computed(() => {
    return currentQuestions.value.every(q => answers.value[q.id] !== undefined);
});

const canProceedEmployment = computed(() => {
    return employment.value.type && 
           employment.value.experience >= 0 && 
           employment.value.salary > 0;
});

const progressPercent = computed(() => {
    const totalQuestions = TIPI_QUESTIONS.reduce((sum, page) => sum + page.length, 0);
    const answered = Object.keys(answers.value).length;
    return Math.round((answered / totalQuestions) * 100);
});

// Check if IP has already submitted
async function checkIP() {
    try {
        const response = await $fetch<{ hasSubmitted: boolean }>('/api/survey/check-ip');
        if (response.hasSubmitted) {
            currentPhase.value = 'already-submitted';
        }
    } catch (e) {
        console.error('Error checking IP:', e);
    }
}

function startSurvey() {
    currentPhase.value = 'screening';
}

function startPersonality() {
    currentPhase.value = 'personality';
    personalityPage.value = 0;
}

function nextPersonalityPage() {
    if (personalityPage.value < TIPI_QUESTIONS.length - 1) {
        personalityPage.value++;
    } else {
        currentPhase.value = 'employment';
    }
}

function prevPersonalityPage() {
    if (personalityPage.value > 0) {
        personalityPage.value--;
    } else {
        currentPhase.value = 'screening';
    }
}

async function submitSurvey() {
    if (!canProceedEmployment.value) return;

    isSubmitting.value = true;
    error.value = null;
    currentPhase.value = 'processing';

    try {
        // Calculate results client-side for immediate feedback
        const scores = calculateBigFive(answers.value);
        results.value = getPersonalityProfile(scores);

        await $fetch('/api/survey/responses', {
            method: 'POST',
            body: {
                ...answers.value,
                experience_years: employment.value.experience,
                employment_type: employment.value.type,
                salary_net: employment.value.salary,
                // We could also send calculated scores if backend schema supports it, 
                // but for now we send raw answers as per request "open to extension"
            },
        });

        setTimeout(() => {
            currentPhase.value = 'thank-you';
        }, 1500);
    } catch (e: unknown) {
        const err = e as { statusCode?: number; statusMessage?: string };
        if (err.statusCode === 409) {
            currentPhase.value = 'already-submitted';
        } else {
            error.value = err.statusMessage || 'Wystąpił błąd podczas wysyłania ankiety';
            currentPhase.value = 'employment';
        }
    } finally {
        isSubmitting.value = false;
    }
}

onMounted(() => {
    checkIP();
});
</script>

<template>
    <div class="w-full max-w-4xl mx-auto p-4 md:p-8">
        <!-- Phase: Intro -->
        <div v-if="currentPhase === 'intro'" class="text-center space-y-8 py-12 animate-fade-in">
            <div class="inline-block p-4 rounded-full bg-[#252525] border border-[#9c7942] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#9c7942]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Badanie programistów <br />
                <span class="text-[#9c7942]">osobowość a zarobki</span>
            </h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                Pomóż zbadać jak cechy osobowości wpływają na zarobki w IT.
                Wypełnienie ankiety zajmie około 5 minut.
            </p>
            <p class="text-sm text-gray-500">
                Ankieta jest w pełni anonimowa.
            </p>
            <div class="flex justify-center mt-8">
                <button @click="startSurvey"
                    class="px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-[#9c7942]/20">
                    Rozpocznij ankietę
                </button>
            </div>
        </div>

        <!-- Phase: Screening -->
        <div v-if="currentPhase === 'screening'" class="space-y-8 py-12 animate-fade-in">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-white mb-4">Zanim zaczniemy...</h2>
                <p class="text-gray-400">Upewnijmy się, że ankieta jest dla Ciebie</p>
            </div>
            
            <div class="bg-[#1a1a1a] rounded-xl p-8 border border-gray-800">
                <div class="space-y-6 text-center">
                    <p class="text-lg text-white">
                        Ta ankieta jest przeznaczona dla <span class="text-[#9c7942] font-semibold">programistów mieszkających w Polsce</span>.
                    </p>
                    <p class="text-gray-400">
                        Jeśli spełniasz te warunki, kliknij poniżej aby kontynuować.
                    </p>
                </div>
            </div>

            <div class="flex justify-center gap-4 mt-8">
                <button @click="currentPhase = 'intro'"
                    class="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-all">
                    Wróć
                </button>
                <button @click="startPersonality"
                    class="px-8 py-3 bg-[#9c7942] hover:bg-[#8a6b3a] text-white font-bold rounded-lg transition-all">
                    Tak, jestem programist(k)ą w Polsce
                </button>
            </div>
        </div>

        <!-- Phase: Personality -->
        <div v-if="currentPhase === 'personality'" class="space-y-8 py-8 animate-fade-in">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-white mb-2">Test osobowości</h2>
                <p class="text-gray-400">Strona {{ personalityPage + 1 }} z {{ TIPI_QUESTIONS.length }}</p>
                <div class="w-full bg-gray-800 rounded-full h-2 mt-4">
                    <div class="bg-[#9c7942] h-2 rounded-full transition-all duration-300"
                        :style="{ width: progressPercent + '%' }"></div>
                </div>
            </div>

            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800">
                <p class="text-sm text-gray-500 mb-6 text-center">
                    Oceń, na ile poniższe stwierdzenia Cię opisują (1 = wcale, 5 = bardzo trafnie)
                </p>

                <div class="space-y-8">
                    <div v-for="question in currentQuestions" :key="question.id" class="space-y-3">
                        <p class="text-white font-medium">{{ question.text }}</p>
                        <div class="flex justify-between items-center gap-2">
                            <span class="text-xs text-gray-500 w-20 text-left">Nietrafnie</span>
                            <div class="flex gap-2 flex-1 justify-center">
                                <button v-for="n in 5" :key="n" @click="answers[question.id] = n"
                                    :class="[
                                        'w-12 h-12 rounded-full border-2 transition-all text-lg font-bold',
                                        answers[question.id] === n
                                            ? 'bg-[#9c7942] border-[#9c7942] text-white'
                                            : 'border-gray-600 text-gray-400 hover:border-[#9c7942] hover:text-white'
                                    ]">
                                    {{ n }}
                                </button>
                            </div>
                            <span class="text-xs text-gray-500 w-20 text-right">Trafnie</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between gap-4 mt-8">
                <button @click="prevPersonalityPage"
                    class="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-all">
                    Wstecz
                </button>
                <button @click="nextPersonalityPage" :disabled="!canProceedPersonality"
                    :class="[
                        'px-8 py-3 font-bold rounded-lg transition-all',
                        canProceedPersonality
                            ? 'bg-[#9c7942] hover:bg-[#8a6b3a] text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    ]">
                    {{ personalityPage < TIPI_QUESTIONS.length - 1 ? 'Dalej' : 'Przejdź do danych' }}
                </button>
            </div>
        </div>

        <!-- Phase: Employment -->
        <div v-if="currentPhase === 'employment'" class="space-y-8 py-8 animate-fade-in">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-white mb-2">Informacje o zatrudnieniu</h2>
                <p class="text-gray-400">Ostatni krok przed wysłaniem</p>
            </div>

            <div v-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
                {{ error }}
            </div>

            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800 space-y-8">
                <!-- Employment Type -->
                <div class="space-y-3">
                    <label class="text-white font-medium block">Forma zatrudnienia</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button v-for="type in EMPLOYMENT_TYPES" :key="type.value"
                            @click="employment.type = type.value"
                            :class="[
                                'p-4 rounded-lg border-2 text-left transition-all',
                                employment.type === type.value
                                    ? 'bg-[#9c7942]/20 border-[#9c7942] text-white'
                                    : 'border-gray-700 text-gray-400 hover:border-gray-500'
                            ]">
                            {{ type.label }}
                        </button>
                    </div>
                </div>

                <!-- Experience -->
                <div class="space-y-3">
                    <label class="text-white font-medium block">
                        Staż pracy jako programista (w latach)
                    </label>
                    <input v-model.number="employment.experience" type="number" min="0" max="50" step="0.5"
                        class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none"
                        placeholder="np. 3" />
                </div>

                <!-- Salary -->
                <div class="space-y-3">
                    <label class="text-white font-medium block">
                        Średnie miesięczne zarobki netto (PLN)
                    </label>
                    <p class="text-sm text-gray-500">
                        W przypadku B2B: po opłaceniu ZUS, PIT i księgowości
                    </p>
                    <input v-model.number="employment.salary" type="number" min="0" step="100"
                        class="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#9c7942] focus:outline-none"
                        placeholder="np. 15000" />
                </div>
            </div>

            <div class="flex justify-between gap-4 mt-8">
                <button @click="currentPhase = 'personality'; personalityPage = TIPI_QUESTIONS.length - 1"
                    class="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-all">
                    Wstecz
                </button>
                <button @click="submitSurvey" :disabled="!canProceedEmployment || isSubmitting"
                    :class="[
                        'px-8 py-3 font-bold rounded-lg transition-all',
                        canProceedEmployment && !isSubmitting
                            ? 'bg-[#9c7942] hover:bg-[#8a6b3a] text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    ]">
                    {{ isSubmitting ? 'Wysyłam...' : 'Wyślij ankietę' }}
                </button>
            </div>
        </div>

        <!-- Phase: Processing -->
        <div v-if="currentPhase === 'processing'" class="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div class="relative w-24 h-24 mb-8">
                <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div class="absolute top-0 left-0 w-full h-full border-4 border-[#9c7942] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Zapisuję odpowiedzi...</h3>
            <p class="text-gray-400 animate-pulse">Proszę czekać</p>
        </div>

        <!-- Phase: Thank You / Results -->
        <div v-if="currentPhase === 'thank-you'" class="space-y-12 py-12 animate-fade-in">
            <div class="text-center space-y-6">
                <div class="inline-block p-4 rounded-full bg-[#252525] border border-green-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 class="text-3xl font-bold text-white">Dziękujemy za udział w badaniu!</h2>
                <p class="text-gray-400 max-w-md mx-auto">
                    Twoje odpowiedzi zostały zapisane. Poniżej znajdziesz swój profil osobowości.
                </p>
            </div>

            <div v-if="results" class="space-y-8 animate-slide-up">
                <h3 class="text-2xl font-bold text-white text-center">Twój Profil Osobowości</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="(trait, key) in results" :key="key" 
                        class="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 hover:border-[#9c7942] transition-colors">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h4 class="text-xl font-bold text-white">{{ trait.label }}</h4>
                                <span :class="[
                                    'text-sm font-medium px-2 py-1 rounded inline-block mt-1',
                                    trait.level === 'wysoki' ? 'bg-green-900/50 text-green-400' :
                                    trait.level === 'niski' ? 'bg-blue-900/50 text-blue-400' :
                                    'bg-gray-700/50 text-gray-400'
                                ]">
                                    Poziom: {{ trait.level }}
                                </span>
                            </div>
                            <div class="text-right">
                                <span class="text-2xl font-bold text-[#9c7942]">{{ trait.score }}</span>
                                <span class="text-sm text-gray-600">/20</span>
                            </div>
                        </div>

                        <div class="w-full bg-gray-800 rounded-full h-2 mb-4">
                            <div class="bg-[#9c7942] h-2 rounded-full transition-all duration-1000"
                                :style="{ width: (trait.score / 20 * 100) + '%' }"></div>
                        </div>

                        <p class="text-gray-400 text-sm leading-relaxed">
                            {{ trait.description }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="text-center pt-8">
                <a href="/"
                    class="inline-block px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all">
                    Wróć na stronę główną
                </a>
            </div>
        </div>

        <!-- Phase: Already Submitted -->
        <div v-if="currentPhase === 'already-submitted'" class="text-center space-y-8 py-12 animate-fade-in">
            <div class="inline-block p-4 rounded-full bg-[#252525] border border-gray-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 class="text-3xl font-bold text-white">Już wypełniłeś/aś ankietę</h2>
            <p class="text-gray-400 max-w-md mx-auto">
                Dziękujemy za udział w badaniu! Z jednego adresu IP można wypełnić ankietę tylko raz.
            </p>
            <a href="/"
                class="inline-block mt-8 px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all">
                Wróć na stronę główną
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

.animate-slide-up {
    animation: slideUp 0.7s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
