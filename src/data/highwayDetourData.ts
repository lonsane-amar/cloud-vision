import { DetourCorridor } from '../types';

export const HIGHWAY_DETOUR_CORRIDORS: DetourCorridor[] = [
  // ================= 1. PUNE CORRIDORS =================
  {
    id: 'mumbai-pune-expressway-landslide',
    name: 'Mumbai - Pune Expressway & Bhor Ghat Landslide Detour',
    highwayCode: 'NH-48 / E-Way',
    regionName: 'Mumbai - Pune Highway Corridor',
    cityId: 'pune',
    locationId: 'hinjewadi', // Links also to western Pune gateway
    hazardType: 'landslide',
    hazardDescription: 'Landslide & heavy rockfall at Khandala Ghat (Amrutanjan Bridge section km 41+200) triggered by 38 mm/h cloudburst. Mumbai-bound and Pune-bound fast lanes blocked by mud slurry & boulders.',
    blockedSegment: {
      name: 'Mumbai-Pune Expressway (Khopoli to Lonavala Ghat Section)',
      startCoord: [18.7750, 73.3420],
      endCoord: [18.7510, 73.4180],
      points: [
        [18.7820, 73.3310], // Khalapur interchange approach
        [18.7750, 73.3420], // Khopoli Toll
        [18.7695, 73.3590], // Bhor Ghat base
        [18.7620, 73.3760], // Adoshi Tunnel (Hazard Spot)
        [18.7570, 73.3910], // Amrutanjan Bridge Landslide Choke
        [18.7535, 73.4020], // Khandala Exit
        [18.7510, 73.4180], // Valvan Lonavala
      ],
      hazardNote: '⛔ EXPRESSWAY BLOCKED: 450+ tonnes of debris on carriageway. IRB & NDRF heavy earthmovers on site.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'old-nh48-khopoli-bypass',
      name: 'Primary Safe Detour: Old Mumbai - Pune Highway (Old NH-48 via Khopoli Phata)',
      type: 'primary_detour',
      points: [
        [18.7820, 73.3310], // Khalapur Exit 4B
        [18.7900, 73.3450], // Khopoli Town Outer Ring
        [18.7780, 73.3620], // Old Borghat Scenic Incline (Reinforced Retaining Wall)
        [18.7660, 73.3850], // Khandala St. Xavier Villa Bypass
        [18.7580, 73.4080], // Old Khandala Bazaar (Well Drained)
        [18.7510, 73.4180], // Rejoin Expressway at Valvan Interchange
      ],
      distanceKm: 21.4,
      etaDeltaMinutes: 22,
      avgSpeedKmh: 42,
      roadCondition: 'Reinforced concrete pavement, concrete rockfall catch nets active, 0 standing water, heavy police pilot convoy.',
      safetyScore: 94,
      keyWaypoints: [
        'Divert at Khalapur Toll Exit (km 38)',
        'Take Khopoli Bypass link road',
        'Ascend Old Borghat (Speed capped at 40 km/h)',
        'Pass Khandala Lake ridge',
        'Rejoin NH-48 / Expressway at Valvan Lonavala',
      ],
      advisory: 'Recommended for all private passenger vehicles, emergency ambulances, and state transport buses. Single lane police piloted.',
    },
    alternativeDetour: {
      id: 'tamhini-wakan-bypass',
      name: 'Heavy Commercial Detour: Shedung - Pali - Wakan - Kolad - Tamhini Ghat',
      type: 'secondary_detour',
      points: [
        [18.7820, 73.3310],
        [18.7350, 73.2850], // Pali approach
        [18.6820, 73.2210], // Wakan junction
        [18.5250, 73.4500], // Tamhini crest
        [18.5120, 73.7650], // Paud - Chandani Chowk Pune
      ],
      distanceKm: 68.0,
      etaDeltaMinutes: 65,
      avgSpeedKmh: 35,
      roadCondition: 'Wider multi-axle freight clearance, entirely bypasses the Sahyadri landslide belt.',
      safetyScore: 89,
      keyWaypoints: [
        'Divert at Shedung Toll Plaza',
        'Proceed via SH-92 towards Pali Ganpati temple',
        'Merge onto Tamhini Ghat Road (elevated plateau)',
        'Enter Pune West at Chandani Chowk',
      ],
      advisory: 'Mandatory route for 6+ axle multi-axle trucks and hazardous material tankers until Khandala is restored.',
    },
    nhaiAdvisory: 'NHAI & Maharashtra Highway Police Advisory HP-882: Expressway traffic diverted to Old NH-48. Drone surveillance active over Borghat.',
    policeEscortActive: true,
    lastUpdated: '8 mins ago',
  },

  {
    id: 'pune-sinhagad-canal-detour',
    name: 'Sinhagad Road Mutha Canal Inundation Detour',
    highwayCode: 'Major Arterial / NH-48 Bypass',
    regionName: 'Pune City - Sinhagad Corridor',
    cityId: 'pune',
    locationId: 'sinhagad-road',
    hazardType: 'waterlogging',
    hazardDescription: 'Mutha Right Bank Canal breached near Pu La Deshpande Garden. 21.5 inches deep water across Rajaram Bridge to Manikbaug. PMPML buses stalled.',
    blockedSegment: {
      name: 'Sinhagad Road (Rajaram Bridge to Fun Time Theatre)',
      startCoord: [18.4980, 73.8420],
      endCoord: [18.4680, 73.8050],
      points: [
        [18.4980, 73.8420],
        [18.4895, 73.8335],
        [18.4862, 73.8293],
        [18.4810, 73.8240],
        [18.4760, 73.8180],
        [18.4680, 73.8050],
      ],
      inundationDepthInches: 21.5,
      hazardNote: '⛔ SEVERE INUNDATION: 21.5" water depth. Submerged culvert manholes. Traffic halted.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'sinhagad-dp-road-detour',
      name: 'Primary Detour: 100-Ft DP Road & Karve Road - Warje Bypass Link',
      type: 'primary_detour',
      points: [
        [18.4980, 73.8420], // Rajaram Bridge Exit
        [18.5020, 73.8280], // Mhatre Bridge approach
        [18.4980, 73.8110], // Karve Nagar 100ft DP Road
        [18.4870, 73.7950], // Warje Flyover
        [18.4720, 73.7920], // Vadgaon-Budruk NH-48 Underpass
        [18.4680, 73.8050], // Sinhagad Road Outer Rejoin
      ],
      distanceKm: 8.6,
      etaDeltaMinutes: 14,
      avgSpeedKmh: 36,
      roadCondition: 'Elevated riverfront DP road with stormwater culverts operating normally. High visibility, zero waterlogging.',
      safetyScore: 96,
      keyWaypoints: [
        'Turn right at Rajaram Bridge onto 100-Ft DP Road',
        'Proceed along Karve Nagar Canal road (elevated ridge)',
        'Pass Warje Flyover junction',
        'Take Mumbai-Bangalore NH-48 Bypass service lane to Dhayari / Vadgaon',
      ],
      advisory: 'Recommended by Pune Traffic Police for all Khadakwasla, Dhayari, and Sinhagad commuters.',
    },
    alternativeDetour: {
      id: 'katraj-ambegaon-link',
      name: 'South Bypass: Via Bibwewadi - Ambegaon - Katraj Tunnel Link',
      type: 'secondary_detour',
      points: [
        [18.4980, 73.8420],
        [18.4720, 73.8550], // Bibwewadi
        [18.4550, 73.8420], // Ambegaon Pathar
        [18.4680, 73.8050], // Wadgaon Bridge
      ],
      distanceKm: 11.2,
      etaDeltaMinutes: 20,
      avgSpeedKmh: 32,
      roadCondition: 'Clear from Mutha canal catchment, moderate traffic flow.',
      safetyScore: 90,
      keyWaypoints: [
        'Divert via Swargate - Bibwewadi',
        'Ascend Ambegaon ridge',
        'Connect via NH-48 bypass corridor',
      ],
      advisory: 'Good for commuters heading towards Narhe, Dhayari, or Pune-Satara highway.',
    },
    nhaiAdvisory: 'PMC Disaster Management Advisory: Dewatering pumps installed at Manikbaug. Divert via DP Road.',
    policeEscortActive: false,
    lastUpdated: '12 mins ago',
  },

  {
    id: 'pune-katraj-ghat-detour',
    name: 'Katraj New Tunnel Mudslip & Highway Bypass Detour',
    highwayCode: 'NH-48 (Pune - Satara)',
    regionName: 'Pune South - Katraj Ghat Corridor',
    cityId: 'pune',
    locationId: 'katraj',
    hazardType: 'landslide',
    hazardDescription: 'Mud slurry, rock debris and 14 inches standing water accumulation at the mouth of the Katraj New 6-Lane Tunnel approach.',
    blockedSegment: {
      name: 'NH-48 Katraj New Tunnel Approach & Wonder City Slope',
      startCoord: [18.4520, 73.8610],
      endCoord: [18.4310, 73.8690],
      points: [
        [18.4520, 73.8610],
        [18.4440, 73.8630],
        [18.4380, 73.8650],
        [18.4310, 73.8690],
      ],
      inundationDepthInches: 14.0,
      hazardNote: '⛔ SLIPPERY MUD SLURRY: Tunnel north portal blocked by hillwash debris.',
      status: 'HAZARDOUS CRAWL',
    },
    recommendedDetour: {
      id: 'old-katraj-ghat-bypass',
      name: 'Primary Safe Detour: Old Katraj Ghat Historic Scenic Road',
      type: 'primary_detour',
      points: [
        [18.4520, 73.8610], // Katraj Chowk
        [18.4410, 73.8520], // Katraj Snake Park link
        [18.4280, 73.8560], // Old Katraj Ghat crest
        [18.4190, 73.8620], // Bapdeo / Shindewadi descent
        [18.4310, 73.8690], // Rejoin NH-48 at Shindewadi Toll
      ],
      distanceKm: 7.4,
      etaDeltaMinutes: 12,
      avgSpeedKmh: 38,
      roadCondition: 'Rocky mountain terrain, solid foundation, natural runoff trenches prevent pooling.',
      safetyScore: 92,
      keyWaypoints: [
        'Turn right at Katraj Chowk towards Old Ghat',
        'Ascend the well-paved 2-lane historic ghat',
        'Cross Katraj pass summit',
        'Merge back onto NH-48 past the blocked tunnel',
      ],
      advisory: 'Clear for two-wheelers, cars, and passenger utility vehicles. High visibility.',
    },
    nhaiAdvisory: 'NHAI Satara Division: JCB earthmovers clearing tunnel silt. Reopening expected in 2 hours.',
    policeEscortActive: false,
    lastUpdated: '14 mins ago',
  },

  {
    id: 'pune-hinjewadi-baner-detour',
    name: 'Hinjewadi IT Park Ph-1 Bridge & Baner Sus Bypass',
    highwayCode: 'IT Expressway / NH-48 Bypass',
    regionName: 'Pune West Tech Corridor',
    cityId: 'pune',
    locationId: 'baner',
    hazardType: 'waterlogging',
    hazardDescription: 'Mula River tributary backflow under Hinjewadi Bridge and Baner-Sus road underpass. 16.5 inches water depth.',
    blockedSegment: {
      name: 'Baner-Sus Underpass & Hinjewadi Phase 1 Approach',
      startCoord: [18.5680, 73.7820],
      endCoord: [18.5890, 73.7450],
      points: [
        [18.5680, 73.7820],
        [18.5750, 73.7650],
        [18.5820, 73.7550],
        [18.5890, 73.7450],
      ],
      inundationDepthInches: 16.5,
      hazardNote: '⛔ UNDERPASS INUNDATED: 16.5" water under highway bridge. Sedans stalled.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'marunji-wakad-bypass',
      name: 'Primary Detour: Aundh - Wakad Flyover - Marunji IT Link Road',
      type: 'primary_detour',
      points: [
        [18.5680, 73.7820], // Baner Highway
        [18.5850, 73.7750], // Wakad Flyover Top Deck
        [18.5990, 73.7650], // Bhumkar Chowk (Elevated)
        [18.6050, 73.7480], // Marunji Road
        [18.5890, 73.7450], // Hinjewadi Phase 2 Wipro Circle
      ],
      distanceKm: 9.1,
      etaDeltaMinutes: 15,
      avgSpeedKmh: 40,
      roadCondition: 'Elevated flyover and 6-lane arterial road with concrete median drainage.',
      safetyScore: 95,
      keyWaypoints: [
        'Take Wakad elevated flyover top deck',
        'Bypass flooded underpass via Bhumkar Chowk',
        'Turn onto Marunji-Hinjewadi spine road',
      ],
      advisory: 'Pimpri-Chinchwad Police Advisory: All IT tech shuttle buses directed to Wakad Flyover.',
    },
    nhaiAdvisory: 'PMC Drainage Wing: High-speed mobile water pumps activated at Sus underpass.',
    policeEscortActive: false,
    lastUpdated: '10 mins ago',
  },

  // ================= 2. DELHI NCR CORRIDORS =================
  {
    id: 'delhi-minto-underpass-detour',
    name: 'Delhi Minto Bridge Railway Underpass Submergence Detour',
    highwayCode: 'Central Delhi Arterial / CP Ring',
    regionName: 'Delhi Central - Connaught Place Link',
    cityId: 'delhi',
    locationId: 'delhi-minto-bridge',
    hazardType: 'waterlogging',
    hazardDescription: 'Minto Bridge railway underpass completely submerged in 28 inches of floodwater after 56 mm/h downpour. DTC bus trapped, underpass barricaded by Delhi Police.',
    blockedSegment: {
      name: 'Minto Road Underpass (CP Outer Circle to Swami Vivekananda Marg)',
      startCoord: [28.6385, 77.2255],
      endCoord: [28.6440, 77.2290],
      points: [
        [28.6350, 77.2220], // CP Outer Circle
        [28.6385, 77.2255], // Minto Bridge entry
        [28.6415, 77.2275], // Deep Sump Center (28" depth)
        [28.6440, 77.2290], // New Delhi Railway Station exit
      ],
      inundationDepthInches: 28.0,
      hazardNote: '⛔ COMPLETELY SUBMERGED: 28" water level. Underpass closed by barricades.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'delhi-barakhamba-tagore-detour',
      name: 'Primary Detour: Barakhamba Road - Tagore Road - Bhavbhuti Marg Flyover Bypass',
      type: 'primary_detour',
      points: [
        [28.6350, 77.2220], // Connaught Place
        [28.6290, 77.2280], // Barakhamba Road
        [28.6340, 77.2340], // Ranjit Singh Flyover (Elevated)
        [28.6440, 77.2290], // New Delhi Railway Station Paharganj side
      ],
      distanceKm: 3.8,
      etaDeltaMinutes: 9,
      avgSpeedKmh: 35,
      roadCondition: 'Ranjit Singh Flyover is 100% elevated over rail lines, zero water accumulation.',
      safetyScore: 98,
      keyWaypoints: [
        'Divert from CP Outer Circle to Barakhamba Road',
        'Take Ranjit Singh Flyover towards Old Delhi',
        'Descend onto Bhavbhuti Marg near New Delhi Station',
      ],
      advisory: 'Delhi Traffic Police Notice: Minto Underpass strictly closed. Use Ranjit Singh Flyover.',
    },
    nhaiAdvisory: 'MCD Drainage: 4 high-head submersible pumps operating at 50,000 gpm.',
    policeEscortActive: true,
    lastUpdated: '6 mins ago',
  },

  {
    id: 'delhi-ito-vikas-marg-detour',
    name: 'Delhi ITO Junction & Vikas Marg Yamuna Spate Detour',
    highwayCode: 'Ring Road / NH-44 Link',
    regionName: 'Delhi East - ITO Corridor',
    cityId: 'delhi',
    locationId: 'delhi-ito',
    hazardType: 'waterlogging',
    hazardDescription: 'Yamuna overflow regulator seepage and stormwater reflux near WHO building and ITO intersection. 19.5 inches standing water.',
    blockedSegment: {
      name: 'Vikas Marg & ITO Red Light Underpass',
      startCoord: [28.6280, 77.2410],
      endCoord: [28.6340, 77.2510],
      points: [
        [28.6250, 77.2380], // Tilak Bridge
        [28.6280, 77.2410], // ITO intersection
        [28.6310, 77.2460], // Vikas Marg Yamuna approach
        [28.6340, 77.2510], // Laxmi Nagar ramp
      ],
      inundationDepthInches: 19.5,
      hazardNote: '⛔ YAMUNA SEEPAGE: 19.5" water at Vikas Bhawan. Traffic diverted.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'delhi-geeta-colony-pragati-detour',
      name: 'Primary Detour: Geeta Colony Bridge & Pragati Maidan Integrated Tunnel',
      type: 'primary_detour',
      points: [
        [28.6250, 77.2380], // Tilak Bridge
        [28.6180, 77.2440], // Pragati Maidan Tunnel Entry
        [28.6250, 77.2620], // Ring Road elevated viaduct
        [28.6420, 77.2650], // Geeta Colony Bridge (High embankment)
        [28.6340, 77.2510], // Rejoin Vikas Marg East
      ],
      distanceKm: 6.2,
      etaDeltaMinutes: 12,
      avgSpeedKmh: 45,
      roadCondition: 'Pragati Maidan tunnel drainage systems operating, Geeta Colony bridge clear.',
      safetyScore: 96,
      keyWaypoints: [
        'Take Pragati Maidan underpass tunnel corridor',
        'Cross Yamuna via Geeta Colony Bridge',
        'Connect directly to Laxmi Nagar and Preet Vihar',
      ],
      advisory: 'Recommended for East Delhi commuters and Noida/Ghaziabad office-goers.',
    },
    nhaiAdvisory: 'DDMA Alert: Yamuna level at Old Railway Bridge is 205.85m. Corridors monitored.',
    policeEscortActive: true,
    lastUpdated: '9 mins ago',
  },

  {
    id: 'delhi-nh48-hero-honda-detour',
    name: 'Delhi - Gurugram NH-48 Hero Honda & Dhaula Kuan Detour',
    highwayCode: 'NH-48 (Delhi - Jaipur)',
    regionName: 'Delhi NCR - Gurugram Highway',
    cityId: 'delhi',
    locationId: 'delhi-dhaula-kuan',
    hazardType: 'waterlogging',
    hazardDescription: 'Submerged underpass and severe waterlogging at Hero Honda Chowk, Dhaula Kuan grade separator & Narsinghpur (28 inches water). Main carriageway tailback extending 12 km.',
    blockedSegment: {
      name: 'Delhi-Gurugram NH-48 Main Underpass & Expressway Carriageway',
      startCoord: [28.4420, 77.0120],
      endCoord: [28.4110, 76.9820],
      points: [
        [28.4680, 77.0420], // Rajiv Chowk
        [28.4550, 77.0280], // Subhash Chowk approach
        [28.4420, 77.0120], // Hero Honda Chowk (Submerged Underpass)
        [28.4280, 76.9960], // Narsinghpur Choke
        [28.4110, 76.9820], // Kherki Daula Toll
      ],
      inundationDepthInches: 28.0,
      hazardNote: '⛔ CRITICAL WATERLOGGING: 28" submergence. Submerged vehicles. Heavy pump dewatering underway.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'delhi-spr-golf-course-detour',
      name: 'Primary Detour: Southern Peripheral Road (SPR) & Sohna Elevated Corridor',
      type: 'primary_detour',
      points: [
        [28.4680, 77.0420], // Exit Rajiv Chowk Gurugram
        [28.4350, 77.0680], // Golf Course Extension Road
        [28.3980, 77.0420], // Southern Peripheral Road (SPR) Interchange
        [28.3820, 77.0150], // Sohna Elevated Highway Access
        [28.4110, 76.9820], // Rejoin NH-48 at Pachgaon/Kherki Daula Bypass
      ],
      distanceKm: 16.8,
      etaDeltaMinutes: 24,
      avgSpeedKmh: 54,
      roadCondition: 'Completely grade-separated elevated flyovers and 8-lane expressway. 0 standing water.',
      safetyScore: 97,
      keyWaypoints: [
        'Divert left at Rajiv Chowk towards Sohna Road',
        'Take Southern Peripheral Road (SPR) flyover',
        'Proceed seamlessly through Golf Course Extn connector',
        'Merge onto Sohna Elevated Corridor (NH-248A)',
        'Rejoin NH-48 past the flooded Kherki Daula basin',
      ],
      advisory: 'Gurugram Traffic Police Alert: All Jaipur-bound and Manesar-bound passenger vehicles advised to take SPR.',
    },
    nhaiAdvisory: 'NHAI Notice NH-48/GGM: Pumps discharging at 40,000 litres/min. Divert via SPR or Dwarka Expressway.',
    policeEscortActive: true,
    lastUpdated: '5 mins ago',
  },

  // ================= 3. KOLKATA CORRIDORS =================
  {
    id: 'kolkata-park-street-detour',
    name: 'Kolkata Park Street & Camac St Inundation Detour',
    highwayCode: 'South Central Kolkata Arterial',
    regionName: 'Kolkata City Central',
    cityId: 'kolkata',
    locationId: 'kolkata-park-street',
    hazardType: 'waterlogging',
    hazardDescription: 'Stormwater drainage lock gate overflow. Park Street intersection and Camac Street submerged under 18 inches of rain water. Trams and buses stalled.',
    blockedSegment: {
      name: 'Park Street (Jawaharlal Nehru Road to Mullick Bazar)',
      startCoord: [22.5530, 88.3510],
      endCoord: [22.5480, 88.3650],
      points: [
        [22.5530, 88.3510],
        [22.5510, 88.3570],
        [22.5495, 88.3610],
        [22.5480, 88.3650],
      ],
      inundationDepthInches: 18.0,
      hazardNote: '⛔ URBAN INUNDATION: 18" water depth at Camac St crossing. Manholes open for discharge.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'kolkata-ajc-bose-flyover-detour',
      name: 'Primary Detour: AJC Bose Road Elevated Flyover & Shakespeare Sarani',
      type: 'primary_detour',
      points: [
        [22.5530, 88.3510], // JL Nehru Road
        [22.5410, 88.3490], // Rabindra Sadan ramp
        [22.5420, 88.3620], // AJC Bose Flyover Top Deck
        [22.5480, 88.3650], // Mullick Bazar descent
      ],
      distanceKm: 4.2,
      etaDeltaMinutes: 10,
      avgSpeedKmh: 36,
      roadCondition: 'Elevated flyover deck free from municipal waterlogging. Fast flow.',
      safetyScore: 96,
      keyWaypoints: [
        'Divert from JL Nehru Road onto AJC Bose Flyover ramp',
        'Cruise across the elevated corridor bypassing Park St under-tier',
        'Descend past Mullick Bazar towards Sealdah or EM Bypass',
      ],
      advisory: 'KMC Advisory: Commuters towards Science City should strictly take AJC Bose Flyover.',
    },
    nhaiAdvisory: 'KMC Drainage Pumping Station Palmer Bazaar: 12 diesel pumps running at full throttle.',
    policeEscortActive: false,
    lastUpdated: '12 mins ago',
  },

  {
    id: 'kolkata-kona-nh16-detour',
    name: 'Kolkata - Howrah Kona Expressway & NH-16 Flood Detour',
    highwayCode: 'NH-16 / Kona Expressway',
    regionName: 'Kolkata - Howrah Inter-District Highway',
    cityId: 'kolkata',
    locationId: 'kolkata-howrah-bridge',
    hazardType: 'waterlogging',
    hazardDescription: 'Kona Expressway approach near Santragachi Railway Bridge submerged in 23 inches of floodwater due to Hooghly high tide lock gate surcharge.',
    blockedSegment: {
      name: 'Kona Expressway (Santragachi Bus Terminal to Garfa Bridge)',
      startCoord: [22.5850, 88.3120],
      endCoord: [22.5620, 88.2750],
      points: [
        [22.5920, 88.3320], // Toll plaza Vidyasagar Setu
        [22.5850, 88.3120], // Santragachi Flyover ramp
        [22.5760, 88.2950], // Kona Choke point
        [22.5620, 88.2750], // Nibra NH-16 Junction
      ],
      inundationDepthInches: 23.0,
      hazardNote: '⛔ FLOODED CARRIAGEWAY: High tide reflux on Kona corridor. Water depth 23". Heavy vehicle diversions.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'kolkata-andul-nh16-detour',
      name: 'Primary Detour: Via Andul Road - Mourigram - Alampur NH-16 Bypass',
      type: 'primary_detour',
      points: [
        [22.5920, 88.3320], // Vidyasagar Setu Toll
        [22.5780, 88.3180], // Andul Road Flyover
        [22.5680, 88.2980], // Mourigram Overbridge (High Elevation)
        [22.5550, 88.2820], // Alampur Junction
        [22.5620, 88.2750], // Rejoin NH-16 at Nibra Toll
      ],
      distanceKm: 13.5,
      etaDeltaMinutes: 18,
      avgSpeedKmh: 38,
      roadCondition: 'Railway overbridge route situated 4 meters above surrounding marshlands. Well-drained asphalt.',
      safetyScore: 93,
      keyWaypoints: [
        'Take second exit from Vidyasagar Setu Toll Plaza',
        'Merge onto Andul Road 4-lane elevated corridor',
        'Cross Mourigram Overbridge',
        'Connect directly to NH-16 at Alampur',
      ],
      advisory: 'Howrah City Police Advisory: Divert all Durgapur and Kharagpur-bound buses through Andul Road.',
    },
    nhaiAdvisory: 'KMC & Howrah Drainage Board: Lock gates closed during tidal peak. Drain sluice open at low tide.',
    policeEscortActive: false,
    lastUpdated: '15 mins ago',
  },

  {
    id: 'kolkata-saltlake-sec5-detour',
    name: 'Salt Lake Sector V Tech Ring Waterlogging Detour',
    highwayCode: 'EM Bypass / MAR Expressway',
    regionName: 'Kolkata IT Corridor',
    cityId: 'kolkata',
    locationId: 'kolkata-saltlake-sec5',
    hazardType: 'waterlogging',
    hazardDescription: 'Storm drain overflow at College More and SDF Building ring. 14 inches standing water blocking tech campus employee shuttles.',
    blockedSegment: {
      name: 'Sector V Ring Road (College More to Webel More)',
      startCoord: [22.5710, 88.4280],
      endCoord: [22.5850, 88.4380],
      points: [
        [22.5710, 88.4280],
        [22.5770, 77.4320],
        [22.5810, 88.4350],
        [22.5850, 88.4380],
      ],
      inundationDepthInches: 14.0,
      hazardNote: '⛔ IT RING INUNDATION: 14" water at SDF building. Slow crawl.',
      status: 'HAZARDOUS CRAWL',
    },
    recommendedDetour: {
      id: 'newtown-mar-bypass',
      name: 'Primary Detour: New Town Major Arterial Road (MAR) & EM Bypass Viaduct',
      type: 'primary_detour',
      points: [
        [22.5710, 88.4280],
        [22.5680, 88.4150], // EM Bypass Junction
        [22.5820, 88.4620], // New Town MAR Elevated Highway
        [22.5850, 88.4380], // Webel More North Gate
      ],
      distanceKm: 7.2,
      etaDeltaMinutes: 11,
      avgSpeedKmh: 42,
      roadCondition: 'Wide elevated 8-lane expressway with underground automated drain sumps.',
      safetyScore: 96,
      keyWaypoints: [
        'Divert to EM Bypass elevated viaduct',
        'Take New Town Major Arterial Road',
        'Enter Sector V from the northern higher gate',
      ],
      advisory: 'Bidhannagar Police: Shuttle buses should use New Town MAR access.',
    },
    nhaiAdvisory: 'HIDCO: Automatic pumping station active at Sector V canal gate.',
    policeEscortActive: false,
    lastUpdated: '16 mins ago',
  },

  // ================= 4. BIHAR / PATNA CORRIDORS =================
  {
    id: 'bihar-patna-nh22-detour',
    name: 'Bihar NH-22 Mahatma Gandhi Setu & Rajendra Nagar Flood Detour',
    highwayCode: 'NH-22 / NH-31',
    regionName: 'Patna - North Bihar Highway Corridor',
    cityId: 'bihar',
    locationId: 'patna-gandhi-setu',
    hazardType: 'flash_flood',
    hazardDescription: 'Ganga river level at Digha Ghat 1.2m above danger mark. Southern approach to Mahatma Gandhi Setu & Zero Mile submerged under 22 inches floodwater.',
    blockedSegment: {
      name: 'Mahatma Gandhi Setu South Ramp & Zero Mile NH-22',
      startCoord: [25.6150, 85.2150],
      endCoord: [25.6450, 85.2390],
      points: [
        [25.5950, 85.1950], // Kankarbagh bypass
        [25.6080, 85.2050], // Zero Mile Patna
        [25.6150, 85.2150], // MG Setu South Ramp
        [25.6291, 85.2285], // Ganga Mid-river Pier
        [25.6450, 85.2390], // Hajipur Toll
      ],
      inundationDepthInches: 22.0,
      hazardNote: '⛔ RIVER INUNDATION: Ganga backflow on southern embankment. South approach closed to light vehicles.',
      status: 'RESTRICTED',
    },
    recommendedDetour: {
      id: 'bihar-jp-ganga-path-detour',
      name: 'Primary Detour: JP Ganga Path (Marine Drive) & JP Setu (Digha - Sonpur Rail-Road Bridge)',
      type: 'primary_detour',
      points: [
        [25.5950, 85.1950], // Patna Inner
        [25.6180, 85.1450], // Entry to JP Ganga Path Marine Drive
        [25.6420, 85.1120], // Elevated Ganga Expressway
        [25.6650, 85.1250], // JP Setu Digha Bridge
        [25.6880, 85.1480], // Sonpur - Hajipur NH-31 Connector
      ],
      distanceKm: 19.8,
      etaDeltaMinutes: 20,
      avgSpeedKmh: 58,
      roadCondition: 'World-class 4-lane elevated Marine Drive along Ganga, 5.5 meters above maximum historic flood levels.',
      safetyScore: 98,
      keyWaypoints: [
        'Take Kankarbagh road to Ashok Rajpath',
        'Enter JP Ganga Path (Marine Drive) at Gandhi Maidan ramp',
        'High-speed cruise to Digha Ghat',
        'Cross Ganga via JP Setu Bridge (Double-decker)',
        'Connect directly to NH-31 towards Hajipur & Muzaffarpur',
      ],
      advisory: 'Bihar State Disaster Management Authority (BSDMA): Mandatory bypass for all North Bihar commuters.',
    },
    nhaiAdvisory: 'BSDMA Advisory: Heavy transport diverted via JP Setu and Bakhtiyarpur-Tajpur route.',
    policeEscortActive: true,
    lastUpdated: '10 mins ago',
  },

  {
    id: 'patna-rajendra-nagar-detour',
    name: 'Patna Rajendra Nagar & Kankarbagh Sump Inundation Detour',
    highwayCode: 'Patna City Arterial / Old Bypass',
    regionName: 'Patna Urban Core',
    cityId: 'bihar',
    locationId: 'patna-rajendra-nagar',
    hazardType: 'waterlogging',
    hazardDescription: 'Severe waterlogging (24 inches) near Rajendra Nagar Terminal and Kankarbagh Colony due to sump blockage and heavy downpour. Vehicles submerged.',
    blockedSegment: {
      name: 'Kankarbagh Main Road & Rajendra Nagar Underbridge',
      startCoord: [25.5950, 85.1550],
      endCoord: [25.6020, 85.1850],
      points: [
        [25.5950, 85.1550],
        [25.5980, 85.1680],
        [25.6000, 85.1760],
        [25.6020, 85.1850],
      ],
      inundationDepthInches: 24.0,
      hazardNote: '⛔ URBAN WATERLOGGING: 24" standing water in sump area. Low-clearance vehicles stranded.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'patna-bailey-road-detour',
      name: 'Primary Detour: Bailey Road (Jawaharlal Nehru Marg) & New Bypass Elevated Corridor',
      type: 'primary_detour',
      points: [
        [25.5950, 85.1550], // Dak Bungalow Chowk
        [25.6100, 85.1250], // Bailey Road Flyover
        [25.5850, 85.1200], // Patliputra Link
        [25.5780, 85.1750], // New Patna Bypass Road (High elevation)
        [25.6020, 85.1850], // Patna City East entrance
      ],
      distanceKm: 12.4,
      etaDeltaMinutes: 16,
      avgSpeedKmh: 45,
      roadCondition: 'Wide multi-lane elevated corridor with underground drainage pumps in operational status.',
      safetyScore: 95,
      keyWaypoints: [
        'Divert from Dak Bungalow towards Bailey Road',
        'Take the elevated Bailey Road flyover',
        'Connect via New Bypass Road situated on a flood-safe embankment',
      ],
      advisory: 'BSDMA Advisory: Avoid low-lying Kankarbagh roads. Use Bailey Road.',
    },
    nhaiAdvisory: 'Patna Municipal Corporation: Dewatering pumps active at Saidpur and Pahari sumps.',
    policeEscortActive: false,
    lastUpdated: '11 mins ago',
  },

  // ================= 5. MUMBAI CORRIDORS =================
  {
    id: 'mumbai-milan-subway-detour',
    name: 'Mumbai Milan Subway & Western Express Highway Detour',
    highwayCode: 'WEH / SV Road',
    regionName: 'Mumbai Suburbs - Santacruz Corridor',
    cityId: 'mumbai',
    locationId: 'mumbai-milan-subway',
    hazardType: 'waterlogging',
    hazardDescription: 'Milan Subway underpass completely submerged under 22 inches of rainwater during 4.8m high tide. Cars stranded, Subway shut by Mumbai Traffic Police.',
    blockedSegment: {
      name: 'Milan Subway Underpass (Santacruz West to East)',
      startCoord: [19.0833, 72.8410],
      endCoord: [19.0833, 72.8480],
      points: [
        [19.0833, 72.8380], // SV Road Santacruz West
        [19.0833, 72.8410], // Subway ramp descent
        [19.0833, 72.8444], // Submerged rail underpass (22" depth)
        [19.0833, 72.8480], // Western Express Highway junction
      ],
      inundationDepthInches: 22.0,
      hazardNote: '⛔ UNDERPASS SUBMERGED: 22" water under railway tracks. Subway closed.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'mumbai-milan-flyover-detour',
      name: 'Primary Detour: Milan Road Over Bridge (Milan Flyover) Elevated Route',
      type: 'primary_detour',
      points: [
        [19.0833, 72.8380], // SV Road
        [19.0880, 72.8410], // Milan Flyover West Ramp (High clearance)
        [19.0880, 72.8460], // Elevated flyover deck over Western Railway tracks
        [19.0833, 72.8480], // Western Express Highway East Ramp
      ],
      distanceKm: 2.8,
      etaDeltaMinutes: 8,
      avgSpeedKmh: 35,
      roadCondition: 'Reinforced concrete elevated flyover 12 meters above rail tracks, completely unaffected by subway flooding.',
      safetyScore: 98,
      keyWaypoints: [
        'Divert onto SV Road northbound for 200m',
        'Take Milan Flyover elevated ramp',
        'Cross safely above the flooded railway underpass',
        'Descend directly onto Western Express Highway (WEH)',
      ],
      advisory: 'Mumbai Traffic Police Notice: Milan Subway closed. All vehicular traffic diverted to Milan Flyover.',
    },
    nhaiAdvisory: 'BMC Disaster Control: 6 dewatering diesel pumps discharging water into Irla nullah.',
    policeEscortActive: true,
    lastUpdated: '5 mins ago',
  },

  {
    id: 'mumbai-hindmata-dadar-detour',
    name: 'Mumbai Hindmata & Dadar TT Flood Detour',
    highwayCode: 'Eastern Arterial / Dr. BA Road',
    regionName: 'Mumbai Central - Dadar Corridor',
    cityId: 'mumbai',
    locationId: 'mumbai-hindmata',
    hazardType: 'waterlogging',
    hazardDescription: 'Dr. Babasaheb Ambedkar Road at Hindmata Cinema submerged under 21 inches of water after continuous cloudburst over Dadar and Parel.',
    blockedSegment: {
      name: 'Dr. BA Road Hindmata Under-Flyover Carriageway',
      startCoord: [19.0180, 72.8410],
      endCoord: [19.0080, 72.8430],
      points: [
        [19.0220, 72.8400], // Dadar TT Circle
        [19.0180, 72.8410], // Hindmata Cinema approach
        [19.0144, 72.8423], // Hindmata Low-lying Bowl (21" depth)
        [19.0080, 72.8430], // Parel Bridge foot
      ],
      inundationDepthInches: 21.0,
      hazardNote: '⛔ SEVERE WATERLOGGING: 21" depth in lower bowl. Buses diverted.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'mumbai-hindmata-flyover-detour',
      name: 'Primary Detour: Hindmata Elevated Flyover Top Deck & Senapati Bapat Marg Bypass',
      type: 'primary_detour',
      points: [
        [19.0220, 72.8400], // Dadar TT
        [19.0200, 72.8320], // Senapati Bapat Marg connector
        [19.0100, 72.8340], // Elphinstone Bridge (Elevated)
        [19.0060, 72.8435], // Lower Parel / Currey Road
      ],
      distanceKm: 3.5,
      etaDeltaMinutes: 9,
      avgSpeedKmh: 34,
      roadCondition: 'Elevated flyover and wide commercial bypass with active storm drains.',
      safetyScore: 97,
      keyWaypoints: [
        'Take Hindmata Elevated Flyover top deck (speed limit 40 km/h)',
        'Or divert to Senapati Bapat Marg towards Lower Parel',
        'Avoid ground-level waterlogged under-flyover roadway',
      ],
      advisory: 'BMC & Mumbai Police Alert: Ground carriageway at Hindmata closed. Use elevated flyover.',
    },
    nhaiAdvisory: 'BMC Pumping Cell: Britannia pumping station discharging stormwater into Arabian Sea at full capacity.',
    policeEscortActive: false,
    lastUpdated: '7 mins ago',
  },

  // ================= 6. BENGALURU CORRIDORS =================
  {
    id: 'blr-bellandur-ecospace-detour',
    name: 'Bengaluru Outer Ring Road (Bellandur - Ecospace) Flood Detour',
    highwayCode: 'ORR / IT Corridor',
    regionName: 'Bengaluru Tech Corridor',
    cityId: 'bengaluru',
    locationId: 'blr-bellandur',
    hazardType: 'waterlogging',
    hazardDescription: 'Bellandur Lake overflow onto Outer Ring Road (ORR) near Ecospace and Devarabeesanahalli underpass. Water level 26 inches after 62mm localized cloudburst.',
    blockedSegment: {
      name: 'Outer Ring Road (Bellandur to Ecospace Underpass)',
      startCoord: [12.9350, 77.6880],
      endCoord: [12.9180, 77.6620],
      points: [
        [12.9350, 77.6880], // Bellandur junction
        [12.9280, 77.6780], // Ecospace tech park entrance
        [12.9230, 77.6710], // Devarabeesanahalli underpass (26" depth)
        [12.9180, 77.6620], // Kadubeesanahalli bridge
      ],
      inundationDepthInches: 26.0,
      hazardNote: '⛔ UNDERPASS SUBMERGED: Bellandur Lake overflow onto main carriageway. Cars stranded.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'blr-old-airport-varthur-detour',
      name: 'Primary Detour: Old Airport Road - Varthur - Sarjapur Road Elevated Bypass',
      type: 'primary_detour',
      points: [
        [12.9350, 77.6880], // Marathahalli flyover
        [12.9550, 77.6750], // Old Airport Road
        [12.9420, 77.7150], // Varthur Main Road (Elevated ridge)
        [12.9150, 77.6950], // Sarjapur Road
        [12.9180, 77.6620], // Rejoin ORR at Iblur junction
      ],
      distanceKm: 12.8,
      etaDeltaMinutes: 16,
      avgSpeedKmh: 44,
      roadCondition: 'Elevated ridge road free from lake basin catchment. High ground clearance.',
      safetyScore: 96,
      keyWaypoints: [
        'Divert at Marathahalli junction towards Old Airport Road',
        'Take Varthur high ridge bypass',
        'Connect via Sarjapur Road directly to Iblur and HSR Layout',
      ],
      advisory: 'Bengaluru City Traffic Police Advisory: Avoid ORR between Marathahalli and Bellandur.',
    },
    nhaiAdvisory: 'BBMP Disaster Management: 8 high-capacity suction pumps deployed at Bellandur underpass.',
    policeEscortActive: true,
    lastUpdated: '10 mins ago',
  },

  {
    id: 'blr-silkboard-detour',
    name: 'Bengaluru Silk Board & Hosur Road Drainage Inundation Detour',
    highwayCode: 'NH-44 / Hosur Road',
    regionName: 'Bengaluru South - Silk Board Corridor',
    cityId: 'bengaluru',
    locationId: 'blr-silkboard',
    hazardType: 'waterlogging',
    hazardDescription: 'Madivala Lake stormwater drain backflow at Central Silk Board underpass and Hosur Road ramp. 19 inches standing water, severe gridlock.',
    blockedSegment: {
      name: 'Silk Board Underpass & Hosur Road Junction',
      startCoord: [12.9190, 77.6250],
      endCoord: [12.9120, 77.6320],
      points: [
        [12.9230, 77.6210], // BTM approach
        [12.9190, 77.6250], // Silk Board Circle (19" depth)
        [12.9150, 77.6280], // Hosur Road Ramp
        [12.9120, 77.6320], // Bommanahalli link
      ],
      inundationDepthInches: 19.0,
      hazardNote: '⛔ UNDERPASS FLOODED: 19" water at Silk Board. 4km tailback.',
      status: 'COMPLETELY BLOCKED',
    },
    recommendedDetour: {
      id: 'blr-hsr-btm-bypass',
      name: 'Primary Detour: HSR Layout 27th Main - Kudlu Gate - Electronic City Flyover Link',
      type: 'primary_detour',
      points: [
        [12.9230, 77.6210], // BTM
        [12.9120, 77.6450], // HSR Layout 27th Main
        [12.8980, 77.6520], // Kudlu Gate
        [12.9120, 77.6320], // Electronic City Elevated Toll Plaza
      ],
      distanceKm: 8.4,
      etaDeltaMinutes: 14,
      avgSpeedKmh: 38,
      roadCondition: 'Wide residential grid in HSR Layout with excellent stormwater percolation pits.',
      safetyScore: 94,
      keyWaypoints: [
        'Divert into BTM 2nd Stage towards HSR Layout',
        'Take 27th Main HSR arterial road',
        'Merge onto Electronic City Elevated Expressway at Kudlu Gate',
      ],
      advisory: 'BTP Alert: Electronic City commuters advised to take HSR Layout bypass to avoid Silk Board.',
    },
    nhaiAdvisory: 'BBMP Stormwater Cell: Clearing debris from Madivala lake waste weir.',
    policeEscortActive: false,
    lastUpdated: '12 mins ago',
  },
];

/**
 * Helper to fetch detour for a specific location, with smart fallback to city detours
 */
export function getDetourForLocation(locationId: string, cityId?: string): DetourCorridor | undefined {
  // 1. Direct location match
  const direct = HIGHWAY_DETOUR_CORRIDORS.find((c) => c.locationId === locationId);
  if (direct) return direct;

  // 2. Keyword/ID matching
  const matched = HIGHWAY_DETOUR_CORRIDORS.find((c) => {
    if (locationId.includes('sinhagad') && c.id.includes('sinhagad')) return true;
    if (locationId.includes('minto') && c.id.includes('minto')) return true;
    if (locationId.includes('ito') && c.id.includes('ito')) return true;
    if (locationId.includes('dhaula') && c.id.includes('hero-honda')) return true;
    if (locationId.includes('park') && c.id.includes('park-street')) return true;
    if (locationId.includes('howrah') && c.id.includes('kona')) return true;
    if (locationId.includes('saltlake') && c.id.includes('saltlake')) return true;
    if (locationId.includes('rajendra') && c.id.includes('rajendra')) return true;
    if (locationId.includes('gandhi-setu') && c.id.includes('nh22')) return true;
    if (locationId.includes('milan') && c.id.includes('milan')) return true;
    if (locationId.includes('hindmata') && c.id.includes('hindmata')) return true;
    if (locationId.includes('bellandur') && c.id.includes('bellandur')) return true;
    if (locationId.includes('silkboard') && c.id.includes('silkboard')) return true;
    if (locationId.includes('katraj') && c.id.includes('katraj')) return true;
    if ((locationId.includes('baner') || locationId.includes('hinjewadi')) && c.id.includes('hinjewadi')) return true;
    return false;
  });
  if (matched) return matched;

  // 3. City fallback if applicable
  if (cityId) {
    const cityDetours = HIGHWAY_DETOUR_CORRIDORS.filter((c) => c.cityId === cityId);
    if (cityDetours.length > 0) return cityDetours[0];
  }

  return undefined;
}

/**
 * Fetch all detours available for a city
 */
export function getAllDetoursForCity(cityId: string): DetourCorridor[] {
  return HIGHWAY_DETOUR_CORRIDORS.filter((c) => c.cityId === cityId);
}
