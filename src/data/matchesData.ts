// src/data/matchesData.ts
import { type Match } from '../types';
import { groupStageTeams } from './teamsData'; // Asumiendo que groupStageTeams es Array de { name: string, teams: Team[] }

const generateAllGroupStageMatches = (): Omit<Match, 'scoreA' | 'scoreB'>[] => {
    const allMatches: Omit<Match, 'scoreA' | 'scoreB'>[] = [];
    let matchIdCounter = 1; // Usamos let porque se incrementa

    // Fecha de inicio del torneo (ejemplo: 11 de junio de 2026)
    // Usamos una nueva instancia de Date para cada manipulación para evitar efectos secundarios
    const currentMatchDate = new Date("2026-06-11T00:00:00Z");
    const possibleTimes = ["12:00", "15:00", "18:00", "21:00"]; // Horarios UTC (o locales si prefieres)
    let matchesScheduledThisDay = 0; // Contador para distribuir partidos por día

    for (const groupDef of groupStageTeams) {
        const teamsInGroup = groupDef.teams;

        // Generar los 6 enfrentamientos para el grupo (T1vT2, T1vT3, T1vT4, T2vT3, T2vT4, T3vT4)
        for (let i = 0; i < teamsInGroup.length; i++) {
            for (let j = i + 1; j < teamsInGroup.length; j++) {
                // Avanzar al siguiente día si ya se programaron 4 partidos para la fecha actual
                if (matchesScheduledThisDay >= 4) {
                    currentMatchDate.setUTCDate(currentMatchDate.getUTCDate() + 1); // Avanzar día
                    matchesScheduledThisDay = 0; // Reiniciar contador para el nuevo día
                }

                const matchDateString = currentMatchDate.toISOString().split('T')[0];
                const matchTime = possibleTimes[matchesScheduledThisDay % possibleTimes.length];

                allMatches.push({
                    id: matchIdCounter++,
                    group: groupDef.name,
                    date: matchDateString,
                    time: matchTime,
                    teamA: teamsInGroup[i],
                    teamB: teamsInGroup[j],
                });
                matchesScheduledThisDay++;
            }
        }
        // Opcional: Pequeño ajuste para que no todos los grupos empiecen exactamente el mismo día si un grupo no llena los 4 slots.
        // Si el último partido de un grupo no completó los 4 del día, el siguiente grupo continuará en ese mismo día.
        // Si se quiere que cada grupo pueda tener un ligero espaciado o comenzar en un nuevo día si hay pocos partidos:
        // if (matchesScheduledThisDay > 0 && matchesScheduledThisDay < 4) {
        //   currentMatchDate.setUTCDate(currentMatchDate.getUTCDate() + 1);
        //   matchesScheduledThisDay = 0;
        // }
    }
    return allMatches;
};

export const initialMatchesData: Omit<Match, 'scoreA' | 'scoreB'>[] = generateAllGroupStageMatches();

// Para depuración, puedes descomentar esto en tu entorno de desarrollo:
// console.log(`Generated ${initialMatchesData.length} matches.`);
// const lastMatch = initialMatchesData[initialMatchesData.length - 1];
// console.log(`Last match: ${lastMatch?.group} ${lastMatch?.teamA.code} vs ${lastMatch?.teamB.code} on ${lastMatch?.date} ${lastMatch?.time}`);