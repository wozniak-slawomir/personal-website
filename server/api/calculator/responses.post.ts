import { getCalculatorDatabase } from '~/server/utils/calculatorDatabase';

interface CalculatorResponse {
    segment?: string;
    peopleCounts: Record<string, number>;
    selections: Array<{ toolId: string; isZombie: boolean }>;
    totalYearlyCost: number;
    zombieYearlyCost: number;
    wellSpentYearlyCost: number;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<CalculatorResponse>(event);

    // Validate required fields
    if (!body.selections || !Array.isArray(body.selections)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'selections array is required',
        });
    }

    if (typeof body.totalYearlyCost !== 'number') {
        throw createError({
            statusCode: 400,
            statusMessage: 'totalYearlyCost is required',
        });
    }

    try {
        const db = getCalculatorDatabase();

        const stmt = db.prepare(`
            INSERT INTO calculator_responses (
                segment,
                people_counts,
                total_yearly_cost,
                zombie_yearly_cost,
                well_spent_yearly_cost,
                selections
            ) VALUES (?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            body.segment || null,
            JSON.stringify(body.peopleCounts || {}),
            body.totalYearlyCost,
            body.zombieYearlyCost || 0,
            body.wellSpentYearlyCost || 0,
            JSON.stringify(body.selections)
        );

        return {
            status: 'success',
            id: result.lastInsertRowid,
        };
    } catch (error) {
        console.error('Error saving calculator response:', error);
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to save response: ${error instanceof Error ? error.message : error}`,
        });
    }
});
