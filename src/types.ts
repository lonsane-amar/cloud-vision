export type SeverityLevel = 'Critical' | 'High' | 'Moderate' | 'Low';

export type IssueType = 
  | 'Waterlogging' 
  | 'Traffic Jam' 
  | 'Heavy Rain' 
  | 'Flooding' 
  | 'Low Visibility' 
  | 'Road Blockage' 
  | 'Fallen Tree' 
  | 'Thunderstorm';

export type CityId = 'all' | 'pune' | 'delhi' | 'kolkata' | 'bihar' | 'mumbai' | 'bengaluru';

export type VerificationStatus = 'verified' | 'under_verification' | 'unverified' | 'duplicate_suppressed';

export type DateFilterType = 'today' | 'yesterday' | 'past_3d' | 'all';

export interface CityInfo {
  id: CityId;
  name: string;
  state: string;
  regionalLanguage: string;
  coordinates: [number, number]; // [lat, lng]
  zoomLevel: number;
  authorityName: string;
  riskProfile: string;
  badgeColor: string;
}

export interface PuneLocation {
  id: string;
  cityId?: CityId;
  cityName?: string;
  state?: string;
  name: string;
  marathiName: string; // regional name
  category: 'Major Road' | 'Corridor' | 'Tech Hub' | 'Transit Junction' | 'Suburb' | 'River Basin' | 'Ghat Section';
  coordinates: [number, number]; // [lat, lng]
  zoomLevel: number;
  weather: {
    tempC: number;
    condition: string;
    rainfallMmH: number;
    humidityPercent: number;
    windKmh: number;
    visibilityM: number;
    radarReflectivityDbz: number;
  };
  traffic: {
    congestionPercent: number;
    avgSpeedKmh: number;
    status: 'Free Flow' | 'Moderate' | 'Heavy' | 'Gridlock';
    chokePoint: string;
    trend: 'deteriorating' | 'stable' | 'clearing';
  };
  waterlogging: {
    depthInches: number;
    status: 'Dry' | 'Puddles' | 'Moderate' | 'Severe Flooding';
    drainageCapacityPercent: number;
    hazardZone: string;
  };
  activeIncidentsCount: number;
  citizenReportsCount: number;
  lastUpdated: string;
}

export type CityLocation = PuneLocation;

export interface SLMExtraction {
  event: IssueType | string;
  location: string;
  impact: string;
  severity: SeverityLevel;
  possibleCause: string;
  confidence: number;
  extractedKeywords: string[];
  languageDetected: 'Hindi / Hinglish' | 'Marathi' | 'Bengali' | 'Bhojpuri' | 'English';
}

export interface CitizenReport {
  id: string;
  cityId?: CityId;
  cityName?: string;
  rawText: string;
  timestamp: string;
  date?: string; // YYYY-MM-DD
  timeAgo: string;
  locationId: string;
  locationName: string;
  coordinates: [number, number];
  issueType: IssueType;
  userSeverity: SeverityLevel;
  verificationStatus?: VerificationStatus;
  isDuplicate: boolean;
  duplicateOfEventId?: string;
  duplicateSimilarityScore?: number;
  evidenceWeight: number; // 1 to 5
  source: 'Citizen App' | 'Traffic Police Bot' | 'PMC Helpline' | 'Twitter/X Alert' | 'Maha-Metro Sensor' | 'Delhi Traffic Portal' | 'KMC Control' | 'Bihar Disaster Helpline';
  imageUrl?: string;
  slmExtracted?: SLMExtraction;
}

export interface ImpactChainNode {
  stage: 'Meteorology' | 'Ground State' | 'Road Network' | 'Human/Urban Impact';
  label: string;
  value: string;
  metric: string;
  status: 'warning' | 'critical' | 'alert' | 'info';
  icon: string;
}

export interface DuplicateCluster {
  clusterId: string;
  subLocality: string;
  reportCount: number;
  duplicateCount: number;
  sampleSnippets: string[];
  timeWindow: string;
}

export interface UnifiedEvent {
  id: string;
  cityId?: CityId;
  cityName?: string;
  state?: string;
  date?: string; // YYYY-MM-DD
  title: string;
  type?: IssueType;
  issueType?: IssueType;
  locationId: string;
  locationName: string;
  coordinates: [number, number];
  severity: SeverityLevel;
  status: 'Active' | 'Under Investigation' | 'PMC Dispatched' | 'MCD Dispatched' | 'KMC Dispatched' | 'NDRF Dispatched' | 'Resolving';
  verificationStatus?: VerificationStatus;
  reportCount: number;
  independentSourcesCount: number;
  likelyDuplicatesCount: number;
  evidenceScore: number; // 0-100%
  evidenceScoreBreakdown: {
    officialWeather: number;     // e.g. 25
    citizenReports: number;      // e.g. 30
    mediaTelemetry: number;      // e.g. 20
    spatialConsistency: number;  // e.g. 15
    transitSpeedAnomaly: number; // e.g. 10
  };
  weatherCondition: string;
  rainfallMmH: number;
  affectedRoads: string[];
  impactChain: ImpactChainNode[];
  timeline: Array<{
    time: string;
    title: string;
    description: string;
    source: string;
    type: 'alert' | 'sensor' | 'fusion' | 'dispatch';
  }>;
  duplicateClusters: DuplicateCluster[];
  reports: CitizenReport[];
  images: Array<{
    url: string;
    caption: string;
    timestamp: string;
    author: string;
  }>;
  lastUpdated: string;
}

export interface MapLayerSettings {
  weather: boolean;
  rainfall: boolean;
  traffic: boolean;
  waterlogging: boolean;
  visibility: boolean;
  citizenReports: boolean;
  highPriorityEvents: boolean;
  alternateRoutes: boolean;
}

export interface DetourRoute {
  id: string;
  name: string;
  type: 'primary_detour' | 'secondary_detour';
  points: [number, number][];
  distanceKm: number;
  etaDeltaMinutes: number;
  roadCondition: string;
  safetyScore: number; // 0 - 100%
  avgSpeedKmh: number;
  keyWaypoints: string[];
  advisory: string;
}

export interface DetourCorridor {
  id: string;
  locationId?: string; // Links detour to a specific affected city location if applicable
  name: string;
  highwayCode: string; // e.g. "NH-48", "NH-16", "NH-22"
  regionName: string; // e.g. "Mumbai - Pune Highway Corridor"
  cityId: CityId;
  hazardType: 'landslide' | 'waterlogging' | 'flash_flood' | 'rockfall';
  hazardDescription: string;
  blockedSegment: {
    name: string;
    points: [number, number][];
    startCoord: [number, number];
    endCoord: [number, number];
    inundationDepthInches?: number;
    hazardNote: string;
    status: 'COMPLETELY BLOCKED' | 'HAZARDOUS CRAWL' | 'RESTRICTED';
  };
  recommendedDetour: DetourRoute;
  alternativeDetour?: DetourRoute;
  nhaiAdvisory: string;
  policeEscortActive: boolean;
  lastUpdated: string;
}

export interface FilterSettings {
  dateRange: DateFilterType;
  eventType: IssueType | 'all';
  locationId: string;
  verificationStatus: VerificationStatus | 'all';
  minEvidenceScore: number;
}
