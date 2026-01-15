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
    level: 'niski' | 'średni' | 'wysoki';
    label: string;
    description: string;
}

export type PersonalityProfile = Record<keyof BigFiveScores, TraitResult>;

const TRAIT_LABELS: Record<keyof BigFiveScores, string> = {
    extraversion: 'Ekstrawersja',
    agreeableness: 'Ugodowość',
    conscientiousness: 'Sumienność',
    emotionalStability: 'Stabilność emocjonalna',
    intellect: 'Intelekt (Otwartość)',
};

const TRAIT_DESCRIPTIONS: Record<keyof BigFiveScores, { low: string; high: string }> = {
    extraversion: {
        high: 'Osoby o wysokiej ekstrawersji są energiczne, towarzyskie, rozmowne i śmiałe. Lubią być w centrum uwagi i czerpią energię z kontaktów z ludźmi.',
        low: 'Osoby o niskiej ekstrawersji są bardziej powściągliwe, cenią sobie spokój i prywatność. Mogą wydawać się małomówne lub wycofane w dużej grupie, preferując kontakty w węższym gronie.'
    },
    agreeableness: {
        high: 'Osoby wysoko ugodowe są ufne, altruistyczne, serdeczne i skłonne do współpracy. Dążą do zgody i harmonii w relacjach.',
        low: 'Osoby o niższej ugodowości mogą być bardziej sceptyczne, krytyczne i nastawione na rywalizację. Częściej stawiają własne interesy ponad interesy innych.'
    },
    conscientiousness: {
        high: 'Wysoka sumienność oznacza dobre zorganizowanie, obowiązkowość, dokładność i determinację w dążeniu do celu. Takie osoby lubią porządek i planowanie.',
        low: 'Niska sumienność może wiązać się z większą spontanicznością, elastycznością, ale też mniejszą dbałością o szczegóły i systematyczność.'
    },
    emotionalStability: {
        high: 'Osoby stabilne emocjonalnie są spokojne, zrównoważone i odporne na stres. Rzadziej doświadczają silnych negatywnych emocji jak lęk czy złość.',
        low: 'Niższa stabilność (wyższa neurotyczność) wiąże się z częstszym doświadczaniem wahań nastroju, lęku, drażliwości i silniejszym reagowaniem na stres.'
    },
    intellect: {
        high: 'Wysoki intelekt (otwartość) cechuje osoby kreatywne, ciekawe świata, o bogatej wyobraźni i szerokich zainteresowaniach. Lubią nowości i abstrakcyjne myślenie.',
        low: 'Niższy wynik może wskazywać na pragmatyzm, twarde stąpanie po ziemi i preferowanie sprawdzonych rozwiązań oraz konkretów zamiast abstrakcyjnych idei.'
    }
};

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
        const minScore = 4;
        const range = maxScore - minScore; // 16
        
        // Simple levels based on thirds of the range
        // 4-9: Low
        // 10-14: Medium
        // 15-20: High
        let level: 'niski' | 'średni' | 'wysoki' = 'średni';
        let description = '';

        if (score <= 9) {
            level = 'niski';
            description = TRAIT_DESCRIPTIONS[trait].low;
        } else if (score >= 15) {
            level = 'wysoki';
            description = TRAIT_DESCRIPTIONS[trait].high;
        } else {
            level = 'średni';
            // For medium, we can combine or give a neutral description.
            // For now, let's say they have balanced traits or average.
            description = 'Twój wynik jest przeciętny, co oznacza, że przejawiasz cechy z obu biegunów w zależności od sytuacji, lub nie są one u Ciebie silnie zaznaczone.';
        }

        profile[trait] = {
            score,
            maxScore,
            percentage: Math.round((score / maxScore) * 100),
            level,
            label: TRAIT_LABELS[trait],
            description
        };
    }

    return profile as PersonalityProfile;
}
