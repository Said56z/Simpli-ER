import { useState } from 'react';

const MainContent = () => {
  const [regex, setRegex] = useState(''); 
  const [simplificationResult, setSimplificationResult] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  const handleSimplificar = () => {
    const inputRegex = regex || '(a*b)u(b*a)'; 
    
    // Lógica para el ejemplo específico
    if (inputRegex === '(a*b)u(b*a)') {
      setSimplificationResult({
        original: '(a*b)u(b*a)',
        simplified: '(aub)*',
        steps: [
          { theorem: 13, expression: '3u(aub)*bu3u(bua)*a' },
          { theorem: 1, expression: '3u(aub)*bu(aub)*a' },
          { theorem: 8, expression: '3u(aub)*(aub)' },
          { theorem: 15, expression: '3u(aub)+' },
          { theorem: 10, expression: '(aub)*' }
        ]
      });
      setShowSteps(false);
    } else {
      setSimplificationResult({
        original: inputRegex,
        simplified: 'En desarrollo...',
        steps: []
      });
    }
  };

  const handleShowSteps = () => setShowSteps(!showSteps);

  const symbols = ['⌫', '+', 'ɛ', '*', 'U', '(', ')'];

  // NUEVA FUNCIÓN: Maneja los clics en los botones de símbolos
  const handleSymbolClick = (symbol) => {
    if (symbol === '⌫') {
      // Si es el botón de borrar, elimina el último carácter
      setRegex((prev) => prev.slice(0, -1));
    } else {
      // Si es cualquier otro símbolo, lo agrega al final
      setRegex((prev) => prev + symbol);
    }
  };

  return (
    <main className="flex-1 p-8 space-y-10 selection:bg-accent-red selection:text-white">
      
      {/* Sección de Entrada */}
      <div className="space-y-4">
        <h2 className="font-principal text-4xl text-text-primary">Simplificar...</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="(a*b)u(b*a)"
            className="flex-1 h-16 px-6 bg-input-bg rounded-xl font-principal text-3xl text-black placeholder:text-text-primary/40 focus:outline-none focus:ring-2 focus:ring-accent-red transition-all"
          />
          <button
            onClick={handleSimplificar}
            className="h-16 px-10 bg-accent-red rounded-xl font-principal text-2xl text-white hover:bg-accent-red-dark transition-colors shadow-md active:scale-95"
          >
            Ir
          </button>
        </div>
        
        {/* Botones de símbolos con funcionalidad onClick */}
        <div className="flex space-x-2">
          {symbols.map(sym => (
            <button 
              key={sym} 
              onClick={() => handleSymbolClick(sym)}
              className="w-10 h-10 bg-accent-red text-white rounded-lg font-principal text-lg hover:bg-accent-red-dark transition-all shadow-sm active:scale-95 flex items-center justify-center select-none"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Sección de Resultados */}
      <div className="space-y-6 pt-4">
        <h2 className="font-principal text-4xl text-text-primary border-b-4 border-accent-red pb-2 inline-block">Resultado:</h2>
        
        {simplificationResult && (
          <div className="bg-[#E5E5E5] rounded-2xl p-8 space-y-10 shadow-inner">
            
            <div className="space-y-3">
              <p className="font-principal text-xl text-text-primary opacity-80">Teorema inicial:</p>
              <p className="font-principal text-3xl text-black text-center bg-white/40 py-4 rounded-xl shadow-sm">
                {simplificationResult.original}
              </p>
            </div>

            <div className="space-y-3 text-center">
              <p className="font-principal text-xl text-text-primary opacity-80 text-left">Expresión regular simplificada:</p>
              <p className="font-principal text-4xl text-black bg-white/40 py-6 rounded-xl shadow-sm">
                {simplificationResult.simplified}
              </p>
              
              <button
                onClick={handleShowSteps}
                className="mt-6 h-12 px-8 bg-text-primary rounded-lg font-principal text-xl text-white hover:bg-opacity-90 transition-colors shadow-md active:scale-95"
              >
                {showSteps ? 'Ocultar pasos' : 'Mostrar pasos'}
              </button>
            </div>

            {showSteps && simplificationResult.steps.length > 0 && (
              <div className="pt-10 border-t-2 border-accent-red/30 space-y-24">
                <p className="font-principal text-2xl text-text-primary font-bold">Desglose de teoremas:</p>
                {simplificationResult.steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-full space-y-6">
                      <div className="w-full">
                        <p className="font-principal text-lg text-text-primary italic">
                          Se aplica el teorema {step.theorem}:
                        </p>
                      </div>
                      <p className="font-principal text-3xl text-black bg-white/20 px-8 py-3 rounded-xl w-fit shadow-sm mx-auto">
                        {step.expression}
                      </p>
                    </div>
                    {index < simplificationResult.steps.length - 1 && (
                       <div className="border-t-2 border-text-primary/20 w-full mt-16 mb-[-3rem]"></div> 
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;