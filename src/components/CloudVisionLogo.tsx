import React from 'react';

interface CloudVisionLogoProps {
  size?: number;
  variant?: 'icon' | 'horizontal' | 'full';
  showTagline?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}

export const CloudVisionLogo: React.FC<CloudVisionLogoProps> = ({
  size = 42,
  variant = 'horizontal',
  showTagline = true,
  theme = 'light',
  className = '',
}) => {
  // Pure vector icon for Sun + Cloud + Eye
  const iconGraphic = (
    <svg
      viewBox="50 55 410 270"
      width={size}
      height={Math.round(size * (270 / 410))}
      className="flex-shrink-0 drop-shadow-[0_3px_10px_rgba(2,132,199,0.28)] transition-transform hover:scale-105 duration-200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Warm Golden Sun Gradient */}
        <linearGradient id="cvSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Vibrant Cloud Blue Gradient */}
        <linearGradient id="cvCloudGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="45%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Eye Iris Gradient */}
        <radialGradient id="cvIrisGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="65%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
      </defs>

      {/* Sun & Radiating Rays (Behind Cloud) */}
      <g>
        <circle cx="345" cy="155" r="46" fill="url(#cvSunGrad)" />
        <line x1="312" y1="108" x2="300" y2="92" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />
        <line x1="345" y1="94" x2="345" y2="74" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />
        <line x1="378" y1="108" x2="394" y2="92" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />
        <line x1="400" y1="135" x2="422" y2="128" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />
        <line x1="404" y1="168" x2="426" y2="175" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" />
      </g>

      {/* Smooth 3-Lobe Cloud Shape */}
      <path
        d="M 160 300
           C 115 300, 85 265, 85 220
           C 85 180, 115 148, 155 148
           C 165 148, 175 150, 184 154
           C 200 110, 240 80, 290 80
           C 350 80, 395 125, 400 182
           C 418 188, 435 204, 435 228
           C 435 258, 410 285, 380 290
           C 365 298, 320 300, 270 300
           Z"
        fill="url(#cvCloudGrad)"
      />

      {/* Specular Highlight on Cloud Edge */}
      <path
        d="M 195 152
           C 212 115, 248 90, 290 90
           C 342 90, 382 128, 390 178"
        stroke="#E0F2FE"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* White Eye Sclera */}
      <path
        d="M 130 220
           C 180 148, 305 148, 360 220
           C 305 292, 180 292, 130 220
           Z"
        fill="#FFFFFF"
        stroke="#BAE6FD"
        strokeWidth="1.5"
      />

      {/* Iris & Pupil */}
      <circle cx="245" cy="220" r="42" fill="url(#cvIrisGrad)" />
      <circle cx="245" cy="220" r="23" fill="#0F172A" />
      <circle cx="236" cy="208" r="7" fill="#FFFFFF" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>{iconGraphic}</div>;
  }

  const isDark = theme === 'dark';

  // Full Stacked (Matching exact uploaded logo card)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {iconGraphic}
        <div className="mt-2.5">
          <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Cloud
          </span>
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-blue-600">
            Vision
          </span>
        </div>
        {showTagline && (
          <p className={`text-[11px] sm:text-xs font-semibold tracking-wider mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Smarter Weather. Safer Tomorrow.
          </p>
        )}
      </div>
    );
  }

  // Horizontal Variant (For Navbar, Header, Modals)
  return (
    <div id="cloudvision-brand-logo" className={`inline-flex items-center gap-2.5 select-none flex-shrink-0 ${className}`}>
      {iconGraphic}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`text-lg sm:text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Cloud
          </span>
          <span className="text-lg sm:text-xl font-black tracking-tight text-blue-600">
            Vision
          </span>
          <span className={`hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
            isDark 
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' 
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            Ground Intelligence
          </span>
        </div>
        {showTagline && (
          <p className={`text-[10.5px] font-medium tracking-wide mt-1 hidden md:block ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Smarter Weather. Safer Tomorrow.
          </p>
        )}
      </div>
    </div>
  );
};
