// src/data/playersData.ts

// Lista de apellidos de futbolistas. Deben ser de longitudes variadas para más diversión,
// pero para empezar podríamos centrarnos en una longitud específica o filtrar luego.
// ¡Asegúrate de que sean solo letras, sin espacios ni caracteres especiales, y en mayúsculas!
export const playerLastNames: string[] = [
    "MESSI",
    "MBAPPE",
    "HAALAND",
    "NEYMAR",
    "MODRIC",
    "KANTE",
    "SALAH",
    "LEWAN", // Lewandowski es muy largo, usamos una versión corta o elegimos otros
    "BENZEMA",
    "KEANE",
    "VIEIRA",
    "HENRY",
    "ZIDANE",
    "PELE",
    "MARADONA",
    "RONALDO",
    "POGBA",
    "GREALISH",
    "FODEN",
    "SAKA",
    "KAKA",
    "PIRLO",
    "XAVI",
    "INIESTA",
    "RAMOS",
    "PUYOL",
    "SILVA",
    "ALVES",
    // Agrega muchos más para variedad
    // Considera usar solo apellidos de 5 letras para una experiencia Wordle clásica inicialmente
];

export const getRandomPlayerName = (length?: number): string => {
    let listToUse = playerLastNames;
    if (length) {
        listToUse = playerLastNames.filter(name => name.length === length);
    }
    if (listToUse.length === 0) {
        // Fallback si no hay nombres de la longitud deseada
        console.warn(`No player names found with length ${length}. Using a random name.`);
        return playerLastNames[Math.floor(Math.random() * playerLastNames.length)].toUpperCase();
    }
    const randomIndex = Math.floor(Math.random() * listToUse.length);
    return listToUse[randomIndex].toUpperCase();
};