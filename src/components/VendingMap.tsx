import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// @ts-ignore
window.L = L;
import 'leaflet.heat';
// Leaflet CSS is now imported in index.css
import { MOCK_VENDING_MACHINES, TRAFFIC_POINTS, VendingMachine } from '../constants';
import { MapPin, Info, Zap, Layers, Map as MapIcon, Flame, RefreshCw, AlertTriangle, WifiOff } from 'lucide-react';
import { fetchLiveTrafficData, TrafficData } from '../services/trafficService';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const VendingIcon = (type: string) => L.divIcon({
  html: `<div class="p-1 rounded-full bg-orange-500 border-2 border-white shadow-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M4 8h16"/><path d="M4 16h16"/><path d="M8 4v4"/><path d="M16 4v4"/><path d="M8 12h8"/><path d="M8 16h8"/></svg>
        </div>`,
  className: '',
  iconSize: [24, 24],
});

type MapMode = 'markers' | 'traffic-heat' | 'vending-heat' | 'live-traffic';

interface HeatmapLayerProps {
  points: [number, number, number][];
  options?: any; // Use any to avoid type issues with leaflet.heat
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ points, options }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;
    // @ts-ignore - leaflet.heat adds this to L
    const heatLayer = L.heatLayer(points, options).addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, options]);

  return null;
};

// Helper to fix map rendering issues when container size changes
const MapResizer = ({ layoutKey, resizeKey, center, zoom }: { layoutKey: string, resizeKey: number, center: [number, number], zoom: number }) => {
  const map = useMap();
  
  // Handle container resizing
  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timer);
  }, [map, layoutKey, resizeKey]);

  // Handle center/zoom changes separately with smooth flight
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [map, center, zoom]);
  
  return null;
};

interface MapProps {
  center?: [number, number];
  zoom?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  layoutKey?: string;
}

export const VendingMap: React.FC<MapProps> = ({ 
  center = [55.751244, 37.618423], 
  zoom = 10, 
  onLocationSelect,
  layoutKey = ""
}) => {
  const [mode, setMode] = useState<MapMode>('markers');
  const [liveTraffic, setLiveTraffic] = useState<TrafficData[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [resizeKey, setResizeKey] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    types: ['coffee', 'snacks', 'combined', 'water', 'food'],
    statuses: ['active', 'maintenance', 'offline']
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver(() => {
      setResizeKey(prev => prev + 1);
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredVendingMachines = MOCK_VENDING_MACHINES.filter(m => 
    filters.types.includes(m.type) && filters.statuses.includes(m.status)
  );

  const vendingHeatPoints: [number, number, number][] = filteredVendingMachines.map(m => [m.lat, m.lng, 0.8]);

  const updateLiveTraffic = async () => {
    setIsUpdating(true);
    try {
      const data = await fetchLiveTrafficData();
      setLiveTraffic(data);
      if (data.length > 0) setMode('live-traffic');
    } catch (error) {
      console.error("Failed to update live traffic:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    updateLiveTraffic();
    const interval = setInterval(updateLiveTraffic, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const liveHeatPoints: [number, number, number][] = liveTraffic.map(t => [t.lat, t.lng, t.intensity]);

  return (
    <div ref={containerRef} className="h-full w-full min-h-[500px] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        className="h-full w-full z-0"
        style={{ height: '100%', width: '100%', minHeight: '500px', backgroundColor: '#f8fafc' }}
      >
        <MapResizer layoutKey={layoutKey} resizeKey={resizeKey} center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {mode === 'markers' && filteredVendingMachines.map((machine) => (
          <Marker 
            key={machine.id} 
            position={[machine.lat, machine.lng]} 
            icon={VendingIcon(machine.type)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-md">{machine.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                    machine.status === 'active' ? 'bg-green-100 text-green-700' : 
                    machine.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {machine.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Zap size={14} className="text-orange-500" />
                    Трафик: <span className="font-semibold">{machine.traffic}%</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Info size={14} className="text-blue-500" />
                    Выручка: <span className="font-semibold">{machine.revenue} ₽/день</span>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {mode === 'traffic-heat' && (
          <HeatmapLayer 
            points={TRAFFIC_POINTS} 
            options={{ radius: 25, blur: 15, max: 1.0, gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' } }} 
          />
        )}

        {mode === 'vending-heat' && (
          <HeatmapLayer 
            points={vendingHeatPoints} 
            options={{ radius: 30, blur: 20, max: 1.0, gradient: { 0.4: 'orange', 0.7: 'red', 1: 'darkred' } }} 
          />
        )}

        {mode === 'live-traffic' && (
          <>
            <HeatmapLayer 
              points={liveHeatPoints} 
              options={{ radius: 35, blur: 25, max: 1.0, gradient: { 0.4: 'yellow', 0.7: 'orange', 1: 'red' } }} 
            />
            {liveTraffic.map((t, idx) => (
              <Marker 
                key={`live-${idx}`} 
                position={[t.lat, t.lng]} 
                icon={L.divIcon({
                  html: `<div class="animate-pulse w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>`,
                  className: '',
                  iconSize: [12, 12]
                })}
              >
                <Popup>
                  <div className="p-2">
                    <p className="font-bold text-red-600 flex items-center gap-2">
                      <AlertTriangle size={14} /> LIVE: {t.location}
                    </p>
                    <p className="text-xs mt-1">{t.description}</p>
                    <p className="text-[10px] text-gray-400 mt-2">Интенсивность: {Math.round(t.intensity * 100)}%</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
      
      {/* Mode Switcher Overlay */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        {!isOnline && (
          <div className="bg-red-500 text-white px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-pulse border border-red-600">
            <WifiOff size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Оффлайн режим (Кэш)</span>
          </div>
        )}
        <div className="bg-white/90 backdrop-blur p-1 rounded-xl shadow-xl border border-slate-200 flex flex-col">
          <button 
            onClick={() => setMode('markers')}
            className={`p-3 rounded-lg flex items-center gap-3 transition-all ${mode === 'markers' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Обычная карта"
          >
            <MapIcon size={20} />
            <span className="text-xs font-bold pr-2">Точки</span>
          </button>
          <button 
            onClick={() => setMode('traffic-heat')}
            className={`p-3 rounded-lg flex items-center gap-3 transition-all ${mode === 'traffic-heat' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Стат. трафик"
          >
            <Flame size={20} />
            <span className="text-xs font-bold pr-2">Стат</span>
          </button>
          <button 
            onClick={updateLiveTraffic}
            className={`p-3 rounded-lg flex items-center gap-3 transition-all ${mode === 'live-traffic' ? 'bg-red-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Живой трафик"
          >
            {isUpdating ? <RefreshCw size={20} className="animate-spin" /> : <RefreshCw size={20} />}
            <span className="text-xs font-bold pr-2">LIVE</span>
          </button>
          <button 
            onClick={() => setMode('vending-heat')}
            className={`p-3 rounded-lg flex items-center gap-3 transition-all ${mode === 'vending-heat' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Кластеры"
          >
            <Layers size={20} />
            <span className="text-xs font-bold pr-2">Сеть</span>
          </button>
        </div>

        {/* Filter Toggle Button */}
        <div className="bg-white/90 backdrop-blur p-1 rounded-xl shadow-xl border border-slate-200 flex flex-col">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-lg flex items-center gap-3 transition-all ${showFilters ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Фильтры"
          >
            <Zap size={20} />
            <span className="text-xs font-bold pr-2">Фильтры</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white/95 backdrop-blur p-4 rounded-xl shadow-2xl border border-slate-200 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-4">
              <div>
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Тип автомата</h5>
                <div className="grid grid-cols-1 gap-1">
                  {['coffee', 'snacks', 'combined', 'water', 'food'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors">
                      <input 
                        type="checkbox" 
                        checked={filters.types.includes(type)}
                        onChange={() => {
                          const newTypes = filters.types.includes(type)
                            ? filters.types.filter(t => t !== type)
                            : [...filters.types, type];
                          setFilters({ ...filters, types: newTypes });
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-600 capitalize">
                        {type === 'coffee' ? 'Кофе' : 
                         type === 'snacks' ? 'Снеки' : 
                         type === 'combined' ? 'Комбо' : 
                         type === 'water' ? 'Вода' : 'Еда'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Статус</h5>
                <div className="grid grid-cols-1 gap-1">
                  {['active', 'maintenance', 'offline'].map(status => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors">
                      <input 
                        type="checkbox" 
                        checked={filters.statuses.includes(status)}
                        onChange={() => {
                          const newStatuses = filters.statuses.includes(status)
                            ? filters.statuses.filter(s => s !== status)
                            : [...filters.statuses, status];
                          setFilters({ ...filters, statuses: newStatuses });
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-600 capitalize">
                        {status === 'active' ? 'Активен' : 
                         status === 'maintenance' ? 'Обслуживание' : 'Оффлайн'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setFilters({
                  types: ['coffee', 'snacks', 'combined', 'water', 'food'],
                  statuses: ['active', 'maintenance', 'offline']
                })}
                className="w-full py-1.5 text-[10px] font-bold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl border border-slate-200 text-xs space-y-3 min-w-[200px]">
        <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
          Легенда
          {mode === 'live-traffic' && <span className="animate-pulse text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">LIVE</span>}
        </h4>
        {mode === 'markers' ? (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-white shadow-sm"></div>
            <span className="text-slate-600">Вендинговый автомат</span>
          </div>
        ) : mode === 'live-traffic' ? (
          <div className="space-y-2">
            <p className="text-slate-500 mb-1 italic">Текущие пробки и скопления:</p>
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600"></div>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>ЗАТОР</span>
              <span>ПРОБКА</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-slate-500">Точки активного мониторинга</span>
            </div>
          </div>
        ) : mode === 'traffic-heat' ? (
          <div className="space-y-2">
            <p className="text-slate-500 mb-1 italic">Интенсивность пешего трафика:</p>
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-500 via-lime-500 to-red-500"></div>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>НИЗКАЯ</span>
              <span>ВЫСОКАЯ</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-slate-500 mb-1 italic">Плотность установки автоматов:</p>
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-orange-400 via-red-500 to-red-900"></div>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>ЕДИНИЧНЫЕ</span>
              <span>КЛАСТЕРЫ</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
