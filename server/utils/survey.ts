/**
 * Survey calculation utilities for Big Five personality scoring and salary prediction
 * Based on TIPI (Ten Item Personality Inventory) and linear regression model
 */

// Regression coefficients from Excel analysis (Analiza sheet)
export const REGRESSION_COEFFICIENTS = {
    intercept: 18317.4387595773,
    czy_b2b: 4622.80794755596,
    staz_pracy: 530.475757580515,
    ekstrawersja: -406.274864959489,
    ugodowosc: -2392.73505469691,
    sumiennosc: 1518.09673949366,
    stabilnosc_emocjonalna: -1487.67204556812,
    intelekt: -501.388610568562,
};

// R-squared of the model
export const MODEL_R_SQUARED = 0.691728357905774;
export const MODEL_STANDARD_ERROR = 4153.26434733321;

export interface TIPIAnswers {
    e_plus_1: number;   // Jestem duszą towarzystwa
    u_minus_1: number;  // Niezbyt obchodzą mnie inni ludzie
    s_minus_1: number;  // Zostawiam moje rzeczy gdzie popadnie
    se_plus_1: number;  // Zwykle jestem zrelaksowany/a
    i_plus_1: number;   // Mam bogate słownictwo
    e_minus_2: number;  // Trzymam się z boku
    u_plus_2: number;   // Jestem wyrozumiały/a dla uczuć innych
    s_plus_2: number;   // Bez zwłoki wypełniam codzienne obowiązki
    se_minus_2: number; // Często martwię się czymś
    i_minus_2: number;  // Mam trudności ze zrozumieniem abstrakcji
    e_plus_3: number;   // Rozmawiam z wieloma ludźmi na przyjęciach
    u_minus_3: number;  // Nie interesują mnie problemy innych
    s_minus_3: number;  // Często zapominam odkładać rzeczy na miejsce
    se_plus_3: number;  // Rzadko czuję się przygnębiony/a
    i_plus_3: number;   // Mam głowę pełną pomysłów
    e_minus_4: number;  // Wśród nieznajomych jestem małomówny/a
    u_plus_4: number;   // Znajduję czas dla innych
    s_plus_4: number;   // Postępuję zgodnie z harmonogramem
    se_minus_4: number; // Często miewam huśtawki nastrojów
    i_minus_4: number;  // Nie mam zbyt bogatej wyobraźni
}

export interface BigFiveScores {
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    emotionalStability: number;
    intellect: number;
}

/**
 * Reverse code a TIPI item (for negative items)
 * Original scale: 1-5, Reversed: 5-1
 */
function reverseCode(value: number): number {
    return 6 - value;
}

/**
 * Calculate Big Five personality scores from TIPI answers
 * Each trait is the average of 4 items (2 positive, 2 negative reversed)
 */
export function calculateBigFive(answers: TIPIAnswers): BigFiveScores {
    // Extraversion: E+1, E+3, reverse(E-2), reverse(E-4)
    const extraversion = (
        answers.e_plus_1 +
        answers.e_plus_3 +
        reverseCode(answers.e_minus_2) +
        reverseCode(answers.e_minus_4)
    ) / 4;

    // Agreeableness: U+2, U+4, reverse(U-1), reverse(U-3)
    const agreeableness = (
        answers.u_plus_2 +
        answers.u_plus_4 +
        reverseCode(answers.u_minus_1) +
        reverseCode(answers.u_minus_3)
    ) / 4;

    // Conscientiousness: S+2, S+4, reverse(S-1), reverse(S-3)
    const conscientiousness = (
        answers.s_plus_2 +
        answers.s_plus_4 +
        reverseCode(answers.s_minus_1) +
        reverseCode(answers.s_minus_3)
    ) / 4;

    // Emotional Stability: SE+1, SE+3, reverse(SE-2), reverse(SE-4)
    const emotionalStability = (
        answers.se_plus_1 +
        answers.se_plus_3 +
        reverseCode(answers.se_minus_2) +
        reverseCode(answers.se_minus_4)
    ) / 4;

    // Intellect/Openness: I+1, I+3, reverse(I-2), reverse(I-4)
    const intellect = (
        answers.i_plus_1 +
        answers.i_plus_3 +
        reverseCode(answers.i_minus_2) +
        reverseCode(answers.i_minus_4)
    ) / 4;

    return {
        extraversion,
        agreeableness,
        conscientiousness,
        emotionalStability,
        intellect,
    };
}

/**
 * Predict salary using the regression model
 */
export function predictSalary(
    bigFive: BigFiveScores,
    isB2B: boolean,
    experienceYears: number
): number {
    const predicted =
        REGRESSION_COEFFICIENTS.intercept +
        REGRESSION_COEFFICIENTS.czy_b2b * (isB2B ? 1 : 0) +
        REGRESSION_COEFFICIENTS.staz_pracy * experienceYears +
        REGRESSION_COEFFICIENTS.ekstrawersja * bigFive.extraversion +
        REGRESSION_COEFFICIENTS.ugodowosc * bigFive.agreeableness +
        REGRESSION_COEFFICIENTS.sumiennosc * bigFive.conscientiousness +
        REGRESSION_COEFFICIENTS.stabilnosc_emocjonalna * bigFive.emotionalStability +
        REGRESSION_COEFFICIENTS.intelekt * bigFive.intellect;

    return Math.round(predicted);
}

/**
 * Check if a salary is an outlier using 3 standard deviations method
 */
export function isOutlier(
    salary: number,
    mean: number,
    stdDev: number
): { isOutlier: boolean; reason: string | null } {
    const lowerBound = mean - 3 * stdDev;
    const upperBound = mean + 3 * stdDev;

    if (salary < lowerBound) {
        return {
            isOutlier: true,
            reason: `Salary ${salary} PLN is below 3 SD (${Math.round(lowerBound)} PLN)`,
        };
    }

    if (salary > upperBound) {
        return {
            isOutlier: true,
            reason: `Salary ${salary} PLN is above 3 SD (${Math.round(upperBound)} PLN)`,
        };
    }

    return { isOutlier: false, reason: null };
}

/**
 * Calculate mean and standard deviation of an array of numbers
 */
export function calculateStats(values: number[]): { mean: number; stdDev: number } {
    if (values.length === 0) {
        return { mean: 0, stdDev: 0 };
    }

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;

    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    const stdDev = Math.sqrt(variance);

    return { mean, stdDev };
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(event: { node: { req: { headers: Record<string, string | string[] | undefined> } } }): string {
    const headers = event.node.req.headers;

    // Check X-Forwarded-For header (common for proxies/load balancers)
    const xForwardedFor = headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ips = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor;
        return ips.split(',')[0].trim();
    }

    // Check X-Real-IP header (Nginx)
    const xRealIP = headers['x-real-ip'];
    if (xRealIP) {
        return Array.isArray(xRealIP) ? xRealIP[0] : xRealIP;
    }

    // Fallback to connection remote address
    return 'unknown';
}

/**
 * Validate TIPI answer (must be 1-5)
 */
export function validateTIPIAnswer(value: unknown): value is number {
    return typeof value === 'number' && value >= 1 && value <= 5 && Number.isInteger(value);
}
