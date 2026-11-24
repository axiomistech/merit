import { QuestionData, ExamPaperConfig } from '@/types/exam';

export interface ExamInfo {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: 'medical' | 'engineering' | 'civil_services' | 'postgraduate';
  accentColor: string;
  subjects: {
    id: string;
    slug: string;
    name: string;
    chaptersCount: number;
    questionCount: number;
  }[];
}

export const EXAMINATIONS: ExamInfo[] = [
  {
    id: 'exam-neet',
    slug: 'neet',
    name: 'NEET (UG)',
    shortName: 'NEET',
    tagline: 'Precision medical entrance practice with timed simulation and calibrated OMR sheets.',
    description:
      'Engineered specifically for National Eligibility cum Entrance Test aspirants, covering Physics, Chemistry, Botany, and Zoology with official NTA marking (+4, -1, 0) and high-fidelity vector OMR generation.',
    category: 'medical',
    accentColor: '#8C6D3B',
    subjects: [
      { id: 'sub-neet-phy', slug: 'physics', name: 'Physics', chaptersCount: 28, questionCount: 0 },
      { id: 'sub-neet-chem', slug: 'chemistry', name: 'Chemistry', chaptersCount: 30, questionCount: 0 },
      { id: 'sub-neet-bot', slug: 'botany', name: 'Botany', chaptersCount: 22, questionCount: 0 },
      { id: 'sub-neet-zoo', slug: 'zoology', name: 'Zoology', chaptersCount: 20, questionCount: 0 },
    ],
  },
  {
    id: 'exam-jee-main',
    slug: 'jee-main',
    name: 'JEE Main',
    shortName: 'JEE Main',
    tagline: 'Speed, accuracy, and numerical problem mastery under NTA CBT conditions.',
    description:
      'Engineered for Joint Entrance Examination Main aspirants across Physics, Chemistry, and Mathematics, supporting single-correct MCQs and numerical integer value responses.',
    category: 'engineering',
    accentColor: '#121316',
    subjects: [
      { id: 'sub-jm-phy', slug: 'physics', name: 'Physics', chaptersCount: 28, questionCount: 0 },
      { id: 'sub-jm-chem', slug: 'chemistry', name: 'Chemistry', chaptersCount: 30, questionCount: 0 },
      { id: 'sub-jm-math', slug: 'mathematics', name: 'Mathematics', chaptersCount: 26, questionCount: 0 },
    ],
  },
  {
    id: 'exam-jee-adv',
    slug: 'jee-advanced',
    name: 'JEE Advanced',
    shortName: 'JEE Advanced',
    tagline: 'Multi-correct, partial marking, and complex concept integration testing.',
    description:
      'Dedicated simulation environment for IIT JEE Advanced candidates featuring multi-select questions with strict partial marking, numerical response fields, and matching lists.',
    category: 'engineering',
    accentColor: '#8C6D3B',
    subjects: [
      { id: 'sub-ja-phy', slug: 'physics', name: 'Physics (Advanced)', chaptersCount: 28, questionCount: 0 },
      { id: 'sub-ja-chem', slug: 'chemistry', name: 'Chemistry (Advanced)', chaptersCount: 30, questionCount: 0 },
      { id: 'sub-ja-math', slug: 'mathematics', name: 'Mathematics (Advanced)', chaptersCount: 26, questionCount: 0 },
    ],
  },
  {
    id: 'exam-gate',
    slug: 'gate',
    name: 'GATE',
    shortName: 'GATE',
    tagline: 'Branch-specific graduate engineering assessments and virtual calculator testing.',
    description:
      'Comprehensive Graduate Aptitude Test in Engineering simulation supporting branch-specific papers (CS, ME, EE, EC, CE, DA) with single-correct MCQs, multiple-select questions (MSQs), and numerical answer type (NAT) questions.',
    category: 'engineering',
    accentColor: '#121316',
    subjects: [
      { id: 'sub-gate-cs', slug: 'computer-science', name: 'Computer Science & IT', chaptersCount: 12, questionCount: 0 },
      { id: 'sub-gate-me', slug: 'mechanical', name: 'Mechanical Engineering', chaptersCount: 12, questionCount: 0 },
      { id: 'sub-gate-ee', slug: 'electrical', name: 'Electrical Engineering', chaptersCount: 11, questionCount: 0 },
      { id: 'sub-gate-ec', slug: 'electronics', name: 'Electronics & Communication', chaptersCount: 11, questionCount: 0 },
      { id: 'sub-gate-ce', slug: 'civil', name: 'Civil Engineering', chaptersCount: 10, questionCount: 0 },
      { id: 'sub-gate-ga', slug: 'general-aptitude', name: 'General Aptitude & Engineering Mathematics', chaptersCount: 8, questionCount: 0 },
    ],
  },
];

export const UPSC_EXAM_INFO: ExamInfo = {
  id: 'exam-upsc',
  slug: 'upsc',
  name: 'UPSC Civil Services (CSE)',
  shortName: 'UPSC CSE',
  tagline: 'Comprehensive Civil Services Prelims, CSAT, and Mains descriptive answer studio.',
  description:
    'Engineered for UPSC Civil Services Examination aspirants covering Prelims GS-I (100 MCQs, -0.66 negative marking), CSAT Paper II (80 MCQs, -0.83 negative marking, 33% qualifying), and Mains GS I to IV with analytical rubrics.',
  category: 'civil_services',
  accentColor: '#8C6D3B',
  subjects: [
    { id: 'sub-upsc-polity', slug: 'polity', name: 'Indian Polity & Governance', chaptersCount: 6, questionCount: 0 },
    { id: 'sub-upsc-history', slug: 'history', name: 'History of India & Art & Culture', chaptersCount: 5, questionCount: 0 },
    { id: 'sub-upsc-geography', slug: 'geography', name: 'Indian & World Geography', chaptersCount: 4, questionCount: 0 },
    { id: 'sub-upsc-economy', slug: 'economy', name: 'Economic & Social Development', chaptersCount: 5, questionCount: 0 },
    { id: 'sub-upsc-environment', slug: 'environment', name: 'Environmental Ecology & Climate Change', chaptersCount: 4, questionCount: 0 },
    { id: 'sub-upsc-science', slug: 'science', name: 'General Science & Technology', chaptersCount: 3, questionCount: 0 },
    { id: 'sub-upsc-csat', slug: 'csat', name: 'CSAT (Paper II Aptitude & Comprehension)', chaptersCount: 7, questionCount: 0 },
    { id: 'sub-upsc-ethics', slug: 'ethics', name: 'Ethics, Integrity & Aptitude (GS-IV)', chaptersCount: 8, questionCount: 0 },
  ],
};

// Strict Content Rule: No fake or fabricated examination questions/papers
export const SAMPLE_NEET_PAPER: ExamPaperConfig | null = null;
export const SAMPLE_NEET_QUESTIONS: QuestionData[] = [];
export function getFullNeet180Questions(): QuestionData[] {
  return [];
}
