import React, { useState } from 'react';
import { Navbar } from './Components/Navbar';
import { WhatsAppButton } from './Components/WhatsAppButton';
import { SINGLE_CABIN } from './data/cabinData';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleBooking = (e) => {
    e.preventDefault();
    const bookingMsg = lang === 'es'
      ? `Hola! Quisiera reservar ${SINGLE_CABIN.name} del ${checkIn} al ${checkOut} para ${guests} persona(s).`
      : `Hello! I would like to book ${SINGLE_CABIN.name} from ${checkIn} to ${checkOut} for ${guests} guest(s).`;
      
    const whatsappUrl = `https://wa.me/50688888888?text=${encodeURIComponent(bookingMsg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#0D1B1E] relative">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section id="experiencia" className="relative h-[85vh] flex items-center justify-center px-6 overflow-hidden bg-[#0D1B1E] pt-20">
        <img 
          src={SINGLE_CABIN.images[activeImage]} 
          alt={SINGLE_CABIN.name}
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B1E] via-transparent to-black/30"></div>
        
        <div className="relative z-10 max-w-4xl text-center text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C88A58] mb-4 block font-semibold">
            {t.hero.tagline}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif-custom leading-tight mb-6">
            {SINGLE_CABIN.name}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-light text-gray-200">
            <span>★ {SINGLE_CABIN.rating} ({SINGLE_CABIN.reviewsCount} {t.hero.rating})</span>
            <span>•</span>
            <span className="text-[#C88A58] font-semibold text-lg">${SINGLE_CABIN.priceNight} <span className="text-xs text-gray-300 font-normal">{t.booking.night}</span></span>
          </div>
        </div>
      </section>

      {/* Main Content & Booking Section */}
      <section id="cabinas" className="py-20 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Col: Details & Gallery */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-4">
            <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg">
              <img src={SINGLE_CABIN.images[activeImage]} alt="Cabina Vista" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {SINGLE_CABIN.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`h-28 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === idx ? 'border-[#C88A58] opacity-100 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif-custom font-bold mb-4">{t.details.title}</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
              {t.details.description}
            </p>
          </div>

          <div id="filosofia">
            <h3 className="text-xl font-serif-custom font-bold mb-6">{t.details.amenitiesTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {t.details.features.map((feat, idx) => (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-[#0D1B1E]/5 text-xs font-semibold flex items-center gap-3 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#C88A58]"></span>
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Direct Booking Sticky Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-3xl p-8 shadow-xl border border-[#0D1B1E]/5">
            <div className="flex justify-between items-baseline mb-6 pb-4 border-b border-gray-100">
              <div>
                <span className="text-2xl font-serif-custom font-bold text-[#0D1B1E]">${SINGLE_CABIN.priceNight}</span>
                <span className="text-xs text-gray-500 ml-1">{t.booking.night}</span>
              </div>
              <span className="text-xs font-semibold text-[#C88A58]">★ {SINGLE_CABIN.rating}</span>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">{t.booking.checkIn}</label>
                  <input 
                    type="date" 
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-3 bg-[#F7F5F0] rounded-xl text-xs border-0 focus:ring-2 focus:ring-[#C88A58] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">{t.booking.checkOut}</label>
                  <input 
                    type="date" 
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-3 bg-[#F7F5F0] rounded-xl text-xs border-0 focus:ring-2 focus:ring-[#C88A58] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">{t.booking.guests}</label>
                <select 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full p-3 bg-[#F7F5F0] rounded-xl text-xs border-0 focus:ring-2 focus:ring-[#C88A58] outline-none"
                >
                  <option value={1}>1 {t.booking.guestSingular}</option>
                  <option value={2}>2 {t.booking.guestPlural}</option>
                  <option value={3}>3 {t.booking.guestPlural}</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#C88A58] text-white font-semibold rounded-xl text-xs uppercase tracking-widest shadow-lg hover:bg-[#b07545] transition-colors mt-2 cursor-pointer"
              >
                {t.booking.submitBtn}
              </button>
            </form>

            <p className="text-[11px] text-center text-gray-400 mt-4 leading-relaxed">
              {t.booking.notice}
            </p>
          </div>
        </div>

      </section>

      {/* Botón Flotante de WhatsApp */}
      <WhatsAppButton lang={lang} message={t.whatsapp.message} />
    </div>
  );
}