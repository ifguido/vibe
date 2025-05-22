import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import MatchCard from '../MatchCard'; // Asegúrate que la ruta sea correcta
import { initialMatchesData } from '../../data/matchesData';
import { type Match, type StoredPredictions } from '../../types';
import { groupStageTeams } from '../../data/teamsData';

const LOCAL_STORAGE_KEY_PRODE = 'prodeMundial2026PredictionsViteTS_ImprovedUI_V2'; // Key actualizada si hay cambios estructurales

interface GroupedMatches {
    [groupName: string]: Match[];
}

interface ProdeViewProps {
    topOffsetForSubSticky: number; // Offset desde la parte superior de la ventana hasta donde comienza esta vista
}

const ProdeView: React.FC<ProdeViewProps> = ({ topOffsetForSubSticky }) => {
    const [matches, setMatches] = useState<Match[]>(() => {
        const storedPredictionsJSON = localStorage.getItem(LOCAL_STORAGE_KEY_PRODE);
        const storedPredictions: StoredPredictions = storedPredictionsJSON ? JSON.parse(storedPredictionsJSON) : {};

        return initialMatchesData.map(matchBase => ({
            ...matchBase,
            scoreA: storedPredictions[matchBase.id]?.scoreA !== undefined ? storedPredictions[matchBase.id].scoreA : null,
            scoreB: storedPredictions[matchBase.id]?.scoreB !== undefined ? storedPredictions[matchBase.id].scoreB : null,
        }));
    });

    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const groupNames = useMemo(() => groupStageTeams.map(g => g.name), []);

    // Referencia al contenedor de la barra de stats y navegación de grupos para medir su altura
    const prodeSubNavRef = useRef<HTMLDivElement>(null);
    const [prodeSubNavHeight, setProdeSubNavHeight] = useState(0);

    useEffect(() => {
        if (groupNames.length > 0 && selectedGroup === null) {
            setSelectedGroup(groupNames[0]); // Selecciona el primer grupo por defecto
        }
    }, [groupNames, selectedGroup]);

    useEffect(() => {
        // Medir la altura de la sub-navegación del prode
        if (prodeSubNavRef.current) {
            setProdeSubNavHeight(prodeSubNavRef.current.offsetHeight);
        }
    }, [prodeSubNavRef, selectedGroup]); // Re-medir si cambia el grupo (por si el contenido de la nav cambia su altura)

    useEffect(() => {
        const predictionsToStore: StoredPredictions = matches.reduce((acc, match) => {
            if (match.scoreA !== null || match.scoreB !== null) {
                acc[match.id] = { scoreA: match.scoreA, scoreB: match.scoreB };
            }
            return acc;
        }, {} as StoredPredictions);

        if (Object.keys(predictionsToStore).length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY_PRODE, JSON.stringify(predictionsToStore));
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY_PRODE);
        }
    }, [matches]);

    const handleScoreChange = useCallback((matchId: number, scoreA: number | null, scoreB: number | null) => {
        setMatches(prevMatches =>
            prevMatches.map(match =>
                match.id === matchId ? { ...match, scoreA, scoreB } : match
            )
        );
    }, []);

    const handleResetPredictions = () => {
        if (window.confirm("¿Estás seguro de que quieres borrar TODAS tus predicciones del PRODE? Esta acción no se puede deshacer.")) {
            setMatches(prevMatches =>
                prevMatches.map(match => ({ ...match, scoreA: null, scoreB: null }))
            );
        }
    };

    const countCompletedPredictions = () => {
        return matches.filter(match => match.scoreA !== null && match.scoreB !== null).length;
    };

    const groupedMatchesByName = useMemo((): GroupedMatches => {
        return matches.reduce((acc, match) => {
            const groupNameKey = match.group;
            if (!acc[groupNameKey]) {
                acc[groupNameKey] = [];
            }
            acc[groupNameKey].push(match);
            acc[groupNameKey].sort((a, b) => { // Ordenar partidos dentro de cada grupo
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateA.getTime() - dateB.getTime();
            });
            return acc;
        }, {} as GroupedMatches);
    }, [matches]);

    const matchesToDisplay = useMemo(() => {
        if (selectedGroup && groupedMatchesByName[selectedGroup]) {
            return groupedMatchesByName[selectedGroup];
        }
        return []; // Si no hay grupo seleccionado o no se encuentra
    }, [selectedGroup, groupedMatchesByName]);

    // Calculamos el offset para los títulos de grupo cuando se muestra "Todos los Grupos"
    const topForGroupTitleSticky = topOffsetForSubSticky + prodeSubNavHeight;

    return (
        <>
            {/* Barra de Estadísticas y Navegación de Grupos del Prode */}
            <div
                ref={prodeSubNavRef}
                className="sticky z-30 bg-background/80 backdrop-blur-md shadow-sm"
                style={{ top: `${topOffsetForSubSticky}px` }} // Se posiciona debajo de la barra de pestañas principal
            >
                {/* Contenedor para centrar y dar padding */}
                <div className="container mx-auto px-2 sm:px-4">
                    {/* Barra de Estadísticas */}
                    <div className="py-3 border-b border-gray-200">
                        <div className="p-3 bg-surface rounded-lg shadow-md-elevation flex flex-col sm:flex-row justify-between items-center gap-3">
                            <p className="text-sm sm:text-base text-gray-700 text-center sm:text-left">
                                Prode Lleno: <span className="font-bold text-primary">{countCompletedPredictions()}</span> de <span className="font-bold">{matches.length}</span>
                            </p>
                            <button
                                onClick={handleResetPredictions}
                                className="bg-danger hover:bg-dangerHover text-white font-semibold py-2 px-3 rounded-lg shadow-sm transition-colors duration-150 ease-in-out text-xs sm:text-sm"
                            >
                                Borrar Prode
                            </button>
                        </div>
                    </div>

                    {/* Navegación de Grupos del Prode */}
                    {groupNames.length > 0 && (
                        <div className="py-3 border-b border-gray-200">
                            <nav className="flex flex-wrap justify-center gap-1 sm:gap-2">
                                <button
                                    onClick={() => setSelectedGroup(null)} // 'null' para "Todos los Grupos"
                                    className={`px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-150 ease-in-out
                      ${selectedGroup === null ?
                                            'bg-secondary text-black shadow-md scale-105' :
                                            'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                                >
                                    Todos los Grupos
                                </button>
                                {groupNames.map(groupName => (
                                    <button
                                        key={groupName}
                                        onClick={() => setSelectedGroup(groupName)}
                                        className={`px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-150 ease-in-out
                        ${selectedGroup === groupName ?
                                                'bg-primary text-white shadow-md scale-105' :
                                                'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                                    >
                                        {groupName}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenido Principal del Prode (Lista de Partidos) */}
            <main className="container mx-auto px-2 sm:px-4 pb-12 flex-grow pt-4"> {/* pt-4 para dar espacio después del sticky */}
                {selectedGroup !== null ? ( // Vista de un solo grupo seleccionado
                    matchesToDisplay.length > 0 ? (
                        <section>
                            {/* Podrías añadir un H2 aquí si quieres, aunque el botón activo ya indica el grupo */}
                            {/* <h2 className="text-2xl font-bold text-primary my-4">{selectedGroup}</h2> */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {matchesToDisplay.map(match => (
                                    <MatchCard
                                        key={match.id}
                                        match={match}
                                        onScoreChange={handleScoreChange}
                                    />
                                ))}
                            </div>
                        </section>
                    ) : (
                        <p className="text-center text-gray-500 text-xl mt-10">
                            No hay partidos para {selectedGroup} o el grupo está vacío.
                        </p>
                    )
                ) : ( // Vista de "Todos los Grupos"
                    Object.keys(groupedMatchesByName).length > 0 ? (
                        Object.entries(groupedMatchesByName).map(([groupName, groupMatchesList]) => (
                            <section key={groupName} className="mb-10">
                                <h2
                                    className="text-2xl font-bold text-primary mb-3 p-3 bg-primary/10 rounded-t-lg border-b-2 border-primary sticky z-10"
                                    style={{ top: `${topForGroupTitleSticky}px` }} // Se posiciona debajo de la barra de stats/nav del prode
                                >
                                    {groupName}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 p-1">
                                    {groupMatchesList.map(match => (
                                        <MatchCard
                                            key={match.id}
                                            match={match}
                                            onScoreChange={handleScoreChange}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-xl mt-10">No hay partidos cargados todavía.</p>
                    )
                )}
            </main>
        </>
    );
};

export default ProdeView;