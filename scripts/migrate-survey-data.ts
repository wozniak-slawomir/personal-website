/**
 * Migration script to import existing survey data from Excel to SQLite database
 * 
 * Usage: npx tsx scripts/migrate-survey-data.ts
 */

import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { mkdirSync, readFileSync } from 'fs';
import * as XLSX from 'xlsx';

// Regression coefficients from the Excel analysis
const REGRESSION_COEFFICIENTS = {
    intercept: 18317.4387595773,
    czy_b2b: 4622.80794755596,
    staz_pracy: 530.475757580515,
    ekstrawersja: -406.274864959489,
    ugodowosc: -2392.73505469691,
    sumiennosc: 1518.09673949366,
    stabilnosc_emocjonalna: -1487.67204556812,
    intelekt: -501.388610568562,
};

interface ExcelRow {
    'Submission ID': string;
    'Zarobki': number;
    'CZY_B2B': number;
    ' STAŻ PRACY': number;
    'WYNIK_EKSTRAWERSJA': number;
    'WYNIK_UGODOWOSC': number;
    'WYNIK_SUMIENNOSC': number;
    'WYNIK_STABILNOSC_EMOCJONALNA': number;
    'WYNIK_INTELEKT': number;
}

function predictSalary(
    isB2B: boolean,
    experienceYears: number,
    extraversion: number,
    agreeableness: number,
    conscientiousness: number,
    emotionalStability: number,
    intellect: number
): number {
    return Math.round(
        REGRESSION_COEFFICIENTS.intercept +
        REGRESSION_COEFFICIENTS.czy_b2b * (isB2B ? 1 : 0) +
        REGRESSION_COEFFICIENTS.staz_pracy * experienceYears +
        REGRESSION_COEFFICIENTS.ekstrawersja * extraversion +
        REGRESSION_COEFFICIENTS.ugodowosc * agreeableness +
        REGRESSION_COEFFICIENTS.sumiennosc * conscientiousness +
        REGRESSION_COEFFICIENTS.stabilnosc_emocjonalna * emotionalStability +
        REGRESSION_COEFFICIENTS.intelekt * intellect
    );
}

function calculateStats(values: number[]): { mean: number; stdDev: number } {
    if (values.length === 0) return { mean: 0, stdDev: 0 };
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return { mean, stdDev: Math.sqrt(variance) };
}

async function migrate() {
    console.log('Starting migration...');

    // Read Excel file
    const excelPath = join(process.cwd(), 'Badanie programistów Calculated.xlsx');
    console.log(`Reading Excel file: ${excelPath}`);
    
    const workbook = XLSX.readFile(excelPath);
    const sheetName = 'Analiza';
    const sheet = workbook.Sheets[sheetName];
    
    if (!sheet) {
        console.error(`Sheet "${sheetName}" not found`);
        process.exit(1);
    }

    // Convert to JSON
    const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet);
    console.log(`Found ${rows.length} rows in sheet`);

    // Filter valid rows (those with submission ID and salary)
    const validRows = rows.filter(row => 
        row['Submission ID'] && 
        row['Zarobki'] && 
        typeof row['Zarobki'] === 'number' &&
        row['WYNIK_EKSTRAWERSJA'] !== undefined
    );
    console.log(`${validRows.length} valid rows to import`);

    // Calculate salary statistics for outlier detection
    const salaries = validRows.map(r => r['Zarobki']);
    const stats = calculateStats(salaries);
    console.log(`Salary mean: ${Math.round(stats.mean)}, stdDev: ${Math.round(stats.stdDev)}`);
    
    const lowerBound = stats.mean - 3 * stats.stdDev;
    const upperBound = stats.mean + 3 * stats.stdDev;
    console.log(`Outlier bounds: ${Math.round(lowerBound)} - ${Math.round(upperBound)}`);

    // Setup database
    const dbPath = join(process.cwd(), '.data', 'calculator.db');
    mkdirSync(dirname(dbPath), { recursive: true });
    
    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');

    // Prepare insert statements
    const insertResponse = db.prepare(`
        INSERT OR IGNORE INTO survey_responses (
            ip_address, experience_years, employment_type, salary_net,
            e_plus_1, u_minus_1, s_minus_1, se_plus_1, i_plus_1,
            e_minus_2, u_plus_2, s_plus_2, se_minus_2, i_minus_2,
            e_plus_3, u_minus_3, s_minus_3, se_plus_3, i_plus_3,
            e_minus_4, u_plus_4, s_plus_4, se_minus_4, i_minus_4,
            extraversion, agreeableness, conscientiousness, emotional_stability, intellect,
            predicted_salary, is_b2b
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertOutlier = db.prepare(`
        INSERT OR IGNORE INTO survey_outliers (
            ip_address, experience_years, employment_type, salary_net,
            e_plus_1, u_minus_1, s_minus_1, se_plus_1, i_plus_1,
            e_minus_2, u_plus_2, s_plus_2, se_minus_2, i_minus_2,
            e_plus_3, u_minus_3, s_minus_3, se_plus_3, i_plus_3,
            e_minus_4, u_plus_4, s_plus_4, se_minus_4, i_minus_4,
            extraversion, agreeableness, conscientiousness, emotional_stability, intellect,
            predicted_salary, is_b2b, outlier_reason
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let importedCount = 0;
    let outlierCount = 0;

    // Import each row
    for (const row of validRows) {
        const submissionId = row['Submission ID'];
        const salary = row['Zarobki'];
        const isB2B = row['CZY_B2B'] === 1;
        const experience = row[' STAŻ PRACY'] || 0;
        const extraversion = row['WYNIK_EKSTRAWERSJA'];
        const agreeableness = row['WYNIK_UGODOWOSC'];
        const conscientiousness = row['WYNIK_SUMIENNOSC'];
        const emotionalStability = row['WYNIK_STABILNOSC_EMOCJONALNA'];
        const intellect = row['WYNIK_INTELEKT'];

        // Use legacy IP address based on submission ID
        const ipAddress = `legacy-${submissionId}`;
        const employmentType = isB2B ? 'B2B' : 'UoP';

        // Calculate predicted salary
        const predictedSalary = predictSalary(
            isB2B,
            experience,
            extraversion,
            agreeableness,
            conscientiousness,
            emotionalStability,
            intellect
        );

        // Default TIPI values (we don't have individual question answers, just totals)
        // Using 3 as neutral for all questions
        const defaultTipi = 3;

        // Check if outlier
        const isOutlier = salary < lowerBound || salary > upperBound;

        const data = [
            ipAddress,
            experience,
            employmentType,
            salary,
            defaultTipi, defaultTipi, defaultTipi, defaultTipi, defaultTipi,
            defaultTipi, defaultTipi, defaultTipi, defaultTipi, defaultTipi,
            defaultTipi, defaultTipi, defaultTipi, defaultTipi, defaultTipi,
            defaultTipi, defaultTipi, defaultTipi, defaultTipi, defaultTipi,
            extraversion,
            agreeableness,
            conscientiousness,
            emotionalStability,
            intellect,
            predictedSalary,
            isB2B ? 1 : 0,
        ];

        try {
            if (isOutlier) {
                const reason = salary < lowerBound 
                    ? `Salary below 3 SD (${Math.round(lowerBound)})` 
                    : `Salary above 3 SD (${Math.round(upperBound)})`;
                insertOutlier.run(...data, reason);
                outlierCount++;
            } else {
                insertResponse.run(...data);
                importedCount++;
            }
        } catch (error) {
            console.error(`Error importing ${submissionId}:`, error);
        }
    }

    db.close();

    console.log('\nMigration complete!');
    console.log(`Imported: ${importedCount} responses`);
    console.log(`Outliers: ${outlierCount} responses`);
}

migrate().catch(console.error);
