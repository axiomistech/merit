import { NextResponse } from 'next/server';
import { EXAMINATIONS } from '@/data/seedData';
import {
  JEE_MAIN_MATHEMATICS_SYLLABUS,
  JEE_MAIN_PHYSICS_SYLLABUS,
  JEE_MAIN_CHEMISTRY_SYLLABUS,
  JEE_MAIN_PAPER_2A_SYLLABUS,
  JEE_MAIN_PAPER_2B_SYLLABUS,
} from '@/data/jeeMainSyllabusData';
import {
  NEET_PHYSICS_SYLLABUS,
  NEET_CHEMISTRY_SYLLABUS,
  NEET_BIOLOGY_SYLLABUS,
  NEET_SYLLABUS_OVERVIEW,
} from '@/data/neetSyllabusData';
import {
  JEE_ADVANCED_PHYSICS_SYLLABUS,
  JEE_ADVANCED_CHEMISTRY_SYLLABUS,
  JEE_ADVANCED_MATHEMATICS_SYLLABUS,
  JEE_ADVANCED_EXCLUSIVE_TOPICS,
  JEE_ADVANCED_SYLLABUS_OVERVIEW,
} from '@/data/jeeAdvancedSyllabusData';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const examSlug = searchParams.get('exam') || 'jee-main';

    // 1. NEET (UG) Master Hierarchy (50 Units)
    if (examSlug === 'neet') {
      const tree = {
        exam: {
          id: 'exam_neet',
          slug: 'neet',
          name: NEET_SYLLABUS_OVERVIEW.examName,
          governingBody: NEET_SYLLABUS_OVERVIEW.governingBody,
          academicSession: NEET_SYLLABUS_OVERVIEW.academicSession,
          totalUnits: NEET_SYLLABUS_OVERVIEW.totalUnits,
          description: 'Official NMC/NTA Curriculum covering 50 units across Physics, Chemistry, and Biology (Botany & Zoology).',
          blueprint: NEET_SYLLABUS_OVERVIEW,
        },
        subjects: [
          {
            id: 'sub_neet_physics',
            slug: 'physics',
            name: 'Physics',
            displayOrder: 1,
            totalUnits: NEET_PHYSICS_SYLLABUS.totalUnits,
            units: NEET_PHYSICS_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    isHighYield: t.isHighYield,
                    questionsCount: Math.floor(Math.random() * 25) + 30,
                  })),
                },
              ],
            })),
          },
          {
            id: 'sub_neet_chemistry',
            slug: 'chemistry',
            name: 'Chemistry',
            displayOrder: 2,
            totalUnits: NEET_CHEMISTRY_SYLLABUS.totalUnits,
            units: NEET_CHEMISTRY_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              category: u.category,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  category: u.category,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    isHighYield: t.isHighYield,
                    questionsCount: Math.floor(Math.random() * 25) + 30,
                  })),
                },
              ],
            })),
          },
          {
            id: 'sub_neet_biology',
            slug: 'biology',
            name: 'Biology',
            displayOrder: 3,
            totalUnits: NEET_BIOLOGY_SYLLABUS.totalUnits,
            units: NEET_BIOLOGY_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              category: u.category,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  category: u.category,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    isHighYield: t.isHighYield,
                    questionsCount: Math.floor(Math.random() * 30) + 40,
                  })),
                },
              ],
            })),
          },
        ],
        strategicInsights: NEET_SYLLABUS_OVERVIEW.strategicInsights,
      };

      return NextResponse.json({
        success: true,
        data: tree,
      });
    }

    // 2. JEE (Advanced) Master Hierarchy (50 Units / Non-Rationalized Scope)
    if (examSlug === 'jee-advanced' || examSlug === 'jee-adv') {
      const tree = {
        exam: {
          id: 'exam_jee-advanced',
          slug: 'jee-advanced',
          name: JEE_ADVANCED_SYLLABUS_OVERVIEW.examName,
          governingBody: JEE_ADVANCED_SYLLABUS_OVERVIEW.governingBody,
          academicSession: JEE_ADVANCED_SYLLABUS_OVERVIEW.academicSession,
          totalUnits: JEE_ADVANCED_SYLLABUS_OVERVIEW.totalUnits,
          description: 'Official IIT Joint Admission Board (JAB) Curriculum covering Physics (7 Domains), Chemistry (34 Units), and Mathematics (9 Disciplines).',
          blueprint: JEE_ADVANCED_SYLLABUS_OVERVIEW,
          exclusiveTopics: JEE_ADVANCED_EXCLUSIVE_TOPICS,
        },
        subjects: [
          {
            id: 'sub_ja_chemistry',
            slug: 'chemistry',
            name: 'Chemistry',
            displayOrder: 1,
            totalUnits: JEE_ADVANCED_CHEMISTRY_SYLLABUS.totalUnits,
            units: JEE_ADVANCED_CHEMISTRY_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              category: u.category,
              description: u.description,
              weightagePercent: u.weightagePercent,
              isRetainedInAdvancedOnly: u.isRetainedInAdvancedOnly,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  category: u.category,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    isHighYield: t.isHighYield,
                    isRetainedInAdvancedOnly: t.isRetainedInAdvancedOnly,
                    questionsCount: Math.floor(Math.random() * 25) + 30,
                  })),
                },
              ],
            })),
          },
          {
            id: 'sub_ja_mathematics',
            slug: 'mathematics',
            name: 'Mathematics',
            displayOrder: 2,
            totalUnits: JEE_ADVANCED_MATHEMATICS_SYLLABUS.totalUnits,
            units: JEE_ADVANCED_MATHEMATICS_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              category: u.category,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  category: u.category,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    isHighYield: t.isHighYield,
                    isRetainedInAdvancedOnly: t.isRetainedInAdvancedOnly,
                    questionsCount: Math.floor(Math.random() * 25) + 30,
                  })),
                },
              ],
            })),
          },
          {
            id: 'sub_ja_physics',
            slug: 'physics',
            name: 'Physics',
            displayOrder: 3,
            totalUnits: JEE_ADVANCED_PHYSICS_SYLLABUS.totalUnits,
            units: JEE_ADVANCED_PHYSICS_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Domain ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              category: u.category,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  category: u.category,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    isHighYield: t.isHighYield,
                    isRetainedInAdvancedOnly: t.isRetainedInAdvancedOnly,
                    questionsCount: Math.floor(Math.random() * 25) + 30,
                  })),
                },
              ],
            })),
          },
        ],
        exclusiveTopics: JEE_ADVANCED_EXCLUSIVE_TOPICS,
        strategicInsights: JEE_ADVANCED_SYLLABUS_OVERVIEW.strategicInsights,
      };

      return NextResponse.json({
        success: true,
        data: tree,
      });
    }

    // 3. JEE Main Master Hierarchy (54 Units)
    if (examSlug === 'jee-main' || examSlug === 'jee') {
      const tree = {
        exam: {
          id: 'exam_jee-main',
          slug: 'jee-main',
          name: 'Joint Entrance Examination (Main) - 2027',
          description: 'Official NTA Curriculum covering Paper 1 (B.E./B.Tech.), Paper 2A (B.Arch.), and Paper 2B (B.Planning).',
        },
        subjects: [
          {
            id: 'sub_physics',
            slug: 'physics',
            name: 'Physics',
            displayOrder: 1,
            totalUnits: JEE_MAIN_PHYSICS_SYLLABUS.totalUnits,
            units: JEE_MAIN_PHYSICS_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    questionsCount: Math.floor(Math.random() * 25) + 20,
                  })),
                },
              ],
            })),
          },
          {
            id: 'sub_chemistry',
            slug: 'chemistry',
            name: 'Chemistry',
            displayOrder: 2,
            totalUnits: JEE_MAIN_CHEMISTRY_SYLLABUS.totalUnits,
            units: JEE_MAIN_CHEMISTRY_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              category: u.category,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  category: u.category,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    questionsCount: Math.floor(Math.random() * 25) + 20,
                  })),
                },
              ],
            })),
          },
          {
            id: 'sub_mathematics',
            slug: 'mathematics',
            name: 'Mathematics',
            displayOrder: 3,
            totalUnits: JEE_MAIN_MATHEMATICS_SYLLABUS.totalUnits,
            units: JEE_MAIN_MATHEMATICS_SYLLABUS.units.map((u) => ({
              id: u.id,
              name: `Unit ${u.unitNumber}: ${u.name}`,
              unitNumber: u.unitNumber,
              slug: u.slug,
              description: u.description,
              weightagePercent: u.weightagePercent,
              displayOrder: u.unitNumber,
              chapters: [
                {
                  id: `chap_${u.slug}`,
                  slug: u.slug,
                  name: u.name,
                  weightagePercent: u.weightagePercent,
                  topics: u.topics.map((t) => ({
                    id: t.id,
                    name: t.name,
                    details: t.details,
                    questionsCount: Math.floor(Math.random() * 25) + 20,
                  })),
                },
              ],
            })),
          },
        ],
        paper2Modules: {
          paper2A_BArch: JEE_MAIN_PAPER_2A_SYLLABUS,
          paper2B_BPlanning: JEE_MAIN_PAPER_2B_SYLLABUS,
        },
      };

      return NextResponse.json({
        success: true,
        data: tree,
      });
    }

    const exam = EXAMINATIONS.find((e) => e.slug === examSlug) || EXAMINATIONS[0];

    // Build default hierarchical tree for other exams
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
