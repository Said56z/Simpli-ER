import { useState } from 'react';

const RightSidebar = ({ setRegex }) => {
  const tabs = ['Info', 'Ejemplos'];
  const [activeTab, setActiveTab] = useState('Info');

  const ejemplosData = [
    '(auε)+',
    '((a*)*uεubub)*',
    '(aub)*a(aub)*u(aub)*',
    'auaua*',
    '(aub)*uaubuεu(a*ub*)*',
    '(auε)u(εub)u(εεε)',
    '((((a))u(((ε)))))*ua*',
    '(aub)cu(aub)d',
  ];

  return (
    <aside className="w-full lg:w-80 bg-accent-red rounded-xl shadow-lg flex flex-col overflow-hidden h-fit mt-4 lg:mt-8">
      
      {/* Contenedor de pestañas */}
      <div className="flex bg-accent-red-dark">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 font-principal text-xl transition-all duration-200 ${
              activeTab === tab 
                ? 'bg-accent-red text-white border-b-4 border-white' 
                : 'text-white/60 hover:bg-red-900/40 hover:text-white border-b-4 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Contenido de las pestañas */}
      <div className="p-6 text-white font-principal text-lg space-y-4">
        {activeTab === 'Ejemplos' && (
          <div className="space-y-3">
            <p className="text-sm opacity-70 italic text-center">Haz clic para ingresar la expresión a simplificar:</p>
            
            {/* En escritorio (lg) los botones siguen manteniéndose uno abajo del otro en 1 sola columna */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {ejemplosData.map((ex, i) => (
                <button 
                  key={i} 
                  onClick={() => setRegex(ex)}
                  className="w-full bg-accent-red-dark/40 p-2 rounded text-center border border-white/10 hover:bg-white/20 transition-all active:scale-95 cursor-pointer block text-sm md:text-base overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'Info' && (
          <p className="text-center lg:text-left">
            Selecciona las reglas de equivalencia para transformar tus expresiones regulares a su forma mínima.
          </p>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;