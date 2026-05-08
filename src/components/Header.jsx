import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const headerHeight = isScrolled ? 'h-16' : 'h-24 md:h-32'; 
  const headerBg = isScrolled ? 'bg-header-scrolled shadow-lg' : 'bg-header-initial';
  
  const titleSize = isScrolled 
    ? 'text-2xl md:text-3xl' 
    : 'text-4xl md:text-6xl';
    
  const logoText = isScrolled ? 'text-white' : 'text-text-primary';
  const showLogos = isScrolled ? 'opacity-0 hidden' : 'opacity-100 flex';

  return (
    <header className={`fixed top-0 left-0 right-0 ${headerHeight} ${headerBg} flex items-center z-50 transition-all duration-300 ease-in-out px-4 md:px-12`}>
      <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto">
        
        <div className="flex flex-col justify-center">
          <h1 className={`font-logo ${titleSize} ${logoText} transition-all duration-300 ease-in-out leading-none`}>
            Simplif-ER
          </h1>
          {!isScrolled && (
            <p className="text-sm md:text-xl text-text-primary transition-all duration-300 mt-1 opacity-90">
              Simplifica con pasos tus expresiones regulares
            </p>
          )}
        </div>

        <div className={`items-center space-x-4 md:space-x-8 ${showLogos} transition-opacity duration-300`}>
          <div className="flex items-center">
             <img 
               src="/ISC-logo.png" 
               alt="Logo ISC" 
               className="h-10 w-10 md:h-20 md:w-20 object-contain" 
             />
          </div>
          
          <img 
            src="/tec-logo.png" 
            alt="Logo ITM" 
            className="h-10 w-10 md:h-16 md:w-16 object-contain" 
          />
        </div>
        
      </div>
    </header>
  );
};

export default Header;