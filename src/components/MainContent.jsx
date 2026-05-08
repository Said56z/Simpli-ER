import { useState } from 'react';
import { ejecutarSimplificacion } from '../utils/simplificador'; // Asegúrate que el nombre coincida con el export

const MainContent = ({ regex, setRegex }) => {
  const [simplificationResult, setSimplificationResult] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  // CORRECCIÓN: Nombre de la función corregido y conexión con la lógica real
  const handleSimplificar = () => {
    if (!regex) return;

    try {
      const resultado = ejecutarSimplificacion(regex);
      setSimplificationResult(resultado);
      setShowSteps(false);
    } catch (error) {
      console.error("Error al simplificar:", error);
      setSimplificationResult({
        original: regex,
        simplified: "Error en la expresión",
        steps: []
      });
    }
  };

  const handleShowSteps = () => setShowSteps(!showSteps);
  
  // Símbolos del teclado en pantalla
  const symbols = ['⁺', 'ɛ', '*', 'U', '(', ')', '⌫'];

  const handleSymbolClick = (symbol) => {
    if (symbol === '⌫') {
      setRegex((prev) => (prev ? prev.slice(0, -1) : ''));
    } else {
      // Normalizamos la 'U' a 'u' para que el parser la entienda
      const charToAdd = symbol === 'U' ? 'u' : symbol;
      setRegex((prev) => (prev + charToAdd));
    }
  };

  return (
    <main className="flex-1 p-4 md:p-8 space-y-10 selection:bg-accent-red selection:text-white bg-[#F2E1D8] min-h-screen">
      
      {/* Sección de Entrada */}
      <div className="space-y-4">
        <h2 className="font-principal text-3xl md:text-4xl text-text-primary">Simplificar...</h2>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="(a*b)u(b*a)"
            className="flex-1 h-16 px-6 bg-input-bg rounded-xl font-principal text-2xl md:text-3xl text-black placeholder:text-text-primary/40 focus:outline-none focus:ring-2 focus:ring-accent-red transition-all"
          />

          <button
            onClick={handleSimplificar}
            className="h-16 px-10 bg-accent-red rounded-xl font-principal text-2xl text-white hover:bg-accent-red-dark transition-colors shadow-md active:scale-95 w-full md:w-auto"
          >
            Ir
          </button>
        </div>

        {/* Botones de símbolos con Wrap para móvil */}
        <div className="flex flex-wrap gap-2">
          {symbols.map(sym => (
            <button
              key={sym}
              onClick={() => handleSymbolClick(sym)}
              className="w-12 h-12 md:w-10 md:h-10 bg-accent-red text-white rounded-lg font-principal text-lg hover:bg-accent-red-dark transition-all shadow-sm active:scale-95 flex items-center justify-center select-none"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Sección de Resultados */}
      <div className="space-y-6 pt-4">
        <h2 className="font-principal text-3xl md:text-4xl text-text-primary border-b-4 border-accent-red pb-2 inline-block">Resultado:</h2>
        
        {simplificationResult && (
          <div className="bg-[#E5E5E5] rounded-2xl p-4 md:p-8 space-y-10 shadow-inner">
            
            <div className="space-y-3">
              <p className="font-principal text-lg md:text-xl text-text-primary opacity-80">Teorema inicial:</p>
              <p className="font-principal text-2xl md:text-3xl text-black text-center bg-white/40 py-4 rounded-xl shadow-sm break-all">
                {simplificationResult.original}
              </p>
            </div>

            <div className="space-y-3 text-center">
              <p className="font-principal text-lg md:text-xl text-text-primary opacity-80 text-left">Expresión regular simplificada:</p>
              <p className="font-principal text-3xl md:text-4xl text-black bg-white/40 py-6 rounded-xl shadow-sm break-all">
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
              <div className="pt-10 border-t-2 border-accent-red/30 space-y-12 md:space-y-24">
                <p className="font-principal text-xl md:text-2xl text-text-primary font-bold">Desglose de teoremas:</p>
                
                {simplificationResult.steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-full space-y-6">
                      <div className="w-full">
                        <p className="font-principal text-base md:text-lg text-text-primary italic">
                          Se aplica el teorema {step.theorem}:
                        </p>
                      </div>
                      <p className="font-principal text-xl md:text-3xl text-black bg-white/20 px-6 py-3 rounded-xl w-fit shadow-sm mx-auto break-all">
                        {step.expression}
                      </p>
                    </div>
                    {index < simplificationResult.steps.length - 1 && (
                       <div className="border-t-2 border-text-primary/20 w-full mt-12 md:mt-16 mb-[-2rem] md:mb-[-3rem]"></div>
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