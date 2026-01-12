<script setup lang="ts">
const emit = defineEmits<{
    back: [];
}>();

interface Stats {
    totalResponses: number;
    totalOutliers: number;
    salary: {
        mean: number;
        stdDev: number;
        min: number;
        max: number;
    };
    bigFiveAverages: {
        extraversion: number;
        agreeableness: number;
        conscientiousness: number;
        emotionalStability: number;
        intellect: number;
    };
    employmentDistribution: Record<string, number>;
    b2bPercentage: number;
    experience: {
        mean: number;
        stdDev: number;
    };
    modelAccuracy: {
        rSquared: number;
        standardError: number;
        meanAbsoluteError: number;
    };
    regressionCoefficients: {
        intercept: number;
        czy_b2b: number;
        staz_pracy: number;
        ekstrawersja: number;
        ugodowosc: number;
        sumiennosc: number;
        stabilnosc_emocjonalna: number;
        intelekt: number;
    };
    salaryByExperience: Array<{
        label: string;
        count: number;
        avgSalary: number;
    }>;
    responsesOverTime: Array<{
        date: string;
        count: number;
    }>;
}

const { data: stats, pending, error } = await useFetch<Stats>('/api/survey/stats');

const coefficientLabels: Record<string, string> = {
    intercept: 'Stała (Intercept)',
    czy_b2b: 'B2B (vs UoP)',
    staz_pracy: 'Staż pracy (rok)',
    ekstrawersja: 'Ekstrawersja',
    ugodowosc: 'Ugodowość',
    sumiennosc: 'Sumienność',
    stabilnosc_emocjonalna: 'Stabilność emocjonalna',
    intelekt: 'Intelekt/Otwartość',
};

const employmentLabels: Record<string, string> = {
    B2B: 'B2B',
    UoP: 'Umowa o pracę',
    Cywilnoprawna: 'Umowa cywilnoprawna',
    Inne: 'Inne',
};
</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center justify-between mb-8">
            <div>
                <h2 class="text-3xl font-bold text-white">Statystyki badania</h2>
                <p class="text-gray-400 mt-2">Dane z ankiety osobowości programistów</p>
            </div>
            <button @click="emit('back')"
                class="px-6 py-2 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-all">
                ← Powrót
            </button>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="flex justify-center py-12">
            <div class="w-12 h-12 border-4 border-gray-700 border-t-[#9c7942] rounded-full animate-spin"></div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-6 py-4 rounded-lg">
            Nie udało się załadować statystyk. Spróbuj ponownie później.
        </div>

        <!-- Stats Content -->
        <template v-else-if="stats">
            <!-- Overview Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                    <p class="text-gray-400 text-sm mb-1">Liczba odpowiedzi</p>
                    <p class="text-3xl font-bold text-white">{{ stats.totalResponses }}</p>
                </div>
                <div class="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                    <p class="text-gray-400 text-sm mb-1">Średnie zarobki</p>
                    <p class="text-3xl font-bold text-[#9c7942]">{{ stats.salary.mean.toLocaleString() }} PLN</p>
                </div>
                <div class="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                    <p class="text-gray-400 text-sm mb-1">% na B2B</p>
                    <p class="text-3xl font-bold text-white">{{ stats.b2bPercentage }}%</p>
                </div>
                <div class="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                    <p class="text-gray-400 text-sm mb-1">Średni staż</p>
                    <p class="text-3xl font-bold text-white">{{ stats.experience.mean }} lat</p>
                </div>
            </div>

            <!-- Big Five Averages -->
            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800">
                <h3 class="text-xl font-bold text-white mb-6">Średnie wyniki Big Five</h3>
                <div class="space-y-4">
                    <div v-for="(value, trait) in {
                        'Ekstrawersja': stats.bigFiveAverages.extraversion,
                        'Ugodowość': stats.bigFiveAverages.agreeableness,
                        'Sumienność': stats.bigFiveAverages.conscientiousness,
                        'Stabilność emocjonalna': stats.bigFiveAverages.emotionalStability,
                        'Intelekt/Otwartość': stats.bigFiveAverages.intellect
                    }" :key="trait" class="space-y-1">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-300">{{ trait }}</span>
                            <span class="text-white font-medium">{{ value.toFixed(2) }} / 5</span>
                        </div>
                        <div class="w-full bg-gray-800 rounded-full h-3">
                            <div class="bg-[#9c7942] h-3 rounded-full transition-all duration-500"
                                :style="{ width: ((value - 1) / 4 * 100) + '%' }"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Salary by Experience -->
            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800">
                <h3 class="text-xl font-bold text-white mb-6">Zarobki wg stażu</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-for="bracket in stats.salaryByExperience" :key="bracket.label"
                        class="bg-[#252525] rounded-lg p-4 text-center">
                        <p class="text-gray-400 text-sm">{{ bracket.label }}</p>
                        <p class="text-2xl font-bold text-[#9c7942] mt-2">
                            {{ bracket.avgSalary.toLocaleString() }} PLN
                        </p>
                        <p class="text-xs text-gray-500 mt-1">({{ bracket.count }} osób)</p>
                    </div>
                </div>
            </div>

            <!-- Model Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Model Accuracy -->
                <div class="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                    <h3 class="text-xl font-bold text-white mb-4">Dokładność modelu</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <span class="text-gray-400">R² (wyjaśniona wariancja)</span>
                            <span class="text-white font-medium">{{ (stats.modelAccuracy.rSquared * 100).toFixed(1) }}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Błąd standardowy</span>
                            <span class="text-white font-medium">{{ Math.round(stats.modelAccuracy.standardError).toLocaleString() }} PLN</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Średni błąd bezwzględny (MAE)</span>
                            <span class="text-white font-medium">{{ stats.modelAccuracy.meanAbsoluteError.toLocaleString() }} PLN</span>
                        </div>
                    </div>
                </div>

                <!-- Employment Distribution -->
                <div class="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                    <h3 class="text-xl font-bold text-white mb-4">Forma zatrudnienia</h3>
                    <div class="space-y-3">
                        <div v-for="(count, type) in stats.employmentDistribution" :key="type"
                            class="flex items-center gap-3">
                            <div class="flex-1">
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-gray-300">{{ employmentLabels[type] || type }}</span>
                                    <span class="text-white">{{ count }}</span>
                                </div>
                                <div class="w-full bg-gray-800 rounded-full h-2">
                                    <div class="bg-[#9c7942] h-2 rounded-full"
                                        :style="{ width: (count / stats.totalResponses * 100) + '%' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Regression Coefficients -->
            <div class="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-gray-800">
                <h3 class="text-xl font-bold text-white mb-2">Współczynniki regresji</h3>
                <p class="text-gray-400 text-sm mb-6">
                    Wartość współczynnika pokazuje zmianę zarobków (PLN) przy wzroście zmiennej o 1 jednostkę
                </p>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="border-b border-gray-700">
                                <th class="py-3 text-gray-400 font-medium">Zmienna</th>
                                <th class="py-3 text-gray-400 font-medium text-right">Współczynnik (PLN)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, key) in stats.regressionCoefficients" :key="key"
                                class="border-b border-gray-800">
                                <td class="py-3 text-white">{{ coefficientLabels[key] || key }}</td>
                                <td class="py-3 text-right font-mono"
                                    :class="value >= 0 ? 'text-green-400' : 'text-red-400'">
                                    {{ value >= 0 ? '+' : '' }}{{ Math.round(value).toLocaleString() }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Note about outliers -->
            <p class="text-center text-gray-500 text-sm">
                Odpowiedzi odbiegające o więcej niż 3 odchylenia standardowe są traktowane jako outliers 
                ({{ stats.totalOutliers }} odpowiedzi) i nie są uwzględnione w statystykach.
            </p>
        </template>
    </div>
</template>
