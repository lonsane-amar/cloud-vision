import React, { useState } from 'react';
import { 
  Sparkles, 
  GitMerge, 
  Layers, 
  Copy, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Users, 
  ShieldCheck, 
  AlertTriangle,
  RefreshCw,
  Zap,
  Filter
} from 'lucide-react';
import { UnifiedEvent } from '../types';

interface EventFusionVisualizerProps {
  events: UnifiedEvent[];
  onOpenReportModal: (locId: string) => void;
}

export const EventFusionVisualizer: React.FC<EventFusionVisualizerProps> = ({
  events,
  onOpenReportModal,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('evt-sinhagad-waterlogging');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedReportCount, setSimulatedReportCount] = useState<number>(33);

  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleSimulateNewIncoming = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedReportCount((prev) => prev + 1);
      setIsSimulating(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-slate-100 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200">
              Core Intelligence Engine
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Deterministic Spatial-Semantic Aggregation
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <GitMerge className="w-6 h-6 text-blue-600" />
            <span>Event Fusion Architecture: {simulatedReportCount} Reports → 1 Unified Event</span>
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            Eliminates emergency call-center overload and panic. Instead of bombarding dispatchers with 33 individual chaotic reports, CloudVision continuously fuses nearby spatiotemporal observations into a single verified, evidence-weighted operational incident.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={handleSimulateNewIncoming}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>Simulate Incoming Citizen Report</span>
          </button>
        </div>
      </div>

      {/* Interactive Corridors Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
          Target Incident:
        </span>
        {events.map((evt) => (
          <button
            key={evt.id}
            onClick={() => setSelectedEventId(evt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedEventId === evt.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {evt.locationName.split('(')[0].trim()} ({evt.reportCount} reports)
          </button>
        ))}
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Active Fusion Pipeline: {activeEvent.locationName}</span>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-semibold">
            Deduplication Efficiency: 67% Noise Filtered
          </span>
        </div>

        {/* 3-Stage Diagram: Raw Reports -> Clustered Micro-Zones -> Unified Master Incident */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Column 1: Raw Reports & Micro Clusters (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>1. Incoming Micro-Clusters</span>
              <span className="text-blue-700 font-mono text-[10px] font-bold">{simulatedReportCount} Submissions</span>
            </div>

            {/* Cluster 1 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Cluster A: Pu La Deshpande Garden</span>
                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
                  14 reports
                </span>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                "paani bhar gaya hai aur traffic almost stopped hai near garden..."
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>10 duplicates identified</span>
                <span className="text-emerald-700 font-semibold">4 indep. sources</span>
              </div>
            </div>

            {/* Cluster 2 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Cluster B: Rajaram Bridge Ramp</span>
                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
                  12 reports
                </span>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                "Rajaram bridge paryant 2 foot paani, gaadya band padlya..."
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>8 duplicates identified</span>
                <span className="text-emerald-700 font-semibold">4 indep. sources</span>
              </div>
            </div>

            {/* Cluster 3 */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Cluster C: Manik Baug Chowk</span>
                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
                  7 reports
                </span>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                "PMPML buses stranded at Manik baug, avoid completely..."
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>4 duplicates identified</span>
                <span className="text-emerald-700 font-semibold">3 indep. sources</span>
              </div>
            </div>
          </div>

          {/* Column 2: The Fusion Engine Funnel (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-blue-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Spatiotemporal Deduplicator</div>
              <p className="text-[10px] text-slate-600 mt-1">
                Radius &lt; 450m • Time &lt; 25m • Embedding Cosine &gt; 0.88
              </p>
            </div>

            <div className="w-full space-y-1.5 text-[10px] font-mono text-left bg-white p-2.5 rounded-lg border border-slate-200">
              <div className="text-blue-700 font-semibold">✓ 22 Duplicates Suppressed</div>
              <div className="text-emerald-700 font-semibold">✓ 11 Independent Sources Kept</div>
              <div className="text-amber-700 font-semibold">✓ IMD 42.5mm/h Corroborated</div>
              <div className="text-red-700 font-semibold">✓ PMPML Speed Delay Synced</div>
            </div>

            <ArrowRight className="w-5 h-5 text-blue-600 hidden lg:block" />
          </div>

          {/* Column 3: The Unified Master Incident (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white border-2 border-red-300 shadow-md space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-red-600 text-white font-bold text-[10px] uppercase rounded-bl-xl tracking-wider">
              Unified Single Incident
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
                Authoritative Master Entity
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {activeEvent.title}
              </h3>
              <div className="text-xs text-slate-600">
                Corridor: {activeEvent.locationName}
              </div>
            </div>

            {/* Evidence Score Indicator */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  Dynamic Evidence Score
                </span>
                <span className="text-xs text-amber-800 font-medium">Corroboration strength</span>
              </div>
              <div className="text-2xl font-bold text-red-700 font-mono">
                {activeEvent.evidenceScore}%
              </div>
            </div>

            {/* Fused Incident Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Report Density</span>
                <span className="font-bold text-slate-900">{simulatedReportCount} Submissions</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Dispatch Action</span>
                <span className="font-bold text-emerald-700">PMC Ward 13 Pump Sent</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenReportModal(activeEvent.locationId)}
                className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                + Add Real-Time Report to this Cluster
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
