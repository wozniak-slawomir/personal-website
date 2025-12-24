import type { ToolCategory, UserSegment } from '~/types/calculator';

export interface SegmentDefinition {
  id: UserSegment;
  priorityCategory: ToolCategory;
  icon: string;
  labelKey: string;
  descriptionKey: string;
}

export const USER_SEGMENTS: SegmentDefinition[] = [
  {
    id: 'marketing',
    priorityCategory: 'creative',
    icon: 'palette',
    labelKey: 'calculator.segments.marketing.label',
    descriptionKey: 'calculator.segments.marketing.description',
  },
  {
    id: 'dev',
    priorityCategory: 'development',
    icon: 'code',
    labelKey: 'calculator.segments.dev.label',
    descriptionKey: 'calculator.segments.dev.description',
  },
  {
    id: 'sales',
    priorityCategory: 'sales',
    icon: 'trending-up',
    labelKey: 'calculator.segments.sales.label',
    descriptionKey: 'calculator.segments.sales.description',
  },
  {
    id: 'ecommerce',
    priorityCategory: 'ecommerce',
    icon: 'shopping-cart',
    labelKey: 'calculator.segments.ecommerce.label',
    descriptionKey: 'calculator.segments.ecommerce.description',
  },
  {
    id: 'office',
    priorityCategory: 'infrastructure',
    icon: 'building-2',
    labelKey: 'calculator.segments.office.label',
    descriptionKey: 'calculator.segments.office.description',
  },
  {
    id: 'personal',
    priorityCategory: 'lifestyle',
    icon: 'user',
    labelKey: 'calculator.segments.personal.label',
    descriptionKey: 'calculator.segments.personal.description',
  },
];

export const getSegmentById = (id: UserSegment): SegmentDefinition | undefined => {
  return USER_SEGMENTS.find((s) => s.id === id);
};
