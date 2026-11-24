/**
 * Master Official JEE Main 2027 Syllabus Data
 * Extracted directly from the official NTA JEE (Main) - 2027 Information Bulletin
 * Covers Paper 1 (B.E./B.Tech.), Paper 2A (B.Arch.), and Paper 2B (B.Planning).
 */

export interface SyllabusTopic {
  id: string;
  name: string;
  details?: string;
  isHighYield?: boolean;
}

export interface SyllabusChapterOrUnit {
  id: string;
  unitNumber: number;
  name: string;
  slug: string;
  category?: 'Physical' | 'Inorganic' | 'Organic' | 'General';
  weightagePercent: number;
  description: string;
  topics: SyllabusTopic[];
}

export interface SubjectSyllabus {
  id: string;
  name: string;
  slug: string;
  totalUnits: number;
  units: SyllabusChapterOrUnit[];
}

export interface Paper2Module {
  id: string;
  paperType: '2A-BArch' | '2B-BPlanning';
  partNumber: string;
  title: string;
  units: {
    unitNumber: number;
    title: string;
    details: string[];
  }[];
}

export const JEE_MAIN_MATHEMATICS_SYLLABUS: SubjectSyllabus = {
  id: 'sub-jm-math',
  name: 'Mathematics',
  slug: 'mathematics',
  totalUnits: 14,
  units: [
    {
      id: 'math-u1',
      unitNumber: 1,
      name: 'Sets, Relations and Functions',
      slug: 'sets-relations-functions',
      weightagePercent: 7,
      description: 'Foundational algebra of sets, relation types, and function mappings.',
      topics: [
        { id: 'math-1-1', name: 'Sets and their representation', details: 'Union, intersection, complement and their algebraic properties' },
        { id: 'math-1-2', name: 'Power set', details: 'Subsets and power set properties' },
        { id: 'math-1-3', name: 'Relations and Equivalence', details: 'Types of relations, equivalence relations' },
        { id: 'math-1-4', name: 'Functions', details: 'One-one, into, and onto functions, composite functions' },
      ],
    },
    {
      id: 'math-u2',
      unitNumber: 2,
      name: 'Complex Numbers and Quadratic Equations',
      slug: 'complex-numbers-quadratic-equations',
      weightagePercent: 8,
      description: 'Algebra of complex numbers, Argand plane, and quadratic equation root analysis.',
      topics: [
        { id: 'math-2-1', name: 'Complex Numbers Representation', details: 'Ordered pairs of reals, representation in a + ib form, Argand diagram' },
        { id: 'math-2-2', name: 'Modulus and Argument', details: 'Algebra of complex numbers, modulus and argument (amplitude)' },
        { id: 'math-2-3', name: 'Quadratic Equations in Real and Complex Systems', details: 'Solutions, relation between roots and coefficients' },
        { id: 'math-2-4', name: 'Nature and Formation of Roots', details: 'Discriminant, nature of roots, forming equations with given roots' },
      ],
    },
    {
      id: 'math-u3',
      unitNumber: 3,
      name: 'Matrices and Determinants',
      slug: 'matrices-determinants',
      weightagePercent: 9,
      description: 'Matrix algebra, determinant properties, adjoint, inverse, and system of linear equations.',
      topics: [
        { id: 'math-3-1', name: 'Matrices and Matrix Algebra', details: 'Types of matrices, operations and algebra of order 2 and 3' },
        { id: 'math-3-2', name: 'Evaluation of Determinants', details: 'Determinants of order 2 and 3, area of triangles using determinants' },
        { id: 'math-3-3', name: 'Adjoint and Inverse of a Square Matrix', details: 'Computation, singular/non-singular properties' },
        { id: 'math-3-4', name: 'Simultaneous Linear Equations', details: 'Test of consistency and solution in 2 or 3 variables using matrices' },
      ],
    },
    {
      id: 'math-u4',
      unitNumber: 4,
      name: 'Permutations and Combinations',
      slug: 'permutations-combinations',
      weightagePercent: 6,
      description: 'Counting principles, permutations, combinations, and constrained arrangements.',
      topics: [
        { id: 'math-4-1', name: 'Fundamental Principle of Counting', details: 'Multiplication and addition rules' },
        { id: 'math-4-2', name: 'Permutations and Combinations [P(n,r) and C(n,r)]', details: 'Meaning, formulas, and simple practical applications' },
      ],
    },
    {
      id: 'math-u5',
      unitNumber: 5,
      name: 'Binomial Theorem and Its Simple Applications',
      slug: 'binomial-theorem',
      weightagePercent: 6,
      description: 'Expansion for positive integral index, general term, middle term, and coefficients.',
      topics: [
        { id: 'math-5-1', name: 'Binomial Theorem for Positive Integral Index', details: 'Expansion, properties of coefficients' },
        { id: 'math-5-2', name: 'General Term and Middle Term', details: 'Formulas and determination of specific terms in expansions' },
      ],
    },
    {
      id: 'math-u6',
      unitNumber: 6,
      name: 'Sequence and Series',
      slug: 'sequence-series',
      weightagePercent: 7,
      description: 'Arithmetic and geometric progressions, means, and AM-GM inequality.',
      topics: [
        { id: 'math-6-1', name: 'Arithmetic Progression (A.P.)', details: 'General term, sum of n terms, insertion of arithmetic means' },
        { id: 'math-6-2', name: 'Geometric Progression (G.P.)', details: 'General term, sum of finite/infinite G.P., geometric means' },
        { id: 'math-6-3', name: 'Relation between A.M. and G.M.', details: 'Inequality and applications to extreme values' },
      ],
    },
    {
      id: 'math-u7',
      unitNumber: 7,
      name: 'Limit, Continuity and Differentiability',
      slug: 'limit-continuity-differentiability',
      weightagePercent: 12,
      description: 'Differential calculus, limit evaluations, continuity, derivatives, and applications (AOD).',
      topics: [
        { id: 'math-7-1', name: 'Real-Valued Functions and Graphs', details: 'Polynomial, rational, trigonometric, logarithmic, exponential, and inverse functions' },
        { id: 'math-7-2', name: 'Limits and Continuity', details: 'Evaluation of limits, standard limits, continuity at a point and in intervals' },
        { id: 'math-7-3', name: 'Differentiation Rules', details: 'Product, quotient, chain rule, implicit and composite differentiation, 2nd order derivatives' },
        { id: 'math-7-4', name: 'Applications of Derivatives (AOD)', details: 'Rate of change, monotonic increasing/decreasing, maxima and minima of one variable' },
      ],
    },
    {
      id: 'math-u8',
      unitNumber: 8,
      name: 'Integral Calculus',
      slug: 'integral-calculus',
      weightagePercent: 12,
      description: 'Indefinite integrals, 10 standard evaluation forms, definite integrals, and area under curves.',
      topics: [
        { id: 'math-8-1', name: 'Fundamental Integrals', details: 'Algebraic, trigonometric, exponential, and logarithmic functions' },
        { id: 'math-8-2', name: 'Integration Techniques', details: 'Substitution, by parts, partial fractions, trigonometric identities' },
        { id: 'math-8-3', name: 'Standard Integral Forms', details: '1/(x²±a²), 1/√(x²±a²), 1/(a²-x²), 1/√(a²-x²), 1/(ax²+bx+c), (px+q)/(ax²+bx+c), √(a²±x²), √(x²-a²)' },
        { id: 'math-8-4', name: 'Definite Integrals and Area under Curves', details: 'Fundamental theorem of calculus, properties, area bounded by simple standard curves' },
      ],
    },
    {
      id: 'math-u9',
      unitNumber: 9,
      name: 'Differential Equations',
      slug: 'differential-equations',
      weightagePercent: 7,
      description: 'Order and degree, variable separable, homogeneous, and first order linear differential equations.',
      topics: [
        { id: 'math-9-1', name: 'Order and Degree of ODEs', details: 'Identification and formulation' },
        { id: 'math-9-2', name: 'Separation of Variables', details: 'General and particular solutions' },
        { id: 'math-9-3', name: 'Homogeneous Differential Equations', details: 'Substitution method y = vx' },
        { id: 'math-9-4', name: 'Linear Differential Equations', details: 'Equations of the type dy/dx + p(x)y = q(x) using integrating factors' },
      ],
    },
    {
      id: 'math-u10',
      unitNumber: 10,
      name: 'Co-ordinate Geometry',
      slug: 'coordinate-geometry',
      weightagePercent: 11,
      description: 'Cartesian systems, straight lines, circles, and standard conic sections (parabola, ellipse, hyperbola).',
      topics: [
        { id: 'math-10-1', name: '2D Cartesian Coordinate System', details: 'Distance, section formula, locus, slopes, parallel and perpendicular lines, intercepts' },
        { id: 'math-10-2', name: 'Straight Lines', details: 'Equations of a line, intersection, angle between lines, concurrence, distance of a point, centroid, orthocentre, circumcentre' },
        { id: 'math-10-3', name: 'Circles', details: 'Standard form, general equation, centre and radius, diameter endpoints form, line-circle intersections' },
        { id: 'math-10-4', name: 'Conic Sections', details: 'Sections of conics, standard forms of Parabola, Ellipse, and Hyperbola' },
      ],
    },
    {
      id: 'math-u11',
      unitNumber: 11,
      name: 'Three Dimensional Geometry',
      slug: 'three-dimensional-geometry',
      weightagePercent: 8,
      description: 'Direction ratios/cosines, equation of straight line in 3D, skew lines, and shortest distance.',
      topics: [
        { id: 'math-11-1', name: 'Coordinates in 3D Space', details: 'Distance between two points, section formula in 3D' },
        { id: 'math-11-2', name: 'Direction Cosines and Direction Ratios', details: 'Angle between two intersecting lines' },
        { id: 'math-11-3', name: 'Equation of a Line in 3D Space', details: 'Vector and Cartesian equations' },
        { id: 'math-11-4', name: 'Skew Lines and Shortest Distance', details: 'Shortest distance formula and vector equation between lines' },
      ],
    },
    {
      id: 'math-u12',
      unitNumber: 12,
      name: 'Vector Algebra',
      slug: 'vector-algebra',
      weightagePercent: 7,
      description: 'Vectors, scalar components in 2D and 3D, scalar dot product, and vector cross product.',
      topics: [
        { id: 'math-12-1', name: 'Vectors and Scalars', details: 'Addition of vectors, position vectors' },
        { id: 'math-12-2', name: 'Components of Vectors', details: 'Resolution in 2D and 3D coordinate frames' },
        { id: 'math-12-3', name: 'Scalar and Vector Products', details: 'Dot product, cross product, projection, and geometrical applications' },
      ],
    },
    {
      id: 'math-u13',
      unitNumber: 13,
      name: 'Statistics and Probability',
      slug: 'statistics-probability',
      weightagePercent: 8,
      description: 'Measures of dispersion, standard deviation, variance, probability theorems, and Baye’s theorem.',
      topics: [
        { id: 'math-13-1', name: 'Measures of Dispersion', details: 'Mean, median, mode, mean deviation for grouped and ungrouped data' },
        { id: 'math-13-2', name: 'Variance and Standard Deviation', details: 'Calculation for grouped and ungrouped distributions' },
        { id: 'math-13-3', name: 'Probability of an Event', details: 'Addition and multiplication theorems of probability' },
        { id: 'math-13-4', name: 'Baye’s Theorem & Probability Distributions', details: 'Conditional probability, Baye’s theorem, random variables' },
      ],
    },
    {
      id: 'math-u14',
      unitNumber: 14,
      name: 'Trigonometry',
      slug: 'trigonometry',
      weightagePercent: 6,
      description: 'Trigonometric identities, functions, and inverse trigonometric functions and properties.',
      topics: [
        { id: 'math-14-1', name: 'Trigonometrical Identities & Functions', details: 'Compound angles, multiple and sub-multiple angle identities' },
        { id: 'math-14-2', name: 'Inverse Trigonometrical Functions', details: 'Domain, range, principal values, and key algebraic properties' },
      ],
    },
  ],
};

export const JEE_MAIN_PHYSICS_SYLLABUS: SubjectSyllabus = {
  id: 'sub-jm-phy',
  name: 'Physics',
  slug: 'physics',
  totalUnits: 20,
  units: [
    {
      id: 'phy-u1',
      unitNumber: 1,
      name: 'Units and Measurements',
      slug: 'units-and-measurements',
      weightagePercent: 4,
      description: 'SI units, dimensions, least count, error propagation, and significant figures.',
      topics: [
        { id: 'phy-1-1', name: 'Units of Measurement & SI System', details: 'Fundamental and derived units' },
        { id: 'phy-1-2', name: 'Errors in Measurement', details: 'Least count, significant figures, absolute, relative, and percentage errors' },
        { id: 'phy-1-3', name: 'Dimensions & Dimensional Analysis', details: 'Dimensional formulas and applications in formula verification' },
      ],
    },
    {
      id: 'phy-u2',
      unitNumber: 2,
      name: 'Kinematics',
      slug: 'kinematics',
      weightagePercent: 6,
      description: '1D motion, graph analysis, relative velocity, 2D projectile motion, and uniform circular motion.',
      topics: [
        { id: 'phy-2-1', name: 'Motion in a Straight Line', details: 'Frame of reference, speed, velocity, uniform/non-uniform motion' },
        { id: 'phy-2-2', name: 'Graphs & Accelerated Motion', details: 'v-t and x-t graphs, equations for uniformly accelerated motion, relative velocity' },
        { id: 'phy-2-3', name: 'Motion in a Plane', details: 'Projectile motion trajectory, range, maximum height, uniform circular motion' },
      ],
    },
    {
      id: 'phy-u3',
      unitNumber: 3,
      name: 'Laws of Motion',
      slug: 'laws-of-motion',
      weightagePercent: 6,
      description: 'Newton’s laws, momentum conservation, friction, and circular dynamics on banked roads.',
      topics: [
        { id: 'phy-3-1', name: 'Newton’s Laws of Motion', details: 'Force, inertia, momentum, impulse, 1st, 2nd, and 3rd laws' },
        { id: 'phy-3-2', name: 'Conservation of Linear Momentum', details: 'Equilibrium of concurrent forces, applications' },
        { id: 'phy-3-3', name: 'Friction', details: 'Static and kinetic friction, laws of friction, rolling friction' },
        { id: 'phy-3-4', name: 'Dynamics of Circular Motion', details: 'Centripetal force, vehicles on level and banked circular roads' },
      ],
    },
    {
      id: 'phy-u4',
      unitNumber: 4,
      name: 'Work, Energy and Power',
      slug: 'work-energy-power',
      weightagePercent: 5,
      description: 'Work-energy theorem, potential energy of springs, vertical circle, and collisions.',
      topics: [
        { id: 'phy-4-1', name: 'Work Done by Constant & Variable Forces', details: 'Kinetic and potential energies, work-energy theorem, power' },
        { id: 'phy-4-2', name: 'Conservation of Mechanical Energy', details: 'Spring potential energy, conservative and non-conservative forces' },
        { id: 'phy-4-3', name: 'Motion in a Vertical Circle', details: 'Tension, minimum velocity for complete loop' },
        { id: 'phy-4-4', name: 'Collisions in 1D & 2D', details: 'Elastic and inelastic collisions, coefficient of restitution' },
      ],
    },
    {
      id: 'phy-u5',
      unitNumber: 5,
      name: 'Rotational Motion',
      slug: 'rotational-motion',
      weightagePercent: 7,
      description: 'Centre of mass, torque, angular momentum, moment of inertia, parallel/perpendicular axes theorems.',
      topics: [
        { id: 'phy-5-1', name: 'Centre of Mass', details: 'Two-particle system, rigid bodies' },
        { id: 'phy-5-2', name: 'Torque & Angular Momentum', details: 'Moment of force, conservation of angular momentum' },
        { id: 'phy-5-3', name: 'Moment of Inertia', details: 'Radius of gyration, values for simple geometrical objects' },
        { id: 'phy-5-4', name: 'Parallel & Perpendicular Axes Theorems', details: 'Applications, equations of rotational motion, comparison with linear motion' },
      ],
    },
    {
      id: 'phy-u6',
      unitNumber: 6,
      name: 'Gravitation',
      slug: 'gravitation',
      weightagePercent: 5,
      description: 'Universal gravitation, variation of g, Kepler’s laws, gravitational potential, orbital & escape velocities.',
      topics: [
        { id: 'phy-6-1', name: 'Universal Law of Gravitation & Acceleration g', details: 'Variation of g with altitude and depth' },
        { id: 'phy-6-2', name: 'Kepler’s Laws of Planetary Motion', details: 'Law of orbits, areas, and periods' },
        { id: 'phy-6-3', name: 'Gravitational Potential Energy & Potential', details: 'Calculation for spherical shells and solid masses' },
        { id: 'phy-6-4', name: 'Satellites & Escape Velocity', details: 'Orbital velocity, time period, total mechanical energy, escape speed' },
      ],
    },
    {
      id: 'phy-u7',
      unitNumber: 7,
      name: 'Properties of Solids and Liquids',
      slug: 'properties-solids-liquids',
      weightagePercent: 6,
      description: 'Elasticity, fluid pressure, Bernoulli’s theorem, surface tension, viscosity, calorimetry, and heat transfer.',
      topics: [
        { id: 'phy-7-1', name: 'Elastic Behaviour of Solids', details: 'Stress-strain curve, Hooke’s law, Young’s, bulk, and shear modulus' },
        { id: 'phy-7-2', name: 'Fluid Statics & Dynamics', details: 'Pascal’s law, Stoke’s law, terminal velocity, streamline/turbulent flow, Bernoulli’s equation' },
        { id: 'phy-7-3', name: 'Surface Tension', details: 'Surface energy, angle of contact, excess pressure, capillary rise' },
        { id: 'phy-7-4', name: 'Thermal Properties & Calorimetry', details: 'Thermal expansion, specific heat capacity, latent heat, heat transfer (conduction, convection, radiation)' },
      ],
    },
    {
      id: 'phy-u8',
      unitNumber: 8,
      name: 'Thermodynamics',
      slug: 'physics-thermodynamics',
      weightagePercent: 6,
      description: 'Zeroth, First, and Second laws of thermodynamics, isothermal, adiabatic, reversible/irreversible processes.',
      topics: [
        { id: 'phy-8-1', name: 'Thermal Equilibrium & Zeroth Law', details: 'Concept of temperature' },
        { id: 'phy-8-2', name: 'First Law of Thermodynamics', details: 'Work, heat, internal energy, isothermal and adiabatic processes' },
        { id: 'phy-8-3', name: 'Second Law of Thermodynamics', details: 'Reversible and irreversible processes' },
      ],
    },
    {
      id: 'phy-u9',
      unitNumber: 9,
      name: 'Kinetic Theory of Gases',
      slug: 'kinetic-theory-of-gases',
      weightagePercent: 4,
      description: 'Ideal gas law, pressure equation, RMS speed, degrees of freedom, equipartition of energy, mean free path.',
      topics: [
        { id: 'phy-9-1', name: 'Equation of State & Pressure of Gas', details: 'Kinetic theory assumptions, molecular interpretation of temperature' },
        { id: 'phy-9-2', name: 'RMS Speed & Gas Molecular Speeds', details: 'Kinetic energy relations' },
        { id: 'phy-9-3', name: 'Degrees of Freedom & Equipartition Law', details: 'Specific heat capacities of mono, di, and polyatomic gases' },
        { id: 'phy-9-4', name: 'Mean Free Path & Avogadro’s Number', details: 'Collision cross section and formula' },
      ],
    },
    {
      id: 'phy-u10',
      unitNumber: 10,
      name: 'Oscillations and Waves',
      slug: 'oscillations-waves',
      weightagePercent: 6,
      description: 'SHM equation, spring-mass system, simple pendulum, wave motion, standing waves, organ pipes, beats.',
      topics: [
        { id: 'phy-10-1', name: 'Simple Harmonic Motion (S.H.M.)', details: 'Equation of motion, phase, kinetic and potential energies' },
        { id: 'phy-10-2', name: 'Spring Oscillations & Simple Pendulum', details: 'Restoring force constant, derivation of time period' },
        { id: 'phy-10-3', name: 'Wave Motion & Progressive Waves', details: 'Transverse/longitudinal, speed of wave, superposition principle' },
        { id: 'phy-10-4', name: 'Standing Waves, Organ Pipes & Beats', details: 'Strings, closed and open organ pipes, harmonics, beat frequency' },
      ],
    },
    {
      id: 'phy-u11',
      unitNumber: 11,
      name: 'Electrostatics',
      slug: 'electrostatics',
      weightagePercent: 8,
      description: 'Coulomb’s law, Gauss’s law applications, electric potential, capacitors, dielectrics, and energy stored.',
      topics: [
        { id: 'phy-11-1', name: 'Electric Charge & Coulomb’s Law', details: 'Superposition, continuous charge distributions' },
        { id: 'phy-11-2', name: 'Electric Field & Gauss’s Law', details: 'Field lines, dipole torque, Gauss flux for wire, sheet, and spherical shell' },
        { id: 'phy-11-3', name: 'Electric Potential & Potential Energy', details: 'Equipotential surfaces, dipole potential energy' },
        { id: 'phy-11-4', name: 'Capacitance & Dielectrics', details: 'Parallel plate capacitor, series/parallel combinations, dielectric effect, stored energy' },
      ],
    },
    {
      id: 'phy-u12',
      unitNumber: 12,
      name: 'Current Electricity',
      slug: 'current-electricity',
      weightagePercent: 7,
      description: 'Drift velocity, Ohm’s law, temperature dependence, internal resistance, Kirchhoff’s laws, Wheatstone/Metre bridge.',
      topics: [
        { id: 'phy-12-1', name: 'Electric Current & Drift Velocity', details: 'Mobility, Ohm’s law, resistivity, temperature dependence' },
        { id: 'phy-12-2', name: 'Combinations of Resistors & Cells', details: 'Series/parallel, EMF, internal resistance, terminal potential' },
        { id: 'phy-12-3', name: 'Kirchhoff’s Laws & Applications', details: 'Junction and loop rules, Wheatstone bridge, Metre bridge' },
      ],
    },
    {
      id: 'phy-u13',
      unitNumber: 13,
      name: 'Magnetic Effects of Current and Magnetism',
      slug: 'magnetic-effects-current-magnetism',
      weightagePercent: 7,
      description: 'Biot-Savart law, Ampere’s law, moving coil galvanometer, magnetic dipoles, and dia/para/ferromagnetism.',
      topics: [
        { id: 'phy-13-1', name: 'Biot-Savart Law & Ampere’s Law', details: 'Circular loop, straight wire, long solenoid' },
        { id: 'phy-13-2', name: 'Force on Charges & Conductors', details: 'Lorentz force, force between parallel currents (ampere definition)' },
        { id: 'phy-13-3', name: 'Moving Coil Galvanometer', details: 'Torque on loop, sensitivity, conversion to ammeter/voltmeter' },
        { id: 'phy-13-4', name: 'Bar Magnet & Magnetic Materials', details: 'Dipole moment, field lines, dia-, para-, and ferromagnetic substances' },
      ],
    },
    {
      id: 'phy-u14',
      unitNumber: 14,
      name: 'Electromagnetic Induction and Alternating Currents',
      slug: 'emi-ac',
      weightagePercent: 7,
      description: 'Faraday’s law, Lenz’s law, self/mutual inductance, LCR series circuit, resonance, AC generator & transformer.',
      topics: [
        { id: 'phy-14-1', name: 'Electromagnetic Induction (EMI)', details: 'Faraday’s laws, Lenz’s law, eddy currents, self and mutual inductance' },
        { id: 'phy-14-2', name: 'Alternating Currents Fundamentals', details: 'Peak and RMS values, reactance and impedance' },
        { id: 'phy-14-3', name: 'LCR Series Circuits & Resonance', details: 'Phase relations, resonance condition, power factor, wattless current' },
        { id: 'phy-14-4', name: 'AC Devices', details: 'AC generator and step-up/step-down transformers' },
      ],
    },
    {
      id: 'phy-u15',
      unitNumber: 15,
      name: 'Electromagnetic Waves',
      slug: 'electromagnetic-waves',
      weightagePercent: 3,
      description: 'Displacement current, transverse nature of EM waves, electromagnetic spectrum, and applications.',
      topics: [
        { id: 'phy-15-1', name: 'Displacement Current & Characteristics', details: 'Maxwell’s concept, speed and transverse nature' },
        { id: 'phy-15-2', name: 'Electromagnetic Spectrum', details: 'Radio, microwave, IR, visible, UV, X-ray, Gamma rays and uses' },
      ],
    },
    {
      id: 'phy-u16',
      unitNumber: 16,
      name: 'Optics (Ray & Wave Optics)',
      slug: 'optics',
      weightagePercent: 9,
      description: 'Reflection, refraction, lenses, optical instruments, Huygens’ principle, Young’s double slit, diffraction, polarization.',
      topics: [
        { id: 'phy-16-1', name: 'Ray Optics & Optical Instruments', details: 'Mirrors, Snell’s law, lens maker formula, prism, microscope and astronomical telescopes' },
        { id: 'phy-16-2', name: 'Wave Optics & Huygens’ Principle', details: 'Wavefront, laws of reflection and refraction' },
        { id: 'phy-16-3', name: 'Interference & Young’s Double Slit (YDSE)', details: 'Coherent sources, fringe width expression, conditions for interference' },
        { id: 'phy-16-4', name: 'Diffraction & Polarization', details: 'Single slit central maximum, Brewster’s law, Polaroids' },
      ],
    },
    {
      id: 'phy-u17',
      unitNumber: 17,
      name: 'Dual Nature of Matter and Radiation',
      slug: 'dual-nature-matter-radiation',
      weightagePercent: 4,
      description: 'Photoelectric effect, Einstein’s equation, de-Broglie wavelength of matter waves.',
      topics: [
        { id: 'phy-17-1', name: 'Photoelectric Effect', details: 'Hertz and Lenard observations, stopping potential, Einstein’s photoelectric equation' },
        { id: 'phy-17-2', name: 'Matter Waves & de-Broglie Hypothesis', details: 'Wave nature of particles, de-Broglie relation' },
      ],
    },
    {
      id: 'phy-u18',
      unitNumber: 18,
      name: 'Atoms and Nuclei',
      slug: 'atoms-nuclei',
      weightagePercent: 5,
      description: 'Rutherford and Bohr models, hydrogen spectrum, binding energy per nucleon, fission and fusion.',
      topics: [
        { id: 'phy-18-1', name: 'Atomic Models & Bohr Theory', details: 'Alpha scattering, energy levels, hydrogen emission spectrum series' },
        { id: 'phy-18-2', name: 'Nuclear Physics', details: 'Composition, mass defect, binding energy per nucleon curve, fission and fusion' },
      ],
    },
    {
      id: 'phy-u19',
      unitNumber: 19,
      name: 'Electronic Devices',
      slug: 'electronic-devices',
      weightagePercent: 5,
      description: 'Semiconductor p-n diodes, rectifiers, LED, photodiode, solar cell, Zener regulator, logic gates (OR, AND, NOT, NAND, NOR).',
      topics: [
        { id: 'phy-19-1', name: 'Semiconductors & p-n Junction Diode', details: 'Forward and reverse bias I-V curves, half/full wave rectification' },
        { id: 'phy-19-2', name: 'Special Purpose Diodes', details: 'LED, photodiode, solar cell, Zener diode as a voltage regulator' },
        { id: 'phy-19-3', name: 'Logic Gates', details: 'Truth tables and Boolean operations for OR, AND, NOT, NAND, and NOR' },
      ],
    },
    {
      id: 'phy-u20',
      unitNumber: 20,
      name: 'Experimental Skills',
      slug: 'experimental-skills',
      weightagePercent: 6,
      description: '18 official practical laboratory experiments tested directly in JEE Main papers.',
      topics: [
        { id: 'phy-20-1', name: 'Vernier Calipers & Screw Gauge', details: 'Internal/external diameter, depth, thickness of thin wire/sheet' },
        { id: 'phy-20-2', name: 'Mechanics Experiments', details: 'Simple pendulum energy dissipation, Metre scale principle of moments, Young’s modulus of wire' },
        { id: 'phy-20-3', name: 'Fluid & Thermal Experiments', details: 'Surface tension by capillary rise, viscosity by terminal velocity, speed of sound by resonance tube, specific heat by method of mixtures' },
        { id: 'phy-20-4', name: 'Electrical & Optical Experiments', details: 'Metre bridge resistivity, Ohm’s law resistance, galvanometer half-deflection, focal length of mirrors/lens by parallax, prism angle of deviation, glass slab refractive index' },
        { id: 'phy-20-5', name: 'Semiconductor Lab Experiments', details: 'p-n junction I-V curves, Zener breakdown voltage, component identification (diode, LED, resistor, capacitor)' },
      ],
    },
  ],
};

export const JEE_MAIN_CHEMISTRY_SYLLABUS: SubjectSyllabus = {
  id: 'sub-jm-chem',
  name: 'Chemistry',
  slug: 'chemistry',
  totalUnits: 20,
  units: [
    // Physical Chemistry (Units 1 - 8)
    {
      id: 'chem-u1',
      unitNumber: 1,
      name: 'Some Basic Concepts in Chemistry',
      slug: 'basic-concepts-chemistry',
      category: 'Physical',
      weightagePercent: 4,
      description: 'Dalton’s theory, mole concept, stoichiometry, empirical and molecular formulas.',
      topics: [
        { id: 'chem-1-1', name: 'Matter & Dalton’s Atomic Theory', details: 'Laws of chemical combination, atomic and molecular masses' },
        { id: 'chem-1-2', name: 'Mole Concept & Stoichiometry', details: 'Molar mass, percentage composition, empirical and molecular formula calculations' },
      ],
    },
    {
      id: 'chem-u2',
      unitNumber: 2,
      name: 'Atomic Structure',
      slug: 'atomic-structure',
      category: 'Physical',
      weightagePercent: 6,
      description: 'Bohr model, quantum numbers, orbital wave functions, Aufbau/Pauli/Hund rules, electronic configurations.',
      topics: [
        { id: 'chem-2-1', name: 'Electromagnetic Radiation & Bohr Model', details: 'Hydrogen spectrum, Bohr postulates, electron energy and orbital radius derivations' },
        { id: 'chem-2-2', name: 'Quantum Mechanical Model of Atom', details: 'de Broglie, Heisenberg uncertainty, orbital wave functions (ψ, ψ² with r for 1s and 2s)' },
        { id: 'chem-2-3', name: 'Quantum Numbers & Electron Filling', details: 'Principal, angular, magnetic, spin quantum numbers, Aufbau, Pauli exclusion, Hund’s rule' },
      ],
    },
    {
      id: 'chem-u3',
      unitNumber: 3,
      name: 'Chemical Bonding and Molecular Structure',
      slug: 'chemical-bonding-molecular-structure',
      category: 'Physical',
      weightagePercent: 7,
      description: 'Kossel-Lewis, VSEPR shapes, hybridization, Molecular Orbital Theory (MOT), and hydrogen bonding.',
      topics: [
        { id: 'chem-3-1', name: 'Ionic & Covalent Bonding', details: 'Lattice enthalpy, Fajan’s rule, dipole moment, electronegativity' },
        { id: 'chem-3-2', name: 'VSEPR Theory & Molecular Shapes', details: 'Predicting geometries of simple molecules' },
        { id: 'chem-3-3', name: 'Valence Bond Theory & Hybridization', details: 's, p, d orbital hybridizations, resonance structures' },
        { id: 'chem-3-4', name: 'Molecular Orbital Theory (MOT)', details: 'LCAO, bonding/antibonding, bond order, bond length, homonuclear diatomics' },
      ],
    },
    {
      id: 'chem-u4',
      unitNumber: 4,
      name: 'Chemical Thermodynamics',
      slug: 'chemical-thermodynamics',
      category: 'Physical',
      weightagePercent: 6,
      description: 'First & Second laws, enthalpy of reactions, Hess’s law, entropy, Gibbs free energy, spontaneity.',
      topics: [
        { id: 'chem-4-1', name: 'First Law of Thermodynamics', details: 'Work, heat, internal energy, enthalpy, heat capacity, Hess’s law of heat summation' },
        { id: 'chem-4-2', name: 'Reaction Enthalpies', details: 'Bond dissociation, combustion, formation, atomization, sublimation, phase transitions' },
        { id: 'chem-4-3', name: 'Second Law & Spontaneity', details: 'Entropy ΔS, Gibbs free energy ΔG, criteria for spontaneity, ΔG° and equilibrium constant' },
      ],
    },
    {
      id: 'chem-u5',
      unitNumber: 5,
      name: 'Solutions',
      slug: 'solutions',
      category: 'Physical',
      weightagePercent: 5,
      description: 'Concentration units, Raoult’s law, colligative properties, abnormal molar mass, van’t Hoff factor.',
      topics: [
        { id: 'chem-5-1', name: 'Concentration Expressions & Raoult’s Law', details: 'Molarity, molality, mole fraction, ideal and non-ideal vapor pressure-composition curves' },
        { id: 'chem-5-2', name: 'Colligative Properties', details: 'Relative lowering of VP, elevation of boiling point, depression of freezing point, osmotic pressure' },
        { id: 'chem-5-3', name: 'Abnormal Molar Mass & van’t Hoff Factor', details: 'Association and dissociation degrees' },
      ],
    },
    {
      id: 'chem-u6',
      unitNumber: 6,
      name: 'Equilibrium',
      slug: 'chemical-ionic-equilibrium',
      category: 'Physical',
      weightagePercent: 7,
      description: 'Physical & chemical equilibria, Kp/Kc, Le Chatelier’s principle, pH, buffers, and solubility product.',
      topics: [
        { id: 'chem-6-1', name: 'Chemical Equilibrium & Le Chatelier’s Principle', details: 'Equilibrium constants Kp and Kc, ΔG/ΔG° significance, factors affecting equilibrium' },
        { id: 'chem-6-2', name: 'Ionic Equilibrium & Acid-Base Theories', details: 'Arrhenius, Bronsted-Lowry, Lewis concepts, ionization constants, pH scale' },
        { id: 'chem-6-3', name: 'Salt Hydrolysis, Buffer Solutions & Ksp', details: 'Common ion effect, pH of salt solutions, solubility product of sparingly soluble salts' },
      ],
    },
    {
      id: 'chem-u7',
      unitNumber: 7,
      name: 'Redox Reactions and Electrochemistry',
      slug: 'redox-electrochemistry',
      category: 'Physical',
      weightagePercent: 6,
      description: 'Oxidation numbers, balancing redox, electrolytic conduction, Kohlrausch’s law, Nernst equation, batteries.',
      topics: [
        { id: 'chem-7-1', name: 'Redox Reactions & Balancing', details: 'Oxidation numbers, electronic concepts, half-reaction balancing' },
        { id: 'chem-7-2', name: 'Electrolytic Conduction & Kohlrausch’s Law', details: 'Conductance, molar conductivity, variation with dilution' },
        { id: 'chem-7-3', name: 'Electrochemical Cells & Nernst Equation', details: 'Galvanic cells, EMF, standard electrode potential, Gibbs free energy relationship' },
        { id: 'chem-7-4', name: 'Commercial Cells & Fuel Cells', details: 'Dry cell, lead storage battery, hydrogen-oxygen fuel cells' },
      ],
    },
    {
      id: 'chem-u8',
      unitNumber: 8,
      name: 'Chemical Kinetics',
      slug: 'chemical-kinetics',
      category: 'Physical',
      weightagePercent: 5,
      description: 'Reaction rate, order and molecularity, zero/first order kinetics, Arrhenius equation, activation energy.',
      topics: [
        { id: 'chem-8-1', name: 'Rate of Reaction & Rate Law', details: 'Factors affecting rate, order and molecularity, rate constant units' },
        { id: 'chem-8-2', name: 'Integrated Rate Equations', details: 'Zero-order and first-order reactions, half-life formulas' },
        { id: 'chem-8-3', name: 'Temperature Dependence & Collision Theory', details: 'Arrhenius equation, activation energy calculation' },
      ],
    },

    // Inorganic Chemistry (Units 9 - 12)
    {
      id: 'chem-u9',
      unitNumber: 9,
      name: 'Classification of Elements and Periodicity in Properties',
      slug: 'periodic-properties',
      category: 'Inorganic',
      weightagePercent: 4,
      description: 'Modern periodic table, periodic trends in radii, ionization enthalpy, electron gain enthalpy, valence.',
      topics: [
        { id: 'chem-9-1', name: 'Modern Periodic Table Architecture', details: 's, p, d, f blocks, electronic configurations' },
        { id: 'chem-9-2', name: 'Periodic Trends in Properties', details: 'Atomic/ionic radii, ionization enthalpy, electron gain enthalpy, electronegativity, valence, reactivity' },
      ],
    },
    {
      id: 'chem-u10',
      unitNumber: 10,
      name: 'p-Block Elements (Group 13 to Group 18)',
      slug: 'p-block-elements',
      category: 'Inorganic',
      weightagePercent: 5,
      description: 'General trends across periods and down groups 13-18, unique behavior of first element in each group.',
      topics: [
        { id: 'chem-10-1', name: 'Group 13 to Group 18 Trends', details: 'Electronic configurations, physical and chemical trends across periods and down groups' },
        { id: 'chem-10-2', name: 'Anomalous Behaviour of First Elements', details: 'Inert pair effect, pπ-pπ multiple bonding tendencies' },
      ],
    },
    {
      id: 'chem-u11',
      unitNumber: 11,
      name: 'd- and f-Block Elements',
      slug: 'd-and-f-block-elements',
      category: 'Inorganic',
      weightagePercent: 6,
      description: '3d series trends, oxidation states, K2Cr2O7 and KMnO4 chemistry, Lanthanoid contraction, Actinoids.',
      topics: [
        { id: 'chem-11-1', name: 'Transition Elements (3d series)', details: 'Electronic configuration, ionization enthalpy, oxidation states, magnetic properties, catalytic nature, alloys' },
        { id: 'chem-11-2', name: 'Potassium Dichromate & Permanganate', details: 'Preparation, properties, and oxidizing actions of K2Cr2O7 and KMnO4' },
        { id: 'chem-11-3', name: 'Inner Transition Elements (f-Block)', details: 'Lanthanoids: configurations, oxidation states, Lanthanoid contraction; Actinoids overview' },
      ],
    },
    {
      id: 'chem-u12',
      unitNumber: 12,
      name: 'Coordination Compounds',
      slug: 'coordination-compounds',
      category: 'Inorganic',
      weightagePercent: 6,
      description: 'Werner’s theory, ligands, IUPAC nomenclature, isomerism, Valence Bond Theory (VBT), and Crystal Field Theory (CFT).',
      topics: [
        { id: 'chem-12-1', name: 'Werner’s Theory & Nomenclature', details: 'Coordination number, ligands, denticity, chelation, IUPAC naming of mononuclear complexes' },
        { id: 'chem-12-2', name: 'Isomerism in Coordination Compounds', details: 'Structural and stereoisomerism (geometrical and optical)' },
        { id: 'chem-12-3', name: 'Bonding in Complexes (VBT and CFT)', details: 'Inner/outer orbital complexes, crystal field splitting in octahedral/tetrahedral, color and magnetic properties' },
      ],
    },

    // Organic Chemistry (Units 13 - 20)
    {
      id: 'chem-u13',
      unitNumber: 13,
      name: 'Purification and Characterisation of Organic Compounds',
      slug: 'purification-characterisation',
      category: 'Organic',
      weightagePercent: 4,
      description: 'Purification methods, qualitative detection of N, S, P, halogens, and quantitative elemental analysis.',
      topics: [
        { id: 'chem-13-1', name: 'Purification Techniques', details: 'Crystallization, sublimation, distillation, differential extraction, chromatography' },
        { id: 'chem-13-2', name: 'Qualitative Detection of Elements', details: 'Lassaigne’s test for Nitrogen, Sulphur, Phosphorus, and Halogens' },
        { id: 'chem-13-3', name: 'Quantitative Organic Analysis', details: 'Estimation of C, H (combustion), N (Dumas/Kjeldahl), halogens (Carius), empirical/molecular formula' },
      ],
    },
    {
      id: 'chem-u14',
      unitNumber: 14,
      name: 'Some Basic Principles of Organic Chemistry',
      slug: 'general-organic-chemistry',
      category: 'Organic',
      weightagePercent: 7,
      description: 'IUPAC nomenclature, carbocations, carbanions, free radicals, inductive, resonance, hyperconjugation effects.',
      topics: [
        { id: 'chem-14-1', name: 'Hybridization & Classification', details: 'Tetravalency of carbon, shapes of molecules, homologous series, functional groups' },
        { id: 'chem-14-2', name: 'IUPAC Nomenclature & Isomerism', details: 'Systematic IUPAC naming, structural and stereoisomerism' },
        { id: 'chem-14-3', name: 'Reaction Intermediates & Bond Cleavage', details: 'Homolytic/heterolytic cleavage, stability of carbocations, carbanions, and free radicals' },
        { id: 'chem-14-4', name: 'Electronic Displacement Effects', details: 'Inductive effect, electromeric effect, resonance, and hyperconjugation' },
      ],
    },
    {
      id: 'chem-u15',
      unitNumber: 15,
      name: 'Hydrocarbons',
      slug: 'hydrocarbons',
      category: 'Organic',
      weightagePercent: 6,
      description: 'Alkanes, Alkenes, Alkynes, and Aromatic hydrocarbons (benzene, electrophilic aromatic substitution).',
      topics: [
        { id: 'chem-15-1', name: 'Alkanes', details: 'Conformations (Sawhorse & Newman of ethane), halogenation free-radical mechanism' },
        { id: 'chem-15-2', name: 'Alkenes', details: 'Geometrical isomerism, electrophilic addition, Markovnikov & peroxide effect, ozonolysis' },
        { id: 'chem-15-3', name: 'Alkynes', details: 'Acidic nature of terminal alkynes, addition reactions, cyclic polymerization' },
        { id: 'chem-15-4', name: 'Aromatic Hydrocarbons', details: 'Huckel’s rule of aromaticity, electrophilic substitution (nitration, halogenation, Friedel-Crafts)' },
      ],
    },
    {
      id: 'chem-u16',
      unitNumber: 16,
      name: 'Organic Compounds Containing Halogens',
      slug: 'haloalkanes-haloarenes',
      category: 'Organic',
      weightagePercent: 5,
      description: 'C-X bond nature, SN1 and SN2 substitution mechanisms, environmental impacts of freons and DDT.',
      topics: [
        { id: 'chem-16-1', name: 'Preparation & Properties of Haloalkanes', details: 'General synthesis methods and physical properties' },
        { id: 'chem-16-2', name: 'Nucleophilic Substitution Mechanisms', details: 'SN1 vs SN2 kinetics, stereochemical inversion/retention, elimination competition' },
        { id: 'chem-16-3', name: 'Polyhalogen Compounds', details: 'Uses and environmental effects of chloroform, iodoform, freons, and DDT' },
      ],
    },
    {
      id: 'chem-u17',
      unitNumber: 17,
      name: 'Organic Compounds Containing Oxygen',
      slug: 'oxygen-containing-organic-compounds',
      category: 'Organic',
      weightagePercent: 8,
      description: 'Alcohols, Phenols, Ethers, Aldehydes, Ketones (Aldol, Cannizzaro), and Carboxylic acids.',
      topics: [
        { id: 'chem-17-1', name: 'Alcohols, Phenols & Ethers', details: '1°/2°/3° alcohol tests, dehydration mechanism, phenol acidity, Reimer-Tiemann reaction' },
        { id: 'chem-17-2', name: 'Aldehydes & Ketones', details: 'Nucleophilic addition, Grignard reaction, Clemmensen/Wolff-Kishner reductions, acidity of α-H' },
        { id: 'chem-17-3', name: 'Name Reactions & Distinguishing Tests', details: 'Aldol condensation, Cannizzaro, Haloform reaction, Tollens/Fehling distinguishing tests' },
        { id: 'chem-17-4', name: 'Carboxylic Acids', details: 'Acidity, inductive/resonance effects on acid strength' },
      ],
    },
    {
      id: 'chem-u18',
      unitNumber: 18,
      name: 'Organic Compounds Containing Nitrogen',
      slug: 'nitrogen-containing-organic-compounds',
      category: 'Organic',
      weightagePercent: 5,
      description: 'Amines (basic character, distinction), and Diazonium salts in synthetic organic transformations.',
      topics: [
        { id: 'chem-18-1', name: 'Amines Structure & Basicity', details: 'Primary, secondary, tertiary amines, gas vs aqueous phase basic strength trends' },
        { id: 'chem-18-2', name: 'Identification & Chemical Tests', details: 'Carbylamine test, Hinsberg’s test, reaction with nitrous acid' },
        { id: 'chem-18-3', name: 'Diazonium Salts', details: 'Preparation, stability, and importance in synthetic replacements and coupling reactions' },
      ],
    },
    {
      id: 'chem-u19',
      unitNumber: 19,
      name: 'Biomolecules',
      slug: 'biomolecules',
      category: 'Organic',
      weightagePercent: 5,
      description: 'Carbohydrates (aldoses/ketoses, oligosaccharides), amino acids, proteins, vitamins, and nucleic acids.',
      topics: [
        { id: 'chem-19-1', name: 'Carbohydrates', details: 'Monosaccharides (glucose, fructose), oligosaccharides (sucrose, lactose, maltose)' },
        { id: 'chem-19-2', name: 'Proteins & Enzymes', details: 'α-amino acids, peptide linkage, primary/secondary/tertiary structures, denaturation' },
        { id: 'chem-19-3', name: 'Nucleic Acids, Vitamins & Hormones', details: 'Chemical constitution of DNA and RNA, classification of vitamins, general introduction to hormones' },
      ],
    },
    {
      id: 'chem-u20',
      unitNumber: 20,
      name: 'Principles Related to Practical Chemistry',
      slug: 'principles-practical-chemistry',
      category: 'Organic',
      weightagePercent: 6,
      description: 'Salt analysis (cations & anions), organic functional group tests, titrimetry, and organic preparations.',
      topics: [
        { id: 'chem-20-1', name: 'Detection of Elements & Functional Groups', details: 'N, S, halogens detection; -OH (alcoholic/phenolic), >C=O (aldehyde/ketone), -COOH, -NH2' },
        { id: 'chem-20-2', name: 'Chemical Preparations', details: 'Mohr’s salt, potash alum, Acetanilide, p-nitro acetanilide, aniline yellow, iodoform' },
        { id: 'chem-20-3', name: 'Titrimetric Exercises', details: 'Acid-base with indicators, oxalic acid vs KMnO4, Mohr’s salt vs KMnO4' },
        { id: 'chem-20-4', name: 'Qualitative Salt Analysis', details: 'Cations: Pb²⁺, Cu²⁺, Al³⁺, Fe³⁺, Zn²⁺, Ni²⁺, Ca²⁺, Ba²⁺, Mg²⁺, NH4⁺; Anions: CO3²⁻, S²⁻, SO4²⁻, NO3⁻, NO2⁻, Cl⁻, Br⁻, I⁻' },
        { id: 'chem-20-5', name: 'Physical Experiments', details: 'Enthalpy of CuSO4 solution, neutralization enthalpy, lyophilic/lyophobic sols, I⁻ with H2O2 kinetics' },
      ],
    },
  ],
};

export const JEE_MAIN_PAPER_2A_SYLLABUS: Paper2Module[] = [
  {
    id: 'p2a-aptitude',
    paperType: '2A-BArch',
    partNumber: 'Part II',
    title: 'Aptitude Test',
    units: [
      {
        unitNumber: 1,
        title: 'Awareness of Persons, Buildings, Materials',
        details: [
          'Objects, texture related to architecture and build-environment',
          'Visualizing three-dimensional objects from two-dimensional drawings',
          'Visualizing different sides of three-dimensional objects',
          'Analytical Reasoning & Mental Ability (Visual, Numerical, and Verbal)',
        ],
      },
      {
        unitNumber: 2,
        title: 'Three Dimensional Perception',
        details: [
          'Understanding and appreciation of scale and proportions of objects, building forms and elements',
          'Color, texture harmony and contrast',
          'Design and drawing of geometrical or abstract shapes and patterns in pencil',
          'Transformation of forms: 2D and 3D union, subtraction, rotation, development of surfaces and volumes',
          'Generation of plans, elevations, and 3D views of objects',
          'Creating 2D and 3D compositions using given shapes and forms',
        ],
      },
    ],
  },
  {
    id: 'p2a-drawing',
    paperType: '2A-BArch',
    partNumber: 'Part III',
    title: 'Drawing Test (On Drawing Sheet)',
    units: [
      {
        unitNumber: 1,
        title: 'Memory & Observational Sketching',
        details: [
          'Sketching scenes and activities from memory of urbanscape (public spaces, markets, festivals, street scenes, monuments, recreational areas)',
          'Landscape composition (riverfronts, jungles, gardens, trees, plants)',
          'Rural life scenes and everyday activities',
          'Drawing with pencil shading, geometric instruments, color pencils, and crayons',
        ],
      },
    ],
  },
];

export const JEE_MAIN_PAPER_2B_SYLLABUS: Paper2Module[] = [
  {
    id: 'p2b-planning',
    paperType: '2B-BPlanning',
    partNumber: 'Part III',
    title: 'Planning Test',
    units: [
      {
        unitNumber: 1,
        title: 'General Awareness',
        details: [
          'General knowledge questions and knowledge about prominent cities',
          'Development issues, government urban and rural programs, and infrastructure initiatives',
        ],
      },
      {
        unitNumber: 2,
        title: 'Social Sciences',
        details: [
          'Nationalism in India, pre-modern world, 19th-century global economy, colonialism and colonial cities',
          'Industrialization, resources and development (water, mineral, agriculture, national economy)',
          'Human settlements, urbanization, rural development, population structure, social exclusion',
          'Power-sharing, federalism, political parties, democracy, Constitution of India',
          'Economic development: sectors, globalization, concept of development, poverty',
        ],
      },
      {
        unitNumber: 3,
        title: 'Thinking Skills',
        details: [
          'Reading comprehension (unseen passage)',
          'Map reading skills: scale, distance, direction, area calculations',
          'Critical reasoning, interpretation of charts, graphs, and tables',
          'Basic concepts of statistics and quantitative reasoning',
        ],
      },
    ],
  },
];

export const ALL_JEE_MAIN_SYLLABUS = {
  paper1: {
    mathematics: JEE_MAIN_MATHEMATICS_SYLLABUS,
    physics: JEE_MAIN_PHYSICS_SYLLABUS,
    chemistry: JEE_MAIN_CHEMISTRY_SYLLABUS,
  },
  paper2A: JEE_MAIN_PAPER_2A_SYLLABUS,
  paper2B: JEE_MAIN_PAPER_2B_SYLLABUS,
};
