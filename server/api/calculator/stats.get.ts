import { getCalculatorDatabase } from '~/server/utils/calculatorDatabase';

export default defineEventHandler(() => {
    try {
        const db = getCalculatorDatabase();

        // Get total count
        const countResult = db.prepare('SELECT COUNT(*) as total FROM calculator_responses').get() as { total: number };

        // Get average costs
        const avgResult = db.prepare(`
            SELECT 
                AVG(total_yearly_cost) as avgTotal,
                AVG(zombie_yearly_cost) as avgZombie,
                AVG(well_spent_yearly_cost) as avgWellSpent
            FROM calculator_responses
        `).get() as { avgTotal: number | null; avgZombie: number | null; avgWellSpent: number | null };

        // Get segment counts
        const segmentRows = db.prepare(`
            SELECT segment, COUNT(*) as count
            FROM calculator_responses
            WHERE segment IS NOT NULL
            GROUP BY segment
            ORDER BY count DESC
        `).all() as Array<{ segment: string; count: number }>;

        const segmentCounts: Record<string, number> = {};
        segmentRows.forEach(row => {
            segmentCounts[row.segment] = row.count;
        });

        // Get all responses to analyze zombie tools
        const responses = db.prepare('SELECT selections FROM calculator_responses').all() as Array<{ selections: string }>;

        // Count zombie tools
        const zombieToolCounts: Record<string, number> = {};
        const toolUsageCounts: Record<string, number> = {};

        responses.forEach(response => {
            try {
                const selections = JSON.parse(response.selections || '[]') as Array<{ toolId: string; isZombie: boolean }>;
                selections.forEach(sel => {
                    toolUsageCounts[sel.toolId] = (toolUsageCounts[sel.toolId] || 0) + 1;
                    if (sel.isZombie) {
                        zombieToolCounts[sel.toolId] = (zombieToolCounts[sel.toolId] || 0) + 1;
                    }
                });
            } catch {
                // Skip invalid JSON
            }
        });

        // Top zombie tools
        const topZombieTools = Object.entries(zombieToolCounts)
            .map(([toolId, count]) => ({ toolId, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        // Top used tools
        const topUsedTools = Object.entries(toolUsageCounts)
            .map(([toolId, count]) => ({ toolId, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        // Costs by segment
        const costsBySegmentRows = db.prepare(`
            SELECT 
                segment,
                SUM(well_spent_yearly_cost) as wellSpent,
                SUM(zombie_yearly_cost) as zombie,
                COUNT(*) as responses
            FROM calculator_responses
            WHERE segment IS NOT NULL
            GROUP BY segment
            ORDER BY wellSpent DESC
        `).all() as Array<{ segment: string; wellSpent: number; zombie: number; responses: number }>;

        // Responses over time (last 30 days)
        const timeSeriesRows = db.prepare(`
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as count,
                SUM(total_yearly_cost) as totalCost
            FROM calculator_responses
            WHERE created_at >= datetime('now', '-30 days')
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        `).all() as Array<{ date: string; count: number; totalCost: number }>;

        return {
            totalResponses: countResult.total,
            averageTotalCost: Math.round(avgResult.avgTotal || 0),
            averageZombieCost: Math.round(avgResult.avgZombie || 0),
            averageWellSpentCost: Math.round(avgResult.avgWellSpent || 0),
            segmentCounts,
            topZombieTools,
            topUsedTools,
            costsBySegment: costsBySegmentRows,
            responsesOverTime: timeSeriesRows,
        };
    } catch (error) {
        console.error('Error fetching calculator stats:', error);
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch statistics: ${error instanceof Error ? error.message : error}`,
        });
    }
});
