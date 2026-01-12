<script setup lang="ts">
import { ref, computed } from 'vue';

type Phase = 'intro' | 'screening' | 'personality' | 'employment' | 'processing' | 'result' | 'already-submitted' | 'stats';

const currentPhase = ref<Phase>('intro');
const personalityPage = ref(0);
const isSubmitting = ref(false);
const error = ref<string | null>(null);
const showStats = ref(false);

// Survey data
const answers = ref<Record<string, number>>({});
const employment = ref({
    type: '',
    experience: 0,
    salary: 0,
});

// Results
const results = ref<{
    predictedSalary: number;
    actualSalary: number;
    difference: number;
    bigFive: {
        extraversion: number;
        agreeableness: number;
        conscientiousness: number;
        emotionalStability: number;
        intellect: number;
    };
} | null>(null);

// TIPI Questions organized by page (4 questions per page)
const tipiQuestions = [
    // Page 1
    [
        { id: 'e_plus_1', text: 'Jestem duszą towarzystwa.' },
        { id: 'u_minus_1', text: 'Niezbyt obchodzą mnie inni ludzie.' },
        { id: 's_minus_1', text: 'Zostawiam moje rzeczy gdzie popadnie.' },
        { id: 'se_plus_1', text: 'Zwykle jestem zrelaksowany/a.' },
    ],
    // Page 2
    [
        { id: 'i_plus_1', text: 'Mam bogate słownictwo.' },
        { id: 'e_minus_2', text: 'Trzymam się z boku.' },
        { id: 'u_plus_2', text: 'Jestem wyrozumiały/a dla uczuć innych ludzi.' },
        { id: 's_plus_2', text: 'Bez zwłoki wypełniam codzienne obowiązki.' },
    ],
    // Page 3
    [
        { id: 'se_minus_2', text: 'Często martwię się czymś.' },
        { id: 'i_minus_2', text: 'Mam trudności ze zrozumieniem abstrakcyjnych pojęć.' },
        { id: 'e_plus_3', text: 'Rozmawiam z wieloma różnymi ludźmi na przyjęciach.' },
        { id: 'u_minus_3', text: 'Nie interesują mnie problemy innych ludzi.' },
    ],
    // Page 4
    [
        { id: 's_minus_3', text: 'Często zapominam odkładać rzeczy na miejsce.' },
        { id: 'se_plus_3', text: 'Rzadko czuję się przygnębiony/a.' },
        { id: 'i_plus_3', text: 'Mam głowę pełną pomysłów.' },
        { id: 'e_minus_4', text: 'Wśród nieznajomych jestem małomówny/a.' },
    ],
    // Page 5
    [
        { id: 'u_plus_4', text: 'Znajduję czas dla innych.' },
        { id: 's_plus_4', text: 'Postępuję zgodnie z harmonogramem.' },
        { id: 'se_minus_4', text: 'Często miewam huśtawki nastrojów.' },
        { id: 'i_minus_4', text: 'Nie mam zbyt bogatej wyobraźni.' },
    ],
];

const employmentTypes = [
    { value: 'B2B', label: 'B2B (własna działalność)' },
    { value: 'UoP', label: 'Umowa o pracę' },
    { value: 'Cywilnoprawna', label: 'Umowa cywilnoprawna' },
    { value: 'Inne', label: 'Inne' },
];

const currentQuestions = computed(() => tipiQuestions[personalityPage.value] || []);

const canProceedPersonality = computed(() => {
    return currentQuestions.value.every(q => answers.value[q.id] !== undefined);
});

const canProceedEmployment = computed(() => {
    return employment.value.type && 
           employment.value.experience >= 0 && 
           employment.value.salary > 0;
});

const progressPercent = computed(() => {
    const totalQuestions = 20;
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
    if (personalityPage.value < tipiQuestions.length - 1) {
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
        const response = await $fetch<typeof results.value>('/api/survey/responses', {
            method: 'POST',
            body: {
                ...answers.value,
                experience_years: employment.value.experience,
                employment_type: employment.value.type,
                salary_net: employment.value.salary,
            },
        });

        results.value = response;
        setTimeout(() => {
            currentPhase.value = 'result';
        }, 2000);
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

function viewStats() {
    showStats.value = true;
    currentPhase.value = 'stats';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Check IP on mount
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
                Twój kod jest świetny, <br />
                <span class="text-[#9c7942]">a co z Twoją stawką?</span>
            </h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                Zbadaj jak Twoja osobowość wpływa na zarobki w IT.
                Wypełnienie ankiety zajmie około 5 minut.
            </p>
            <p class="text-sm text-gray-500">
                Ankieta jest w pełni anonimowa. Wyniki badania dostępne na: 
                <a href="/newsletter" class="text-[#9c7942] hover:underline">newsletter</a>
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button @click="startSurvey"
                    class="px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-[#9c7942]/20">
                    Rozpocznij ankietę
                </button>
                <button @click="viewStats"
                    class="px-8 py-4 bg-transparent border border-gray-600 hover:border-[#9c7942] text-gray-300 text-lg rounded-lg transition-all">
                    Zobacz statystyki
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
                <p class="text-gray-400">Strona {{ personalityPage + 1 }} z {{ tipiQuestions.length }}</p>
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
                    {{ personalityPage < tipiQuestions.length - 1 ? 'Dalej' : 'Przejdź do danych' }}
                </button>
            </div>
        </div>

        <!-- Phase: Employment -->
        <div v-if="currentPhase === 'employment'" class="space-y-8 py-8 animate-fade-in">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-white mb-2">Informacje o zatrudnieniu</h2>
                <p class="text-gray-400">Ostatni krok przed wynikami</p>
            </div>

            <div v-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
                {{ error }}
            </div>

            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800 space-y-8">
                <!-- Employment Type -->
                <div class="space-y-3">
                    <label class="text-white font-medium block">Forma zatrudnienia</label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button v-for="type in employmentTypes" :key="type.value"
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
                <button @click="currentPhase = 'personality'; personalityPage = tipiQuestions.length - 1"
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
                    {{ isSubmitting ? 'Wysyłam...' : 'Zobacz wyniki' }}
                </button>
            </div>
        </div>

        <!-- Phase: Processing -->
        <div v-if="currentPhase === 'processing'" class="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div class="relative w-24 h-24 mb-8">
                <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div class="absolute top-0 left-0 w-full h-full border-4 border-[#9c7942] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Analizuję Twoje odpowiedzi...</h3>
            <p class="text-gray-400 animate-pulse">Obliczam predykcję zarobków</p>
        </div>

        <!-- Phase: Result -->
        <div v-if="currentPhase === 'result' && results" class="space-y-8 py-8 animate-fade-in">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-white mb-2">Twoje wyniki</h2>
                <p class="text-gray-400">Na podstawie modelu regresji z badania</p>
            </div>

            <!-- Salary Comparison -->
            <div class="bg-gradient-to-br from-[#1a1a1a] to-[#252525] rounded-xl p-8 border border-[#9c7942]/30">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <p class="text-gray-400 mb-2">Twoje zarobki</p>
                        <p class="text-3xl font-bold text-white">{{ results.actualSalary.toLocaleString() }} PLN</p>
                    </div>
                    <div>
                        <p class="text-gray-400 mb-2">Predykcja modelu</p>
                        <p class="text-3xl font-bold text-[#9c7942]">{{ results.predictedSalary.toLocaleString() }} PLN</p>
                    </div>
                    <div>
                        <p class="text-gray-400 mb-2">Różnica</p>
                        <p :class="[
                            'text-3xl font-bold',
                            results.difference > 0 ? 'text-green-400' : results.difference < 0 ? 'text-red-400' : 'text-gray-400'
                        ]">
                            {{ results.difference > 0 ? '+' : '' }}{{ results.difference.toLocaleString() }} PLN
                        </p>
                    </div>
                </div>
                <p v-if="results.difference > 0" class="text-center mt-6 text-green-400">
                    🎉 Zarabiasz więcej niż przewiduje model!
                </p>
                <p v-else-if="results.difference < 0" class="text-center mt-6 text-gray-400">
                    Model sugeruje, że masz potencjał do wyższych zarobków.
                </p>
            </div>

            <!-- Big Five Results -->
            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800">
                <h3 class="text-xl font-bold text-white mb-6">Twój profil osobowości (Big Five)</h3>
                <div class="space-y-4">
                    <div v-for="(value, trait) in {
                        'Ekstrawersja': results.bigFive.extraversion,
                        'Ugodowość': results.bigFive.agreeableness,
                        'Sumienność': results.bigFive.conscientiousness,
                        'Stabilność emocjonalna': results.bigFive.emotionalStability,
                        'Intelekt/Otwartość': results.bigFive.intellect
                    }" :key="trait" class="space-y-1">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-300">{{ trait }}</span>
                            <span class="text-white font-medium">{{ value.toFixed(2) }}</span>
                        </div>
                        <div class="w-full bg-gray-800 rounded-full h-2">
                            <div class="bg-[#9c7942] h-2 rounded-full transition-all duration-500"
                                :style="{ width: ((value - 1) / 4 * 100) + '%' }"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <button @click="viewStats"
                    class="px-8 py-3 bg-[#9c7942] hover:bg-[#8a6b3a] text-white font-bold rounded-lg transition-all">
                    Zobacz pełne statystyki
                </button>
                <a href="/newsletter"
                    class="px-8 py-3 bg-transparent border border-gray-600 hover:border-[#9c7942] text-gray-300 text-center rounded-lg transition-all">
                    Zapisz się na newsletter
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
            <button @click="viewStats"
                class="mt-8 px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all">
                Zobacz statystyki
            </button>
        </div>

        <!-- Phase: Stats -->
        <div v-if="currentPhase === 'stats'" class="animate-fade-in">
            <LazySurveyStats @back="currentPhase = 'intro'" />
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
