/**
 * Feedback Questionnaire Constants
 * Questions for business feedback survey
 */

export interface FeedbackQuestion {
  id: string;
  type: 'select' | 'scale' | 'boolean' | 'text';
  required: boolean;
  clientOnly?: boolean;
  options?: string[];
  hasComment?: boolean;
  conditionalText?: boolean;
}

export const DISCOVERY_SOURCES = [
  { value: 'facebook' },
  { value: 'instagram' },
  { value: 'tiktok' },
  { value: 'youtube' },
  { value: 'linkedin' },
  { value: 'na_zywo' },
  { value: 'polecenie' },
  { value: 'reklama' },
];

export const FEEDBACK_QUESTIONS: FeedbackQuestion[][] = [
  [
    {
      id: 'discovery_source',
      type: 'select',
      required: true,
      options: DISCOVERY_SOURCES.map(s => s.value),
    },
    {
      id: 'website_ease',
      type: 'scale',
      required: true,
      hasComment: true,
    },
    {
      id: 'technical_issues',
      type: 'boolean',
      required: true,
      conditionalText: true,
    },
  ],
  [
    {
      id: 'offer_clarity',
      type: 'scale',
      required: true,
    },
    {
      id: 'missing_offer_info',
      type: 'text',
      required: false,
    },
  ],
  [
    {
      id: 'is_client',
      type: 'boolean',
      required: true,
    },
  ],
  [
    {
      id: 'contact_form_satisfaction',
      type: 'scale',
      required: true,
      clientOnly: true,
    },
    {
      id: 'communication_style',
      type: 'scale',
      required: true,
      clientOnly: true,
    },
    {
      id: 'response_speed',
      type: 'scale',
      required: true,
      clientOnly: true,
      hasComment: true,
    },
    {
      id: 'work_delivery_time',
      type: 'scale',
      required: true,
      clientOnly: true,
      hasComment: true,
    },
  ],
  [
    {
      id: 'unpopular_tasks',
      type: 'text',
      required: false,
    },
    {
      id: 'time_consuming_processes',
      type: 'text',
      required: false,
    },
  ],
  [
    {
      id: 'one_tech_change',
      type: 'text',
      required: true,
    },
    {
      id: 'tech_readiness',
      type: 'scale',
      required: true,
    },
  ],
  [
    {
      id: 'would_recommend',
      type: 'text',
      required: false,
      clientOnly: true,
    },
    {
      id: 'missing_product',
      type: 'text',
      required: false,
    },
  ],
];

// Index of the client check page (0-indexed)
export const CLIENT_CHECK_PAGE_INDEX = 2;

// Index of the client-only questions page
export const CLIENT_QUESTIONS_PAGE_INDEX = 3;
