<script setup lang="ts">
import { ref } from 'vue';
import ToolSelector from './ToolSelector.vue';
import ResultsView from './ResultsView.vue';
import SegmentSelector from './SegmentSelector.vue';
import { useCalculator } from '~/composables/useCalculator';

type Phase = 'hook' | 'segment' | 'input' | 'processing' | 'result';

const currentPhase = ref<Phase>('hook');
const { resetCalculator } = useCalculator();

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const startCalculator = () => {
    resetCalculator();
    currentPhase.value = 'segment';
    scrollToTop();
};

const onSegmentSelected = () => {
    currentPhase.value = 'input';
    scrollToTop();
};

const calculateResults = () => {
    currentPhase.value = 'processing';
    scrollToTop();
    setTimeout(() => {
        currentPhase.value = 'result';
    }, 2000);
};

const restart = () => {
    currentPhase.value = 'hook';
    resetCalculator();
};

</script>

<template>
    <div class="w-full max-w-4xl mx-auto p-4 md:p-8">

        <!-- Phase 1: The Hook -->
        <div v-if="currentPhase === 'hook'" class="text-center space-y-8 py-12 animate-fade-in">
            <div class="inline-block p-4 rounded-full bg-[#252525] border border-[#9c7942] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#9c7942]" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight">
                {{ $t('calculator.hook.title_part1') }} <br />
                <span class="text-[#9c7942]">{{ $t('calculator.hook.title_part2') }}</span>
            </h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                {{ $t('calculator.hook.description') }}
            </p>
            <button @click="startCalculator"
                class="mt-8 px-8 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-[#9c7942]/20">
                {{ $t('calculator.hook.start_audit') }}
            </button>
        </div>

        <!-- Phase 1.5: Segment Selection -->
        <div v-if="currentPhase === 'segment'" class="animate-fade-in">
            <SegmentSelector @selected="onSegmentSelected" />
        </div>

        <!-- Phase 2: Input -->
        <div v-if="currentPhase === 'input'" class="animate-fade-in">
            <div class="mb-8 text-center">
                <h2 class="text-3xl font-bold text-white">{{ $t('calculator.input.title') }}</h2>
                <p class="text-gray-400">{{ $t('calculator.input.description') }}</p>
            </div>

            <ToolSelector />

            <div class="mt-12 text-center">
                <button @click="calculateResults"
                    class="px-10 py-4 bg-[#9c7942] hover:bg-[#8a6b3a] text-white text-xl font-bold rounded-lg transition-all shadow-lg shadow-[#9c7942]/20 w-full md:w-auto">
                    {{ $t('calculator.input.calculate_loss') }}
                </button>
            </div>
        </div>

        <!-- Phase 3: Processing -->
        <div v-if="currentPhase === 'processing'"
            class="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div class="relative w-24 h-24 mb-8">
                <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div
                    class="absolute top-0 left-0 w-full h-full border-4 border-[#9c7942] rounded-full border-t-transparent animate-spin">
                </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">{{ $t('calculator.processing.analyzing') }}</h3>
            <p class="text-gray-400 animate-pulse">{{ $t('calculator.processing.searching') }}</p>
        </div>

        <!-- Phase 4: Result -->
        <div v-if="currentPhase === 'result'">
            <ResultsView @restart="restart" />
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

