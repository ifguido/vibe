// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header'; // Asume que Header no cambia mucho
import ProdeView from './components/prode/ProdeView';
import WordleGame from './components/palabras/WordleGame';

type ActiveView = 'prode' | 'palabras';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('prode');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header /> {/* Puedes modificar Header para incluir las pestañas o ponerlas debajo */}

      {/* Navegación de Pestañas - Debajo del Header principal */}
      <nav className="bg-surface border-b border-gray-300 sticky top-[80px] sm:top-[92px] z-40"> {/* Ajusta 'top' según altura del Header */}
        <div className="container mx-auto flex">
          <button
            onClick={() => setActiveView('prode')}
            className={`flex-1 py-3 px-4 text-center font-semibold transition-colors duration-150
                        ${activeView === 'prode' ? 'border-b-4 border-primary text-primary' : 'text-gray-600 hover:bg-primary/10'}`}
          >
            🏆 Prode
          </button>
          <button
            onClick={() => setActiveView('palabras')}
            className={`flex-1 py-3 px-4 text-center font-semibold transition-colors duration-150
                        ${activeView === 'palabras' ? 'border-b-4 border-primary text-primary' : 'text-gray-600 hover:bg-primary/10'}`}
          >
            📝 Palabras
          </button>
        </div>
      </nav>

      {/* El contenido se renderiza aquí y las sub-navegaciones (como la de grupos del prode) irán dentro de sus vistas */}
      <div className="flex-grow"> {/* Este div es importante para que el footer quede abajo */}
        {activeView === 'prode' && <ProdeView />}
        {activeView === 'palabras' && <WordleGame />}
      </div>

      <footer className="text-center p-6 text-gray-600 border-t border-gray-300 bg-surface mt-auto">
        <p>© {new Date().getFullYear()} Tu App de Mundial. Hecho con ⚡ Vite, React & TypeScript.</p>
      </footer>
    </div>
  );
}

export default App;