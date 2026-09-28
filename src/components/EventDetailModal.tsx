import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Users, 
  Copy, 
  Camera, 
  CloudRain, 
  Car, 
  Droplets, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Info,
  CheckCircle,
  FileText,
  Share2
} from 'lucide-react';
import { UnifiedEvent } from '../types';

interface EventDetailModalProps {
  event: UnifiedEvent | null;
  onClose: () => void;
  onOpenReportModal: (locId: string) => void;
  onOpenDetour?: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onOpenReportModal,
  onOpenDetour,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'evidence' | 'timeline' | 'impact'>('overview');

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        id="event-detail-modal"
        className="bg-white border border-slate-300 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-800"
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wide ${
                event.severity === 'Critical'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {event.severity} Priority
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {event.status}
              </span>
              <span className="text-xs text-slate-600 flex items-center gap-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {event.locationName}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {event.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDetour && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDetour();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <span>🛣️ Safe Detour</span>
              </button>
            )}
            <button
              onClick={() => onOpenReportModal(event.locationId)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <span>+ Corroborate Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Evidence Score Banner & Disclaimer */}
        <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex flex-col items-center justify-center text-white shadow-sm">
              <span className="text-base font-bold leading-none">{event.evidenceScore}%</span>
              <span className="text-[8px] font-bold uppercase tracking-tighter">SCORE</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Dynamic Corroboration Evidence Score</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">
                  Multi-Source Fused
                </span>
              </div>
              <p className="text-[11px] text-amber-800 font-semibold">
                *Clearly noted: Represents corroboration strength rather than absolute truth.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-700">
            <div className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-center">
              <span className="text-[10px] text-slate-500 block">Total Reports</span>
              <span className="font-bold text-slate-900">{event.reportCount}</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-center">
              <span className="text-[10px] text-slate-500 block">Indep. Sources</span>
              <span className="font-bold text-blue-700">{event.independentSourcesCount}</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-center">
              <span className="text-[10px] text-slate-500 block">Likely Duplicates</span>
              <span className="font-bold text-amber-700">{event.likelyDuplicatesCount}</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Intelligence Overview' },
            { id: 'impact', label: 'Weather-to-Impact Chain' },
            { id: 'reports', label: `Citizen Reports (${event.reports.length})` },
            { id: 'evidence', label: 'Evidence Score Breakdown' },
            { id: 'timeline', label: 'Operational Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Weather & Ground Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase mb-1">
                    <CloudRain className="w-4 h-4" />
                    <span>Atmospheric State</span>
                  </div>
                  <div className="text-base font-bold text-slate-900">{event.rainfallMmH} mm/h</div>
                  <div className="text-xs text-slate-600">{event.weatherCondition}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase mb-1">
                    <Droplets className="w-4 h-4" />
                    <span>Water Inundation</span>
                  </div>
                  <div className="text-base font-bold text-slate-900">21.5 inches</div>
                  <div className="text-xs text-slate-600">Mutha canal surcharge / road crown submerged</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase mb-1">
                    <Car className="w-4 h-4" />
                    <span>Traffic Impact</span>
                  </div>
                  <div className="text-base font-bold text-slate-900">3.5 km/h (Gridlock)</div>
                  <div className="text-xs text-slate-600">PMPML transit stalled / 3,400+ commuters delayed</div>
                </div>
              </div>

              {/* Affected Road Corridors */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Affected Road Segments & Access Ramps
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.affectedRoads.map((road, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-1.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{road}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Ground Photo Evidence Gallery */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Ground Photo Evidence ({event.images.length})
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Verified by Geo-Tag Telemetry</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {event.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="group rounded-xl overflow-hidden bg-slate-50 border border-slate-200 relative shadow-xs"
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-2.5 bg-white text-xs space-y-0.5 border-t border-slate-200">
                        <div className="text-slate-900 font-semibold line-clamp-1">{img.caption}</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>{img.author}</span>
                          <span>{img.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEATHER TO IMPACT CHAIN */}
          {activeTab === 'impact' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Causal Weather-to-Impact Pathway</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold">
                    Deterministic Graph
                  </span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CloudVision proves how meteorological sensor anomalies directly propagate across urban infrastructure:
                  <strong> Heavy Rain → Waterlogging → Reduced Road Capacity → Severe Traffic Congestion</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
                {event.impactChain.map((node, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Stage 0{idx + 1}: {node.stage}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        node.status === 'critical' ? 'bg-red-600 animate-ping' : 'bg-amber-500'
                      }`} />
                    </div>

                    <div className="text-sm font-bold text-slate-900">{node.label}</div>
                    <div className="text-base font-bold text-blue-700 font-mono">{node.value}</div>
                    <p className="text-[11px] text-slate-600 leading-normal">{node.metric}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CITIZEN REPORTS & DUPLICATES */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">Event Fusion Deduplication Summary:</span>
                  <p className="text-slate-600 mt-0.5">
                    {event.reportCount} total submissions clustered into 1 master event. {event.likelyDuplicatesCount} redundant reports filtered to prevent dispatcher fatigue.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {event.reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-700">{rep.source}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{rep.timeAgo}</span>
                      </div>
                      {rep.isDuplicate ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          <span>Fused Duplicate (Cosine: {rep.duplicateSimilarityScore || '0.92'})</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Independent Ground Evidence</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{rep.rawText}"
                    </p>

                    {rep.slmExtracted && (
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                        <div>
                          <span className="text-slate-500 block text-[9px]">EVENT</span>
                          <span className="text-red-700 font-bold">{rep.slmExtracted.event}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">IMPACT</span>
                          <span className="text-amber-800 font-bold">{rep.slmExtracted.impact}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">SEVERITY</span>
                          <span className="text-red-800 font-bold">{rep.slmExtracted.severity}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px]">CONFIDENCE</span>
                          <span className="text-emerald-700 font-bold">{(rep.slmExtracted.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EVIDENCE SCORE BREAKDOWN */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="text-sm font-bold text-slate-900">How Evidence Score is Calculated</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The evidence score dynamically aggregates independent corroboration pillars. No single citizen or sensor can artificially trigger emergency escalation.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">IMD Doppler Radar & AWS Sensors</div>
                    <div className="text-[11px] text-slate-600">42.5 mm/h rain verified by Doppler station</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-blue-700">
                    +{event.evidenceScoreBreakdown.officialWeather}% / 25%
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Multiple Independent Citizen Reports</div>
                    <div className="text-[11px] text-slate-600">27 reports across 3 distinct sub-neighborhoods</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-blue-700">
                    +{event.evidenceScoreBreakdown.citizenReports}% / 30%
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Media & Camera Telemetry</div>
                    <div className="text-[11px] text-slate-600">3 geo-tagged flood photos verified</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-blue-700">
                    +{event.evidenceScoreBreakdown.mediaTelemetry}% / 20%
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Spatial & Temporal Consistency</div>
                    <div className="text-[11px] text-slate-600">Reports clustered tightly within 450m radius within 25 mins</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-blue-700">
                    +{event.evidenceScoreBreakdown.spatialConsistency}% / 15%
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Transit Speed & GPS Delay Sync</div>
                    <div className="text-[11px] text-slate-600">PMPML transit speed dropped to 3.5 km/h on corridor</div>
                  </div>
                  <div className="text-sm font-bold font-mono text-blue-700">
                    +{event.evidenceScoreBreakdown.transitSpeedAnomaly}% / 10%
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between font-mono font-bold">
                <span>TOTAL COMPOSITE EVIDENCE SCORE:</span>
                <span className="text-base font-extrabold">{event.evidenceScore}%</span>
              </div>
            </div>
          )}

          {/* TAB 5: OPERATIONAL TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300 space-y-6">
                {event.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-4 space-y-1">
                    <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs"></span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-blue-700 font-bold">{item.time}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-bold text-slate-900">{item.title}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                        {item.source}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
