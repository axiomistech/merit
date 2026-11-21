import { NextResponse } from 'next/server';
import { EXAMINATIONS } from '@/data/seedData';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const examSlug = searchParams.get('exam') || 'neet';

    const exam = EXAMINATIONS.find((e) => e.slug === examSlug) || EXAMINATIONS[0];

    // Build hierarchical tree
    const tree = {
      exam: {
        id: `exam_${exam.slug}`,
        slug: exam.slug,
        name: exam.name,
      },
      subjects: exam.subjects.map((sub, sIdx) => ({
        id: `sub_${sub.slug}`,
        slug: sub.slug,
        name: sub.name,
        displayOrder: sIdx + 1,
        units: [
          {
            id: `unit_${sub.slug}_1`,
            name: `${sub.name} - Core Foundations`,
            displayOrder: 1,
            chapters: [
              {
                id: `chap_${sub.slug}_1`,
                slug: sub.slug === 'physics' ? 'laws-of-motion' : sub.slug === 'chemistry' ? 'chemical-bonding' : 'cell-biology',
                name: sub.slug === 'physics' ? 'Laws of Motion & Friction' : sub.slug === 'chemistry' ? 'Chemical Bonding & Molecular Structure' : 'Cell: The Unit of Life',
                weightagePercent: 12,
                topics: [
                  { id: `top_1`, name: "Newton's First & Second Laws", questionsCount: 45 },
                  { id: `top_2`, name: 'Static & Kinetic Friction', questionsCount: 38 },
                  { id: `top_3`, name: 'Circular Motion Dynamics', questionsCount: 32 },
                ],
              },
              {
                id: `chap_${sub.slug}_2`,
                slug: sub.slug === 'physics' ? 'work-energy-power' : sub.slug === 'chemistry' ? 'thermodynamics' : 'genetics',
                name: sub.slug === 'physics' ? 'Work, Energy and Power' : sub.slug === 'chemistry' ? 'Thermodynamics' : 'Principles of Inheritance',
                weightagePercent: 10,
                topics: [
                  { id: `top_4`, name: 'Work-Energy Theorem', questionsCount: 42 },
                  { id: `top_5`, name: 'Conservation of Energy', questionsCount: 36 },
                  { id: `top_6`, name: 'Collisions in One & Two Dimensions', questionsCount: 29 },
                ],
              },
            ],
          },
        ],
      })),
    };

    return NextResponse.json({
      success: true,
      data: tree,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch syllabus hierarchy' },
      { status: 500 }
    );
  }
}
