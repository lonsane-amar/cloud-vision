import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Camera, 
  Cpu, 
  ArrowRight, 
  FileText, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { IssueType, SeverityLevel, CityLocation, CitizenReport, SLMExtraction } from '../types';
import { MULTI_CITY_SAMPLE_PROMPTS } from '../data/multiCityData';
import { runSLMExtraction } from '../utils/slmProcessor';

interface CitizenReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  locations: CityLocation[];
  initialLocationId?: string;
  initialCoordinates?: [number, number];
  onSubmitReport: (report: CitizenReport) => void;
}

const ISSUE_OPTIONS: IssueType[] = [
  'Waterlogging',
  'Traffic Jam',
  'Heavy Rain',
  'Flooding',
  'Low Visibility',
  'Road Blockage',
  'Fallen Tree',
  'Thunderstorm',
];

const SEVERITY_OPTIONS: SeverityLevel[] = ['Critical', 'High', 'Moderate', 'Low'];

export const CitizenReportModal: React.FC<CitizenReportModalProps> = ({
  isOpen,
  onClose,
  locations,
  initialLocationId,
  initialCoordinates,
  onSubmitReport,
}) => {
  const [selectedLocId, setSelectedLocId] = useState<string>(initialLocationId || locations[0]?.id || 'sinhagad-road');
  const [issueType, setIssueType] = useState<IssueType>('Waterlogging');
  const [severity, setSeverity] = useState<SeverityLevel>('Critical');
  const [description, setDescription] = useState<string>(
    'Sinhagad Road pe bahut paani bhar gaya hai aur traffic almost stopped hai near Pu La Deshpande garden'
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80'
  );

  // AI Pipeline Processing States: 'idle' | 'processing' | 'extracted' | 'completed'
  const [aiState, setAiState] = useState<'idle' | 'processing' | 'extracted' | 'completed'>('idle');
  const [aiStep, setAiStep] = useState<string>('Initializing SLM...');
  const [extractedData, setExtractedData] = useState<SLMExtraction | null>(null);

  useEffect(() => {
    if (initialLocationId) {
      setSelectedLocId(initialLocationId);
    }
  }, [initialLocationId]);

  if (!isOpen) return null;

  const activeLocation = locations.find((l) => l.id === selectedLocId) || locations[0];
  const coordinates: [number, number] = initialCoordinates || (activeLocation ? activeLocation.coordinates : [18.4795, 73.8242]);

  const handleApplySample = (sample: typeof MULTI_CITY_SAMPLE_PROMPTS[0]) => {
    setDescription(sample.text);
    setSelectedLocId(sample.locationId);
    setIssueType(sample.issueType);
    setSeverity(sample.severity);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartProcessing = () => {
    if (!description.trim()) return;

    setAiState('processing');
    setAiStep('1. Tokenizing regional text & extracting geo-entities...');

    setTimeout(() => {
      setAiStep('2. Running SLM Intent & Impact Classification...');
    }, 600);

    setTimeout(() => {
      setAiStep('3. Correlating with Doppler Radar & Municipal telemetry...');
    }, 1200);

    setTimeout(() => {
      const result = runSLMExtraction(description, issueType, severity);
      setExtractedData(result);
      setAiState('extracted');
    }, 1800);
  };

  const handleConfirmAndSubmit = () => {
    if (!extractedData) return;

    const newReport: CitizenReport = {
      id: `rep-live-${Date.now()}`,
      cityId: activeLocation.cityId,
      cityName: activeLocation.cityName,
      date: '2026-09-19',
      rawText: description,
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      locationId: selectedLocId,
      locationName: activeLocation.name,
      coordinates,
      issueType: extractedData.event as IssueType,
      userSeverity: extractedData.severity,
      verificationStatus: 'under_verification',
      isDuplicate: false, // will be evaluated by Event Fusion engine
      evidenceWeight: imagePreview ? 5 : 4,
      source: 'Citizen App',
      imageUrl: imagePreview || undefined,
      slmExtracted: extractedData,
    };

    onSubmitReport(newReport);
    setAiState('completed');

    setTimeout(() => {
      onClose();
      // Reset for next time
      setAiState('idle');
      setExtractedData(null);
    }, 1200);
  };

  // Group locations by city
  const cityGroups = locations.reduce<Record<string, CityLocation[]>>((acc, loc) => {
    const key = loc.cityName || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(loc);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="citizen-report-modal"
        className="bg-white border border-slate-300 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-slate-800"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Report Ground Incident</h3>
              <p className="text-xs text-slate-500">
                Multi-City Edge SLM processing with automatic duplicate suppression & event fusion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex-1">
          {aiState === 'idle' && (
            <>
              {/* Preset Scenarios Chip Bar */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Quick Test Scenarios (1-Click Fill Across Cities)</span>
                  <span className="text-blue-700 font-mono text-[10px] font-bold">Multi-City Presets</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {MULTI_CITY_SAMPLE_PROMPTS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplySample(sample)}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-300 hover:border-blue-500 transition-all text-left cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Target Hotspot Corridor</span>
                  </label>
                  <select
                    value={selectedLocId}
                    onChange={(e) => setSelectedLocId(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  >
                    {Object.entries(cityGroups).map(([cityName, locs]) => (
                      <optgroup key={cityName} label={`--- ${cityName} ---`}>
                        {locs.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name} • {l.traffic.status}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Observed Issue Type
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value as IssueType)}
                    className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none"
                  >
                    {ISSUE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Natural Language Report Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>Natural Language Observation (Hindi / Hinglish / Bengali / Bhojpuri / Marathi / English)</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">SLM will parse entities</span>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Sinhagad Road pe bahut paani bhar gaya hai aur traffic almost stopped hai..."
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none leading-relaxed font-sans"
                />
              </div>

              {/* Severity Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  User Perceived Severity
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {SEVERITY_OPTIONS.map((sev) => {
                    const isSelected = severity === sev;
                    return (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setSeverity(sev)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? sev === 'Critical'
                              ? 'bg-red-600 text-white border-red-600 shadow-xs'
                              : sev === 'High'
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                              : 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {sev}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Evidence Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ground Photo Evidence (+20% Corroboration Weight)</span>
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-slate-300 group shadow-2xs">
                      <img
                        src={imagePreview}
                        alt="Ground verification"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-28 h-20 rounded-lg border border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-slate-500 hover:text-blue-600">
                      <Upload className="w-5 h-5" />
                      <span className="text-[10px] font-semibold">Attach Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="text-slate-800 font-bold">Visual Evidence Validation</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Geotagged ground photos fast-track report verification from Under Verification to Verified.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartProcessing}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Process Observation with Edge SLM</span>
                </button>
              </div>
            </>
          )}

          {/* State 2: Processing */}
          {aiState === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
                <Sparkles className="w-6 h-6 text-blue-600 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Running On-Device SLM Extraction</h4>
                <p className="text-xs text-blue-700 font-mono font-semibold transition-all animate-pulse">
                  {aiStep}
                </p>
              </div>
            </div>
          )}

          {/* State 3: Extracted Preview */}
          {aiState === 'extracted' && extractedData && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">SLM Information Extraction Complete</h4>
                    <p className="text-[11px] text-emerald-700">
                      Model Confidence: {(extractedData.confidence * 100).toFixed(1)}% • Language: {extractedData.languageDetected}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  Ready for Fusion
                </span>
              </div>

              {/* Extracted Entity Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Extracted Event Type</div>
                  <div className="text-xs font-bold text-blue-700 mt-1">{extractedData.event}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Resolved Hotspot</div>
                  <div className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{extractedData.location}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Predicted Urban Impact</div>
                  <div className="text-xs font-bold text-amber-700 mt-1">{extractedData.impact}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Identified Root Cause</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{extractedData.possibleCause}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAiState('idle')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
                >
                  Edit Observation
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAndSubmit}
                  className="flex-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Confirm & Run Event Fusion</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* State 4: Completed */}
          {aiState === 'completed' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Report Successfully Fused</h4>
              <p className="text-xs text-slate-600 max-w-sm">
                Observation integrated into master incident. Authorities notified and duplicate metric updated.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
