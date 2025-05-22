
// src/components/MatchCard.tsx
import React from 'react';
import { type Match } from '../types';

interface MatchCardProps {
    match: Match;
    onScoreChange: (matchId: number, scoreA: number | null, scoreB: number | null) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onScoreChange }) => {
    const handleInputChange = (team: 'A' | 'B', value: string) => {
        const score = value === '' ? null : parseInt(value, 10);
        if (isNaN(score as number) && score !== null) return; // Evita NaN si no es string vacío

        const newScoreA = team === 'A' ? score : match.scoreA;
        const newScoreB = team === 'B' ? score : match.scoreB;

        onScoreChange(match.id, newScoreA, newScoreB);
    };

    const formatDate = (dateStr: string, timeStr: string) => {
        const dateObj = new Date(`${dateStr}T${timeStr}`);
        return dateObj.toLocaleString('es-ES', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    return (
        <div className="bg-surface rounded-xl shadow-lg-elevation p-5 md:p-6 mb-6 transition-all duration-300 hover:shadow-xl-elevation transform hover:-translate-y-1">
            <div className="mb-3 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider">{match.group}</p>
                <p className="text-sm text-gray-600">{formatDate(match.date, match.time)}</p>
            </div>

            <div className="grid grid-cols-3 items-center gap-2 md:gap-4">
                {/* Team A */}
                <div className="flex flex-col items-center text-center">
                    <span className="text-4xl md:text-5xl mb-1" role="img" aria-label={match.teamA.name}>{match.teamA.logo}</span>
                    <span className="font-semibold text-sm md:text-base break-words">{match.teamA.name}</span>
                </div>

                {/* Scores */}
                <div className="flex items-center justify-center gap-2 md:gap-3">
                    <input
                        type="number"
                        min="0"
                        max="99"
                        value={match.scoreA === null ? '' : match.scoreA}
                        onChange={(e) => handleInputChange('A', e.target.value)}
                        className="w-10 md:w-12 h-10 md:h-12 text-center text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        aria-label={`Goles ${match.teamA.name}`}
                    />
                    <span className="text-2xl font-light text-gray-400">-</span>
                    <input
                        type="number"
                        min="0"
                        max="99"
                        value={match.scoreB === null ? '' : match.scoreB}
                        onChange={(e) => handleInputChange('B', e.target.value)}
                        className="w-10 md:w-12 h-10 md:h-12 text-center text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        aria-label={`Goles ${match.teamB.name}`}
                    />
                </div>

                {/* Team B */}
                <div className="flex flex-col items-center text-center">
                    <span className="text-4xl md:text-5xl mb-1" role="img" aria-label={match.teamB.name}>{match.teamB.logo}</span>
                    <span className="font-semibold text-sm md:text-base break-words">{match.teamB.name}</span>
                </div>
            </div>
        </div>
    );
}

export default MatchCard;