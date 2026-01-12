import { getDatabase } from '~/server/utils/database';
import {
    calculateBigFive,
    predictSalary,
    isOutlier,
    calculateStats,
    getClientIP,
    validateTIPIAnswer,
    type TIPIAnswers,
} from '~/server/utils/survey';

interface SurveySubmission extends TIPIAnswers {
    experience_years: number;
    employment_type: string;
    salary_net: number;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<SurveySubmission>(event);

    // Get client IP
    const ipAddress = getClientIP(event);

    if (ipAddress === 'unknown') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Unable to determine IP address',
        });
    }

    // Check if IP already submitted
    const db = getDatabase();
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

    // Calculate Big Five scores
    const bigFive = calculateBigFive(body);

    // Check if B2B
    const isB2B = body.employment_type === 'B2B';

    // Predict salary
    const predictedSalary = predictSalary(bigFive, isB2B, body.experience_years);

    // Check for outliers using existing data
    const salaryRows = db.prepare('SELECT salary_net FROM survey_responses').all() as { salary_net: number }[];
    const salaries = salaryRows.map(r => r.salary_net);
    
    // Add current salary to calculate stats
    salaries.push(body.salary_net);
    const stats = calculateStats(salaries);
    
    const outlierCheck = isOutlier(body.salary_net, stats.mean, stats.stdDev);

    // Prepare common data
    const responseData = {
        ip_address: ipAddress,
        experience_years: body.experience_years,
        employment_type: body.employment_type,
        salary_net: body.salary_net,
        e_plus_1: body.e_plus_1,
        u_minus_1: body.u_minus_1,
        s_minus_1: body.s_minus_1,
        se_plus_1: body.se_plus_1,
        i_plus_1: body.i_plus_1,
        e_minus_2: body.e_minus_2,
        u_plus_2: body.u_plus_2,
        s_plus_2: body.s_plus_2,
        se_minus_2: body.se_minus_2,
        i_minus_2: body.i_minus_2,
        e_plus_3: body.e_plus_3,
        u_minus_3: body.u_minus_3,
        s_minus_3: body.s_minus_3,
        se_plus_3: body.se_plus_3,
        i_plus_3: body.i_plus_3,
        e_minus_4: body.e_minus_4,
        u_plus_4: body.u_plus_4,
        s_plus_4: body.s_plus_4,
        se_minus_4: body.se_minus_4,
        i_minus_4: body.i_minus_4,
        extraversion: bigFive.extraversion,
        agreeableness: bigFive.agreeableness,
        conscientiousness: bigFive.conscientiousness,
        emotional_stability: bigFive.emotionalStability,
        intellect: bigFive.intellect,
        predicted_salary: predictedSalary,
        is_b2b: isB2B ? 1 : 0,
    };

    try {
        if (outlierCheck.isOutlier) {
            // Insert into outliers table
            const stmt = db.prepare(`
                INSERT INTO survey_outliers (
                    ip_address, experience_years, employment_type, salary_net,
                    e_plus_1, u_minus_1, s_minus_1, se_plus_1, i_plus_1,
                    e_minus_2, u_plus_2, s_plus_2, se_minus_2, i_minus_2,
                    e_plus_3, u_minus_3, s_minus_3, se_plus_3, i_plus_3,
                    e_minus_4, u_plus_4, s_plus_4, se_minus_4, i_minus_4,
                    extraversion, agreeableness, conscientiousness, emotional_stability, intellect,
                    predicted_salary, is_b2b, outlier_reason
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            stmt.run(
                responseData.ip_address,
                responseData.experience_years,
                responseData.employment_type,
                responseData.salary_net,
                responseData.e_plus_1, responseData.u_minus_1, responseData.s_minus_1, responseData.se_plus_1, responseData.i_plus_1,
                responseData.e_minus_2, responseData.u_plus_2, responseData.s_plus_2, responseData.se_minus_2, responseData.i_minus_2,
                responseData.e_plus_3, responseData.u_minus_3, responseData.s_minus_3, responseData.se_plus_3, responseData.i_plus_3,
                responseData.e_minus_4, responseData.u_plus_4, responseData.s_plus_4, responseData.se_minus_4, responseData.i_minus_4,
                responseData.extraversion, responseData.agreeableness, responseData.conscientiousness, responseData.emotional_stability, responseData.intellect,
                responseData.predicted_salary, responseData.is_b2b, outlierCheck.reason
            );
        } else {
            // Insert into main responses table
            const stmt = db.prepare(`
                INSERT INTO survey_responses (
                    ip_address, experience_years, employment_type, salary_net,
                    e_plus_1, u_minus_1, s_minus_1, se_plus_1, i_plus_1,
                    e_minus_2, u_plus_2, s_plus_2, se_minus_2, i_minus_2,
                    e_plus_3, u_minus_3, s_minus_3, se_plus_3, i_plus_3,
                    e_minus_4, u_plus_4, s_plus_4, se_minus_4, i_minus_4,
                    extraversion, agreeableness, conscientiousness, emotional_stability, intellect,
                    predicted_salary, is_b2b
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            stmt.run(
                responseData.ip_address,
                responseData.experience_years,
                responseData.employment_type,
                responseData.salary_net,
                responseData.e_plus_1, responseData.u_minus_1, responseData.s_minus_1, responseData.se_plus_1, responseData.i_plus_1,
                responseData.e_minus_2, responseData.u_plus_2, responseData.s_plus_2, responseData.se_minus_2, responseData.i_minus_2,
                responseData.e_plus_3, responseData.u_minus_3, responseData.s_minus_3, responseData.se_plus_3, responseData.i_plus_3,
                responseData.e_minus_4, responseData.u_plus_4, responseData.s_plus_4, responseData.se_minus_4, responseData.i_minus_4,
                responseData.extraversion, responseData.agreeableness, responseData.conscientiousness, responseData.emotional_stability, responseData.intellect,
                responseData.predicted_salary, responseData.is_b2b
            );
        }

        return {
            status: 'success',
            isOutlier: outlierCheck.isOutlier,
            predictedSalary,
            actualSalary: body.salary_net,
            difference: body.salary_net - predictedSalary,
            bigFive: {
                extraversion: Math.round(bigFive.extraversion * 100) / 100,
                agreeableness: Math.round(bigFive.agreeableness * 100) / 100,
                conscientiousness: Math.round(bigFive.conscientiousness * 100) / 100,
                emotionalStability: Math.round(bigFive.emotionalStability * 100) / 100,
                intellect: Math.round(bigFive.intellect * 100) / 100,
            },
        };
    } catch (error) {
        console.error('Error saving survey response:', error);
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to save response: ${error instanceof Error ? error.message : error}`,
        });
    }
});
