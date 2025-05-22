// src/components/palabras/LetterBox.tsx
import React from 'react';
import { type LetterState } from '../../types';

interface LetterBoxProps {
    char: string;
    state: LetterState;
    isCurrentInput?: boolean; // Para animar la caja actual
}

const LetterBox: React.FC<LetterBoxProps> = ({ char, state, isCurrentInput }) => {
    const stateClasses = {
        correct: 'bg-green-500 border-green-500 text-white',
        present: 'bg-yellow-500 border-yellow-500 text-white',
        absent: 'bg-gray-500 border-gray-500 text-white',
        empty: 'bg-surface border-gray-300',
    };

    return (
        <div
            className={`w-12 h-12 sm:w-14 sm:h-14 border-2 rounded flex items-center justify-center
                  text-2xl sm:text-3xl font-bold uppercase transition-all duration-300 ease-in-out
                  ${stateClasses[state]}
                  ${isCurrentInput && state === 'empty' ? 'animate-pulse border-primary' : ''}
                  ${char && state !== 'empty' ? 'transform scale-105' : ''}`}
        >
            {char}
        </div>
    );
};

export default LetterBox;