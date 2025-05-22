
// src/components/palabras/WordRow.tsx
import React from 'react';
import LetterBox from './LetterBox';
import { type LetterGuess } from '../../types';

interface WordRowProps {
    guess?: LetterGuess[]; // Letras ya adivinadas y evaluadas
    currentGuess?: string;  // Letras del intento actual (antes de Enter)
    wordLength: number;
    isShaking?: boolean; // Para animación de error
}

const WordRow: React.FC<WordRowProps> = ({ guess, currentGuess, wordLength, isShaking }) => {
    const lettersToShow: { char: string; state: import('../../types').LetterState }[] = [];

    if (guess) { // Fila de un intento ya enviado
        lettersToShow.push(...guess);
    } else { // Fila del intento actual o vacía
        for (let i = 0; i < wordLength; i++) {
            lettersToShow.push({
                char: currentGuess?.[i] || '',
                state: 'empty',
            });
        }
    }

    const rowClass = isShaking ? 'animate-shake' : '';

    return (
        <div className={`flex justify-center gap-1.5 mb-1.5 ${rowClass}`}>
            {lettersToShow.map((letter, index) => (
                <LetterBox
                    key={index}
                    char={letter.char}
                    state={letter.state}
                // isCurrentInput={!guess && index === (currentGuess?.length || 0)} // Animación si es la caja actual para escribir
                />
            ))}
        </div>
    );
};

export default WordRow;