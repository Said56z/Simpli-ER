import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  // Clases dinámicas dependiendo de si el usuario ha bajado (scroll)
  const headerHeight = isScrolled ? 'h-16' : 'h-32'; // h-16 es pequeña, h-32 es grande
  const headerBg = isScrolled ? 'bg-header-scrolled shadow-lg' : 'bg-header-initial';
  const titleSize = isScrolled ? 'text-4xl' : 'text-7xl';
  const logoText = isScrolled ? 'text-white' : 'text-text-primary';
  const showLogos = isScrolled ? 'opacity-0 hidden' : 'opacity-100 flex';

  return (
    <header className={`fixed top-0 left-0 right-0 ${headerHeight} ${headerBg} flex flex-col justify-center px-10 z-50 transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between w-full">
        
        {/* Títulos */}
        <div className="flex flex-col">
          <h1 className={`font-logo ${titleSize} ${logoText} transition-all duration-300 ease-in-out`}>
            Simplif-ER
          </h1>
          {!isScrolled && (
            <p className="text-2xl text-text-primary transition-all duration-300 mt-1">
              Simplifica con pasos tus expresiones regulares
            </p>
          )}
        </div>

        {/* Logos Institucionales (Desaparecen al hacer scroll) */}
        <div className={`items-center space-x-6 ${showLogos} transition-opacity duration-300`}>
          {/* Logo de ISC. Cámbialo por tu imagen si la tienes usando la etiqueta <img /> comentada abajo */}
          <div className="flex items-center font-mono text-4xl text-[#7FFF00] font-bold">
             <img src="/ISC-logo.png" alt="Logo ISC" className="h-24 object-contain" />
          </div>
          
          {/* Logo del TEC (Asegúrate de tener tec-logo.png en la carpeta public) */}
          <img src="/tec-logo.png" alt="Logo ITM" className="h-20 w-20 object-contain" />
        </div>
        
      </div>
    </header>
  );
};

export default Header;