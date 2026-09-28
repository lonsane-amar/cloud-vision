import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  AlertTriangle, 
  MapPin, 
  Car, 
  Droplets, 
  CloudRain, 
  ShieldCheck, 
  Activity,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2
} from 'lucide-react';
import { CityLocation, UnifiedEvent, CityId } from '../types';
import { CITIES_CONFIG } from '../data/multiCityData';

interface AnalyticsViewProps {
  locations: CityLocation[];
  allLocations: CityLocation[];
  events: UnifiedEvent[];
  currentCityId: CityId;
  onSelectCity: (cityId: CityId) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ 
  locations, 
  allLocations,
  events,
  currentCityId,
  onSelectCity
}) => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'yesterday' | 'past_3d'>('today');

  const currentCityInfo = CITIES_CONFIG[currentCityId] || CITIES_CONFIG['pune'];

  // Verification tracking status counts
  const verifiedCount = events.filter((e) => e.verificationStatus === 'verified').length;
  const underVerificationCount = events.filter((e) => e.verificationStatus === 'under_verification').length;
  const duplicateSuppressedCount = events.reduce((sum, e) => sum + e.likelyDuplicatesCount, 0);

  // Compute metrics from current city locations
  const totalReports = locations.reduce((sum, l) => sum + l.citizenReportsCount, 0);
  const totalCriticalEvents = events.filter((e) => e.severity === 'Critical').length;
  const avgCongestion = Math.round(
    locations.reduce((sum, l) => sum + l.traffic.congestionPercent, 0) / (locations.length || 1)
  );
  const maxRainfall = Math.max(...locations.map((l) => l.weather.rainfallMmH), 0);

  // Cross-city vulnerability comparison
  const cityComparison = Object.values(CITIES_CONFIG).map((city) => {
    const cityLocs = allLocations.filter((l) => l.cityId === city.id);
    const avgRain = cityLocs.length
      ? Math.round(cityLocs.reduce((acc, l) => acc + l.weather.rainfallMmH, 0) / cityLocs.length)
      : 0;
    const maxDepth = cityLocs.length
      ? Math.max(...cityLocs.map((l) => l.waterlogging.depthInches))
      : 0;
    const avgCongest = cityLocs.length
      ? Math.round(cityLocs.reduce((acc, l) => acc + l.traffic.congestionPercent, 0) / cityLocs.length)
      : 0;
    const cityEvents = events.filter((e) => e.cityId === city.id);

    return {
      id: city.id,
      name: city.name,
      state: city.state,
      avgRain,
      maxDepth,
      avgCongest,
      eventCount: cityEvents.length,
      riskLevel: avgRain > 35 || maxDepth > 20 ? 'Critical' : avgRain > 15 ? 'High' : 'Moderate',
    };
  });

  // Event types breakdown across incidents
  const eventTypesData = [
    { type: 'Waterlogging', count: 48, percent: 36, color: '#06b6d4' },
    { type: 'Traffic Jam', count: 42, percent: 31, color: '#f59e0b' },
    { type: 'Flooding & Underpasses', count: 22, percent: 16, color: '#ef4444' },
    { type: 'Low Visibility & Fog', count: 14, percent: 10, color: '#818cf8' },
    { type: 'Fallen Tree & Obstruction', count: 9, percent: 7, color: '#10b981' },
  ];

  // Most affected corridors ranking in current view
  const rankedLocations = [...locations].sort(
    (a, b) => b.traffic.congestionPercent + b.waterlogging.depthInches * 2 - (a.traffic.congestionPercent + a.waterlogging.depthInches * 2)
  );

  // Hourly trend data: Rainfall (mm/h) vs Citizen Report Ingestion
  const hourlyTrend = [
    { hour: '02:00', rain: 6, reports: 3, verified: 1 },
    { hour: '04:00', rain: 18, reports: 12, verified: 6 },
    { hour: '06:00', rain: 35, reports: 24, verified: 18 },
    { hour: '08:00', rain: 48, reports: 42, verified: 36 },
    { hour: '10:00', rain: 44, reports: 38, verified: 31 },
    { hour: '12:00', rain: 32, reports: 26, verified: 22 },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-100 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800">
      {/* Analytics Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200">
              National Ground Intelligence
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {currentCityInfo.name} ({currentCityInfo.state}) Disaster Dashboard
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <span>Monsoon Ground Intelligence & Disruptions Index</span>
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Real-time quantitative analysis correlating meteorological Doppler radar reflectivity, citizen report volumes, verification status tracking, and road capacity degradation.
          </p>
        </div>

        {/* Date Filter Pill */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-300 self-start md:self-auto">
          {(['today', 'yesterday', 'past_3d'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeFilter === filter
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter === 'today' ? 'Today (Sep 19)' : filter === 'yesterday' ? 'Yesterday (Sep 18)' : 'Past 3 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Peak Ground Rainfall
          </span>
          <div className="text-2xl font-bold text-blue-700 flex items-baseline gap-1.5">
            <span>{maxRainfall}</span>
            <span className="text-xs font-normal text-slate-500">mm/h</span>
          </div>
          <span className="text-[10px] text-slate-500">Doppler Reflectivity &gt; 52 dBZ</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Critical Active Incidents
          </span>
          <div className="text-2xl font-bold text-red-700 flex items-baseline gap-1.5">
            <span>{totalCriticalEvents}</span>
            <span className="text-xs font-normal text-slate-500">fused hotspots</span>
          </div>
          <span className="text-[10px] text-red-700 font-semibold">Requiring municipal response</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Corridor Congestion
          </span>
          <div className="text-2xl font-bold text-amber-700 flex items-baseline gap-1.5">
            <span>{avgCongestion}%</span>
            <span className="text-xs font-normal text-slate-500">average load</span>
          </div>
          <span className="text-[10px] text-slate-500">Travel time delay: +48 mins</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Reports Processed
          </span>
          <div className="text-2xl font-bold text-emerald-700 flex items-baseline gap-1.5">
            <span>{totalReports}</span>
            <span className="text-xs font-normal text-slate-500">observations</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">
            {duplicateSuppressedCount} duplicate calls suppressed
          </span>
        </div>
      </div>

      {/* Verification Status Tracking Banner */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Verification Status Tracking & Evidence Corroboration</h3>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-semibold">
            Multi-Sensor Fused
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-300 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Incidents</span>
              </div>
              <div className="text-xl font-bold text-emerald-900">{verifiedCount} Events</div>
              <p className="text-[10px] text-emerald-700">Score &ge; 80% with Doppler + Visual evidence</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-300 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-amber-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Under Verification</span>
              </div>
              <div className="text-xl font-bold text-amber-900">{underVerificationCount} Events</div>
              <p className="text-[10px] text-amber-700">Awaiting secondary sensor corroboration</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-300 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-purple-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Duplicates Clustered</span>
              </div>
              <div className="text-xl font-bold text-purple-900">{duplicateSuppressedCount} Reports</div>
              <p className="text-[10px] text-purple-700">Suppressed to prevent call-center overload</p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-City Vulnerability & Risk Matrix */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Cross-City Ground Risk & Vulnerability Matrix</h3>
              <p className="text-xs text-slate-500">Click any city to switch focus instantly</p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-mono">6 Major Regions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cityComparison.map((city) => {
            const isCurrent = city.id === currentCityId;
            return (
              <button
                key={city.id}
                onClick={() => onSelectCity(city.id as CityId)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/30 shadow-xs'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-slate-900">{city.name}</span>
                    <span className="text-xs text-slate-500 ml-1">({city.state})</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    city.riskLevel === 'Critical'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : city.riskLevel === 'High'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {city.riskLevel}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Rainfall</span>
                    <span className="text-xs font-bold text-blue-700">{city.avgRain} mm/h</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Flood Depth</span>
                    <span className="text-xs font-bold text-teal-700">{city.maxDepth}"</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Congestion</span>
                    <span className="text-xs font-bold text-amber-800">{city.avgCongest}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Ranked Corridors & Hourly Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Vulnerable Corridors */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{currentCityInfo.name} High-Risk Corridors & Bottlenecks</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Real-Time Inundation</span>
          </div>

          <div className="space-y-3">
            {rankedLocations.slice(0, 5).map((loc, idx) => (
              <div
                key={loc.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{loc.name}</span>
                      <span className="text-[10px] text-slate-500">({loc.category})</span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      Choke: {loc.traffic.chokePoint}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-teal-700 font-mono">
                    {loc.waterlogging.depthInches}" <span className="text-[10px] text-slate-500">water</span>
                  </div>
                  <div className="text-[10px] text-red-700 font-bold">
                    {loc.traffic.congestionPercent}% congested
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Timeline Visualization */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Hourly Rainfall vs Verified Citizen Ingestion</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Today's Sequence</span>
          </div>

          <div className="space-y-3 pt-2">
            {hourlyTrend.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-600 font-semibold">{h.hour} IST</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-blue-700 font-bold">{h.rain} mm/h</span>
                    <span className="text-amber-800 font-medium">{h.reports} reports</span>
                    <span className="text-emerald-700 font-bold">{h.verified} verified</span>
                  </div>
                </div>
                {/* Bar visualization */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex gap-0.5 border border-slate-200">
                  <div
                    className="bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (h.rain / 50) * 60)}%` }}
                    title={`Rainfall: ${h.rain} mm/h`}
                  />
                  <div
                    className="bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (h.verified / 40) * 40)}%` }}
                    title={`Verified reports: ${h.verified}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
