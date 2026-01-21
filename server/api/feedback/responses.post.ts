import { getFeedbackDatabase } from '~/server/utils/feedbackDatabase';

interface FeedbackSubmission {
    email?: string;
    
    discovery_source: string;
    website_ease: number;
    website_ease_comment?: string;
    technical_issues: boolean;
    technical_issues_details?: string;
    
    offer_clarity: number;
    missing_offer_info?: string;
    
    is_client: boolean;
    
    contact_form_satisfaction?: number;
    communication_style?: number;
    response_speed?: number;
    response_speed_comment?: string;
    work_delivery_time?: number;
    work_delivery_time_comment?: string;
    
    unpopular_tasks?: string;
    time_consuming_processes?: string;
    
    one_tech_change: string;
    tech_readiness: number;
    
    would_recommend?: string;
    missing_product?: string;
}

const VALID_SOURCES = ['facebook', 'instagram', 'tiktok', 'youtube', 'linkedin', 'na_zywo', 'polecenie', 'reklama'];

function validateScale(value: unknown): value is number {
    return typeof value === 'number' && value >= 1 && value <= 10 && Number.isInteger(value);
}

export default defineEventHandler(async (event) => {
    const body = await readBody<FeedbackSubmission>(event);

    if (!body.discovery_source || !VALID_SOURCES.includes(body.discovery_source)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid discovery source',
        });
    }

    if (!validateScale(body.website_ease)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid website ease rating: must be 1-10',
        });
    }

    if (typeof body.technical_issues !== 'boolean') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid technical issues value',
        });
    }

    if (!validateScale(body.offer_clarity)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid offer clarity rating: must be 1-10',
        });
    }

    if (typeof body.is_client !== 'boolean') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid is_client value',
        });
    }

    if (body.is_client) {
        if (!validateScale(body.contact_form_satisfaction)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid contact form satisfaction rating',
            });
        }
        if (!validateScale(body.communication_style)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid communication style rating',
            });
        }
        if (!validateScale(body.response_speed)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid response speed rating',
            });
        }
        if (!validateScale(body.work_delivery_time)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid work delivery time rating',
            });
        }
    }

    if (!body.one_tech_change || typeof body.one_tech_change !== 'string' || body.one_tech_change.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'One tech change is required',
        });
    }

    if (!validateScale(body.tech_readiness)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid tech readiness rating: must be 1-10',
        });
    }

    try {
        const db = getFeedbackDatabase();

        const stmt = db.prepare(`
            INSERT INTO feedback_responses (
                email,
                discovery_source, website_ease, website_ease_comment,
                technical_issues, technical_issues_details,
                offer_clarity, missing_offer_info,
                is_client,
                contact_form_satisfaction, communication_style,
                response_speed, response_speed_comment,
                work_delivery_time, work_delivery_time_comment,
                unpopular_tasks, time_consuming_processes,
                one_tech_change, tech_readiness,
                would_recommend, missing_product
            ) VALUES (
                :email,
                :discovery_source, :website_ease, :website_ease_comment,
                :technical_issues, :technical_issues_details,
                :offer_clarity, :missing_offer_info,
                :is_client,
                :contact_form_satisfaction, :communication_style,
                :response_speed, :response_speed_comment,
                :work_delivery_time, :work_delivery_time_comment,
                :unpopular_tasks, :time_consuming_processes,
                :one_tech_change, :tech_readiness,
                :would_recommend, :missing_product
            )
        `);

        stmt.run({
            email: body.email || null,
            discovery_source: body.discovery_source,
            website_ease: body.website_ease,
            website_ease_comment: body.website_ease_comment || null,
            technical_issues: body.technical_issues ? 1 : 0,
            technical_issues_details: body.technical_issues_details || null,
            offer_clarity: body.offer_clarity,
            missing_offer_info: body.missing_offer_info || null,
            is_client: body.is_client ? 1 : 0,
            contact_form_satisfaction: body.contact_form_satisfaction || null,
            communication_style: body.communication_style || null,
            response_speed: body.response_speed || null,
            response_speed_comment: body.response_speed_comment || null,
            work_delivery_time: body.work_delivery_time || null,
            work_delivery_time_comment: body.work_delivery_time_comment || null,
            unpopular_tasks: body.unpopular_tasks || null,
            time_consuming_processes: body.time_consuming_processes || null,
            one_tech_change: body.one_tech_change,
            tech_readiness: body.tech_readiness,
            would_recommend: body.would_recommend || null,
            missing_product: body.missing_product || null,
        });

        return {
            status: 'success',
        };
    } catch (error) {
        console.error('Error saving feedback response:', error);
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to save response: ${error instanceof Error ? error.message : error}`,
        });
    }
});
