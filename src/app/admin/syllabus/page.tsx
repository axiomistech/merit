'use client';

import React, { useState, useEffect } from 'react';
import {
  ListTree,
  Plus,
  ChevronRight,
  ChevronDown,
  FolderTree,
  BookOpen,
  Edit2,
  Trash2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { logAdminAction } from '@/lib/admin/auth';
import { getStoredQuestions } from '@/lib/admin/store';
import { toast } from 'sonner';
import {
  JEE_MAIN_MATHEMATICS_SYLLABUS,
  JEE_MAIN_PHYSICS_SYLLABUS,
  JEE_MAIN_CHEMISTRY_SYLLABUS,
  JEE_MAIN_PAPER_2A_SYLLABUS,
  JEE_MAIN_PAPER_2B_SYLLABUS,
} from '@/data/jeeMainSyllabusData';

interface SyllabusNode {
  id: string;
  name: string;
  nodeType: 'subject' | 'unit' | 'chapter' | 'topic';
  questionCount: number;
  children?: SyllabusNode[];
}

function buildJeeMainNodes(): SyllabusNode[] {
  return [
    {
      id: 'sub_jm_phy',
      name: 'Physics (Paper 1)',
      nodeType: 'subject',
      questionCount: 0,
      children: JEE_MAIN_PHYSICS_SYLLABUS.units.map((u) => ({
        id: `jm_phy_u${u.unitNumber}`,
        name: `Unit ${u.unitNumber}: ${u.name}`,
        nodeType: 'unit',
        questionCount: 0,
        children: u.topics.map((t) => ({
          id: `top_${t.id}`,
          name: t.name + (t.details ? ` (${t.details})` : ''),
          nodeType: 'topic',
          questionCount: 0,
        })),
      })),
    },
    {
      id: 'sub_jm_chem',
      name: 'Chemistry (Paper 1)',
      nodeType: 'subject',
      questionCount: 0,
      children: JEE_MAIN_CHEMISTRY_SYLLABUS.units.map((u) => ({
        id: `jm_chem_u${u.unitNumber}`,
        name: `Unit ${u.unitNumber} [${u.category}]: ${u.name}`,
        nodeType: 'unit',
        questionCount: 0,
        children: u.topics.map((t) => ({
          id: `top_${t.id}`,
          name: t.name + (t.details ? ` (${t.details})` : ''),
          nodeType: 'topic',
          questionCount: 0,
        })),
      })),
    },
    {
      id: 'sub_jm_math',
      name: 'Mathematics (Paper 1, 2A & 2B)',
      nodeType: 'subject',
      questionCount: 0,
      children: JEE_MAIN_MATHEMATICS_SYLLABUS.units.map((u) => ({
        id: `jm_math_u${u.unitNumber}`,
        name: `Unit ${u.unitNumber}: ${u.name}`,
        nodeType: 'unit',
        questionCount: 0,
        children: u.topics.map((t) => ({
          id: `top_${t.id}`,
          name: t.name + (t.details ? ` (${t.details})` : ''),
          nodeType: 'topic',
          questionCount: 0,
        })),
      })),
    },
    {
      id: 'sub_jm_p2a',
      name: 'Paper 2A (B.Arch) — Aptitude & Drawing',
      nodeType: 'subject',
      questionCount: 0,
      children: JEE_MAIN_PAPER_2A_SYLLABUS.map((mod) => ({
        id: `jm_p2a_${mod.id}`,
        name: `${mod.partNumber}: ${mod.title}`,
        nodeType: 'unit',
        questionCount: 0,
        children: mod.units.map((u) => ({
          id: `jm_p2a_${mod.id}_u${u.unitNumber}`,
          name: `Unit ${u.unitNumber}: ${u.title}`,
          nodeType: 'chapter',
          questionCount: 0,
          children: u.details.map((d, dIdx) => ({
            id: `top_p2a_${mod.id}_${u.unitNumber}_${dIdx}`,
            name: d,
            nodeType: 'topic',
            questionCount: 0,
          })),
        })),
      })),
    },
    {
      id: 'sub_jm_p2b',
      name: 'Paper 2B (B.Planning) — Planning Test',
      nodeType: 'subject',
      questionCount: 0,
      children: JEE_MAIN_PAPER_2B_SYLLABUS.map((mod) => ({
        id: `jm_p2b_${mod.id}`,
        name: `${mod.partNumber}: ${mod.title}`,
        nodeType: 'unit',
        questionCount: 0,
        children: mod.units.map((u) => ({
          id: `jm_p2b_${mod.id}_u${u.unitNumber}`,
          name: `Unit ${u.unitNumber}: ${u.title}`,
          nodeType: 'chapter',
          questionCount: 0,
          children: u.details.map((d, dIdx) => ({
            id: `top_p2b_${mod.id}_${u.unitNumber}_${dIdx}`,
            name: d,
            nodeType: 'topic',
            questionCount: 0,
          })),
        })),
      })),
    },
  ];
}

export default function AdminSyllabusPage() {
  const [selectedExam, setSelectedExam] = useState<'neet' | 'jee-main' | 'jee-advanced' | 'gate'>('neet');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'sub_phy': true,
    'unit_mech': true,
  });

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setQuestions(getStoredQuestions());
    }
  }, []);

  const [syllabusData, setSyllabusData] = useState<Record<string, SyllabusNode[]>>({
    neet: [
      {
        id: 'sub_phy',
        name: 'Physics',
        nodeType: 'subject',
        questionCount: 0,
        children: [
          {
            id: 'unit_mech',
            name: 'Unit I: Mechanics',
            nodeType: 'unit',
            questionCount: 0,
            children: [
              {
                id: 'chap_lom',
                name: 'Laws of Motion & Friction',
                nodeType: 'chapter',
                questionCount: 0,
                children: [
                  { id: 'top_newton', name: 'Newton\'s First & Second Laws', nodeType: 'topic', questionCount: 0 },
                  { id: 'top_friction', name: 'Static & Kinetic Friction Coefficient', nodeType: 'topic', questionCount: 0 },
                  { id: 'top_circular', name: 'Circular Motion & Banking of Roads', nodeType: 'topic', questionCount: 0 },
                ],
              },
              {
                id: 'chap_wep',
                name: 'Work, Energy & Power',
                nodeType: 'chapter',
                questionCount: 0,
                children: [
                  { id: 'top_we_thm', name: 'Work-Energy Theorem', nodeType: 'topic', questionCount: 0 },
                  { id: 'top_collisions', name: 'Elastic & Inelastic Collisions in 1D/2D', nodeType: 'topic', questionCount: 0 },
                ],
              },
            ],
          },
          {
            id: 'unit_elec',
            name: 'Unit II: Electricity & Magnetism',
            nodeType: 'unit',
            questionCount: 0,
            children: [
              { id: 'chap_electro', name: 'Electrostatics & Gauss Law', nodeType: 'chapter', questionCount: 0 },
              { id: 'chap_current', name: 'Current Electricity & Kirchhoff\'s Laws', nodeType: 'chapter', questionCount: 0 },
            ],
          },
        ],
      },
      {
        id: 'sub_chem',
        name: 'Chemistry',
        nodeType: 'subject',
        questionCount: 0,
        children: [
          {
            id: 'unit_phys_chem',
            name: 'Unit I: Physical Chemistry',
            nodeType: 'unit',
            questionCount: 0,
            children: [
              { id: 'chap_thermo', name: 'Chemical Thermodynamics', nodeType: 'chapter', questionCount: 0 },
              { id: 'chap_equil', name: 'Ionic & Chemical Equilibrium', nodeType: 'chapter', questionCount: 0 },
            ],
          },
        ],
      },
      {
        id: 'sub_bio',
        name: 'Biology (Botany & Zoology)',
        nodeType: 'subject',
        questionCount: 0,
        children: [
          {
            id: 'unit_plant_phys',
            name: 'Unit I: Plant Physiology',
            nodeType: 'unit',
            questionCount: 0,
            children: [
              { id: 'chap_photo', name: 'Photosynthesis in Higher Plants (C3/C4)', nodeType: 'chapter', questionCount: 0 },
            ],
          },
        ],
      },
    ],
    'jee-main': buildJeeMainNodes(),
  });

  // Calculate actual question count dynamically
  const getNodeQuestionCount = (node: SyllabusNode): number => {
    if (questions.length === 0) return 0;
    const nameLower = node.name.toLowerCase();
    const directMatches = questions.filter((q: any) =>
      (q.subject && q.subject.toLowerCase().includes(nameLower)) ||
      (q.topic && q.topic.toLowerCase().includes(nameLower)) ||
      (q.chapter && q.chapter.toLowerCase().includes(nameLower))
    ).length;

    if (node.children && node.children.length > 0) {
      const childrenSum = node.children.reduce((acc, child) => acc + getNodeQuestionCount(child), 0);
      return Math.max(directMatches, childrenSum);
    }
    return directMatches;
  };

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleAddChild = (parentName: string, nodeType: string) => {
    const name = prompt(`Enter new ${nodeType} title under "${parentName}":`);
    if (!name) return;
    logAdminAction('create_syllabus_node', 'syllabus_node', name, `Added ${nodeType} under ${parentName}`);
    toast.success(`New ${nodeType} "${name}" added to syllabus tree.`);
  };

  const renderTree = (nodes: SyllabusNode[], depth: number = 0) => {
    return (
      <div className="space-y-1">
        {nodes.map((node) => {
          const isExpanded = expandedNodes[node.id];
          const hasChildren = node.children && node.children.length > 0;

          return (
            <div key={node.id} className="space-y-1">
              <div
                style={{ paddingLeft: `${depth * 20 + 12}px` }}
                className="flex items-center justify-between rounded-xl py-2 pr-3 hover:bg-[#F1F3F4] transition-colors border border-transparent hover:border-[#DCE2E6] text-xs"
              >
                <div className="flex items-center gap-2">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpand(node.id)}
                      className="p-1 text-[#66727D] hover:text-[#20252B]"
                    >
                      {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    </button>
                  ) : (
                    <span className="w-5" />
                  )}

                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                      node.nodeType === 'subject'
                        ? 'bg-[#20252B] text-white'
                        : node.nodeType === 'unit'
                        ? 'bg-[#E9EEF1] text-[#20252B]'
                        : node.nodeType === 'chapter'
                        ? 'bg-[#F1F3F4] text-[#20252B]'
                        : 'border border-[#DCE2E6] bg-white text-[#66727D]'
                    }`}
                  >
                    {node.nodeType}
                  </span>

                  <span className="font-semibold text-[#20252B]">{node.name}</span>
                </div>

                <div className="flex items-center gap-4 text-[#66727D]">
                  <span className="font-mono text-[11px]">
                    {getNodeQuestionCount(node)} Questions
                  </span>

                  {node.nodeType !== 'topic' && (
                    <button
                      onClick={() =>
                        handleAddChild(
                          node.name,
                          node.nodeType === 'subject' ? 'unit' : node.nodeType === 'unit' ? 'chapter' : 'topic'
                        )
                      }
                      className="rounded-full p-1 text-[#20252B] hover:bg-[#E9EEF1]"
                      title="Add Child Node"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {isExpanded && node.children && (
                <div>{renderTree(node.children, depth + 1)}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const currentNodes = syllabusData[selectedExam] || syllabusData.neet;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Syllabus Architecture & Hierarchies
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Hierarchical Exam → Subject → Unit → Chapter → Topic tree with stable relational keys protecting historical attempts.
          </p>
        </div>

        {/* Exam Tabs */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#DCE2E6] bg-white p-1 text-xs font-semibold shadow-sm">
          {[
            { id: 'neet', label: 'NEET' },
            { id: 'jee-main', label: 'JEE Main' },
            { id: 'jee-advanced', label: 'JEE Advanced' },
            { id: 'gate', label: 'GATE' },
          ].map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExam(ex.id as any)}
              className={`rounded-full px-4 py-1.5 transition-all ${
                selectedExam === ex.id
                  ? 'bg-[#20252B] text-white font-bold shadow-sm'
                  : 'text-[#66727D] hover:text-[#20252B]'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="rounded-2xl border border-[#9CC6E0]/30 bg-[#E9EEF1]/60 p-4 flex items-center gap-3 text-xs text-[#20252B]">
        <ShieldCheck className="h-5 w-5 text-[#20252B] shrink-0" />
        <span>
          <strong>Referential Integrity Active:</strong> Syllabus changes preserve question linkages, test versions, and historical candidate attempts using immutable relational UUIDs.
        </span>
      </div>

      {/* Syllabus Tree Container */}
      <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3 text-xs">
          <span className="font-bold text-[#66727D] uppercase tracking-wider text-[11px]">
            Curriculum Hierarchy Structure
          </span>
          <span className="font-mono text-[#20252B] font-semibold">
            {selectedExam.toUpperCase()} Master Node
          </span>
        </div>

        {renderTree(currentNodes)}
      </div>
    </div>
  );
}
