
// src/components/palabras/WordleGame.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { getRandomPlayerName } from '../../data/playersData';
import WordRow from './WordRow';
import { type LetterGuess, type GuessRow } from '../../types';
// import Keyboard from './Keyboard'; // Opcional

const MAX_ATTEMPTS = 6;
const TARGET_WORD_LENGTH = 5; // Para un Wordle clásico, o hacerlo dinámico

const WordleGame: React.FC = () => {
    const [targetWord, setTargetWord] = useState<string>("");
    const [guesses, setGuesses] = useState<GuessRow[]>([]);
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [attempt, setAttempt] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isShaking, setIsShaking] = useState<boolean>(false);
    // const [keyStates, setKeyStates] = useState<{[key: string]: LetterState}>({}); // Para el teclado

    const initializeGame = useCallback(() => {
        const newWord = getRandomPlayerName(TARGET_WORD_LENGTH);
        if (!newWord) {
            console.error("No se pudo obtener una palabra objetivo. Revisa playersData.ts");
            setMessage("Error al iniciar el juego. Intenta de nuevo.");
            setTargetWord("ERROR"); // Fallback
            return;
        }
        setTargetWord(newWord);
        setGuesses([]);
        setCurrentGuess("");
        setAttempt(0);
        setIsGameOver(false);
        setMessage("");
        // setKeyStates({});
        console.log("Palabra Objetivo (dev):", newWord); // Para depuración
    }, []);

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    const evaluateGuess = (guess: string): LetterGuess[] => {
        const result: LetterGuess[] = [];
        const targetArray = targetWord.split('');
        const guessArray = guess.split('');
        // const newKeyStates = {...keyStates}; // Para actualizar el teclado

        // Primero, marcar las correctas (verdes)
        for (let i = 0; i < targetWord.length; i++) {
            if (guessArray[i] === targetArray[i]) {
                result[i] = { char: guessArray[i], state: 'correct' };
                targetArray[i] = '#'; // Marcar como usada para no contarla dos veces en amarillos
                // newKeyStates[guessArray[i]] = 'correct';
            }
        }

        // Luego, marcar las presentes (amarillas) y ausentes (grises)
        for (let i = 0; i < targetWord.length; i++) {
            if (!result[i]) { // Si no fue marcada como correcta
                if (targetArray.includes(guessArray[i])) {
                    result[i] = { char: guessArray[i], state: 'present' };
                    targetArray[targetArray.indexOf(guessArray[i])] = '#'; // Marcar como usada
                    //   if (newKeyStates[guessArray[i]] !== 'correct') {
                    //      newKeyStates[guessArray[i]] = 'present';
                    //   }
                } else {
                    result[i] = { char: guessArray[i], state: 'absent' };
                    //   if (!newKeyStates[guessArray[i]]) {
                    //     newKeyStates[guessArray[i]] = 'absent';
                    //   }
                }
            }
        }
        // setKeyStates(newKeyStates);
        return result;
    };

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (isGameOver) return;

        const { key } = event;

        if (key === 'Enter') {
            if (currentGuess.length === targetWord.length) {
                const evaluation = evaluateGuess(currentGuess);
                const newGuesses = [...guesses, { letters: evaluation }];
                setGuesses(newGuesses);
                setAttempt(prev => prev + 1);

                if (currentGuess === targetWord) {
                    setIsGameOver(true);
                    setMessage(`¡Felicidades! Adivinaste: ${targetWord}`);
                } else if (newGuesses.length >= MAX_ATTEMPTS) {
                    setIsGameOver(true);
                    setMessage(`Fin del juego. La palabra era: ${targetWord}`);
                }
                setCurrentGuess("");
            } else {
                // Palabra incompleta, hacer vibrar la fila
                setMessage(`La palabra debe tener ${targetWord.length} letras.`);
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 500);
            }
        } else if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
            setMessage("");
        } else if (currentGuess.length < targetWord.length && /^[a-zA-Z]$/.test(key)) {
            // Permitir solo letras. Para ñ o acentos se necesita más lógica o normalización
            setCurrentGuess(prev => prev + key.toUpperCase());
            setMessage("");
        }
    }, [currentGuess, targetWord, guesses, isGameOver, evaluateGuess]); // Agregado evaluateGuess

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    if (!targetWord || targetWord === "ERROR") {
        return (
            <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-250px)] text-center">
                <p className="text-xl text-danger mb-4">{message || "Cargando juego de palabras..."}</p>
                {targetWord === "ERROR" && (
                    <button
                        onClick={initializeGame}
                        className="mt-4 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors"
                    >
                        Reintentar Cargar Juego
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-4 pt-6">
            <h2 className="text-3xl font-bold text-primary mb-6">Adivina el Jugador</h2>

            <div className="grid gap-1.5 mb-6">
                {guesses.map((guess, i) => (
                    <WordRow key={i} guess={guess.letters} wordLength={targetWord.length} />
                ))}
                {attempt < MAX_ATTEMPTS && !isGameOver && (
                    <WordRow currentGuess={currentGuess} wordLength={targetWord.length} isShaking={isShaking} />
                )}
                {/* Rellenar filas vacías */}
                {Array.from({ length: Math.max(0, MAX_ATTEMPTS - guesses.length - (isGameOver ? 0 : 1)) }).map((_, i) => (
                    <WordRow key={`empty-${i}`} wordLength={targetWord.length} />
                ))}
            </div>

            {message && (
                <p className={`text-lg mb-4 font-semibold ${(message.includes("Felicidades") ? "text-green-600" : (message.includes("Fin del juego") ? "text-danger" : "text-gray-700"))
                    }`}>
                    {message}
                </p>
            )}

            {isGameOver && (
                <button
                    onClick={initializeGame}
                    className="mt-4 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors text-lg"
                >
                    Jugar de Nuevo
                </button>
            )}
            {/* <Keyboard onKeyPress={handleVirtualKeyPress} keyStates={keyStates} /> */}
        </div>
    );
};

export default WordleGame;