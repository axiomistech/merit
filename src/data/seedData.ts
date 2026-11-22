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
    name: 'MERITWISE NEET',
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
    id: 'exam-jee',
    slug: 'jee',
    name: 'MERITWISE JEE',
    shortName: 'JEE',
    tagline: 'Engineering entrance problem solving across JEE Main and JEE Advanced.',
    description:
      'Rigorous Computer-Based Testing simulation for Joint Entrance Examination aspirants across Physics, Chemistry, and Mathematics, supporting single-correct MCQs, multi-correct selections with partial marking, and numerical integer response fields.',
    category: 'engineering',
    accentColor: '#121316',
    subjects: [
      { id: 'sub-jee-phy', slug: 'physics', name: 'Physics', chaptersCount: 28, questionCount: 0 },
      { id: 'sub-jee-chem', slug: 'chemistry', name: 'Chemistry', chaptersCount: 30, questionCount: 0 },
      { id: 'sub-jee-math', slug: 'mathematics', name: 'Mathematics', chaptersCount: 26, questionCount: 0 },
    ],
  },
  {
    id: 'exam-upsc',
    slug: 'upsc',
    name: 'MERITWISE UPSC',
    shortName: 'UPSC',
    tagline: 'Civil services preliminary objective accuracy and analytical assessment.',
    description:
      'Standardized examination environment for Union Public Service Commission candidates covering General Studies (Paper I) and CSAT (Paper II) with standard 0.66 negative marking calibration.',
    category: 'civil_services',
    accentColor: '#8C6D3B',
    subjects: [
      { id: 'sub-upsc-gs1', slug: 'general-studies-1', name: 'General Studies I', chaptersCount: 35, questionCount: 0 },
      { id: 'sub-upsc-csat', slug: 'csat', name: 'CSAT (General Studies II)', chaptersCount: 18, questionCount: 0 },
    ],
  },
  {
    id: 'exam-gate',
    slug: 'gate',
    name: 'MERITWISE GATE',
    shortName: 'GATE',
    tagline: 'Branch-specific graduate engineering assessments and virtual calculator testing.',
    description:
      'Comprehensive Graduate Aptitude Test in Engineering simulation supporting branch-specific papers (CS, ME, EE, EC, CE, DA) with single-correct MCQs, multiple-select questions (MSQs), and numerical answer type (NAT) questions.',
    category: 'postgraduate',
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
  // Retained for backward navigation compatibility
  {
    id: 'exam-jee-main',
    slug: 'jee-main',
    name: 'MERITWISE JEE Main',
    shortName: 'JEE Main',
    tagline: 'Speed, accuracy, and numerical problem mastery under NTA CBT conditions.',
    description: 'JEE Main examination simulation across Physics, Chemistry, and Mathematics.',
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
    name: 'MERITWISE JEE Advanced',
    shortName: 'JEE Advanced',
    tagline: 'Multi-correct, partial marking, and complex concept integration testing.',
    description: 'IIT JEE Advanced simulation environment featuring multi-select and numerical questions.',
    category: 'engineering',
    accentColor: '#8C6D3B',
    subjects: [
      { id: 'sub-ja-phy', slug: 'physics', name: 'Physics (Advanced)', chaptersCount: 28, questionCount: 0 },
      { id: 'sub-ja-chem', slug: 'chemistry', name: 'Chemistry (Advanced)', chaptersCount: 30, questionCount: 0 },
      { id: 'sub-ja-math', slug: 'mathematics', name: 'Mathematics (Advanced)', chaptersCount: 26, questionCount: 0 },
    ],
  },
];

// Strict Content Rule: No fake or fabricated examination questions/papers
export const SAMPLE_NEET_PAPER: ExamPaperConfig | null = null;
export const SAMPLE_NEET_QUESTIONS: QuestionData[] = [];
export function getFullNeet180Questions(): QuestionData[] {
  return [];
}
