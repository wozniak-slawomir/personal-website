import { useStorage } from '@vueuse/core';
import { SUBSCRIPTION_TOOLS } from '~/const/subscriptionTools';
import { getSegmentById } from '~/const/userSegments';
import { convertToPLN } from '~/lib/currency';
import type { CalculatorState, ToolCategory, UserSegment } from '~/types/calculator';

const ALL_CATEGORIES: { id: ToolCategory; label: string }[] = [
  { id: 'creative', label: 'calculator.categories.creative' },
  { id: 'development', label: 'calculator.categories.development' },
  { id: 'sales', label: 'calculator.categories.sales' },
  { id: 'ecommerce', label: 'calculator.categories.ecommerce' },
  { id: 'infrastructure', label: 'calculator.categories.infrastructure' },
  { id: 'lifestyle', label: 'calculator.categories.lifestyle' },
];

const sharedSelectedSegment = ref<UserSegment | undefined>(undefined);

export const useCalculator = () => {
  const state = useStorage<CalculatorState>('calculator-state', {
    selections: [],
    peopleCounts: {
      creative: 1,
      infrastructure: 1,
      lifestyle: 1,
      development: 1,
      sales: 1,
      ecommerce: 1,
    },
    selectedSegment: undefined,
  }, typeof window !== 'undefined' ? sessionStorage : undefined);

  if (!state.value.peopleCounts) {
    state.value.peopleCounts = {
      creative: 1,
      infrastructure: 1,
      lifestyle: 1,
      development: 1,
      sales: 1,
      ecommerce: 1,
    };
  }

  const setSegment = (segment: UserSegment) => {
    sharedSelectedSegment.value = segment;
    state.value.selectedSegment = segment;
  };

  const sortedCategories = computed(() => {
    const segment = sharedSelectedSegment.value;
    if (!segment) {
      return ALL_CATEGORIES;
    }

    const segmentDef = getSegmentById(segment);
    if (!segmentDef) {
      return ALL_CATEGORIES;
    }

    const priorityCategory = segmentDef.priorityCategory;
    const prioritized = ALL_CATEGORIES.find((c) => c.id === priorityCategory);
    const others = ALL_CATEGORIES.filter((c) => c.id !== priorityCategory);

    if (prioritized) {
      return [prioritized, ...others];
    }

    return ALL_CATEGORIES;
  });

  const toggleTool = (toolId: string) => {
    const index = state.value.selections.findIndex((s) => s.toolId === toolId);
    if (index >= 0) {
      state.value.selections.splice(index, 1);
    } else {
      state.value.selections.push({ toolId, isZombie: false });
    }
  };

  const setZombieStatus = (toolId: string, isZombie: boolean) => {
    const selection = state.value.selections.find((s) => s.toolId === toolId);
    if (selection) {
      selection.isZombie = isZombie;
    }
  };

  const setPeopleCount = (category: ToolCategory, count: number) => {
    state.value.peopleCounts[category] = Math.max(1, count);
  };

  const resetCalculator = () => {
    state.value.selections = [];
    state.value.peopleCounts = {
      creative: 1,
      infrastructure: 1,
      lifestyle: 1,
      development: 1,
      sales: 1,
      ecommerce: 1,
    };
    state.value.selectedSegment = undefined;
    sharedSelectedSegment.value = undefined;
  };

  const selectedTools = computed(() => {
    return state.value.selections.map((s) => {
      const tool = SUBSCRIPTION_TOOLS.find((t) => t.id === s.toolId);
      if (!tool) return null;

      const pricePLN = convertToPLN(tool.price, tool.currency);

      return { ...tool, ...s, pricePLN };
    }).filter((t): t is NonNullable<typeof t> => !!t);
  });

  const totalMonthlyCost = computed(() => {
    const toolsCost = selectedTools.value.reduce((sum, tool) => {
      const multiplier = state.value.peopleCounts[tool.category] || 1;
      return sum + (tool.pricePLN * multiplier);
    }, 0);
    return toolsCost;
  });

  const totalYearlyCost = computed(() => totalMonthlyCost.value * 12);
  const total5YearCost = computed(() => totalYearlyCost.value * 5);

  const zombieMonthlyCost = computed(() => {
    const toolsCost = selectedTools.value
      .filter((t) => t.isZombie)
      .reduce((sum, t) => {
        const multiplier = state.value.peopleCounts[t.category] || 1;
        return sum + (t.pricePLN * multiplier);
      }, 0);
    return toolsCost;
  });

  const zombieYearlyCost = computed(() => zombieMonthlyCost.value * 12);
  const zombie5YearCost = computed(() => zombieYearlyCost.value * 5);

  const wellSpentMonthlyCost = computed(() => {
    const toolsCost = selectedTools.value
      .filter((t) => !t.isZombie)
      .reduce((sum, t) => {
        const multiplier = state.value.peopleCounts[t.category] || 1;
        return sum + (t.pricePLN * multiplier);
      }, 0);
    return toolsCost;
  });

  const wellSpentYearlyCost = computed(() => wellSpentMonthlyCost.value * 12);
  const wellSpent5YearCost = computed(() => wellSpentYearlyCost.value * 5);

  const conflicts = computed(() => {
    const messages: string[] = [];
    const selectedIds = state.value.selections.map(s => s.toolId);

    selectedTools.value.forEach(tool => {
      if (tool.conflictId && selectedIds.includes(tool.conflictId)) {
        if (tool.conflictMessage) {
           messages.push(tool.conflictMessage);
        }
      }
    });
    
    return [...new Set(messages)];
  });

  return {
    state,
    toggleTool,
    setZombieStatus,
    resetCalculator,
    selectedTools,
    totalMonthlyCost,
    totalYearlyCost,
    total5YearCost,
    zombieMonthlyCost,
    zombieYearlyCost,
    zombie5YearCost,
    wellSpentMonthlyCost,
    wellSpentYearlyCost,
    wellSpent5YearCost,
    conflicts,
    setPeopleCount,
    setSegment,
    sortedCategories,
  };
};
