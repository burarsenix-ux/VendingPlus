import React, { useState } from 'react';
import { VendingMap } from './components/VendingMap';
import { ChatAssistant } from './components/ChatAssistant';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  TrendingUp,
  Users,
  Zap,
  Coffee,
  ChevronRight,
  Bot,
  Lightbulb,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { MOCK_VENDING_MACHINES, TRAFFIC_POINTS } from './constants';

// Calculate real statistics from mock data
const totalRevenue = MOCK_VENDING_MACHINES.reduce((acc, curr) => acc + curr.revenue, 0);
const activePoints = MOCK_VENDING_MACHINES.filter(m => m.status === 'active').length;
const totalPoints = MOCK_VENDING_MACHINES.length;

// Generate revenue data by location type for the chart
const revenueByLocationType = MOCK_VENDING_MACHINES.reduce((acc: any, curr) => {
  const type = curr.locationType === 'mall' ? 'ТЦ' : 
               curr.locationType === 'station' ? 'Вокзалы' :
               curr.locationType === 'office' ? 'Офисы' :
               curr.locationType === 'park' ? 'Парки' : 'Улицы';
  acc[type] = (acc[type] || 0) + curr.revenue;
  return acc;
}, {});

const revenueChartData = Object.keys(revenueByLocationType).map(key => ({
  name: key,
  revenue: revenueByLocationType[key]
}));

// Generate machine type distribution
const typeDistribution = MOCK_VENDING_MACHINES.reduce((acc: any, curr) => {
  const type = curr.type === 'coffee' ? 'Кофе' : 
               curr.type === 'snacks' ? 'Снеки' :
               curr.type === 'combined' ? 'Комбо' :
               curr.type === 'water' ? 'Вода' : 'Еда';
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {});

const typeChartData = Object.keys(typeDistribution).map(key => ({
  name: key,
  count: typeDistribution[key]
}));

const trafficData = [
  { time: '08:00', traffic: 40 },
  { time: '10:00', traffic: 85 },
  { time: '12:00', traffic: 95 },
  { time: '14:00', traffic: 70 },
  { time: '16:00', traffic: 80 },
  { time: '18:00', traffic: 60 },
  { time: '20:00', traffic: 30 },
];

const LOCATION_COORDINATES: Record<string, [number, number]> = {
  'москва': [55.7558, 37.6173],
  'арбат': [55.7502, 37.5925],
  'тверская': [55.7648, 37.6055],
  'красная площадь': [55.7539, 37.6208],
  'вднх': [55.8263, 37.6376],
  'парк горького': [55.7280, 37.6010],
  'сити': [55.7480, 37.5370],
  'москва сити': [55.7480, 37.5370],
  'китай-город': [55.7567, 37.6333],
  'чистые пруды': [55.7645, 37.6391],
  'лужники': [55.7158, 37.5536],
  'таганка': [55.7415, 37.6528],
  'павелецкая': [55.7298, 37.6365],
  'белорусская': [55.7770, 37.5810],
  'киевская': [55.7431, 37.5673],
  'курская': [55.7570, 37.6600],
  'сокольники': [55.7920, 37.6760],
  'царицыно': [55.6145, 37.6815],
  'коломенское': [55.6695, 37.6641],
  'подольск': [55.4312, 37.5458],
  'химки': [55.8941, 37.4440],
  'мытищи': [55.9105, 37.7331],
  'люберцы': [55.6772, 37.8932],
  'королев': [55.9229, 37.8542],
  'балашиха': [55.7963, 37.9381],
  'одинцово': [55.6789, 37.2731],
  'красногорск': [55.8310, 37.3284],
  'электросталь': [55.7892, 38.4422],
  'коломна': [55.0939, 38.7670],
  'серпухов': [54.9191, 37.4226],
  'орехово-зуево': [55.8083, 38.9772],
  'ногинск': [55.8544, 38.4411],
  'щелково': [55.9203, 37.9981],
  'дмитров': [56.3439, 37.5203],
  'сергиев посад': [56.3104, 38.1297],
  'пушкино': [56.0105, 37.8452],
  'раменское': [55.5672, 38.2258],
  'жуковский': [55.5617, 38.1175],
  'домодедово': [55.4103, 37.9025],
  'внуково': [55.5915, 37.2615],
  'шереметьево': [55.9736, 37.4125],
  'солнечногорск': [56.1833, 36.9667],
  'клин': [56.3333, 36.7167],
  'истра': [55.9167, 36.8667],
  'чехов': [55.1500, 37.4667],
  'ступино': [54.8833, 38.0833],
  'дубна': [56.7333, 37.1667],
  'фрязино': [55.9500, 38.0500],
  'лыткарино': [55.5833, 37.9000],
  'дзержинский': [55.6333, 37.8500],
  'котельники': [55.6667, 37.8667],
  'реутов': [55.7500, 37.8500],
  'железнодорожный': [55.7500, 38.0000],
  'лобня': [56.0167, 37.4667],
  'долгопрудный': [55.9333, 37.5000],
};

// Distance function (Haversine)
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([55.751244, 37.618423]);
  const [mapZoom, setMapZoom] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Recommendation Logic
  const recommendations = React.useMemo(() => {
    const results: any[] = [];
    
    // 1. Find high traffic spots with no nearby machines
    TRAFFIC_POINTS.forEach(([lat, lng, intensity]) => {
      if (intensity > 0.7) {
        const nearestMachine = MOCK_VENDING_MACHINES.reduce((min, m) => {
          const dist = getDistance(lat, lng, m.lat, m.lng);
          return dist < min ? dist : min;
        }, Infinity);

        if (nearestMachine > 0.5) { // No machine within 500m
          results.push({
            id: `rec-${lat}-${lng}`,
            lat,
            lng,
            intensity,
            reason: 'Высокий трафик, низкая плотность автоматов',
            score: intensity * 100,
            type: 'traffic'
          });
        }
      }
    });

    // 2. Add spots based on search history
    searchHistory.forEach(query => {
      const coords = LOCATION_COORDINATES[query];
      if (coords) {
        const [lat, lng] = coords;
        const nearestMachine = MOCK_VENDING_MACHINES.reduce((min, m) => {
          const dist = getDistance(lat, lng, m.lat, m.lng);
          return dist < min ? dist : min;
        }, Infinity);

        if (nearestMachine > 0.8) { // No machine within 800m
          results.push({
            id: `rec-search-${query}`,
            lat,
            lng,
            intensity: 0.8,
            reason: `Частый поиск локации: ${query}`,
            score: 85,
            type: 'search'
          });
        }
      }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, 5);
  }, [searchHistory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    setSearchHistory(prev => [query, ...prev].slice(0, 10));

    // 1. Check predefined locations
    if (LOCATION_COORDINATES[query]) {
      setMapCenter(LOCATION_COORDINATES[query]);
      setMapZoom(15);
      return;
    }

    // 2. Fuzzy search in predefined locations
    const foundLocation = Object.keys(LOCATION_COORDINATES).find(loc => loc.includes(query) || query.includes(loc));
    if (foundLocation) {
      setMapCenter(LOCATION_COORDINATES[foundLocation]);
      setMapZoom(15);
      return;
    }

    // 3. Search in vending machine names
    const foundMachine = MOCK_VENDING_MACHINES.find(m => 
      m.name.toLowerCase().includes(query)
    );
    if (foundMachine) {
      setMapCenter([foundMachine.lat, foundMachine.lng]);
      setMapZoom(17);
      return;
    }
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-[#F8FAFC] text-slate-900'} font-sans overflow-hidden transition-colors duration-300`}>
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? (window.innerWidth >= 1024 ? 256 : 80) : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-r flex flex-col overflow-hidden shrink-0 transition-colors duration-300`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0 relative overflow-hidden group">
            <TrendingUp size={20} className="absolute -top-1 -right-1 opacity-20 group-hover:scale-150 transition-transform" />
            <Coffee size={24} className="relative z-10" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="font-extrabold text-xl tracking-tighter hidden lg:block whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">VendingPlus</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: language === 'ru' ? 'Дашборд' : 'Dashboard' },
            { id: 'map', icon: MapIcon, label: language === 'ru' ? 'Карта МО' : 'Map' },
            { id: 'analytics', icon: BarChart3, label: language === 'ru' ? 'Аналитика' : 'Analytics' },
            { id: 'insights', icon: Lightbulb, label: language === 'ru' ? 'Инсайты' : 'Insights' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white font-semibold shadow-md' 
                  : `${theme === 'dark' ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-50'}`
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              <span className="hidden lg:block whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'settings' 
                ? 'bg-blue-600 text-white font-semibold shadow-md' 
                : `${theme === 'dark' ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-50'}`
            }`}
          >
            <Settings size={20} className="shrink-0" />
            <span className="hidden lg:block whitespace-nowrap">{language === 'ru' ? 'Настройки' : 'Settings'}</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} h-20 border-b px-8 flex items-center justify-between shrink-0 z-10 transition-colors duration-300`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
              title={isSidebarOpen ? "Скрыть меню" : "Показать меню"}
            >
              <LayoutDashboard size={20} />
            </button>
            <form onSubmit={handleSearch} className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'} flex items-center gap-4 px-4 py-2 rounded-xl w-64 lg:w-96 transition-colors`}>
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder={language === 'ru' ? "Поиск мест, улиц или автоматов..." : "Search locations, streets or machines..."}
                className="bg-transparent border-none outline-none text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                isAssistantOpen ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Bot size={18} />
              <span className="hidden md:block">{isAssistantOpen ? 'ИИ Активен' : 'Показать ИИ'}</span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Александр Б.</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{language === 'ru' ? 'Московская Область' : 'Moscow Region'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white dark:border-slate-700 shadow-md"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Side: Map or Analytics */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeTab === 'dashboard' ? (
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold">{language === 'ru' ? 'Обзор системы VendingPlus' : 'VendingPlus System Overview'}</h1>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} text-sm`}>
                      {language === 'ru' ? 'Мониторинг сети в реальном времени по Московской области' : 'Real-time network monitoring across Moscow Region'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2`}>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-bold uppercase tracking-wider">{language === 'ru' ? 'Система Online' : 'System Online'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: language === 'ru' ? 'Выручка (24ч)' : 'Revenue (24h)', value: `${(totalRevenue / 30).toLocaleString(undefined, { maximumFractionDigits: 0 })} ₽`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12.4%' },
                    { label: language === 'ru' ? 'Заказы (24ч)' : 'Orders (24h)', value: (MOCK_VENDING_MACHINES.length * 5.2).toFixed(0), icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', trend: '+8.1%' },
                    { label: language === 'ru' ? 'Активные точки' : 'Active Points', value: `${activePoints} / ${totalPoints}`, icon: MapIcon, color: 'text-green-600', bg: 'bg-green-50', trend: '98.2%' },
                    { label: language === 'ru' ? 'Средний чек' : 'Avg. Check', value: '184 ₽', icon: Coffee, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+2.5%' },
                  ].map((stat, i) => (
                    <div key={i} className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md group`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                          <stat.icon size={20} />
                        </div>
                        <span className={`text-xs font-bold ${stat.trend.includes('+') ? 'text-green-500' : 'text-blue-500'}`}>{stat.trend}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">{stat.label}</p>
                      <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                      <h3 className="font-bold mb-6 flex items-center gap-2">
                        <BarChart3 size={18} className="text-blue-600" />
                        {language === 'ru' ? 'Динамика продаж (неделя)' : 'Sales Dynamics (Week)'}
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={trafficData}>
                            <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <Tooltip 
                              contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="traffic" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                      <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Bell size={18} className="text-orange-600" />
                        {language === 'ru' ? 'Последние уведомления' : 'Recent Notifications'}
                      </h3>
                      <div className="space-y-4">
                        {[
                          { title: 'Низкий запас товара', desc: 'Автомат "Atrium Mall Floor 1" требует пополнения снеков.', time: '10 мин назад', type: 'warning' },
                          { title: 'Техническое обслуживание', desc: 'Запланирована проверка автомата в "Moscow City Tower A".', time: '1 час назад', type: 'info' },
                          { title: 'Рекорд выручки', desc: 'Точка "Sheremetyevo Aeroexpress" превысила дневной план на 40%.', time: '3 часа назад', type: 'success' },
                        ].map((note, i) => (
                          <div key={i} className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-50 border-slate-100'} flex items-start gap-4`}>
                            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${note.type === 'warning' ? 'bg-orange-500' : note.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-bold text-sm">{note.title}</p>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{note.time}</span>
                              </div>
                              <p className="text-xs text-slate-500">{note.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                      <h3 className="font-bold mb-6">{language === 'ru' ? 'Состояние сети' : 'Network Health'}</h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">{language === 'ru' ? 'Наполненность' : 'Stock Level'}</span>
                            <span className="text-xs font-bold">84%</span>
                          </div>
                          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: '84%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">{language === 'ru' ? 'Тех. исправность' : 'Technical Health'}</span>
                            <span className="text-xs font-bold">98.2%</span>
                          </div>
                          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: '98.2%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">{language === 'ru' ? 'Связь с точками' : 'Connectivity'}</span>
                            <span className="text-xs font-bold">95.5%</span>
                          </div>
                          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: '95.5%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white">
                      <Zap size={32} className="mb-4 opacity-50" />
                      <h3 className="font-bold text-lg mb-2">{language === 'ru' ? 'VendingPlus Premium' : 'VendingPlus Premium'}</h3>
                      <p className="text-sm text-indigo-100 leading-relaxed mb-4">
                        {language === 'ru' ? 'Ваша подписка активна. Доступны все функции аналитики и ИИ-прогнозирования.' : 'Your subscription is active. All analytics and AI forecasting features are available.'}
                      </p>
                      <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-all backdrop-blur-sm">
                        {language === 'ru' ? 'Управление тарифом' : 'Manage Plan'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'settings' ? (
              <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-8">{language === 'ru' ? 'Настройки VendingPlus' : 'VendingPlus Settings'}</h1>
                
                <div className="max-w-2xl space-y-8">
                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                      <Settings size={18} className="text-slate-400" />
                      {language === 'ru' ? 'Общие настройки' : 'General Settings'}
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm">{language === 'ru' ? 'Язык интерфейса' : 'Interface Language'}</p>
                          <p className="text-xs text-slate-500">{language === 'ru' ? 'Выберите основной язык приложения' : 'Choose the primary application language'}</p>
                        </div>
                        <select 
                          value={language}
                          onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}
                          className={`${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'} px-4 py-2 rounded-xl border text-sm outline-none`}
                        >
                          <option value="ru">Русский</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm">{language === 'ru' ? 'Тема оформления' : 'Theme'}</p>
                          <p className="text-xs text-slate-500">{language === 'ru' ? 'Переключение между светлой и темной темами' : 'Switch between light and dark themes'}</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                          <button 
                            onClick={() => setTheme('light')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'light' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                          >
                            {language === 'ru' ? 'Светлая' : 'Light'}
                          </button>
                          <button 
                            onClick={() => setTheme('dark')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'dark' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-400'}`}
                          >
                            {language === 'ru' ? 'Темная' : 'Dark'}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm">{language === 'ru' ? 'Уведомления' : 'Notifications'}</p>
                          <p className="text-xs text-slate-500">{language === 'ru' ? 'Получать пуш-уведомления о критических событиях' : 'Receive push notifications about critical events'}</p>
                        </div>
                        <button 
                          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                          className={`w-12 h-6 rounded-full transition-all relative ${notificationsEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notificationsEnabled ? 'left-7' : 'left-1'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                      <Zap size={18} className="text-yellow-500" />
                      {language === 'ru' ? 'Дополнительно' : 'Advanced'}
                    </h3>
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <p className="font-bold text-sm">{language === 'ru' ? 'Экспорт данных' : 'Data Export'}</p>
                        <p className="text-xs text-slate-500">{language === 'ru' ? 'Выгрузить отчеты в формате CSV или PDF' : 'Download reports in CSV or PDF format'}</p>
                      </button>
                      <button className="w-full text-left p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                        <p className="font-bold text-sm">{language === 'ru' ? 'Интеграции' : 'Integrations'}</p>
                        <p className="text-xs text-slate-500">{language === 'ru' ? 'Подключение внешних сервисов (1С, CRM)' : 'Connect external services (1C, CRM)'}</p>
                      </button>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">{language === 'ru' ? 'Поддержка' : 'Support'}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-all">
                            <Bot size={20} className="mb-2" />
                            <span className="text-[10px] font-bold uppercase">{language === 'ru' ? 'Чат с ИИ' : 'AI Chat'}</span>
                          </button>
                          <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-all">
                            <Users size={20} className="mb-2" />
                            <span className="text-[10px] font-bold uppercase">{language === 'ru' ? 'Справка' : 'Help'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">VendingPlus v2.4.0 • Made with ❤️ for Moscow Region</p>
                  </div>
                </div>
              </div>
            ) : activeTab === 'map' ? (
              <div className="flex-1 flex flex-col relative">
                <VendingMap 
                  center={mapCenter}
                  zoom={mapZoom}
                  layoutKey={`${isSidebarOpen}-${isAssistantOpen}`} 
                />
                
                {/* Floating Stats Overlay (only visible if map is large) */}
                {!isAssistantOpen && (
                  <div className="absolute top-4 left-4 z-[1000] flex gap-4">
                    <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl border border-slate-200 min-w-[150px]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Выручка сети</p>
                      <p className="text-xl font-bold text-blue-600">{totalRevenue.toLocaleString()} ₽</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl border border-slate-200 min-w-[150px]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Активных точек</p>
                      <p className="text-xl font-bold text-green-600">{activePoints} / {totalPoints}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'insights' ? (
              <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-8">{language === 'ru' ? 'Инсайты и рекомендации' : 'Insights & Recommendations'}</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                      <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Lightbulb size={18} className="text-yellow-500" />
                        {language === 'ru' ? 'Автоматические рекомендации по размещению' : 'Automatic Placement Recommendations'}
                      </h3>
                      
                      <div className="space-y-4">
                        {recommendations.length > 0 ? (
                          recommendations.map((rec, idx) => (
                            <motion.div 
                              key={rec.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`p-4 rounded-xl border flex items-center justify-between group transition-all cursor-pointer ${
                                theme === 'dark' ? 'bg-slate-700/50 border-slate-600 hover:border-blue-500' : 'bg-slate-50 border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'
                              }`}
                              onClick={() => {
                                setMapCenter([rec.lat, rec.lng]);
                                setMapZoom(16);
                                setActiveTab('map');
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  rec.type === 'traffic' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                  <MapPin size={24} />
                                </div>
                                <div>
                                  <p className="font-bold">{rec.reason}</p>
                                  <p className="text-xs text-slate-500">{language === 'ru' ? 'Координаты' : 'Coordinates'}: {rec.lat.toFixed(4)}, {rec.lng.toFixed(4)}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-blue-600">{language === 'ru' ? 'Оценка' : 'Score'}: {rec.score.toFixed(0)}%</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">{language === 'ru' ? 'Потенциал' : 'Potential'}</p>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-slate-400">{language === 'ru' ? 'Пока нет новых рекомендаций. Попробуйте поискать новые локации на карте.' : 'No new recommendations yet. Try searching for new locations on the map.'}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                      <h3 className="font-bold mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-green-600" />
                        {language === 'ru' ? 'Прогноз окупаемости' : 'ROI Forecast'}
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                        {language === 'ru' ? 'На основе текущих данных о трафике и выручке соседних точек, новые автоматы в рекомендованных зонах могут окупиться в среднем за 8-10 месяцев.' : 'Based on current traffic and revenue data from nearby points, new machines in recommended zones can pay off in an average of 8-10 months.'}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                          <p className="text-[10px] font-bold text-green-600 uppercase mb-1">{language === 'ru' ? 'Средний чек (прогноз)' : 'Avg. Receipt (Forecast)'}</p>
                          <p className="text-xl font-bold text-green-700">245 ₽</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">{language === 'ru' ? 'Трафик (прогноз)' : 'Traffic (Forecast)'}</p>
                          <p className="text-xl font-bold text-blue-700">~120 чел/час</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                      <h3 className="font-bold mb-4">{language === 'ru' ? 'История поиска' : 'Search History'}</h3>
                      <div className="space-y-2">
                        {searchHistory.length > 0 ? (
                          searchHistory.map((query, idx) => (
                            <div key={idx} className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer ${theme === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                              <Search size={14} className="text-slate-400" />
                              <span className="capitalize">{query}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-400 italic">{language === 'ru' ? 'История пуста' : 'History is empty'}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white">
                      <Bot size={32} className="mb-4 opacity-50" />
                      <h3 className="font-bold text-lg mb-2">{language === 'ru' ? 'Совет от ИИ' : 'AI Tip'}</h3>
                      <p className="text-sm text-blue-100 leading-relaxed">
                        {language === 'ru' ? '"Я заметил, что вы часто ищете места в районе Арбата. Там высокая концентрация туристов, но мало точек с горячей едой. Рекомендую рассмотреть установку комбинированного автомата."' : '"I noticed you often search for places in the Arbat area. There is a high concentration of tourists there, but few points with hot food. I recommend considering installing a combined machine."'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'analytics' ? (
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold">{language === 'ru' ? 'Глубокая аналитика сети' : 'Deep Network Analytics'}</h1>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} text-sm`}>
                      {language === 'ru' ? 'Детальный разбор показателей по всем 300 точкам' : 'Detailed breakdown of metrics across all 300 points'}
                    </p>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    {language === 'ru' ? 'Скачать отчет' : 'Download Report'}
                  </button>
                </div>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">{language === 'ru' ? 'Общая выручка' : 'Total Revenue'}</p>
                    <p className="text-2xl font-bold text-blue-600">{totalRevenue.toLocaleString()} ₽</p>
                    <p className="text-xs text-green-500 mt-2 flex items-center gap-1 font-bold">
                      <TrendingUp size={12} /> +12.5% {language === 'ru' ? 'к прошлому месяцу' : 'vs last month'}
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">{language === 'ru' ? 'Средняя выручка на точку' : 'Avg Revenue per Point'}</p>
                    <p className="text-2xl font-bold">{(totalRevenue / totalPoints).toLocaleString(undefined, { maximumFractionDigits: 0 })} ₽</p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">{language === 'ru' ? 'Базируется на' : 'Based on'} {totalPoints} {language === 'ru' ? 'точках' : 'points'}</p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">{language === 'ru' ? 'Эффективность сети' : 'Network Efficiency'}</p>
                    <p className="text-2xl font-bold text-green-600">{((activePoints / totalPoints) * 100).toFixed(1)}%</p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">{activePoints} {language === 'ru' ? 'активных' : 'active'} / {totalPoints - activePoints} {language === 'ru' ? 'на обслуживании' : 'maintenance'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                      <TrendingUp size={18} className="text-blue-600" />
                      {language === 'ru' ? 'Выручка по типам локаций' : 'Revenue by Location Type'}
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueChartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: theme === 'dark' ? '#334155' : '#f8fafc' }}
                            formatter={(value: number) => [`${value.toLocaleString()} ₽`, language === 'ru' ? 'Выручка' : 'Revenue']}
                          />
                          <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={24} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                      <Coffee size={18} className="text-purple-600" />
                      {language === 'ru' ? 'Распределение по типам' : 'Type Distribution'}
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={typeChartData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} width={60} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="count" fill="#9333ea" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                      <Users size={18} className="text-orange-600" />
                      {language === 'ru' ? 'Трафик в ключевых узлах' : 'Traffic in Key Hubs'}
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trafficData}>
                          <defs>
                            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="traffic" stroke="#f97316" fillOpacity={1} fill="url(#colorTraffic)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Top Machines List */}
                <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-6 rounded-2xl shadow-sm border`}>
                  <h3 className="font-bold mb-6 flex items-center gap-2">
                    <Zap size={18} className="text-yellow-500" />
                    {language === 'ru' ? 'Топ-10 самых прибыльных точек' : 'Top 10 Most Profitable Points'}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                          <th className="pb-4">{language === 'ru' ? 'Название' : 'Name'}</th>
                          <th className="pb-4">{language === 'ru' ? 'Тип' : 'Type'}</th>
                          <th className="pb-4">{language === 'ru' ? 'Локация' : 'Location'}</th>
                          <th className="pb-4">{language === 'ru' ? 'Выручка' : 'Revenue'}</th>
                          <th className="pb-4">{language === 'ru' ? 'Трафик' : 'Traffic'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                        {[...MOCK_VENDING_MACHINES]
                          .sort((a, b) => b.revenue - a.revenue)
                          .slice(0, 10)
                          .map((m) => (
                            <tr key={m.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                              <td className="py-4 font-bold text-sm">{m.name}</td>
                              <td className="py-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                                  m.type === 'coffee' ? 'bg-orange-100 text-orange-600' :
                                  m.type === 'snacks' ? 'bg-blue-100 text-blue-600' :
                                  m.type === 'food' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                                }`}>
                                  {m.type}
                                </span>
                              </td>
                              <td className="py-4 text-sm text-slate-500 capitalize">{m.locationType}</td>
                              <td className="py-4 font-bold text-sm text-blue-600">{m.revenue.toLocaleString()} ₽</td>
                              <td className="py-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden max-w-[60px]">
                                    <div className="h-full bg-orange-500" style={{ width: `${m.traffic}%` }}></div>
                                  </div>
                                  <span className="text-xs font-bold">{m.traffic}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Side: AI Assistant */}
          <motion.div 
            initial={false}
            animate={{ 
              width: isAssistantOpen ? 400 : 0,
              opacity: isAssistantOpen ? 1 : 0,
              marginRight: isAssistantOpen ? 32 : 0,
              marginLeft: isAssistantOpen ? 32 : 0
            }}
            className="shrink-0 my-8 overflow-hidden"
          >
            <div className="w-[400px] h-full">
              <ChatAssistant />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
