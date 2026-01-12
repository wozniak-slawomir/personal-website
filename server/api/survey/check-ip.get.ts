import { getDatabase } from '~/server/utils/database';
import { getClientIP } from '~/server/utils/survey';

export default defineEventHandler((event) => {
    const ipAddress = getClientIP(event);

    if (ipAddress === 'unknown') {
        return { hasSubmitted: false };
    }

    try {
        const db = getDatabase();

        // Check in both tables
        const mainResponse = db.prepare(
            'SELECT id FROM survey_responses WHERE ip_address = ?'
        ).get(ipAddress);

        const outlierResponse = db.prepare(
            'SELECT id FROM survey_outliers WHERE ip_address = ?'
        ).get(ipAddress);

        return {
            hasSubmitted: !!(mainResponse || outlierResponse),
        };
    } catch (error) {
        console.error('Error checking IP:', error);
        return { hasSubmitted: false };
    }
});
