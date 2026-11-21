import jsPDF from 'jspdf';
import { AnswerState } from '@/types/exam';

export interface GenerateOmrPdfInput {
  studentName: string;
  registrationId: string;
  examName: string;
  paperName: string;
  attemptId: string;
  date: string;
  totalQuestions: number;
  answers: Record<string, AnswerState>;
  questionIdMap: Record<number, string>;
}

export function generateOmrPdf(input: GenerateOmrPdfInput) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4', // 210mm x 297mm
  });

  const {
    studentName,
    registrationId,
    examName,
    paperName,
    attemptId,
    date,
    totalQuestions,
    answers,
    questionIdMap,
  } = input;

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;

  // Outer border & header frame
  doc.setDrawColor(38, 49, 38); // Deep forest #263126
  doc.setLineWidth(0.6);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

  // Brand Header (Deep Forest Green)
  doc.setFillColor(38, 49, 38);
  doc.rect(margin, margin, pageWidth - 2 * margin, 24, 'F');

  doc.setTextColor(247, 245, 239); // Warm off-white
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('FORT LEARNING', margin + 6, margin + 10);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 229, 211); // Sage soft
  doc.text('KNOWLEDGE. BUILT STRONG. • OFFICIAL OMR RESPONSE SHEET', margin + 6, margin + 16);

  // Student & Exam Metadata Box
  doc.setFillColor(247, 245, 239); // Off-white #F7F5EF
  doc.rect(margin + 4, margin + 28, pageWidth - 2 * margin - 8, 22, 'F');
  doc.setDrawColor(230, 229, 222); // Border #E6E5DE
  doc.setLineWidth(0.3);
  doc.rect(margin + 4, margin + 28, pageWidth - 2 * margin - 8, 22);

  doc.setTextColor(38, 49, 38);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Candidate Name:', margin + 8, margin + 35);
  doc.setFont('helvetica', 'normal');
  doc.text(studentName, margin + 38, margin + 35);

  doc.setFont('helvetica', 'bold');
  doc.text('Registration ID:', margin + 105, margin + 35);
  doc.setFont('helvetica', 'normal');
  doc.text(registrationId, margin + 132, margin + 35);

  doc.setFont('helvetica', 'bold');
  doc.text('Examination:', margin + 8, margin + 44);
  doc.setFont('helvetica', 'normal');
  doc.text(`${examName} — ${paperName}`, margin + 38, margin + 44);

  doc.setFont('helvetica', 'bold');
  doc.text('Date & Attempt:', margin + 105, margin + 44);
  doc.setFont('helvetica', 'normal');
  doc.text(`${date} • ${attemptId}`, margin + 132, margin + 44);

  // Instructions Bar
  doc.setFontSize(7.5);
  doc.setTextColor(115, 120, 110);
  doc.text(
    'INSTRUCTIONS: Fill the bubble completely using blue/black ballpoint pen. Darken only one circle per question.',
    margin + 6,
    margin + 56
  );

  // OMR Bubble Columns Layout
  const cols = 4;
  const questionsPerCol = Math.ceil(Math.min(totalQuestions, 100) / cols);
  const colWidth = (pageWidth - 2 * margin - 8) / cols;
  const startY = margin + 62;
  const rowHeight = 7.5;
  const bubbleRadius = 2.1;

  for (let i = 1; i <= Math.min(totalQuestions, 100); i++) {
    const colIndex = Math.floor((i - 1) / questionsPerCol);
    const rowIndex = (i - 1) % questionsPerCol;

    const x = margin + 5 + colIndex * colWidth;
    const y = startY + rowIndex * rowHeight;

    // Row separator background alternate (Matte gray #F0EFEA)
    if (rowIndex % 2 === 0) {
      doc.setFillColor(240, 239, 234);
      doc.rect(x - 1, y - 4, colWidth - 2, rowHeight, 'F');
    }

    // Question number
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(46, 51, 45);
    doc.text(`${i.toString().padStart(2, '0')}.`, x, y);

    // Get answered state
    const qId = questionIdMap[i];
    const ans = qId ? answers[qId] : undefined;
    const selectedOption = ans?.selectedOptions?.[0];

    const options = ['A', 'B', 'C', 'D'];
    const bubbleStartX = x + 10;
    const bubbleGap = 7.5;

    options.forEach((opt, optIndex) => {
      const bx = bubbleStartX + optIndex * bubbleGap;
      const by = y - 1.2;

      const isSelected = selectedOption === opt;

      if (isSelected) {
        // Darkened filled bubble (Solid Ink)
        doc.setFillColor(38, 49, 38);
        doc.circle(bx, by, bubbleRadius, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.text(opt, bx - 1.2, by + 1);
      } else {
        // Clear outline bubble
        doc.setDrawColor(180, 185, 175);
        doc.setLineWidth(0.3);
        doc.circle(bx, by, bubbleRadius, 'S');
        doc.setTextColor(115, 120, 110);
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'normal');
        doc.text(opt, bx - 1.2, by + 1);
      }
    });
  }

  // Footer & Verification Bar
  doc.setDrawColor(230, 229, 222);
  doc.line(margin + 4, pageHeight - margin - 15, pageWidth - margin - 4, pageHeight - margin - 15);

  doc.setFontSize(7);
  doc.setTextColor(146, 149, 141);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Verified Response Sheet • Generated by FORT Examination Engine • Hash: ${attemptId.slice(0, 12)}`,
    margin + 6,
    pageHeight - margin - 8
  );
  doc.text('FORTLEARNING.COM', pageWidth - margin - 40, pageHeight - margin - 8);

  const cleanFilename = `FORT-${examName.replace(/[^a-zA-Z0-9]/g, '_')}-OMR-${attemptId}.pdf`;
  doc.save(cleanFilename);
}
