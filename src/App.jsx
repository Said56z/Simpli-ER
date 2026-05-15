import { useState } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';

function App() {
  const [regex, setRegex] = useState('');

  return (
    <div className="min-h-screen font-principal bg-page-bg text-text-primary selection:bg-accent-red selection:text-white">
      <Header />
      {/* 
        Mantenemos el flex original para PC, pero añadimos flex-col en móvil 
        para que los bloques LeftSidebar y el bloque de contenido se apilen.
      */}
      <div className="flex flex-col lg:flex-row pt-10 pb-12 max-w-[1600px] mx-auto px-4 lg:px-0">
        <LeftSidebar />
        
        {/* 
          En escritorio (lg) se comporta exactamente igual: horizontal y sin alterar dimensiones.
          En móvil se invierte de abajo hacia arriba (flex-col-reverse) para que el RightSidebar suba.
        */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-8">
          <MainContent regex={regex} setRegex={setRegex} />
          <RightSidebar setRegex={setRegex} />
        </div>
      </div>
    </div>
  );
}

export default App;