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
    const query = getQuery(event);

    const limit = Math.min(Math.max(Number(query.limit) || 50, 1), 100);
    const offset = Math.max(Number(query.offset) || 0, 0);

    try {
        const db = getDatabase();

        // Get total count
        const countResult = db.prepare('SELECT COUNT(*) as total FROM calculator_responses').get() as { total: number };

        // Get paginated responses
        const responses = db.prepare(`
            SELECT * FROM calculator_responses
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `).all(limit, offset) as StoredResponse[];

        // Parse JSON fields
        const parsedResponses = responses.map((r) => ({
            id: r.id,
            createdAt: r.created_at,
            segment: r.segment,
            peopleCounts: JSON.parse(r.people_counts || '{}'),
            totalYearlyCost: r.total_yearly_cost,
            zombieYearlyCost: r.zombie_yearly_cost,
            wellSpentYearlyCost: r.well_spent_yearly_cost,
            selections: JSON.parse(r.selections || '[]'),
        }));

        return {
            responses: parsedResponses,
            total: countResult.total,
            limit,
            offset,
        };
    } catch (error) {
        console.error('Error fetching calculator responses:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch responses',
        });
    }
});
