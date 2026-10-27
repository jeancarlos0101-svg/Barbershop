export const SERVICES = [
  {
    id: 's1',
    name: 'Corte de Cabello Premium',
    price: 8000,
    duration: 30,
    description: 'Asesoría de imagen, lavado, corte con acabado a navaja y peinado.',
    badge: 'Popular'
  },
  {
    id: 's2',
    name: 'Perfilado y Barba VIP',
    price: 6000,
    duration: 25,
    description: 'Ritual con toalla caliente, perfilado con navaja y bálsamo hidratante.',
    badge: null
  },
  {
    id: 's3',
    name: 'Combo Legendario (Corte + Barba)',
    price: 12000,
    duration: 50,
    description: 'Experiencia completa con tratamiento capilar y facial relajante.',
    badge: 'Recomendado'
  }
];

export const BARBERS = [
  { id: 'b1', name: 'Joel "The Master"', role: 'Master Barber', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
  { id: 'b2', name: 'Carlos Ramos', role: 'Fade Specialist', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
  { id: 'any', name: 'Cualquier Barbero Disponible', role: 'Asignación Express', rating: 5.0, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300' }
];

export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];