import React, { useState } from 'react';
import { 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Milestone, 
  Maximize2, 
  Car, 
  Truck, 
  ChevronRight, 
  ExternalLink,
  Copy,
  Info,
  Layers,
  Sparkles,
  MapPin,
  X
} from 'lucide-react';
import { DetourCorridor, DetourRoute, CityId } from '../types';
import { HIGHWAY_DETOUR_CORRIDORS } from '../data/highwayDetourData';

interface HighwayDetourNavigatorProps {
  currentCityId: CityId;
  activeDetour: DetourCorridor | null;
  onSelectDetour: (detour: DetourCorridor) => void;
  onFocusDetourOnMap: (detour: DetourCorridor) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const HighwayDetourNavigator: React.FC<HighwayDetourNavigatorProps> = ({
  currentCityId,
  activeDetour,
  onSelectDetour,
  onFocusDetourOnMap,
  isOpen,
  onClose,
}) => {
  const [selectedCityFilter, setSelectedCityFilter] = useState<CityId | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter corridors
  const filteredCorridors = HIGHWAY_DETOUR_CORRIDORS.filter((c) => {
    if (selectedCityFilter === 'all') return true;
    return c.cityId === selectedCityFilter;
  });

  const currentCorridor = activeDetour || filteredCorridors[0] || HIGHWAY_DETOUR_CORRIDORS[0];

  const handleCopyAdvisory = (corridor: DetourCorridor) => {
    const text = `[CloudVision Highway Detour Advisory]
Corridor: ${corridor.name} (${corridor.highwayCode})
Hazard: ${corridor.hazardDescription}
Recommended Detour: ${corridor.recommendedDetour.name}
ETA Delta: +${corridor.recommendedDetour.etaDeltaMinutes} mins (${corridor.recommendedDetour.distanceKm} km)
Key Waypoints: ${corridor.recommendedDetour.keyWaypoints.join(' -> ')}
Police/NHAI Advisory: ${corridor.nhaiAdvisory}`;
    navigator.clipboard.writeText(text);
    setCopiedId(corridor.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div 
        id="highway-detour-navigator-modal"
        className="bg-white border border-slate-300 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-800"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Highway & Urban Hazard Detour Engine
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Live Bypass Advisory
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Automated alternate path generation around waterlogged highways, ghat landslides, and road breaches.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              title="Close Navigator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* City / Corridor Filter Tabs */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <span className="text-slate-500 text-[11px] uppercase tracking-wider font-bold mr-1">
            Regions:
          </span>
          {[
            { id: 'all', label: 'All Corridors (6)' },
            { id: 'pune', label: 'Mumbai - Pune Expressway & Pune (2)' },
            { id: 'delhi', label: 'Delhi - Gurugram NH-48 (1)' },
            { id: 'kolkata', label: 'Kolkata Kona NH-16 (1)' },
            { id: 'bihar', label: 'Bihar NH-22 Ganga Setu (1)' },
            { id: 'bengaluru', label: 'Bengaluru Mysuru NH-275 (1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCityFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCityFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body: Sidebar List + Detour Detail View */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: List of Hazard Corridors */}
          <div className="md:col-span-4 border-r border-slate-200 bg-slate-50/70 overflow-y-auto p-3 space-y-2 max-h-[70vh]">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span>Active Hazard Corridors</span>
              <span className="text-blue-700 font-mono font-semibold">{filteredCorridors.length} detour paths</span>
            </div>

            {filteredCorridors.map((corridor) => {
              const isSelected = corridor.id === currentCorridor.id;
              return (
                <div
                  key={corridor.id}
                  onClick={() => {
                    onSelectDetour(corridor);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 group ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 shadow-xs ring-1 ring-blue-600/30'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase bg-slate-100 text-slate-700 font-mono border border-slate-300">
                          {corridor.highwayCode}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase ${
                          corridor.hazardType === 'landslide'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-teal-100 text-teal-800 border border-teal-200'
                        }`}>
                          {corridor.hazardType}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {corridor.name}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">{corridor.lastUpdated}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {corridor.hazardDescription}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[10px]">
                    <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>+{corridor.recommendedDetour.etaDeltaMinutes}m detour</span>
                    </div>
                    <span className="text-slate-500 font-mono font-bold">
                      {corridor.recommendedDetour.safetyScore}% safe
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Detour Visualization & Actions */}
          <div className="md:col-span-8 overflow-y-auto p-4 sm:p-6 space-y-6 max-h-[70vh] bg-white">
            {/* Corridor Main Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  {currentCorridor.highwayCode}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentCorridor.regionName}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-emerald-700 font-mono font-bold">
                  Updated {currentCorridor.lastUpdated}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentCorridor.name}
              </h3>
            </div>

            {/* Side-by-Side Comparison: Hazard Choke vs Recommended Bypass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Blocked / Hazard Segment Card */}
              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Hazard Choke (Avoid)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-100 text-red-800 border border-red-300">
                    {currentCorridor.blockedSegment.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-red-950">
                    {currentCorridor.blockedSegment.name}
                  </h4>
                  {currentCorridor.blockedSegment.inundationDepthInches && (
                    <div className="text-xs text-red-700 font-mono mt-0.5 font-bold">
                      Submergence: {currentCorridor.blockedSegment.inundationDepthInches} inches
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCorridor.blockedSegment.hazardNote}
                </p>

                <div className="p-2.5 rounded-lg bg-red-100/60 border border-red-200 text-[11px] text-red-900">
                  ⚠️ Estimated standstill delay: <strong>120+ minutes</strong> with risk of recurring rockfall / hydraulic damage.
                </div>
              </div>

              {/* Recommended Detour Route Card */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Recommended Alternate Path</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                    {currentCorridor.recommendedDetour.safetyScore}% Safety Rating
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    {currentCorridor.recommendedDetour.name}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-emerald-800 font-mono mt-0.5 font-semibold">
                    <span>+{currentCorridor.recommendedDetour.etaDeltaMinutes} mins ETA</span>
                    <span>•</span>
                    <span>{currentCorridor.recommendedDetour.distanceKm} km</span>
                    <span>•</span>
                    <span>{currentCorridor.recommendedDetour.avgSpeedKmh} km/h avg</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCorridor.recommendedDetour.roadCondition}
                </p>

                <div className="p-2.5 rounded-lg bg-emerald-100/60 border border-emerald-200 text-[11px] text-emerald-900">
                  ✅ Verified ground corridor: Stormwater culverts running free, structural retention walls intact.
                </div>
              </div>
            </div>

            {/* Turn-by-Turn Waypoint Navigation Sequence */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Milestone className="w-4 h-4 text-emerald-600" />
                  <span>Turn-by-Turn Detour Waypoint Guidance</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-mono">
                  {currentCorridor.recommendedDetour.keyWaypoints.length} waypoints
                </span>
              </div>

              <div className="space-y-2">
                {currentCorridor.recommendedDetour.keyWaypoints.map((wp, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200 text-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center text-[10px] font-bold font-mono mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-slate-800">{wp}</span>
                    </div>
                    {idx < currentCorridor.recommendedDetour.keyWaypoints.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary / Heavy Commercial Bypass (if present) */}
            {currentCorridor.alternativeDetour && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    <span>Heavy Commercial & Multi-Axle Bypass</span>
                  </h4>
                  <span className="text-xs text-blue-700 font-mono font-semibold">
                    +{currentCorridor.alternativeDetour.etaDeltaMinutes}m • {currentCorridor.alternativeDetour.distanceKm} km
                  </span>
                </div>
                <div className="text-xs font-bold text-blue-950">
                  {currentCorridor.alternativeDetour.name}
                </div>
                <p className="text-xs text-slate-700">
                  {currentCorridor.alternativeDetour.advisory}
                </p>
              </div>
            )}

            {/* Official Police / NHAI Advisory */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-900">Official Agency Telemetry:</span>
                <p className="text-slate-700 leading-relaxed">
                  {currentCorridor.nhaiAdvisory}
                </p>
                {currentCorridor.policeEscortActive && (
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-mono mt-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Highway Police Patrol Convoy Operating on Detour</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <button
                onClick={() => handleCopyAdvisory(currentCorridor)}
                className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedId === currentCorridor.id ? 'Copied to Clipboard!' : 'Copy Detour Advisory'}</span>
              </button>

              <button
                onClick={() => {
                  onFocusDetourOnMap(currentCorridor);
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Render & Focus Path on Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
