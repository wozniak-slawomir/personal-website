export interface BigFiveScores {
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    emotionalStability: number;
    intellect: number;
}

export interface TraitResult {
    score: number;
    maxScore: number;
    percentage: number;
    level: 'low' | 'medium' | 'high';
}

export type PersonalityProfile = Record<keyof BigFiveScores, TraitResult>;

/**
 * Calculates Big Five personality traits based on TIPI answers.
 * Items are scored 1-5.
 * Keys in answers are expected to be in format: "{trait}_{plus|minus}_{index}"
 * e.g. "e_plus_1", "u_minus_1"
 */
export function calculateBigFive(answers: Record<string, number>): BigFiveScores {
    const scores: BigFiveScores = {
        extraversion: 0,
        agreeableness: 0,
        conscientiousness: 0,
        emotionalStability: 0,
        intellect: 0,
    };

    const counts: Record<keyof BigFiveScores, number> = {
        extraversion: 0,
        agreeableness: 0,
        conscientiousness: 0,
        emotionalStability: 0,
        intellect: 0,
    };

    for (const [key, value] of Object.entries(answers)) {
        if (!key || typeof value !== 'number') continue;

        const parts = key.split('_');
        if (parts.length < 2) continue;

        const traitCode = parts[0]; // e, u, s, se, i
        const direction = parts[1]; // plus, minus

        let trait: keyof BigFiveScores | null = null;
        switch (traitCode) {
            case 'e': trait = 'extraversion'; break;
            case 'u': trait = 'agreeableness'; break;
            case 's': trait = 'conscientiousness'; break;
            case 'se': trait = 'emotionalStability'; break;
            case 'i': trait = 'intellect'; break;
        }

        if (trait) {
            const score = direction === 'plus' ? value : (6 - value);
            scores[trait] += score;
            counts[trait] += 1;
        }
    }

    return scores;
}

export function getPersonalityProfile(scores: BigFiveScores): PersonalityProfile {
    const profile: Partial<PersonalityProfile> = {};

    for (const [key, score] of Object.entries(scores)) {
        const trait = key as keyof BigFiveScores;
        // In IPIP-BFM-20, each scale has 4 items. Min score 4, max 20.
        const maxScore = 20;
        
        let level: 'low' | 'medium' | 'high' = 'medium';

        if (score <= 9) {
            level = 'low';
        } else if (score >= 15) {
            level = 'high';
        } else {
            level = 'medium';
        }

        profile[trait] = {
            score,
            maxScore,
            percentage: Math.round((score / maxScore) * 100),
            level
        };
    }

    return profile as PersonalityProfile;
}
