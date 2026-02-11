import { getFeedbackDatabase } from '~/server/utils/feedbackDatabase';
import { DISCOVERY_SOURCES } from '~/const/feedback';

interface FeedbackSubmission {
    email?: string;
    
    discovery_source: string;
    website_ease: string;
    website_ease_comment?: string;
    technical_issues: boolean;
    technical_issues_details?: string;
    
    offer_clarity: string;
    missing_offer_info?: string;
    
    is_client: boolean;
    
    contact_form_satisfaction?: string;
    communication_style?: string;
    response_speed?: string;
    response_speed_comment?: string;
    work_delivery_time?: string;
    work_delivery_time_comment?: string;
    work_delivery_delayed_cause?: string;
    
    unpopular_tasks?: string;
    time_consuming_processes?: string;
    
    one_tech_change: string;
    tech_readiness: string;
    
    would_recommend?: string;
    missing_product?: string;
    
    // Honeypot field for bot detection
    website?: string;
}

const VALID_SOURCES = DISCOVERY_SOURCES.map(s => s.value);
const MAX_TEXT_LENGTH = 2000;
const MAX_EMAIL_LENGTH = 254;

/**
 * Validates and sanitizes text input
 */
function validateTextInput(value: unknown, maxLength: number, fieldName: string): string | null {
    if (value === undefined || value === null) {
        return null;
    }
    
    if (typeof value !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: `${fieldName} must be a string`,
        });
    }
    
    const trimmed = value.trim();
    
    if (trimmed.length === 0) {
        return null;
    }
    
    if (trimmed.length > maxLength) {
        throw createError({
            statusCode: 400,
            statusMessage: `${fieldName} exceeds maximum length of ${maxLength} characters`,
        });
    }
    
    return trimmed;
}

/**
 * Validates email format and length
 */
function validateEmail(email: unknown): string | null {
    if (email === undefined || email === null) {
        return null;
    }
    
    if (typeof email !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email must be a string',
        });
    }
    
    const trimmed = email.trim().toLowerCase();
    
    if (trimmed.length === 0) {
        return null;
    }
    
    if (trimmed.length > MAX_EMAIL_LENGTH) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email address is too long',
        });
    }
    
    // RFC 5322 simplified email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email format',
        });
    }
    
    return trimmed;
}

export default defineEventHandler(async (event) => {
    // Request logging for security monitoring
    const ip = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown';
    const userAgent = getHeader(event, 'user-agent') || 'unknown';
    
    console.log(`[FEEDBACK] Submission attempt from ${ip} - ${userAgent.substring(0, 50)}`);
    
    let body: FeedbackSubmission;
    
    try {
        body = await readBody<FeedbackSubmission>(event);
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body',
        });
    }

    // Honeypot check - reject if filled
    if (body.website && body.website.trim() !== '') {
        console.warn(`[FEEDBACK] Bot detected (honeypot filled) from ${ip}`);
        // Return success to avoid revealing honeypot to bots
        return { status: 'success' };
    }

    // Validate required fields
    if (!body.discovery_source || !VALID_SOURCES.includes(body.discovery_source)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid discovery source',
        });
    }

    if (!validateTextInput(body.website_ease, 50, 'Website ease')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid website ease rating',
        });
    }

    if (typeof body.technical_issues !== 'boolean') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid technical issues value',
        });
    }

    if (!validateTextInput(body.offer_clarity, 50, 'Offer clarity')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid offer clarity rating',
        });
    }

    if (typeof body.is_client !== 'boolean') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid is_client value',
        });
    }

    // Validate client-only fields if user is a client
    if (body.is_client) {
        if (!validateTextInput(body.contact_form_satisfaction, 50, 'Contact form satisfaction')) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid contact form satisfaction rating',
            });
        }
        if (!validateTextInput(body.communication_style, 50, 'Communication style')) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid communication style rating',
            });
        }
        if (!validateTextInput(body.response_speed, 50, 'Response speed')) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid response speed rating',
            });
        }
        if (!validateTextInput(body.work_delivery_time, 50, 'Work delivery time')) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid work delivery time rating',
            });
        }
        // Validate delayed cause if delivery was delayed
        if (body.work_delivery_time === 'delayed') {
            const validCauses = ['provider_fault', 'client_fault', 'both_fault'];
            if (!body.work_delivery_delayed_cause || !validCauses.includes(body.work_delivery_delayed_cause)) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Invalid or missing delayed cause when delivery is marked as delayed',
                });
            }
        }
    }

    // Validate and sanitize one_tech_change (required)
    const oneTechChange = validateTextInput(body.one_tech_change, MAX_TEXT_LENGTH, 'One tech change');
    if (!oneTechChange) {
        throw createError({
            statusCode: 400,
            statusMessage: 'One tech change is required',
        });
    }

    if (!validateTextInput(body.tech_readiness, 50, 'Tech readiness')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid tech readiness rating',
        });
    }

    try {
        const db = getFeedbackDatabase();

        // Validate and sanitize all inputs
        const sanitizedData = {
            email: validateEmail(body.email),
            discovery_source: body.discovery_source,
            website_ease: body.website_ease,
            website_ease_comment: validateTextInput(body.website_ease_comment, MAX_TEXT_LENGTH, 'Website ease comment'),
            technical_issues: body.technical_issues ? 1 : 0,
            technical_issues_details: validateTextInput(body.technical_issues_details, MAX_TEXT_LENGTH, 'Technical issues details'),
            offer_clarity: body.offer_clarity,
            missing_offer_info: validateTextInput(body.missing_offer_info, MAX_TEXT_LENGTH, 'Missing offer info'),
            is_client: body.is_client ? 1 : 0,
            contact_form_satisfaction: body.contact_form_satisfaction || null,
            communication_style: body.communication_style || null,
            response_speed: body.response_speed || null,
            response_speed_comment: validateTextInput(body.response_speed_comment, MAX_TEXT_LENGTH, 'Response speed comment'),
            work_delivery_time: body.work_delivery_time || null,
            work_delivery_time_comment: validateTextInput(body.work_delivery_time_comment, MAX_TEXT_LENGTH, 'Work delivery time comment'),
            work_delivery_delayed_cause: body.work_delivery_delayed_cause || null,
            unpopular_tasks: validateTextInput(body.unpopular_tasks, MAX_TEXT_LENGTH, 'Unpopular tasks'),
            time_consuming_processes: validateTextInput(body.time_consuming_processes, MAX_TEXT_LENGTH, 'Time consuming processes'),
            one_tech_change: oneTechChange,
            tech_readiness: body.tech_readiness,
            would_recommend: validateTextInput(body.would_recommend, MAX_TEXT_LENGTH, 'Would recommend'),
            missing_product: validateTextInput(body.missing_product, MAX_TEXT_LENGTH, 'Missing product'),
        };

        const stmt = db.prepare(`
            INSERT INTO feedback_responses (
                email,
                discovery_source, website_ease, website_ease_comment,
                technical_issues, technical_issues_details,
                offer_clarity, missing_offer_info,
                is_client,
                contact_form_satisfaction, communication_style,
                response_speed, response_speed_comment,
                work_delivery_time, work_delivery_time_comment, work_delivery_delayed_cause,
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
                :work_delivery_time, :work_delivery_time_comment, :work_delivery_delayed_cause,
                :unpopular_tasks, :time_consuming_processes,
                :one_tech_change, :tech_readiness,
                :would_recommend, :missing_product
            )
        `);

        stmt.run(sanitizedData);

        console.log(`[FEEDBACK] Submission successful from ${ip}`);

        return {
            status: 'success',
        };
    } catch (error) {
        console.error('[FEEDBACK] Error saving feedback response:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Unable to save feedback. Please try again later.',
        });
    }
});
