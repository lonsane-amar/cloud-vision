import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Layers, 
  PlayCircle, 
  PlusCircle, 
  BarChart3, 
  CloudRain, 
  AlertTriangle, 
  Compass, 
  Building2,
  ChevronDown,
  Globe2,
  Check,
  Navigation
} from 'lucide-react';
import { CityLocation, CityId } from '../types';
import { CITIES_CONFIG } from '../data/multiCityData';
import { CloudVisionLogo } from './CloudVisionLogo';

interface TopNavProps {
  locations: CityLocation[];
  allLocations: CityLocation[];
  currentCityId: CityId;
  onCityChange: (cityId: CityId) => void;
  activeTab: 'map' | 'fusion' | 'analytics';
  onTabChange: (tab: 'map' | 'fusion' | 'analytics') => void;
  onSelectLocation: (loc: CityLocation) => void;
  onOpenReportModal: () => void;
  onStartGuidedTour: () => void;
  onOpenDetourNavigator?: () => void;
  isGuidedTourActive: boolean;
  totalIncidentsCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  locations,
  allLocations,
  currentCityId,
  onCityChange,
  activeTab,
  onTabChange,
  onSelectLocation,
  onOpenReportModal,
  onStartGuidedTour,
  onOpenDetourNavigator,
  isGuidedTourActive,
  totalIncidentsCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const cityDropdownRef = useRef<HTMLDivElement | null>(null);

  const currentCityInfo = CITIES_CONFIG[currentCityId] || CITIES_CONFIG['pune'];

  // Global search across all locations
  const filteredLocations = searchQuery.trim()
    ? allLocations.filter(
        (l) =>
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (l.cityName && l.cityName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (l.marathiName && l.marathiName.includes(searchQuery)) ||
          l.traffic.chokePoint.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  // Close search & dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-4 flex items-center justify-between gap-2.5 z-30 select-none shadow-xs">
      {/* Brand & City Switcher */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
        <CloudVisionLogo size={46} variant="horizontal" showTagline={true} theme="light" />

        {/* City Selector Dropdown */}
        <div ref={cityDropdownRef} className="relative flex-shrink-0">
          <button
            id="city-switcher-button"
            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            className="h-9 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-800 flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold">{currentCityInfo.name}</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">({currentCityInfo.state})</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCityDropdownOpen && (
            <div className="absolute top-10 left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 py-1">
              <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Select Major Risk Region
              </div>
              {Object.values(CITIES_CONFIG).map((city) => {
                const isSelected = city.id === currentCityId;
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      onCityChange(city.id as CityId);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                      isSelected ? 'bg-blue-50 text-blue-800' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{city.name}</span>
                        <span className="text-[10px] text-slate-500 font-normal">({city.state})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">
                        {city.riskProfile}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Central Search Bar */}
      <div ref={searchContainerRef} className="relative flex-1 max-w-sm sm:max-w-md mx-1 sm:mx-2 min-w-0">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="global-location-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder={`Search ${currentCityInfo.name} corridors, underpasses, hotspots...`}
            className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>

        {/* Dropdown Suggestions */}
        {isSearchOpen && (
          <div className="absolute top-11 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
            <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Locations & Corridors</span>
              <span className="text-blue-600 font-bold">{filteredLocations.length} results</span>
            </div>
            {filteredLocations.length === 0 ? (
              <div className="p-4 text-xs text-slate-500 text-center">
                No location matching "{searchQuery}"
              </div>
            ) : (
              filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    if (loc.cityId !== currentCityId) {
                      onCityChange(loc.cityId as CityId);
                    }
                    onSelectLocation(loc);
                    setSearchQuery(loc.name);
                    setIsSearchOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      loc.traffic.status === 'Gridlock' ? 'bg-red-500' : loc.traffic.status === 'Heavy' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div>
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <span>{loc.name}</span>
                        <span className="text-[10px] text-blue-600 font-normal">[{loc.cityName}]</span>
                        {loc.marathiName && (
                          <span className="text-[10px] text-slate-500 font-normal">({loc.marathiName})</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        Choke: {loc.traffic.chokePoint}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-600">{loc.weather.rainfallMmH} mm/h</span>
                    <div className="text-[10px] text-slate-500">{loc.waterlogging.depthInches}" flood</div>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Navigation Tabs + Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-100 border border-slate-200 p-0.5 rounded-lg">
          <button
            id="nav-tab-map"
            onClick={() => onTabChange('map')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'map'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GIS Live Map</span>
            <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
              {totalIncidentsCount}
            </span>
          </button>

          <button
            id="nav-tab-fusion"
            onClick={() => onTabChange('fusion')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'fusion'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">Event Fusion Engine</span>
          </button>

          <button
            id="nav-tab-analytics"
            onClick={() => onTabChange('analytics')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">City Analytics</span>
          </button>
        </div>

        {/* Alternate Routes & Detour Engine CTA (Green button) */}
        {onOpenDetourNavigator && (
          <button
            id="btn-nav-detours"
            onClick={onOpenDetourNavigator}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            title="Highway & Landslide Alternate Route Navigator"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xl:inline">Safe Alternate Paths</span>
            <span className="xl:hidden">Detours</span>
          </button>
        )}

        {/* Guided Tour CTA (Amber/Yellow button) */}
        <button
          id="btn-guided-tour"
          onClick={onStartGuidedTour}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer shadow-xs ${
            isGuidedTourActive
              ? 'bg-amber-500 text-slate-950 border-amber-600 ring-2 ring-amber-400'
              : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
          }`}
          title="Interactive Platform Tour"
        >
          <PlayCircle className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">Guided Tour</span>
        </button>

        {/* Report Citizen Issue CTA (Red button) */}
        <button
          id="btn-open-citizen-report"
          onClick={onOpenReportModal}
          className="px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm border border-red-700 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Report Incident</span>
        </button>
      </div>
    </header>
  );
};
