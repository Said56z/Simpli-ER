import { useState } from 'react';

const RightSidebar = () => {
  const tabs = ['Info', 'Ejemplos', 'Opciones'];
  const [activeTab, setActiveTab] = useState('Ejemplos');

  const ejemplosData = [
    '(a|b)* = a*b*(a|b)*',
    'a(ba)* = (ab)*a',
    'r(u|r*r*) = r*r',
    '(r*)* = r*',
    '(ε|r)* = r*',
    '(r|s)* = (r*s*)* = (r*|s*)*',
  ];

  return (
    <aside className="w-80 bg-accent-red rounded-xl shadow-lg flex flex-col overflow-hidden h-fit mt-8 mr-8">
      {/* Contenedor de pestañas con el nuevo color oscuro */}
      <div className="flex bg-accent-red-dark">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 font-principal text-xl transition-all duration-200 ${
              activeTab === tab 
                ? 'bg-accent-red text-white border-b-4 border-white' // Línea blanca ahora abajo
                : 'text-white/60 hover:bg-red-900/40 hover:text-white border-b-4 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="p-6 text-white font-principal text-lg space-y-4">
        {activeTab === 'Ejemplos' && (
          <div className="space-y-3">
            {ejemplosData.map((ex, i) => (
              <p key={i} className="bg-accent-red-dark/40 p-2 rounded text-center border border-white/10">{ex}</p>
            ))}
          </div>
        )}
        {activeTab === 'Info' && <p>Selecciona las reglas de equivalencia para transformar tus expresiones regulares a su forma mínima.</p>}
        {activeTab === 'Opciones' && <p>Si :D</p>}
      </div>
    </aside>
  );
};

export default RightSidebar;