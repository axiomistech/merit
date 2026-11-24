import { describe, it, expect } from 'vitest';
import {
  JEE_ADVANCED_CHEMISTRY_SYLLABUS,
  JEE_ADVANCED_MATHEMATICS_SYLLABUS,
  JEE_ADVANCED_PHYSICS_SYLLABUS,
  JEE_ADVANCED_EXCLUSIVE_TOPICS,
  JEE_ADVANCED_SYLLABUS_OVERVIEW,
} from '@/data/jeeAdvancedSyllabusData';
import { GET as getSyllabusRoute } from '@/app/api/syllabus/route';

describe('JEE (Advanced) Official Syllabus Integrity', () => {
  it('covers all official units across Chemistry, Mathematics, and Physics', () => {
    expect(JEE_ADVANCED_CHEMISTRY_SYLLABUS.units.length).toBe(34);
    expect(JEE_ADVANCED_MATHEMATICS_SYLLABUS.units.length).toBe(9);
    expect(JEE_ADVANCED_PHYSICS_SYLLABUS.units.length).toBe(7);

    // Total units in overview must equal 50
    const totalUnits =
      JEE_ADVANCED_CHEMISTRY_SYLLABUS.units.length +
      JEE_ADVANCED_MATHEMATICS_SYLLABUS.units.length +
      JEE_ADVANCED_PHYSICS_SYLLABUS.units.length;
    expect(totalUnits).toBe(50);
    expect(JEE_ADVANCED_SYLLABUS_OVERVIEW.totalUnits.overall).toBe(50);
  });

  it('explicitly retains all classical topics dropped from JEE Main and NEET', () => {
    expect(JEE_ADVANCED_EXCLUSIVE_TOPICS.length).toBeGreaterThanOrEqual(14);

    const retainedTopicSlugs = JEE_ADVANCED_CHEMISTRY_SYLLABUS.units
      .filter((u) => u.isRetainedInAdvancedOnly)
      .map((u) => u.slug);

    // Verify critical chapters are retained
    expect(retainedTopicSlugs).toContain('states-of-matter-gases-liquids');
    expect(retainedTopicSlugs).toContain('solid-state');
    expect(retainedTopicSlugs).toContain('surface-chemistry');
    expect(retainedTopicSlugs).toContain('hydrogen');
    expect(retainedTopicSlugs).toContain('s-block-elements');
    expect(retainedTopicSlugs).toContain('isolation-of-metals');
    expect(retainedTopicSlugs).toContain('environmental-chemistry');
    expect(retainedTopicSlugs).toContain('polymers-everyday-life');

    // Physics retained topics
    const physicsTopics = JEE_ADVANCED_PHYSICS_SYLLABUS.units.flatMap((u) => u.topics);
    const carnot = physicsTopics.find((t) => t.name.includes('Carnot'));
    const damped = physicsTopics.find((t) => t.name.includes('Damped'));
    const xrays = physicsTopics.find((t) => t.name.includes('X-Rays'));
    const postOffice = physicsTopics.find((t) => t.name.includes('Post Office Box'));

    expect(carnot).toBeDefined();
    expect(carnot?.isRetainedInAdvancedOnly).toBe(true);
    expect(damped).toBeDefined();
    expect(damped?.isRetainedInAdvancedOnly).toBe(true);
    expect(xrays).toBeDefined();
    expect(xrays?.isRetainedInAdvancedOnly).toBe(true);
    expect(postOffice).toBeDefined();
    expect(postOffice?.isRetainedInAdvancedOnly).toBe(true);

    // Mathematics retained topics
    const mathTopics = JEE_ADVANCED_MATHEMATICS_SYLLABUS.units.flatMap((u) => u.topics);
    const vtp = mathTopics.find((t) => t.name.includes('Vector Triple Product'));
    const stp = mathTopics.find((t) => t.name.includes('Scalar Triple Product'));
    expect(vtp).toBeDefined();
    expect(vtp?.isRetainedInAdvancedOnly).toBe(true);
    expect(stp).toBeDefined();
    expect(stp?.isRetainedInAdvancedOnly).toBe(true);
  });

  it('serves official JEE Advanced hierarchy from /api/syllabus?exam=jee-advanced', async () => {
    const req = new Request('http://localhost:3000/api/syllabus?exam=jee-advanced');
    const res = await getSyllabusRoute(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.exam.slug).toBe('jee-advanced');
    expect(json.data.subjects.length).toBe(3);

    const chem = json.data.subjects.find((s: any) => s.slug === 'chemistry');
    const math = json.data.subjects.find((s: any) => s.slug === 'mathematics');
    const phy = json.data.subjects.find((s: any) => s.slug === 'physics');

    expect(chem.totalUnits).toBe(34);
    expect(math.totalUnits).toBe(9);
    expect(phy.totalUnits).toBe(7);
    expect(json.data.exclusiveTopics.length).toBeGreaterThanOrEqual(14);
  });
});
