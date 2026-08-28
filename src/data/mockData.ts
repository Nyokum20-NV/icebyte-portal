export type Realm = 'Antarctica' | 'Arctic' | 'Southern Ocean' | 'Himalayas';
export type StationName = 'Maitri' | 'Bharati' | 'Himadri' | 'IndARC';
export type Discipline =
  | 'Glaciology & Ice Cores'
  | 'Atmospheric Physics'
  | 'Oceanography'
  | 'Space Weather & Magnetism'
  | 'Extremophile Biology';

export interface TelemetryCard {
  id: string;
  station: string;
  region: string;
  readings: { label: string; value: string }[];
  status: 'Active' | 'Standby';
}

export interface ResearchPaper {
  id: string;
  title: string;
  station: StationName;
  realm: Realm;
  discipline: Discipline;
  year: number;
  summary: string;
  tags: string[];
  chart: { label: string; xLabel: string; yLabel: string; points: { x: number; y: number }[] }[];
}

export interface StationInfo {
  name: StationName;
  realm: Realm;
  coords: string;
  established: number;
  mission: string;
  weather: { temp: string; wind: string; condition: string };
  publications: string[];
  mapX: number;
  mapY: number;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'Photo' | 'Video' | '360° Tour' | 'Drone Footage';
  location: string;
  description: string;
  imageUrl: string;
  videoId?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TimelineEvent {
  year: number;
  expedition: string;
  description: string;
  milestone: boolean;
}

export interface PolarFact {
  id: string;
  fact: string;
  source: string;
}

export const telemetryData: TelemetryCard[] = [
  {
    id: 'maitri',
    station: 'Maitri Station',
    region: 'Antarctica',
    readings: [
      { label: 'Temperature', value: '-18°C' },
      { label: 'Wind', value: '32 kts ENE' },
      { label: 'Barometer', value: '986 hPa' },
    ],
    status: 'Active',
  },
  {
    id: 'bharati',
    station: 'Bharati Station',
    region: 'Antarctica',
    readings: [
      { label: 'Temperature', value: '-14°C' },
      { label: 'Total Column Ozone', value: '284 DU' },
      { label: 'UV Index', value: 'Low' },
    ],
    status: 'Active',
  },
  {
    id: 'himadri',
    station: 'Himadri Station',
    region: 'Arctic / Svalbard',
    readings: [
      { label: 'Temperature', value: '-4°C' },
      { label: 'Permafrost Temp', value: '-2.1°C' },
      { label: 'Sea Ice Extent', value: 'Moderate' },
    ],
    status: 'Active',
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: 'p1',
    title: 'Multidecadal Variations of Surface Ozone & Trace Gases at Bharati Station',
    station: 'Bharati',
    realm: 'Antarctica',
    discipline: 'Atmospheric Physics',
    year: 2023,
    summary:
      'Analysis of 15 years of continuous surface ozone measurements revealing a slow recovery tied to Montreal Protocol enforcement and polar vortex dynamics.',
    tags: ['Ozone Depletion', 'Atmospheric Physics'],
    chart: [
      {
        label: 'Daily Ozone Trend (DU)',
        xLabel: 'Day',
        yLabel: 'Ozone (DU)',
        points: [
          { x: 1, y: 290 }, { x: 5, y: 275 }, { x: 10, y: 260 }, { x: 15, y: 248 },
          { x: 20, y: 255 }, { x: 25, y: 270 }, { x: 30, y: 284 },
        ],
      },
    ],
  },
  {
    id: 'p2',
    title: 'Ice Core δ18O Records from IndARC: 2,000-Year Temperature Reconstruction',
    station: 'IndARC',
    realm: 'Arctic',
    discipline: 'Glaciology & Ice Cores',
    year: 2021,
    summary:
      'High-resolution oxygen isotope analysis of Arctic ice cores providing a two-millennium temperature record with links to monsoon teleconnection patterns.',
    tags: ['Ice Core δ18O', 'Monsoon Teleconnections'],
    chart: [
      {
        label: 'Temperature vs. Depth',
        xLabel: 'Depth (m)',
        yLabel: 'δ18O (‰)',
        points: [
          { x: 0, y: -20 }, { x: 20, y: -24 }, { x: 40, y: -28 }, { x: 60, y: -31 },
          { x: 80, y: -33 }, { x: 100, y: -35 }, { x: 120, y: -36 },
        ],
      },
    ],
  },
  {
    id: 'p3',
    title: 'Microplastic Abundance in Southern Ocean Surface Waters Near Maitri',
    station: 'Maitri',
    realm: 'Southern Ocean',
    discipline: 'Oceanography',
    year: 2024,
    summary:
      'First systematic survey of microplastic concentrations in the Southern Ocean around Antarctica, revealing higher-than-expected particle counts in pack ice zones.',
    tags: ['Microplastics', 'Oceanography'],
    chart: [
      {
        label: 'Microplastic Concentration',
        xLabel: 'Station',
        yLabel: 'Particles/m³',
        points: [
          { x: 1, y: 12 }, { x: 2, y: 28 }, { x: 3, y: 45 }, { x: 4, y: 67 },
          { x: 5, y: 89 }, { x: 6, y: 102 },
        ],
      },
    ],
  },
  {
    id: 'p4',
    title: 'Geomagnetic Storm Signatures at Himadri: Effects on Polar Ionosphere',
    station: 'Himadri',
    realm: 'Arctic',
    discipline: 'Space Weather & Magnetism',
    year: 2022,
    summary:
      'Magnetometer and riometer observations from Svalbard characterizing ionospheric response to coronal mass ejections and their impact on high-latitude communications.',
    tags: ['Geomagnetic Storms', 'Space Weather & Magnetism'],
    chart: [
      {
        label: 'Geomagnetic Activity (Kp Index)',
        xLabel: 'Hour',
        yLabel: 'Kp Index',
        points: [
          { x: 0, y: 2 }, { x: 3, y: 3 }, { x: 6, y: 5 }, { x: 9, y: 7 },
          { x: 12, y: 6 }, { x: 15, y: 4 }, { x: 18, y: 3 }, { x: 21, y: 2 },
        ],
      },
    ],
  },
  {
    id: 'p5',
    title: 'Himalayan Glacial Retreat Patterns: 40-Year Satellite & Field Survey',
    station: 'IndARC',
    realm: 'Himalayas',
    discipline: 'Glaciology & Ice Cores',
    year: 2020,
    summary:
      'Comprehensive multi-sensor study documenting mass balance changes across major Himalayan glaciers, with implications for regional water security and monsoon dynamics.',
    tags: ['Monsoon Teleconnections', 'Ice Core δ18O'],
    chart: [
      {
        label: 'Glacier Mass Balance',
        xLabel: 'Year',
        yLabel: 'Mass Balance (m w.e.)',
        points: [
          { x: 1981, y: 0.3 }, { x: 1990, y: -0.2 }, { x: 2000, y: -0.6 },
          { x: 2010, y: -0.9 }, { x: 2020, y: -1.2 }, { x: 2024, y: -1.4 },
        ],
      },
    ],
  },
  {
    id: 'p6',
    title: 'Extremophile Microbial Communities in Antarctic Lake Ice Covers',
    station: 'Bharati',
    realm: 'Antarctica',
    discipline: 'Extremophile Biology',
    year: 2025,
    summary:
      'Metagenomic profiling of microbial mats surviving in permanently ice-covered Antarctic lakes, offering clues for astrobiology and bioprospecting applications.',
    tags: ['Extremophile Biology'],
    chart: [
      {
        label: 'Species Diversity Index',
        xLabel: 'Depth (cm)',
        yLabel: 'Shannon Index',
        points: [
          { x: 0, y: 1.2 }, { x: 10, y: 2.1 }, { x: 20, y: 2.8 }, { x: 30, y: 3.2 },
          { x: 40, y: 2.9 }, { x: 50, y: 2.4 },
        ],
      },
    ],
  },
];

export const stations: StationInfo[] = [
  {
    name: 'Maitri',
    realm: 'Antarctica',
    coords: '70.77°S, 11.73°E',
    established: 1989,
    mission:
      'Year-round multidisciplinary research in glaciology, meteorology, and biology in central Dronning Maud Land.',
    weather: { temp: '-18°C', wind: '32 kts ENE', condition: 'Blowing Snow' },
    publications: [
      'Surface Energy Balance at Maitri (2019–2024)',
      'Snow Chemistry of Continental Ice Sheet Margins',
      'Microplastic Transport in Katabatic Winds',
    ],
    mapX: 78,
    mapY: 82,
  },
  {
    name: 'Bharati',
    realm: 'Antarctica',
    coords: '69.42°S, 76.19°E',
    established: 2012,
    mission:
      'Coastal Antarctic research focused on atmospheric sciences, ozone dynamics, and extremophile biology near the Larsemann Hills.',
    weather: { temp: '-14°C', wind: '18 kts SSE', condition: 'Clear' },
    publications: [
      'Multidecadal Surface Ozone Variations at Bharati',
      'UV Radiation and Polar Stratospheric Clouds',
      'Microbial Mats in Ice-Covered Lakes',
    ],
    mapX: 88,
    mapY: 78,
  },
  {
    name: 'Himadri',
    realm: 'Arctic',
    coords: '78.92°N, 11.93°E',
    established: 2008,
    mission:
      "India's first Arctic research station at Ny-Ålesund, Svalbard, studying space weather, permafrost, and climate teleconnections.",
    weather: { temp: '-4°C', wind: '12 kts NW', condition: 'Overcast' },
    publications: [
      'Geomagnetic Storm Signatures at Himadri',
      'Permafrost Thermal Regime in Ny-Ålesund',
      'Arctic–Monsoon Teleconnection Pathways',
    ],
    mapX: 54,
    mapY: 18,
  },
  {
    name: 'IndARC',
    realm: 'Arctic',
    coords: '78.55°N, 11.55°E',
    established: 2014,
    mission:
      'Underwater observatory in Kongsfjorden monitoring ocean acidification, biogeochemistry, and benthic ecosystems in the Arctic.',
    weather: { temp: '-2°C', wind: '8 kts SW', condition: 'Fog' },
    publications: [
      'Kongsfjorden Water Mass Analysis',
      'Ocean Acidification Trends in the Arctic',
      'Benthic Community Shifts in Warming Fjords',
    ],
    mapX: 50,
    mapY: 20,
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: 'm1',
    title: 'Aurora Over Himadri',
    type: 'Photo',
    location: 'Ny-Ålesund, Svalbard',
    description:
      'A vivid auroral arc captured during geomagnetic storm conditions above the Himadri station.',
    imageUrl:
      'https://images.pexels.com/photos/26646276/pexels-photo-26646276.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'm2',
    title: 'Iceberg Drift in Southern Ocean',
    type: 'Drone Footage',
    location: 'Prydz Bay, Antarctica',
    description:
      'Aerial drone survey of a tabular iceberg calved from the Amery Ice Shelf during summer melt.',
    imageUrl:
      'https://images.pexels.com/photos/30429916/pexels-photo-30429916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    videoId: 'PS2ltvqxKVY',
  },
  {
    id: 'm3',
    title: 'Bharati Station 360° Tour',
    type: '360° Tour',
    location: 'Larsemann Hills, Antarctica',
    description:
      'Immersive 360° walkthrough of Bharati Station laboratories and living quarters.',
    imageUrl:
      'https://images.pexels.com/photos/31308003/pexels-photo-31308003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'm4',
    title: 'Core Extraction at IndARC',
    type: 'Video',
    location: 'Kongsfjorden, Svalbard',
    description:
      'Scientists retrieve a sediment core from the Arctic fjord floor during the midnight sun.',
    imageUrl:
      'https://images.pexels.com/photos/69406/arctic-sea-ocean-water-69406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    videoId: 'PS2ltvqxKVY',
  },
  {
    id: 'm5',
    title: 'Katabatic Winds at Maitri',
    type: 'Photo',
    location: 'Schirmacher Oasis, Antarctica',
    description:
      'Dramatic blowing snow streaming from the polar plateau during a katabatic wind event.',
    imageUrl:
      'https://images.pexels.com/photos/33099921/pexels-photo-33099921.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'm6',
    title: 'Himalayan Glacier Survey',
    type: 'Drone Footage',
    location: 'Chandra Basin, Himalayas',
    description:
      'UAV photogrammetry survey of a retreating Himalayan glacier with visible medial moraines.',
    imageUrl:
      'https://images.pexels.com/photos/37454935/pexels-photo-37454935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    videoId: 'PS2ltvqxKVY',
  },
  {
    id: 'm7',
    title: 'Icebreaker in Polar Waters',
    type: 'Photo',
    location: 'Southern Ocean Transit',
    description:
      'The research vessel cuts through pack ice during the annual austral summer resupply voyage.',
    imageUrl:
      'https://images.pexels.com/photos/36628255/pexels-photo-36628255.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'm8',
    title: 'Ice Cave Exploration',
    type: 'Photo',
    location: 'Arctic Glacier System',
    description:
      'Researchers explore a crystalline ice cave formed by meltwater channels beneath a Svalbard glacier.',
    imageUrl:
      'https://images.pexels.com/photos/34125813/pexels-photo-34125813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'In which year did India establish the Maitri research station in Antarctica?',
    options: ['1981', '1989', '1999', '2012'],
    correctIndex: 1,
    explanation: 'Maitri was established in 1989 in the Schirmacher Oasis, Dronning Maud Land.',
  },
  {
    id: 'q2',
    question: 'What does the δ18O isotope ratio in ice cores primarily help scientists reconstruct?',
    options: [
      'Magnetic field strength',
      'Ancient temperature records',
      'Microplastic concentration',
      'Ozone layer thickness',
    ],
    correctIndex: 1,
    explanation:
      'δ18O is a proxy for temperature — heavier isotopes condense preferentially, so the ratio reveals past climate.',
  },
  {
    id: 'q3',
    question: "India's Himadri Station is located in which Arctic archipelago?",
    options: ['Greenland', 'Franz Josef Land', 'Svalbard', 'Canadian Arctic'],
    correctIndex: 2,
    explanation: 'Himadri is located at Ny-Ålesund in the Svalbard archipelago, Norway.',
  },
  {
    id: 'q4',
    question: "What is the name of India's underwater observatory in the Arctic?",
    options: ['Dakshin', 'IndARC', 'Bharati', 'Gangotri'],
    correctIndex: 1,
    explanation:
      'IndARC is India\'s first underwater observatory, deployed in Kongsfjorden, Svalbard in 2014.',
  },
  {
    id: 'q5',
    question: 'Which Indian ministry oversees the NCPOR polar research program?',
    options: [
      'Ministry of Science & Technology',
      'Ministry of Earth Sciences',
      'Ministry of Environment',
      'Ministry of Defence',
    ],
    correctIndex: 1,
    explanation:
      'The National Centre for Polar and Ocean Research (NCPOR) operates under the Ministry of Earth Sciences.',
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1981,
    expedition: '1st Indian Antarctic Expedition',
    description:
      'India\'s maiden expedition to Antarctica, led by Dr. S.Z. Qasim, marking the country\'s entry into polar research.',
    milestone: true,
  },
  {
    year: 1983,
    expedition: 'Dakshin Gangotri Station',
    description: 'India\'s first permanent research station in Antarctica becomes operational.',
    milestone: true,
  },
  {
    year: 1989,
    expedition: 'Maitri Station Established',
    description:
      'The second-generation permanent station Maitri is commissioned in the Schirmacher Oasis.',
    milestone: true,
  },
  {
    year: 1997,
    expedition: '17th ISEA',
    description: 'Multi-disciplinary studies expand to include atmospheric sciences and biology.',
    milestone: false,
  },
  {
    year: 2005,
    expedition: '25th ISEA',
    description: 'Quarter-century of continuous Indian presence in Antarctica celebrated.',
    milestone: false,
  },
  {
    year: 2008,
    expedition: 'Himadri Station',
    description:
      'India opens its first Arctic research station at Ny-Ålesund, Svalbard, Norway.',
    milestone: true,
  },
  {
    year: 2012,
    expedition: 'Bharati Station',
    description:
      'India\'s third Antarctic station begins operations near the Larsemann Hills, focusing on atmospheric science.',
    milestone: true,
  },
  {
    year: 2014,
    expedition: 'IndARC Observatory',
    description:
      'India deploys its first underwater Arctic observatory in Kongsfjorden for ocean biogeochemistry studies.',
    milestone: true,
  },
  {
    year: 2020,
    expedition: '40th ISEA',
    description: 'Four decades of polar expeditions; focus shifts to climate change and microplastics.',
    milestone: false,
  },
  {
    year: 2026,
    expedition: '44th ISEA',
    description:
      'The 44th Indian Scientific Expedition to Antarctica continues cutting-edge research on paleoclimate and biodiversity.',
    milestone: true,
  },
];

export const polarFacts: PolarFact[] = [
  {
    id: 'f1',
    fact: 'Antarctica is the coldest, windiest, and driest continent on Earth — technically the largest desert on the planet with less than 200mm of annual precipitation.',
    source: 'British Antarctic Survey',
  },
  {
    id: 'f2',
    fact: 'India has maintained a continuous year-round presence in Antarctica since 1983 — over 40 years of unbroken scientific operations.',
    source: 'NCPOR',
  },
  {
    id: 'f3',
    fact: 'The Arctic ice cap floats on the Arctic Ocean. If it fully melts, sea levels would not rise directly — but it would drastically alter global ocean circulation.',
    source: 'NSIDC',
  },
  {
    id: 'f4',
    fact: 'Ice cores from Antarctica contain air bubbles trapped over 800,000 years ago, making them the oldest direct climate records on Earth.',
    source: 'IPCC AR6',
  },
  {
    id: 'f5',
    fact: 'The aurora borealis and aurora australis are caused by solar wind particles colliding with gases in Earth\'s upper atmosphere, typically at altitudes of 100–300 km.',
    source: 'NASA',
  },
  {
    id: 'f6',
    fact: 'The Himalayas hold the largest reserves of fresh water outside the polar regions, earning them the nickname "The Third Pole."',
    source: 'ICIMOD',
  },
  {
    id: 'f7',
    fact: 'Permafrost in the Arctic stores an estimated 1,500 billion tonnes of carbon — nearly double the amount currently in the atmosphere.',
    source: 'Nature',
  },
];

export const filterChips = [
  'Ozone Depletion',
  'Ice Core δ18O',
  'Monsoon Teleconnections',
  'Microplastics',
  'Geomagnetic Storms',
];

export const navLinks = [
  { label: 'Command Hub', target: 'hero', view: 'main' as const },
  { label: 'Research & Data', target: 'research', view: 'main' as const },
  { label: 'Live Stations', target: 'stations', view: 'main' as const },
  { label: 'Media & 360° Tours', target: 'media', view: 'media' as const },
  { label: 'Student Outreach', target: 'outreach', view: 'outreach' as const },
];

export const panoramaImage =
  'https://images.pexels.com/photos/31486051/pexels-photo-31486051.jpeg?auto=compress&cs=tinysrgb&w=2400';
