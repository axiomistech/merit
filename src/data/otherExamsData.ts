import { QuestionData, ExamPaperConfig } from '@/types/exam';

export const SAMPLE_JEE_MAIN_PAPER: ExamPaperConfig = {
  id: 'paper-jee-main-mock-01',
  name: 'JEE Main All India Computer-Based Full Mock - 01',
  slug: 'jee-main-all-india-mock-01',
  examSlug: 'jee-main',
  examName: 'FORT JEE Main',
  durationMinutes: 180, // 3 hours standard
  totalMarks: 300,
  totalQuestions: 15,
  instructions: [
    'The test consists of Physics, Chemistry, and Mathematics.',
    'Section A contains MCQs with +4 for correct and -1 for wrong.',
    'Section B contains Numerical Value Questions with +4 for correct and 0 or -1 for wrong.',
    'Server-authoritative timer counts down to 00:00.',
  ],
  sections: [
    { id: 'sec-jm-phy', name: 'Physics', subjectSlug: 'physics', questionIndices: [1, 2, 3, 4, 5] },
    { id: 'sec-jm-chem', name: 'Chemistry', subjectSlug: 'chemistry', questionIndices: [6, 7, 8, 9, 10] },
    { id: 'sec-jm-math', name: 'Mathematics', subjectSlug: 'mathematics', questionIndices: [11, 12, 13, 14, 15] },
  ],
};

export const SAMPLE_JEE_MAIN_QUESTIONS: QuestionData[] = [
  {
    id: 'q-jm-1',
    versionId: 'qv-jm-1',
    displayNumber: 1,
    questionType: 'single_correct',
    subjectName: 'Physics',
    subjectSlug: 'physics',
    conceptName: 'Rotational Dynamics',
    conceptSlug: 'rotational-motion',
    difficulty: 'hard',
    text: 'A solid sphere of mass $M$ and radius $R$ rolls without slipping down an inclined plane of inclination $\\theta$. The linear acceleration of the center of mass of the sphere is:',
    options: [
      { key: 'A', text: '$\\frac{5}{7} g \\sin \\theta$' },
      { key: 'B', text: '$\\frac{3}{5} g \\sin \\theta$' },
      { key: 'C', text: '$\\frac{1}{2} g \\sin \\theta$' },
      { key: 'D', text: '$g \\sin \\theta$' },
    ],
    marks: 4,
    negativeMarks: 1,
    answerKey: { correctOptions: ['A'] },
    explanation: {
      text: '$a = \\frac{g \\sin \\theta}{1 + I/(MR^2)}$. For solid sphere $I = \\frac{2}{5}MR^2$, hence $a = \\frac{g \\sin \\theta}{1 + 2/5} = \\frac{5}{7} g \\sin \\theta$.',
    },
  },
  {
    id: 'q-jm-2',
    versionId: 'qv-jm-2',
    displayNumber: 2,
    questionType: 'numerical',
    subjectName: 'Physics',
    subjectSlug: 'physics',
    conceptName: 'Simple Harmonic Motion',
    conceptSlug: 'shm',
    difficulty: 'medium',
    text: 'A particle executes SHM with amplitude $A = 5\\,\\text{cm}$ and time period $T = 6\\,\\text{s}$. If it starts from mean position at $t=0$, find its displacement (in cm) at $t = 0.5\\,\\text{s}$. (Take $\\sin(\\pi/6) = 0.5$)',
    options: [],
    marks: 4,
    negativeMarks: 0,
    answerKey: { numericalValue: 2.5, numericalTolerance: 0.1 },
    explanation: {
      text: '$x(t) = A \\sin(\\omega t) = 5 \\sin\\left(\\frac{2\\pi}{6} \\times 0.5\\right) = 5 \\sin(\\pi/6) = 2.5\\,\\text{cm}$.',
    },
  },
  {
    id: 'q-jm-11',
    versionId: 'qv-jm-11',
    displayNumber: 11,
    questionType: 'single_correct',
    subjectName: 'Mathematics',
    subjectSlug: 'mathematics',
    conceptName: 'Definite Integrals',
    conceptSlug: 'calculus',
    difficulty: 'medium',
    text: 'The value of the definite integral $\\int_{-\\pi/2}^{\\pi/2} \\frac{\\cos x}{1 + e^x} dx$ is equal to:',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '0' },
      { key: 'D', text: '$\\pi$' },
    ],
    marks: 4,
    negativeMarks: 1,
    answerKey: { correctOptions: ['A'] },
    explanation: {
      text: 'Using king property $\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$, adding the two integrals eliminates the $e^x$ term giving $\\int_{-\\pi/2}^{\\pi/2} \\cos x dx = [\\sin x]_{-\\pi/2}^{\\pi/2} = 2$. Thus $2I = 2 \\implies I = 1$.',
    },
  },
];

export const SAMPLE_UPSC_PAPER: ExamPaperConfig = {
  id: 'paper-upsc-prelims-01',
  name: 'UPSC Civil Services Prelims GS-I Full Simulation - 01',
  slug: 'upsc-prelims-gs1-01',
  examSlug: 'upsc',
  examName: 'FORT UPSC Civil Services',
  durationMinutes: 120, // 2 hours
  totalMarks: 200,
  totalQuestions: 10,
  instructions: [
    'Paper consists of 100 objective questions (10 questions in this sample simulation).',
    'Each correct answer carries 2.0 marks.',
    'Each incorrect answer carries a negative penalty of 0.66 marks (1/3rd penalty).',
    'Unattempted questions receive zero marks.',
  ],
  sections: [
    { id: 'sec-upsc-polity', name: 'Polity & Constitution', subjectSlug: 'general-studies', questionIndices: [1, 2, 3] },
    { id: 'sec-upsc-econ', name: 'Economy & Development', subjectSlug: 'general-studies', questionIndices: [4, 5, 6] },
    { id: 'sec-upsc-env', name: 'Environment & Ecology', subjectSlug: 'general-studies', questionIndices: [7, 8, 9, 10] },
  ],
};

export const SAMPLE_UPSC_QUESTIONS: QuestionData[] = [
  {
    id: 'q-upsc-1',
    versionId: 'qv-upsc-1',
    displayNumber: 1,
    questionType: 'single_correct',
    subjectName: 'General Studies',
    subjectSlug: 'general-studies',
    conceptName: 'Indian Polity & Constitutional Framework',
    conceptSlug: 'polity',
    difficulty: 'medium',
    text: 'Consider the following statements regarding the Writ of Habeas Corpus in the Indian Constitution:\n1. It can be issued against both public authorities and private entities.\n2. It cannot be suspended even during a National Emergency under Article 359.\nWhich of the statements given above is/are correct?',
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: 'Both 1 and 2' },
      { key: 'D', text: 'Neither 1 nor 2' },
    ],
    marks: 2,
    negativeMarks: 0.66,
    answerKey: { correctOptions: ['C'] },
    explanation: {
      text: 'Statement 1 is correct: unlike Mandamus, Habeas Corpus can be issued against both public and private individuals. Statement 2 is correct: following the 44th Constitutional Amendment (1978), Articles 20 and 21 cannot be suspended even during Emergency, preserving the right to challenge illegal detention.',
    },
  },
  {
    id: 'q-upsc-2',
    versionId: 'qv-upsc-2',
    displayNumber: 2,
    questionType: 'single_correct',
    subjectName: 'General Studies',
    subjectSlug: 'general-studies',
    conceptName: 'Monetary Policy & Inflation Targeting',
    conceptSlug: 'economy',
    difficulty: 'hard',
    text: 'With reference to the Monetary Policy Committee (MPC) of India, consider the following statements:\n1. It is a 6-member committee presided over by the Union Finance Minister.\n2. It determines the policy repo rate required to achieve the inflation target of 4% (+/- 2%).\nWhich of the statements given above is/are correct?',
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: 'Both 1 and 2' },
      { key: 'D', text: 'Neither 1 nor 2' },
    ],
    marks: 2,
    negativeMarks: 0.66,
    answerKey: { correctOptions: ['B'] },
    explanation: {
      text: 'Statement 1 is incorrect: The MPC is presided over by the Governor of the Reserve Bank of India (RBI), not the Union Finance Minister. Statement 2 is correct: the statutory inflation target is 4% with a tolerance band of +/- 2%.',
    },
  },
];
