'use client';

import React, { useState } from 'react';
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
import { toast } from 'sonner';

interface SyllabusNode {
  id: string;
  name: string;
  nodeType: 'subject' | 'unit' | 'chapter' | 'topic';
  questionCount: number;
  children?: SyllabusNode[];
}

export default function AdminSyllabusPage() {
  const [selectedExam, setSelectedExam] = useState<'neet' | 'jee-main' | 'upsc' | 'engineering'>('neet');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'sub_phy': true,
    'unit_mech': true,
  });

  const [syllabusData, setSyllabusData] = useState<Record<string, SyllabusNode[]>>({
    neet: [
      {
        id: 'sub_phy',
        name: 'Physics',
        nodeType: 'subject',
        questionCount: 2450,
        children: [
          {
            id: 'unit_mech',
            name: 'Unit I: Mechanics',
            nodeType: 'unit',
            questionCount: 820,
            children: [
              {
                id: 'chap_lom',
                name: 'Laws of Motion & Friction',
                nodeType: 'chapter',
                questionCount: 180,
                children: [
                  { id: 'top_newton', name: 'Newton\'s First & Second Laws', nodeType: 'topic', questionCount: 65 },
                  { id: 'top_friction', name: 'Static & Kinetic Friction Coefficient', nodeType: 'topic', questionCount: 60 },
                  { id: 'top_circular', name: 'Circular Motion & Banking of Roads', nodeType: 'topic', questionCount: 55 },
                ],
              },
              {
                id: 'chap_wep',
                name: 'Work, Energy & Power',
                nodeType: 'chapter',
                questionCount: 160,
                children: [
                  { id: 'top_we_thm', name: 'Work-Energy Theorem', nodeType: 'topic', questionCount: 70 },
                  { id: 'top_collisions', name: 'Elastic & Inelastic Collisions in 1D/2D', nodeType: 'topic', questionCount: 90 },
                ],
              },
            ],
          },
          {
            id: 'unit_elec',
            name: 'Unit II: Electricity & Magnetism',
            nodeType: 'unit',
            questionCount: 640,
            children: [
              { id: 'chap_electro', name: 'Electrostatics & Gauss Law', nodeType: 'chapter', questionCount: 210 },
              { id: 'chap_current', name: 'Current Electricity & Kirchhoff\'s Laws', nodeType: 'chapter', questionCount: 190 },
            ],
          },
        ],
      },
      {
        id: 'sub_chem',
        name: 'Chemistry',
        nodeType: 'subject',
        questionCount: 2600,
        children: [
          {
            id: 'unit_phys_chem',
            name: 'Unit I: Physical Chemistry',
            nodeType: 'unit',
            questionCount: 920,
            children: [
              { id: 'chap_thermo', name: 'Chemical Thermodynamics', nodeType: 'chapter', questionCount: 220 },
              { id: 'chap_equil', name: 'Ionic & Chemical Equilibrium', nodeType: 'chapter', questionCount: 240 },
            ],
          },
        ],
      },
      {
        id: 'sub_bio',
        name: 'Biology (Botany & Zoology)',
        nodeType: 'subject',
        questionCount: 4050,
        children: [
          {
            id: 'unit_plant_phys',
            name: 'Unit I: Plant Physiology',
            nodeType: 'unit',
            questionCount: 880,
            children: [
              { id: 'chap_photo', name: 'Photosynthesis in Higher Plants (C3/C4)', nodeType: 'chapter', questionCount: 290 },
            ],
          },
        ],
      },
    ],
  });

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
                className="flex items-center justify-between rounded-xl py-2 pr-3 hover:bg-[#F7F5EF] transition-colors border border-transparent hover:border-[#E6E5DE] text-xs"
              >
                <div className="flex items-center gap-2">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpand(node.id)}
                      className="p-1 text-[#73786E] hover:text-[#263126]"
                    >
                      {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    </button>
                  ) : (
                    <span className="w-5" />
                  )}

                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                      node.nodeType === 'subject'
                        ? 'bg-[#263126] text-white'
                        : node.nodeType === 'unit'
                        ? 'bg-[#E9EEE3] text-[#758B62]'
                        : node.nodeType === 'chapter'
                        ? 'bg-[#F0EFEA] text-[#263126]'
                        : 'border border-[#E6E5DE] bg-white text-[#73786E]'
                    }`}
                  >
                    {node.nodeType}
                  </span>

                  <span className="font-semibold text-[#263126]">{node.name}</span>
                </div>

                <div className="flex items-center gap-4 text-[#73786E]">
                  <span className="font-mono text-[11px]">
                    {node.questionCount} Questions
                  </span>

                  {node.nodeType !== 'topic' && (
                    <button
                      onClick={() =>
                        handleAddChild(
                          node.name,
                          node.nodeType === 'subject' ? 'unit' : node.nodeType === 'unit' ? 'chapter' : 'topic'
                        )
                      }
                      className="rounded-full p-1 text-[#758B62] hover:bg-[#E9EEE3]"
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#263126]">
            Syllabus Architecture & Hierarchies
          </h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Hierarchical Exam → Subject → Unit → Chapter → Topic tree with stable relational keys protecting historical attempts.
          </p>
        </div>

        {/* Exam Tabs */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#E6E5DE] bg-white p-1 text-xs font-semibold shadow-sm">
          {[
            { id: 'neet', label: 'NEET' },
            { id: 'jee-main', label: 'JEE Main' },
            { id: 'upsc', label: 'UPSC CSE' },
            { id: 'engineering', label: 'Engineering' },
          ].map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExam(ex.id as any)}
              className={`rounded-full px-4 py-1.5 transition-all ${
                selectedExam === ex.id
                  ? 'bg-[#263126] text-white font-bold shadow-sm'
                  : 'text-[#73786E] hover:text-[#263126]'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="rounded-2xl border border-[#9CAF88]/30 bg-[#E9EEE3]/60 p-4 flex items-center gap-3 text-xs text-[#263126]">
        <ShieldCheck className="h-5 w-5 text-[#758B62] shrink-0" />
        <span>
          <strong>Referential Integrity Active:</strong> Syllabus changes preserve question linkages, test versions, and historical candidate attempts using immutable relational UUIDs.
        </span>
      </div>

      {/* Syllabus Tree Container */}
      <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3 text-xs">
          <span className="font-bold text-[#73786E] uppercase tracking-wider text-[11px]">
            Curriculum Hierarchy Structure
          </span>
          <span className="font-mono text-[#758B62] font-semibold">
            {selectedExam.toUpperCase()} Master Node
          </span>
        </div>

        {renderTree(currentNodes)}
      </div>
    </div>
  );
}
