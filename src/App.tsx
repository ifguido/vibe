// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import ProdeView from './components/prode/ProdeView';
import WordleGame from './components/palabras/WordleGame';
import ImpostorGame from './components/impostor/ImpostorGame'; // <-- NUEVO

type ActiveView = 'prode' | 'palabras' | 'impostor'; // <-- NUEVO

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('prode');

  // Calcula o define estas alturas. Es mejor si son dinámicas o constantes bien definidas.
  const HEADER_MAIN_HEIGHT = 92; // px, ejemplo para sm, podría ser 80px para pantallas más pequeñas
  const TABS_NAV_HEIGHT = 52; // px, altura aproximada de la barra de pestañas de juegos (Prode | Palabras | Impostor)
  const TOTAL_STICKY_OFFSET_FOR_SUBVIEWS = HEADER_MAIN_HEIGHT + TABS_NAV_HEIGHT;


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <nav
        className="bg-surface border-b border-gray-300 sticky z-40"
        style={{ top: `${HEADER_MAIN_HEIGHT}px` }} // Pestañas debajo del Header principal
      >
        <div className="container mx-auto flex">
          <button
            onClick={() => setActiveView('prode')}
            className={`flex-1 py-3 px-2 sm:px-4 text-center font-semibold transition-colors duration-150 text-sm sm:text-base
                        ${activeView === 'prode' ? 'border-b-4 border-primary text-primary' : 'text-gray-600 hover:bg-primary/5'}`}
          >
            🏆 Prode
          </button>
          <button
            onClick={() => setActiveView('palabras')}
            className={`flex-1 py-3 px-2 sm:px-4 text-center font-semibold transition-colors duration-150 text-sm sm:text-base
                        ${activeView === 'palabras' ? 'border-b-4 border-primary text-primary' : 'text-gray-600 hover:bg-primary/5'}`}
          >
            📝 Palabras
          </button>
          <button
            onClick={() => setActiveView('impostor')} // <-- NUEVO
            className={`flex-1 py-3 px-2 sm:px-4 text-center font-semibold transition-colors duration-150 text-sm sm:text-base
                        ${activeView === 'impostor' ? 'border-b-4 border-primary text-primary' : 'text-gray-600 hover:bg-primary/5'}`}
          >
            🕵️ Impostor
          </button>
        </div>
      </nav>

      <div className="flex-grow">
        {activeView === 'prode' && <ProdeView topOffsetForSubSticky={TOTAL_STICKY_OFFSET_FOR_SUBVIEWS} />}
        {activeView === 'palabras' && <WordleGame />}
        {activeView === 'impostor' && <ImpostorGame />}
      </div>

      <footer className="text-center p-6 text-gray-600 border-t border-gray-300 bg-surface mt-auto">
        <p>© {new Date().getFullYear()} Tu App de Mundial. Hecho con ⚡ Vite, React & TypeScript.</p>
      </footer>
    </div>
  );
}

export default App;