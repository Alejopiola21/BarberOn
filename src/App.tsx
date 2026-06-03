import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Bell,
  Users,
  Smartphone,
  BarChart3,
  Shield,
  Clock,
  Check,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Star,
  Sparkles,
  Plus,
  CalendarPlus,
  Award
} from 'lucide-react'


// Mock Data for Calendar columns and bookings
interface Appointment {
  id: number;
  time: string;
  service: string;
  client: string;
  color: 'blue' | 'pink' | 'green' | 'purple';
  duration: string;
}

interface Barber {
  id: number;
  name: string;
  role: string;
  avatar: string;
  appointments: Appointment[];
}

export default function App() {
  // State for language selection
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('ES Español');
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for interactive Pricing
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // State for FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // States for interactive calendar simulation in Hero
  const [barbers, setBarbers] = useState<Barber[]>([
    {
      id: 1,
      name: 'Lucas',
      role: 'Master Barber',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', // Female stylist profile mockup
      appointments: [
        { id: 101, time: '09:00', duration: '45m', service: 'Degradado & Barba', client: 'Carlos M.', color: 'blue' },
        { id: 102, time: '11:15', duration: '30m', service: 'Corte Clásico', client: 'Javier R.', color: 'pink' },
        { id: 103, time: '13:00', duration: '60m', service: 'Afeitado Premium', client: 'Roberto S.', color: 'green' }
      ]
    },
    {
      id: 2,
      name: 'Dani',
      role: 'Top Stylist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      appointments: [
        { id: 201, time: '10:00', duration: '60m', service: 'Coloración & Lavado', client: 'Alejandro P.', color: 'green' },
        { id: 202, time: '12:00', duration: '30m', service: 'Corte + Peinado', client: 'Sandro L.', color: 'blue' }
      ]
    },
    {
      id: 3,
      name: 'Mateo',
      role: 'Junior Stylist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      appointments: [
        { id: 301, time: '09:30', duration: '45m', service: 'Recorte de Barba', client: 'Marcos T.', color: 'pink' },
        { id: 302, time: '11:00', duration: '45m', service: 'Corte Degradado', client: 'Hugo V.', color: 'purple' }
      ]
    }
  ]);

  // Toast Notification state
  const [toastVisible, setToastVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState('¡Nueva reserva! Corte - 14:00');
  
  // Custom interactive booking simulator inside Hero
  const [newBookingName, setNewBookingName] = useState('');
  const [newBookingService, setNewBookingService] = useState('Corte Clásico');
  const [selectedBarberId, setSelectedBarberId] = useState(1);
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Trigger automated simulation of a new reservation after 6 seconds to show dynamic system
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastMessage('¡Nueva reserva! Barba & Ritual - 16:30');
      setToastVisible(true);
      
      // Auto add appointment to Mateo
      setBarbers(prev => prev.map(barber => {
        if (barber.id === 3) {
          // Check if appointment already exists to avoid duplicate render
          if (!barber.appointments.some(ap => ap.time === '16:30')) {
            return {
              ...barber,
              appointments: [
                ...barber.appointments,
                { id: 999, time: '16:30', duration: '30m', service: 'Barba & Ritual', client: 'Andrés G.', color: 'blue' }
              ]
            }
          }
        }
        return barber;
      }));
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookingName.trim()) return;

    const time = selectedTime;
    const colors: ('blue' | 'pink' | 'green' | 'purple')[] = ['blue', 'pink', 'green', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newApp: Appointment = {
      id: Date.now(),
      time,
      duration: '40m',
      service: newBookingService,
      client: newBookingName,
      color: randomColor
    };

    setBarbers(prev => prev.map(barber => {
      if (barber.id === selectedBarberId) {
        return {
          ...barber,
          appointments: [...barber.appointments, newApp].sort((a,b) => a.time.localeCompare(b.time))
        };
      }
      return barber;
    }));

    setToastMessage(`¡Nueva reserva! ${newBookingService} - ${time}`);
    setToastVisible(true);
    setNewBookingName('');
    setBookingModalOpen(false);
  };

  const deleteAppointment = (barberId: number, appointmentId: number) => {
    setBarbers(prev => prev.map(barber => {
      if (barber.id === barberId) {
        return {
          ...barber,
          appointments: barber.appointments.filter(ap => ap.id !== appointmentId)
        };
      }
      return barber;
    }));
  };

  const languages = ['ES Español', 'EN English', 'PT Português'];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-navy-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center shadow-lg shadow-navy-900/10">
              <span className="text-white font-extrabold text-xl tracking-tighter">B</span>
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-[#0F172A]">
              Barber<span className="text-emerald-500">ON</span>
            </span>
          </div>

          {/* Center navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#funciones" className="text-sm font-medium text-navy-600 hover:text-[#0F172A] transition-colors duration-200">Funciones</a>
            <a href="#como-funciona" className="text-sm font-medium text-navy-600 hover:text-[#0F172A] transition-colors duration-200">Cómo funciona</a>
            <a href="#precios" className="text-sm font-medium text-navy-600 hover:text-[#0F172A] transition-colors duration-200">Precios</a>
            <a href="#noticias" className="text-sm font-medium text-navy-600 hover:text-[#0F172A] transition-colors duration-200">Noticias</a>
            <a href="#contacto" className="text-sm font-medium text-navy-600 hover:text-[#0F172A] transition-colors duration-200">Contacto</a>
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-[#0F172A] bg-navy-50 py-2 px-3.5 rounded-lg border border-navy-100 transition-all duration-200 cursor-pointer"
              >
                <span>{selectedLang}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-navy-100 rounded-lg shadow-xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setSelectedLang(l);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-navy-600 hover:bg-navy-50 hover:text-[#0F172A] transition-colors"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Login Button */}
            <button className="bg-[#0F172A] text-white hover:bg-navy-800 font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              Iniciar sesión
            </button>
          </div>

          {/* Hamburger button for mobile */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy-700 hover:text-[#0F172A] focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-navy-100 bg-white py-4 px-6 absolute top-20 left-0 w-full shadow-lg z-50 animate-in fade-in slide-in-from-top-5 duration-250">
            <nav className="flex flex-col gap-4 mb-6">
              <a 
                href="#funciones" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-navy-600 hover:text-[#0F172A] transition-colors"
              >
                Funciones
              </a>
              <a 
                href="#como-funciona" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-navy-600 hover:text-[#0F172A] transition-colors"
              >
                Cómo funciona
              </a>
              <a 
                href="#precios" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-navy-600 hover:text-[#0F172A] transition-colors"
              >
                Precios
              </a>
              <a 
                href="#noticias" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-navy-600 hover:text-[#0F172A] transition-colors"
              >
                Noticias
              </a>
              <a 
                href="#contacto" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-navy-600 hover:text-[#0F172A] transition-colors"
              >
                Contacto
              </a>
            </nav>

            <div className="flex flex-col gap-3 pt-4 border-t border-navy-100">
              <div className="flex items-center justify-between text-sm text-navy-500 px-1">
                <span>Idioma</span>
                <div className="flex gap-2">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => setSelectedLang(l)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium border ${selectedLang === l ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-navy-50 text-navy-600 border-navy-100'}`}
                    >
                      {l.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full text-center bg-[#0F172A] text-white hover:bg-navy-800 font-semibold py-3 rounded-xl shadow-sm transition-all duration-200 mt-2">
                Iniciar sesión
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32">
        {/* Abstract background decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-50/40 blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-navy-50/40 blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              {/* Pre-title badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-pulse-slow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>La agenda inteligente definitiva</span>
              </div>

              {/* Main Title H1 */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[#0F172A] mb-6">
                Software de reservas online para peluquerías y barberías
              </h1>

              {/* Subtext Paragraph */}
              <p className="text-navy-600 text-lg leading-relaxed mb-8 max-w-xl">
                BarberON es un software para peluquerías y barberías que permite gestionar citas y reservas online de forma sencilla. Ideal para salones modernos y barberías independientes que buscan digitalizar su agenda y reducir ausencias con recordatorios automáticos por SMS.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a 
                  href="#precios"
                  className="bg-[#0F172A] text-white hover:bg-navy-800 text-center font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Empezar gratis (1 profesional)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#funciones"
                  className="bg-transparent text-[#0F172A] hover:bg-navy-50 text-center font-semibold px-8 py-4 rounded-xl border-2 border-navy-200 hover:border-[#0F172A] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Ver funciones</span>
                </a>
              </div>

              {/* Micro social proof proofpoints */}
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-navy-100 w-full">
                <div className="flex -space-x-2">
                  <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                  <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                  <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                </div>
                <div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-navy-900 font-bold ml-1.5 text-sm">4.9/5</span>
                  </div>
                  <p className="text-xs text-navy-500 mt-0.5">Valorado por +1,200 profesionales</p>
                </div>
              </div>
            </div>

            {/* Right Column: Simulated Calendar & Dynamic Floating Toast */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              
              {/* Main App Dashboard Simulator Box */}
              <div className="w-full max-w-[540px] bg-white rounded-2xl border border-navy-200 shadow-2xl overflow-hidden animate-float">
                
                {/* Simulator Header */}
                <div className="bg-navy-900 text-white px-5 py-4 flex items-center justify-between border-b border-navy-800">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-semibold text-navy-300">Agenda BarberON - Panel de Control</span>
                  </div>
                  
                  {/* Plus Icon to trigger interactive simulator */}
                  <button 
                    onClick={() => setBookingModalOpen(true)}
                    className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Turno</span>
                  </button>
                </div>

                {/* Calendar Grid Headers (Barbers info) */}
                <div className="grid grid-cols-3 bg-navy-50 border-b border-navy-200 py-3 text-center">
                  {barbers.map(barber => (
                    <div key={barber.id} className="flex flex-col items-center justify-center px-2">
                      <img 
                        src={barber.avatar} 
                        alt={barber.name} 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover mb-1" 
                      />
                      <span className="text-xs font-bold text-[#0F172A]">{barber.name}</span>
                      <span className="text-[10px] text-navy-400 font-medium leading-none">{barber.role}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar Schedule Grid Body */}
                <div className="relative h-[320px] bg-slate-50/50 overflow-y-auto px-4 py-4 space-y-4">
                  {/* Background grid line helpers */}
                  <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none opacity-20">
                    <div className="border-b border-navy-300 w-full text-[10px] text-navy-400 text-left">09:00</div>
                    <div className="border-b border-navy-300 w-full text-[10px] text-navy-400 text-left">10:00</div>
                    <div className="border-b border-navy-300 w-full text-[10px] text-navy-400 text-left">11:00</div>
                    <div className="border-b border-navy-300 w-full text-[10px] text-navy-400 text-left">12:00</div>
                    <div className="border-b border-navy-300 w-full text-[10px] text-navy-400 text-left">13:00</div>
                    <div className="border-b border-navy-300 w-full text-[10px] text-navy-400 text-left">14:00</div>
                  </div>

                  {/* Columns representation */}
                  <div className="grid grid-cols-3 gap-3 h-full relative z-10">
                    
                    {barbers.map(barber => (
                      <div key={barber.id} className="flex flex-col gap-2 h-full">
                        {barber.appointments.length === 0 ? (
                          <div className="flex-1 border-2 border-dashed border-navy-200 rounded-xl flex items-center justify-center text-navy-300 p-2 text-center text-xs">
                            Sin citas
                          </div>
                        ) : (
                          barber.appointments.map(app => {
                            // Map pastel colors
                            const colorClasses = {
                              blue: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
                              pink: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100',
                              green: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
                              purple: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                            };

                            return (
                              <div
                                key={app.id}
                                className={`relative group p-2.5 rounded-xl border text-left shadow-sm transition-all duration-200 ${colorClasses[app.color] || colorClasses.blue}`}
                              >
                                {/* Time & Duration */}
                                <div className="flex justify-between items-center text-[9px] font-bold opacity-80 mb-1">
                                  <span>{app.time} ({app.duration})</span>
                                </div>
                                {/* Service */}
                                <div className="text-[11px] font-extrabold truncate leading-tight">
                                  {app.service}
                                </div>
                                {/* Client name */}
                                <div className="text-[10px] opacity-90 truncate font-semibold">
                                  👤 {app.client}
                                </div>
                                
                                {/* Hover Delete Appointment Option */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteAppointment(barber.id, app.id);
                                  }}
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-white text-rose-600 rounded-full p-0.5 shadow-sm transition-opacity"
                                  title="Eliminar turno"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    ))}

                  </div>
                </div>

                {/* Simulated Quick Action Footer bar */}
                <div className="bg-white border-t border-navy-200 px-5 py-3.5 flex justify-between items-center text-xs text-navy-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-medium text-navy-700">Canales de Reserva: Web & Widget activos</span>
                  </div>
                  <span className="font-semibold text-navy-400">BarberON B2B</span>
                </div>
              </div>

              {/* Floating Dynamic Notification Toast */}
              {toastVisible && (
                <div className="absolute bottom-6 left-6 md:left-12 bg-white rounded-xl shadow-2xl border border-emerald-100 p-4 max-w-[280px] flex items-start gap-3.5 animate-in slide-in-from-bottom-5 duration-300 z-30">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-extrabold text-[#0F172A]">Reserva confirmada</div>
                    <div className="text-xs text-navy-600 font-medium mt-0.5">{toastMessage}</div>
                  </div>
                  <button 
                    onClick={() => setToastVisible(false)}
                    className="text-navy-400 hover:text-navy-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Dynamic Interactive Booking Dialog Modal */}
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl border border-navy-200 shadow-2xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 text-navy-400 hover:text-navy-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-display font-bold text-xl text-[#0F172A] mb-4 flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-emerald-500" />
                <span>Simular Nueva Cita</span>
              </h3>

              <form onSubmit={handleCreateBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy-700 mb-1.5">Nombre del Cliente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={newBookingName}
                    onChange={(e) => setNewBookingName(e.target.value)}
                    className="w-full border border-navy-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-700 mb-1.5">Barbero / Profesional</label>
                  <select
                    value={selectedBarberId}
                    onChange={(e) => setSelectedBarberId(Number(e.target.value))}
                    className="w-full border border-navy-200 bg-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {barbers.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.role})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1.5">Servicio</label>
                    <select
                      value={newBookingService}
                      onChange={(e) => setNewBookingService(e.target.value)}
                      className="w-full border border-navy-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Corte Degradado">Corte Degradado</option>
                      <option value="Recorte de Barba">Recorte de Barba</option>
                      <option value="Corte Clásico">Corte Clásico</option>
                      <option value="Afeitado Premium">Afeitado Premium</option>
                      <option value="Coloración">Coloración</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-700 mb-1.5">Hora</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full border border-navy-200 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="09:15">09:15</option>
                      <option value="10:30">10:30</option>
                      <option value="11:45">11:45</option>
                      <option value="12:30">12:30</option>
                      <option value="14:00">14:00</option>
                      <option value="15:30">15:30</option>
                      <option value="16:00">16:00</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F172A] hover:bg-navy-800 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Añadir a la Agenda</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* 3. Banner CTA Secundario (Fondo gris claro #F3F4F6) */}
      <section className="bg-[#F3F4F6] py-16 md:py-20 border-y border-navy-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-3xl border border-navy-200/80 p-8 md:p-12 shadow-xl relative overflow-hidden">
            
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-2xl -z-10 translate-x-20 -translate-y-20"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Side: Offer copy + features checks */}
              <div className="lg:col-span-7 text-left">
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 rounded-full uppercase tracking-widest">
                  Plazas Limitadas
                </span>
                
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight leading-tight mt-4 mb-4">
                  Deja que tus clientes reserven solos — ¡sin WhatsApp!
                </h2>
                
                <p className="text-navy-600 text-sm sm:text-base font-semibold mb-6">
                  Número limitado de cuentas Profesionales gratis con:
                </p>

                {/* Vertical Check list */}
                <ul className="space-y-3.5">
                  {[
                    'Empleados ilimitados',
                    'Sedes ilimitadas',
                    'Todas las funciones Pro'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-5.5 h-5.5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-navy-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Primary CTA & Secondary action link */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-stretch justify-center gap-4.5">
                <a 
                  href="#precios"
                  className="w-full bg-[#0F172A] text-white hover:bg-navy-800 text-center font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Reclamar plaza gratis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-emerald-400" />
                </a>
                
                <a 
                  href="#como-funciona"
                  className="text-navy-600 hover:text-[#0F172A] font-semibold text-xs sm:text-sm text-center py-2 underline underline-offset-4 decoration-navy-300 hover:decoration-[#0F172A] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Ver cómo funciona el sistema de citas (con capturas)</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Sección de Funciones (Grid) */}
      <section id="funciones" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header of Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Características Clave
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tight mt-4 mb-5">
              Todo lo que necesitas para crecer
            </h2>
            <p className="text-navy-500 text-base sm:text-lg">
              BarberON te da herramientas para optimizar operaciones, aumentar reservas y ofrecer una experiencia excelente.
            </p>
          </div>

          {/* Grid Layout (3 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Agenda inteligente */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-navy-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-3">Agenda inteligente</h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                Evita dobles reservas y optimiza tu calendario automáticamente.
              </p>
            </div>

            {/* Card 2: Recordatorios automáticos */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-navy-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-3">Recordatorios automáticos</h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                Reduce ausencias con recordatorios por SMS y email enviados automáticamente.
              </p>
            </div>

            {/* Card 3: Confirmaciones automáticas */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-navy-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-3">Confirmaciones automáticas</h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                Envía confirmaciones y recordatorios para reducir cancelaciones y ausencias.
              </p>
            </div>

            {/* Card 4: Gestión de clientes */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-navy-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-3">Gestión de clientes</h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                Perfiles de clientes, historial de servicios y preferencias en un solo lugar.
              </p>
            </div>

            {/* Card 5: Optimizado para móvil */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-navy-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-3">Optimizado para móvil</h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                Tus clientes reservan fácilmente desde cualquier dispositivo.
              </p>
            </div>

            {/* Card 6: Analítica del negocio */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-navy-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-3">Analítica del negocio</h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                Sigue servicios populares, horas punta e ingresos con informes detallados.
              </p>
            </div>

            {/* Card 7: Disponible 24/7 (En el centro en pantallas grandes si son 7, o alineado en rejilla) */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] hover:border-navy-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0">
              <div className="w-12 h-12 rounded-xl bg-navy-50 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mb-3">Disponible 24/7</h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                Tu negocio no duerme: reservas en cualquier momento, incluso fuera de horario.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Additional Section: "Cómo funciona en 3 pasos" */}
      <section id="como-funciona" className="py-24 bg-navy-50 border-t border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Puesta en marcha
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight mt-4 mb-4">
              Empieza en 3 simples pasos
            </h2>
            <p className="text-navy-500 text-base">
              Digitalizar tu barbería nunca fue tan rápido. Estarás recibiendo reservas en menos de 10 minutos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Step 1 */}
            <div className="relative text-left bg-white p-8 rounded-2xl border border-navy-100 shadow-sm">
              <div className="absolute top-0 right-8 -translate-y-1/2 font-display font-black text-6xl text-navy-100 pointer-events-none">
                01
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0F172A] mt-2 mb-3">
                Configura tus servicios
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed mb-4">
                Añade tus barberos, servicios (cortes, afeitados, tratamientos), precios y horarios en pocos clicks.
              </p>
              <div className="text-xs font-extrabold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Configuración guiada</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-left bg-white p-8 rounded-2xl border border-navy-100 shadow-sm">
              <div className="absolute top-0 right-8 -translate-y-1/2 font-display font-black text-6xl text-navy-100 pointer-events-none">
                02
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0F172A] mt-2 mb-3">
                Comparte tu enlace
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed mb-4">
                Publica tu enlace de reservas personalizado en Instagram, TikTok, Google Maps o compártelo por WhatsApp.
              </p>
              <div className="text-xs font-extrabold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Código QR de regalo</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-left bg-white p-8 rounded-2xl border border-navy-100 shadow-sm">
              <div className="absolute top-0 right-8 -translate-y-1/2 font-display font-black text-6xl text-navy-100 pointer-events-none">
                03
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0F172A] mt-2 mb-3">
                Recibe reservas 24/7
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed mb-4">
                Tus clientes reservan solos, el sistema valida turnos y envía confirmaciones automáticas reduciendo ausencias.
              </p>
              <div className="text-xs font-extrabold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Recordatorios SMS listos</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section id="precios" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Planes Flexibles
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight mt-4 mb-4">
              Precios transparentes y sin sorpresas
            </h2>
            <p className="text-navy-500 text-base mb-8">
              Empieza gratis hoy mismo y escala a medida que tu negocio crece.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="inline-flex items-center gap-2 p-1.5 bg-navy-50 border border-navy-100 rounded-xl">
              <button 
                onClick={() => setBillingPeriod('monthly')}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${billingPeriod === 'monthly' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-navy-600 hover:text-[#0F172A]'}`}
              >
                Pago Mensual
              </button>
              <button 
                onClick={() => setBillingPeriod('yearly')}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1 ${billingPeriod === 'yearly' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-navy-600 hover:text-[#0F172A]'}`}
              >
                <span>Pago Anual</span>
                <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">DTO -20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch">
            
            {/* Plan 1: Free Plan */}
            <div className="bg-white border border-navy-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative hover:border-navy-300 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-extrabold text-navy-500 uppercase tracking-widest">Gratis</span>
                  <span className="bg-navy-50 text-[#0F172A] text-xs font-bold px-3 py-1 rounded-md">1 Profesional</span>
                </div>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display font-black text-5xl text-[#0F172A]">$0</span>
                  <span className="text-navy-400 text-sm">/ mes</span>
                </div>
                <p className="text-xs text-navy-400 mb-6 font-semibold">Gratis para siempre, sin tarjeta de crédito.</p>

                <hr className="border-navy-100 my-6" />

                <ul className="space-y-4 text-left">
                  {[
                    '1 profesional independiente',
                    'Hasta 250 citas mensuales',
                    'Calendario de reservas básico',
                    'Página de reserva personalizada',
                    'Confirmación por email gratis'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-navy-700 font-medium">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full py-3.5 rounded-xl border border-navy-200 text-navy-800 hover:border-[#0F172A] hover:bg-navy-50 font-bold text-sm transition-all cursor-pointer">
                  Empezar ahora gratis
                </button>
              </div>
            </div>

            {/* Plan 2: Professional Plan (PRO) */}
            <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-bl-xl">
                Recomendado
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-extrabold text-emerald-700 uppercase tracking-widest">Profesional</span>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-md">Equipos e Ilimitado</span>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display font-black text-5xl text-[#0F172A]">
                    {billingPeriod === 'monthly' ? '$19' : '$15'}
                  </span>
                  <span className="text-navy-400 text-sm">/ mes</span>
                </div>
                <p className="text-xs text-emerald-600 mb-6 font-semibold">
                  {billingPeriod === 'yearly' ? 'Facturado anualmente ($180)' : 'Cancelación en cualquier momento'}
                </p>

                <hr className="border-navy-100 my-6" />

                <ul className="space-y-4 text-left">
                  {[
                    'Profesionales y barberos ilimitados',
                    'Citas y reservas ilimitadas',
                    'Recordatorios automáticos por SMS',
                    'Soporte prioritario por WhatsApp 24/7',
                    'Historial de clientes y analítica avanzada',
                    'Integración con Google Calendar & Maps',
                    'Multi-sucursal / Sedes ilimitadas'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-navy-800 font-bold">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full py-3.5 rounded-xl bg-[#0F172A] hover:bg-navy-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer">
                  Obtener 14 días gratis Pro
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ Section (Accordion) */}
      <section className="py-24 bg-navy-50 border-t border-b border-navy-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Preguntas Frecuentes
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight mt-4 mb-4">
              ¿Tienes dudas? Te las respondemos
            </h2>
            <p className="text-navy-500 text-sm sm:text-base">
              Todo lo que necesitas saber sobre BarberON para digitalizar tu agenda hoy.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {[
              {
                q: '¿Es realmente gratis para un profesional?',
                a: 'Sí, la cuenta para 1 barbero profesional es 100% gratuita y activa para siempre. Incluye las herramientas básicas de agenda y página de reserva web. No requieres tarjeta de crédito para registrarte.'
              },
              {
                q: '¿Cómo funcionan los recordatorios por SMS?',
                a: 'El sistema envía automáticamente un mensaje de texto SMS personalizado al cliente 2 horas antes de su cita (configurable). Esto disminuye drásticamente el absentismo laboral en más de un 85%.'
              },
              {
                q: '¿Puedo integrar la reserva en mi Instagram?',
                a: '¡Por supuesto! Te proporcionamos un enlace único (ej. barberon.com/tu-barberia) y un botón de reserva que puedes pegar en tu perfil de Instagram, Facebook o ficha de Google Maps para que reserven directamente desde ahí.'
              },
              {
                q: '¿Tengo permanencia en el plan de pago?',
                a: 'No, no hay ningún tipo de compromiso ni permanencia. Puedes cancelar tu suscripción Pro en cualquier momento desde tu panel de configuración o cambiar al plan gratis sin perder tus datos de clientes.'
              },
              {
                q: '¿Se requiere instalar alguna app en el ordenador?',
                a: 'No, BarberON es un software en la nube (SaaS). Puedes utilizarlo desde cualquier dispositivo (ordenador, tablet o teléfono móvil) simplemente ingresando a la web con tu usuario y contraseña.'
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-navy-100 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-[#0F172A] hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-navy-400 shrink-0 transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>
                
                {openFaqIndex === index && (
                  <div className="px-5 pb-5 pt-1 text-left text-xs sm:text-sm text-navy-500 leading-relaxed border-t border-slate-50 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Final CTA Footer Block */}
      <section className="bg-[#0F172A] text-white py-20 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <Award className="w-12 h-12 text-emerald-400 mx-auto mb-6 animate-bounce" />
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            ¿Listo para llenar tu agenda sin contestar llamadas?
          </h2>
          
          <p className="text-navy-300 text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Únete a más de 1,200 barberías y peluquerías que ya han optimizado sus turnos con BarberON.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer">
              <span>Registrar mi salón gratis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#precios"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 text-center transition-all cursor-pointer"
            >
              Ver planes de pago
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-navy-400 font-medium">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Registro en 2 minutos</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Sin tarjeta de crédito</span>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#020617] text-navy-400 py-12 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
            
            {/* Col 1: Brand & Logo */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-[#020617] font-black text-sm">
                  B
                </div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  Barber<span className="text-emerald-500">ON</span>
                </span>
              </div>
              <p className="text-xs text-navy-500 leading-relaxed">
                El software de gestión y agenda inteligente líder en el sector de la belleza y estética. Diseñado para salones independientes y franquicias.
              </p>
            </div>

            {/* Col 2: Producto */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Producto</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#funciones" className="hover:text-white transition-colors">Funciones</a></li>
                <li><a href="#precios" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integraciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Widget de Reserva</a></li>
              </ul>
            </div>

            {/* Col 3: Empresa */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Empresa</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prensa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            {/* Col 4: Soporte */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Soporte y Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Ayuda / FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos de servicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seguridad</a></li>
              </ul>
            </div>

          </div>

          <hr className="border-navy-900 my-8" />

          {/* Footer bottom bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-navy-500">
            <div>
              © {new Date().getFullYear()} BarberON. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4">
              <span>Hecho con ❤️ para barberos y estilistas de todo el mundo</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
