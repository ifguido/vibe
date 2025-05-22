// src/components/impostor/ProfileCard.tsx
import React from 'react';
import { type PlayerProfile } from '../../types';

interface ProfileCardProps {
    profile: PlayerProfile;
    onSelect: (profileId: string) => void;
    isSelectable: boolean;
    showResults: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSelect, isSelectable, showResults }) => {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${profile.avatarSeed}&radius=50&backgroundColor=d1d4f9,b6e3f4,ffd5dc,ffdfbf,c0aede`;

    let borderColor = 'border-gray-300 hover:border-primary';
    let bgColor = 'bg-surface';
    let textColor = 'text-gray-700';

    if (profile.isSelected && isSelectable) {
        borderColor = 'border-primary ring-2 ring-primary';
        bgColor = 'bg-primary/10';
    }

    if (showResults) {
        isSelectable = false; // No más selecciones después de revelar
        if (profile.isRevealedImpostor) {
            bgColor = profile.isCorrectlyIdentified ? 'bg-green-100' : 'bg-red-100';
            borderColor = profile.isCorrectlyIdentified ? 'border-green-500' : 'border-red-500';
            textColor = profile.isCorrectlyIdentified ? 'text-green-700' : 'text-red-700';
        } else { // Era inocente
            bgColor = profile.isCorrectlyIdentified ? 'bg-green-100' : 'bg-red-100'; // Verde si NO fue seleccionado, rojo si fue seleccionado incorrectamente
            borderColor = profile.isCorrectlyIdentified ? 'border-green-500' : 'border-red-500';
            textColor = profile.isCorrectlyIdentified ? 'text-green-700' : 'text-red-700';
        }
    }


    return (
        <div
            className={`rounded-lg shadow-lg p-4 border-2 transition-all duration-200 cursor-pointer ${borderColor} ${bgColor} ${textColor} ${isSelectable ? '' : 'cursor-default'}`}
            onClick={() => isSelectable && onSelect(profile.id)}
        >
            <div className="flex items-center mb-3">
                <img src={avatarUrl} alt={profile.name} className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200" />
                <div>
                    <h4 className="text-lg font-bold">{profile.name}</h4>
                    {showResults && (
                        <p className={`text-sm font-semibold ${profile.isRevealedImpostor ? 'text-red-600' : 'text-green-600'}`}>
                            {profile.isRevealedImpostor ? 'IMPOSTOR' : 'INOCENTE'}
                        </p>
                    )}
                </div>
            </div>
            <div className="space-y-1 text-sm">
                {profile.attributes.map(attr => (
                    <div key={attr.label}>
                        <span className="font-semibold">{attr.label}:</span> {attr.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;