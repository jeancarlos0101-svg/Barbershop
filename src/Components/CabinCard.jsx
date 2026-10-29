import React from 'react';

export const CabinCard = ({ cabin, onSelect }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#0D1B1E]/5 hover:shadow-2xl transition-all duration-500 flex flex-col">
      {/* Visual Container */}
      <div className="relative h-80 overflow-hidden bg-slate-900">
        <img 
          src={cabin.images[0]} 
          alt={cabin.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 bg-[#0D1B1E]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium">
          {cabin.type}
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-[#0D1B1E]">
          ${cabin.priceNight} <span className="text-[10px] text-gray-500 font-normal">/ noche</span>
        </div>
      </div>

      {/* Detail Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-xl font-serif-custom font-semibold text-[#0D1B1E]">
              {cabin.name}
            </h3>
            <span className="text-xs font-semibold text-[#C88A58]">★ {cabin.rating}</span>
          </div>

          <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {cabin.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {cabin.features.map((feat, idx) => (
              <span key={idx} className="text-[10px] bg-[#F7F5F0] text-gray-600 px-2.5 py-1 rounded-md">
                {feat}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => onSelect(cabin)}
          className="w-full py-3 bg-[#0D1B1E] text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-[#C88A58] transition-colors duration-300"
        >
          Consultar Disponibilidad
        </button>
      </div>
    </div>
  );
};