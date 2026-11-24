/**
 * Master Official JEE (Advanced) Syllabus Data
 * Extracted directly from the official IIT Joint Admission Board (JAB)
 * JEE (Advanced) Syllabus Document.
 * Note: The syllabus for JEE Advanced 2026 remains identical to JEE Advanced 2025.
 *
 * CRITICAL EDUCATIONAL DISTINCTION:
 * JEE Advanced has NOT rationalized its syllabus. Unlike JEE Main and NEET (UG),
 * JEE Advanced explicitly retains classical topics including:
 * - Chemistry: States of Matter (Gases & Liquids), Solid State, Surface Chemistry,
 *   Hydrogen, s-Block Elements, Isolation of Metals (Metallurgy), Polymers,
 *   Chemistry in Everyday Life, Environmental Chemistry.
 * - Physics: Damped and Forced Oscillations, Carnot Engine & Efficiency,
 *   Doppler Effect in Sound, Characteristic & Continuous X-rays (Moseley's Law),
 *   Post Office Box & Metre Bridge.
 * - Mathematics: Scalar & Vector Triple Products.
 */

export interface SyllabusTopic {
  id: string;
  name: string;
  details?: string;
  isHighYield?: boolean;
  isRetainedInAdvancedOnly?: boolean; // Retained in JEE Adv, deleted in JEE Main/NEET
}

export interface SyllabusChapterOrUnit {
  id: string;
  unitNumber: number;
  name: string;
  slug: string;
  category?: 'Physical' | 'Inorganic' | 'Organic' | 'General' | 'Mechanics' | 'Thermal' | 'Electromagnetism' | 'Optics' | 'Modern' | 'Algebra' | 'Calculus' | 'Coordinate' | 'Vectors' | 'Trigonometry';
  weightagePercent: number;
  description: string;
  isRetainedInAdvancedOnly?: boolean;
  topics: SyllabusTopic[];
}

export interface SubjectSyllabus {
  id: string;
  name: string;
  slug: string;
  totalUnits: number;
  units: SyllabusChapterOrUnit[];
}

export interface AdvancedExclusiveTopic {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  chapter: string;
  topic: string;
  significance: string;
  whyDroppedInMain: string;
}

// ============================================================================
// 1. CHEMISTRY SYLLABUS (Physical, Inorganic, Organic)
// ============================================================================
export const JEE_ADVANCED_CHEMISTRY_SYLLABUS: SubjectSyllabus = {
  id: 'sub-ja-chem',
  name: 'Chemistry',
  slug: 'chemistry',
  totalUnits: 34,
  units: [
    // --- PHYSICAL CHEMISTRY ---
    {
      id: 'ja-chem-u1',
      unitNumber: 1,
      name: 'General Topics',
      slug: 'general-topics',
      category: 'Physical',
      weightagePercent: 3,
      description: 'Atoms, molecules, Dalton theory, mole concept, stoichiometry, redox, neutralisation, and concentration units.',
      topics: [
        { id: 'ja-chem-1-1', name: 'Atoms, molecules & Dalton atomic theory', details: 'Foundational postulates and laws of chemical combination' },
        { id: 'ja-chem-1-2', name: 'Mole concept & Chemical formulae', details: 'Empirical and molecular formulas, percentage composition' },
        { id: 'ja-chem-1-3', name: 'Stoichiometry & Balanced chemical equations', details: 'Calculations involving redox, neutralisation, and displacement reactions' },
        { id: 'ja-chem-1-4', name: 'Concentration terms', details: 'Molarity, molality, normality, and mole fraction calculations' },
      ],
    },
    {
      id: 'ja-chem-u2',
      unitNumber: 2,
      name: 'States of Matter: Gases and Liquids',
      slug: 'states-of-matter-gases-liquids',
      category: 'Physical',
      weightagePercent: 4,
      isRetainedInAdvancedOnly: true,
      description: 'Ideal and real gases, van der Waals equation, Maxwell velocity distributions, diffusion, and liquid properties.',
      topics: [
        { id: 'ja-chem-2-1', name: 'Gas laws & Ideal gas equation', details: 'PV = nRT and absolute temperature scale', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-2-2', name: 'van der Waals equation of state', details: 'Deviation from ideality, compressibility factor Z, critical parameters', isHighYield: true, isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-2-3', name: 'Kinetic theory of gases & Molecular velocities', details: 'Average, RMS, and most probable velocities and their relation with temperature', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-2-4', name: 'Partial pressures & Graham diffusion', details: "Dalton's law of partial pressures and Graham's law of diffusion", isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-2-5', name: 'Intermolecular interactions & Liquid state', details: 'Dipole-dipole, London forces, vapour pressure, surface tension, and viscosity', isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-chem-u3',
      unitNumber: 3,
      name: 'Atomic Structure',
      slug: 'atomic-structure',
      category: 'Physical',
      weightagePercent: 4,
      description: 'Bohr model, de Broglie duality, Heisenberg uncertainty, wave function plots, and orbital quantum mechanics.',
      topics: [
        { id: 'ja-chem-3-1', name: 'Bohr model & Hydrogen spectrum', details: 'Energy levels, Rydberg formula, spectral series (Lyman, Balmer, etc.)' },
        { id: 'ja-chem-3-2', name: 'Wave-particle duality & Uncertainty principle', details: 'de Broglie hypothesis and Heisenberg uncertainty relations' },
        { id: 'ja-chem-3-3', name: 'Quantum mechanical picture & Wave functions', details: 'Energies, quantum numbers (n, l, m, s), wave function Ψ and probability density Ψ² plots', isHighYield: true },
        { id: 'ja-chem-3-4', name: 'Orbital shapes & Electronic configuration', details: 'Shapes of s, p, d orbitals; Aufbau, Pauli exclusion, and Hund rules' },
      ],
    },
    {
      id: 'ja-chem-u4',
      unitNumber: 4,
      name: 'Chemical Bonding and Molecular Structure',
      slug: 'chemical-bonding-molecular-structure',
      category: 'Physical',
      weightagePercent: 5,
      description: 'Orbital overlap, hybridisation, homonuclear diatomics MO diagrams up to Ne2, VSEPR shapes, and polarity.',
      topics: [
        { id: 'ja-chem-4-1', name: 'Orbital overlap & Covalent bonding', details: 'Sigma and pi bonds, bond length, bond order, bond energy' },
        { id: 'ja-chem-4-2', name: 'Hybridisation (s, p, and d orbitals)', details: 'sp, sp², sp³, sp³d, sp³d² hybridisation schemes' },
        { id: 'ja-chem-4-3', name: 'Molecular Orbital Theory', details: 'MO energy diagrams for homonuclear diatomics up to Ne2, magnetic properties', isHighYield: true },
        { id: 'ja-chem-4-4', name: 'VSEPR model & Geometries', details: 'Linear, angular, triangular planar, square planar, pyramidal, trigonal bipyramidal, octahedral' },
        { id: 'ja-chem-4-5', name: 'Dipole moment & Hydrogen bonding', details: 'Molecular polarity, intermolecular and intramolecular H-bonds' },
      ],
    },
    {
      id: 'ja-chem-u5',
      unitNumber: 5,
      name: 'Chemical Thermodynamics',
      slug: 'chemical-thermodynamics',
      category: 'Physical',
      weightagePercent: 5,
      description: 'First and second laws, state functions, PV work, Hess law, lattice enthalpy, entropy, and Gibbs free energy.',
      topics: [
        { id: 'ja-chem-5-1', name: 'State functions & First Law', details: 'Intensive/extensive properties, internal energy, pressure-volume work, and heat' },
        { id: 'ja-chem-5-2', name: 'Thermochemistry & Hess Law', details: 'Enthalpies of reaction, fusion, vaporization, and lattice enthalpy' },
        { id: 'ja-chem-5-3', name: 'Second Law of Thermodynamics & Entropy', details: 'Spontaneity criteria, entropy changes in reversible and irreversible processes', isHighYield: true },
        { id: 'ja-chem-5-4', name: 'Gibbs Energy & Equilibrium Criteria', details: 'ΔG = ΔH - TΔS, standard Gibbs energy ΔG° and relation with K' },
      ],
    },
    {
      id: 'ja-chem-u6',
      unitNumber: 6,
      name: 'Chemical and Ionic Equilibrium',
      slug: 'chemical-ionic-equilibrium',
      category: 'Physical',
      weightagePercent: 5,
      description: 'Mass action, Kp/Kc, Le Chatelier principle, solubility product, common ion effect, pH, buffers, and salt hydrolysis.',
      topics: [
        { id: 'ja-chem-6-1', name: 'Chemical Equilibrium & Le Chatelier Principle', details: 'Law of mass action, Kp and Kc, reaction quotient Q, effect of T, P, conc.' },
        { id: 'ja-chem-6-2', name: 'Acids, Bases & pH Calculations', details: 'Brønsted and Lewis theories, ionization constants of weak acids and bases' },
        { id: 'ja-chem-6-3', name: 'Buffer Solutions & Salt Hydrolysis', details: 'Henderson-Hasselbalch equation, hydrolysis constant and pH of salt solutions', isHighYield: true },
        { id: 'ja-chem-6-4', name: 'Solubility Product (Ksp) & Common Ion Effect', details: 'Precipitation criteria, simultaneous equilibria, complexation effects' },
      ],
    },
    {
      id: 'ja-chem-u7',
      unitNumber: 7,
      name: 'Electrochemistry',
      slug: 'electrochemistry',
      category: 'Physical',
      weightagePercent: 4,
      description: 'Galvanic cells, Nernst equation, conductance, Kohlrausch law, batteries, fuel cells, and corrosion.',
      topics: [
        { id: 'ja-chem-7-1', name: 'Galvanic Cells & Standard Potentials', details: 'Electrochemical series, EMF of cell, standard hydrogen electrode' },
        { id: 'ja-chem-7-2', name: 'Nernst Equation & Electrochemical Work', details: 'Dependence of cell EMF on concentration, ΔG = -nFEcell', isHighYield: true },
        { id: 'ja-chem-7-3', name: 'Electrolytic Conductance & Kohlrausch Law', details: 'Specific, equivalent, and molar conductivity, limiting molar conductivity' },
        { id: 'ja-chem-7-4', name: 'Batteries, Fuel Cells & Corrosion', details: 'Primary and secondary batteries, lead-acid, H2-O2 fuel cell, rusting mechanisms' },
      ],
    },
    {
      id: 'ja-chem-u8',
      unitNumber: 8,
      name: 'Chemical Kinetics',
      slug: 'chemical-kinetics',
      category: 'Physical',
      weightagePercent: 4,
      description: 'Rate laws, order/molecularity, integrated expressions, Arrhenius equation, and solid/enzyme catalysis.',
      topics: [
        { id: 'ja-chem-8-1', name: 'Reaction Rates & Order of Reaction', details: 'Differential rate laws, order vs molecularity, units of rate constants' },
        { id: 'ja-chem-8-2', name: 'Integrated Rate Expressions', details: 'Zero-order and first-order kinetics, half-life equations, pseudo-first order' },
        { id: 'ja-chem-8-3', name: 'Temperature Dependence & Arrhenius Equation', details: 'Activation energy, Arrhenius plot ln(k) vs 1/T, collision theory', isHighYield: true },
        { id: 'ja-chem-8-4', name: 'Catalysis Mechanics', details: 'Homogeneous/heterogeneous catalysis, activity and selectivity of solid catalysts, enzyme mechanism' },
      ],
    },
    {
      id: 'ja-chem-u9',
      unitNumber: 9,
      name: 'Solid State',
      slug: 'solid-state',
      category: 'Physical',
      weightagePercent: 4,
      isRetainedInAdvancedOnly: true,
      description: 'Seven crystal systems, close packing (fcc, bcc, hcp), nearest neighbours, radius ratio, and point defects.',
      topics: [
        { id: 'ja-chem-9-1', name: 'Crystal Systems & Unit Cells', details: 'Seven crystal systems (cell parameters a, b, c, α, β, γ), primitive and centered cells', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-9-2', name: 'Close Packing in fcc, bcc & hcp', details: 'Packing efficiency, voids (tetrahedral and octahedral voids), coordination numbers', isHighYield: true, isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-9-3', name: 'Radius Ratio Rules & Nearest Neighbours', details: 'Ionic radii ratio for tetrahedral, octahedral, and cubic coordination', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-9-4', name: 'Point Defects in Solids', details: 'Stoichiometric (Schottky, Frenkel) and non-stoichiometric (metal excess/deficiency) defects', isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-chem-u10',
      unitNumber: 10,
      name: 'Solutions',
      slug: 'solutions',
      category: 'Physical',
      weightagePercent: 4,
      description: 'Henry law, Raoult law, ideal solutions, colligative properties, and van t Hoff factor.',
      topics: [
        { id: 'ja-chem-10-1', name: 'Solubility of Gases & Henry Law', details: 'Pressure dependence of gas solubility in liquids' },
        { id: 'ja-chem-10-2', name: 'Raoult Law & Ideal/Non-Ideal Solutions', details: 'Vapour pressure diagrams, positive and negative deviations from Raoult law' },
        { id: 'ja-chem-10-3', name: 'Colligative Properties', details: 'Vapour pressure lowering, boiling point elevation, freezing point depression, osmotic pressure' },
        { id: 'ja-chem-10-4', name: 'van t Hoff Factor (i)', details: 'Abnormal molecular masses, degree of dissociation and association', isHighYield: true },
      ],
    },
    {
      id: 'ja-chem-u11',
      unitNumber: 11,
      name: 'Surface Chemistry',
      slug: 'surface-chemistry',
      category: 'Physical',
      weightagePercent: 3,
      isRetainedInAdvancedOnly: true,
      description: 'Physisorption, chemisorption, Freundlich isotherm, colloids, emulsions, surfactants, and micelles.',
      topics: [
        { id: 'ja-chem-11-1', name: 'Adsorption: Physisorption vs Chemisorption', details: 'Distinction, enthalpy of adsorption, factors affecting gas adsorption on solids', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-11-2', name: 'Freundlich Adsorption Isotherm', details: 'x/m = k·P^(1/n), logarithmic plots and limitations', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-11-3', name: 'Colloids & Classification', details: 'Lyophilic vs lyophobic sols, multimolecular, macromolecular, and associated colloids', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-11-4', name: 'Surfactants, Micelles & Emulsions', details: 'Critical micelle concentration (CMC), Kraft temperature, cleansing action of soap', isRetainedInAdvancedOnly: true },
      ],
    },

    // --- INORGANIC CHEMISTRY ---
    {
      id: 'ja-chem-u12',
      unitNumber: 12,
      name: 'Classification of Elements and Periodicity in Properties',
      slug: 'periodicity-in-properties',
      category: 'Inorganic',
      weightagePercent: 3,
      description: 'Modern periodic law, electronic configurations, and periodic trends in atomic/ionic radii, IE, EA, and electronegativity.',
      topics: [
        { id: 'ja-chem-12-1', name: 'Modern Periodic Law & Table Layout', details: 'Long form of periodic table and IUPAC nomenclature of elements > 100' },
        { id: 'ja-chem-12-2', name: 'Periodic Trends in Physical Properties', details: 'Atomic and ionic radii, screening effect, effective nuclear charge Zeff' },
        { id: 'ja-chem-12-3', name: 'Ionization Enthalpy & Electron Gain Enthalpy', details: 'Successive ionization energies, anomalies across periods and groups' },
        { id: 'ja-chem-12-4', name: 'Electronegativity, Valency & Chemical Reactivity', details: 'Pauling scale, diagonal relationships, and periodic chemical behavior' },
      ],
    },
    {
      id: 'ja-chem-u13',
      unitNumber: 13,
      name: 'Hydrogen',
      slug: 'hydrogen',
      category: 'Inorganic',
      weightagePercent: 2,
      isRetainedInAdvancedOnly: true,
      description: 'Position in periodic table, isotopes, hydrides (ionic, covalent, interstitial), heavy water, H2O2, and hydrogen fuel.',
      topics: [
        { id: 'ja-chem-13-1', name: 'Hydrogen Position & Isotopes', details: 'Protium, deuterium, tritium, isotopic effects and preparation', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-13-2', name: 'Hydrides Classification', details: 'Ionic (saline), covalent (electron-deficient/precise/rich), and metallic/interstitial hydrides', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-13-3', name: 'Water & Heavy Water (D2O)', details: 'Structure, hydrogen bonding, hardness of water, properties of heavy water', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-13-4', name: 'Hydrogen Peroxide (H2O2) & Hydrogen Fuel', details: 'Preparation, non-planar structure, oxidising/reducing actions, volume strength, hydrogen economy', isHighYield: true, isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-chem-u14',
      unitNumber: 14,
      name: 's-Block Elements',
      slug: 's-block-elements',
      category: 'Inorganic',
      weightagePercent: 3,
      isRetainedInAdvancedOnly: true,
      description: 'Alkali and alkaline earth metals, reactions with air/water/acids, liquid ammonia solutions, and industrial sodium/calcium compounds.',
      topics: [
        { id: 'ja-chem-14-1', name: 'Alkali Metals Properties & Reactivity', details: 'Reactions towards air, water, dihydrogen, halogens, liquid ammonia deep blue solutions', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-14-2', name: 'Alkaline Earth Metals Trends', details: 'Basic nature of oxides/hydroxides, solubility of carbonates and sulphates, flame test', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-14-3', name: 'Industrial Sodium Compounds', details: 'Sodium carbonate (washing soda), sodium hydroxide (caustic soda), sodium chloride, NaHCO3', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-14-4', name: 'Industrial Calcium Compounds', details: 'Quick lime (CaO), slaked lime Ca(OH)2, limestone (CaCO3), plaster of Paris and gypsum (CaSO4)', isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-chem-u15',
      unitNumber: 15,
      name: 'p-Block Elements',
      slug: 'p-block-elements',
      category: 'Inorganic',
      weightagePercent: 6,
      description: 'Groups 13 to 18 trends, inert pair effect, borax, diborane, carbon allotropes, silicates, silicones, oxoacids of P and S, interhalogens, and xenon fluorides.',
      topics: [
        { id: 'ja-chem-15-1', name: 'Group 13 Elements (Boron Family)', details: 'Inert pair effect, anomalous properties, diborane 3c-2e bridge bonds, borax, boric acid, BF3' },
        { id: 'ja-chem-15-2', name: 'Group 14 Elements (Carbon Family)', details: 'Allotropes of carbon, CO, CO2, silica, silicates, silicones, zeolites' },
        { id: 'ja-chem-15-3', name: 'Group 15 Elements (Nitrogen Family)', details: 'Oxides of nitrogen, phosphine, phosphorus halides (PCl3, PCl5), oxoacids of phosphorus' },
        { id: 'ja-chem-15-4', name: 'Group 16 Elements (Oxygen Family)', details: 'Allotropes of sulfur, oxoacids of sulfur (H2SO4, oleum, Caro acid, Marshall acid)' },
        { id: 'ja-chem-15-5', name: 'Group 17 & 18 Elements (Halogens & Noble Gases)', details: 'Interhalogen compounds, bleaching powder, xenon fluorides and oxides (XeF2, XeF4, XeF6, XeO3)', isHighYield: true },
      ],
    },
    {
      id: 'ja-chem-u16',
      unitNumber: 16,
      name: 'd-Block Elements',
      slug: 'd-block-elements',
      category: 'Inorganic',
      weightagePercent: 4,
      description: 'Transition metals, variable oxidation states, magnetic moments, interstitial alloys, KMnO4 and K2Cr2O7 oxoanions.',
      topics: [
        { id: 'ja-chem-16-1', name: 'General Characteristics of 3d Metals', details: 'Electronic configuration, ionization enthalpies, standard electrode potentials' },
        { id: 'ja-chem-16-2', name: 'Oxidation States & Magnetic Properties', details: 'Variable valencies, spin-only magnetic moment μ = √(n(n+2)) BM, catalytic properties' },
        { id: 'ja-chem-16-3', name: 'Interstitial Compounds & Alloys', details: 'Formation of non-stoichiometric interstitials, alloy formation principles' },
        { id: 'ja-chem-16-4', name: 'Oxoanions of Chromium and Manganese', details: 'Potassium dichromate (K2Cr2O7) and potassium permanganate (KMnO4) structures, preparations and redox titrations', isHighYield: true },
      ],
    },
    {
      id: 'ja-chem-u17',
      unitNumber: 17,
      name: 'f-Block Elements',
      slug: 'f-block-elements',
      category: 'Inorganic',
      weightagePercent: 2,
      description: 'Lanthanoids and actinoids, lanthanoid and actinoid contractions, oxidation states, and general characteristics.',
      topics: [
        { id: 'ja-chem-17-1', name: 'Lanthanoid Series & Contraction', details: 'Electronic configuration, +3 predominant state, lanthanoid contraction cause and consequences on 4d/5d radii' },
        { id: 'ja-chem-17-2', name: 'Actinoid Series & Characteristics', details: 'Radioactivity, comparison with lanthanoids, higher variable oxidation states' },
      ],
    },
    {
      id: 'ja-chem-u18',
      unitNumber: 18,
      name: 'Coordination Compounds',
      slug: 'coordination-compounds',
      category: 'Inorganic',
      weightagePercent: 5,
      description: 'Werner theory, IUPAC naming, cis-trans and optical/ionization isomerism, VBT, CFT, spectrochemical series, and metal carbonyls.',
      topics: [
        { id: 'ja-chem-18-1', name: 'Werner Theory & IUPAC Nomenclature', details: 'Primary/secondary valencies, rules for naming coordination complexes' },
        { id: 'ja-chem-18-2', name: 'Isomerism in Coordination Complexes', details: 'Structural (ionization, hydrate, linkage, coordination) and stereoisomerism (geometrical cis-trans and optical)', isHighYield: true },
        { id: 'ja-chem-18-3', name: 'Valence Bond Theory & Crystal Field Theory', details: 'Octahedral and tetrahedral crystal field splitting Δo and Δt, high-spin/low-spin complexes' },
        { id: 'ja-chem-18-4', name: 'Spectrochemical Series, Colour & Metal Carbonyls', details: 'Ligand strength, d-d transition absorption colours, synergic bonding in metal carbonyls M-C≡O' },
      ],
    },
    {
      id: 'ja-chem-u19',
      unitNumber: 19,
      name: 'Isolation of Metals (Metallurgy)',
      slug: 'isolation-of-metals',
      category: 'Inorganic',
      weightagePercent: 3,
      isRetainedInAdvancedOnly: true,
      description: 'Ellingham thermodynamic principles (iron, copper, zinc), cyanide leaching (Ag, Au), Hall-Heroult (Al), and refining methods.',
      topics: [
        { id: 'ja-chem-19-1', name: 'Concentration of Ores', details: 'Gravity separation, magnetic separation, froth floatation, leaching process', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-19-2', name: 'Ellingham Diagrams & Pyrometallurgy', details: 'Thermodynamic extraction principles of Iron (blast furnace), Copper (Bessemerisation), Zinc (reduction)', isHighYield: true, isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-19-3', name: 'Hydrometallurgy & Electrometallurgy', details: 'Cyanide extraction of Silver and Gold (MacArthur-Forrest), Hall-Heroult electrolytic reduction of Aluminium', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-19-4', name: 'Refining Techniques', details: 'Liquation, distillation, electrolytic refining, zone refining, Mond process (Ni), van Arkel process (Zr, Ti)', isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-chem-u20',
      unitNumber: 20,
      name: 'Principles of Qualitative Analysis',
      slug: 'qualitative-analysis',
      category: 'Inorganic',
      weightagePercent: 4,
      description: 'Systematic cation analysis (Groups I to V: Ag+, Hg2+, Cu2+, Pb2+, Fe3+, Cr3+, Al3+, Ca2+, Ba2+, Zn2+, Mn2+, Mg2+) and anion tests.',
      topics: [
        { id: 'ja-chem-20-1', name: 'Systematic Cation Separation (Groups I to V)', details: 'Precipitation with group reagents: dilute HCl (Gp I), H2S in acidic medium (Gp II), NH4OH in NH4Cl (Gp III), H2S in alkaline medium (Gp IV), (NH4)2CO3 (Gp V)' },
        { id: 'ja-chem-20-2', name: 'Individual Cation Confirmatory Tests', details: 'Reactions of Ag+, Hg2+, Cu2+, Pb2+, Fe3+, Cr3+, Al3+, Ca2+, Ba2+, Zn2+, Mn2+, Mg2+', isHighYield: true },
        { id: 'ja-chem-20-3', name: 'Systematic Anion Tests', details: 'Nitrate (brown ring test), halides (excluding fluoride), carbonate, bicarbonate, sulphate, and sulphide detection' },
      ],
    },
    {
      id: 'ja-chem-u21',
      unitNumber: 21,
      name: 'Environmental Chemistry',
      slug: 'environmental-chemistry',
      category: 'Inorganic',
      weightagePercent: 2,
      isRetainedInAdvancedOnly: true,
      description: 'Atmospheric pollution, tropospheric and stratospheric pollution, acid rain, smog, water pollution, industrial waste, and green chemistry.',
      topics: [
        { id: 'ja-chem-21-1', name: 'Atmospheric Pollution & Smog', details: 'Gaseous pollutants (SOx, NOx, CO, CO2), classical smog vs photochemical smog mechanisms', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-21-2', name: 'Ozone Layer Depletion & Acid Rain', details: 'CFCs catalytic ozone breakdown cycle, greenhouse effect, global warming, acid rain pH < 5.6', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-21-3', name: 'Water & Soil Pollution', details: 'BOD, COD, toxic heavy metals (Pb, Cd, Hg), pesticides and industrial effluents', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-21-4', name: 'Green Chemistry Principles', details: 'Atom economy, sustainable chemical processes, waste minimization strategies', isRetainedInAdvancedOnly: true },
      ],
    },

    // --- ORGANIC CHEMISTRY ---
    {
      id: 'ja-chem-u22',
      unitNumber: 22,
      name: 'Basic Principles of Organic Chemistry',
      slug: 'basic-principles-organic-chemistry',
      category: 'Organic',
      weightagePercent: 4,
      description: 'Hybridisation of carbon, aromaticity, structural and stereoisomerism (enantiomers, diastereomers, meso), reactive intermediates, electronic effects.',
      topics: [
        { id: 'ja-chem-22-1', name: 'Carbon Hybridisation, Shapes & Aromaticity', details: 'Hückel rule (4n+2) pi-electrons, non-aromatic, and anti-aromatic systems' },
        { id: 'ja-chem-22-2', name: 'Stereoisomerism (Enantiomers, Diastereomers, Meso)', details: 'Optical isomerism for up to 2 asymmetric centres (R/S and E/Z excluded), plane of symmetry, meso forms', isHighYield: true },
        { id: 'ja-chem-22-3', name: 'Electronic Effects & Acidity/Basicity', details: 'Inductive, resonance/mesomeric, hyperconjugative effects, relative acid-base strengths' },
        { id: 'ja-chem-22-4', name: 'Reactive Intermediates', details: 'Formation, structure, stability of carbocations, carbanions, and carbon free radicals' },
      ],
    },
    {
      id: 'ja-chem-u23',
      unitNumber: 23,
      name: 'Alkanes',
      slug: 'alkanes',
      category: 'Organic',
      weightagePercent: 2,
      description: 'Newman conformations of ethane and butane, free-radical halogenation, allylic and benzylic halogenation.',
      topics: [
        { id: 'ja-chem-23-1', name: 'Conformations of Ethane and Butane', details: 'Newman projections, staggered, eclipsed, gauche conformations and torsional strain energy' },
        { id: 'ja-chem-23-2', name: 'Reactions of Alkanes', details: 'Free radical halogenation mechanism, allylic and benzylic halogenation (NBS, Cl2/hv)' },
      ],
    },
    {
      id: 'ja-chem-u24',
      unitNumber: 24,
      name: 'Alkenes and Alkynes',
      slug: 'alkenes-and-alkynes',
      category: 'Organic',
      weightagePercent: 4,
      description: 'Elimination reactions, electrophilic addition (Markovnikov & anti-Markovnikov peroxide effect), ozonolysis, metal acetylides, cyclic polymerization.',
      topics: [
        { id: 'ja-chem-24-1', name: 'Preparation by Elimination Reactions', details: 'Dehydrohalogenation of alkyl halides (E1, E2) and acid-catalysed dehydration of alcohols' },
        { id: 'ja-chem-24-2', name: 'Electrophilic Addition Reactions', details: 'Addition of X2, HX, HOX, Markovnikov rule, Kharasch peroxide effect mechanism', isHighYield: true },
        { id: 'ja-chem-24-3', name: 'Oxidation & Ozonolysis Reactions', details: 'Reaction with cold/hot alkaline KMnO4 (Baeyer test), reductive and oxidative ozonolysis' },
        { id: 'ja-chem-24-4', name: 'Alkynes Chemistry', details: 'Acidity of terminal alkynes, metal acetylides (Na, Cu, Ag), cyclic trimerization to benzene' },
      ],
    },
    {
      id: 'ja-chem-u25',
      unitNumber: 25,
      name: 'Benzene',
      slug: 'benzene',
      category: 'Organic',
      weightagePercent: 3,
      description: 'Aromatic electrophilic substitution (nitration, sulphonation, halogenation, Friedel-Crafts alkylation & acylation), directing effects.',
      topics: [
        { id: 'ja-chem-25-1', name: 'Electrophilic Aromatic Substitution (EAS) Mechanism', details: 'Arenium ion (sigma complex) intermediate, energy profiles' },
        { id: 'ja-chem-25-2', name: 'Standard EAS Reactions', details: 'Halogenation (FeX3), nitration (HNO3/H2SO4), sulphonation (oleum), Friedel-Crafts alkylation and acylation', isHighYield: true },
        { id: 'ja-chem-25-3', name: 'Directing Effects of Substituents', details: 'Activating ortho/para directors vs deactivating meta directors in monosubstituted benzene' },
      ],
    },
    {
      id: 'ja-chem-u26',
      unitNumber: 26,
      name: 'Phenols',
      slug: 'phenols',
      category: 'Organic',
      weightagePercent: 4,
      description: 'Acidity of phenols, Reimer-Tiemann, Kolbe-Schmitt reaction, aspirin synthesis, esterification, and oxidation/reduction.',
      topics: [
        { id: 'ja-chem-26-1', name: 'Preparation & Acidic Character of Phenols', details: 'Cumene process, resonance stabilization of phenoxide ion, substituent effects on pKa' },
        { id: 'ja-chem-26-2', name: 'Reimer-Tiemann & Kolbe Reactions', details: 'Salicylaldehyde formation via dichlorocarbene intermediate; salicylic acid synthesis', isHighYield: true },
        { id: 'ja-chem-26-3', name: 'Aspirin Synthesis & Oxidation/Reduction', details: 'Acetylation with acetic anhydride; reduction with zinc dust to benzene, oxidation to benzoquinone' },
      ],
    },
    {
      id: 'ja-chem-u27',
      unitNumber: 27,
      name: 'Alkyl Halides',
      slug: 'alkyl-halides',
      category: 'Organic',
      weightagePercent: 4,
      description: 'SN1 and SN2 mechanisms, stereochemical inversion vs racemisation, carbocation rearrangements, Grignard reagents.',
      topics: [
        { id: 'ja-chem-27-1', name: 'Nucleophilic Substitution (SN1 vs SN2)', details: 'Kinetics, stereochemical inversion (Walden) in SN2, racemisation with partial inversion in SN1' },
        { id: 'ja-chem-27-2', name: 'Carbocation Rearrangements', details: 'Hydride shifts, methyl shifts, ring expansion in SN1 and elimination reactions', isHighYield: true },
        { id: 'ja-chem-27-3', name: 'Grignard Reagents Preparation & Reactions', details: 'Organomagnesium halides RMgX, reaction with active hydrogen, carbonyls, esters, epoxides' },
      ],
    },
    {
      id: 'ja-chem-u28',
      unitNumber: 28,
      name: 'Alcohols and Ethers',
      slug: 'alcohols-and-ethers',
      category: 'Organic',
      weightagePercent: 4,
      description: 'Esterification, Lucas test, dehydration to alkenes/ethers, oxidation to aldehydes/ketones/acids, Williamson synthesis, C-O cleavage.',
      topics: [
        { id: 'ja-chem-28-1', name: 'Alcohols Reactions & Lucas Test', details: 'Reactions with Na, PX3, PX5, SOCl2, ZnCl2/conc. HCl (Lucas test 1°/2°/3° distinction)' },
        { id: 'ja-chem-28-2', name: 'Dehydration & Oxidation of Alcohols', details: 'Temperature-dependent acid dehydration to ether (140°C) vs alkene (170°C); PCC, Jones, KMnO4 oxidation' },
        { id: 'ja-chem-28-3', name: 'Williamson Ether Synthesis', details: 'Alkoxide + primary alkyl halide (SN2 mechanism) and limitations with secondary/tertiary halides' },
        { id: 'ja-chem-28-4', name: 'C-O Bond Cleavage in Ethers', details: 'Cleavage with concentrated HI/HBr, oxonium ion formation, unsymmetrical ether cleavage regioselectivity', isHighYield: true },
      ],
    },
    {
      id: 'ja-chem-u29',
      unitNumber: 29,
      name: 'Aldehydes and Ketones',
      slug: 'aldehydes-and-ketones',
      category: 'Organic',
      weightagePercent: 5,
      description: 'Nucleophilic addition, Aldol condensation, Cannizzaro reaction, Haloform reaction, oximes, hydrazones, and Grignard additions.',
      topics: [
        { id: 'ja-chem-29-1', name: 'Preparation of Carbonyl Compounds', details: 'Rosenmund reduction, Stephen reaction, Etard reaction, Gatterman-Koch, ozonolysis' },
        { id: 'ja-chem-29-2', name: 'Nucleophilic Addition Reactions', details: 'Addition of HCN, NaHSO3, Grignard reagents, alcohols (acetals/ketals), ammonia derivatives' },
        { id: 'ja-chem-29-3', name: 'Aldol & Cross-Aldol Condensation', details: 'Enolate ion generation, beta-hydroxy carbonyl formation, dehydration to alpha,beta-unsaturated carbonyls', isHighYield: true },
        { id: 'ja-chem-29-4', name: 'Cannizzaro & Haloform Reactions', details: 'Disproportionation of non-enolizable aldehydes; iodoform test for CH3-C=O and CH3-CH(OH)- groups' },
      ],
    },
    {
      id: 'ja-chem-u30',
      unitNumber: 30,
      name: 'Carboxylic Acids and Derivatives',
      slug: 'carboxylic-acids',
      category: 'Organic',
      weightagePercent: 3,
      description: 'Physical properties, acidic strength, HVZ halogenation, esterification, formation of acid chlorides, amides, and anhydrides.',
      topics: [
        { id: 'ja-chem-30-1', name: 'Preparation & Acidic Strength of Carboxylic Acids', details: 'Hydrolysis of nitriles, amides, Grignard carbonation; electron-withdrawing substituent effect on pKa' },
        { id: 'ja-chem-30-2', name: 'Reactions of Carboxylic Acids & HVZ Reaction', details: 'Hell-Volhard-Zelinsky alpha-halogenation with red P + X2; decarboxylation reactions' },
        { id: 'ja-chem-30-3', name: 'Functional Derivatives of Carboxylic Acids', details: 'Nucleophilic acyl substitution: acid chlorides, esters, amides, anhydrides relative reactivities' },
      ],
    },
    {
      id: 'ja-chem-u31',
      unitNumber: 31,
      name: 'Amines and Haloarenes',
      slug: 'amines-and-haloarenes',
      category: 'Organic',
      weightagePercent: 4,
      description: 'Hoffmann bromamide degradation, Gabriel phthalimide synthesis, Hinsberg test, diazonium salts, Sandmeyer reaction, Wurtz-Fittig, aromatic SN.',
      topics: [
        { id: 'ja-chem-31-1', name: 'Preparation of Amines', details: 'Hoffmann bromamide degradation (nitrene rearrangement), Gabriel phthalimide synthesis of 1° aliphatic amines' },
        { id: 'ja-chem-31-2', name: 'Reactions of Amines & Hinsberg Test', details: 'Benzenesulphonyl chloride test for 1°, 2°, 3° amines; carbylamine test for primary amines' },
        { id: 'ja-chem-31-3', name: 'Diazonium Salts & Sandmeyer Chemistry', details: 'Diazotisation at 0-5°C, Sandmeyer (CuCl, CuBr, CuCN), Gatterman, azo dye coupling reactions', isHighYield: true },
        { id: 'ja-chem-31-4', name: 'Haloarenes & Nucleophilic Aromatic Substitution', details: 'Fittig and Wurtz-Fittig reactions; SNAr addition-elimination in nitro-substituted haloarenes (Meisenheimer complex)' },
      ],
    },
    {
      id: 'ja-chem-u32',
      unitNumber: 32,
      name: 'Biomolecules',
      slug: 'biomolecules',
      category: 'Organic',
      weightagePercent: 3,
      description: 'Carbohydrates (glucose, sucrose, anomers, mutarotation), proteins (peptide linkage, primary/secondary structure), nucleic acids (DNA/RNA).',
      topics: [
        { id: 'ja-chem-32-1', name: 'Carbohydrates: Monosaccharides & Disaccharides', details: 'Glucose, fructose open and cyclic Haworth structures, anomers, mutarotation, sucrose, maltose, lactose hydrolysis' },
        { id: 'ja-chem-32-2', name: 'Proteins & Amino Acids', details: 'Zwitterion, isoelectric point, peptide bond, alpha-helix and beta-pleated sheet secondary structures, denaturation' },
        { id: 'ja-chem-32-3', name: 'Nucleic Acids', details: 'Purine and pyrimidine bases, ribose/deoxyribose sugars, nucleosides, nucleotides, DNA double helix' },
      ],
    },
    {
      id: 'ja-chem-u33',
      unitNumber: 33,
      name: 'Polymers & Chemistry in Everyday Life',
      slug: 'polymers-everyday-life',
      category: 'Organic',
      weightagePercent: 3,
      isRetainedInAdvancedOnly: true,
      description: 'Addition/condensation polymers, natural rubber, nylon, teflon, bakelite, PVC, biodegradable polymers; antacids, analgesics, tranquilizers, soaps/detergents.',
      topics: [
        { id: 'ja-chem-33-1', name: 'Polymer Classification & Types', details: 'Addition and condensation polymerization, copolymers, homopolymers', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-33-2', name: 'Commercial & Biodegradable Polymers', details: 'Natural rubber (vulcanization), Nylon-6,6, Teflon, Bakelite, PVC, PHBV, biodegradable polymers', isHighYield: true, isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-33-3', name: 'Therapeutic Actions & Drugs', details: 'Antacids, antihistamines, analgesics (narcotic and non-narcotic), tranquilizers, antimicrobials, artificial sweeteners', isRetainedInAdvancedOnly: true },
        { id: 'ja-chem-33-4', name: 'Soaps, Detergents & Cleansing Action', details: 'Saponification, anionic, cationic, and non-ionic synthetic detergents, micelle formation mechanism', isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-chem-u34',
      unitNumber: 34,
      name: 'Practical Organic Chemistry',
      slug: 'practical-organic-chemistry',
      category: 'Organic',
      weightagePercent: 3,
      description: 'Lassaigne test for N, S, halogens; chemical detection of functional groups: hydroxyl, carbonyl, carboxyl, amino, and nitro.',
      topics: [
        { id: 'ja-chem-34-1', name: 'Elemental Detection (Lassaigne Extract)', details: 'Sodium fusion extract preparation, Prussian blue test for N, lead acetate test for S, silver nitrate test for halogens' },
        { id: 'ja-chem-34-2', name: 'Functional Group Identification', details: 'Neutral FeCl3 test for phenols, 2,4-DNP and Tollens/Fehling tests for carbonyls, NaHCO3 test for carboxyl, carbylamine for amines' },
      ],
    },
  ],
};

// ============================================================================
// 2. MATHEMATICS SYLLABUS (9 Foundational Modules)
// ============================================================================
export const JEE_ADVANCED_MATHEMATICS_SYLLABUS: SubjectSyllabus = {
  id: 'sub-ja-math',
  name: 'Mathematics',
  slug: 'mathematics',
  totalUnits: 9,
  units: [
    {
      id: 'ja-math-u1',
      unitNumber: 1,
      name: 'Sets, Relations and Functions',
      slug: 'sets-relations-functions',
      category: 'Algebra',
      weightagePercent: 8,
      description: 'Algebra of sets, De Morgans laws, Cartesian products, equivalence relations, invertible functions, and composite mappings.',
      topics: [
        { id: 'ja-math-1-1', name: 'Sets & De Morgan Laws', details: 'Empty, finite, infinite sets, union, intersection, symmetric difference, De Morgan algebraic properties' },
        { id: 'ja-math-1-2', name: 'Cartesian Product & Equivalence Relations', details: 'Ordered pairs, relations, domain, codomain, reflexive, symmetric, and transitive equivalence relations' },
        { id: 'ja-math-1-3', name: 'Function Mappings & Inverse Functions', details: 'One-to-one (injective), onto (surjective), bijective mappings, invertible functions, domain and range' },
        { id: 'ja-math-1-4', name: 'Special Functions & Function Algebra', details: 'Polynomial, trigonometric, exponential, logarithmic, greatest integer [x], fractional part {x}, signum, composition fog(x)', isHighYield: true },
      ],
    },
    {
      id: 'ja-math-u2',
      unitNumber: 2,
      name: 'Algebra',
      slug: 'algebra',
      category: 'Algebra',
      weightagePercent: 14,
      description: 'Complex numbers geometry & roots of unity, quadratic equations, progressions (AP, GP, AGP, infinite series), logarithms, permutations, combinations, and binomial theorem.',
      topics: [
        { id: 'ja-math-2-1', name: 'Complex Numbers & Geometrical Interpretations', details: 'Modulus, argument, polar form, triangle inequalities |z1 + z2| ≤ |z1| + |z2|, cube roots of unity 1, ω, ω²', isHighYield: true },
        { id: 'ja-math-2-2', name: 'Quadratic Equations & Roots Theory', details: 'Fundamental theorem of algebra, symmetric functions of roots, location of roots under varying constraints' },
        { id: 'ja-math-2-3', name: 'Progressions & Series (AP, GP, AGP)', details: 'Arithmetic and geometric means, sums of finite AP/GP, infinite geometric series, sum of first n squares and cubes' },
        { id: 'ja-math-2-4', name: 'Logarithms & Properties', details: 'Logarithmic identities, base change formula, logarithmic equations and inequalities' },
        { id: 'ja-math-2-5', name: 'Permutations and Combinations', details: 'Fundamental principles of counting, circular permutations, division into groups, multinomial arrangements' },
        { id: 'ja-math-2-6', name: 'Binomial Theorem', details: 'Binomial theorem for positive integral index, general and middle terms, properties of binomial coefficients Cr' },
      ],
    },
    {
      id: 'ja-math-u3',
      unitNumber: 3,
      name: 'Matrices and Determinants',
      slug: 'matrices-determinants',
      category: 'Algebra',
      weightagePercent: 10,
      description: 'Matrix algebra, elementary row/column transformations, determinants up to order 3, adjoint, inverse, and system of linear equations.',
      topics: [
        { id: 'ja-math-3-1', name: 'Matrix Operations & Elementary Transformations', details: 'Matrix multiplication properties, transpose, symmetric and skew-symmetric matrices, elementary row operations' },
        { id: 'ja-math-3-2', name: 'Determinants of Order up to 3', details: 'Properties of determinants, minors, cofactors, determinant of product of matrices det(AB) = det(A)det(B)' },
        { id: 'ja-math-3-3', name: 'Adjoint & Inverse of Matrices', details: 'A · adj(A) = |A|I, calculation of A⁻¹ for square matrices of order 2 and 3, orthogonal matrices', isHighYield: true },
        { id: 'ja-math-3-4', name: 'System of Simultaneous Linear Equations', details: "Cramer's rule, matrix method X = A⁻¹B, consistency criteria (unique solution, infinitely many, or inconsistent)" },
      ],
    },
    {
      id: 'ja-math-u4',
      unitNumber: 4,
      name: 'Probability and Statistics',
      slug: 'probability-and-statistics',
      category: 'Algebra',
      weightagePercent: 9,
      description: 'Conditional probability, Bayes theorem, computation using combinations, measures of dispersion (variance and standard deviation), random variables.',
      topics: [
        { id: 'ja-math-4-1', name: 'Sample Space, Events & Probability Rules', details: 'Addition and multiplication rules, independent events, mutually exclusive events' },
        { id: 'ja-math-4-2', name: 'Conditional Probability & Bayes Theorem', details: 'Theorem of total probability, Bayes theorem application to sequential and multi-box sampling problems', isHighYield: true },
        { id: 'ja-math-4-3', name: 'Combinatorial Probability & Random Variables', details: 'Probability evaluation using permutations and combinations, probability distribution, expectation and variance' },
        { id: 'ja-math-4-4', name: 'Statistics & Measures of Dispersion', details: 'Mean, median, mode, mean deviation, standard deviation and variance of grouped/ungrouped data' },
      ],
    },
    {
      id: 'ja-math-u5',
      unitNumber: 5,
      name: 'Trigonometry',
      slug: 'trigonometry',
      category: 'Trigonometry',
      weightagePercent: 6,
      description: 'Trigonometric functions, addition/subtraction identities, multiple/sub-multiple angles, general solutions, and inverse trigonometric functions.',
      topics: [
        { id: 'ja-math-5-1', name: 'Trigonometric Functions & Graphs', details: 'Periodicity, domain, range, standard graphs of sin, cos, tan, sec, csc, cot' },
        { id: 'ja-math-5-2', name: 'Trigonometric Identities & Equations', details: 'Compound angle formulae, transformations of sums into products, general solutions of trigonometric equations' },
        { id: 'ja-math-5-3', name: 'Inverse Trigonometric Functions', details: 'Principal value branches, domain, range, and elementary identities of arcsin, arccos, arctan', isHighYield: true },
      ],
    },
    {
      id: 'ja-math-u6',
      unitNumber: 6,
      name: 'Analytical Geometry (2D and 3D)',
      slug: 'analytical-geometry',
      category: 'Coordinate',
      weightagePercent: 16,
      description: '2D Cartesian coordinates, straight lines, circles, parabola, ellipse, hyperbola; 3D lines, skew lines, shortest distance, planes, and coplanarity.',
      topics: [
        { id: 'ja-math-6-1', name: '2D Coordinates & Straight Lines', details: 'Distance formula, section formula, shift of origin, slope forms, angle between lines, perpendicular distance, concurrency, incentre/circumcentre/orthocentre' },
        { id: 'ja-math-6-2', name: 'Circles & Concurrency', details: 'Standard and general equation of circle, tangents, normals, chord of contact, family of circles through intersection' },
        { id: 'ja-math-6-3', name: 'Conic Sections: Parabola, Ellipse, Hyperbola', details: 'Standard equations, foci, directrices, eccentricity, parametric equations, tangents, normals, director circles, locus problems', isHighYield: true },
        { id: 'ja-math-6-4', name: '3D Lines in Space & Skew Lines', details: 'Direction cosines and direction ratios, symmetrical line equations, shortest distance between skew lines' },
        { id: 'ja-math-6-5', name: '3D Planes & Coplanar Lines', details: 'Equation of plane, distance of point from plane, angle between planes, line-plane intersection, coplanar lines condition' },
      ],
    },
    {
      id: 'ja-math-u7',
      unitNumber: 7,
      name: 'Differential Calculus',
      slug: 'differential-calculus',
      category: 'Calculus',
      weightagePercent: 16,
      description: 'Limits, L Hospital rule, continuity of composite functions, differentiability, Rolles & LMVT theorems, tangents/normals, and maxima/minima.',
      topics: [
        { id: 'ja-math-7-1', name: 'Limits & L Hospital Rule', details: 'Evaluation of indeterminate forms (0/0, ∞/∞, 0·∞, 1^∞), standard limits, L Hospital rule application' },
        { id: 'ja-math-7-2', name: 'Continuity & Intermediate Value Property', details: 'Left-hand and right-hand limits, continuity of composite functions, intermediate value theorem' },
        { id: 'ja-math-7-3', name: 'Differentiability & Mean Value Theorems', details: 'Derivative rules, chain rule, implicit differentiation, derivatives of higher order, Rolles theorem and Lagranges Mean Value Theorem (LMVT)', isHighYield: true },
        { id: 'ja-math-7-4', name: 'Applications of Derivatives', details: 'Tangents and normals, increasing and decreasing functions, concavity, points of inflection, local and global maxima/minima' },
      ],
    },
    {
      id: 'ja-math-u8',
      unitNumber: 8,
      name: 'Integral Calculus',
      slug: 'integral-calculus',
      category: 'Calculus',
      weightagePercent: 15,
      description: 'Indefinite integrals, integration by parts/partial fractions, definite integral as limit of sum, area bounded by curves, and 1st order differential equations.',
      topics: [
        { id: 'ja-math-8-1', name: 'Indefinite Integration Techniques', details: 'Standard integrals, substitution, integration by parts, partial fractions decomposition' },
        { id: 'ja-math-8-2', name: 'Definite Integrals & Properties', details: 'Fundamental theorem of calculus, definite integral as limit of sums, King property, symmetry and periodic properties', isHighYield: true },
        { id: 'ja-math-8-3', name: 'Area Bounded by Curves', details: 'Quadrature between curves, vertical and horizontal strips, area bounded by conics and lines' },
        { id: 'ja-math-8-4', name: 'Differential Equations', details: 'Formation, order and degree, separation of variables, homogeneous differential equations, linear 1st order differential equations dy/dx + Py = Q' },
      ],
    },
    {
      id: 'ja-math-u9',
      unitNumber: 9,
      name: 'Vectors',
      slug: 'vectors',
      category: 'Vectors',
      weightagePercent: 6,
      description: 'Vector algebra, scalar multiplication, dot and cross products, scalar triple product, vector triple product, and geometrical interpretations.',
      topics: [
        { id: 'ja-math-9-1', name: 'Vector Algebra & Linear Combinations', details: 'Position vectors, collinearity and coplanarity of vectors, section formula in vector form' },
        { id: 'ja-math-9-2', name: 'Dot Product & Cross Product', details: 'Scalar product properties, projection of a vector, vector cross product, area of triangle and parallelogram' },
        { id: 'ja-math-9-3', name: 'Scalar Triple Product [a b c]', details: 'Volume of parallelepiped, condition for coplanarity of three vectors [a b c] = 0', isRetainedInAdvancedOnly: true },
        { id: 'ja-math-9-4', name: 'Vector Triple Product a × (b × c)', details: 'Lagrange identity a × (b × c) = (a·c)b - (a·b)c, perpendicularity and geometrical applications', isHighYield: true, isRetainedInAdvancedOnly: true },
      ],
    },
  ],
};

// ============================================================================
// 3. PHYSICS SYLLABUS (7 Foundational Disciplines)
// ============================================================================
export const JEE_ADVANCED_PHYSICS_SYLLABUS: SubjectSyllabus = {
  id: 'sub-ja-phy',
  name: 'Physics',
  slug: 'physics',
  totalUnits: 7,
  units: [
    {
      id: 'ja-phy-u1',
      unitNumber: 1,
      name: 'General Physics & Measurements',
      slug: 'general-physics-measurements',
      category: 'General',
      weightagePercent: 8,
      description: 'Dimensional analysis, error propagation, significant figures, Vernier calipers, screw gauge, simple pendulum, calorimeter, focal lengths, resonance tube, Ohm law, metre bridge, and post office box.',
      topics: [
        { id: 'ja-phy-1-1', name: 'Units, Dimensions & Error Analysis', details: 'Dimensional formulas, error propagation rules for products/powers, significant figures' },
        { id: 'ja-phy-1-2', name: 'Precision Mechanical Instruments', details: 'Least count, zero errors in Vernier calipers and micrometre screw gauge' },
        { id: 'ja-phy-1-3', name: 'Laboratory Mechanics & Fluids Practicals', details: 'Determination of g using simple pendulum, Young modulus by Searle method, surface tension by capillary rise' },
        { id: 'ja-phy-1-4', name: 'Thermal & Acoustic Practicals', details: 'Specific heat of liquids using calorimeter, speed of sound in air using resonance column' },
        { id: 'ja-phy-1-5', name: 'Optical Practicals', details: 'Focal length of concave mirror and convex lens using u-v method, angle of minimum deviation for prism' },
        { id: 'ja-phy-1-6', name: 'Electrical Instruments & Post Office Box', details: 'Verification of Ohm law with voltmeter/ammeter; specific resistance of a wire using metre bridge and Post Office Box', isHighYield: true, isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-phy-u2',
      unitNumber: 2,
      name: 'Mechanics',
      slug: 'mechanics',
      category: 'Mechanics',
      weightagePercent: 30,
      description: 'Kinematics, Newton laws, friction, work-energy, momentum, collisions, rigid body dynamics, rolling without slipping, damped/forced oscillations, gravitation, fluids, surface tension, viscosity, and sound Doppler effect.',
      topics: [
        { id: 'ja-phy-2-1', name: 'Kinematics in 1D & 2D', details: 'Projectiles, uniform circular motion, relative velocity in 2D Cartesian coordinates' },
        { id: 'ja-phy-2-2', name: "Newton Laws, Friction & Work-Energy", details: 'Inertial and accelerated frames, static and dynamic friction, work-energy theorem, conservation of linear momentum and mechanical energy' },
        { id: 'ja-phy-2-3', name: 'Center of Mass & Collisions', details: 'Motion of center of mass, impulse, elastic and inelastic 1D/2D collisions, variable mass' },
        { id: 'ja-phy-2-4', name: 'Rigid Body Dynamics & Rotation', details: 'Moment of inertia, parallel and perpendicular axis theorems, angular momentum conservation, fixed-axis rotation, collision of point mass with rigid body', isHighYield: true },
        { id: 'ja-phy-2-5', name: 'Rolling Motion Without Slipping', details: 'Rolling of rings, cylinders, and spheres on inclined planes, friction in rolling, equilibrium of rigid bodies', isHighYield: true },
        { id: 'ja-phy-2-6', name: 'Simple Harmonic Motion & Oscillations', details: 'Linear and angular SHM, time periods of springs and physical pendulums, energy in SHM' },
        { id: 'ja-phy-2-7', name: 'Forced & Damped Oscillations, Resonance', details: 'Damping force F = -bv, damped oscillation differential equation, amplitude decay, steady-state forced oscillation, resonance sharpness', isHighYield: true, isRetainedInAdvancedOnly: true },
        { id: 'ja-phy-2-8', name: 'Gravitation & Orbital Dynamics', details: 'Gravitational potential and field, acceleration due to gravity g(h, d), Kepler laws, geostationary orbits, escape velocity' },
        { id: 'ja-phy-2-9', name: 'Fluid Statics & Dynamics', details: 'Pascal law, buoyancy, streamline flow, equation of continuity, Bernoulli theorem and applications, Stokes law and terminal velocity' },
        { id: 'ja-phy-2-10', name: 'Surface Tension & Viscosity', details: 'Surface energy, angle of contact, excess pressure in drops/bubbles, capillary rise, modulus of rigidity, bulk modulus' },
        { id: 'ja-phy-2-11', name: 'Wave Motion, Stationary Waves & Doppler Effect', details: 'Vibrations of strings and air columns, organ pipes, resonance, beats, speed of sound in gases, Doppler effect in sound', isHighYield: true, isRetainedInAdvancedOnly: true },
      ],
    },
    {
      id: 'ja-phy-u3',
      unitNumber: 3,
      name: 'Thermal Physics',
      slug: 'thermal-physics',
      category: 'Thermal',
      weightagePercent: 12,
      description: 'Thermal expansion, calorimetry, heat conduction in 1D, Newtons law of cooling, ideal gas Cp/Cv, isothermal/adiabatic processes, Carnot engine & efficiency, and blackbody radiation.',
      topics: [
        { id: 'ja-phy-3-1', name: 'Calorimetry & 1D Conduction', details: 'Thermal expansion of solids/liquids/gases, latent heat, heat conduction dQ/dt = -kA(dT/dx), Newtons law of cooling' },
        { id: 'ja-phy-3-2', name: 'First Law of Thermodynamics & Gas Processes', details: 'First law ΔQ = ΔU + W, specific heats Cp and Cv, isothermal, adiabatic PV^γ = const, isobaric, and isochoric cycles' },
        { id: 'ja-phy-3-3', name: 'Second Law of Thermodynamics & Carnot Engine', details: 'Reversible and irreversible processes, Carnot engine cycle, efficiency η = 1 - T2/T1, Carnot theorem', isHighYield: true, isRetainedInAdvancedOnly: true },
        { id: 'ja-phy-3-4', name: 'Blackbody Radiation & Radiation Laws', details: 'Absorptive and emissive powers, Kirchhoff law, Wiens displacement law λm·T = b, Stefan-Boltzmann law E = σT⁴' },
      ],
    },
    {
      id: 'ja-phy-u4',
      unitNumber: 4,
      name: 'Electricity and Magnetism',
      slug: 'electricity-and-magnetism',
      category: 'Electromagnetism',
      weightagePercent: 26,
      description: 'Coulomb law, Gauss law, potential energy, capacitors with dielectrics, Kirchhoff laws, Biot-Savart, Ampere law, moving coil galvanometer, EMI, Faraday/Lenz laws, and RC, LR, LC, LCR circuits with DC/AC.',
      topics: [
        { id: 'ja-phy-4-1', name: 'Electrostatics & Gauss Law', details: 'Coulombs law, electric field and potential of point charges and dipoles, Gauss law applications (wire, plane sheet, spherical shell)' },
        { id: 'ja-phy-4-2', name: 'Capacitance & Dielectrics', details: 'Parallel plate capacitor with/without dielectrics, series/parallel combinations, energy density 1/2 ε0 E², force between plates' },
        { id: 'ja-phy-4-3', name: 'Current Electricity & Circuit Networks', details: 'Ohms law, internal resistance of cells, Kirchhoff laws, heating effect of current, network reduction' },
        { id: 'ja-phy-4-4', name: 'Magnetic Field & Ampere Law', details: 'Biot-Savart law, field of straight wire, circular coil axis, long solenoid, Ampere circuital law' },
        { id: 'ja-phy-4-5', name: 'Magnetic Force & Moving Coil Galvanometer', details: 'Lorentz force q(v×B), force on current-carrying wire, torque on magnetic dipole, galvanometer conversion to ammeter/voltmeter' },
        { id: 'ja-phy-4-6', name: 'Electromagnetic Induction (EMI)', details: 'Faradays law, Lenz law, motional EMF, eddy currents, self and mutual inductance' },
        { id: 'ja-phy-4-7', name: 'Transient & Alternating Current (AC) Circuits', details: 'Growth and decay in RC and LR circuits with DC sources; LC oscillations; series LCR circuits with AC sources, resonance and phasor diagrams', isHighYield: true },
      ],
    },
    {
      id: 'ja-phy-u5',
      unitNumber: 5,
      name: 'Electromagnetic Waves',
      slug: 'electromagnetic-waves',
      category: 'Electromagnetism',
      weightagePercent: 2,
      description: 'Characteristics of electromagnetic waves, transverse nature, speed c = 1/√(μ0ε0), and electromagnetic spectrum uses.',
      topics: [
        { id: 'ja-phy-5-1', name: 'EM Waves Characteristics', details: 'Transverse nature, relation between E and B amplitudes E0/B0 = c, energy density and Poynting vector' },
        { id: 'ja-phy-5-2', name: 'Electromagnetic Spectrum', details: 'Radio, microwave, infrared, visible, ultraviolet, X-rays, gamma rays and their practical applications' },
      ],
    },
    {
      id: 'ja-phy-u6',
      unitNumber: 6,
      name: 'Optics (Ray and Wave)',
      slug: 'optics',
      category: 'Optics',
      weightagePercent: 10,
      description: 'Reflection, refraction, TIR, prism, thin lenses, mirror-lens combinations, Huygens principle, Young double slit, single-slit diffraction, polarization, Brewster law, and Polaroids.',
      topics: [
        { id: 'ja-phy-6-1', name: 'Ray Optics: Reflection, Refraction & TIR', details: 'Plane and spherical surfaces, Snell law, total internal reflection, critical angle, optical fibers' },
        { id: 'ja-phy-6-2', name: 'Prisms & Thin Lenses', details: 'Prism deviation and dispersion, lens makers formula, combinations of mirrors and thin lenses, magnification', isHighYield: true },
        { id: 'ja-phy-6-3', name: 'Wave Optics: Interference & YDSE', details: 'Huygens wavelets, Young double-slit experiment, fringe width β = λD/d, intensity distribution, optical path difference' },
        { id: 'ja-phy-6-4', name: 'Diffraction & Polarization', details: 'Single slit Fraunhofer diffraction, diffraction minima conditions; polarization of light, Brewster law tan(ip) = μ, Malus law and Polaroids' },
      ],
    },
    {
      id: 'ja-phy-u7',
      unitNumber: 7,
      name: 'Modern Physics',
      slug: 'modern-physics',
      category: 'Modern',
      weightagePercent: 12,
      description: 'Photoelectric effect, de Broglie matter waves, Bohr model, X-rays (characteristic and continuous, Moseley law), radioactivity (alpha, beta, gamma decay), binding energy, and nuclear fission/fusion.',
      topics: [
        { id: 'ja-phy-7-1', name: 'Photoelectric Effect & Matter Waves', details: 'Einsteins photoelectric equation, threshold frequency, stopping potential, de Broglie wavelength λ = h/p' },
        { id: 'ja-phy-7-2', name: 'Bohr Model of Hydrogen-like Atoms', details: 'Quantized energy levels, orbital radius, electron velocity, spectral transitions' },
        { id: 'ja-phy-7-3', name: 'X-Rays & Moseley Law', details: 'Production of X-rays, continuous X-ray spectrum and Duane-Hunt limit λmin = hc/eV; characteristic X-rays (Kα, Kβ), Moseley law √ν = a(Z - b)', isHighYield: true, isRetainedInAdvancedOnly: true },
        { id: 'ja-phy-7-4', name: 'Nuclear Physics & Radioactivity', details: 'Law of radioactive decay N = N0 e^(-λt), half-life and mean life, alpha/beta/gamma decays, mass defect, binding energy per nucleon, fission and fusion calculations' },
      ],
    },
  ],
};

// ============================================================================
// 4. RETENTION & COMPARATIVE ARCHITECTURE (ADVANCED VS MAIN/NEET)
// ============================================================================
export const JEE_ADVANCED_EXCLUSIVE_TOPICS: AdvancedExclusiveTopic[] = [
  {
    id: 'excl-1',
    subject: 'Chemistry',
    chapter: 'States of Matter',
    topic: 'Gases, van der Waals Equation & Liquid State',
    significance: 'Tested extensively in Paper 1 and Paper 2 with multi-correct problems on critical constants, compressibility factor Z, and intermolecular forces.',
    whyDroppedInMain: 'Rationalized out of NCERT Class 11 and dropped from JEE Main 2024+ & NEET 2024+ to reduce memorization load.',
  },
  {
    id: 'excl-2',
    subject: 'Chemistry',
    chapter: 'Solid State',
    topic: 'Seven Crystal Systems, Close Packing (fcc, bcc, hcp) & Point Defects',
    significance: 'High-frequency subject for integer/numerical grid questions involving void geometry, density calculations, and Frenkel/Schottky defects.',
    whyDroppedInMain: 'Removed from Class 12 NCERT curriculum and subsequently purged from JEE Main and NEET.',
  },
  {
    id: 'excl-3',
    subject: 'Chemistry',
    chapter: 'Surface Chemistry',
    topic: 'Adsorption, Freundlich Isotherm, Colloids & Surfactants',
    significance: 'Appears in matrix-match lists and multi-statement evaluations regarding lyophobic sols, CMC, and catalyst selectivity.',
    whyDroppedInMain: 'Rationalized out of NCERT Class 12 chemistry.',
  },
  {
    id: 'excl-4',
    subject: 'Chemistry',
    chapter: 'Hydrogen',
    topic: 'Isotopes, Hydrides, Heavy Water (D2O) & Hydrogen Peroxide',
    significance: 'Regularly tested in stoichiometric redox titrations (H2O2 volume strength) and interstitial hydride questions.',
    whyDroppedInMain: 'Omitted from Class 11 rationalized syllabus.',
  },
  {
    id: 'excl-5',
    subject: 'Chemistry',
    chapter: 's-Block Elements',
    topic: 'Alkali & Alkaline Earth Metals, Liquid Ammonia & Commercial Compounds',
    significance: 'Crucial for qualitative reaction sequences involving Na2CO3, caustic soda, quicklime, and plaster of Paris.',
    whyDroppedInMain: 'Omitted from Class 11 rationalized syllabus.',
  },
  {
    id: 'excl-6',
    subject: 'Chemistry',
    chapter: 'Isolation of Metals (Metallurgy)',
    topic: 'Ellingham Diagrams, Blast Furnace, Cyanide Leaching & Refining',
    significance: 'Core thermodynamic extraction questions involving ΔG° vs T curves, self-reduction of Cu/Pb, and zone refining.',
    whyDroppedInMain: 'Eliminated from Class 12 NCERT chapters.',
  },
  {
    id: 'excl-7',
    subject: 'Chemistry',
    chapter: 'Polymers & Everyday Life',
    topic: 'Synthetic/Biodegradable Polymers, Therapeutic Drugs, Soaps & Cleansing',
    significance: 'Direct match and multi-correct questions on Nylon-6,6, Bakelite, PHBV, antacids, and micelle cleansing action.',
    whyDroppedInMain: 'Class 12 chapters 15 and 16 removed in NCERT reduction.',
  },
  {
    id: 'excl-8',
    subject: 'Chemistry',
    chapter: 'Environmental Chemistry',
    topic: 'Photochemical Smog, Stratospheric Ozone Depletion & Green Chemistry',
    significance: 'Tests atmospheric reaction mechanisms (peroxyacetyl nitrate, CFC catalytic breakdown).',
    whyDroppedInMain: 'Rationalized out of Class 11 curriculum.',
  },
  {
    id: 'excl-9',
    subject: 'Physics',
    chapter: 'Oscillations & Waves',
    topic: 'Damped & Forced Oscillations, Resonance',
    significance: 'Mathematical differential equations for damped oscillators and resonance curve sharpness are classic IIT problem archetypes.',
    whyDroppedInMain: 'Dropped from JEE Main mechanics to align with CBSE board reductions.',
  },
  {
    id: 'excl-10',
    subject: 'Physics',
    chapter: 'Thermal Physics',
    topic: 'Second Law of Thermodynamics, Carnot Engine & Efficiency',
    significance: 'Carnot cycles, refrigerator COP, and entropy calculations appear frequently in JEE Advanced multi-correct sections.',
    whyDroppedInMain: 'Carnot heat engines deleted from JEE Main thermal physics.',
  },
  {
    id: 'excl-11',
    subject: 'Physics',
    chapter: 'Acoustics & Waves',
    topic: 'Doppler Effect in Sound',
    significance: 'Appears in complex relative motion problems combining wind drift, reflection from moving walls, and accelerated observers.',
    whyDroppedInMain: 'Excluded from JEE Main waves syllabus.',
  },
  {
    id: 'excl-12',
    subject: 'Physics',
    chapter: 'Modern Physics',
    topic: 'Continuous and Characteristic X-Rays, Moseley Law',
    significance: 'Regular source of numerical value questions on Duane-Hunt cutoff wavelength and Moseley root-frequency plots.',
    whyDroppedInMain: 'Purged from JEE Main modern physics syllabus.',
  },
  {
    id: 'excl-13',
    subject: 'Physics',
    chapter: 'Experimental Physics',
    topic: 'Post Office Box & Metre Bridge Specific Resistance',
    significance: 'Tests resistance bridge balancing and error percentage in Wheatstone bridge arms.',
    whyDroppedInMain: 'Post Office Box omitted from JEE Main practical list.',
  },
  {
    id: 'excl-14',
    subject: 'Mathematics',
    chapter: 'Vectors',
    topic: 'Scalar and Vector Triple Products [a b c] & a × (b × c)',
    significance: 'Fundamental in 3D geometry locus problems, volume of parallelepipeds, and vector component decomposition.',
    whyDroppedInMain: 'Vector triple products removed from JEE Main mathematics syllabus.',
  },
];

// ============================================================================
// 5. MASTER BLUEPRINT & OVERVIEW
// ============================================================================
export const JEE_ADVANCED_SYLLABUS_OVERVIEW = {
  examName: 'Joint Entrance Examination (Advanced)',
  governingBody: 'Joint Admission Board (JAB) / Organizing Indian Institute of Technology',
  academicSession: '2026 - 2027 (Same syllabus as 2025)',
  totalSubjects: 3,
  totalUnits: {
    chemistry: 34,
    mathematics: 9,
    physics: 7,
    overall: 50,
  },
  pattern: {
    structure: 'Two mandatory papers on the same day: Paper 1 (09:00 - 12:00) & Paper 2 (14:30 - 17:30)',
    totalDurationMinutes: 360,
    sectionsPerSubject: ['Single Correct Choice', 'One or More than One Correct (Partial Marking)', 'Non-Negative Numerical Values', 'Paragraph / Stem Comprehension', 'Matrix Match List Matching'],
    markingRules: {
      singleCorrect: '+3 for correct, -1 for incorrect, 0 if unattempted',
      multiCorrect: '+4 if all correct options chosen; +3/+2/+1 for partial correct subsets without wrong choices; -2 if ANY incorrect option is marked',
      numerical: '+4 for exact numerical / decimal value, 0 for incorrect or unattempted',
    },
  },
  strategicInsights: [
    {
      title: 'No Syllabus Rationalization',
      detail: 'Unlike JEE Main and NEET which reduced their syllabi by ~25%, JEE Advanced maintains the full classical IIT-JEE curriculum including Solid State, Metallurgy, Carnot Engine, and X-Rays.',
    },
    {
      title: 'Partial Marking Optimization',
      detail: 'In multi-correct questions, marking an unsure option costs -2 marks. Knowing when to bank +1 or +2 partial points rather than gambling for +4 is the single biggest percentile differentiator.',
    },
    {
      title: 'Inter-Disciplinary Concepts',
      detail: 'JEE Advanced questions routinely link concepts across domains—e.g. Thermodynamics linked with Chemical Equilibrium, or Mechanics linked with Electromagnetic Induction.',
    },
  ],
};
