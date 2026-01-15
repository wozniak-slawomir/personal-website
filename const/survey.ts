/**
 * TIPI (Ten Item Personality Inventory) Questions
 * Used for Big Five personality assessment
 */

export interface TIPIQuestion {
    id: string;
    text: string;
}

export const TIPI_QUESTIONS: TIPIQuestion[][] = [
    // Page 1
    [
        { id: 'e_plus_1', text: 'Jestem duszą towarzystwa.' },
        { id: 'u_minus_1', text: 'Niezbyt obchodzą mnie inni ludzie.' },
        { id: 's_minus_1', text: 'Zostawiam moje rzeczy gdzie popadnie.' },
        { id: 'se_plus_1', text: 'Zwykle jestem zrelaksowany/a.' },
    ],
    // Page 2
    [
        { id: 'i_plus_1', text: 'Mam bogate słownictwo.' },
        { id: 'e_minus_2', text: 'Trzymam się z boku.' },
        { id: 'u_plus_2', text: 'Jestem wyrozumiały/a dla uczuć innych ludzi.' },
        { id: 's_plus_2', text: 'Bez zwłoki wypełniam codzienne obowiązki.' },
    ],
    // Page 3
    [
        { id: 'se_minus_2', text: 'Często martwię się czymś.' },
        { id: 'i_minus_2', text: 'Mam trudności ze zrozumieniem abstrakcyjnych pojęć.' },
        { id: 'e_plus_3', text: 'Rozmawiam z wieloma różnymi ludźmi na przyjęciach.' },
        { id: 'u_minus_3', text: 'Nie interesują mnie problemy innych ludzi.' },
    ],
    // Page 4
    [
        { id: 's_minus_3', text: 'Często zapominam odkładać rzeczy na miejsce.' },
        { id: 'se_plus_3', text: 'Rzadko czuję się przygnębiony/a.' },
        { id: 'i_plus_3', text: 'Mam głowę pełną pomysłów.' },
        { id: 'e_minus_4', text: 'Wśród nieznajomych jestem małomówny/a.' },
    ],
    // Page 5
    [
        { id: 'u_plus_4', text: 'Znajduję czas dla innych.' },
        { id: 's_plus_4', text: 'Postępuję zgodnie z harmonogramem.' },
        { id: 'se_minus_4', text: 'Często miewam huśtawki nastrojów.' },
        { id: 'i_minus_4', text: 'Nie mam zbyt bogatej wyobraźni.' },
    ],
];

export const EMPLOYMENT_TYPES = [
    { value: 'B2B', label: 'B2B (własna działalność)' },
    { value: 'UoP', label: 'Umowa o pracę' },
    { value: 'Cywilnoprawna', label: 'Umowa cywilnoprawna' },
    { value: 'Inne', label: 'Inne' },
];
