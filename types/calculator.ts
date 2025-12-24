export type ToolCategory = 'creative' | 'infrastructure' | 'lifestyle' | 'development' | 'sales' | 'ecommerce';

export type UserSegment = 'marketing' | 'dev' | 'sales' | 'ecommerce' | 'office' | 'personal';

export interface SubscriptionTool {
  id: string;
  name: string;
  price: number; // Monthly price in original currency
  currency: 'PLN' | 'USD' | 'EUR';
  category: ToolCategory;
  icon?: string; // Path to icon or icon name
  riskLevel?: 'low' | 'medium' | 'high' | 'very-high';
  conflictId?: string; // ID of the tool that makes this one redundant
  conflictMessage?: string; // Message to show if conflict exists
}

export interface UserSelection {
  toolId: string;
  isZombie: boolean; // True if not used in last 30 days
}

export interface CalculatorState {
  selections: UserSelection[];
  peopleCounts: Record<ToolCategory, number>; // Number of people per department/category
  selectedSegment?: UserSegment;
}
