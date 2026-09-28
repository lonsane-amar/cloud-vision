import React from 'react';
import { 
  CloudRain, 
  Droplets, 
  Wind, 
  Eye, 
  Car, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  Flame, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  Radio,
  ExternalLink,
  Info,
  Navigation
} from 'lucide-react';
import { PuneLocation, UnifiedEvent, CitizenReport, DetourCorridor } from '../types';
import { getDetourForLocation } from '../data/highwayDetourData';

interface SideIntelligencePanelProps {
  location: PuneLocation;
  events: UnifiedEvent[];
  citizenReports: CitizenReport[];
  onSelectEvent: (evt: UnifiedEvent) => void;
  onOpenReportModal: (locId: string) => void;
  onOpenDetour?: () => void;
  onSelectDetour?: (detour: DetourCorridor) => void;
  activeDetour?: DetourCorridor | null;
  onClose: () => void;
}

export const SideIntelligencePanel: React.FC<SideIntelligencePanelProps> = ({
  location,
  events,
  citizenReports,
  onSelectEvent,
  onOpenReportModal,
  onOpenDetour,
  onSelectDetour,
  activeDetour,
  onClose,
}) => {
  // Find unified events matching this location
  const locationEvents = events.filter((e) => e.locationId === location.id);
  // Find citizen reports specifically for this location, or fallback to city if empty
  const directLocationReports = citizenReports.filter((r) => r.locationId === location.id);
  const locationReports = directLocationReports.length > 0 
    ? directLocationReports 
    : citizenReports.filter((r) => r.cityId === location.cityId).slice(0, 3);

  // Detour for this location/hazard
  const locationDetour = getDetourForLocation(location.id, location.cityId);
  const hasProblem = location.waterlogging.depthInches > 8 || 
                     location.traffic.status === 'Gridlock' || 
                     (locationDetour && (locationDetour.hazardType === 'landslide' || locationDetour.hazardType === 'flash_flood'));

  // Derive dynamic weather-to-impact chain nodes based on location data
  const isHeavyRain = location.weather.rainfallMmH >= 25;
  const isFoggy = location.weather.visibilityM <= 300;
  const isHighWind = location.weather.windKmh >= 40;

  return (
    <aside 
      id="side-intelligence-panel"
      className="w-96 max-w-[calc(100vw-20px)] h-full bg-white border-l border-slate-200 shadow-xl flex flex-col z-20 overflow-hidden text-slate-800"
    >
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
              Corridor Telemetry
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              [{location.coordinates[0].toFixed(3)}, {location.coordinates[1].toFixed(3)}]
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 flex items-baseline gap-2 mt-0.5">
            <span>{location.name}</span>
            <span className="text-sm font-normal text-slate-600">
              {location.marathiName ? `(${location.marathiName})` : `[${location.cityName}]`}
            </span>
          </h2>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
            <span className="px-2 py-0.5 rounded bg-white border border-slate-300 font-medium text-slate-700 shadow-xs">
              {location.category}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Updated {location.lastUpdated}</span>
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors text-xs cursor-pointer"
          title="Minimize Panel"
        >
          ✕
        </button>
      </div>

      {/* Simulated Telemetry Alert Banner */}
      <div className="px-4 py-1.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-[11px] text-amber-900">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
          <span>Ground Telemetry Corroboration</span>
        </div>
        <span className="font-mono text-[10px] uppercase text-amber-800 font-semibold">Simulated AWS</span>
      </div>

      {/* Scrollable Intelligence Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Metric Grid: Weather Telemetry */}
        <section className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Meteorological Telemetry</span>
            <span className="text-blue-700 font-mono text-[10px] font-semibold">{location.weather.condition}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-500">Precipitation</div>
                <div className="text-base font-extrabold text-slate-900">
                  {location.weather.rainfallMmH} <span className="text-xs font-normal text-slate-500">mm/h</span>
                </div>
                <div className="text-[10px] text-blue-700 font-mono font-medium">{location.weather.radarReflectivityDbz} dBZ echo</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 flex-shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-500">Visibility</div>
                <div className="text-base font-extrabold text-slate-900">
                  {location.weather.visibilityM} <span className="text-xs font-normal text-slate-500">m</span>
                </div>
                <div className="text-[10px] text-slate-500">{location.weather.visibilityM < 500 ? 'Severe Fog Haze' : 'Fair Optical Path'}</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-500">Road Speed</div>
                <div className="text-base font-extrabold text-slate-900">
                  {location.traffic.avgSpeedKmh} <span className="text-xs font-normal text-slate-500">km/h</span>
                </div>
                <div className={`text-[10px] font-bold ${
                  location.traffic.status === 'Gridlock' ? 'text-red-700' : 'text-amber-700'
                }`}>
                  {location.traffic.status.toUpperCase()} ({location.traffic.congestionPercent}%)
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 flex-shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-500">Waterlogging</div>
                <div className="text-base font-extrabold text-slate-900">
                  {location.waterlogging.depthInches}" <span className="text-xs font-normal text-slate-500">depth</span>
                </div>
                <div className="text-[10px] text-cyan-700 font-semibold">{location.waterlogging.status}</div>
              </div>
            </div>
          </div>

          <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Choke Corridor:</span>
            <span className="font-semibold text-red-700 text-right line-clamp-1">{location.traffic.chokePoint}</span>
          </div>
        </section>

        {/* Dynamic Weather-to-Impact Relationship Visually */}
        <section className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Weather-to-Impact Cascade</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">
              Live Chain
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Real-time causal graph demonstrating how atmospheric readings propagate to ground bottlenecks:
          </p>

          {/* Connected Flow Chain */}
          <div className="space-y-1.5 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-300">
            {isHeavyRain ? (
              <>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></span>
                  <div className="font-bold text-blue-700">Heavy Rainfall Burst</div>
                  <div className="text-[11px] text-slate-600">{location.weather.rainfallMmH} mm/h cloudburst intensity</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-cyan-600 border-2 border-white"></span>
                  <div className="font-bold text-cyan-800">Surface Waterlogging</div>
                  <div className="text-[11px] text-slate-600">{location.waterlogging.depthInches}" standing water accumulation</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></span>
                  <div className="font-bold text-amber-800">Reduced Road Capacity</div>
                  <div className="text-[11px] text-slate-600">Inundated outer carriageway, only crown lanes usable</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-red-600 border-2 border-white"></span>
                  <div className="font-bold text-red-700">Traffic Gridlock</div>
                  <div className="text-[11px] text-slate-600">Avg speed collapsed to {location.traffic.avgSpeedKmh} km/h</div>
                </div>
              </>
            ) : isFoggy ? (
              <>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-slate-500 border-2 border-white"></span>
                  <div className="font-bold text-slate-800">Orographic Ghat Fog</div>
                  <div className="text-[11px] text-slate-600">Inversion cloud layer along hill slopes</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white"></span>
                  <div className="font-bold text-indigo-800">Low Optical Visibility</div>
                  <div className="text-[11px] text-slate-600">{location.weather.visibilityM} meters visibility distance</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></span>
                  <div className="font-bold text-amber-800">Reduced Driving Speed</div>
                  <div className="text-[11px] text-slate-600">Braking distance doubled on blind ghat curves</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-red-600 border-2 border-white"></span>
                  <div className="font-bold text-red-700">Traffic Disruption & Tailback</div>
                  <div className="text-[11px] text-slate-600">3km continuous slow queue over corridor</div>
                </div>
              </>
            ) : (
              <>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></span>
                  <div className="font-bold text-blue-700">Squally Weather</div>
                  <div className="text-[11px] text-slate-600">{location.weather.rainfallMmH} mm/h with gusts</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></span>
                  <div className="font-bold text-amber-800">Road Hazard Impedance</div>
                  <div className="text-[11px] text-slate-600">Puddling and drainage friction</div>
                </div>
                <div className="relative pl-7 text-xs">
                  <span className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-red-600 border-2 border-white"></span>
                  <div className="font-bold text-red-700">Traffic Flow Degradation</div>
                  <div className="text-[11px] text-slate-600">{location.traffic.congestionPercent}% road load</div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Contextual Alternate Path & Detour Engine for this Affected Region */}
        {hasProblem && locationDetour ? (
          <section className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-300 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                <span>Alternate Path Required</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold border border-emerald-300">
                {locationDetour.recommendedDetour.safetyScore}% Safe
              </span>
            </div>

            {/* Problem explanation */}
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-red-900">Problem Detected: </span>
                <span>{locationDetour.hazardDescription}</span>
              </div>
            </div>

            {/* Recommended Alternate Route */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-600">Recommended Bypass Corridor</div>
              <div className="text-xs font-black text-slate-900 leading-snug">
                {locationDetour.recommendedDetour.name}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <div className="p-1.5 rounded bg-white border border-slate-200 text-center">
                  <div className="text-[9px] text-slate-500">Distance</div>
                  <div className="text-xs font-bold text-emerald-700">{locationDetour.recommendedDetour.distanceKm} km</div>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200 text-center">
                  <div className="text-[9px] text-slate-500">Extra Time</div>
                  <div className="text-xs font-bold text-amber-700">+{locationDetour.recommendedDetour.etaDeltaMinutes} min</div>
                </div>
                <div className="p-1.5 rounded bg-white border border-slate-200 text-center">
                  <div className="text-[9px] text-slate-500">Avg Speed</div>
                  <div className="text-xs font-bold text-blue-700">{locationDetour.recommendedDetour.avgSpeedKmh} km/h</div>
                </div>
              </div>

              {/* Waypoints preview */}
              <div className="mt-2 space-y-1 bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                <div className="font-semibold text-slate-600 text-[10px] uppercase">Turn-by-turn Detour Waypoints:</div>
                {locationDetour.recommendedDetour.keyWaypoints.slice(0, 3).map((wp, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                    <span className="text-[10px] text-emerald-700 font-bold font-mono">{idx + 1}.</span>
                    <span className="line-clamp-1">{wp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-1.5 pt-1">
              {onSelectDetour && (
                <button
                  onClick={() => onSelectDetour(locationDetour)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    activeDetour?.id === locationDetour.id
                      ? 'bg-emerald-600 text-white font-black ring-2 ring-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>
                    {activeDetour?.id === locationDetour.id ? '✓ Showing Alternate Path on Map' : '🚗 Show Alternate Path on Map'}
                  </span>
                </button>
              )}

              {onOpenDetour && (
                <button
                  onClick={onOpenDetour}
                  className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  <span>Full Detour Navigator & Police Advisories</span>
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Corridor Flow Normal</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Water accumulation is below closure threshold ({location.waterlogging.depthInches}"). Standard roadways remain navigable without detour.
            </p>
          </section>
        )}

        {/* Active Weather-Related Unified Incidents */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span>Unified Incidents ({locationEvents.length})</span>
            <span className="text-red-600 font-semibold">Click to inspect</span>
          </div>

          {locationEvents.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
              No active critical incident logged for this zone.
            </div>
          ) : (
            locationEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="p-3.5 rounded-xl bg-white border border-red-200 hover:border-red-400 transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-50 text-red-700 border border-red-200">
                      {evt.severity}
                    </span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                      {evt.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
                </div>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {evt.reports[0]?.rawText || 'Waterlogging and severe congestion.'}
                </p>

                {/* Evidence Metrics Pill Bar */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    <strong className="text-slate-800">{evt.reportCount}</strong> reports ({evt.likelyDuplicatesCount} dups)
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">Evidence:</span>
                    <span className="font-extrabold text-red-700 font-mono bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                      {evt.evidenceScore}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Citizen Reports on this Corridor */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span>Recent Ground Reports ({locationReports.length})</span>
            <span className="text-blue-700 font-mono text-[10px] font-semibold">SLM Analyzed</span>
          </div>

          <div className="space-y-2">
            {locationReports.slice(0, 3).map((rep) => (
              <div key={rep.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-semibold text-slate-700">{rep.source}</span>
                  <span>{rep.timeAgo}</span>
                </div>
                <p className="text-slate-800 italic leading-snug">"{rep.rawText}"</p>
                {rep.slmExtracted && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-medium">
                      {rep.slmExtracted.event}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
                      {rep.slmExtracted.impact}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Report CTA for this location */}
        <div className="pt-2">
          <button
            onClick={() => onOpenReportModal(location.id)}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Submit Citizen Report for {location.name}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
