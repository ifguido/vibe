
// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-primary text-white p-6 shadow-md-elevation mb-8 sticky top-0 z-50">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-0">🏆 Prode Mundial 2026</h1>
                <p className="text-sm opacity-90">¡Haz tus predicciones!</p>
            </div>
        </header>
    );
}

export default Header;