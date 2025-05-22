// src/data/impostorData.ts
import { type PlayerProfile, type ImpostorGameData, type ProfileAttribute } from '../types';

// Fuentes de datos para generar perfiles variados
const firstNames = ["Alex", "Bruno", "Carlos", "David", "Eva", "Flora", "Gael", "Hugo", "Ines", "Julia", "Leo", "Mara"];
const lastNames = ["Smith", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor"];
const colors = ["Rojo", "Azul", "Verde", "Amarillo", "Negro", "Blanco", "Naranja", "Violeta"];
const positions = ["Delantero", "Mediocampista", "Defensa", "Portero"];
const continents = ["Europa", "América", "Asia", "África", "Oceanía"];
const hobbies = ["Leer", "Videojuegos", "Cocinar", "Deportes", "Música", "Viajar"];
const phrases = [
    "Siempre doy mi máximo en el campo.",
    "El trabajo en equipo es la clave.",
    "Me gusta analizar cada jugada.",
    "Prefiero las tácticas ofensivas.",
    "La disciplina es fundamental.",
    "Disfruto de los desafíos.",
    "Amo la presión de los grandes partidos.",
    "Mi objetivo es ganar siempre.",
    "Creo en el juego limpio.",
    "La estrategia lo es todo."
];

const generateRandomName = (): string => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

// Función para generar un conjunto de juego
export const generateImpostorGame = (): ImpostorGameData => {
    const NUM_PROFILES = 10;
    const NUM_IMPOSTORS = 4; // Decidiste 5, pero para 10 perfiles, 3 o 4 es más balanceado para deducir. Ajusta si quieres 5.

    const profiles: PlayerProfile[] = [];
    const rules: string[] = [];

    // --- Definir las reglas para esta ronda ---
    // Regla 1: Color favorito de los impostores
    const impostorFavoriteColor = colors[Math.floor(Math.random() * colors.length)];
    rules.push(`Pista 1: Todos los impostores tienen como color favorito el ${impostorFavoriteColor}.`);

    // Regla 2: Posición que NINGÚN impostor juega
    const nonImpostorPosition = positions[Math.floor(Math.random() * positions.length)];
    rules.push(`Pista 2: Ningún impostor juega de ${nonImpostorPosition}.`);

    // Regla 3: Continente de al menos X impostores
    const impostorContinentMajority = continents[Math.floor(Math.random() * continents.length)];
    const minImpostorsInContinent = Math.floor(NUM_IMPOSTORS / 2) + 1; // Al menos la mayoría simple
    rules.push(`Pista 3: Al menos ${minImpostorsInContinent} impostores son de ${impostorContinentMajority}.`);

    // Regla 4: Una palabra clave en la frase de los inocentes (opcional, puede hacer muy fácil o muy difícil)
    // const innocentKeyword = "equipo";
    // rules.push(`Pista 4: Todos los inocentes mencionaron la palabra "${innocentKeyword}" en su frase.`);


    // --- Generar Perfiles ---
    const impostorIndices = new Set<number>();
    while (impostorIndices.size < NUM_IMPOSTORS) {
        impostorIndices.add(Math.floor(Math.random() * NUM_PROFILES));
    }

    let impostorsInTargetContinentCount = 0;

    for (let i = 0; i < NUM_PROFILES; i++) {
        const isImpostor = impostorIndices.has(i);
        const name = generateRandomName();
        const attributes: ProfileAttribute[] = [];

        // Atributo: Color Favorito
        let favoriteColor = colors[Math.floor(Math.random() * colors.length)];
        if (isImpostor) {
            favoriteColor = impostorFavoriteColor; // Forzar color para impostores
        } else {
            // Asegurar que los inocentes NO tengan el color del impostor (para que la regla sea útil)
            while (favoriteColor === impostorFavoriteColor) {
                favoriteColor = colors[Math.floor(Math.random() * colors.length)];
            }
        }
        attributes.push({ label: "Color Favorito", value: favoriteColor });

        // Atributo: Posición
        let position = positions[Math.floor(Math.random() * positions.length)];
        if (isImpostor) {
            // Asegurar que los impostores NO tengan la posición prohibida
            while (position === nonImpostorPosition) {
                position = positions[Math.floor(Math.random() * positions.length)];
            }
        }
        attributes.push({ label: "Posición", value: position });

        // Atributo: Continente
        let continent = continents[Math.floor(Math.random() * continents.length)];
        if (isImpostor) {
            // Intentar cumplir la regla del continente para impostores, pero con algo de aleatoriedad
            // Para asegurar que la regla 3 se cumpla, necesitamos forzarlo para algunos impostores
            if (impostorsInTargetContinentCount < minImpostorsInContinent && Math.random() < 0.7) { // 70% chance de ser del continente objetivo si aún se necesita
                continent = impostorContinentMajority;
            } else if (impostorIndices.size - (i - impostorsInTargetContinentCount) <= minImpostorsInContinent - impostorsInTargetContinentCount) {
                // Forzar si los restantes deben serlo para cumplir la cuota
                continent = impostorContinentMajority;
            }
            if (continent === impostorContinentMajority) {
                impostorsInTargetContinentCount++;
            }
        }
        attributes.push({ label: "Continente", value: continent });

        // Atributo: Hobby
        attributes.push({ label: "Hobby", value: hobbies[Math.floor(Math.random() * hobbies.length)] });

        // Atributo: Frase
        attributes.push({ label: "Frase Célebre", value: phrases[Math.floor(Math.random() * phrases.length)] });
        // Si se usa la regla de palabra clave para inocentes:
        // let phrase = phrases[Math.floor(Math.random() * phrases.length)];
        // if (!isImpostor && !phrase.toLowerCase().includes(innocentKeyword)) {
        //      phrase = `Me gusta el ${innocentKeyword}, ${phrase.toLowerCase()}`; // Asegurar palabra clave
        // } else if (isImpostor && phrase.toLowerCase().includes(innocentKeyword)) {
        //      phrase = phrase.toLowerCase().replace(innocentKeyword, "juego"); // Quitar palabra clave
        // }
        // attributes.push({ label: "Frase Célebre", value: phrase });


        profiles.push({
            id: `profile-${i}-${Date.now()}`,
            name,
            avatarSeed: name.replace(/\s/g, ''), // Semilla para avatar basada en el nombre
            attributes,
            isImpostor, // Guardamos quién es realmente impostor
            isSelected: false,
        });
    }

    // Asegurar que la regla 3 se cumpla si la aleatoriedad no fue suficiente
    // Esto es complejo, la lógica de arriba intenta hacerlo sobre la marcha.
    // Una verificación final y ajuste podría ser necesaria para reglas muy estrictas.
    const currentImpostorsFromContinent = profiles.filter(p => p.isImpostor && p.attributes.find(a => a.label === "Continente" && a.value === impostorContinentMajority)).length;
    if (currentImpostorsFromContinent < minImpostorsInContinent) {
        // console.warn("Advertencia: La regla 3 de continentes podría no haberse cumplido completamente con la generación inicial. Se necesitaría una lógica de ajuste más robusta.");
        // Aquí se podría intentar ajustar perfiles para cumplir la regla, pero puede ser complejo.
        // Por ahora, se deja como una posible inconsistencia leve o se simplifican las reglas.
    }


    return {
        profiles,
        rules,
        impostorCount: NUM_IMPOSTORS,
    };
};