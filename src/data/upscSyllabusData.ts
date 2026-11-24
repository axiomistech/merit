/**
 * Master Official UPSC Civil Services Examination (CSE) Syllabus Data
 * Extracted directly from the official Union Public Service Commission (UPSC)
 * Civil Services Examination Notification (Section-III: Syllabi for the Examination).
 *
 * Covers:
 * 1. PART-A: PRELIMINARY EXAMINATION (Objective Type)
 *    - Paper I: General Studies (200 Marks, 100 MCQs, -0.66 negative marking)
 *    - Paper II: CSAT (200 Marks, 80 MCQs, -0.83 negative marking, 33% qualifying)
 * 2. PART-B: MAIN EXAMINATION (Descriptive Type - 1750 Marks)
 *    - Paper-I: Essay (250 Marks)
 *    - Paper-II: General Studies-I (250 Marks) - Heritage, Culture, History, Geography, Society
 *    - Paper-III: General Studies-II (250 Marks) - Governance, Constitution, Polity, Social Justice, IR
 *    - Paper-IV: General Studies-III (250 Marks) - Technology, Economy, Environment, Security, Disaster Management
 *    - Paper-V: General Studies-IV (250 Marks) - Ethics, Integrity, and Aptitude + Case Studies
 *    - Paper-VI & VII: Optional Subject Papers I & II (500 Marks total)
 * 3. Personality Test / Interview (275 Marks)
 * Total Merit Marks: 1750 (Mains) + 275 (Interview) = 2025 Marks
 */

export interface UpscTopic {
  id: string;
  name: string;
  details?: string;
  isHighYield?: boolean;
}

export interface UpscUnitOrModule {
  id: string;
  unitNumber: number;
  name: string;
  slug: string;
  category?: string;
  weightagePercent?: number;
  description: string;
  topics: UpscTopic[];
}

export interface UpscSubjectSyllabus {
  id: string;
  name: string;
  slug: string;
  paperType: 'Prelims-GS' | 'Prelims-CSAT' | 'Mains-GS' | 'Mains-Optional';
  durationHours: number;
  totalMarks: number;
  totalUnits: number;
  units: UpscUnitOrModule[];
}

export interface UpscMainsGsPaper {
  id: string;
  paperCode: 'GS-1' | 'GS-2' | 'GS-3' | 'GS-4' | 'Essay';
  paperTitle: string;
  paperSubtitle: string;
  marks: number;
  durationHours: number;
  modulesCount: number;
  modules: {
    moduleNumber: number;
    title: string;
    description: string;
    keyThemes: string[];
    isHighYield?: boolean;
  }[];
}

export interface UpscOptionalSubject {
  id: string;
  name: string;
  slug: string;
  category: 'Humanities' | 'Sciences' | 'Engineering' | 'Management' | 'Literature';
  paper1Summary: string;
  paper2Summary: string;
  keyThemes: string[];
}

// ============================================================================
// 1. PRELIMS: PAPER I — GENERAL STUDIES (100 Questions, 200 Marks)
// ============================================================================
export const UPSC_PRELIMS_GS1_SYLLABUS: UpscSubjectSyllabus = {
  id: 'sub-upsc-pre-gs1',
  name: 'General Studies Paper I',
  slug: 'general-studies-1',
  paperType: 'Prelims-GS',
  durationHours: 2,
  totalMarks: 200,
  totalUnits: 7,
  units: [
    {
      id: 'upsc-p1-u1',
      unitNumber: 1,
      name: 'Current Events of National and International Importance',
      slug: 'current-affairs',
      category: 'Current Affairs',
      weightagePercent: 18,
      description: 'Major national happenings, government policies, bilateral agreements, international summits, multilateral declarations, and awards.',
      topics: [
        { id: 'ca-1', name: 'National Schemes, Acts & Executive Interventions', details: 'Flagship social schemes, statutory bills, welfare initiatives', isHighYield: true },
        { id: 'ca-2', name: 'Bilateral & Multilateral Summits & Agreements', details: 'G20, BRICS, Quad, SCO, ASEAN, bilateral defense and trade treaties', isHighYield: true },
        { id: 'ca-3', name: 'Reports, Indices & International Organizations', details: 'UN, World Bank, IMF, WEF indices, ranking metrics and methodologies' },
        { id: 'ca-4', name: 'Science, Defense & Space Developments in the News', details: 'ISRO missions, military acquisitions, missile tests, breakthroughs' },
      ],
    },
    {
      id: 'upsc-p1-u2',
      unitNumber: 2,
      name: 'History of India and Indian National Movement',
      slug: 'indian-history-national-movement',
      category: 'History',
      weightagePercent: 16,
      description: 'Ancient India, Medieval India, Art & Culture, Modern Indian History, and the Freedom Struggle from 1857 to 1947.',
      topics: [
        { id: 'hist-1', name: 'Ancient India & Indus Valley Civilization', details: 'Prehistoric phases, Harappan urban planning, Vedic era, Mahajanapadas, Buddhism, Jainism, Mauryan & Gupta empires', isHighYield: true },
        { id: 'hist-2', name: 'Medieval India & Cultural Synthesis', details: 'Delhi Sultanate, Vijayanagara Empire, Chola administration, Mughal administration, Bhakti and Sufi movements' },
        { id: 'hist-3', name: 'Indian Art, Architecture, Literature & Philosophy', details: 'Rock-cut architecture, temple styles (Nagara, Dravida, Vesara), classical dances, paintings, Buddhist art', isHighYield: true },
        { id: 'hist-4', name: 'British Penetration, Administrative Acts & Economic Impact', details: 'Regulating Acts, Charter Acts, 1857 Revolt, drain of wealth, land revenue systems (Permanent, Ryotwari, Mahalwari)' },
        { id: 'hist-5', name: 'Indian National Movement (1885 - 1947)', details: 'Moderate and Extremist phases, Swadeshi, Gandhian movements (Non-Cooperation, Civil Disobedience, Quit India), INA, Partition', isHighYield: true },
      ],
    },
    {
      id: 'upsc-p1-u3',
      unitNumber: 3,
      name: 'Indian and World Geography — Physical, Social, Economic',
      slug: 'geography-india-world',
      category: 'Geography',
      weightagePercent: 15,
      description: 'Geomorphology, climatology, oceanography, Indian physiography, river systems, climate patterns, resources, and industries.',
      topics: [
        { id: 'geo-1', name: 'Physical Geography of the Earth', details: 'Plate tectonics, volcanism, earthquakes, landforms, rock cycles, atmospheric layers, pressure belts, wind systems', isHighYield: true },
        { id: 'geo-2', name: 'Climatology & Oceanography', details: 'Monsoons, El Niño/La Niña, tropical and extratropical cyclones, ocean currents, tides, coral reefs, salinity' },
        { id: 'geo-3', name: 'Indian Physiography & Drainage Systems', details: 'Himalayan and Peninsular river basins, passes, lakes, Western/Eastern Ghats, islands', isHighYield: true },
        { id: 'geo-4', name: 'Economic & Human Geography', details: 'Mineral and energy resources distribution, agricultural cropping patterns, location factors of primary, secondary, and tertiary industries' },
      ],
    },
    {
      id: 'upsc-p1-u4',
      unitNumber: 4,
      name: 'Indian Polity and Governance — Constitution, Political System, Panchayati Raj',
      slug: 'indian-polity-governance',
      category: 'Polity',
      weightagePercent: 18,
      description: 'Constitutional framework, Fundamental Rights, DPSP, Parliament, Judiciary, Federalism, Local Governance, and Statutory Bodies.',
      topics: [
        { id: 'pol-1', name: 'Preamble, Fundamental Rights & DPSP', details: 'Articles 12 to 51A, judicial review, basic structure doctrine, writ jurisdiction', isHighYield: true },
        { id: 'pol-2', name: 'Union & State Executive and Legislatures', details: 'President, Governor, Prime Minister, Chief Minister, Parliament procedures, Money Bills, ordinances', isHighYield: true },
        { id: 'pol-3', name: 'Judiciary: Supreme Court & High Courts', details: 'Appointments (Collegium system), jurisdiction, constitutional bench, public interest litigation (PIL)' },
        { id: 'pol-4', name: 'Federal Structure & Centre-State Relations', details: '7th Schedule lists, financial relations, GST Council, Finance Commission, Inter-State Council' },
        { id: 'pol-5', name: 'Panchayati Raj & Urban Local Bodies (73rd & 74th Amendments)', details: 'Gram Sabha, 11th and 12th schedules, devolution of finance and powers', isHighYield: true },
        { id: 'pol-6', name: 'Constitutional & Non-Constitutional Bodies', details: 'Election Commission, CAG, UPSC, Attorney General, NHRC, CIC, Lokpal, CVC' },
      ],
    },
    {
      id: 'upsc-p1-u5',
      unitNumber: 5,
      name: 'Economic and Social Development — Sustainable Development, Poverty, Inclusion',
      slug: 'economy-social-development',
      category: 'Economy',
      weightagePercent: 15,
      description: 'Macroeconomic aggregates, fiscal and monetary policies, banking reforms, inflation, poverty, inclusive growth, and external sector.',
      topics: [
        { id: 'eco-1', name: 'National Income Accounting & Growth Metrics', details: 'GDP, GNP, GVA, real vs nominal growth, sectoral contribution', isHighYield: true },
        { id: 'eco-2', name: 'Monetary Policy & RBI Framework', details: 'Repo, reverse repo, CRR, SLR, inflation targeting, monetary policy committee (MPC), banking regulation', isHighYield: true },
        { id: 'eco-3', name: 'Fiscal Policy, Government Budgeting & Taxation', details: 'Revenue and capital accounts, fiscal deficit, FRBM Act, GST, direct/indirect taxes' },
        { id: 'eco-4', name: 'External Sector & Balance of Payments (BoP)', details: 'Current account, capital account, FDI vs FPI, exchange rate regimes, WTO agreements', isHighYield: true },
        { id: 'eco-5', name: 'Poverty, Demographics & Social Sector Schemes', details: 'Multidimensional poverty index, demographic dividend, employment initiatives, financial inclusion (JAM Trinity)' },
      ],
    },
    {
      id: 'upsc-p1-u6',
      unitNumber: 6,
      name: 'General Issues on Environmental Ecology, Bio-diversity and Climate Change',
      slug: 'environment-ecology-climate',
      category: 'Environment',
      weightagePercent: 12,
      description: 'Ecosystems, biodiversity conservation, national parks, wildlife sanctuaries, IUCN status, environmental acts, and climate summits.',
      topics: [
        { id: 'env-1', name: 'Ecosystem Dynamics & Terrestrial/Aquatic Biomes', details: 'Food chains, trophic levels, ecological pyramids, bio-magnification, eutrophication, wetlands, mangroves', isHighYield: true },
        { id: 'env-2', name: 'Biodiversity Conservation & Protected Areas', details: 'National Parks, Wildlife Sanctuaries, Biosphere Reserves, Ramsar sites, IUCN Red List status of key species', isHighYield: true },
        { id: 'env-3', name: 'Climate Change, Global Treaties & Conventions', details: 'UNFCCC, COP summits, Paris Agreement, Kyoto Protocol, Montreal Protocol, CBD, CITES, CMS', isHighYield: true },
        { id: 'env-4', name: 'Pollution, Environmental Laws & Indian Bodies', details: 'Air/Water Pollution Acts, Wildlife Protection Act 1972, Forest Rights Act, NGT, CPCB, Project Tiger, Project Elephant' },
      ],
    },
    {
      id: 'upsc-p1-u7',
      unitNumber: 7,
      name: 'General Science and Applied Technology',
      slug: 'general-science-technology',
      category: 'Science',
      weightagePercent: 6,
      description: 'Everyday applications of physics, chemistry, biology, space technology, biotechnology, defense, robotics, and emerging digital technologies.',
      topics: [
        { id: 'sci-1', name: 'Core Everyday Sciences (Physics, Chemistry, Biology)', details: 'Human biology, diseases (viral, bacterial, parasitic), vaccines, genetics basics, optics, electromagnetism applications' },
        { id: 'sci-2', name: 'Space Science & Satellite Launch Systems', details: 'PSLV, GSLV, LVM3, Gaganyaan, Chandrayaan, Aditya-L1, orbits (LEO, GEO, Sun-synchronous)', isHighYield: true },
        { id: 'sci-3', name: 'Frontier Technologies & Digital Innovations', details: 'AI, Quantum computing, 5G/6G, blockchain, semiconductor mission, biotechnology, CRISPR-Cas9', isHighYield: true },
      ],
    },
  ],
};

// ============================================================================
// 2. PRELIMS: PAPER II — CSAT (80 Questions, 200 Marks, 33% Qualifying)
// ============================================================================
export const UPSC_PRELIMS_CSAT_SYLLABUS: UpscSubjectSyllabus = {
  id: 'sub-upsc-pre-csat',
  name: 'CSAT (Civil Services Aptitude Test)',
  slug: 'csat-paper-2',
  paperType: 'Prelims-CSAT',
  durationHours: 2,
  totalMarks: 200,
  totalUnits: 7,
  units: [
    {
      id: 'csat-u1',
      unitNumber: 1,
      name: 'Reading Comprehension',
      slug: 'reading-comprehension',
      category: 'Verbal',
      weightagePercent: 35,
      description: 'Complex multi-paragraph passages testing critical assumptions, central themes, inferences, and logical corollaries.',
      topics: [
        { id: 'csat-1-1', name: 'Crux & Central Theme Identification', details: 'Discerning main arguments in socio-economic and environmental passages', isHighYield: true },
        { id: 'csat-1-2', name: 'Critical Assumptions & Inferences', details: 'Extracting unstated premises and valid logical implications', isHighYield: true },
        { id: 'csat-1-3', name: 'Logical Corollaries & Practical Implications', details: 'Evaluating consequence statements based strictly on passage evidence' },
      ],
    },
    {
      id: 'csat-u2',
      unitNumber: 2,
      name: 'Interpersonal Skills Including Communication Skills',
      slug: 'interpersonal-skills',
      category: 'Analytical',
      weightagePercent: 5,
      description: 'Understanding communicative clarity, organizational interactions, and interpersonal dynamics in administrative scenarios.',
      topics: [
        { id: 'csat-2-1', name: 'Verbal & Non-Verbal Interaction Nuances', details: 'Contextual message interpretation and active listening principles' },
      ],
    },
    {
      id: 'csat-u3',
      unitNumber: 3,
      name: 'Logical Reasoning and Analytical Ability',
      slug: 'logical-reasoning',
      category: 'Reasoning',
      weightagePercent: 20,
      description: 'Syllogisms, blood relations, direction sense, seating arrangements, coding-decoding, and statement-arguments.',
      topics: [
        { id: 'csat-3-1', name: 'Syllogisms & Deductive Logic', details: 'Venn diagram analysis, categorical propositions, validity tests', isHighYield: true },
        { id: 'csat-3-2', name: 'Seating Arrangements & Linear/Circular Puzzles', details: 'Multi-variable constraints, conditional ordering, distribution tables', isHighYield: true },
        { id: 'csat-3-3', name: 'Blood Relations & Direction Sense', details: 'Family tree tracing, vector displacements, compass bearings' },
        { id: 'csat-3-4', name: 'Statement & Assumptions / Arguments', details: 'Evaluating strong vs weak arguments, assertions and causal reasoning' },
      ],
    },
    {
      id: 'csat-u4',
      unitNumber: 4,
      name: 'Decision-Making and Problem-Solving',
      slug: 'decision-making',
      category: 'Decision Making',
      weightagePercent: 5,
      description: 'Administrative dilemma resolution, priority ordering, public interest optimization, and conflict resolution.',
      topics: [
        { id: 'csat-4-1', name: 'Administrative & Public Service Dilemmas', details: 'Action choices under resource constraints, ethical administrative trade-offs' },
      ],
    },
    {
      id: 'csat-u5',
      unitNumber: 5,
      name: 'General Mental Ability',
      slug: 'mental-ability',
      category: 'Reasoning',
      weightagePercent: 10,
      description: 'Number and letter series, analogies, classification, clocks and calendars, cubes and dice.',
      topics: [
        { id: 'csat-5-1', name: 'Alphanumeric Series & Coding-Decoding', details: 'Pattern detection in letter and number progressions' },
        { id: 'csat-5-2', name: 'Clocks, Calendars & Dice Problems', details: 'Odd days calculations, angle between hands, opposite faces on folded cubes', isHighYield: true },
      ],
    },
    {
      id: 'csat-u6',
      unitNumber: 6,
      name: 'Basic Numeracy (Class X Level)',
      slug: 'basic-numeracy',
      category: 'Quantitative',
      weightagePercent: 20,
      description: 'Number system, divisibility, percentages, profit & loss, ratio & proportion, time & work, permutations & probability.',
      topics: [
        { id: 'csat-6-1', name: 'Number System, Divisibility & Remainder Theorems', details: 'Unit digits, trailing zeroes, LCM & HCF, prime factorisation', isHighYield: true },
        { id: 'csat-6-2', name: 'Percentages, Profit & Loss, Simple/Compound Interest', details: 'Successive percentage changes, discount, mark-up, effective yield' },
        { id: 'csat-6-3', name: 'Ratio, Proportion, Mixtures & Alligations', details: 'Partnerships, weighted averages, concentration balancing' },
        { id: 'csat-6-4', name: 'Time, Speed, Distance & Time & Work', details: 'Relative speed, trains, boats and streams, pipes and cisterns' },
        { id: 'csat-6-5', name: 'Permutations, Combinations & Probability', details: 'Arrangements, selections, basic probability events', isHighYield: true },
      ],
    },
    {
      id: 'csat-u7',
      unitNumber: 7,
      name: 'Data Interpretation and Data Sufficiency (Class X Level)',
      slug: 'data-interpretation',
      category: 'Quantitative',
      weightagePercent: 5,
      description: 'Charts, graphs, tables, bar charts, pie diagrams, and two-statement data sufficiency evaluation.',
      topics: [
        { id: 'csat-7-1', name: 'Data Interpretation Charts & Tables', details: 'Extracting trends, percentage growths, and comparative analysis from tables/charts' },
        { id: 'csat-7-2', name: 'Data Sufficiency Analysis', details: 'Determining whether Statement 1 or Statement 2 alone or together are sufficient to answer', isHighYield: true },
      ],
    },
  ],
};

// ============================================================================
// 3. MAINS: GENERAL STUDIES PAPERS (I to IV) — 1000 MARKS TOTAL
// ============================================================================
export const UPSC_MAINS_GS_PAPERS: UpscMainsGsPaper[] = [
  {
    id: 'mains-gs-1',
    paperCode: 'GS-1',
    paperTitle: 'Paper-II: General Studies I',
    paperSubtitle: 'Indian Heritage and Culture, History and Geography of the World and Society',
    marks: 250,
    durationHours: 3,
    modulesCount: 12,
    modules: [
      {
        moduleNumber: 1,
        title: 'Indian Art Forms, Literature and Architecture',
        description: 'Salient aspects of Art Forms, Literature and Architecture from ancient to modern times.',
        keyThemes: ['Mauryan art', 'Gupta classical era', 'Temple architecture (Nagara, Dravida, Vesara)', 'Indo-Islamic monuments', 'Mural and miniature paintings'],
        isHighYield: true,
      },
      {
        moduleNumber: 2,
        title: 'Modern Indian History (Mid-18th Century to Present)',
        description: 'Significant events, personalities, and issues from the decline of Mughals through colonial consolidation.',
        keyThemes: ['Carnatic Wars', 'Battle of Plassey & Buxar', 'Subsidiary Alliance & Doctrine of Lapse', 'Governor-Generals policies', 'Socio-religious reform movements'],
        isHighYield: true,
      },
      {
        moduleNumber: 3,
        title: 'The Freedom Struggle — Stages & Contributors',
        description: 'Various stages and important contributors / contributions from different parts of the country.',
        keyThemes: ['1857 Revolt', 'Swadeshi Movement', 'Non-Cooperation Movement', 'Civil Disobedience', 'Quit India Movement', 'Revolutionary nationalism', 'Subhas Chandra Bose and INA'],
        isHighYield: true,
      },
      {
        moduleNumber: 4,
        title: 'Post-Independence Consolidation and Reorganization',
        description: 'Integration of princely states, linguistic reorganization of states, tribal consolidation, and nation-building challenges.',
        keyThemes: ['Sardar Patel integration', 'States Reorganisation Act 1956', 'Tribal Panchsheel', 'Wars of 1962, 1965, 1971', 'Green Revolution integration'],
      },
      {
        moduleNumber: 5,
        title: 'History of the World (18th Century to Modern)',
        description: 'Events from 18th century such as Industrial Revolution, World Wars, redrawing of boundaries, colonization, decolonization, and political philosophies.',
        keyThemes: ['Industrial Revolution', 'American and French Revolutions', 'World War I and League of Nations', 'Fascism and Nazism', 'World War II', 'Decolonization', 'Cold War', 'Communism, Capitalism, Socialism'],
      },
      {
        moduleNumber: 6,
        title: 'Salient Features of Indian Society & Diversity of India',
        description: 'Linguistic, religious, regional, and ethnic diversity; composite culture; unity in diversity.',
        keyThemes: ['Pluralistic ethos', 'Caste dynamics', 'Family structures', 'Tribal diversity', 'Syncretic traditions'],
      },
      {
        moduleNumber: 7,
        title: 'Role of Women, Population, Poverty & Urbanization',
        description: 'Women’s organizations, population dynamics, poverty, developmental issues, urbanization problems and remedies.',
        keyThemes: ['Feminization of agriculture', 'Urban sprawl and slums', 'Demographic transition', 'Women empowerment indicators'],
        isHighYield: true,
      },
      {
        moduleNumber: 8,
        title: 'Effects of Globalization on Indian Society',
        description: 'Impact on youth, family, elderly, women, agriculture, food habits, and traditional cultural forms.',
        keyThemes: ['Cultural homogenization vs heterogenization', 'Consumerism', 'Glocalization', 'Impact on rural artisans'],
      },
      {
        moduleNumber: 9,
        title: 'Social Empowerment, Communalism, Regionalism & Secularism',
        description: 'Empowerment of marginalized communities, caste and ethnic tensions, regional aspirations, and Indian vs Western secularism.',
        keyThemes: ['Constitutional safeguards', 'Minority rights', 'Sons of the soil movements', 'Communal violence factors'],
        isHighYield: true,
      },
      {
        moduleNumber: 10,
        title: 'Salient Features of World’s Physical Geography',
        description: 'Geomorphology, climatology, oceanography, biogeography, and global tectonic systems.',
        keyThemes: ['Plate tectonics', 'Continental drift', 'Volcanism & earthquakes', 'Pressure belts and planetary winds', 'Oceanic circulation'],
      },
      {
        moduleNumber: 11,
        title: 'Distribution of Key Natural Resources & Industrial Location Factors',
        description: 'Distribution across the world (including South Asia and India); factors responsible for primary, secondary, and tertiary sector locations.',
        keyThemes: ['Iron and coal belts', 'Petroleum and natural gas reserves', 'Rare earth elements', 'Automobile and IT hub location factors'],
      },
      {
        moduleNumber: 12,
        title: 'Important Geophysical Phenomena & Critical Geographical Changes',
        description: 'Earthquakes, Tsunamis, Volcanic activity, cyclones; changes in water-bodies and ice-caps, and effects on flora and fauna.',
        keyThemes: ['Tropical cyclones genesis', 'Glacial retreat in Himalayas', 'Permafrost melting', 'Ocean acidification and coral bleaching'],
        isHighYield: true,
      },
    ],
  },
  {
    id: 'mains-gs-2',
    paperCode: 'GS-2',
    paperTitle: 'Paper-III: General Studies II',
    paperSubtitle: 'Governance, Constitution, Polity, Social Justice and International Relations',
    marks: 250,
    durationHours: 3,
    modulesCount: 20,
    modules: [
      {
        moduleNumber: 1,
        title: 'Indian Constitution: Evolution, Features & Basic Structure',
        description: 'Historical underpinnings, evolution, features, amendments, significant provisions, and basic structure doctrine.',
        keyThemes: ['Kesavananda Bharati case', 'Preamble philosophy', 'Constitutional amendments procedure (Article 368)', 'Emergency provisions'],
        isHighYield: true,
      },
      {
        moduleNumber: 2,
        title: 'Functions and Responsibilities of Union & States (Federal Structure)',
        description: 'Issues and challenges pertaining to federal structure, devolution of powers and finances up to local levels.',
        keyThemes: ['Cooperative vs competitive federalism', 'Governor’s constitutional role', 'Inter-state river water disputes', 'Fiscal federalism & GST'],
        isHighYield: true,
      },
      {
        moduleNumber: 3,
        title: 'Separation of Powers & Dispute Redressal Mechanisms',
        description: 'Separation of powers between organs, checks and balances, dispute redressal mechanisms and institutions.',
        keyThemes: ['Judicial activism vs overreach', 'Tribunals', 'Alternative dispute resolution (ADR)', 'Lok Adalats'],
      },
      {
        moduleNumber: 4,
        title: 'Comparison of the Indian Constitutional Scheme with Others',
        description: 'Comparative constitutional law: India vs UK, USA, France, Germany, South Africa, and Canada.',
        keyThemes: ['Presidential vs Parliamentary systems', 'Due process vs Procedure established by law', 'Judicial review models'],
      },
      {
        moduleNumber: 5,
        title: 'Parliament and State Legislatures: Structure & Functioning',
        description: 'Conduct of business, powers & privileges, declining legislative sittings, parliamentary committees.',
        keyThemes: ['Anti-defection law (10th Schedule)', 'Parliamentary standing committees', 'Speaker’s powers', 'Office of profit'],
        isHighYield: true,
      },
      {
        moduleNumber: 6,
        title: 'Structure, Organization of Executive & Judiciary',
        description: 'Ministries, Departments, pressure groups, formal/informal associations and their role in the polity.',
        keyThemes: ['Cabinet Secretariat', 'Collegium system vs NJAC', 'Public Interest Litigation (PIL)', 'Pressure groups & lobbying'],
      },
      {
        moduleNumber: 7,
        title: 'Salient Features of the Representation of People’s Act (RPA)',
        description: 'RPA 1950 and 1951: conduct of elections, disqualification of MPs/MLAs, electoral bonds, criminalization of politics.',
        keyThemes: ['Section 8 disqualification', 'Model Code of Conduct (MCC)', 'Electoral reforms', 'Inner-party democracy'],
        isHighYield: true,
      },
      {
        moduleNumber: 8,
        title: 'Appointment to Various Constitutional Posts & Bodies',
        description: 'Powers, functions, and responsibilities of Election Commission, UPSC, CAG, Finance Commission, National Commissions for SC/ST/OBC.',
        keyThemes: ['Independence of CAG', 'Election Commission appointment autonomy', 'Finance Commission vertical/horizontal devolution'],
      },
      {
        moduleNumber: 9,
        title: 'Statutory, Regulatory and Various Quasi-Judicial Bodies',
        description: 'NHRC, NGT, CCI, TRAI, SEBI, IRDAI, Central Information Commission (CIC), National Green Tribunal.',
        keyThemes: ['Regulatory capture', 'Quasi-judicial enforcement', 'Autonomy vs executive control'],
      },
      {
        moduleNumber: 10,
        title: 'Government Policies & Interventions for Development',
        description: 'Design and implementation challenges in various sectors, unintended consequences of policy directives.',
        keyThemes: ['Data protection policy', 'Education policies (NEP 2020)', 'Health sector interventions', 'Production linked incentives (PLI)'],
      },
      {
        moduleNumber: 11,
        title: 'Development Processes & the Development Industry',
        description: 'Role of NGOs, Self Help Groups (SHGs), various groups and associations, donors, charities, and institutional stakeholders.',
        keyThemes: ['FCRA amendments', 'SHG-bank linkage programmes', 'Microfinance institutions', 'Corporate social responsibility (CSR)'],
      },
      {
        moduleNumber: 12,
        title: 'Welfare Schemes for Vulnerable Sections & Institutions Constituted',
        description: 'Performance of schemes for SC, ST, OBC, women, children, minorities, elderly; statutory bodies for their protection.',
        keyThemes: ['POSH Act', 'POCSO Act', 'Rights of Persons with Disabilities Act', 'Senior citizen welfare'],
      },
      {
        moduleNumber: 13,
        title: 'Issues Relating to Development & Management of Social Sector/Services',
        description: 'Health, Education, Human Resources: universal healthcare, learning outcomes, vocational training.',
        keyThemes: ['Ayushman Bharat (PM-JAY)', 'National Health Policy', 'Skill India mission', 'Out-of-pocket health expenditure'],
        isHighYield: true,
      },
      {
        moduleNumber: 14,
        title: 'Issues Relating to Poverty and Hunger',
        description: 'Poverty estimation, Global Hunger Index, malnutrition in women and children, Food Security Act.',
        keyThemes: ['NFSA 2013 entitlements', 'POSHAN Abhiyaan', 'Hidden hunger and micronutrient deficiencies', 'Social registries'],
        isHighYield: true,
      },
      {
        moduleNumber: 15,
        title: 'Important Aspects of Governance, Transparency & Accountability',
        description: 'E-governance applications, models, successes, limitations; Citizens Charters, transparency, institutional measures.',
        keyThemes: ['RTI Act implementation', 'Social audit mechanisms', 'Sevottam model', 'Direct Benefit Transfer (DBT)'],
        isHighYield: true,
      },
      {
        moduleNumber: 16,
        title: 'Role of Civil Services in a Democracy',
        description: 'Steel frame of India, civil service neutrality vs committed bureaucracy, lateral entry, Mission Karmayogi.',
        keyThemes: ['Civil service reforms', 'Generalist vs specialist debate', 'Administrative ethics and citizen interface'],
      },
      {
        moduleNumber: 17,
        title: 'India and Its Neighborhood — Relations',
        description: 'Neighborhood First policy, relations with Pakistan, China, Nepal, Bangladesh, Sri Lanka, Bhutan, Afghanistan, and Maldives.',
        keyThemes: ['Border infrastructure', 'Cross-border connectivity', 'String of Pearls vs SAGAR initiative', 'River water sharing treaties'],
        isHighYield: true,
      },
      {
        moduleNumber: 18,
        title: 'Bilateral, Regional and Global Groupings Involving India',
        description: 'Quad, I2U2, BRICS, SCO, ASEAN, BIMSTEC, G20, EU, Indo-Pacific economic framework.',
        keyThemes: ['Strategic autonomy', 'Supply chain resilience initiative', 'Maritime security partnerships', 'Free trade agreements (FTAs)'],
        isHighYield: true,
      },
      {
        moduleNumber: 19,
        title: 'Effect of Policies & Politics of Developed/Developing Countries on India',
        description: 'US-China trade war, protectionist tariffs, energy sanctions, Indian diaspora contributions and challenges.',
        keyThemes: ['Remittances and Pravasi Bharatiya', 'Visa restrictions (H-1B)', 'Geopolitical fallout of Middle East conflicts'],
      },
      {
        moduleNumber: 20,
        title: 'Important International Institutions, Agencies & Fora',
        description: 'Structure, mandate, and reforms of UN, UNSC, WTO, WHO, IMF, World Bank, International Court of Justice.',
        keyThemes: ['UNSC permanent membership claim', 'WTO Appellate Body paralysis', 'Bretton Woods institutions reform'],
      },
    ],
  },
  {
    id: 'mains-gs-3',
    paperCode: 'GS-3',
    paperTitle: 'Paper-IV: General Studies III',
    paperSubtitle: 'Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management',
    marks: 250,
    durationHours: 3,
    modulesCount: 20,
    modules: [
      {
        moduleNumber: 1,
        title: 'Indian Economy & Resource Mobilization, Growth, Employment',
        description: 'Planning, economic growth, jobless growth paradox, informal sector, resource mobilization methods.',
        keyThemes: ['Capital expenditure (Capex) cycle', 'Demographic dividend utilization', 'Gross fixed capital formation', 'Labor force participation (LFPR)'],
        isHighYield: true,
      },
      {
        moduleNumber: 2,
        title: 'Inclusive Growth and Issues Arising from It',
        description: 'Inter-regional inequalities, financial inclusion, wealth concentration, equitable growth strategies.',
        keyThemes: ['Gini coefficient trends', 'Financial inclusion indices', 'Aspirational Districts Programme'],
      },
      {
        moduleNumber: 3,
        title: 'Government Budgeting',
        description: 'Revenue/capital receipts, expenditure, fiscal deficits, zero-base budgeting, gender budgeting, outcome budgets.',
        keyThemes: ['Fiscal consolidation roadmap', 'Subsidies rationalization', 'Tax-to-GDP ratio enhancement', 'Public debt sustainability'],
        isHighYield: true,
      },
      {
        moduleNumber: 4,
        title: 'Major Crops, Cropping Patterns & Irrigation Systems',
        description: 'Cropping patterns across agro-climatic zones, storage, transport, marketing of produce, e-technology for farmers.',
        keyThemes: ['Micro-irrigation (per drop more crop)', 'PM-KISAN', 'e-NAM portal', 'Climate-resilient agriculture (millet mission)'],
        isHighYield: true,
      },
      {
        moduleNumber: 5,
        title: 'Farm Subsidies, MSP, PDS & Food Security',
        description: 'Direct/indirect subsidies, Minimum Support Price calculation, PDS limitations and reforms, buffer stocks, animal rearing.',
        keyThemes: ['Swaminathan Commission (C2+50%)', 'Targeted PDS & One Nation One Ration Card', 'FCI storage losses', 'Nutritional security'],
        isHighYield: true,
      },
      {
        moduleNumber: 6,
        title: 'Food Processing and Related Industries in India',
        description: 'Scope and significance, location factors, upstream and downstream requirements, supply chain management.',
        keyThemes: ['Mega Food Parks', 'Cold chain infrastructure', 'Post-harvest losses reduction', 'PM Formalisation of Micro Food Processing'],
      },
      {
        moduleNumber: 7,
        title: 'Land Reforms in India',
        description: 'Abolition of intermediaries, tenancy reforms, land ceilings, consolidation of holdings, land digitisation (SVAMITVA).',
        keyThemes: ['Bhoodan movement lessons', 'Digitisation of land records', 'Model Agricultural Land Leasing Act'],
      },
      {
        moduleNumber: 8,
        title: 'Effects of Liberalization on Economy & Industrial Policy',
        description: '1991 reforms impact, disinvestment policies, ease of doing business, national manufacturing policy.',
        keyThemes: ['Make in India', 'National Logistics Policy', 'Insolvency and Bankruptcy Code (IBC)', 'Privatization strategies'],
      },
      {
        moduleNumber: 9,
        title: 'Infrastructure: Energy, Ports, Roads, Airports, Railways',
        description: 'Physical connectivity, renewable energy targets, logistics cost reduction, railway modernisations.',
        keyThemes: ['PM Gati Shakti Master Plan', 'National Monetisation Pipeline (NMP)', 'Green hydrogen mission', 'Dedicated freight corridors'],
        isHighYield: true,
      },
      {
        moduleNumber: 10,
        title: 'Investment Models',
        description: 'Public-Private Partnerships (PPP), BOT, BOOT, HAM, EPC models, FDI in critical sectors.',
        keyThemes: ['Hybrid Annuity Model (HAM)', 'Venture capital and angel investors', 'Infrastructure Investment Trusts (InvITs)'],
      },
      {
        moduleNumber: 11,
        title: 'Science and Technology Developments in Everyday Life',
        description: 'Everyday applications, emerging tech, digital public infrastructure (UPI, Aadhaar, DigiLocker).',
        keyThemes: ['Digital Public Goods', 'Electric vehicle tech and batteries', 'Smart cities applications'],
      },
      {
        moduleNumber: 12,
        title: 'Achievements of Indians in S&T; Indigenization of Technology',
        description: 'Historical and modern scientific contributions, indigenous defense and space capabilities.',
        keyThemes: ['Tejas, INS Vikrant', 'Cryogenic rocket engines', 'Indigenous vaccine manufacturing'],
      },
      {
        moduleNumber: 13,
        title: 'Awareness in IT, Space, Computers, Robotics, Nano-tech, Biotech, IPR',
        description: 'Frontier technological domains, intellectual property rights, patent regimes, biosafety standards.',
        keyThemes: ['Generative AI regulation', 'Gene editing (CRISPR)', 'Quantum Mission', 'Patent Act Section 3(d)'],
        isHighYield: true,
      },
      {
        moduleNumber: 14,
        title: 'Conservation, Environmental Pollution & Environmental Impact Assessment (EIA)',
        description: 'Environmental degradation, river rejuvenation, circular economy, EIA process and draft notification issues.',
        keyThemes: ['EIA draft norms & public consultation', 'Air quality management (CAQM)', 'Plastic waste management rules', 'COP commitments'],
        isHighYield: true,
      },
      {
        moduleNumber: 15,
        title: 'Disaster and Disaster Management',
        description: 'Disaster management cycle, Sendai Framework, NDMA guidelines, floods, droughts, urban heat islands, landslides.',
        keyThemes: ['Early warning systems', 'Community-based disaster management', 'Glacial lake outburst floods (GLOF)', 'Urban flooding'],
        isHighYield: true,
      },
      {
        moduleNumber: 16,
        title: 'Linkages Between Development and Spread of Extremism',
        description: 'Left-Wing Extremism (LWE), tribal grievances, development deficits, counter-insurgency and surrender policies.',
        keyThemes: ['Red Corridor security', 'SAMADHAN doctrine', 'Forest Rights Act implementation', 'Panchayats (Extension to Scheduled Areas) Act (PESA)'],
      },
      {
        moduleNumber: 17,
        title: 'Role of External State and Non-State Actors in Internal Security',
        description: 'Cross-border proxy wars, state-sponsored terrorism, terror funding, insurgent sanctuaries.',
        keyThemes: ['Hybrid warfare', 'Cross-border narco-terror networks', 'State-sponsored cyber espionage'],
      },
      {
        moduleNumber: 18,
        title: 'Challenges to Internal Security via Communication Networks & Cyber Security',
        description: 'Social media misuse, fake news, radicalization, cyber warfare, data localization, money laundering prevention.',
        keyThemes: ['PMLA Act provisions', 'FATF compliance', 'CERT-In directives', 'Darknet narcotics & cryptos'],
        isHighYield: true,
      },
      {
        moduleNumber: 19,
        title: 'Security Challenges & Management in Border Areas; Organized Crime',
        description: 'Land and maritime border management, smuggling, Golden Crescent and Golden Triangle linkages with terrorism.',
        keyThemes: ['Comprehensive Integrated Border Management System (CIBMS)', 'Coastal security architecture', 'Organized crime syndicates'],
      },
      {
        moduleNumber: 20,
        title: 'Various Security Forces and Agencies and Their Mandate',
        description: 'CAPFs (CRPF, BSF, CISF, ITBP, SSB, NSG, Assam Rifles), NIA, IB, RAW, CBI roles and coordination.',
        keyThemes: ['Border guarding mandates', 'National Investigation Agency (NIA) jurisdiction', 'Theaterisation of armed forces'],
      },
    ],
  },
  {
    id: 'mains-gs-4',
    paperCode: 'GS-4',
    paperTitle: 'Paper-V: General Studies IV',
    paperSubtitle: 'Ethics, Integrity, and Aptitude',
    marks: 250,
    durationHours: 3,
    modulesCount: 8,
    modules: [
      {
        moduleNumber: 1,
        title: 'Ethics and Human Interface',
        description: 'Essence, determinants, consequences of ethics in human action; dimensions of ethics; ethics in private and public relationships.',
        keyThemes: ['Deontological vs teleological ethics', 'Virtue ethics', 'Consequentialism', 'Morality vs legality'],
        isHighYield: true,
      },
      {
        moduleNumber: 2,
        title: 'Human Values — Lessons from Great Leaders & Reformers',
        description: 'Teachings of leaders, reformers, administrators; role of family, society, and educational institutions in inculcating values.',
        keyThemes: ['Mahatma Gandhi, Swami Vivekananda, Nelson Mandela, Dr. APJ Abdul Kalam', 'Family as primary socialization unit'],
      },
      {
        moduleNumber: 3,
        title: 'Attitude: Content, Structure, Function & Social Influence',
        description: 'Influence on thought and behaviour; moral and political attitudes; social influence, cognitive dissonance, and persuasion.',
        keyThemes: ['CAB model (Cognitive, Affective, Behavioral)', 'Nudge theory', 'Prejudice and stereotype mitigation'],
      },
      {
        moduleNumber: 4,
        title: 'Aptitude and Foundational Values for Civil Service',
        description: 'Integrity, impartiality, non-partisanship, objectivity, dedication to public service, empathy, tolerance, and compassion towards weaker sections.',
        keyThemes: ['Nolan Committee Seven Principles', 'Compassion in administrative discretion', 'Intellectual integrity'],
        isHighYield: true,
      },
      {
        moduleNumber: 5,
        title: 'Emotional Intelligence (EI) in Administration',
        description: 'Concepts, models (Goleman), utilities, and application in administrative leadership, riot control, and public grievance handling.',
        keyThemes: ['Self-awareness and self-regulation', 'Empathy in field postings', 'Conflict resolution and stress resilience'],
        isHighYield: true,
      },
      {
        moduleNumber: 6,
        title: 'Contributions of Moral Thinkers and Philosophers',
        description: 'Western philosophers (Socrates, Plato, Aristotle, Kant, Bentham, Mill, Rawls) and Indian thinkers (Kautilya, Ashoka, Tagore, Ambedkar).',
        keyThemes: ['Rawls theory of justice', 'Categorical imperative', 'Utilitarian greatest happiness principle', 'Sarvodaya and Antyodaya'],
      },
      {
        moduleNumber: 7,
        title: 'Public/Civil Service Values and Ethics in Public Administration',
        description: 'Ethical concerns and dilemmas; laws, rules, conscience as sources of guidance; accountability, ethical governance, corporate governance.',
        keyThemes: ['Conflict of interest', 'Whistleblowing ethics', 'Voice of conscience', 'Citizen-centric administration'],
        isHighYield: true,
      },
      {
        moduleNumber: 8,
        title: 'Probity in Governance & Applied Ethics Case Studies',
        description: 'Concept of public service, RTI, codes of conduct, Citizen’s Charters, quality of service delivery, public fund utilization, anti-corruption, and real-life administrative case studies.',
        keyThemes: ['Prevention of Corruption Act', 'Central Vigilance Commission (CVC)', 'Disaster relief allocation dilemmas', 'Tender evaluation probity'],
        isHighYield: true,
      },
    ],
  },
];

// ============================================================================
// 4. MAINS: OPTIONAL SUBJECTS CATALOG (26 Disciplines)
// ============================================================================
export const UPSC_MAINS_OPTIONALS: UpscOptionalSubject[] = [
  {
    id: 'opt-psir',
    name: 'Political Science and International Relations (PSIR)',
    slug: 'psir',
    category: 'Humanities',
    paper1Summary: 'Political Theory (Western & Indian Political Thought, Theories of State, Justice, Equality) and Indian Government and Politics (Constitution, Grassroots Democracy, Federalism).',
    paper2Summary: 'Comparative Politics and International Politics (IR theories, global economic order, UN reforms) and India and the World (Foreign policy, bilateral relations, South Asia).',
    keyThemes: ['Western thinkers (Plato to Rawls)', 'Indian Constitution & institutions', 'IR theories (Realism, Liberalism)', 'Indian foreign policy'],
  },
  {
    id: 'opt-pubad',
    name: 'Public Administration',
    slug: 'public-administration',
    category: 'Humanities',
    paper1Summary: 'Administrative Theory (Evolution, Administrative Thought: Taylor, Weber, Simon; Administrative Behaviour, Organisations, Accountability, Public Policy).',
    paper2Summary: 'Indian Administration (Evolution, Union & State Government, District Administration, Civil Services, Financial Management, Law & Order, Administrative Reforms).',
    keyThemes: ['Weberian bureaucracy', 'New Public Management', 'District Collector role', 'Financial accountability (CAG, PAC)'],
  },
  {
    id: 'opt-sociology',
    name: 'Sociology',
    slug: 'sociology',
    category: 'Humanities',
    paper1Summary: 'Fundamentals of Sociology (Sociological Thinkers: Marx, Durkheim, Weber, Parsons, Merton, Mead; Stratification, Work & Economic Life, Politics & Society, Kinship, Social Change).',
    paper2Summary: 'Indian Society: Structure and Change (Perspectives: Ghurye, Srinivas, Desai; Caste system, Rural social structure, Social movements, Population dynamics, Challenges of transformation).',
    keyThemes: ['Classic sociological thinkers', 'Caste and stratification', 'Agrarian transformation', 'Social movements in India'],
  },
  {
    id: 'opt-geography',
    name: 'Geography',
    slug: 'geography',
    category: 'Sciences',
    paper1Summary: 'Principles of Geography (Geomorphology, Climatology, Oceanography, Biogeography, Environmental Geography, Perspectives in Human Geography, Population, Settlement, Regional Planning).',
    paper2Summary: 'Geography of India (Physical setting, Resources, Agriculture, Industry, Transport, Cultural setting, Settlements, Regional development, Contemporary issues, Compulsory Map Question).',
    keyThemes: ['Geomorphic cycles', 'Monsoon mechanism', 'Compulsory Indian map question', 'Regional planning models'],
  },
  {
    id: 'opt-history',
    name: 'History',
    slug: 'history',
    category: 'Humanities',
    paper1Summary: 'Early India to 18th Century (Sources, Pre-history, Indus Civilization, Vedic Period, Mauryas, Guptas, Delhi Sultanate, Mughals, Vijayanagara Empire, Map sites).',
    paper2Summary: 'Modern India (European penetration, British expansion, Freedom struggle, Gandhi, Left movements, Post-independence consolidation) and World History (Enlightenment to Soviet disintegration).',
    keyThemes: ['Ancient & medieval archaeological sites map', 'Freedom struggle movements', 'World history revolutions', 'Post-independence consolidation'],
  },
  {
    id: 'opt-economics',
    name: 'Economics',
    slug: 'economics',
    category: 'Humanities',
    paper1Summary: 'Advanced Microeconomics, Macroeconomics (Keynes, IS-LM), Money-Banking-Finance, International Economics (Comparative advantage, WTO), Growth and Development theories.',
    paper2Summary: 'Indian Economy in Pre-Independence Era (Drain theory) and Indian Economy after Independence (Pre-liberalization planning vs Post-1991 reforms, Fiscal federalism, Agriculture, Industry).',
    keyThemes: ['IS-LM macroeconomic models', 'International trade theories', '1991 economic reforms', 'Fiscal consolidation'],
  },
  {
    id: 'opt-philosophy',
    name: 'Philosophy',
    slug: 'philosophy',
    category: 'Humanities',
    paper1Summary: 'History and Problems of Philosophy: Western Philosophy (Plato, Descartes, Locke, Kant, Hegel, Wittgenstein) and Indian Philosophy (Carvaka, Jainism, Buddhism, Nyaya-Vaisesika, Samkhya-Yoga, Vedanta).',
    paper2Summary: 'Socio-Political Philosophy (Justice, Liberty, Sovereignty, Political Ideologies, Gender discrimination) and Philosophy of Religion (Notions of God, Problem of Evil, Religious Language).',
    keyThemes: ['Schools of Indian philosophy', 'Kant & Western epistemology', 'Socio-political justice', 'Philosophy of religion'],
  },
  {
    id: 'opt-anthropology',
    name: 'Anthropology',
    slug: 'anthropology',
    category: 'Sciences',
    paper1Summary: 'Meaning, scope, branches of Anthropology, Human Evolution & Primates, Biological basis of life, Prehistoric archaeology, Theories, Research methods, Human genetics.',
    paper2Summary: 'Indian Culture and Civilization evolution, Indian village studies, Caste system, Tribal situation in India, Tribal problems (land alienation, displacement), Tribal administration (PTGs).',
    keyThemes: ['Physical evolution & genetics', 'Socio-cultural theories', 'Tribal India and development', 'Archaeological cultures'],
  },
  {
    id: 'opt-law',
    name: 'Law',
    slug: 'law',
    category: 'Humanities',
    paper1Summary: 'Constitutional and Administrative Law (Fundamental rights, Centre-State relations, Natural justice, Delegated legislation, Ombudsman) and International Law (UN, Law of Sea, Treaties, Human Rights).',
    paper2Summary: 'Law of Crimes (General principles, IPC offences, Prevention of Corruption Act), Law of Torts (Negligence, Strict liability, Consumer Protection), Law of Contracts, and Contemporary Legal Developments.',
    keyThemes: ['Constitutional judicial review', 'Public international law', 'Criminal jurisprudence & Mens rea', 'Cyber laws and PIL'],
  },
  {
    id: 'opt-mathematics',
    name: 'Mathematics',
    slug: 'mathematics',
    category: 'Sciences',
    paper1Summary: 'Linear Algebra (Vector spaces, Matrices, Cayley-Hamilton), Calculus, Analytic Geometry (3D), Ordinary Differential Equations, Dynamics & Statics, Vector Analysis (Gauss/Stokes).',
    paper2Summary: 'Algebra (Groups, Rings, Fields), Real Analysis (Riemann integrals), Complex Analysis (Cauchy theorem), Linear Programming, Partial Differential Equations, Numerical Analysis, Fluid Dynamics.',
    keyThemes: ['Eigenvalues & linear transformations', 'Multivariate calculus & PDE', 'Group and ring theory', 'Complex contour integration'],
  },
  {
    id: 'opt-physics',
    name: 'Physics',
    slug: 'physics',
    category: 'Sciences',
    paper1Summary: 'Mechanics of Particles & Rigid Bodies, Special Relativity (Lorentz transformations), Waves & Optics (Interference, Diffraction, Lasers), Electricity & Magnetism, Thermal & Statistical Physics.',
    paper2Summary: 'Quantum Mechanics (Schrodinger equation, Hydrogen atom), Atomic & Molecular Physics (Zeeman effect, Raman effect), Nuclear & Particle Physics, Solid State Physics & Electronics.',
    keyThemes: ['Lagrangian & rigid body dynamics', 'Maxwell equations & Poynting theorem', 'Quantum wavefunctions', 'Semiconductors & nuclear models'],
  },
  {
    id: 'opt-chemistry',
    name: 'Chemistry',
    slug: 'chemistry',
    category: 'Sciences',
    paper1Summary: 'Atomic Structure, Chemical Bonding, Solid State, Gaseous State, Thermodynamics, Phase Equilibria, Electrochemistry, Kinetics, Photochemistry, Coordination Compounds.',
    paper2Summary: 'Delocalised Covalent Bonding, Reaction Mechanisms (SN1, SN2, E1, E2, Named Rearrangements), Pericyclic Reactions, Polymers, Reagents in Organic Synthesis, Spectroscopy (NMR, IR, UV, Mass).',
    keyThemes: ['Coordination & bio-inorganic chemistry', 'Named organic rearrangements', 'Spectroscopic structure elucidation', 'Chemical thermodynamics'],
  },
];

// ============================================================================
// 5. MASTER BLUEPRINT & STRATEGIC ARCHITECTURE
// ============================================================================
export interface UpscPrelimsPaperPattern {
  paperName: string;
  duration: string;
  totalMarks: number;
  questionCount: number;
  marksPerQuestion: number;
  negativeMarking: string;
  negativeDeduction: number;
  isQualifying: boolean;
  qualifyingPercentage?: number;
  qualifyingMarks?: number;
}

export interface UpscMainsPaperPattern {
  paperCode: string;
  paperName: string;
  marks: number;
  isQualifying: boolean;
  countingForMerit: boolean;
  duration: string;
}

export const UPSC_EXAM_PATTERN = {
  prelims: {
    totalMarks: 400,
    papers: [
      {
        paperName: 'Paper I - General Studies',
        duration: '2 Hours (120 Mins)',
        totalMarks: 200,
        questionCount: 100,
        marksPerQuestion: 2.0,
        negativeMarking: '1/3rd (0.66 marks)',
        negativeDeduction: 0.66,
        isQualifying: false,
      },
      {
        paperName: 'Paper II - CSAT',
        duration: '2 Hours (120 Mins)',
        totalMarks: 200,
        questionCount: 80,
        marksPerQuestion: 2.5,
        negativeMarking: '1/3rd (0.83 marks)',
        negativeDeduction: 0.83,
        isQualifying: true,
        qualifyingPercentage: 33,
        qualifyingMarks: 66,
      },
    ] as UpscPrelimsPaperPattern[],
    notes: [
      'Note 1: Paper-II of the Civil Services (Preliminary) Examination will be a qualifying paper with minimum qualifying marks fixed at 33%.',
      'Note 2: The questions will be of multiple choice, objective type.',
      'Note 3: It is mandatory for the candidate to appear in both the Papers of Civil Services (Prelim) Examination for the purpose of evaluation.',
    ],
  },
  mains: {
    qualifyingPapers: [
      { paperCode: 'Paper A', paperName: 'Indian Language (Qualifying Paper A)', marks: 300, isQualifying: true, countingForMerit: false, duration: '3 Hours' },
      { paperCode: 'Paper B', paperName: 'English (Qualifying Paper B)', marks: 300, isQualifying: true, countingForMerit: false, duration: '3 Hours' },
    ] as UpscMainsPaperPattern[],
    meritPapers: [
      { paperCode: 'Paper I', paperName: 'Essay', marks: 250, isQualifying: false, countingForMerit: true, duration: '3 Hours' },
      { paperCode: 'Paper II', paperName: 'GS Paper I (Heritage, Culture, History, Geography & Society)', marks: 250, isQualifying: false, countingForMerit: true, duration: '3 Hours' },
      { paperCode: 'Paper III', paperName: 'GS Paper II (Governance, Constitution, Polity, Social Justice & IR)', marks: 250, isQualifying: false, countingForMerit: true, duration: '3 Hours' },
      { paperCode: 'Paper IV', paperName: 'GS Paper III (Technology, Economic Development, Environment, Security, Disaster Mgmt)', marks: 250, isQualifying: false, countingForMerit: true, duration: '3 Hours' },
      { paperCode: 'Paper V', paperName: 'GS Paper IV (Ethics, Integrity and Aptitude)', marks: 250, isQualifying: false, countingForMerit: true, duration: '3 Hours' },
      { paperCode: 'Paper VI', paperName: 'Optional Paper I', marks: 250, isQualifying: false, countingForMerit: true, duration: '3 Hours' },
      { paperCode: 'Paper VII', paperName: 'Optional Paper II', marks: 250, isQualifying: false, countingForMerit: true, duration: '3 Hours' },
    ] as UpscMainsPaperPattern[],
    subtotalWritten: 1750,
    interviewMarks: 275,
    grandTotal: 2025,
    philosophy:
      'The main Examination is intended to assess the overall intellectual traits and depth of understanding of candidates rather than merely the range of their information and memory. The nature and standard of questions in General Studies papers will be such that a well-educated person will be able to answer them without any specialized study.',
  },
};

export const UPSC_SYLLABUS_OVERVIEW = {
  examName: 'Civil Services Examination (CSE)',
  governingBody: 'Union Public Service Commission (UPSC)',
  academicSession: '2026 - 2027 (Official Notification Scheme)',
  stages: [
    {
      stageNumber: 1,
      name: 'Preliminary Examination (Elimination Round)',
      format: 'Objective Type (Offline OMR)',
      totalMarks: 400,
      papers: [
        {
          code: 'GS-1',
          name: 'General Studies Paper I',
          marks: 200,
          questions: 100,
          duration: '2 Hours (09:30 - 11:30)',
          marking: '+2 for correct, -0.66 (1/3rd) for incorrect, 0 for unattempted',
          role: 'Determines merit list for qualification to Civil Services (Main) Examination',
        },
        {
          code: 'CSAT',
          name: 'General Studies Paper II (CSAT)',
          marks: 200,
          questions: 80,
          duration: '2 Hours (14:30 - 16:30)',
          marking: '+2.5 for correct, -0.83 (1/3rd) for incorrect, 0 for unattempted',
          role: 'Qualifying paper only; minimum 33% (66 marks) required to evaluate Paper I',
        },
      ],
    },
    {
      stageNumber: 2,
      name: 'Main Examination (Written Descriptive)',
      format: 'Subjective Descriptive Essay & Answer Writing',
      totalMarks: 1750,
      papers: [
        { code: 'Qualifying-A', name: 'Indian Language (Eighth Schedule)', marks: 300, duration: '3 Hours', role: 'Qualifying (25% passing marks)' },
        { code: 'Qualifying-B', name: 'English Language', marks: 300, duration: '3 Hours', role: 'Qualifying (25% passing marks)' },
        { code: 'Paper-I', name: 'Essay', marks: 250, duration: '3 Hours', role: 'Merit Counting' },
        { code: 'Paper-II', name: 'General Studies I (Heritage, Culture, History, Geography, Society)', marks: 250, duration: '3 Hours', role: 'Merit Counting' },
        { code: 'Paper-III', name: 'General Studies II (Governance, Constitution, Polity, Social Justice, IR)', marks: 250, duration: '3 Hours', role: 'Merit Counting' },
        { code: 'Paper-IV', name: 'General Studies III (Technology, Economy, Environment, Security, Disaster Mgmt)', marks: 250, duration: '3 Hours', role: 'Merit Counting' },
        { code: 'Paper-V', name: 'General Studies IV (Ethics, Integrity, and Aptitude + Case Studies)', marks: 250, duration: '3 Hours', role: 'Merit Counting' },
        { code: 'Paper-VI', name: 'Optional Subject — Paper 1', marks: 250, duration: '3 Hours', role: 'Merit Counting' },
        { code: 'Paper-VII', name: 'Optional Subject — Paper 2', marks: 250, duration: '3 Hours', role: 'Merit Counting' },
      ],
    },
    {
      stageNumber: 3,
      name: 'Personality Test / Interview',
      format: 'Board Interview at Dholpur House, New Delhi',
      totalMarks: 275,
      role: 'Assesses mental alertness, critical assimilation, clear and logical exposition, balanced judgment, and integrity.',
    },
  ],
  totalMeritMarks: 2025, // 1750 Mains + 275 Interview
  strategicInsights: [
    {
      title: 'Fractional Negative Penalty Calibration',
      detail: 'In Prelims Paper I, each negative deducts 0.66 marks; in CSAT Paper II, each wrong answer deducts 0.83 marks. Strict negative control is essential to cross the qualifying threshold.',
    },
    {
      title: 'Integrated Prelims-cum-Mains Approach',
      detail: 'Over 75% of the General Studies syllabus overlaps between Prelims and Mains (Polity, Modern History, Geography, Environment, Economy). Preparing descriptive analytical points builds intuitive mastery for Prelims MCQs.',
    },
    {
      title: 'Ethics and Optional as Deciding Pillars',
      detail: 'General Studies IV (Ethics: 250M) and the Optional Subject (Papers 1 & 2: 500M) contribute 750 out of 1750 marks with the widest score variances (differences of 60-80 marks determine top ranks).',
    },
  ],
};
