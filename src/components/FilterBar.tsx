import React from 'react';
import { 
  Calendar, 
  Filter, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  X, 
  ShieldCheck, 
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { FilterSettings, IssueType, VerificationStatus, CityLocation } from '../types';

interface FilterBarProps {
  filters: FilterSettings;
  onFilterChange: (newFilters: Partial<FilterSettings>) => void;
  onResetFilters: () => void;
  availableLocations: CityLocation[];
  totalEventsCount: number;
  filteredEventsCount: number;
}

const EVENT_TYPE_OPTIONS: { label: string; value: IssueType | 'all' }[] = [
  { label: 'All Incidents', value: 'all' },
  { label: 'Waterlogging', value: 'Waterlogging' },
  { label: 'Flooding', value: 'Flooding' },
  { label: 'Traffic Jam', value: 'Traffic Jam' },
  { label: 'Low Visibility', value: 'Low Visibility' },
  { label: 'Road Blockage', value: 'Road Blockage' },
  { label: 'Fallen Tree', value: 'Fallen Tree' },
  { label: 'Thunderstorm', value: 'Thunderstorm' },
];

const VERIFICATION_OPTIONS: { label: string; value: VerificationStatus | 'all'; badge: string }[] = [
  { label: 'All Status', value: 'all', badge: 'bg-slate-800 text-slate-300' },
  { label: 'Verified', value: 'verified', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { label: 'Under Verification', value: 'under_verification', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { label: 'Duplicate Suppressed', value: 'duplicate_suppressed', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
];

const DATE_OPTIONS: { label: string; value: 'today' | 'yesterday' | 'past_3d' | 'all' }[] = [
  { label: 'Today (Live)', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Past 3 Days', value: 'past_3d' },
  { label: 'All Dates', value: 'all' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableLocations,
  totalEventsCount,
  filteredEventsCount,
}) => {
  const isFilterActive =
    filters.dateRange !== 'all' ||
    filters.eventType !== 'all' ||
    filters.locationId !== 'all' ||
    filters.verificationStatus !== 'all' ||
    filters.minEvidenceScore > 0;

  return (
    <div 
      id="cloudvision-filter-toolbar"
      className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-20 shadow-xs"
    >
      {/* Left: Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
        {/* Label icon */}
        <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px] uppercase tracking-wider pr-1">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>Filters</span>
        </div>

        {/* 1. Date-Wise Filter */}
        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
          {DATE_OPTIONS.map((d) => {
            const isSelected = filters.dateRange === d.value;
            return (
              <button
                key={d.value}
                onClick={() => onFilterChange({ dateRange: d.value })}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* 2. Event-Wise Filter */}
        <div className="relative">
          <select
            id="filter-event-type"
            value={filters.eventType}
            onChange={(e) => onFilterChange({ eventType: e.target.value as IssueType | 'all' })}
            aria-label="Filter by Event Type"
            className="h-7 px-2.5 bg-white border border-slate-300 rounded-lg text-[11px] font-medium text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
          >
            {EVENT_TYPE_OPTIONS.map((evt) => (
              <option key={evt.value} value={evt.value} className="bg-white text-slate-800">
                {evt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Location-Wise Filter */}
        <div className="relative">
          <select
            id="filter-location"
            value={filters.locationId}
            onChange={(e) => onFilterChange({ locationId: e.target.value })}
            aria-label="Filter by Location"
            className="h-7 px-2.5 max-w-[180px] bg-white border border-slate-300 rounded-lg text-[11px] font-medium text-slate-800 focus:outline-none focus:border-blue-600 truncate cursor-pointer shadow-xs"
          >
            <option value="all" className="bg-white text-slate-800">
              All Localities ({availableLocations.length})
            </option>
            {availableLocations.map((loc) => (
              <option key={loc.id} value={loc.id} className="bg-white text-slate-800">
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Verification Status Tracking Filter */}
        <div className="flex items-center gap-1">
          {VERIFICATION_OPTIONS.map((st) => {
            const isSelected = filters.verificationStatus === st.value;
            const badgeClasses = 
              st.value === 'verified'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : st.value === 'under_verification'
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-purple-50 text-purple-800 border-purple-300';

            return (
              <button
                key={st.value}
                onClick={() => onFilterChange({ verificationStatus: st.value })}
                className={`px-2 py-1 rounded-md text-[10px] font-semibold border transition-all flex items-center gap-1 ${
                  isSelected
                    ? `${badgeClasses} ring-1 ring-current shadow-xs`
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {st.value === 'verified' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                {st.value === 'under_verification' && <Clock className="w-3 h-3 text-amber-600" />}
                {st.value === 'duplicate_suppressed' && <Sparkles className="w-3 h-3 text-purple-600" />}
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Active Count & Reset */}
      <div className="flex items-center gap-3">
        <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredEventsCount}</strong> of {totalEventsCount} incidents
          </span>
        </div>

        {isFilterActive && (
          <button
            onClick={onResetFilters}
            className="px-2 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
