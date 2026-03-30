export interface VendingMachine {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'coffee' | 'snacks' | 'combined' | 'water' | 'food';
  status: 'active' | 'maintenance' | 'offline';
  revenue: number;
  traffic: number;
  locationType: 'mall' | 'station' | 'office' | 'park' | 'street';
}

export const MOCK_VENDING_MACHINES: VendingMachine[] = [
  // Central Moscow
  { id: 'v1', name: 'Atrium Mall Floor 1', lat: 55.7580, lng: 37.6580, type: 'coffee', status: 'active', revenue: 4500, traffic: 95, locationType: 'mall' },
  { id: 'v2', name: 'Evropeiskiy Entrance', lat: 55.7410, lng: 37.5690, type: 'combined', status: 'active', revenue: 5200, traffic: 98, locationType: 'mall' },
  { id: 'v3', name: 'Kurskiy Station Platform', lat: 55.7570, lng: 37.6600, type: 'food', status: 'active', revenue: 3800, traffic: 92, locationType: 'station' },
  { id: 'v13', name: 'Tsvetnoy Central Market', lat: 55.7710, lng: 37.6200, type: 'coffee', status: 'active', revenue: 4100, traffic: 85, locationType: 'mall' },
  { id: 'v14', name: 'Okhotny Ryad Level -1', lat: 55.7560, lng: 37.6150, type: 'snacks', status: 'active', revenue: 4900, traffic: 99, locationType: 'mall' },
  
  // Business Districts
  { id: 'v4', name: 'Moscow City Tower A', lat: 55.7480, lng: 37.5370, type: 'coffee', status: 'active', revenue: 6100, traffic: 88, locationType: 'office' },
  { id: 'v5', name: 'White Square Office', lat: 55.7780, lng: 37.5880, type: 'water', status: 'active', revenue: 2200, traffic: 75, locationType: 'office' },
  { id: 'v15', name: 'Federation Tower Lobby', lat: 55.7495, lng: 37.5375, type: 'food', status: 'active', revenue: 5800, traffic: 90, locationType: 'office' },
  { id: 'v16', name: 'Arma Factory Cluster', lat: 55.7600, lng: 37.6630, type: 'coffee', status: 'active', revenue: 3500, traffic: 70, locationType: 'office' },
  
  // Parks & Leisure
  { id: 'v6', name: 'Gorky Park Fountain', lat: 55.7280, lng: 37.6010, type: 'snacks', status: 'active', revenue: 3100, traffic: 82, locationType: 'park' },
  { id: 'v7', name: 'VDNH Main Alley', lat: 55.8260, lng: 37.6370, type: 'combined', status: 'active', revenue: 4800, traffic: 90, locationType: 'park' },
  { id: 'v17', name: 'Sokolniki Entrance', lat: 55.7920, lng: 37.6760, type: 'water', status: 'active', revenue: 1800, traffic: 65, locationType: 'park' },
  { id: 'v18', name: 'Zaryadye Park Cafe', lat: 55.7510, lng: 37.6280, type: 'coffee', status: 'active', revenue: 5200, traffic: 95, locationType: 'park' },
  
  // Residential & Transport Hubs
  { id: 'v8', name: 'Mitino Metro Exit', lat: 55.8450, lng: 37.3600, type: 'coffee', status: 'maintenance', revenue: 1500, traffic: 65, locationType: 'street' },
  { id: 'v9', name: 'Vykhino Bus Stop', lat: 55.7150, lng: 37.8170, type: 'snacks', status: 'active', revenue: 2900, traffic: 85, locationType: 'street' },
  { id: 'v19', name: 'Komsomolskaya Square', lat: 55.7750, lng: 37.6550, type: 'food', status: 'active', revenue: 4200, traffic: 98, locationType: 'station' },
  { id: 'v20', name: 'Belorusskiy Station', lat: 55.7770, lng: 37.5810, type: 'coffee', status: 'active', revenue: 3900, traffic: 92, locationType: 'station' },
  
  // Moscow Region Clusters
  { id: 'v10', name: 'Podolsk Central Square', lat: 55.4312, lng: 37.5458, type: 'coffee', status: 'active', revenue: 2100, traffic: 78, locationType: 'street' },
  { id: 'v21', name: 'Podolsk Station Hub', lat: 55.4350, lng: 37.5600, type: 'snacks', status: 'active', revenue: 2500, traffic: 82, locationType: 'station' },
  { id: 'v11', name: 'Khimki IKEA Entrance', lat: 55.8941, lng: 37.4440, type: 'combined', status: 'active', revenue: 5500, traffic: 94, locationType: 'mall' },
  { id: 'v22', name: 'Khimki Mega Mall', lat: 55.9100, lng: 37.3970, type: 'food', status: 'active', revenue: 5100, traffic: 90, locationType: 'mall' },
  { id: 'v12', name: 'Odintsovo Station', lat: 55.6720, lng: 37.2820, type: 'coffee', status: 'active', revenue: 1900, traffic: 80, locationType: 'station' },
  { id: 'v23', name: 'Odintsovo Central Park', lat: 55.6789, lng: 37.2731, type: 'water', status: 'active', revenue: 1200, traffic: 60, locationType: 'park' },
  { id: 'v24', name: 'Mytishchi Station', lat: 55.9105, lng: 37.7331, type: 'coffee', status: 'active', revenue: 2800, traffic: 85, locationType: 'station' },
  { id: 'v25', name: 'Lyubertsy Market', lat: 55.6772, lng: 37.8932, type: 'snacks', status: 'active', revenue: 2400, traffic: 75, locationType: 'street' },
  { id: 'v26', name: 'Korolev Science Hub', lat: 55.9229, lng: 37.8542, type: 'coffee', status: 'active', revenue: 3200, traffic: 80, locationType: 'office' },
  { id: 'v27', name: 'Balashikha Mall', lat: 55.7963, lng: 37.9381, type: 'combined', status: 'active', revenue: 4500, traffic: 88, locationType: 'mall' },
  { id: 'v28', name: 'Krasnogorsk Crocus', lat: 55.8310, lng: 37.3284, type: 'food', status: 'active', revenue: 5900, traffic: 96, locationType: 'mall' },
  { id: 'v29', name: 'Elektrostal Plaza', lat: 55.7892, lng: 38.4422, type: 'coffee', status: 'active', revenue: 1800, traffic: 70, locationType: 'mall' },
  { id: 'v30', name: 'Kolomna Kremlin', lat: 55.0939, lng: 38.7670, type: 'snacks', status: 'active', revenue: 2100, traffic: 65, locationType: 'park' },
  { id: 'v31', name: 'Serpukhov Center', lat: 54.9191, lng: 37.4226, type: 'coffee', status: 'active', revenue: 1700, traffic: 68, locationType: 'street' },
  { id: 'v32', name: 'Orekhovo-Zuyevo Hub', lat: 55.8083, lng: 38.9772, type: 'combined', status: 'active', revenue: 2300, traffic: 72, locationType: 'station' },
  { id: 'v33', name: 'Noginsk Square', lat: 55.8544, lng: 38.4411, type: 'water', status: 'active', revenue: 1100, traffic: 55, locationType: 'street' },
  { id: 'v34', name: 'Shchelkovo Mall', lat: 55.9203, lng: 37.9981, type: 'coffee', status: 'active', revenue: 2900, traffic: 82, locationType: 'mall' },
  { id: 'v35', name: 'Dmitrov Central Market', lat: 56.3439, lng: 37.5203, type: 'food', status: 'active', revenue: 2100, traffic: 65, locationType: 'street' },
  { id: 'v36', name: 'Sergiyev Posad Lavra', lat: 56.3104, lng: 38.1297, type: 'coffee', status: 'active', revenue: 3500, traffic: 88, locationType: 'park' },
  { id: 'v37', name: 'Pushkino Station', lat: 56.0105, lng: 37.8452, type: 'snacks', status: 'active', revenue: 2700, traffic: 80, locationType: 'station' },
  { id: 'v38', name: 'Ramenskoye Plaza', lat: 55.5672, lng: 38.2258, type: 'combined', status: 'active', revenue: 3100, traffic: 75, locationType: 'mall' },
  { id: 'v39', name: 'Zhukovskiy Airport Hub', lat: 55.5617, lng: 38.1175, type: 'coffee', status: 'active', revenue: 4800, traffic: 92, locationType: 'station' },
  { id: 'v40', name: 'Domodedovo Terminal B', lat: 55.4103, lng: 37.9025, type: 'food', status: 'active', revenue: 6500, traffic: 98, locationType: 'station' },
  { id: 'v41', name: 'Vnukovo Entrance', lat: 55.5915, lng: 37.2615, type: 'coffee', status: 'active', revenue: 5900, traffic: 95, locationType: 'station' },
  { id: 'v42', name: 'Sheremetyevo Aeroexpress', lat: 55.9736, lng: 37.4125, type: 'combined', status: 'active', revenue: 7200, traffic: 99, locationType: 'station' },
  { id: 'v43', name: 'Solnechnogorsk Center', lat: 56.1833, lng: 36.9667, type: 'water', status: 'active', revenue: 1400, traffic: 55, locationType: 'street' },
  { id: 'v44', name: 'Klin Railway Station', lat: 56.3333, lng: 36.7167, type: 'coffee', status: 'active', revenue: 2200, traffic: 72, locationType: 'station' },
  { id: 'v45', name: 'Istra New Jerusalem', lat: 55.9167, lng: 36.8667, type: 'snacks', status: 'active', revenue: 1900, traffic: 60, locationType: 'park' },
  { id: 'v46', name: 'Chekhov Station', lat: 55.1500, lng: 37.4667, type: 'coffee', status: 'active', revenue: 2400, traffic: 78, locationType: 'station' },
  { id: 'v47', name: 'Stupino Mall', lat: 54.8833, lng: 38.0833, type: 'combined', status: 'active', revenue: 2800, traffic: 70, locationType: 'mall' },
  { id: 'v48', name: 'Dubna Science Park', lat: 56.7333, lng: 37.1667, type: 'coffee', status: 'active', revenue: 3100, traffic: 82, locationType: 'office' },
  { id: 'v49', name: 'Fryazino Tech Hub', lat: 55.9500, lng: 38.0500, type: 'snacks', status: 'active', revenue: 2100, traffic: 68, locationType: 'office' },
  { id: 'v50', name: 'Lytkarino Center', lat: 55.5833, lng: 37.9000, type: 'water', status: 'active', revenue: 1300, traffic: 50, locationType: 'street' },
  { id: 'v51', name: 'Dzerzhinskiy Square', lat: 55.6333, lng: 37.8500, type: 'coffee', status: 'active', revenue: 2500, traffic: 75, locationType: 'street' },
  { id: 'v52', name: 'Kotelniki Metro Hub', lat: 55.6667, lng: 37.8667, type: 'food', status: 'active', revenue: 4200, traffic: 94, locationType: 'station' },
  { id: 'v53', name: 'Reutov City Mall', lat: 55.7500, lng: 37.8500, type: 'combined', status: 'active', revenue: 3800, traffic: 88, locationType: 'mall' },
  { id: 'v54', name: 'Zheleznodorozhny Station', lat: 55.7500, lng: 38.0000, type: 'coffee', status: 'active', revenue: 2900, traffic: 85, locationType: 'station' },
  { id: 'v55', name: 'Lobnya Airport Access', lat: 56.0167, lng: 37.4667, type: 'snacks', status: 'active', revenue: 3300, traffic: 80, locationType: 'station' },
  { id: 'v56', name: 'Dolgoprudny MIPT', lat: 55.9333, lng: 37.5000, type: 'coffee', status: 'active', revenue: 3600, traffic: 85, locationType: 'office' },
  { id: 'v57', name: 'Khimki Khimki Mall', lat: 55.8833, lng: 37.4333, type: 'food', status: 'active', revenue: 4500, traffic: 92, locationType: 'mall' },
  { id: 'v58', name: 'Krasnoznamensk Hub', lat: 55.6000, lng: 37.0333, type: 'coffee', status: 'active', revenue: 1800, traffic: 65, locationType: 'office' },
  { id: 'v59', name: 'Golitsyno Station', lat: 55.6167, lng: 36.9833, type: 'snacks', status: 'active', revenue: 2100, traffic: 70, locationType: 'station' },
  { id: 'v60', name: 'Kubinka Tank Museum', lat: 55.5833, lng: 36.7167, type: 'water', status: 'active', revenue: 1500, traffic: 55, locationType: 'park' },
  { id: 'v61', name: 'Zelenograd Innovation Center', lat: 55.9833, lng: 37.1833, type: 'coffee', status: 'active', revenue: 4200, traffic: 88, locationType: 'office' },
  { id: 'v62', name: 'Zelenograd Mall', lat: 55.9900, lng: 37.2100, type: 'snacks', status: 'active', revenue: 3100, traffic: 80, locationType: 'mall' },
  { id: 'v63', name: 'Troitsk Science Hub', lat: 55.4833, lng: 37.3000, type: 'coffee', status: 'active', revenue: 2800, traffic: 75, locationType: 'office' },
  { id: 'v64', name: 'Shcherbinka Station', lat: 55.5000, lng: 37.5667, type: 'combined', status: 'active', revenue: 2500, traffic: 82, locationType: 'station' },
  { id: 'v65', name: 'Vidnoye Central Park', lat: 55.5500, lng: 37.7000, type: 'water', status: 'active', revenue: 1400, traffic: 60, locationType: 'park' },
  { id: 'v66', name: 'Vidnoye Station', lat: 55.5583, lng: 37.7167, type: 'coffee', status: 'active', revenue: 2900, traffic: 85, locationType: 'station' },
  { id: 'v67', name: 'Lukhovitsy Square', lat: 54.9167, lng: 39.0333, type: 'snacks', status: 'active', revenue: 1800, traffic: 55, locationType: 'street' },
  { id: 'v68', name: 'Zaraisk Kremlin', lat: 54.7500, lng: 38.8833, type: 'coffee', status: 'active', revenue: 2100, traffic: 62, locationType: 'park' },
  { id: 'v69', name: 'Kashira Station', lat: 54.8333, lng: 38.1500, type: 'food', status: 'active', revenue: 2300, traffic: 70, locationType: 'station' },
  { id: 'v70', name: 'Ozery Center', lat: 54.8500, lng: 38.5500, type: 'coffee', status: 'active', revenue: 1600, traffic: 58, locationType: 'street' },
  { id: 'v71', name: 'Naro-Fominsk Mall', lat: 55.3833, lng: 36.7333, type: 'combined', status: 'active', revenue: 3400, traffic: 78, locationType: 'mall' },
  { id: 'v72', name: 'Mozhaisk Hub', lat: 55.5000, lng: 36.0333, type: 'coffee', status: 'active', revenue: 1900, traffic: 65, locationType: 'station' },
  { id: 'v73', name: 'Ruza Square', lat: 55.7000, lng: 36.2000, type: 'snacks', status: 'active', revenue: 1500, traffic: 52, locationType: 'street' },
  { id: 'v74', name: 'Volokolamsk Center', lat: 56.0333, lng: 35.9500, type: 'coffee', status: 'active', revenue: 2200, traffic: 68, locationType: 'street' },
  { id: 'v75', name: 'Lotoshino Hub', lat: 56.2333, lng: 35.6333, type: 'water', status: 'active', revenue: 1100, traffic: 45, locationType: 'street' },
  { id: 'v76', name: 'Shakhovskaya Station', lat: 56.0333, lng: 35.5000, type: 'coffee', status: 'active', revenue: 1700, traffic: 60, locationType: 'station' },
  { id: 'v77', name: 'Taldom Square', lat: 56.7333, lng: 37.5333, type: 'snacks', status: 'active', revenue: 1400, traffic: 50, locationType: 'street' },
  { id: 'v78', name: 'Yakhroma Park', lat: 56.3000, lng: 37.4833, type: 'coffee', status: 'active', revenue: 3800, traffic: 85, locationType: 'park' },
  { id: 'v79', name: 'Lobnya Mall', lat: 56.0100, lng: 37.4800, type: 'food', status: 'active', revenue: 4100, traffic: 88, locationType: 'mall' },
  { id: 'v80', name: 'Khimki Business Park', lat: 55.9000, lng: 37.4200, type: 'coffee', status: 'active', revenue: 5200, traffic: 90, locationType: 'office' },
  // Additional Moscow Locations
  { id: 'v81', name: 'Taganskaya Square Hub', lat: 55.7415, lng: 37.6528, type: 'coffee', status: 'active', revenue: 4300, traffic: 94, locationType: 'street' },
  { id: 'v82', name: 'Paveletskaya Plaza', lat: 55.7298, lng: 37.6365, type: 'combined', status: 'active', revenue: 5100, traffic: 96, locationType: 'office' },
  { id: 'v83', name: 'Novoslobodskaya Entrance', lat: 55.7795, lng: 37.6012, type: 'snacks', status: 'active', revenue: 3200, traffic: 88, locationType: 'street' },
  { id: 'v84', name: 'Sokol Metro Exit', lat: 55.8052, lng: 37.5155, type: 'coffee', status: 'maintenance', revenue: 1200, traffic: 70, locationType: 'street' },
  { id: 'v85', name: 'VDNH Cosmos Pavilion', lat: 55.8345, lng: 37.6228, type: 'water', status: 'active', revenue: 2800, traffic: 85, locationType: 'park' },
  { id: 'v86', name: 'Luzhniki Stadium North', lat: 55.7195, lng: 37.5528, type: 'combined', status: 'active', revenue: 6500, traffic: 99, locationType: 'park' },
  { id: 'v87', name: 'Bauman University Hall', lat: 55.7662, lng: 37.6845, type: 'coffee', status: 'active', revenue: 3900, traffic: 92, locationType: 'office' },
  { id: 'v88', name: 'Danilovskiy Market', lat: 55.7115, lng: 37.6205, type: 'food', status: 'active', revenue: 5400, traffic: 95, locationType: 'street' },
  { id: 'v89', name: 'Moscow Zoo Entrance', lat: 55.7615, lng: 37.5772, type: 'snacks', status: 'active', revenue: 4700, traffic: 97, locationType: 'park' },
  { id: 'v90', name: 'Arbat Street Middle', lat: 55.7502, lng: 37.5925, type: 'coffee', status: 'active', revenue: 5800, traffic: 98, locationType: 'street' },
  
  // More Regional Locations
  { id: 'v91', name: 'Zelenograd Station', lat: 55.9805, lng: 37.1752, type: 'combined', status: 'active', revenue: 3100, traffic: 84, locationType: 'station' },
  { id: 'v92', name: 'Zelenograd Central Square', lat: 55.9925, lng: 37.2015, type: 'coffee', status: 'active', revenue: 2600, traffic: 78, locationType: 'street' },
  { id: 'v93', name: 'Khimki North Mall', lat: 55.9152, lng: 37.4125, type: 'food', status: 'active', revenue: 4900, traffic: 91, locationType: 'mall' },
  { id: 'v94', name: 'Mytishchi Arena', lat: 55.9125, lng: 37.7452, type: 'snacks', status: 'active', revenue: 3500, traffic: 86, locationType: 'park' },
  { id: 'v95', name: 'Korolev Central Park', lat: 55.9185, lng: 37.8225, type: 'water', status: 'active', revenue: 1900, traffic: 72, locationType: 'park' },
  { id: 'v96', name: 'Balashikha Station', lat: 55.7925, lng: 37.9452, type: 'coffee', status: 'active', revenue: 2800, traffic: 83, locationType: 'station' },
  { id: 'v97', name: 'Reutov Metro Hub', lat: 55.7525, lng: 37.8615, type: 'combined', status: 'active', revenue: 4200, traffic: 94, locationType: 'station' },
  { id: 'v98', name: 'Lyubertsy Mall A', lat: 55.6825, lng: 37.8815, type: 'food', status: 'active', revenue: 4600, traffic: 89, locationType: 'mall' },
  { id: 'v99', name: 'Kotelniki Bus Hub', lat: 55.6625, lng: 37.8552, type: 'coffee', status: 'active', revenue: 3700, traffic: 92, locationType: 'station' },
  { id: 'v100', name: 'Dzerzhinskiy Market', lat: 55.6285, lng: 37.8415, type: 'snacks', status: 'active', revenue: 2300, traffic: 76, locationType: 'street' },
  { id: 'v101', name: 'Vidnoye Mall', lat: 55.5525, lng: 37.7052, type: 'combined', status: 'active', revenue: 3200, traffic: 81, locationType: 'mall' },
  { id: 'v102', name: 'Domodedovo Terminal C', lat: 55.4125, lng: 37.9115, type: 'coffee', status: 'active', revenue: 6800, traffic: 99, locationType: 'station' },
  { id: 'v103', name: 'Podolsk North Hub', lat: 55.4425, lng: 37.5515, type: 'food', status: 'active', revenue: 2900, traffic: 84, locationType: 'station' },
  { id: 'v104', name: 'Shcherbinka Mall', lat: 55.5052, lng: 37.5715, type: 'snacks', status: 'active', revenue: 2400, traffic: 79, locationType: 'mall' },
  { id: 'v105', name: 'Troitsk Central', lat: 55.4885, lng: 37.3115, type: 'coffee', status: 'active', revenue: 2700, traffic: 74, locationType: 'street' },
  { id: 'v106', name: 'Vnukovo Terminal A', lat: 55.5952, lng: 37.2715, type: 'combined', status: 'active', revenue: 6200, traffic: 97, locationType: 'station' },
  { id: 'v107', name: 'Odintsovo Plaza', lat: 55.6752, lng: 37.2852, type: 'food', status: 'active', revenue: 3500, traffic: 86, locationType: 'mall' },
  { id: 'v108', name: 'Krasnogorsk Mall', lat: 55.8252, lng: 37.3352, type: 'coffee', status: 'active', revenue: 4100, traffic: 90, locationType: 'mall' },
  { id: 'v109', name: 'Mitino Park', lat: 55.8485, lng: 37.3515, type: 'water', status: 'active', revenue: 1800, traffic: 68, locationType: 'park' },
  { id: 'v110', name: 'Khimki IKEA B', lat: 55.8985, lng: 37.4485, type: 'snacks', status: 'active', revenue: 5300, traffic: 95, locationType: 'mall' },
  { id: 'v111', name: 'Dolgoprudny Station', lat: 55.9385, lng: 37.5115, type: 'coffee', status: 'active', revenue: 3200, traffic: 82, locationType: 'station' },
  { id: 'v120', name: 'Sergiyev Posad Station', lat: 56.3052, lng: 38.1352, type: 'combined', status: 'active', revenue: 3800, traffic: 89, locationType: 'station' },
  { id: 'v121', name: 'Dmitrov Station', lat: 56.3405, lng: 37.5252, type: 'coffee', status: 'active', revenue: 2400, traffic: 76, locationType: 'station' },
  { id: 'v122', name: 'Dubna Station', lat: 56.7385, lng: 37.1715, type: 'food', status: 'active', revenue: 2900, traffic: 80, locationType: 'station' },
  { id: 'v123', name: 'Klin Station Hub', lat: 56.3385, lng: 36.7215, type: 'snacks', status: 'active', revenue: 2100, traffic: 72, locationType: 'station' },
  { id: 'v124', name: 'Solnechnogorsk Station', lat: 56.1885, lng: 36.9715, type: 'coffee', status: 'active', revenue: 1800, traffic: 65, locationType: 'station' },
  { id: 'v125', name: 'Istra Station', lat: 55.9185, lng: 36.8715, type: 'combined', status: 'active', revenue: 2200, traffic: 70, locationType: 'station' },
  { id: 'v126', name: 'Mozhaisk Station', lat: 55.5052, lng: 36.0415, type: 'food', status: 'active', revenue: 1700, traffic: 62, locationType: 'station' },
  { id: 'v127', name: 'Naro-Fominsk Station', lat: 55.3885, lng: 36.7415, type: 'coffee', status: 'active', revenue: 2500, traffic: 75, locationType: 'station' },
  { id: 'v128', name: 'Chekhov Station Hub', lat: 55.1552, lng: 37.4715, type: 'snacks', status: 'active', revenue: 2300, traffic: 78, locationType: 'station' },
  { id: 'v129', name: 'Serpukhov Station Hub', lat: 54.9252, lng: 37.4315, type: 'combined', status: 'active', revenue: 2800, traffic: 82, locationType: 'station' },
  { id: 'v130', name: 'Stupino Station', lat: 54.8885, lng: 38.0915, type: 'coffee', status: 'active', revenue: 2100, traffic: 72, locationType: 'station' },
  { id: 'v131', name: 'Kashira Station Hub', lat: 54.8385, lng: 38.1615, type: 'food', status: 'active', revenue: 1900, traffic: 68, locationType: 'station' },
  { id: 'v132', name: 'Kolomna Station', lat: 55.0985, lng: 38.7715, type: 'snacks', status: 'active', revenue: 2400, traffic: 75, locationType: 'station' },
  { id: 'v133', name: 'Lukhovitsy Station', lat: 54.9215, lng: 39.0415, type: 'coffee', status: 'active', revenue: 1600, traffic: 60, locationType: 'station' },
  { id: 'v134', name: 'Zaraisk Station', lat: 54.7552, lng: 38.8915, type: 'combined', status: 'active', revenue: 1800, traffic: 64, locationType: 'station' },
  { id: 'v135', name: 'Ozery Station', lat: 54.8552, lng: 38.5615, type: 'food', status: 'active', revenue: 1500, traffic: 58, locationType: 'station' },
  { id: 'v136', name: 'Ramenskoye Station', lat: 55.5725, lng: 38.2315, type: 'coffee', status: 'active', revenue: 3200, traffic: 85, locationType: 'station' },
  { id: 'v137', name: 'Zhukovskiy Station Hub', lat: 55.5665, lng: 38.1215, type: 'snacks', status: 'active', revenue: 2900, traffic: 82, locationType: 'station' },
  { id: 'v138', name: 'Lyubertsy Station Hub', lat: 55.6825, lng: 37.8985, type: 'combined', status: 'active', revenue: 3500, traffic: 88, locationType: 'station' },
  { id: 'v139', name: 'Balashikha Station Hub', lat: 55.8015, lng: 37.9452, type: 'food', status: 'active', revenue: 3100, traffic: 84, locationType: 'station' },
  { id: 'v140', name: 'Reutov Station Hub', lat: 55.7552, lng: 37.8552, type: 'coffee', status: 'active', revenue: 3300, traffic: 86, locationType: 'station' },
  { id: 'v141', name: 'Zheleznodorozhny Station Hub', lat: 55.7552, lng: 38.0052, type: 'snacks', status: 'active', revenue: 2800, traffic: 83, locationType: 'station' },
  { id: 'v142', name: 'Elektrostal Station', lat: 55.7945, lng: 38.4485, type: 'combined', status: 'active', revenue: 2400, traffic: 76, locationType: 'station' },
  { id: 'v143', name: 'Noginsk Station Hub', lat: 55.8595, lng: 38.4485, type: 'coffee', status: 'active', revenue: 2600, traffic: 78, locationType: 'station' },
  { id: 'v144', name: 'Orekhovo-Zuyevo Station', lat: 55.8135, lng: 38.9815, type: 'food', status: 'active', revenue: 2900, traffic: 80, locationType: 'station' },
  { id: 'v145', name: 'Pavlovsky Posad Station', lat: 55.7785, lng: 38.6515, type: 'snacks', status: 'active', revenue: 2100, traffic: 72, locationType: 'station' },
  { id: 'v146', name: 'Likino-Dulyovo Station', lat: 55.7115, lng: 38.9515, type: 'coffee', status: 'active', revenue: 1800, traffic: 65, locationType: 'station' },
  { id: 'v147', name: 'Kurovskoye Station', lat: 55.5885, lng: 38.9115, type: 'combined', status: 'active', revenue: 1900, traffic: 68, locationType: 'station' },
  { id: 'v148', name: 'Shatura Station', lat: 55.5952, lng: 39.5415, type: 'food', status: 'active', revenue: 2200, traffic: 70, locationType: 'station' },
  { id: 'v149', name: 'Roshchal Station', lat: 55.6115, lng: 39.7515, type: 'coffee', status: 'active', revenue: 1600, traffic: 60, locationType: 'station' },
  { id: 'v150', name: 'Yegoryevsk Station', lat: 55.3815, lng: 39.0315, type: 'snacks', status: 'active', revenue: 2400, traffic: 74, locationType: 'station' },
  
  // New Batch 1: Moscow Metro & Hubs
  { id: 'v151', name: 'Sokolniki Metro Hub', lat: 55.7895, lng: 37.6795, type: 'coffee', status: 'active', revenue: 3800, traffic: 88, locationType: 'station' },
  { id: 'v152', name: 'VDNH Metro Entrance', lat: 55.8215, lng: 37.6415, type: 'snacks', status: 'active', revenue: 4200, traffic: 92, locationType: 'station' },
  { id: 'v153', name: 'Park Kultury Hub', lat: 55.7352, lng: 37.5925, type: 'combined', status: 'active', revenue: 4500, traffic: 94, locationType: 'station' },
  { id: 'v154', name: 'Oktyabrskaya Square', lat: 55.7295, lng: 37.6115, type: 'coffee', status: 'active', revenue: 3600, traffic: 85, locationType: 'street' },
  { id: 'v155', name: 'Polyanka Office Center', lat: 55.7385, lng: 37.6185, type: 'food', status: 'active', revenue: 4100, traffic: 80, locationType: 'office' },
  { id: 'v156', name: 'Tretyakovskaya Alley', lat: 55.7415, lng: 37.6285, type: 'coffee', status: 'active', revenue: 4800, traffic: 96, locationType: 'street' },
  { id: 'v157', name: 'Novokuznetskaya Hub', lat: 55.7395, lng: 37.6315, type: 'snacks', status: 'active', revenue: 3900, traffic: 90, locationType: 'station' },
  { id: 'v158', name: 'Kitay-Gorod Square', lat: 55.7567, lng: 37.6333, type: 'combined', status: 'active', revenue: 5200, traffic: 98, locationType: 'street' },
  { id: 'v159', name: 'Chistye Prudy Park', lat: 55.7645, lng: 37.6391, type: 'water', status: 'active', revenue: 2100, traffic: 75, locationType: 'park' },
  { id: 'v160', name: 'Lubyanka Plaza', lat: 55.7595, lng: 37.6255, type: 'coffee', status: 'active', revenue: 5500, traffic: 99, locationType: 'office' },
  
  // New Batch 2: Outer Moscow Districts
  { id: 'v161', name: 'Butovo Mall Floor 2', lat: 55.5450, lng: 37.5350, type: 'coffee', status: 'active', revenue: 3200, traffic: 82, locationType: 'mall' },
  { id: 'v162', name: 'Yasenevo Metro Hub', lat: 55.6050, lng: 37.5350, type: 'snacks', status: 'active', revenue: 2800, traffic: 78, locationType: 'station' },
  { id: 'v163', name: 'Teply Stan Market', lat: 55.6180, lng: 37.5050, type: 'food', status: 'active', revenue: 3500, traffic: 85, locationType: 'street' },
  { id: 'v164', name: 'Konkovo Office Park', lat: 55.6350, lng: 37.5150, type: 'coffee', status: 'active', revenue: 2900, traffic: 75, locationType: 'office' },
  { id: 'v165', name: 'Belyaevo Student Hub', lat: 55.6450, lng: 37.5250, type: 'combined', status: 'active', revenue: 3100, traffic: 80, locationType: 'street' },
  { id: 'v166', name: 'Kaluzhskaya Business Center', lat: 55.6550, lng: 37.5450, type: 'coffee', status: 'active', revenue: 4200, traffic: 88, locationType: 'office' },
  { id: 'v167', name: 'Novye Cheryomushki Mall', lat: 55.6700, lng: 37.5550, type: 'snacks', status: 'active', revenue: 3400, traffic: 82, locationType: 'mall' },
  { id: 'v168', name: 'Profsoyuznaya Hub', lat: 55.6780, lng: 37.5620, type: 'coffee', status: 'active', revenue: 2700, traffic: 76, locationType: 'station' },
  { id: 'v169', name: 'Akademicheskaya Square', lat: 55.6880, lng: 37.5750, type: 'water', status: 'active', revenue: 1500, traffic: 65, locationType: 'street' },
  { id: 'v170', name: 'Leninskiy Prospekt Hub', lat: 55.7080, lng: 37.5850, type: 'food', status: 'active', revenue: 3900, traffic: 90, locationType: 'station' },

  // New Batch 3: More Regional Points
  { id: 'v171', name: 'Zvenigorod Center', lat: 55.7333, lng: 36.8500, type: 'coffee', status: 'active', revenue: 1800, traffic: 60, locationType: 'street' },
  { id: 'v172', name: 'Volokolamsk Station Hub', lat: 56.0167, lng: 35.9333, type: 'snacks', status: 'active', revenue: 1500, traffic: 55, locationType: 'station' },
  { id: 'v173', name: 'Istra New Jerusalem B', lat: 55.9250, lng: 36.8450, type: 'water', status: 'active', revenue: 1200, traffic: 50, locationType: 'park' },
  { id: 'v174', name: 'Dedovsk Station', lat: 55.8950, lng: 37.1250, type: 'coffee', status: 'active', revenue: 2100, traffic: 68, locationType: 'station' },
  { id: 'v175', name: 'Nakhabino Hub', lat: 55.8450, lng: 37.1850, type: 'combined', status: 'active', revenue: 2400, traffic: 72, locationType: 'station' },
  { id: 'v176', name: 'Pavshino Station', lat: 55.8215, lng: 37.3450, type: 'food', status: 'active', revenue: 2800, traffic: 78, locationType: 'station' },
  { id: 'v177', name: 'Putilkovo Mall', lat: 55.8650, lng: 37.3950, type: 'coffee', status: 'active', revenue: 3500, traffic: 85, locationType: 'mall' },
  { id: 'v178', name: 'Khimki Levoberezhny', lat: 55.8950, lng: 37.4750, type: 'snacks', status: 'active', revenue: 2200, traffic: 70, locationType: 'street' },
  { id: 'v179', name: 'Dolgoprudny Vodniki', lat: 55.9550, lng: 37.4950, type: 'coffee', status: 'active', revenue: 1900, traffic: 65, locationType: 'station' },
  { id: 'v180', name: 'Lobnya Depo', lat: 56.0250, lng: 37.4550, type: 'water', status: 'active', revenue: 1100, traffic: 45, locationType: 'station' },
  
  // New Batch 4: Eastern Region
  { id: 'v181', name: 'Balashikha Zheleznodorozhny B', lat: 55.7450, lng: 38.0150, type: 'coffee', status: 'active', revenue: 2500, traffic: 75, locationType: 'street' },
  { id: 'v182', name: 'Staraya Kupavna Hub', lat: 55.8050, lng: 38.1850, type: 'snacks', status: 'active', revenue: 1800, traffic: 60, locationType: 'street' },
  { id: 'v183', name: 'Monino Station', lat: 55.8450, lng: 38.1950, type: 'food', status: 'active', revenue: 2100, traffic: 65, locationType: 'station' },
  { id: 'v184', name: 'Losino-Petrovsky Center', lat: 55.8750, lng: 38.2050, type: 'coffee', status: 'active', revenue: 1600, traffic: 55, locationType: 'street' },
  { id: 'v185', name: 'Fryazevo Hub', lat: 55.7250, lng: 38.4550, type: 'combined', status: 'active', revenue: 1900, traffic: 62, locationType: 'station' },
  { id: 'v186', name: 'Pavlovsky Posad Center', lat: 55.7850, lng: 38.6650, type: 'coffee', status: 'active', revenue: 2200, traffic: 68, locationType: 'street' },
  { id: 'v187', name: 'Drezna Station', lat: 55.7450, lng: 38.9850, type: 'snacks', status: 'active', revenue: 1400, traffic: 50, locationType: 'station' },
  { id: 'v188', name: 'Likino-Dulyovo Mall', lat: 55.7150, lng: 38.9650, type: 'food', status: 'active', revenue: 2600, traffic: 72, locationType: 'mall' },
  { id: 'v189', name: 'Shatura Center', lat: 55.5950, lng: 39.5150, type: 'coffee', status: 'active', revenue: 1700, traffic: 58, locationType: 'street' },
  { id: 'v190', name: 'Roshchal Hub', lat: 55.6150, lng: 39.7650, type: 'water', status: 'active', revenue: 1100, traffic: 42, locationType: 'street' },

  // New Batch 5: Southern Region
  { id: 'v191', name: 'Vidnoye Rastorguevo', lat: 55.5450, lng: 37.7250, type: 'coffee', status: 'active', revenue: 2300, traffic: 70, locationType: 'station' },
  { id: 'v192', name: 'Domodedovo Aviatsionny', lat: 55.4050, lng: 37.8450, type: 'snacks', status: 'active', revenue: 2800, traffic: 75, locationType: 'street' },
  { id: 'v193', name: 'Belye Stolby Hub', lat: 55.3250, lng: 37.8550, type: 'food', status: 'active', revenue: 1900, traffic: 60, locationType: 'station' },
  { id: 'v194', name: 'Barybino Station', lat: 55.2450, lng: 37.8950, type: 'coffee', status: 'active', revenue: 1600, traffic: 55, locationType: 'station' },
  { id: 'v195', name: 'Mikhnevo Hub', lat: 55.1250, lng: 37.9550, type: 'combined', status: 'active', revenue: 1800, traffic: 58, locationType: 'station' },
  { id: 'v196', name: 'Stupino North', lat: 54.9150, lng: 38.0750, type: 'coffee', status: 'active', revenue: 2100, traffic: 65, locationType: 'street' },
  { id: 'v197', name: 'Kashira Microdistrict', lat: 54.8450, lng: 38.2250, type: 'snacks', status: 'active', revenue: 1700, traffic: 52, locationType: 'street' },
  { id: 'v198', name: 'Ozery Park', lat: 54.8650, lng: 38.5450, type: 'water', status: 'active', revenue: 1200, traffic: 48, locationType: 'park' },
  { id: 'v199', name: 'Kolomna Shchurovo', lat: 55.0750, lng: 38.8350, type: 'food', status: 'active', revenue: 2400, traffic: 68, locationType: 'street' },
  { id: 'v200', name: 'Lukhovitsy North', lat: 54.9350, lng: 39.0250, type: 'coffee', status: 'active', revenue: 1500, traffic: 50, locationType: 'street' },

  // New Batch 6: Western Region
  { id: 'v201', name: 'Aprelevka Station', lat: 55.5450, lng: 37.0650, type: 'coffee', status: 'active', revenue: 2200, traffic: 68, locationType: 'station' },
  { id: 'v202', name: 'Selyatino Hub', lat: 55.5150, lng: 36.9850, type: 'snacks', status: 'active', revenue: 1800, traffic: 60, locationType: 'station' },
  { id: 'v203', name: 'Naro-Fominsk Center', lat: 55.3950, lng: 36.7550, type: 'food', status: 'active', revenue: 2600, traffic: 72, locationType: 'street' },
  { id: 'v204', name: 'Balabanovo Hub', lat: 55.1850, lng: 36.6550, type: 'coffee', status: 'active', revenue: 1900, traffic: 62, locationType: 'station' },
  { id: 'v205', name: 'Obninsk Station', lat: 55.1150, lng: 36.6150, type: 'combined', status: 'active', revenue: 3100, traffic: 80, locationType: 'station' },
  { id: 'v206', name: 'Maloyaroslavets Hub', lat: 55.0150, lng: 36.4650, type: 'coffee', status: 'active', revenue: 1700, traffic: 55, locationType: 'station' },
  { id: 'v207', name: 'Tuchkovo Station', lat: 55.6050, lng: 36.4750, type: 'snacks', status: 'active', revenue: 1500, traffic: 52, locationType: 'station' },
  { id: 'v208', name: 'Dorokhovo Hub', lat: 55.5550, lng: 36.3750, type: 'water', status: 'active', revenue: 1100, traffic: 45, locationType: 'station' },
  { id: 'v209', name: 'Mozhaisk Center', lat: 55.5150, lng: 36.0250, type: 'food', status: 'active', revenue: 2100, traffic: 60, locationType: 'street' },
  { id: 'v210', name: 'Uvarovka Station', lat: 55.5350, lng: 35.6150, type: 'coffee', status: 'active', revenue: 1300, traffic: 40, locationType: 'station' },

  // New Batch 7: Northern Region
  { id: 'v211', name: 'Iksha Station', lat: 56.1750, lng: 37.5050, type: 'coffee', status: 'active', revenue: 1600, traffic: 55, locationType: 'station' },
  { id: 'v212', name: 'Yakhroma Center', lat: 56.2950, lng: 37.4950, type: 'snacks', status: 'active', revenue: 1900, traffic: 62, locationType: 'street' },
  { id: 'v213', name: 'Dmitrov North', lat: 56.3550, lng: 37.5150, type: 'food', status: 'active', revenue: 2200, traffic: 68, locationType: 'street' },
  { id: 'v214', name: 'Taldom Center', lat: 56.7250, lng: 37.5250, type: 'coffee', status: 'active', revenue: 1400, traffic: 48, locationType: 'street' },
  { id: 'v215', name: 'Dubna Left Bank', lat: 56.7450, lng: 37.1550, type: 'combined', status: 'active', revenue: 2800, traffic: 75, locationType: 'street' },
  { id: 'v216', name: 'Kimry Station', lat: 56.8750, lng: 37.3550, type: 'coffee', status: 'active', revenue: 1700, traffic: 52, locationType: 'station' },
  { id: 'v217', name: 'Verbilki Hub', lat: 56.5350, lng: 37.5950, type: 'snacks', status: 'active', revenue: 1300, traffic: 45, locationType: 'station' },
  { id: 'v218', name: 'Zaprudnya Center', lat: 56.5650, lng: 37.4350, type: 'water', status: 'active', revenue: 1100, traffic: 40, locationType: 'street' },
  { id: 'v219', name: 'Sergiyev Posad North', lat: 56.3250, lng: 38.1450, type: 'food', status: 'active', revenue: 2500, traffic: 72, locationType: 'street' },
  { id: 'v220', name: 'Khotkovo Station', lat: 56.2550, lng: 37.9850, type: 'coffee', status: 'active', revenue: 2100, traffic: 65, locationType: 'station' },

  // New Batch 8: Filling Moscow Gaps
  { id: 'v221', name: 'Sokol Metro B', lat: 55.8080, lng: 37.5180, type: 'coffee', status: 'active', revenue: 3400, traffic: 82, locationType: 'station' },
  { id: 'v222', name: 'Aeroport Metro Hub', lat: 55.7995, lng: 37.5335, type: 'snacks', status: 'active', revenue: 3100, traffic: 80, locationType: 'station' },
  { id: 'v223', name: 'Dinamo Stadium Hub', lat: 55.7915, lng: 37.5585, type: 'food', status: 'active', revenue: 4500, traffic: 92, locationType: 'station' },
  { id: 'v224', name: 'Belorusskaya Square', lat: 55.7765, lng: 37.5825, type: 'coffee', status: 'active', revenue: 4200, traffic: 88, locationType: 'street' },
  { id: 'v225', name: 'Mayakovskaya Entrance', lat: 55.7695, lng: 37.5965, type: 'combined', status: 'active', revenue: 3900, traffic: 85, locationType: 'station' },
  { id: 'v226', name: 'Pushkinskaya Square', lat: 55.7655, lng: 37.6055, type: 'coffee', status: 'active', revenue: 5800, traffic: 99, locationType: 'street' },
  { id: 'v227', name: 'Chekhovskaya Hub', lat: 55.7645, lng: 37.6085, type: 'snacks', status: 'active', revenue: 4100, traffic: 94, locationType: 'station' },
  { id: 'v228', name: 'Tverskaya Street B', lat: 55.7615, lng: 37.6105, type: 'food', status: 'active', revenue: 5200, traffic: 97, locationType: 'street' },
  { id: 'v229', name: 'Okhotny Ryad B', lat: 55.7575, lng: 37.6155, type: 'coffee', status: 'active', revenue: 6500, traffic: 100, locationType: 'station' },
  { id: 'v230', name: 'Teatralnaya Square', lat: 55.7585, lng: 37.6185, type: 'combined', status: 'active', revenue: 5900, traffic: 98, locationType: 'street' },
  
  // New Batch 9: More Regional Hubs
  { id: 'v231', name: 'Ivanteyevka Station', lat: 55.9750, lng: 37.9250, type: 'coffee', status: 'active', revenue: 2100, traffic: 65, locationType: 'station' },
  { id: 'v232', name: 'Pushkino Mall', lat: 56.0150, lng: 37.8550, type: 'snacks', status: 'active', revenue: 3400, traffic: 82, locationType: 'mall' },
  { id: 'v233', name: 'Shchelkovo Hub B', lat: 55.9250, lng: 38.0050, type: 'food', status: 'active', revenue: 2800, traffic: 78, locationType: 'station' },
  { id: 'v234', name: 'Fryazino Station', lat: 55.9550, lng: 38.0450, type: 'coffee', status: 'active', revenue: 2300, traffic: 70, locationType: 'station' },
  { id: 'v235', name: 'Monino Hub B', lat: 55.8480, lng: 38.2010, type: 'combined', status: 'active', revenue: 1900, traffic: 62, locationType: 'station' },
  { id: 'v236', name: 'Losino-Petrovsky B', lat: 55.8780, lng: 38.2110, type: 'coffee', status: 'active', revenue: 1600, traffic: 55, locationType: 'street' },
  { id: 'v237', name: 'Elektrougli Station', lat: 55.7250, lng: 38.2250, type: 'snacks', status: 'active', revenue: 1400, traffic: 50, locationType: 'station' },
  { id: 'v238', name: 'Kupavna Station', lat: 55.7450, lng: 38.1850, type: 'food', status: 'active', revenue: 1700, traffic: 58, locationType: 'station' },
  { id: 'v239', name: 'Zheleznodorozhny Mall', lat: 55.7550, lng: 38.0150, type: 'coffee', status: 'active', revenue: 3100, traffic: 80, locationType: 'mall' },
  { id: 'v240', name: 'Reutov North', lat: 55.7650, lng: 37.8550, type: 'combined', status: 'active', revenue: 2600, traffic: 75, locationType: 'street' },

  // New Batch 10: Final regional points
  { id: 'v241', name: 'Krasnoznamensk Center', lat: 55.6050, lng: 37.0450, type: 'coffee', status: 'active', revenue: 1900, traffic: 62, locationType: 'street' },
  { id: 'v242', name: 'Golitsyno Hub B', lat: 55.6210, lng: 36.9910, type: 'snacks', status: 'active', revenue: 1700, traffic: 58, locationType: 'station' },
  { id: 'v243', name: 'Kubinka Center', lat: 55.5880, lng: 36.7210, type: 'food', status: 'active', revenue: 1500, traffic: 52, locationType: 'street' },
  { id: 'v244', name: 'Tuchkovo Hub B', lat: 55.6110, lng: 36.4810, type: 'coffee', status: 'active', revenue: 1400, traffic: 48, locationType: 'station' },
  { id: 'v245', name: 'Ruza Center B', lat: 55.7050, lng: 36.2110, type: 'combined', status: 'active', revenue: 1300, traffic: 45, locationType: 'street' },
  { id: 'v246', name: 'Volokolamsk Hub B', lat: 56.0380, lng: 35.9610, type: 'coffee', status: 'active', revenue: 1600, traffic: 55, locationType: 'street' },
  { id: 'v247', name: 'Lotoshino Center B', lat: 56.2380, lng: 35.6410, type: 'snacks', status: 'active', revenue: 1100, traffic: 40, locationType: 'street' },
  { id: 'v248', name: 'Shakhovskaya Hub B', lat: 56.0380, lng: 35.5110, type: 'food', status: 'active', revenue: 1200, traffic: 42, locationType: 'street' },
  { id: 'v249', name: 'Mozhaisk North', lat: 55.5250, lng: 36.0350, type: 'coffee', status: 'active', revenue: 1500, traffic: 50, locationType: 'street' },
  { id: 'v250', name: 'Vereya Center', lat: 55.3450, lng: 36.1850, type: 'combined', status: 'active', revenue: 1100, traffic: 38, locationType: 'street' },
  // New Batch 11: Filling more gaps in Moscow and Region
  { id: 'v251', name: 'Lubyanka Metro Hub', lat: 55.7590, lng: 37.6270, type: 'coffee', status: 'active', revenue: 5800, traffic: 98, locationType: 'station' },
  { id: 'v252', name: 'Kuznetsky Most Entrance', lat: 55.7610, lng: 37.6230, type: 'snacks', status: 'active', revenue: 4100, traffic: 92, locationType: 'station' },
  { id: 'v253', name: 'Tverskaya 12 Office', lat: 55.7630, lng: 37.6080, type: 'food', status: 'active', revenue: 4900, traffic: 88, locationType: 'office' },
  { id: 'v254', name: 'Novy Arbat Cinema', lat: 55.7520, lng: 37.5900, type: 'combined', status: 'active', revenue: 5200, traffic: 95, locationType: 'street' },
  { id: 'v255', name: 'Smolenskaya Square', lat: 55.7480, lng: 37.5830, type: 'coffee', status: 'active', revenue: 4500, traffic: 90, locationType: 'street' },
  { id: 'v256', name: 'Kropotkinskaya Hub', lat: 55.7450, lng: 37.6010, type: 'water', status: 'active', revenue: 2100, traffic: 75, locationType: 'station' },
  { id: 'v257', name: 'Park Kultury B', lat: 55.7350, lng: 37.5930, type: 'snacks', status: 'active', revenue: 3900, traffic: 88, locationType: 'station' },
  { id: 'v258', name: 'Frunzenskaya Office', lat: 55.7270, lng: 37.5800, type: 'coffee', status: 'active', revenue: 3600, traffic: 82, locationType: 'office' },
  { id: 'v259', name: 'Sportivnaya Metro', lat: 55.7230, lng: 37.5610, type: 'food', status: 'active', revenue: 3100, traffic: 80, locationType: 'station' },
  { id: 'v260', name: 'Vorobyovy Gory View', lat: 55.7100, lng: 37.5450, type: 'water', status: 'active', revenue: 2800, traffic: 90, locationType: 'park' },
  { id: 'v261', name: 'Universitet Hub', lat: 55.6920, lng: 37.5340, type: 'coffee', status: 'active', revenue: 4200, traffic: 92, locationType: 'station' },
  { id: 'v262', name: 'Prospekt Vernadskogo', lat: 55.6770, lng: 37.5050, type: 'snacks', status: 'active', revenue: 3400, traffic: 85, locationType: 'street' },
  { id: 'v263', name: 'Yugo-Zapadnaya Mall', lat: 55.6630, lng: 37.4830, type: 'combined', status: 'active', revenue: 4800, traffic: 94, locationType: 'mall' },
  { id: 'v264', name: 'Troparyovo Park', lat: 55.6480, lng: 37.4720, type: 'water', status: 'active', revenue: 1900, traffic: 70, locationType: 'park' },
  { id: 'v265', name: 'Rumyantsevo Office', lat: 55.6330, lng: 37.4410, type: 'coffee', status: 'active', revenue: 5100, traffic: 88, locationType: 'office' },
  { id: 'v266', name: 'Salaryevo Hub', lat: 55.6220, lng: 37.4250, type: 'food', status: 'active', revenue: 4500, traffic: 92, locationType: 'station' },
  { id: 'v267', name: 'Filatov Lug Metro', lat: 55.6010, lng: 37.4080, type: 'coffee', status: 'active', revenue: 2800, traffic: 75, locationType: 'station' },
  { id: 'v268', name: 'Prokshino Office', lat: 55.5860, lng: 37.4350, type: 'snacks', status: 'active', revenue: 2400, traffic: 70, locationType: 'office' },
  { id: 'v269', name: 'Olkhovaya Hub', lat: 55.5680, lng: 37.4730, type: 'combined', status: 'active', revenue: 3100, traffic: 78, locationType: 'station' },
  { id: 'v270', name: 'Kommunarka Center', lat: 55.5480, lng: 37.4870, type: 'coffee', status: 'active', revenue: 3500, traffic: 82, locationType: 'street' },
  { id: 'v271', name: 'Potapovo Station', lat: 55.5280, lng: 37.5050, type: 'food', status: 'active', revenue: 2900, traffic: 75, locationType: 'station' },
  { id: 'v272', name: 'Buninskaya Alleya', lat: 55.5380, lng: 37.5150, type: 'coffee', status: 'active', revenue: 2600, traffic: 72, locationType: 'station' },
  { id: 'v273', name: 'Ulitsa Gorchakova', lat: 55.5420, lng: 37.5310, type: 'snacks', status: 'active', revenue: 2300, traffic: 70, locationType: 'station' },
  { id: 'v274', name: 'Bulvar Admirala Ushakova', lat: 55.5450, lng: 37.5420, type: 'water', status: 'active', revenue: 1800, traffic: 65, locationType: 'station' },
  { id: 'v275', name: 'Ulitsa Skobelevskaya', lat: 55.5480, lng: 37.5540, type: 'coffee', status: 'active', revenue: 2700, traffic: 74, locationType: 'station' },
  { id: 'v276', name: 'Bitsevsky Park', lat: 55.5920, lng: 37.5450, type: 'combined', status: 'active', revenue: 2100, traffic: 68, locationType: 'park' },
  { id: 'v277', name: 'Lesoparkovaya Metro', lat: 55.5810, lng: 37.5750, type: 'food', status: 'active', revenue: 1900, traffic: 60, locationType: 'station' },
  { id: 'v278', name: 'Annino Hub', lat: 55.5830, lng: 37.5970, type: 'coffee', status: 'active', revenue: 3200, traffic: 80, locationType: 'station' },
  { id: 'v279', name: 'Ulitsa Akademika Yangelya', lat: 55.5950, lng: 37.6010, type: 'snacks', status: 'active', revenue: 2800, traffic: 75, locationType: 'station' },
  { id: 'v280', name: 'Prazhskaya Mall', lat: 55.6120, lng: 37.6050, type: 'combined', status: 'active', revenue: 4500, traffic: 92, locationType: 'mall' },
  { id: 'v281', name: 'Yuzhnaya Market', lat: 55.6220, lng: 37.6080, type: 'food', status: 'active', revenue: 3800, traffic: 88, locationType: 'street' },
  { id: 'v282', name: 'Chertanovskaya Hub', lat: 55.6410, lng: 37.6060, type: 'coffee', status: 'active', revenue: 3300, traffic: 84, locationType: 'station' },
  { id: 'v283', name: 'Sevastopolskaya Hub', lat: 55.6520, lng: 37.6080, type: 'snacks', status: 'active', revenue: 2900, traffic: 80, locationType: 'station' },
  { id: 'v284', name: 'Nagornaya Office', lat: 55.6730, lng: 37.6120, type: 'coffee', status: 'active', revenue: 2600, traffic: 72, locationType: 'office' },
  { id: 'v285', name: 'Nagatinskaya Hub', lat: 55.6830, lng: 37.6220, type: 'combined', status: 'active', revenue: 3500, traffic: 86, locationType: 'station' },
  { id: 'v286', name: 'Tulskaya Mall', lat: 55.7090, lng: 37.6220, type: 'food', status: 'active', revenue: 4900, traffic: 94, locationType: 'mall' },
  { id: 'v287', name: 'Serpukhovskaya Hub', lat: 55.7270, lng: 37.6240, type: 'coffee', status: 'active', revenue: 4100, traffic: 90, locationType: 'station' },
  { id: 'v288', name: 'Polyanka B', lat: 55.7380, lng: 37.6180, type: 'snacks', status: 'active', revenue: 3200, traffic: 82, locationType: 'street' },
  { id: 'v289', name: 'Borovitskaya Hub', lat: 55.7510, lng: 37.6080, type: 'coffee', status: 'active', revenue: 5500, traffic: 98, locationType: 'station' },
  { id: 'v290', name: 'Chekhovskaya B', lat: 55.7650, lng: 37.6090, type: 'combined', status: 'active', revenue: 4800, traffic: 95, locationType: 'station' },
  { id: 'v291', name: 'Mendeleevskaya Hub', lat: 55.7810, lng: 37.6010, type: 'food', status: 'active', revenue: 3900, traffic: 88, locationType: 'station' },
  { id: 'v292', name: 'Savyolovskaya Hub', lat: 55.7940, lng: 37.5880, type: 'coffee', status: 'active', revenue: 4500, traffic: 92, locationType: 'station' },
  { id: 'v293', name: 'Dmitrovskaya Hub', lat: 55.8070, lng: 37.5810, type: 'snacks', status: 'active', revenue: 3100, traffic: 84, locationType: 'station' },
  { id: 'v294', name: 'Timiryazevskaya Hub', lat: 55.8190, lng: 37.5750, type: 'coffee', status: 'active', revenue: 2800, traffic: 80, locationType: 'station' },
  { id: 'v295', name: 'Petrovsko-Razumovskaya', lat: 55.8360, lng: 37.5760, type: 'combined', status: 'active', revenue: 4200, traffic: 90, locationType: 'station' },
  { id: 'v296', name: 'Vladykino Hub', lat: 55.8480, lng: 37.5900, type: 'food', status: 'active', revenue: 3500, traffic: 86, locationType: 'station' },
  { id: 'v297', name: 'Otradnoye Mall', lat: 55.8630, lng: 37.6040, type: 'coffee', status: 'active', revenue: 3800, traffic: 88, locationType: 'mall' },
  { id: 'v298', name: 'Bibirevo Hub', lat: 55.8840, lng: 37.6030, type: 'snacks', status: 'active', revenue: 3100, traffic: 82, locationType: 'station' },
  { id: 'v299', name: 'Altufyevo Hub', lat: 55.8990, lng: 37.5860, type: 'coffee', status: 'active', revenue: 3400, traffic: 85, locationType: 'station' },
  { id: 'v300', name: 'Fiztekh Hub', lat: 55.9250, lng: 37.5450, type: 'combined', status: 'active', revenue: 2900, traffic: 78, locationType: 'station' },
];

export const TRAFFIC_POINTS: [number, number, number][] = [
  // High traffic areas
  [55.7558, 37.6173, 1.0], // Red Square
  [55.7410, 37.5690, 0.95], // Kievskaya
  [55.7580, 37.6580, 0.9], // Kurskaya
  [55.7480, 37.5370, 0.85], // Moscow City
  [55.7280, 37.6010, 0.8], // Gorky Park
  [55.8260, 37.6370, 0.85], // VDNH
  [55.9100, 37.3970, 0.9], // Khimki
  [55.4312, 37.5458, 0.75], // Podolsk
  [55.7780, 37.5880, 0.7], // Belorusskaya
  [55.8450, 37.3600, 0.65], // Mitino
  [55.7150, 37.8170, 0.7], // Vykhino
  [55.6720, 37.2820, 0.75], // Odintsovo
  [55.9105, 37.7331, 0.8], // Mytishchi
  [55.6772, 37.8932, 0.78], // Lyubertsy
  [55.9229, 37.8542, 0.7], // Korolev
  [55.7963, 37.9381, 0.82], // Balashikha
  [55.8310, 37.3284, 0.9], // Krasnogorsk
  [55.7892, 38.4422, 0.6], // Elektrostal
  [55.0939, 38.7670, 0.55], // Kolomna
  [54.9191, 37.4226, 0.58], // Serpukhov
  [55.8083, 38.9772, 0.62], // Orekhovo-Zuyevo
  [55.8544, 38.4411, 0.6], // Noginsk
  [55.9203, 37.9981, 0.7], // Shchelkovo
];
