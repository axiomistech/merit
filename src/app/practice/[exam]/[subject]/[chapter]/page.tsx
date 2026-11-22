'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Layers,
  ChevronRight,
  Clock,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
} from 'lucide-react';
import { MathText } from '@/components/ui/MathText';
import { SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TopicItem {
  id: string;
  name: string;
  questionsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'High Yield';
  description: string;
}

export default function ChapterPracticePage() {
  const params = useParams();
  const router = useRouter();
  const examSlug = (params?.exam as string) || 'neet';
  const subjectSlug = (params?.subject as string) || 'physics';
  const chapterSlug = (params?.chapter as string) || 'laws-of-motion';

  const topics: TopicItem[] = [
    {
      id: 'top_1',
      name: "Newton's First & Second Laws of Motion",
      questionsCount: 5,
      difficulty: 'Medium',
      description: 'Inertia, momentum definition, impulse, and fundamental dynamic equilibrium.',
    },
    {
      id: 'top_2',
      name: 'Static & Kinetic Friction Analysis',
      questionsCount: 5,
      difficulty: 'High Yield',
      description: 'Coefficients of friction, angle of repose, blocks on inclined planes, and contact forces.',
    },
    {
      id: 'top_3',
      name: 'Circular Motion & Centripetal Forces',
      questionsCount: 5,
      difficulty: 'Medium',
      description: 'Banking of curved roads, conical pendulum, and tension in circular paths.',
    },
  ];

  // --------------------------------------------------------------------------
  // Practice Engine Active Session State
  // --------------------------------------------------------------------------
  const [activeTopic, setActiveTopic] = useState<TopicItem | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Filter sample questions relevant to physics/discipline
  const topicQuestions = React.useMemo(() => {
    const list = SAMPLE_NEET_QUESTIONS.filter((q) => q.subjectSlug === subjectSlug);
    return list.length >= 5 ? list.slice(0, 5) : SAMPLE_NEET_QUESTIONS.slice(0, 5);
  }, [subjectSlug]);

  const currentQ = topicQuestions[currentQIndex];

  const handleStartTopic = (topic: TopicItem) => {
    setActiveTopic(topic);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  const handleSelectOption = (optionKey: string) => {
    if (selectedAnswers[currentQIndex]) return; // Answer locked once selected to encourage careful thought
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQIndex]: optionKey,
    }));
  };

  const handleToggleBookmark = (index: number) => {
    setBookmarkedQuestions((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      if (typeof window !== 'undefined') {
        localStorage.setItem(`fort_practice_bookmark_${chapterSlug}_${index}`, JSON.stringify(next[index]));
      }
      toast.success(next[index] ? 'Question bookmarked for revision' : 'Bookmark removed');
      return next;
    });
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(([idx, ans]) => {
    const q = topicQuestions[Number(idx)];
    return q?.answerKey?.correctOptions?.[0] === ans;
  }).length;

  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#66727D]">
          <Link href="/practice" className="hover:text-[#20252B]">Practice</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/practice/${examSlug}`} className="hover:text-[#20252B] uppercase">{examSlug}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/practice/${examSlug}/${subjectSlug}`} className="hover:text-[#20252B] capitalize">{subjectSlug}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#20252B] capitalize">{chapterSlug.replace(/-/g, ' ')}</span>
        </div>

        {/* ================================================================== */}
        {/* VIEW A: TOPIC SELECTION LIST                                       */}
        {/* ================================================================== */}
        {!activeTopic && (
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-bold uppercase tracking-wider text-[#66727D] mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9CC6E0]" />
                <span>Continuous Practice Engine</span>
              </div>
              <h1 className="text-3xl font-black font-sans text-[#20252B] capitalize">
                {chapterSlug.replace(/-/g, ' ')}
              </h1>
              <p className="mt-1 text-sm text-[#66727D]">
                Target specific sub-topics with instant feedback, untimed practice, and step-by-step KaTeX solutions.
              </p>
            </div>

            <div className="space-y-4">
              {topics.map((top) => (
                <div
                  key={top.id}
                  className="rounded-[28px] border border-[#DCE2E6] bg-white/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#9CC6E0] transition-all backdrop-blur-md"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#F1F3F4] text-[#20252B] border border-[#DCE2E6]">
                        {top.difficulty}
                      </span>
                      <span className="text-xs font-mono text-[#66727D]">{top.questionsCount} Questions</span>
                    </div>
                    <h3 className="font-bold text-base text-[#20252B]">{top.name}</h3>
                    <p className="text-xs text-[#66727D] leading-relaxed">{top.description}</p>
                  </div>

                  <button
                    onClick={() => handleStartTopic(top)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#20252B] text-white text-xs font-bold hover:bg-black transition-transform hover:scale-[1.02] shrink-0 shadow-sm"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Practice Topic</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Timed CBT Full Chapter Link */}
            <div className="rounded-[28px] border border-[#9CC6E0]/60 bg-gradient-to-br from-[#9CC6E0]/15 to-white/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#9CC6E0]">
                  READY FOR TIMED SIMULATION?
                </span>
                <h3 className="font-bold text-base text-[#20252B]">Attempt Full Official Question Paper</h3>
                <p className="text-xs text-[#66727D] max-w-lg mt-0.5">
                  Test under exam conditions with server countdown, negative marking, and printable vector A4 OMR.
                </p>
              </div>
              <Link
                href="/papers"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#E4002B] text-white text-xs font-bold shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] transition-transform hover:scale-[1.02] shrink-0"
              >
                <span>Browse Papers</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* VIEW B: INTERACTIVE PRACTICE ENGINE (INSTANT FEEDBACK & SOLUTIONS) */}
        {/* ================================================================== */}
        {activeTopic && !isCompleted && currentQ && (
          <div className="space-y-6">
            {/* Practice Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <button
                type="button"
                onClick={() => setActiveTopic(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#66727D] hover:text-[#20252B]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Exit Practice</span>
              </button>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-[#66727D]">
                  Question <strong className="text-[#20252B]">{currentQIndex + 1}</strong> of {topicQuestions.length}
                </span>
                <span className="rounded-full bg-[#9CC6E0]/30 px-3 py-1 font-bold text-[#20252B]">
                  Accuracy: {accuracy}%
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-[32px] border border-[#DCE2E6] bg-white p-7 sm:p-9 shadow-sm space-y-6">
              {/* Question Meta */}
              <div className="flex items-center justify-between border-b border-[#DCE2E6]/70 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#F1F3F4] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#20252B] border border-[#DCE2E6]">
                    Q. 0{currentQIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-[#66727D]">{activeTopic.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleBookmark(currentQIndex)}
                  className={cn(
                    'inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors',
                    bookmarkedQuestions[currentQIndex]
                      ? 'border-[#E4002B] text-[#E4002B] bg-[#E4002B]/10'
                      : 'border-[#DCE2E6] text-[#66727D] hover:text-[#20252B]'
                  )}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>{bookmarkedQuestions[currentQIndex] ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-medium text-[#20252B] leading-relaxed">
                <MathText text={currentQ.text} />
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const studentAns = selectedAnswers[currentQIndex];
                  const hasAnswered = Boolean(studentAns);
                  const isSelected = studentAns === opt.key;
                  const isCorrect = currentQ.answerKey?.correctOptions?.[0] === opt.key;

                  let borderStyle = 'border-[#DCE2E6] hover:border-[#9CC6E0] bg-white';
                  if (hasAnswered) {
                    if (isCorrect) {
                      borderStyle = 'border-[#9CC6E0] bg-[#9CC6E0]/20 font-bold';
                    } else if (isSelected && !isCorrect) {
                      borderStyle = 'border-[#E4002B] bg-[#E4002B]/10 text-[#E4002B] font-bold';
                    } else {
                      borderStyle = 'border-[#DCE2E6] opacity-60 bg-white';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(opt.key)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-2xl border p-4 text-left text-xs sm:text-sm transition-all',
                        borderStyle
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#DCE2E6] bg-[#F1F3F4] font-mono text-xs font-bold text-[#20252B]">
                          {opt.key}
                        </span>
                        <span>
                          <MathText text={opt.text} />
                        </span>
                      </div>
                      {hasAnswered && isCorrect && (
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-[#20252B]">
                          <CheckCircle2 className="h-4 w-4 text-[#20252B]" />
                          <span>Correct (+4)</span>
                        </span>
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-[#E4002B]">
                          <XCircle className="h-4 w-4 text-[#E4002B]" />
                          <span>Incorrect (-1)</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Step-by-Step KaTeX Explanation Reveal */}
              {selectedAnswers[currentQIndex] && (
                <div className="mt-6 rounded-2xl border border-[#9CC6E0]/70 bg-[#9CC6E0]/15 p-5 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20252B]">
                    <Sparkles className="h-4 w-4 text-[#E4002B]" />
                    <span>Step-by-Step KaTeX Explanation</span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#20252B] leading-relaxed">
                    <MathText text={currentQ.explanation?.text || 'Standard equilibrium derivation applied.'} />
                  </div>
                </div>
              )}

              {/* Bottom Pagination & Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                <button
                  type="button"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((p) => Math.max(0, p - 1))}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#66727D] hover:text-[#20252B] disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                {currentQIndex < topicQuestions.length - 1 ? (
                  <button
                    type="button"
                    disabled={!selectedAnswers[currentQIndex]}
                    onClick={() => setCurrentQIndex((p) => p + 1)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#20252B] text-white text-xs font-bold hover:bg-black disabled:opacity-40 transition-all"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!selectedAnswers[currentQIndex]}
                    onClick={() => setIsCompleted(true)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#E4002B] text-white text-xs font-bold hover:bg-[#C90026] shadow-sm transition-all"
                  >
                    <span>Finish Practice</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* VIEW C: TOPIC PRACTICE COMPLETION SUMMARY                          */}
        {/* ================================================================== */}
        {activeTopic && isCompleted && (
          <div className="rounded-[36px] border border-[#DCE2E6] bg-white p-8 sm:p-12 shadow-sm text-center space-y-6 max-w-xl mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#9CC6E0]/30 text-[#20252B]">
              <Sparkles className="h-8 w-8 text-[#E4002B]" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9CC6E0]">
                DRILL COMPLETED
              </span>
              <h2 className="text-2xl font-black text-[#20252B] font-sans">
                {activeTopic.name}
              </h2>
              <p className="text-xs text-[#66727D]">
                Your responses have been evaluated and recorded into your continuous learning telemetry.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 border-y border-[#DCE2E6] py-4">
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8C9BA8]">Accuracy</span>
                <span className="font-mono text-2xl font-black text-[#20252B]">{accuracy}%</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8C9BA8]">Correct</span>
                <span className="font-mono text-2xl font-black text-[#20252B]">{correctCount} / {topicQuestions.length}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8C9BA8]">Retention</span>
                <span className="font-mono text-2xl font-black text-[#9CC6E0]">+{correctCount * 4 - (topicQuestions.length - correctCount)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedAnswers({});
                  setCurrentQIndex(0);
                  setIsCompleted(false);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#DCE2E6] bg-white text-xs font-bold text-[#20252B] hover:bg-[#F1F3F4]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Repeat Topic</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTopic(null)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#20252B] text-white text-xs font-bold hover:bg-black"
              >
                <span>Practice Next Topic</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
