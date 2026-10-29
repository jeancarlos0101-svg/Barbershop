import React, { useState } from 'react';

export const BookingModal = ({ cabin, onClose }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  if (!cabin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1B1E]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#0D1B1E] text-xl"
        >
          ✕
        </button>

        <span className="text-[10px] tracking-widest text-[#C88A58] uppercase font-bold">Reserva Directa</span>
        <h2 className="text-2xl font-serif-custom font-bold text-[#0D1B1E] mt-1 mb-6">
          {cabin.name}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Entrada</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full p-3 bg-[#F7F5F0] rounded-xl text-xs border-0 focus:ring-2 focus:ring-[#C88A58] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Salida</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full p-3 bg-[#F7F5F0] rounded-xl text-xs border-0 focus:ring-2 focus:ring-[#C88A58] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Huéspedes</label>
            <select 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)}
              className="w-full p-3 bg-[#F7F5F0] rounded-xl text-xs border-0 focus:ring-2 focus:ring-[#C88A58] outline-none"
            >
              <option value={1}>1 Huésped</option>
              <option value={2}>2 Huéspedes</option>
              <option value={3}>3 Huéspedes</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-semibold">
            <span className="text-gray-600">Tarifa Base</span>
            <span className="text-[#0D1B1E]">${cabin.priceNight} / noche</span>
          </div>

          <button className="w-full py-4 bg-[#C88A58] text-white font-semibold rounded-xl text-xs uppercase tracking-widest shadow-lg hover:bg-[#b07545] transition-colors mt-4">
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
};