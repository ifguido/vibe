// src/data/teamsData.ts
import { type Team } from '../types';

export interface GroupDefinition {
    name: string;
    teams: Team[];
}

// Usaremos emojis como logos por simplicidad
export const groupStageTeams: GroupDefinition[] = [
    {
        name: "Grupo A",
        teams: [
            { name: "Estados Unidos", code: "USA", logo: "🇺🇸" },
            { name: "México", code: "MEX", logo: "🇲🇽" },
            { name: "Canadá", code: "CAN", logo: "🇨🇦" },
            { name: "Panamá", code: "PAN", logo: "🇵🇦" },
        ],
    },
    {
        name: "Grupo B",
        teams: [
            { name: "Argentina", code: "ARG", logo: "🇦🇷" },
            { name: "Brasil", code: "BRA", logo: "🇧🇷" },
            { name: "Uruguay", code: "URU", logo: "🇺🇾" },
            { name: "Chile", code: "CHI", logo: "🇨🇱" },
        ],
    },
    {
        name: "Grupo C",
        teams: [
            { name: "Inglaterra", code: "ENG", logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
            { name: "Francia", code: "FRA", logo: "🇫🇷" },
            { name: "Alemania", code: "GER", logo: "🇩🇪" },
            { name: "España", code: "ESP", logo: "🇪🇸" },
        ],
    },
    {
        name: "Grupo D",
        teams: [
            { name: "Italia", code: "ITA", logo: "🇮🇹" },
            { name: "Países Bajos", code: "NED", logo: "🇳🇱" },
            { name: "Portugal", code: "POR", logo: "🇵🇹" },
            { name: "Bélgica", code: "BEL", logo: "🇧🇪" },
        ],
    },
    {
        name: "Grupo E",
        teams: [
            { name: "Japón", code: "JPN", logo: "🇯🇵" },
            { name: "Corea del Sur", code: "KOR", logo: "🇰🇷" },
            { name: "Australia", code: "AUS", logo: "🇦🇺" },
            { name: "Arabia Saudita", code: "KSA", logo: "🇸🇦" },
        ],
    },
    {
        name: "Grupo F",
        teams: [
            { name: "Nigeria", code: "NGA", logo: "🇳🇬" },
            { name: "Senegal", code: "SEN", logo: "🇸🇳" },
            { name: "Marruecos", code: "MAR", logo: "🇲🇦" },
            { name: "Egipto", code: "EGY", logo: "🇪🇬" },
        ],
    },
    {
        name: "Grupo G",
        teams: [
            { name: "Croacia", code: "CRO", logo: "🇭🇷" },
            { name: "Suiza", code: "SUI", logo: "🇨🇭" },
            { name: "Serbia", code: "SRB", logo: "🇷🇸" },
            { name: "Dinamarca", code: "DEN", logo: "🇩🇰" },
        ],
    },
    {
        name: "Grupo H",
        teams: [
            { name: "Polonia", code: "POL", logo: "🇵🇱" },
            { name: "Suecia", code: "SWE", logo: "🇸🇪" },
            { name: "Noruega", code: "NOR", logo: "🇳🇴" }, // Equipos de ejemplo
            { name: "Escocia", code: "SCO", logo: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
        ],
    },
    {
        name: "Grupo I",
        teams: [
            { name: "Colombia", code: "COL", logo: "🇨🇴" },
            { name: "Ecuador", code: "ECU", logo: "🇪🇨" },
            { name: "Perú", code: "PER", logo: "🇵🇪" },
            { name: "Venezuela", code: "VEN", logo: "🇻🇪" },
        ],
    },
    {
        name: "Grupo J",
        teams: [
            { name: "Ghana", code: "GHA", logo: "🇬🇭" },
            { name: "Costa de Marfil", code: "CIV", logo: "🇨🇮" },
            { name: "Camerún", code: "CMR", logo: "🇨🇲" },
            { name: "Argelia", code: "ALG", logo: "🇩🇿" },
        ],
    },
    {
        name: "Grupo K",
        teams: [
            { name: "Qatar", code: "QAT", logo: "🇶🇦" },
            { name: "Irán", code: "IRN", logo: "🇮🇷" },
            { name: "Emiratos Árabes", code: "UAE", logo: "🇦🇪" },
            { name: "Irak", code: "IRQ", logo: "🇮🇶" },
        ],
    },
    {
        name: "Grupo L",
        teams: [
            { name: "Nueva Zelanda", code: "NZL", logo: "🇳🇿" },
            { name: "Costa Rica", code: "CRC", logo: "🇨🇷" },
            { name: "Gales", code: "WAL", logo: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
            { name: "Austria", code: "AUT", logo: "🇦🇹" },
        ],
    },
];