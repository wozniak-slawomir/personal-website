<script setup lang="ts">
import { useCalculator } from '~/composables/useCalculator';
import { formatCurrency } from '~/lib/currency';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { totalYearlyCost, total5YearCost, zombieYearlyCost, conflicts, resetCalculator } = useCalculator();

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
                        {{ isPerfectScore ? $t('calculator.results.yearly_investment') : $t('calculator.results.yearly_loss') }}
                    </p>
                    <p class="text-4xl md:text-5xl font-bold"
                        :class="isPerfectScore ? 'text-green-500' : 'text-[#9c7942]'">{{
                            formatCurrency(totalYearlyCost) }}</p>
                    <p class="text-xs text-gray-500 mt-2">
                        {{ isPerfectScore ? $t('calculator.results.perfect_score_money_desc') : $t('calculator.results.your_score_money_desc') }}
                    </p>
                </div>

                <div class="border-t md:border-t-0 md:border-l border-gray-700 pt-6 md:pt-0 md:pl-6">
                    <p class="text-gray-400 uppercase tracking-wider text-sm mb-1">{{ $t('calculator.results.perspective_5_years') }}</p>
                    <p class="text-3xl md:text-4xl font-bold text-white">{{ formatCurrency(total5YearCost) }}</p>
                    <p class="text-xs text-gray-500 mt-2">
                        {{ isPerfectScore ? $t('calculator.results.perfect_score_5_years_desc') : $t('calculator.results.your_score_5_years_desc') }}
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border rounded-lg p-6"
                :class="isPerfectScore ? 'bg-green-900/20 border-green-900/50' : 'bg-red-900/20 border-red-900/50'">
                <h3 class="text-xl font-bold mb-2 flex items-center"
                    :class="isPerfectScore ? 'text-green-500' : 'text-red-500'">
                    <span class="mr-2">{{ isPerfectScore ? '✅' : '🧟' }}</span> {{ $t('calculator.results.zombie_indicator') }}
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
                <a href="/contact"
                    class="px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white font-bold rounded transition-colors w-full md:w-auto">
                    {{ $t('calculator.results.book_consultation') }}
                </a>
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
