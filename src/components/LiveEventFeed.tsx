import React, { useState } from 'react';
import { 
  Radio, 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  CheckCircle, 
  Sparkles, 
  ArrowUpRight, 
  Clock,
  Filter
} from 'lucide-react';
import { CitizenReport, UnifiedEvent } from '../types';

interface LiveEventFeedProps {
  reports: CitizenReport[];
  onSelectEventById: (eventId: string) => void;
  onOpenReportModal: () => void;
}

export const LiveEventFeed: React.FC<LiveEventFeedProps> = ({
  reports,
  onSelectEventById,
  onOpenReportModal,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'independent' | 'duplicates'>('all');

  const filteredReports = reports.filter((r) => {
    if (filter === 'independent') return !r.isDuplicate;
    if (filter === 'duplicates') return r.isDuplicate;
    return true;
  });

  return (
    <div className="absolute bottom-4 left-4 z-[400] max-w-md w-[calc(100vw-32px)] sm:w-96 flex flex-col">
      {/* Header bar that toggles expand/collapse */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 shadow-md flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all select-none"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span className="text-xs font-bold text-slate-800">Live Ground Telemetry Stream</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono font-semibold border border-slate-200">
            {reports.length} events
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="text-[10px] hidden sm:inline font-medium">
            {isExpanded ? 'Collapse' : 'Expand Stream'}
          </span>
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded Stream Feed */}
      {isExpanded && (
        <div className="mt-2 bg-white border border-slate-300 rounded-2xl shadow-xl max-h-72 overflow-y-auto p-3 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Quick Filters */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-200 text-[10px] text-slate-600">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded font-medium ${
                  filter === 'all' ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' : 'hover:text-slate-900'
                }`}
              >
                All ({reports.length})
              </button>
              <button
                onClick={() => setFilter('independent')}
                className={`px-2 py-0.5 rounded font-medium ${
                  filter === 'independent' ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200' : 'hover:text-slate-900'
                }`}
              >
                Independent ({reports.filter((r) => !r.isDuplicate).length})
              </button>
              <button
                onClick={() => setFilter('duplicates')}
                className={`px-2 py-0.5 rounded font-medium ${
                  filter === 'duplicates' ? 'bg-amber-50 text-amber-700 font-bold border border-amber-200' : 'hover:text-slate-900'
                }`}
              >
                Duplicates ({reports.filter((r) => r.isDuplicate).length})
              </button>
            </div>

            <button
              onClick={onOpenReportModal}
              className="text-red-700 hover:text-red-800 font-bold"
            >
              + Report
            </button>
          </div>

          {/* Report items */}
          <div className="space-y-2">
            {filteredReports.map((rep) => (
              <div
                key={rep.id}
                onClick={() => rep.duplicateOfEventId && onSelectEventById(rep.duplicateOfEventId)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all cursor-pointer space-y-1.5 group shadow-2xs"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-blue-700">{rep.locationName.split('(')[0].trim()}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-mono">{rep.timeAgo}</span>
                  </div>

                  {rep.isDuplicate ? (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-50 text-amber-800 flex items-center gap-1 border border-amber-300">
                      <Copy className="w-2.5 h-2.5" />
                      <span>Duplicate Fused</span>
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>Verified Corroboration</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 italic line-clamp-2 leading-tight">
                  "{rep.rawText}"
                </p>

                {rep.slmExtracted && (
                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                    <span className="text-slate-600 font-mono">
                      SLM: {rep.slmExtracted.event} → {rep.slmExtracted.impact}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
