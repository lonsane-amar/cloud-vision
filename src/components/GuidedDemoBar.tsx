import React from 'react';
import { 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  RotateCcw,
  Award
} from 'lucide-react';

export interface DemoStepInfo {
  step: number;
  title: string;
  description: string;
  actionLabel: string;
  targetCity?: string;
}

export const DEMO_STEPS: DemoStepInfo[] = [
  {
    step: 1,
    title: 'Explore Nationwide GIS Incident Map',
    description: 'Explore live multi-city weather radar, rainfall isohyets, flood hazards, and transit choke points.',
    actionLabel: 'Inspect Map View',
    targetCity: 'pune',
  },
  {
    step: 2,
    title: 'Switch Risk City: Switch to Delhi NCR',
    description: 'Seamlessly switch to Delhi NCR to inspect the high-risk Minto Bridge Underpass and Yamuna floodplains.',
    actionLabel: 'Switch to Delhi',
    targetCity: 'delhi',
  },
  {
    step: 3,
    title: 'Inspect Critical Ground & Transit Telemetry',
    description: 'Side panel reveals live 52 mm/h cloudburst, 38" water submersion, and complete corridor blockage.',
    actionLabel: 'Inspect Side Panel',
    targetCity: 'delhi',
  },
  {
    step: 4,
    title: 'Apply Date & Verification Status Filters',
    description: 'Filter events by Date (Today vs Yesterday), Event Type (Waterlogging/Flooding), and Verification Status.',
    actionLabel: 'Apply Filters',
    targetCity: 'delhi',
  },
  {
    step: 5,
    title: 'Inspect Master Event & Verification Tracking',
    description: 'Inspect verified master event with 42 corroborating reports, 29 duplicates suppressed, and 98% Evidence Score.',
    actionLabel: 'Open Event Card',
    targetCity: 'delhi',
  },
  {
    step: 6,
    title: 'Submit Ground Report with Regional SLM Parsing',
    description: 'Submit natural language observation in Hindi/Hinglish/Bengali; watch the Edge SLM extract entities instantly.',
    actionLabel: 'Report Incident',
    targetCity: 'pune',
  },
  {
    step: 7,
    title: 'Event Fusion Engine: Duplicate Suppression',
    description: 'See Event Fusion correlate incoming reports, suppress noise, and automatically notify disaster authorities.',
    actionLabel: 'Open Event Fusion',
    targetCity: 'pune',
  },
  {
    step: 8,
    title: 'Multi-City Real-Time Analytics & Resilience Index',
    description: 'Review cross-city comparative analytics: precipitation rates, water depth, mobility deficit, and response times.',
    actionLabel: 'View Analytics',
    targetCity: 'pune',
  },
  {
    step: 9,
    title: 'Highway Landslide & Waterlogging Detour Engine',
    description: 'Bypass blocked corridors (Mumbai-Pune Expressway landslide, Delhi NH-48 flood) with turn-by-turn safe alternate routes.',
    actionLabel: 'Launch Detour Navigator',
    targetCity: 'pune',
  },
];

interface GuidedDemoBarProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onResetDemo: () => void;
  onCloseDemo: () => void;
}

export const GuidedDemoBar: React.FC<GuidedDemoBarProps> = ({
  currentStep,
  onNextStep,
  onPrevStep,
  onResetDemo,
  onCloseDemo,
}) => {
  const currentStepData = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];
  const isLastStep = currentStep === DEMO_STEPS.length;

  return (
    <div 
      id="guided-tour-banner"
      className="bg-amber-50 border-b border-amber-200 px-3 sm:px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 z-25 text-xs shadow-xs"
    >
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs flex-shrink-0 shadow-xs">
          {currentStep}/{DEMO_STEPS.length}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-800 uppercase tracking-wider text-[10px]">
              Interactive Tour
            </span>
            <span className="text-slate-400">•</span>
            <span className="font-bold text-slate-900 text-xs">{currentStepData.title}</span>
          </div>
          <p className="text-[11px] text-slate-700 mt-0.5 line-clamp-1">
            {currentStepData.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
        <button
          onClick={onResetDemo}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-amber-100 transition-colors"
          title="Restart Tour"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {currentStep > 1 && (
          <button
            onClick={onPrevStep}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            Back
          </button>
        )}

        <button
          onClick={onNextStep}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
            isLastStep
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
          }`}
        >
          <span>{currentStepData.actionLabel}</span>
          {isLastStep ? <Award className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={onCloseDemo}
          className="p-1 rounded-md text-slate-500 hover:text-slate-800 ml-1 transition-colors cursor-pointer"
          title="Exit Tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
