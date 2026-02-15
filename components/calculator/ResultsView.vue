<script setup lang="ts">
import { useCalculator } from '~/composables/useCalculator';
import { formatCurrency } from '~/utils/currency';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { VisGroupedBar, VisXYContainer, VisAxis, VisSingleContainer, VisDonut } from '@unovis/vue';
import { ChartContainer, ChartLegend, type ChartConfig } from '~/components/ui/chart';

const { t } = useI18n();
const localePath = useLocalePath();
const { state, totalYearlyCost, total5YearCost, zombieYearlyCost, wellSpentYearlyCost, conflicts, resetCalculator } = useCalculator();

const isPerfectScore = computed(() => zombieYearlyCost.value === 0);

const contextItem = computed(() => {
    const loss = totalYearlyCost.value;
    if (loss > 15000) return { icon: '🚗', label: t('calculator.context.car') };
    if (loss > 10000) return { icon: '🌴', label: t('calculator.context.vacation') };
    if (loss > 6000) return { icon: '💻', label: t('calculator.context.laptop') };
    if (loss > 3000) return { icon: '📱', label: t('calculator.context.phone') };
    if (loss > 1200) return { icon: '🧖‍♀️', label: t('calculator.context.spa') };
    return { icon: '☕', label: t('calculator.context.coffee') };
});

const emit = defineEmits(['restart']);

// Fetch stats for comparison
interface Stats {
    totalResponses: number;
    averageTotalCost: number;
    averageZombieCost: number;
    averageWellSpentCost: number;
    segmentCounts: Record<string, number>;
    costsBySegment: Array<{ segment: string; wellSpent: number; zombie: number; responses: number }>;
}

const { data: stats } = await useFetch<Stats>('/api/calculator/stats');

// Save the response when the results are shown
onMounted(async () => {
    try {
        const { csrf } = useCsrf()
        await $fetch('/api/calculator/responses', {
            method: 'POST',
            headers: {
                'csrf-token': csrf
            },
            body: {
                segment: state.value.selectedSegment,
                peopleCounts: state.value.peopleCounts,
                selections: state.value.selections,
                totalYearlyCost: totalYearlyCost.value,
                zombieYearlyCost: zombieYearlyCost.value,
                wellSpentYearlyCost: wellSpentYearlyCost.value,
            },
        });
    } catch (error) {
        console.error('Failed to save response:', error);
    }
});

// Segment labels
const segmentLabels: Record<string, string> = {
    marketing: 'Marketing',
    dev: 'Programiści',
    sales: 'Sprzedaż',
    ecommerce: 'E-commerce',
    office: 'Biuro',
    personal: 'Prywatne',
};

// Comparison bar chart data - You vs Average
const comparisonData = computed(() => {
    if (!stats.value) return [];
    return [
        { category: 'Ty', index: 0 },
        { category: 'Średnia', index: 1 },
    ];
});

const comparisonChartConfig: ChartConfig = {
    wellSpent: { label: 'Dobrze wydane', color: '#10b981' },
    zombie: { label: 'Zmarnowane', color: '#ef4444' },
};

// Donut chart for your cost breakdown
const yourCostBreakdown = computed(() => {
    return [
        { label: 'Dobrze wydane', value: wellSpentYearlyCost.value, color: '#10b981' },
        { label: 'Zmarnowane', value: zombieYearlyCost.value, color: '#ef4444' },
    ].filter(d => d.value > 0);
});

// Calculate percentile (how you compare to others)
const zombiePercentile = computed(() => {
    if (!stats.value || stats.value.totalResponses < 2) return null;
    const avgZombie = stats.value.averageZombieCost;
    const yourZombie = zombieYearlyCost.value;
    
    if (yourZombie < avgZombie) {
        const percentBetter = Math.round((1 - yourZombie / avgZombie) * 100);
        return { type: 'better', percent: percentBetter };
    } else if (yourZombie > avgZombie) {
        const percentWorse = Math.round((yourZombie / avgZombie - 1) * 100);
        return { type: 'worse', percent: percentWorse };
    }
    return { type: 'average', percent: 0 };
});

// User's segment label
const userSegmentLabel = computed(() => {
    if (!state.value.selectedSegment) return 'Użytkownicy';
    return segmentLabels[state.value.selectedSegment] || state.value.selectedSegment;
});

type ComparisonData = { category: string; index: number };
type CostBreakdownData = { label: string; value: number; color: string };
</script>

<template>
    <div class="space-y-8 animate-fade-in">
        <div class="text-center space-y-2">
            <h2 class="text-3xl md:text-4xl font-bold text-white">
                {{ isPerfectScore ? $t('calculator.results.perfect_score_title') : $t('calculator.results.your_score_title') }}
            </h2>
            <p class="text-gray-400">
                {{ isPerfectScore ? $t('calculator.results.perfect_score_desc') : $t('calculator.results.your_score_desc') }}
            </p>
        </div>

        <!-- Main Score Card -->
        <div class="bg-[#252525] border-2 rounded-xl p-8 text-center relative overflow-hidden"
            :class="isPerfectScore ? 'border-green-500' : 'border-[#9c7942]'">
            <div class="absolute top-0 left-0 w-full h-1" :class="isPerfectScore ? 'bg-green-500' : 'bg-[#9c7942]'">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <p class="text-gray-400 uppercase tracking-wider text-sm mb-1">
                        {{ $t('calculator.results.money_well_spent') }}
                    </p>
                    <p class="text-4xl md:text-5xl font-bold text-green-500">{{
                        formatCurrency(wellSpentYearlyCost) }}</p>
                    <p class="text-xs text-gray-500 mt-2">
                        {{ $t('calculator.results.money_well_spent_desc') }}
                    </p>
                </div>

                <div class="border-t md:border-t-0 md:border-l border-gray-700 pt-6 md:pt-0 md:pl-6">
                    <p class="text-gray-400 uppercase tracking-wider text-sm mb-1">
                        {{ $t('calculator.results.money_wasted') }}
                    </p>
                    <p class="text-4xl md:text-5xl font-bold" :class="zombieYearlyCost > 0 ? 'text-red-500' : 'text-gray-500'">{{
                        formatCurrency(zombieYearlyCost) }}</p>
                    <p class="text-xs text-gray-500 mt-2">
                        {{ $t('calculator.results.money_wasted_desc') }}
                    </p>
                </div>
            </div>

            <div v-if="!isPerfectScore" class="mt-8 pt-6 border-t border-gray-700">
                <div class="flex flex-col items-center justify-center space-y-2">
                    <span class="text-4xl">{{ contextItem.icon }}</span>
                    <p class="text-lg text-white">
                        {{ $t('calculator.results.you_just_gave_away') }} <span class="font-bold text-[#9c7942]">{{ contextItem.label }}</span>
                    </p>
                    <p class="text-sm text-gray-400">{{ $t('calculator.results.to_silicon_valley') }}</p>
                </div>
            </div>

            <div v-else class="mt-8 pt-6 border-t border-gray-700">
                <div class="flex flex-col items-center justify-center space-y-2">
                    <span class="text-4xl">🏆</span>
                    <p class="text-lg text-white">
                        {{ $t('calculator.results.digital_hygiene') }} <span class="font-bold text-green-500">{{ $t('calculator.results.exemplary') }}</span>.
                    </p>
                    <p class="text-sm text-gray-400">{{ $t('calculator.results.keep_it_up') }}</p>
                </div>
            </div>
        </div>

        <!-- Comparison Section -->
        <div v-if="stats && stats.totalResponses > 0" class="bg-[#252525] border border-gray-700 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-2 flex items-center">
                <span class="mr-2">📊</span> Jak wypadasz na tle innych?
            </h3>
            <p class="text-gray-400 text-sm mb-6">Porównanie z {{ stats.totalResponses }} innymi użytkownikami kalkulatora</p>

            <!-- Percentile comparison badge -->
            <div v-if="zombiePercentile" class="mb-6 flex justify-center">
                <div v-if="zombiePercentile.type === 'better'" 
                    class="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-500/50 rounded-full">
                    <span class="text-2xl">🎉</span>
                    <span class="text-green-400 font-medium">
                        Marnujesz <span class="font-bold">{{ zombiePercentile.percent }}% mniej</span> niż przeciętny użytkownik!
                    </span>
                </div>
                <div v-else-if="zombiePercentile.type === 'worse'"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-500/50 rounded-full">
                    <span class="text-2xl">⚠️</span>
                    <span class="text-red-400 font-medium">
                        Marnujesz <span class="font-bold">{{ zombiePercentile.percent }}% więcej</span> niż przeciętny użytkownik
                    </span>
                </div>
                <div v-else
                    class="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-full">
                    <span class="text-2xl">📈</span>
                    <span class="text-gray-300 font-medium">Jesteś w okolicach średniej</span>
                </div>
            </div>

            <!-- Comparison Chart: You vs Average -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Bar comparison -->
                <div class="space-y-4">
                    <h4 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Ty vs Średnia</h4>
                    <ChartContainer :config="comparisonChartConfig">
                        <VisXYContainer :data="comparisonData" :margin="{ left: 80, right: 20, top: 10, bottom: 40 }">
                            <VisGroupedBar
                                :x="(d: ComparisonData) => d.index"
                                :y="[(d: ComparisonData) => d.index === 0 ? wellSpentYearlyCost : stats?.averageWellSpentCost || 0, 
                                     (d: ComparisonData) => d.index === 0 ? zombieYearlyCost : stats?.averageZombieCost || 0]"
                                :color="[comparisonChartConfig.wellSpent.color, comparisonChartConfig.zombie.color]"
                                :rounded-corners="4"
                                :bar-padding="0.3"
                                :group-padding="0.1"
                            />
                            <VisAxis
                                type="x"
                                :tick-format="(i: number) => comparisonData[i]?.category || ''"
                                :grid-line="false"
                                :tick-line="false"
                            />
                            <VisAxis
                                type="y"
                                :tick-format="(v: number) => `${Math.round(v / 1000)}k`"
                                :grid-line="true"
                                :tick-line="false"
                            />
                        </VisXYContainer>
                    </ChartContainer>
                    <ChartLegend :config="comparisonChartConfig" />
                </div>

                <!-- Your cost breakdown donut -->
                <div class="space-y-4">
                    <h4 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Twój rozkład kosztów</h4>
                    <ChartContainer :config="comparisonChartConfig">
                        <VisSingleContainer :data="yourCostBreakdown">
                            <VisDonut
                                :value="(d: CostBreakdownData) => d.value"
                                :color="(d: CostBreakdownData) => d.color"
                                :arc-width="50"
                                :pad-angle="0.02"
                                :corner-radius="4"
                            />
                        </VisSingleContainer>
                    </ChartContainer>
                    <div class="text-center">
                        <p class="text-gray-400 text-sm">
                            {{ Math.round((zombieYearlyCost / (totalYearlyCost || 1)) * 100) }}% Twoich wydatków to zombie
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border rounded-lg p-6"
                :class="isPerfectScore ? 'bg-green-900/20 border-green-900/50' : 'bg-red-900/20 border-red-900/50'">
                <h3 class="text-xl font-bold mb-2 flex items-center"
                    :class="isPerfectScore ? 'text-green-500' : 'text-red-500'">
                    <span class="mr-2">{{ isPerfectScore ? '✅' : '💸' }}</span> {{ $t('calculator.results.zombie_indicator') }}
                </h3>
                <p class="text-gray-300 mb-4">
                    {{ isPerfectScore ? $t('calculator.results.no_unused_subs') : $t('calculator.results.paying_for_unused') }}
                    <span v-if="!isPerfectScore" class="font-bold text-white block text-2xl mt-1">{{
                        formatCurrency(zombieYearlyCost) }} /
                        {{ $t('calculator.results.year') }}</span>
                </p>
                <p class="text-xs text-gray-400">
                    {{ isPerfectScore ? $t('calculator.results.all_tools_used') : $t('calculator.results.pure_loss') }}
                </p>
            </div>

            <div class="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-6">
                <h3 class="text-xl font-bold text-yellow-500 mb-2 flex items-center">
                    <span class="mr-2">⚠️</span> {{ $t('calculator.results.conflicts_and_doubles') }}
                </h3>
                <div v-if="conflicts.length > 0" class="space-y-2">
                    <ul class="list-disc list-inside text-sm text-gray-300 space-y-1">
                        <li v-for="(conflict, index) in conflicts" :key="index">{{ $t(conflict) }}</li>
                    </ul>
                </div>
                <div v-else class="text-gray-400 text-sm">
                    {{ $t('calculator.results.no_conflicts') }}
                </div>
            </div>
        </div>

        <div
            class="bg-gradient-to-r from-[#252525] to-[#1a1a1a] border border-gray-700 rounded-xl p-8 text-center space-y-6">
            <h3 class="text-2xl font-bold text-white">
                {{ isPerfectScore ? $t('calculator.results.want_to_optimize') : $t('calculator.results.stop_financial_bleeding') }}
            </h3>
            <p class="text-gray-300 max-w-2xl mx-auto">
                {{ isPerfectScore
                    ? $t('calculator.results.perfect_score_cta_desc')
                    : $t('calculator.results.your_score_cta_desc')
                }}
            </p>

            <div class="flex flex-col md:flex-row items-center justify-center gap-4">
                <NuxtLink :to="localePath('/contact')"
                    class="px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white font-bold rounded transition-colors w-full md:w-auto">
                    {{ $t('calculator.results.book_consultation') }}
                </NuxtLink>
                <button @click="emit('restart')"
                    class="px-8 py-4 bg-transparent border border-gray-500 text-gray-300 hover:text-white hover:border-white font-bold rounded transition-colors w-full md:w-auto">
                    {{ $t('calculator.results.recalculate') }}
                </button>
            </div>
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
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
