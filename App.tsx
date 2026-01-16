
import React, { useState, useCallback, useEffect } from 'react';
import { AppView, Destination, TripState, Vehicle, TripHistory, NearbyFacilities } from './types';
import { DESTINATIONS, VEHICLES, INDONESIAN_REGIONS } from './constants';
import { getTravelAdvice, getNearbyFacilities } from './geminiService';
import { BatikDecor } from './components/BatikDecor';

const ChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const MapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Star = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f1c40f" stroke="#f1c40f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const GPSIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const Clock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [trip, setTrip] = useState<TripState>({
    from: '',
    to: null,
    vehicle: null,
    weatherInfo: ''
  });
  const [history, setHistory] = useState<TripHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [geminiAdvice, setGeminiAdvice] = useState<any>(null);
  const [facilities, setFacilities] = useState<NearbyFacilities | null>(null);
  const [journeyStarted, setJourneyStarted] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('tripq_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleLogin = () => setView(AppView.EXPLORE);

  const selectDestination = (dest: Destination) => {
    setTrip(prev => ({ ...prev, to: dest }));
    setView(AppView.DESTINATION_DETAIL);
  };

  const proceedToVehicle = async () => {
    if (!trip.to) return;
    setLoading(true);
    const advice = await getTravelAdvice(trip.to.name, trip.to.weather);
    const nearby = await getNearbyFacilities(trip.to.name);
    setGeminiAdvice(advice);
    setFacilities(nearby);
    setLoading(false);
    setView(AppView.VEHICLE_SELECTION);
  };

  const selectVehicle = (v: Vehicle) => {
    setTrip(prev => ({ ...prev, vehicle: v }));
    setView(AppView.ROUTE_MAP);
    setJourneyStarted(false);
  };

  const finishJourney = () => {
    if (trip.to) {
      const newHistoryItem: TripHistory = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        from: trip.from,
        to: trip.to.name,
        vehicle: trip.vehicle?.name || 'Kendaraan',
        image: trip.to.image
      };
      const updatedHistory = [newHistoryItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('tripq_history', JSON.stringify(updatedHistory));
      alert("Selamat! Anda telah sampai di tujuan.");
      setView(AppView.EXPLORE);
    }
  };

  const handleUseCurrentLocation = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTrip(prev => ({ ...prev, from: "Lokasi Saya Saat Ini" }));
          setLocating(false);
        },
        () => {
          alert("Gagal mendapatkan lokasi. Pastikan izin GPS aktif.");
          setLocating(false);
        }
      );
    } else {
      alert("Browser tidak mendukung GPS.");
      setLocating(false);
    }
  };

  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#f4f7f5]">
      <BatikDecor position="bottom-left" />
      <div className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md border border-white fade-in text-center">
        <h1 className="text-4xl font-bold text-[#2d5a27] mb-2 tracking-tight">TripQ</h1>
        <p className="text-gray-500 mb-8 italic">Temukan Keajaiban Indonesia</p>
        <div className="space-y-4">
          <input type="text" placeholder="Username" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 transition-all" />
          <input type="password" placeholder="Password" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 transition-all" />
          <button onClick={handleLogin} className="w-full bg-[#2d5a27] text-white py-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">Masuk Sekarang</button>
        </div>
        <p className="mt-6 text-sm text-gray-400">© 2024 TripQ - Jelajah Nusantara</p>
      </div>
    </div>
  );

  const ExploreView = () => (
    <div className="min-h-screen pb-20">
      <nav className="p-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-md z-30 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-[#2d5a27]">TripQ</h2>
        <div className="flex items-center gap-3">
            <button onClick={() => setView(AppView.HISTORY)} className="p-2 text-[#2d5a27] hover:bg-gray-100 rounded-xl transition-colors">
                <Clock />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#d4a373]/20 flex items-center justify-center overflow-hidden border border-[#d4a373]/30">
                <span className="text-xs font-bold text-[#2d5a27]">HI!</span>
            </div>
        </div>
      </nav>
      <div className="px-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Mau kemana hari ini?</h3>
        <p className="text-gray-500 text-sm">Pilih destinasi impianmu di Indonesia</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {DESTINATIONS.map(dest => (
            <div key={dest.id} onClick={() => selectDestination(dest)} className="relative group h-72 rounded-3xl overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-xl">
              <img src={dest.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-1 text-[10px] mb-1 opacity-80 uppercase font-bold tracking-widest"><MapPin /> {dest.location}</div>
                <h4 className="text-2xl font-bold">{dest.name}</h4>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">{dest.weather}</span>
                    <div className="flex items-center gap-1 text-xs font-bold"><Star /> {dest.rating}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const HistoryView = () => (
    <div className="min-h-screen bg-[#f4f7f5] p-6 pb-24">
      <header className="mb-8 flex items-center gap-4">
        <button onClick={() => setView(AppView.EXPLORE)} className="p-2 bg-white rounded-xl shadow-sm"><ChevronLeft /></button>
        <h2 className="text-xl font-bold">Histori Perjalanan</h2>
      </header>
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-400">
           <div className="text-6xl mb-4">📭</div>
           <p>Belum ada riwayat perjalanan.</p>
           <button onClick={() => setView(AppView.EXPLORE)} className="mt-4 text-[#2d5a27] font-bold">Mulai Trip Sekarang</button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm flex gap-4 items-center fade-in">
              <img src={item.image} className="w-20 h-20 object-cover rounded-2xl" alt={item.to} />
              <div className="flex-1">
                 <p className="text-[10px] font-bold text-gray-400 uppercase">{item.date}</p>
                 <h4 className="font-bold text-gray-800">{item.to}</h4>
                 <p className="text-xs text-gray-500">Dari: {item.from}</p>
                 <p className="text-[10px] bg-[#f4f7f5] inline-block px-2 py-1 rounded-full text-[#2d5a27] mt-2 font-bold uppercase">{item.vehicle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const DestinationDetailView = () => {
    if (!trip.to) return null;
    return (
      <div className="min-h-screen flex flex-col bg-white overflow-y-auto">
        <div className="relative h-72 md:h-96 flex-shrink-0">
          <img src={trip.to.image} className="w-full h-full object-cover" alt={trip.to.name} />
          <button onClick={() => setView(AppView.EXPLORE)} className="absolute top-6 left-6 p-3 bg-white/90 rounded-2xl shadow-lg hover:bg-white transition-colors"><ChevronLeft /></button>
        </div>
        <div className="flex-1 bg-white -mt-10 rounded-t-[40px] px-8 pt-10 pb-32 shadow-2xl z-10 relative">
          <BatikDecor position="top-right" />
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#2d5a27] mb-1">{trip.to.name}</h2>
              <div className="flex items-center gap-1 text-gray-500"><MapPin /> {trip.to.location}</div>
            </div>
            <div className="bg-[#f4f7f5] px-4 py-2 rounded-2xl border border-gray-100">
              <span className="text-lg font-bold text-[#2d5a27]">{trip.to.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-10">{trip.to.description}</p>
          <div className="bg-[#f4f7f5] p-6 rounded-3xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Pilih Titik Keberangkatan</h4>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-[#2d5a27] uppercase ml-1 block mb-1">Dari (Kota Asal)</label>
                <div className="flex gap-2">
                  <select 
                    value={trip.from}
                    onChange={(e) => setTrip(prev => ({ ...prev, from: e.target.value }))}
                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d5a27]/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">-- Pilih Kota Asal --</option>
                    {INDONESIAN_REGIONS.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                  <button 
                    onClick={handleUseCurrentLocation}
                    className={`px-4 py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center ${locating ? 'animate-pulse' : ''}`}
                    title="Gunakan Lokasi Saat Ini"
                  >
                    <GPSIcon />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 block mb-1">Ke (Tujuan)</label>
                <div className="w-full px-5 py-4 rounded-xl bg-gray-200/40 border border-gray-100 font-semibold text-gray-600">
                  {trip.to.name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50">
          <button 
            disabled={!trip.from || loading} 
            onClick={proceedToVehicle} 
            className="w-full bg-[#2d5a27] text-white py-5 rounded-2xl font-bold shadow-xl disabled:opacity-40 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            {loading && <span className="animate-spin text-xl">🌀</span>}
            {loading ? 'Menganalisis Kebutuhan Trip...' : 'Pilih Kendaraan'}
          </button>
        </div>
      </div>
    );
  };

  const VehicleSelectionView = () => (
    <div className="min-h-screen bg-[#f4f7f5] p-6 pb-24">
      <header className="mb-8 flex items-center gap-4">
        <button onClick={() => setView(AppView.DESTINATION_DETAIL)} className="p-2 bg-white rounded-xl shadow-sm"><ChevronLeft /></button>
        <h2 className="text-xl font-bold">Rekomendasi TripQ</h2>
      </header>
      {geminiAdvice && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-[#2d5a27] mb-8 fade-in relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-5"><BatikDecor position="top-right" /></div>
           <h4 className="font-bold text-[#2d5a27] mb-2 flex items-center gap-2">✨ Tips Cuaca & Kendaraan</h4>
           <p className="text-sm text-gray-600 mb-4 leading-relaxed">{geminiAdvice.advice}</p>
           <div className="flex flex-wrap gap-2">
             {geminiAdvice.itemsToBring.map((item: string, i: number) => (
               <span key={i} className="text-[10px] bg-[#d4a373]/10 text-[#d4a373] px-3 py-1 rounded-full font-bold uppercase tracking-tight border border-[#d4a373]/20">{item}</span>
             ))}
           </div>
        </div>
      )}
      <div className="space-y-4">
        {VEHICLES.map(v => {
          const isRecommended = geminiAdvice?.recommendedVehicleType.toLowerCase().includes(v.type.toLowerCase());
          return (
            <div key={v.id} onClick={() => selectVehicle(v)} className={`p-6 rounded-3xl bg-white shadow-sm border-2 cursor-pointer transition-all ${isRecommended ? 'border-[#2d5a27] bg-[#2d5a27]/5' : 'border-transparent hover:border-gray-200'}`}>
              <div className="flex items-center gap-5">
                <div className="text-4xl bg-gray-50 w-20 h-20 flex items-center justify-center rounded-2xl shadow-inner">{v.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-gray-800 text-lg">{v.name}</h4>
                    {isRecommended && <span className="text-[9px] bg-[#2d5a27] text-white px-2 py-1 rounded-full font-bold tracking-widest uppercase shadow-sm">Terbaik</span>}
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">{v.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const RouteMapView = () => {
    const mapUrl = trip.to 
      ? `https://www.google.com/maps/embed/v1/directions?key=${process.env.API_KEY}&origin=${encodeURIComponent(trip.from)}&destination=${encodeURIComponent(trip.to.name + ', ' + trip.to.location)}&mode=driving`
      : '';
    
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <header className="p-6 flex items-center gap-4 bg-white/95 backdrop-blur-md absolute top-0 w-full z-20 border-b border-gray-100 shadow-sm">
          <button onClick={() => setView(AppView.VEHICLE_SELECTION)} className="p-2 bg-white rounded-xl shadow-md border border-gray-100"><ChevronLeft /></button>
          <div className="flex-1">
            <h2 className="text-lg font-bold leading-none">{journeyStarted ? 'Perjalanan Dimulai' : 'Rute Perjalanan'}</h2>
            <p className="text-[10px] text-[#2d5a27] font-bold uppercase tracking-widest mt-1">Estimasi Navigasi TripQ</p>
          </div>
          {journeyStarted && <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></div>}
        </header>
        
        <div className="flex-1 relative bg-gray-100 mt-20">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            className="z-10"
          ></iframe>
        </div>

        <div className="max-h-[70vh] overflow-y-auto bg-white border-t border-gray-100 z-30 shadow-2xl rounded-t-[40px] fade-in p-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#2d5a27]/10 rounded-2xl flex items-center justify-center text-2xl">{trip.vehicle?.icon}</div>
              <div className="flex-1">
                 <p className="text-xs text-gray-400 font-bold uppercase">Kendaraan</p>
                 <h4 className="font-bold text-gray-800">{trip.vehicle?.name}</h4>
              </div>
              <div className="text-right">
                 <p className="text-xs text-gray-400 font-bold uppercase">Estimasi</p>
                 <h4 className="font-bold text-[#2d5a27]">Lancar</h4>
              </div>
           </div>

           {/* Nearby Facilities Section */}
           {facilities && (
             <div className="mb-8 space-y-6">
               <h4 className="font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                 🏪 Fasilitas Terdekat Sekitar Lokasi
               </h4>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f4f7f5] p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-[#2d5a27] uppercase mb-2">🏨 Hotel & Penginapan</p>
                    {facilities.hotels.map((h, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-sm font-bold">{h.name}</p>
                        <p className="text-[10px] text-gray-500">{h.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#f4f7f5] p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-[#d4a373] uppercase mb-2">🍽️ Rumah Makan & Resto</p>
                    {facilities.restaurants.map((r, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-sm font-bold">{r.name}</p>
                        <p className="text-[10px] text-gray-500">{r.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#f4f7f5] p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">🕌 Tempat Ibadah</p>
                    {facilities.worshipPlaces.map((w, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-sm font-bold">{w.name}</p>
                        <p className="text-[10px] text-gray-500">{w.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#f4f7f5] p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-red-600 uppercase mb-2">⛽ SPBU (Pom Bensin)</p>
                    {facilities.gasStations.map((g, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-sm font-bold">{g.name}</p>
                        <p className="text-[10px] text-gray-500">{g.description}</p>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
           )}

           {!journeyStarted ? (
             <button 
               onClick={() => setJourneyStarted(true)} 
               className="w-full bg-[#2d5a27] text-white py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 mb-4"
             >
               Mulai Perjalanan Ke Lokasi
             </button>
           ) : (
             <div className="space-y-3">
               <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-4">
                 <p className="text-xs text-blue-600 font-semibold italic">Navigasi aktif menuju {trip.to?.name}. Gunakan fasilitas di atas untuk istirahat atau makan.</p>
               </div>
               <button 
                 onClick={finishJourney} 
                 className="w-full bg-[#d4a373] text-white py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-all mb-4"
               >
                 Selesai & Akhiri Tujuan
               </button>
             </div>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden flex flex-col">
      <main className="flex-1 relative">
        {view === AppView.LOGIN && <LoginView />}
        {view === AppView.EXPLORE && <ExploreView />}
        {view === AppView.HISTORY && <HistoryView />}
        {view === AppView.DESTINATION_DETAIL && <DestinationDetailView />}
        {view === AppView.VEHICLE_SELECTION && <VehicleSelectionView />}
        {view === AppView.ROUTE_MAP && <RouteMapView />}
      </main>
      {(view === AppView.EXPLORE || view === AppView.HISTORY) && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#2d3436]/90 backdrop-blur-xl rounded-full px-8 py-5 flex justify-between items-center shadow-2xl z-50 border border-white/10">
           <button onClick={() => setView(AppView.EXPLORE)} className={view === AppView.EXPLORE ? 'text-[#d4a373]' : 'text-gray-400'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
           </button>
           <button className="text-gray-400 hover:text-white transition-colors" onClick={() => setView(AppView.EXPLORE)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
           </button>
           <button onClick={() => setView(AppView.HISTORY)} className={view === AppView.HISTORY ? 'text-[#d4a373]' : 'text-gray-400'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 8v4l3 3"/></svg>
           </button>
           <button className="text-gray-400 hover:text-white transition-colors" onClick={() => setView(AppView.LOGIN)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
           </button>
        </div>
      )}
    </div>
  );
};

export default App;
