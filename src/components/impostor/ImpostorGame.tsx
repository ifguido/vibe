// src/components/impostor/ImpostorGame.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { generateImpostorGame } from '../../data/impostorData';
import { type PlayerProfile, type ImpostorGameData } from '../../types';
import ProfileCard from './ProfileCard';
import RulesDisplay from './RulesDisplay';

const ImpostorGame: React.FC = () => {
    const [gameData, setGameData] = useState<ImpostorGameData | null>(null);
    const [selectedProfiles, setSelectedProfiles] = useState<Set<string>>(new Set());
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [revealedProfiles, setRevealedProfiles] = useState<PlayerProfile[]>([]);

    const initializeGame = useCallback(() => {
        const newGame = generateImpostorGame();
        setGameData(newGame);
        setSelectedProfiles(new Set());
        setIsGameOver(false);
        setMessage("");
        setRevealedProfiles([]);
    }, []);

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);

    const handleProfileSelect = (profileId: string) => {
        if (isGameOver) return;

        setSelectedProfiles(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(profileId)) {
                newSelected.delete(profileId);
            } else {
                if (newSelected.size < (gameData?.impostorCount || 0)) {
                    newSelected.add(profileId);
                } else {
                    setMessage(`Ya has seleccionado ${gameData?.impostorCount || 0} perfiles.`)
                    setTimeout(() => setMessage(""), 2000);
                }
            }
            return newSelected;
        });
    };

    const handleSubmitSelection = () => {
        if (!gameData) return;
        if (selectedProfiles.size !== gameData.impostorCount) {
            setMessage(`Debes seleccionar exactamente ${gameData.impostorCount} perfiles.`);
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        setIsGameOver(true);
        let correctImpostorsFound = 0;

        const finalProfiles = gameData.profiles.map(p => {
            const isSelected = selectedProfiles.has(p.id);
            const isActuallyImpostor = !!p.isImpostor;
            let correctlyIdentified = false;

            if (isSelected && isActuallyImpostor) {
                correctImpostorsFound++;
                correctlyIdentified = true;
            } else if (!isSelected && !isActuallyImpostor) {
                correctlyIdentified = true; // Correctamente identificado como inocente (al no seleccionarlo)
            }

            return { ...p, isSelected, isRevealedImpostor: isActuallyImpostor, isCorrectlyIdentified: correctlyIdentified };
        });

        setRevealedProfiles(finalProfiles);

        if (correctImpostorsFound === gameData.impostorCount) {
            setMessage(`¡Felicidades! Encontraste a los ${correctImpostorsFound} impostores de ${gameData.impostorCount}.`);
        } else {
            setMessage(`Encontraste ${correctImpostorsFound} de ${gameData.impostorCount} impostores. ¡Sigue intentando!`);
        }
    };

    if (!gameData) {
        return <div className="p-4 text-center text-xl">Cargando Caza de Impostores...</div>;
    }

    const profilesToDisplay = isGameOver ? revealedProfiles : gameData.profiles.map(p => ({
        ...p,
        isSelected: selectedProfiles.has(p.id)
    }));


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">🕵️ Caza de Impostores</h2>

            <RulesDisplay rules={gameData.rules} />

            <p className="text-center mb-4 text-lg font-medium">
                Selecciona los <span className="font-bold text-primary">{gameData.impostorCount}</span> perfiles que crees que son impostores:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
                {profilesToDisplay.map(profile => (
                    <ProfileCard
                        key={profile.id}
                        profile={profile}
                        onSelect={handleProfileSelect}
                        isSelectable={!isGameOver}
                        showResults={isGameOver}
                    />
                ))}
            </div>

            {message && (
                <p className={`text-center text-xl mb-4 font-semibold ${message.includes("Felicidades") ? "text-green-600" : (message.includes("Debes seleccionar") ? "text-yellow-600" : "text-gray-700")
                    }`}>
                    {message}
                </p>
            )}

            <div className="text-center">
                {!isGameOver ? (
                    <button
                        onClick={handleSubmitSelection}
                        disabled={selectedProfiles.size !== gameData.impostorCount}
                        className="px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirmar Selección ({selectedProfiles.size}/{gameData.impostorCount})
                    </button>
                ) : (
                    <button
                        onClick={initializeGame}
                        className="px-8 py-3 bg-secondary text-black rounded-lg shadow-md hover:bg-yellow-500 transition-colors text-lg"
                    >
                        Jugar de Nuevo
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImpostorGame;