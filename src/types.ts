// src/types.ts
export interface Team {
    name: string;
    code: string;
    logo: string; // URL a imagen o emoji
}

export interface Match {
    id: number;
    group: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    teamA: Team;
    teamB: Team;
    scoreA: number | null;
    scoreB: number | null;
}

export interface StoredPrediction {
    scoreA: number | null;
    scoreB: number | null;
}

export interface StoredPredictions {
    [matchId: number]: StoredPrediction;
}

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface LetterGuess {
    char: string;
    state: LetterState;
}

export interface GuessRow {
    letters: LetterGuess[];
}