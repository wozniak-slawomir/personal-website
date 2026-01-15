import { getSurveyDatabase } from '~/server/utils/surveyDatabase';
import { getClientIP, validateTIPIAnswer } from '~/server/utils/surveyUtils';

interface TIPIAnswers {
    e_plus_1: number;
    u_minus_1: number;
    s_minus_1: number;
    se_plus_1: number;
    i_plus_1: number;
    e_minus_2: number;
    u_plus_2: number;
    s_plus_2: number;
    se_minus_2: number;
    i_minus_2: number;
    e_plus_3: number;
    u_minus_3: number;
    s_minus_3: number;
    se_plus_3: number;
    i_plus_3: number;
    e_minus_4: number;
    u_plus_4: number;
    s_plus_4: number;
    se_minus_4: number;
    i_minus_4: number;
}

interface SurveySubmission extends TIPIAnswers {
    experience_years: number;
    employment_type: string;
    salary_net: number;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<SurveySubmission>(event);

    const ipAddress = getClientIP(event);

    if (ipAddress === 'unknown') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Unable to determine IP address',
        });
    }

    const db = getSurveyDatabase();
    const existingResponse = db.prepare(
        'SELECT id FROM survey_responses WHERE ip_address = ?'
    ).get(ipAddress);

    if (existingResponse) {
        throw createError({
            statusCode: 409,
            statusMessage: 'You have already submitted a response',
        });
    }

    // Validate required fields
    if (typeof body.experience_years !== 'number' || body.experience_years < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid experience years',
        });
    }

    if (!body.employment_type || !['B2B', 'UoP', 'Cywilnoprawna', 'Inne'].includes(body.employment_type)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid employment type',
        });
    }

    if (typeof body.salary_net !== 'number' || body.salary_net <= 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid salary',
        });
    }

    // Validate all TIPI answers
    const tipiFields: (keyof TIPIAnswers)[] = [
        'e_plus_1', 'u_minus_1', 's_minus_1', 'se_plus_1', 'i_plus_1',
        'e_minus_2', 'u_plus_2', 's_plus_2', 'se_minus_2', 'i_minus_2',
        'e_plus_3', 'u_minus_3', 's_minus_3', 'se_plus_3', 'i_plus_3',
        'e_minus_4', 'u_plus_4', 's_plus_4', 'se_minus_4', 'i_minus_4',
    ];

    for (const field of tipiFields) {
        if (!validateTIPIAnswer(body[field])) {
            throw createError({
                statusCode: 400,
                statusMessage: `Invalid answer for ${field}: must be 1-5`,
            });
        }
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO survey_responses (
                ip_address, experience_years, employment_type, salary_net,
                e_plus_1, u_minus_1, s_minus_1, se_plus_1, i_plus_1,
                e_minus_2, u_plus_2, s_plus_2, se_minus_2, i_minus_2,
                e_plus_3, u_minus_3, s_minus_3, se_plus_3, i_plus_3,
                e_minus_4, u_plus_4, s_plus_4, se_minus_4, i_minus_4
            ) VALUES (
                :ip_address, :experience_years, :employment_type, :salary_net,
                :e_plus_1, :u_minus_1, :s_minus_1, :se_plus_1, :i_plus_1,
                :e_minus_2, :u_plus_2, :s_plus_2, :se_minus_2, :i_minus_2,
                :e_plus_3, :u_minus_3, :s_minus_3, :se_plus_3, :i_plus_3,
                :e_minus_4, :u_plus_4, :s_plus_4, :se_minus_4, :i_minus_4
            )
        `);

        stmt.run({
            ...body,
            ip_address: ipAddress,
        });

        return {
            status: 'success',
        };
    } catch (error) {
        console.error('Error saving survey response:', error);
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to save response: ${error instanceof Error ? error.message : error}`,
        });
    }
});
