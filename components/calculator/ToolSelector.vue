<script setup lang="ts">
import { ref, watch } from 'vue';
import { SUBSCRIPTION_TOOLS } from '~/const/subscriptionTools';
import { useCalculator } from '~/composables/useCalculator';
import { convertToPLN } from '~/utils/currency';
import type { ToolCategory } from '~/types/calculator';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const { state, toggleTool, setZombieStatus, setPeopleCount, sortedCategories } = useCalculator();

const expandedCategories = ref<Set<ToolCategory>>(new Set());

let lastPriorityCategory: ToolCategory | null = null;

watch(sortedCategories, (categories) => {
    if (categories.length > 0) {
        const newPriorityCategory = categories[0].id;
        if (lastPriorityCategory !== newPriorityCategory) {
            expandedCategories.value = new Set([newPriorityCategory]);
            lastPriorityCategory = newPriorityCategory;
        }
    }
}, { immediate: true });

const toggleCategory = (categoryId: ToolCategory) => {
    if (expandedCategories.value.has(categoryId)) {
        expandedCategories.value.delete(categoryId);
    } else {
        expandedCategories.value.add(categoryId);
    }
    expandedCategories.value = new Set(expandedCategories.value);
};

const isCategoryExpanded = (categoryId: ToolCategory) => expandedCategories.value.has(categoryId);
const isSelected = (toolId: string) => state.value.selections.some((s) => s.toolId === toolId);
const isZombie = (toolId: string) => state.value.selections.find((s) => s.toolId === toolId)?.isZombie;

const getToolsForCategory = (categoryId: ToolCategory) => {
    return SUBSCRIPTION_TOOLS.filter((t) => t.category === categoryId);
};

const getSelectedCountForCategory = (categoryId: ToolCategory) => {
    const toolIds = getToolsForCategory(categoryId).map(t => t.id);
    return state.value.selections.filter(s => toolIds.includes(s.toolId)).length;
};

</script>

<template>
    <div class="space-y-4">
        <div v-for="(category, index) in sortedCategories" :key="category.id" class="border border-gray-700 rounded-lg overflow-hidden">
            <!-- Category Header (Accordion Toggle) -->
            <button
                @click="toggleCategory(category.id)"
                class="w-full flex items-center justify-between p-4 bg-[#252525] hover:bg-[#2a2a2a] transition-colors text-left"
                :class="{ 'border-b border-gray-700': isCategoryExpanded(category.id) }"
            >
                <div class="flex items-center space-x-3">
                    <h3 class="text-xl font-bold text-white">
                        {{ $t(category.label) }}
                    </h3>
                    <span v-if="getSelectedCountForCategory(category.id) > 0" class="px-2 py-0.5 bg-[#9c7942] text-white text-xs rounded-full">
                        {{ getSelectedCountForCategory(category.id) }}
                    </span>
                    <span v-if="index === 0" class="px-2 py-0.5 bg-[#9c7942]/20 text-[#9c7942] text-xs rounded border border-[#9c7942]/50">
                        {{ $t('calculator.categories.recommended') }}
                    </span>
                </div>
                <component :is="isCategoryExpanded(category.id) ? ChevronUp : ChevronDown" class="w-5 h-5 text-gray-400" />
            </button>

            <!-- Category Content (Collapsible) -->
            <div v-show="isCategoryExpanded(category.id)" class="p-4 space-y-4 animate-accordion-open">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="tool in getToolsForCategory(category.id)" :key="tool.id"
                        @click="toggleTool(tool.id)"
                        class="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 transition-all duration-300 hover:border-[#9c7942] cursor-pointer"
                        :class="{ 'border-[#9c7942] bg-opacity-80': isSelected(tool.id) }">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center space-x-3">
                                <div class="w-6 h-6 rounded border flex items-center justify-center transition-colors"
                                    :class="isSelected(tool.id) ? 'bg-[#9c7942] border-[#9c7942]' : 'border-gray-500 hover:border-[#9c7942]'">
                                    <svg v-if="isSelected(tool.id)" xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <img v-if="tool.icon" :src="`/icons/tools/${tool.icon}.svg`" width="20" height="20" class="w-5 h-5 flex-shrink-0" :alt="$t(tool.name)" />
                                <span class="text-white font-medium">{{ $t(tool.name) }}</span>
                            </div>
                            <div class="text-right">
                                <span class="text-gray-400 text-sm block">{{ tool.price }} {{ tool.currency }}</span>
                                <span v-if="tool.currency !== 'PLN'" class="text-xs text-gray-500 block">
                                    (~{{ Math.round(convertToPLN(tool.price, tool.currency)) }} PLN)
                                </span>
                            </div>
                        </div>

                        <div v-if="isSelected(tool.id)" class="mt-4 pt-3 border-t border-gray-700" @click.stop>
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-gray-400">{{ $t('calculator.tool.used_last_30_days') }}</span>
                                <button @click="setZombieStatus(tool.id, !isZombie(tool.id))"
                                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                                    :class="!isZombie(tool.id) ? 'bg-green-600' : 'bg-red-600'">
                                    <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                        :class="!isZombie(tool.id) ? 'translate-x-6' : 'translate-x-1'" />
                                </button>
                            </div>
                            <div v-if="isZombie(tool.id)" class="mt-2 text-right">
                                <span
                                    class="text-xs font-bold text-red-500 uppercase tracking-wider border border-red-500 px-1 rounded">{{ $t('calculator.tool.zombie') }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="mt-4 p-4 bg-[#1a1a1a] border border-gray-700 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="text-sm text-gray-400 text-center sm:text-left">
                        <p class="font-bold text-white">{{ $t('calculator.tool.people_count') }}</p>
                        <p class="text-xs">{{ $t('calculator.tool.people_count_desc') }}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button @click="setPeopleCount(category.id, (state.peopleCounts[category.id] || 1) - 1)"
                            class="w-10 h-10 rounded bg-gray-700 text-white hover:bg-[#9c7942] transition-colors flex items-center justify-center text-2xl font-bold leading-none pb-1">-</button>
                        <input type="number" :value="state.peopleCounts[category.id] || 1"
                            @input="(e) => setPeopleCount(category.id, Number((e.target as HTMLInputElement).value))"
                            class="w-16 h-10 bg-gray-800 border border-gray-600 text-white text-center rounded focus:outline-none focus:border-[#9c7942] appearance-none m-0 no-arrow"
                            min="1" onkeypress="return event.charCode >= 48" />
                        <button @click="setPeopleCount(category.id, (state.peopleCounts[category.id] || 1) + 1)"
                            class="w-10 h-10 rounded bg-gray-700 text-white hover:bg-[#9c7942] transition-colors flex items-center justify-center text-2xl font-bold leading-none pb-1">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Hide number input spinners */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}

.animate-accordion-open {
    animation: accordionOpen 0.3s ease-out;
}

@keyframes accordionOpen {
    from {
        opacity: 0;
        max-height: 0;
    }
    to {
        opacity: 1;
        max-height: 2000px;
    }
}
</style>

