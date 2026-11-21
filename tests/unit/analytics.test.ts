import { describe, it, expect } from 'vitest';
import { calculateConceptMastery, generateRecommendations, ConceptPerformanceRecord } from '@/lib/analytics/engine';

describe('FORT Analytics & Intelligence Engine', () => {
  it('calculates volume-weighted concept mastery score properly', () => {
    // 1 question correct out of 1 should not grant 100% mastery
    const oneAttempt = calculateConceptMastery(1, 1);
    expect(oneAttempt).toBe(10); // 100% * 0.1 confidence

    // 10 questions correct out of 10 gives 100%
    const tenAttempts = calculateConceptMastery(10, 10);
    expect(tenAttempts).toBe(100);

    // 4 out of 10 gives 40%
    const fourOfTen = calculateConceptMastery(4, 10);
    expect(fourOfTen).toBe(40);
  });

  it('generates transparent, data-driven recommendations with explanations', () => {
    const concepts: ConceptPerformanceRecord[] = [
      {
        conceptId: 'c1',
        conceptName: 'Electrostatics',
        subjectName: 'Physics',
        totalAttempts: 12,
        correctCount: 4,
        accuracy: 33.33,
        masteryScore: 33.33,
      },
      {
        conceptId: 'c2',
        conceptName: 'Chemical Thermodynamics',
        subjectName: 'Chemistry',
        totalAttempts: 10,
        correctCount: 9,
        accuracy: 90,
        masteryScore: 90,
      },
    ];

    const recs = generateRecommendations(concepts, 'neet');
    expect(recs.length).toBe(2);
    expect(recs[0].type).toBe('weak_concept');
    expect(recs[0].conceptName).toBe('Electrostatics');
    expect(recs[0].explanation).toContain('33.33% across 12 questions attempted');
    expect(recs[0].priority).toBe('high');

    expect(recs[1].type).toBe('advanced_practice');
    expect(recs[1].conceptName).toBe('Chemical Thermodynamics');
  });
});
