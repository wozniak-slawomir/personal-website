import { getDatabase } from '~/server/utils/database';
import {
    REGRESSION_COEFFICIENTS,
    MODEL_R_SQUARED,
    MODEL_STANDARD_ERROR,
    calculateStats,
} from '~/server/utils/survey';

interface SurveyRow {
    salary_net: number;
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    emotional_stability: number;
    intellect: number;
    experience_years: number;
    is_b2b: number;
    employment_type: string;
    predicted_salary: number;
}

export default defineEventHandler(() => {
    try {
        const db = getDatabase();

        // Get total counts
        const countResult = db.prepare('SELECT COUNT(*) as total FROM survey_responses').get() as { total: number };
        const outlierCount = db.prepare('SELECT COUNT(*) as total FROM survey_outliers').get() as { total: number };

        // Get all responses for statistics
        const responses = db.prepare(`
            SELECT salary_net, extraversion, agreeableness, conscientiousness, 
                   emotional_stability, intellect, experience_years, is_b2b, 
                   employment_type, predicted_salary
            FROM survey_responses
        `).all() as SurveyRow[];

        // Calculate salary statistics
        const salaries = responses.map(r => r.salary_net);
        const salaryStats = calculateStats(salaries);

        // Calculate Big Five averages
        const bigFiveAvg = {
            extraversion: 0,
            agreeableness: 0,
            conscientiousness: 0,
            emotionalStability: 0,
            intellect: 0,
        };

        if (responses.length > 0) {
            responses.forEach(r => {
                bigFiveAvg.extraversion += r.extraversion;
                bigFiveAvg.agreeableness += r.agreeableness;
                bigFiveAvg.conscientiousness += r.conscientiousness;
                bigFiveAvg.emotionalStability += r.emotional_stability;
                bigFiveAvg.intellect += r.intellect;
            });

            bigFiveAvg.extraversion /= responses.length;
            bigFiveAvg.agreeableness /= responses.length;
            bigFiveAvg.conscientiousness /= responses.length;
            bigFiveAvg.emotionalStability /= responses.length;
            bigFiveAvg.intellect /= responses.length;
        }

        // Employment type distribution
        const employmentCounts: Record<string, number> = {};
        responses.forEach(r => {
            employmentCounts[r.employment_type] = (employmentCounts[r.employment_type] || 0) + 1;
        });

        // Experience statistics
        const experiences = responses.map(r => r.experience_years);
        const experienceStats = calculateStats(experiences);

        // B2B percentage
        const b2bCount = responses.filter(r => r.is_b2b === 1).length;
        const b2bPercentage = responses.length > 0 ? (b2bCount / responses.length) * 100 : 0;

        // Prediction accuracy (Mean Absolute Error)
        let mae = 0;
        if (responses.length > 0) {
            const sumAbsError = responses.reduce((sum, r) => 
                sum + Math.abs(r.salary_net - r.predicted_salary), 0);
            mae = sumAbsError / responses.length;
        }

        // Salary distribution by experience brackets
        const experienceBrackets = [
            { label: '0-2 lat', min: 0, max: 2 },
            { label: '3-5 lat', min: 3, max: 5 },
            { label: '6-10 lat', min: 6, max: 10 },
            { label: '11+ lat', min: 11, max: Infinity },
        ];

        const salaryByExperience = experienceBrackets.map(bracket => {
            const bracketResponses = responses.filter(
                r => r.experience_years >= bracket.min && r.experience_years <= bracket.max
            );
            const bracketSalaries = bracketResponses.map(r => r.salary_net);
            const stats = calculateStats(bracketSalaries);
            return {
                label: bracket.label,
                count: bracketResponses.length,
                avgSalary: Math.round(stats.mean),
            };
        });

        // Responses over time (last 30 days)
        const timeSeriesRows = db.prepare(`
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as count
            FROM survey_responses
            WHERE created_at >= datetime('now', '-30 days')
            GROUP BY DATE(created_at)
            ORDER BY date ASC
        `).all() as { date: string; count: number }[];

        return {
            totalResponses: countResult.total,
            totalOutliers: outlierCount.total,
            salary: {
                mean: Math.round(salaryStats.mean),
                stdDev: Math.round(salaryStats.stdDev),
                min: salaries.length > 0 ? Math.min(...salaries) : 0,
                max: salaries.length > 0 ? Math.max(...salaries) : 0,
            },
            bigFiveAverages: {
                extraversion: Math.round(bigFiveAvg.extraversion * 100) / 100,
                agreeableness: Math.round(bigFiveAvg.agreeableness * 100) / 100,
                conscientiousness: Math.round(bigFiveAvg.conscientiousness * 100) / 100,
                emotionalStability: Math.round(bigFiveAvg.emotionalStability * 100) / 100,
                intellect: Math.round(bigFiveAvg.intellect * 100) / 100,
            },
            employmentDistribution: employmentCounts,
            b2bPercentage: Math.round(b2bPercentage * 10) / 10,
            experience: {
                mean: Math.round(experienceStats.mean * 10) / 10,
                stdDev: Math.round(experienceStats.stdDev * 10) / 10,
            },
            modelAccuracy: {
                rSquared: MODEL_R_SQUARED,
                standardError: MODEL_STANDARD_ERROR,
                meanAbsoluteError: Math.round(mae),
            },
            regressionCoefficients: REGRESSION_COEFFICIENTS,
            salaryByExperience,
            responsesOverTime: timeSeriesRows,
        };
    } catch (error) {
        console.error('Error fetching survey stats:', error);
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch statistics: ${error instanceof Error ? error.message : error}`,
        });
    }
});
