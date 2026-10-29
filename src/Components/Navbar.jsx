import React, { useState, useEffect } from 'react';

export const Navbar = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm text-[#0D1B1E]' 
        : 'py-5 bg-white/80 backdrop-blur-sm text-[#0D1B1E] border-b border-[#0D1B1E]/5'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif-custom tracking-wider font-bold text-[#0D1B1E]">
            ALMA<span className="text-[#C88A58]">.</span>
          </span>
        </div>

        {/* Enlaces de Navegación limpios */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wide text-[#0D1B1E]">
          <a href="#experiencia" className="hover:text-[#C88A58] transition-colors">
            {lang === 'es' ? 'Experiencia' : 'Experience'}
          </a>
          <a href="#cabinas" className="hover:text-[#C88A58] transition-colors">
            {lang === 'es' ? 'Espacios' : 'Spaces'}
          </a>
          <a href="#filosofia" className="hover:text-[#C88A58] transition-colors">
            {lang === 'es' ? 'Filosofía' : 'Philosophy'}
          </a>
        </div>

        {/* Selector de Idioma Funcional (Sin Login ni Registro) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D1B1E]/5 hover:bg-[#0D1B1E]/10 rounded-full text-xs font-bold tracking-widest text-[#0D1B1E] transition-all cursor-pointer"
          >
            <span>{lang === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}</span>
            <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
};