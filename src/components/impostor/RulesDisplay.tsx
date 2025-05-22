// src/components/impostor/RulesDisplay.tsx
import React from 'react';

interface RulesDisplayProps {
    rules: string[];
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ rules }) => {
    return (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Pistas Clave:</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
                {rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                ))}
            </ul>
        </div>
    );
};

export default RulesDisplay;