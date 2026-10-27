import React, { useState } from 'react';
import { SERVICES, BARBERS } from './data/mockData';
import Swal from 'sweetalert2';

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientData, setClientData] = useState({ name: '', phone: '', notes: '' });
  const [confirmedDetails, setConfirmedDetails] = useState(null);

  // Generar lista de los próximos 7 días a partir de hoy
  const getNextDays = () => {
    const days = [];
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const fullDate = `${year}-${month}-${day}`;

      days.push({
        fullDate,
        dayName: daysOfWeek[d.getDay()],
        dayNumber: d.getDate(),
        monthName: months[d.getMonth()],
        dayOfWeekIndex: d.getDay(),
        isSunday: d.getDay() === 0
      });
    }

    return days;
  };

  const nextDaysList = getNextDays();

  // Generar horarios según la fecha seleccionada
  const getAvailableTimeSlots = (dateString) => {
    if (!dateString) return [];
    
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();

    if (dayOfWeek === 0) return []; // Domingo cerrado

    let slots = [];
    let startHour = 9; // 9:00 AM
    let endHour = dayOfWeek === 6 ? 14 : 21; // Sábado hasta las 2:00 PM (14:00), L-V hasta las 9:00 PM (21:00)

    for (let h = startHour; h < endHour; h++) {
      if (h === 12) continue; // Bloquear hora de almuerzo (12:00 PM a 1:00 PM)

      let hourFormatted = h;
      let ampm = 'AM';
      if (h >= 12) {
        ampm = 'PM';
        if (h > 12) hourFormatted = h - 12;
      }

      slots.push(`${hourFormatted < 10 ? '0' + hourFormatted : hourFormatted}:00 ${ampm}`);
    }

    return slots;
  };

  // Descarga de evento .ics para el calendario del teléfono
  const downloadCalendarEvent = () => {
    if (!confirmedDetails) return;

    const { service, barber, date, time, client } = confirmedDetails;
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:Cita Barbería - ${service.name}`,
      `DESCRIPTION:Cita con ${barber.name}. Cliente: ${client.name} (${client.phone})`,
      `DTSTART:${date.replace(/-/g, '')}T100000Z`,
      `DTEND:${date.replace(/-/g, '')}T110000Z`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'cita-barberia.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    const appointmentCode = 'BSG-' + Math.floor(1000 + Math.random() * 9000);
    
    const details = {
      code: appointmentCode,
      service: selectedService,
      barber: selectedBarber,
      date: selectedDate,
      time: selectedTime,
      client: clientData
    };
    
    setConfirmedDetails(details);

    const barberPhone = "50688888888";
    const message = `Hola ${selectedBarber.name}, he reservado una cita:\n\n* Código: ${appointmentCode}\n* Servicio: ${selectedService.name}\n* Fecha: ${selectedDate} a las ${selectedTime}\n* Cliente: ${clientData.name} (${clientData.phone})`;
    const whatsappUrl = `https://wa.me/${barberPhone}?text=${encodeURIComponent(message)}`;

    Swal.fire({
      title: '<span style="color: #d4af37">¡Cita Confirmada!</span>',
      html: `<div style="color: #a0a0a0; text-align: left; padding: 10px;">
        <p>Código de reserva: <b style="color: #ffffff">${appointmentCode}</b></p>
        <p>Servicio: <b style="color: #ffffff">${selectedService.name}</b></p>
        <p>Barbero: <b style="color: #ffffff">${selectedBarber.name}</b></p>
        <p>Fecha y Hora: <b style="color: #ffffff">${selectedDate} a las ${selectedTime}</b></p>
      </div>`,
      icon: 'success',
      background: '#1e1e1e',
      confirmButtonColor: '#d4af37',
      confirmButtonText: '<span style="color: #000; font-weight: bold;">Entendido</span>'
    });

    window.open(whatsappUrl, '_blank');
    setStep(5);
  };

  const availableSlots = getAvailableTimeSlots(selectedDate);

  return (
    <div className="text-white min-vh-100 py-5">
      <div className="container">
        
        {/* Cabecera */}
        <header className="text-center mb-5">
          <h1 className="fw-bold text-warning display-5 tracking-wide">BARBER STUDIO & GROOMING</h1>
          <p className="text-secondary">Selecciona los detalles de tu experiencia</p>
        </header>

        {/* Indicador de Pasos */}
        {step < 5 && (
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between text-center gap-2">
                <div className={`flex-fill p-2 rounded ${step >= 1 ? 'bg-warning text-dark fw-bold' : 'bg-secondary text-white opacity-50'}`}>1. Servicio</div>
                <div className={`flex-fill p-2 rounded ${step >= 2 ? 'bg-warning text-dark fw-bold' : 'bg-secondary text-white opacity-50'}`}>2. Barbero</div>
                <div className={`flex-fill p-2 rounded ${step >= 3 ? 'bg-warning text-dark fw-bold' : 'bg-secondary text-white opacity-50'}`}>3. Fecha y Hora</div>
                <div className={`flex-fill p-2 rounded ${step >= 4 ? 'bg-warning text-dark fw-bold' : 'bg-secondary text-white opacity-50'}`}>4. Datos</div>
              </div>
            </div>
          </div>
        )}

        {/* Paso 1: Servicios */}
        {step === 1 && (
          <div className="row g-4 justify-content-center">
            <div className="col-12"><h3 className="mb-3 text-warning border-bottom border-secondary pb-2">1. Selecciona un Servicio</h3></div>
            {SERVICES.map((item) => (
              <div key={item.id} className="col-md-4">
                <div 
                  className={`card custom-card h-100 p-3 ${selectedService?.id === item.id ? 'selected border-warning' : ''}`}
                  onClick={() => setSelectedService(item)}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title text-warning m-0">{item.name}</h5>
                        {item.badge && <span className="badge bg-warning text-dark">{item.badge}</span>}
                      </div>
                      <p className="card-text text-secondary small">{item.description}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary">
                      <span className="fw-bold fs-4 text-warning">₡{item.price.toLocaleString()}</span>
                      <span className="text-secondary small"><i className="bi bi-clock me-1"></i>{item.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 text-end mt-4">
              <button className="btn btn-gold btn-lg px-4" disabled={!selectedService} onClick={() => setStep(2)}>
                Siguiente <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Barberos */}
        {step === 2 && (
          <div className="row g-4 justify-content-center">
            <div className="col-12"><h3 className="mb-3 text-warning border-bottom border-secondary pb-2">2. Selecciona tu Barbero</h3></div>
            {BARBERS.map((barber) => (
              <div key={barber.id} className="col-md-4">
                <div 
                  className={`card custom-card h-100 p-4 text-center ${selectedBarber?.id === barber.id ? 'selected border-warning' : ''}`}
                  onClick={() => setSelectedBarber(barber)}
                >
                  <img src={barber.avatar} className="rounded-circle mx-auto mb-3 border border-warning p-1" width="90" height="90" alt={barber.name} style={{objectFit: 'cover'}} />
                  <h5 className="text-white">{barber.name}</h5>
                  <p className="text-secondary small mb-2">{barber.role}</p>
                  <div className="text-warning small"><i className="bi bi-star-fill"></i> {barber.rating}</div>
                </div>
              </div>
            ))}
            <div className="col-12 d-flex justify-content-between mt-4">
              <button className="btn btn-outline-light px-4" onClick={() => setStep(1)}><i className="bi bi-arrow-left me-2"></i> Atrás</button>
              <button className="btn btn-gold btn-lg px-4" disabled={!selectedBarber} onClick={() => setStep(3)}>
                Siguiente <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Selección de Fecha e Hora mediante Tarjetas/Botones */}
        {step === 3 && (
          <div className="row g-4 justify-content-center">
            <div className="col-12"><h3 className="mb-3 text-warning border-bottom border-secondary pb-2">3. Elige Fecha y Horario</h3></div>
            
            {/* 3A. Selección de Día por Botones/Tarjetas */}
            <div className="col-12 mb-3">
              <label className="form-label text-secondary mb-3"><i className="bi bi-calendar3 me-2"></i>Selecciona un Día (Próximos 7 días):</label>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-7 g-2">
                {nextDaysList.map((dayItem) => {
                  const isSelected = selectedDate === dayItem.fullDate;
                  return (
                    <div key={dayItem.fullDate} className="col">
                      <button
                        type="button"
                        disabled={dayItem.isSunday}
                        onClick={() => {
                          setSelectedDate(dayItem.fullDate);
                          setSelectedTime(''); // Reiniciar hora seleccionada
                        }}
                        className={`btn w-100 p-3 text-center border transition-all ${
                          dayItem.isSunday 
                            ? 'btn-outline-secondary opacity-50 cursor-not-allowed' 
                            : isSelected 
                              ? 'btn-warning text-dark font-weight-bold shadow' 
                              : 'btn-outline-warning text-white'
                        }`}
                      >
                        <div className="small text-uppercase fw-bold">{dayItem.dayName}</div>
                        <div className="fs-3 fw-bold">{dayItem.dayNumber}</div>
                        <div className="small">{dayItem.monthName}</div>
                        {dayItem.isSunday && <div className="badge bg-danger mt-1 text-white" style={{fontSize: '9px'}}>Cerrado</div>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3B. Selección de Hora por Botones */}
            <div className="col-12 mt-4">
              <label className="form-label text-secondary mb-3"><i className="bi bi-clock me-2"></i>Horarios Disponibles:</label>
              
              {!selectedDate ? (
                <div className="alert alert-dark border-secondary text-secondary">
                  <i className="bi bi-info-circle me-2"></i> Por favor, selecciona un día arriba para ver los horarios.
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="alert alert-danger bg-dark border-danger text-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i> No hay horarios disponibles para la fecha seleccionada.
                </div>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {availableSlots.map((slot) => (
                    <button 
                      key={slot} 
                      type="button"
                      className={`btn btn-lg px-3 py-2 ${selectedTime === slot ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-white'}`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 d-flex justify-content-between mt-4">
              <button className="btn btn-outline-light px-4" onClick={() => setStep(2)}><i className="bi bi-arrow-left me-2"></i> Atrás</button>
              <button className="btn btn-gold btn-lg px-4" disabled={!selectedDate || !selectedTime} onClick={() => setStep(4)}>
                Siguiente <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Paso 4: Datos y Confirmación */}
        {step === 4 && (
          <form onSubmit={handleCompleteBooking} className="row justify-content-center">
            <div className="col-md-6">
              <h3 className="mb-3 text-warning border-bottom border-secondary pb-2">4. Tus Datos de Contacto</h3>
              <div className="mb-3">
                <label className="form-label text-secondary">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  className="form-control"
                  placeholder="Ej. Juan Pérez"
                  onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-secondary">Teléfono (WhatsApp)</label>
                <input 
                  type="tel" 
                  required 
                  className="form-control"
                  placeholder="Ej. 8888-8888"
                  onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-outline-light px-4" onClick={() => setStep(3)}><i className="bi bi-arrow-left me-2"></i> Atrás</button>
                <button type="submit" className="btn btn-gold btn-lg px-4">Confirmar Cita & Enviar WhatsApp</button>
              </div>
            </div>
          </form>
        )}

        {/* Paso 5: Pantalla de Éxito */}
        {step === 5 && confirmedDetails && (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="card custom-card p-4 border-warning">
                <div className="card-body">
                  <i className="bi bi-check-circle-fill text-warning display-3 mb-3"></i>
                  <h3 className="text-warning fw-bold mb-2">¡Reserva Exitosa!</h3>
                  <p className="text-secondary mb-4">Se ha abierto WhatsApp automáticamente para notificar al barbero.</p>
                  
                  <div className="bg-dark p-3 rounded text-start mb-4 border border-secondary">
                    <p className="mb-1"><strong>Código:</strong> <span className="text-warning">{confirmedDetails.code}</span></p>
                    <p className="mb-1"><strong>Servicio:</strong> {confirmedDetails.service.name}</p>
                    <p className="mb-1"><strong>Barbero:</strong> {confirmedDetails.barber.name}</p>
                    <p className="mb-0"><strong>Fecha y Hora:</strong> {confirmedDetails.date} a las {confirmedDetails.time}</p>
                  </div>

                  <div className="d-grid gap-2">
                    <button className="btn btn-gold btn-lg" onClick={downloadCalendarEvent}>
                      <i className="bi bi-calendar-plus me-2"></i> Agregar a mi Calendario (Celular)
                    </button>
                    <button className="btn btn-outline-light" onClick={() => { setStep(1); setConfirmedDetails(null); setSelectedService(null); setSelectedBarber(null); setSelectedDate(''); setSelectedTime(''); }}>
                      Reservar Otra Cita
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
