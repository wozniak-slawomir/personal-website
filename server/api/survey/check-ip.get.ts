import { getSurveyDatabase } from '~/server/utils/surveyDatabase';
import { getClientIP } from '~/server/utils/surveyUtils';

export default defineEventHandler((event) => {
    const ipAddress = getClientIP(event);

    if (ipAddress === 'unknown') {
        return { hasSubmitted: false };
    }

    try {
        const db = getSurveyDatabase();

        const response = db.prepare(
            'SELECT id FROM survey_responses WHERE ip_address = ?'
        ).get(ipAddress);

        return {
            hasSubmitted: !!response,
        };
    } catch (error) {
        console.error('Error checking IP:', error);
        return { hasSubmitted: false };
    }
});
