import { IssueType, SeverityLevel, SLMExtraction, CitizenReport, UnifiedEvent } from '../types';

export function runSLMExtraction(
  rawText: string,
  userSelectedIssue?: IssueType,
  userSelectedSeverity?: SeverityLevel
): SLMExtraction {
  const textLower = rawText.toLowerCase();

  // Detect language
  let languageDetected: 'Hindi / Hinglish' | 'Marathi' | 'Bengali' | 'Bhojpuri' | 'English' = 'English';
  if (
    textLower.includes('jol') ||
    textLower.includes('jomeche') ||
    textLower.includes('prochur') ||
    textLower.includes('theke') ||
    textLower.includes('eikhane') ||
    textLower.includes('bheje')
  ) {
    languageDetected = 'Bengali';
  } else if (
    textLower.includes('ghus') ||
    textLower.includes('phansi') ||
    textLower.includes('baate') ||
    textLower.includes('rahal') ||
    textLower.includes('hamar')
  ) {
    languageDetected = 'Bhojpuri';
  } else if (
    textLower.includes('paani') ||
    textLower.includes('bahut') ||
    textLower.includes('bhar gaya') ||
    textLower.includes('hai') ||
    textLower.includes('gadi') ||
    textLower.includes('jaam') ||
    textLower.includes('ruk') ||
    textLower.includes('doob')
  ) {
    languageDetected = 'Hindi / Hinglish';
  } else if (
    textLower.includes('ahe') ||
    textLower.includes('saachle') ||
    textLower.includes('pudhe') ||
    textLower.includes('khup') ||
    textLower.includes('paryant') ||
    textLower.includes('gaadya') ||
    textLower.includes('kadun') ||
    textLower.includes('madhe')
  ) {
    languageDetected = 'Marathi';
  }

  // Detect location across cities
  let location = 'Urban Corridor';
  if (textLower.includes('sinhagad') || textLower.includes('singhgad') || textLower.includes('pu la') || textLower.includes('deshpande') || textLower.includes('rajaram') || textLower.includes('manik baug') || textLower.includes('anand nagar')) {
    location = 'Sinhagad Road (Pu La Deshpande - Manik Baug Corridor)';
  } else if (textLower.includes('minto') || textLower.includes('connaught') || textLower.includes('ddu marg')) {
    location = 'Minto Bridge Underpass (Connaught Place, Delhi)';
  } else if (textLower.includes('ito') || textLower.includes('vikas marg')) {
    location = 'ITO Intersection & Vikas Marg (Delhi)';
  } else if (textLower.includes('yamuna') || textLower.includes('iron bridge') || textLower.includes('khadar')) {
    location = 'Yamuna Floodplain (Old Iron Bridge, Delhi)';
  } else if (textLower.includes('park street') || textLower.includes('camac') || textLower.includes('mullick')) {
    location = 'Park Street & Camac Street Junction (Kolkata)';
  } else if (textLower.includes('howrah') || textLower.includes('strand') || textLower.includes('brabourne')) {
    location = 'Howrah Station Approach & Strand Rd (Kolkata)';
  } else if (textLower.includes('rajendra nagar') || textLower.includes('kankarbagh') || textLower.includes('bazar samiti')) {
    location = 'Rajendra Nagar & Kankarbagh (Patna, Bihar)';
  } else if (textLower.includes('gandhi setu') || textLower.includes('setu') || textLower.includes('hajipur')) {
    location = 'Mahatma Gandhi Setu Ganga Approach (Bihar)';
  } else if (textLower.includes('milan') || textLower.includes('santacruz') || textLower.includes('subway')) {
    location = 'Milan Subway (Santa Cruz, Mumbai)';
  } else if (textLower.includes('hindmata') || textLower.includes('dadar')) {
    location = 'Hindmata Flyover & Dadar TT (Mumbai)';
  } else if (textLower.includes('bellandur') || textLower.includes('ecospace') || textLower.includes('outer ring road') || textLower.includes('orr')) {
    location = 'Outer Ring Road (Bellandur / Ecospace, Bengaluru)';
  } else if (textLower.includes('silk board') || textLower.includes('hsr')) {
    location = 'Silk Board Junction (Bengaluru)';
  } else if (textLower.includes('katraj') || textLower.includes('tunnel') || textLower.includes('wonder city') || textLower.includes('ghat')) {
    location = 'Katraj Ghat & Junction Corridor (Pune)';
  } else if (textLower.includes('baner') || textLower.includes('pancard') || textLower.includes('high street')) {
    location = 'Baner Road (Pune)';
  } else if (textLower.includes('hinjewadi') || textLower.includes('hinjawadi') || textLower.includes('shivaji chowk')) {
    location = 'Hinjewadi Phase 1 (Pune)';
  }

  // Detect Event Type
  let event: IssueType = userSelectedIssue || 'Waterlogging';
  if (textLower.includes('paani') || textLower.includes('waterlog') || textLower.includes('water') || textLower.includes('pani') || textLower.includes('jol') || textLower.includes('saachle')) {
    event = 'Waterlogging';
  } else if (textLower.includes('traffic') || textLower.includes('jam') || textLower.includes('stopped') || textLower.includes('gridlock') || textLower.includes('slow') || textLower.includes('queue') || textLower.includes('standstill')) {
    event = 'Traffic Jam';
  } else if (textLower.includes('tree') || textLower.includes('branch') || textLower.includes('gulmohar') || textLower.includes('zad') || textLower.includes('fall')) {
    event = 'Fallen Tree';
  } else if (textLower.includes('fog') || textLower.includes('visibility') || textLower.includes('mist') || textLower.includes('dhund') || textLower.includes('smog')) {
    event = 'Low Visibility';
  } else if (textLower.includes('flood') || textLower.includes('inundat') || textLower.includes('nallah') || textLower.includes('river') || textLower.includes('doob')) {
    event = 'Flooding';
  } else if (textLower.includes('block') || textLower.includes('barricade') || textLower.includes('breakdown')) {
    event = 'Road Blockage';
  } else if (textLower.includes('thunder') || textLower.includes('lightning') || textLower.includes('bijli') || textLower.includes('tofan')) {
    event = 'Thunderstorm';
  }

  // Detect Impact
  let impact = 'Localized Traffic Delay';
  if (textLower.includes('stopped') || textLower.includes('jam') || textLower.includes('gridlock') || textLower.includes('standstill') || textLower.includes('band padlya') || textLower.includes('thapp')) {
    impact = 'Severe Traffic Gridlock & Transit Halt';
  } else if (textLower.includes('knee') || textLower.includes('ghutne') || textLower.includes('2 foot') || textLower.includes('3 foot') || textLower.includes('chest') || textLower.includes('deep')) {
    impact = 'High Water Depth - Vehicles Stranded & Impassable';
  } else if (textLower.includes('divert') || textLower.includes('police') || textLower.includes('close') || textLower.includes('barricad')) {
    impact = 'Official Corridor Closure & Traffic Diversion';
  } else if (textLower.includes('tree') || textLower.includes('block')) {
    impact = 'Road Obstructed (Emergency Crews Clearing)';
  } else if (textLower.includes('crawl') || textLower.includes('slow')) {
    impact = 'Vehicular Speed Reduced to < 10 km/h';
  }

  // Detect Severity
  let severity: SeverityLevel = userSelectedSeverity || 'High';
  if (
    textLower.includes('extreme') ||
    textLower.includes('severe') ||
    textLower.includes('bahut') ||
    textLower.includes('almost stopped') ||
    textLower.includes('knee') ||
    textLower.includes('doob') ||
    textLower.includes('3 foot') ||
    textLower.includes('chest') ||
    textLower.includes('2 foot') ||
    textLower.includes('band') ||
    textLower.includes('closed') ||
    textLower.includes('prochur')
  ) {
    severity = 'Critical';
  } else if (textLower.includes('heavy') || textLower.includes('jam') || textLower.includes('fog') || textLower.includes('block')) {
    severity = 'High';
  } else if (textLower.includes('slow') || textLower.includes('puddle')) {
    severity = 'Moderate';
  }

  // Detect Possible Cause
  let possibleCause = 'Monsoon Precipitation';
  if (event === 'Waterlogging' || event === 'Flooding') {
    possibleCause = 'Heavy Rainfall Runoff & Urban Drain Surcharge';
  } else if (event === 'Fallen Tree') {
    possibleCause = 'Convective Squall Wind Gusts (>45 km/h)';
  } else if (event === 'Low Visibility') {
    possibleCause = 'Atmospheric Inversion & Moisture Fog/Smog';
  } else if (event === 'Traffic Jam') {
    possibleCause = 'Water Accumulation Bottleneck & Road Squeeze';
  }

  // Extract keywords
  const words = rawText.split(/\s+/).filter((w) => w.length > 3);
  const extractedKeywords = words.slice(0, 5);

  return {
    event,
    location,
    impact,
    severity,
    possibleCause,
    confidence: 0.94 + Math.min(0.05, words.length * 0.005),
    extractedKeywords,
    languageDetected,
  };
}

// Calculate distance between two lat/lng points in km
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Event Fusion Engine: Groups nearby reports into unified incident, detects duplicates, updates evidence score
export function processEventFusion(
  newReport: CitizenReport,
  existingEvents: UnifiedEvent[]
): {
  updatedEvents: UnifiedEvent[];
  matchedEvent: UnifiedEvent | null;
  isDuplicate: boolean;
  duplicateClusterName: string;
  evidenceScoreDelta: number;
} {
  // Find matching event within same city and 3.5km
  let bestMatch: UnifiedEvent | null = null;
  let minDistance = 999;

  for (const evt of existingEvents) {
    if (evt.cityId && newReport.cityId && evt.cityId !== newReport.cityId) {
      continue;
    }
    const dist = calculateDistanceKm(
      newReport.coordinates[0],
      newReport.coordinates[1],
      evt.coordinates[0],
      evt.coordinates[1]
    );

    if (dist < 3.5 && dist < minDistance) {
      minDistance = dist;
      bestMatch = evt;
    }
  }

  // If no match, we create a new unified event
  if (!bestMatch) {
    const newEvent: UnifiedEvent = {
      id: `evt-live-${Date.now()}`,
      cityId: newReport.cityId || 'pune',
      cityName: newReport.cityName || 'City',
      state: 'State',
      date: newReport.date || '2026-09-19',
      title: `${newReport.issueType} Alert (${newReport.locationName})`,
      type: newReport.issueType,
      locationId: newReport.locationId,
      locationName: newReport.locationName,
      coordinates: newReport.coordinates,
      severity: newReport.userSeverity,
      status: 'Active',
      verificationStatus: 'under_verification',
      reportCount: 1,
      independentSourcesCount: 1,
      likelyDuplicatesCount: 0,
      evidenceScore: 68,
      evidenceScoreBreakdown: {
        officialWeather: 20,
        citizenReports: 20,
        mediaTelemetry: newReport.imageUrl ? 15 : 8,
        spatialConsistency: 10,
        transitSpeedAnomaly: 5,
      },
      weatherCondition: 'Elevated Precipitation',
      rainfallMmH: 24.0,
      affectedRoads: [newReport.locationName],
      impactChain: [],
      timeline: [
        {
          time: 'Just now',
          title: 'Initial Citizen Incident Reported',
          description: `Single observation reported: "${newReport.rawText.slice(0, 60)}..."`,
          source: newReport.source,
          type: 'alert',
        },
      ],
      duplicateClusters: [],
      reports: [newReport],
      images: newReport.imageUrl
        ? [
            {
              url: newReport.imageUrl,
              caption: 'Citizen uploaded ground photo',
              timestamp: 'Just now',
              author: 'Citizen Contributor',
            },
          ]
        : [],
      lastUpdated: 'Just now',
    };

    return {
      updatedEvents: [newEvent, ...existingEvents],
      matchedEvent: newEvent,
      isDuplicate: false,
      duplicateClusterName: 'New Cluster',
      evidenceScoreDelta: 68,
    };
  }

  // Match found: evaluate duplication & update Event Fusion
  const reportTextLower = newReport.rawText.toLowerCase();
  const existingTexts = (bestMatch.reports || []).map((r) => r.rawText.toLowerCase());

  let isDuplicate = false;
  let duplicateSimilarityScore = 0.5;

  for (const prevText of existingTexts) {
    const commonWords = reportTextLower
      .split(/\s+/)
      .filter((w) => w.length > 3 && prevText.includes(w));
    if (commonWords.length >= 2 || minDistance < 0.6) {
      isDuplicate = true;
      duplicateSimilarityScore = Math.min(0.96, 0.75 + commonWords.length * 0.06);
      break;
    }
  }

  // Update matched event evidence score and counts
  const newReportCount = bestMatch.reportCount + 1;
  const newDuplicatesCount = isDuplicate ? bestMatch.likelyDuplicatesCount + 1 : bestMatch.likelyDuplicatesCount;
  const newIndependentSources = isDuplicate ? bestMatch.independentSourcesCount : bestMatch.independentSourcesCount + 1;

  // Calculate evidence score bump
  const scoreBump = isDuplicate ? 1 : newReport.imageUrl ? 5 : 3;
  const newEvidenceScore = Math.min(99, bestMatch.evidenceScore + scoreBump);

  const updatedEvent: UnifiedEvent = {
    ...bestMatch,
    reportCount: newReportCount,
    likelyDuplicatesCount: newDuplicatesCount,
    independentSourcesCount: newIndependentSources,
    evidenceScore: newEvidenceScore,
    verificationStatus: newEvidenceScore >= 80 ? 'verified' : 'under_verification',
    lastUpdated: 'Just now',
    reports: [
      {
        ...newReport,
        isDuplicate,
        duplicateSimilarityScore,
      },
      ...(bestMatch.reports || []),
    ],
    timeline: [
      {
        time: 'Just now',
        title: isDuplicate ? 'Corroborating Report Fused (Duplicate Suppressed)' : 'New Independent Ground Evidence Added',
        description: `Observation: "${newReport.rawText.slice(0, 60)}..."`,
        source: newReport.source,
        type: isDuplicate ? 'fusion' : 'alert',
      },
      ...bestMatch.timeline,
    ],
    images: newReport.imageUrl
      ? [
          {
            url: newReport.imageUrl,
            caption: 'Newly corroborated ground photo',
            timestamp: 'Just now',
            author: 'Verified Ground Reporter',
          },
          ...bestMatch.images,
        ]
      : bestMatch.images,
  };

  const updatedEvents = existingEvents.map((e) => (e.id === bestMatch.id ? updatedEvent : e));

  return {
    updatedEvents,
    matchedEvent: updatedEvent,
    isDuplicate,
    duplicateClusterName: bestMatch.locationName,
    evidenceScoreDelta: scoreBump,
  };
}
