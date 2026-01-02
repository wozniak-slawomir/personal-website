import { getDatabase } from '~/server/utils/database';

interface StoredResponse {
    id: number;
    created_at: string;
    segment: string | null;
    people_counts: string;
    total_yearly_cost: number;
    zombie_yearly_cost: number;
    well_spent_yearly_cost: number;
    selections: string;
}

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id');

    if (!id || isNaN(Number(id))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID parameter',
        });
    }

    try {
        const db = getDatabase();

        const response = db.prepare(`
            SELECT * FROM calculator_responses WHERE id = ?
        `).get(Number(id)) as StoredResponse | undefined;

        if (!response) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Response not found',
            });
        }

        return {
            response: {
                id: response.id,
                createdAt: response.created_at,
                segment: response.segment,
                peopleCounts: JSON.parse(response.people_counts || '{}'),
                totalYearlyCost: response.total_yearly_cost,
                zombieYearlyCost: response.zombie_yearly_cost,
                wellSpentYearlyCost: response.well_spent_yearly_cost,
                selections: JSON.parse(response.selections || '[]'),
            },
        };
    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }
        console.error('Error fetching calculator response:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch response',
        });
    }
});
