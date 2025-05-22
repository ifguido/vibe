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

export interface ProfileAttribute {
    label: string; // ej: "Equipo Favorito"
    value: string; // ej: "Rojo FC"
}

export interface PlayerProfile {
    id: string; // Identificador único
    name: string; // Nombre del "jugador" o personaje
    avatarSeed: string; // Para generar un avatar simple (usaremos algo como DiceBear o similar)
    attributes: ProfileAttribute[];
    isImpostor?: boolean; // Solo para uso interno al generar, no se muestra al jugador
    isSelected?: boolean; // Para UI, si el jugador lo ha seleccionado
    isRevealedImpostor?: boolean; // Para UI después de revelar
    isCorrectlyIdentified?: boolean; // Para UI, si el jugador acertó
}

export interface ImpostorGameData {
    profiles: PlayerProfile[];
    rules: string[]; // Las pistas generales para identificar impostores
    impostorCount: number;
}