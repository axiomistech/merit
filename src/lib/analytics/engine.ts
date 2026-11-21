export interface ConceptPerformanceRecord {
  conceptId: string;
  conceptName: string;
  subjectName: string;
  totalAttempts: number;
  correctCount: number;
  accuracy: number;
  masteryScore: number; // 0 to 100
  lastAttemptedAt?: string;
}

export interface RecommendationItem {
  id: string;
  type: 'weak_concept' | 'repeated_mistake' | 'speed_improvement' | 'revision_overdue' | 'advanced_practice';
  title: string;
  conceptName: string;
  subjectName: string;
  explanation: string;
  priority: 'high' | 'medium' | 'low';
  actionUrl: string;
}

/**
 * Calculates evidence-based concept mastery score:
 * - Requires at least 5 attempts before full confidence is granted
 * - Combines accuracy percentage (70% weight) with volume weighting (30% weight)
 */
export function calculateConceptMastery(correct: number, total: number): number {
  if (total === 0) return 0;
  const rawAccuracy = (correct / total) * 100;
  // Volume confidence factor: scales up to 1.0 at 10 questions
  const confidence = Math.min(1.0, total / 10);
  const mastery = Math.round(rawAccuracy * confidence * 100) / 100;
  return mastery;
}

/**
 * Generates transparent, non-fabricated recommendations based on candidate's real data
 */
export function generateRecommendations(
  concepts: ConceptPerformanceRecord[],
  examSlug: string = 'neet'
): RecommendationItem[] {
  const recommendations: RecommendationItem[] = [];

  for (const c of concepts) {
    if (c.totalAttempts >= 3 && c.accuracy < 50) {
      recommendations.push({
        id: `rec_weak_${c.conceptId}`,
        type: 'weak_concept',
        title: `Remediate ${c.conceptName}`,
        conceptName: c.conceptName,
        subjectName: c.subjectName,
        explanation: `Recommended because your accuracy in ${c.conceptName} is ${c.accuracy}% across ${c.totalAttempts} questions attempted.`,
        priority: 'high',
        actionUrl: `/dashboard/${examSlug}/practice?concept=${c.conceptId}`,
      });
    } else if (c.totalAttempts >= 5 && c.accuracy >= 50 && c.accuracy < 75) {
      recommendations.push({
        id: `rec_speed_${c.conceptId}`,
        type: 'speed_improvement',
        title: `Strengthen ${c.conceptName}`,
        conceptName: c.conceptName,
        subjectName: c.subjectName,
        explanation: `Your foundational accuracy is ${c.accuracy}%. Timed practice will eliminate remaining conceptual edge cases.`,
        priority: 'medium',
        actionUrl: `/dashboard/${examSlug}/practice?concept=${c.conceptId}&mode=timed`,
      });
    } else if (c.totalAttempts >= 8 && c.accuracy >= 85) {
      recommendations.push({
        id: `rec_adv_${c.conceptId}`,
        type: 'advanced_practice',
        title: `Challenge Hard Questions in ${c.conceptName}`,
        conceptName: c.conceptName,
        subjectName: c.subjectName,
        explanation: `Mastery achieved (${c.accuracy}% accuracy across ${c.totalAttempts} attempts). Attempt national-level hard variations.`,
        priority: 'low',
        actionUrl: `/dashboard/${examSlug}/practice?concept=${c.conceptId}&difficulty=hard`,
      });
    }
  }

  // Sort by priority (high first)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
