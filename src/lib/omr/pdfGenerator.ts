import jsPDF from 'jspdf';
import { AnswerState } from '@/types/exam';
import { generateBarcodeModules } from './barcode';

export interface GenerateOmrPdfInput {
  studentName: string;
  registrationId: string;
  examName?: string;
  paperName?: string;
  attemptId: string;
  date?: string;
  submissionTime?: string;
  rollNumber?: string;
  testBookletNo?: string;
  testBookletCode?: string;
  motherName?: string;
  fatherName?: string;
  totalQuestions?: number;
  answers: Record<string, AnswerState>;
  questionIdMap: Record<number, string>;
  autoDownload?: boolean;
}

export function generateOmrPdf(input: GenerateOmrPdfInput): jsPDF {
  const {
    studentName = 'DHANUSH JAGADEESH',
    registrationId = 'MW-26-000001',
    attemptId = 'ATT-20261121',
    submissionTime,
    rollNumber,
    testBookletNo = '1234567',
    testBookletCode = 'A',
    motherName = '',
    fatherName = '',
    answers = {},
    questionIdMap = {},
    autoDownload = true,
  } = input;

  // Initialize A4 portrait document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4', // 210mm x 297mm
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // Color constants matching the reference
  const redBorder = [212, 93, 76]; // #D45D4C - Thin reddish border
  const sageHeader = [220, 229, 211]; // #D7E7F2 - Light sage section headers
  const darkForest = [38, 49, 38]; // #20252B - Text
  const graphiteBlack = [17, 17, 17]; // #111111 - Filled bubble graphite fill

  // Formatted numeric roll number (10 digits)
  // Extract digits from registration ID (e.g. MW-26-000001 -> 2600000001)
  const numericOnly = (rollNumber || registrationId).replace(/\D/g, '');
  const rollDigits = (numericOnly.length >= 10
    ? numericOnly.slice(-10)
    : numericOnly.padStart(10, '0')
  ).split('');

  // 7-digit test booklet number
  const bookletDigits = testBookletNo.replace(/\D/g, '').padStart(7, '0').slice(-7).split('');

  // Timing Marks (Optical Alignment Black Rectangles)
  doc.setFillColor(0, 0, 0);
  // Left margin timing blocks
  for (let y = 14; y < pageHeight - 12; y += 7) {
    doc.rect(2.5, y, 3.5, 3.2, 'F');
  }
  // Right margin timing blocks
  for (let y = 14; y < pageHeight - 12; y += 7) {
    doc.rect(pageWidth - 6, y, 3.5, 3.2, 'F');
  }
  // Top calibration blocks
  doc.rect(12, 3, 6, 2.5, 'F');
  doc.rect(pageWidth - 18, 3, 6, 2.5, 'F');

  // --- HEADER SECTION (y: 6 to 22) ---
  const headerY = 7;

  // MERITWISE Logo (Left)
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('MERITWISE', 10, headerY + 4);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Examination System', 10, headerY + 8);

  // Center Instruction Capsule
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.setLineWidth(0.25);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(48, headerY, 104, 10, 2, 2, 'FD');

  doc.setFontSize(5.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text(
    'The candidate should ensure that Roll No. and Test Booklet No. have been filled and',
    100,
    headerY + 4,
    { align: 'center' }
  );
  doc.text(
    'marked correctly and Test Booklet Code printed in this sheet and Test Booklet is the same.',
    100,
    headerY + 7.5,
    { align: 'center' }
  );

  // Right Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('NEET OMR ANSWER SHEET', pageWidth - 9, headerY + 6, { align: 'right' });

  // --- VERTICAL BRANDING RIBBON ON LEFT ---
  // "MERITWISE Practice with purpose. Progress with merit."
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(115, 120, 110);

  // --- MAIN BODY SECTION (y: 20 to 242) ---
  const bodyY = 19;
  const leftColX = 10;
  const leftColWidth = 44;
  const answerGridX = 57;
  const answerGridWidth = pageWidth - answerGridX - 8; // ~145mm

  // 1. ROLL NO. BOX
  const rollBoxY = bodyY;
  const rollBoxHeight = 58;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.setLineWidth(0.3);
  doc.rect(leftColX, rollBoxY, leftColWidth, rollBoxHeight);

  // Header: ROLL No.
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(leftColX, rollBoxY, leftColWidth, 5, 'F');
  doc.line(leftColX, rollBoxY + 5, leftColX + leftColWidth, rollBoxY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text('ROLL No.', leftColX + leftColWidth / 2, rollBoxY + 3.8, { align: 'center' });

  // 10 Digit Boxes
  const digitBoxWidth = leftColWidth / 10;
  const digitBoxHeight = 5.5;
  const digitBoxY = rollBoxY + 5.5;

  for (let i = 0; i < 10; i++) {
    const bx = leftColX + i * digitBoxWidth;
    doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
    doc.rect(bx, digitBoxY, digitBoxWidth, digitBoxHeight);

    const val = rollDigits[i] || '0';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
    doc.text(val, bx + digitBoxWidth / 2, digitBoxY + 4, { align: 'center' });
  }

  // 10x10 Digit Bubble Grid (0 to 9)
  const bubbleStartY = digitBoxY + digitBoxHeight + 2;
  const bubbleRadius = 1.35;
  const bubbleRowStep = 4.4;

  for (let col = 0; col < 10; col++) {
    const cx = leftColX + col * digitBoxWidth + digitBoxWidth / 2;
    const targetDigit = parseInt(rollDigits[col] || '0', 10);

    for (let digit = 0; digit <= 9; digit++) {
      const cy = bubbleStartY + digit * bubbleRowStep;
      const isFilled = digit === targetDigit;

      if (isFilled) {
        doc.setFillColor(graphiteBlack[0], graphiteBlack[1], graphiteBlack[2]);
        doc.circle(cx, cy, bubbleRadius, 'F');
      } else {
        doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
        doc.circle(cx, cy, bubbleRadius, 'D');
        doc.setFontSize(5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(redBorder[0], redBorder[1], redBorder[2]);
        doc.text(digit.toString(), cx, cy + 0.9, { align: 'center' });
      }
    }
  }

  // 2. TEST BOOKLET NO. BOX
  const bookletBoxY = rollBoxY + rollBoxHeight + 2;
  const bookletBoxHeight = 58;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(leftColX, bookletBoxY, leftColWidth, bookletBoxHeight);

  // Header: TEST BOOKLET No.
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(leftColX, bookletBoxY, leftColWidth, 5, 'F');
  doc.line(leftColX, bookletBoxY + 5, leftColX + leftColWidth, bookletBoxY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text('TEST BOOKLET No.', leftColX + leftColWidth / 2, bookletBoxY + 3.8, { align: 'center' });

  // 7 Digit Boxes
  const bDigitBoxWidth = leftColWidth / 7;
  const bDigitBoxY = bookletBoxY + 5.5;

  for (let i = 0; i < 7; i++) {
    const bx = leftColX + i * bDigitBoxWidth;
    doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
    doc.rect(bx, bDigitBoxY, bDigitBoxWidth, digitBoxHeight);

    const val = bookletDigits[i] || '0';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
    doc.text(val, bx + bDigitBoxWidth / 2, bDigitBoxY + 4, { align: 'center' });
  }

  // 7x10 Digit Bubble Grid
  const bBubbleStartY = bDigitBoxY + digitBoxHeight + 2;
  for (let col = 0; col < 7; col++) {
    const cx = leftColX + col * bDigitBoxWidth + bDigitBoxWidth / 2;
    const targetDigit = parseInt(bookletDigits[col] || '0', 10);

    for (let digit = 0; digit <= 9; digit++) {
      const cy = bBubbleStartY + digit * bubbleRowStep;
      const isFilled = digit === targetDigit;

      if (isFilled) {
        doc.setFillColor(graphiteBlack[0], graphiteBlack[1], graphiteBlack[2]);
        doc.circle(cx, cy, bubbleRadius, 'F');
      } else {
        doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
        doc.circle(cx, cy, bubbleRadius, 'D');
        doc.setFontSize(5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(redBorder[0], redBorder[1], redBorder[2]);
        doc.text(digit.toString(), cx, cy + 0.9, { align: 'center' });
      }
    }
  }

  // 3. TEST BOOKLET CODE BOX
  const codeBoxY = bookletBoxY + bookletBoxHeight + 2;
  const codeBoxHeight = 26;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(leftColX, codeBoxY, leftColWidth, codeBoxHeight);

  // Header: Test Booklet Code
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(leftColX, codeBoxY, leftColWidth, 5, 'F');
  doc.line(leftColX, codeBoxY + 5, leftColX + leftColWidth, codeBoxY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text('Test Booklet Code', leftColX + leftColWidth / 2, codeBoxY + 3.8, { align: 'center' });

  // Code Display
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text(testBookletCode, leftColX + 11, codeBoxY + 18);

  // Filled circle next to code
  doc.setFillColor(graphiteBlack[0], graphiteBlack[1], graphiteBlack[2]);
  doc.circle(leftColX + 27, codeBoxY + 12, 2.8, 'F');

  // 4. ANSWER SHEET NO. & BARCODE BOX
  const barcodeBoxY = codeBoxY + codeBoxHeight + 2;
  const barcodeBoxHeight = 52;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(leftColX, barcodeBoxY, leftColWidth, barcodeBoxHeight);

  // Corner marks inside barcode box
  doc.setDrawColor(38, 49, 38);
  doc.setLineWidth(0.4);
  const pad = 2.5;
  // Top-left corner
  doc.line(leftColX + pad, barcodeBoxY + pad, leftColX + pad + 3, barcodeBoxY + pad);
  doc.line(leftColX + pad, barcodeBoxY + pad, leftColX + pad, barcodeBoxY + pad + 3);
  // Bottom-left corner
  doc.line(leftColX + pad, barcodeBoxY + barcodeBoxHeight - pad, leftColX + pad + 3, barcodeBoxY + barcodeBoxHeight - pad);
  doc.line(leftColX + pad, barcodeBoxY + barcodeBoxHeight - pad, leftColX + pad, barcodeBoxY + barcodeBoxHeight - pad - 3);

  // Vertical text "Answer Sheet No."
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  // Draw rotated text for vertical orientation
  doc.text('Answer Sheet No.', leftColX + 6.5, barcodeBoxY + 35, { angle: 90 });

  // Render Barcode
  const barcodeModules = generateBarcodeModules(registrationId);
  const totalBarcodeUnits = barcodeModules.reduce((acc, m) => acc + m.widthRatio, 0);
  const barcodeDrawWidth = 23;
  const unitSize = barcodeDrawWidth / totalBarcodeUnits;
  const barcodeX = leftColX + 10;
  const barcodeY = barcodeBoxY + 7;
  const barcodeHeight = 36;

  doc.setFillColor(0, 0, 0);
  let curX = barcodeX;
  for (const mod of barcodeModules) {
    const modW = mod.widthRatio * unitSize;
    if (mod.isBar) {
      doc.rect(curX, barcodeY, modW, barcodeHeight, 'F');
    }
    curX += modW;
  }

  // Registration ID text alongside barcode (vertical rotated)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text(registrationId, leftColX + 38.5, barcodeBoxY + 39, { angle: 90 });

  // --- ANSWER GRID (180 QUESTIONS IN 4 COLUMNS OF 45) ---
  const numColumns = 4;
  const questionsPerColumn = 45;
  const columnWidth = answerGridWidth / numColumns;
  const rowHeight = 4.35; // Perfectly fills the vertical space to align with left column

  for (let c = 0; c < numColumns; c++) {
    const colX = answerGridX + c * columnWidth;
    const startQ = c * questionsPerColumn + 1;
    const endQ = (c + 1) * questionsPerColumn;

    // Column Container Box
    doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
    doc.setLineWidth(0.3);
    const colTotalHeight = 6 + questionsPerColumn * rowHeight;
    doc.rect(colX, bodyY, columnWidth, colTotalHeight);

    // Column Header: Q.No. | Response (1 2 3 4)
    doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
    doc.rect(colX, bodyY, columnWidth, 6, 'F');
    doc.line(colX, bodyY + 6, colX + columnWidth, bodyY + 6);

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
    doc.text('Q.No.', colX + 4, bodyY + 4.2);
    doc.text('Response', colX + 19, bodyY + 4.2);

    // Question Rows
    for (let q = startQ; q <= endQ; q++) {
      const rowIndex = q - startQ;
      const ry = bodyY + 6 + rowIndex * rowHeight;
      const cy = ry + rowHeight / 2;

      // Question Number (3 digits e.g. "001")
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
      const qNumStr = q.toString().padStart(3, '0');
      doc.text(qNumStr, colX + 1.2, cy + 0.9);

      // Check candidate's answer for this question
      const qId = questionIdMap[q];
      const ansState = qId ? answers[qId] : undefined;
      const selectedOption = ansState?.selectedOptions?.[0]; // 'A', 'B', 'C', 'D'
      // Option mapping: A->1, B->2, C->3, D->4
      const selectedIndex = selectedOption === 'A' ? 1 : selectedOption === 'B' ? 2 : selectedOption === 'C' ? 3 : selectedOption === 'D' ? 4 : 0;

      // 4 Bubbles (1, 2, 3, 4)
      const bubbleSpacing = 5.2;
      const firstBubbleX = colX + 13.5;

      for (let opt = 1; opt <= 4; opt++) {
        const bx = firstBubbleX + (opt - 1) * bubbleSpacing;
        const isFilled = opt === selectedIndex;

        if (isFilled) {
          // Graphite-darkened filled circle
          doc.setFillColor(graphiteBlack[0], graphiteBlack[1], graphiteBlack[2]);
          doc.circle(bx, cy, 1.45, 'F');
        } else {
          // Unanswered circle with thin reddish outline
          doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
          doc.circle(bx, cy, 1.45, 'D');
          doc.setFontSize(4.8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(redBorder[0], redBorder[1], redBorder[2]);
          doc.text(opt.toString(), bx, cy + 0.8, { align: 'center' });
        }
      }
    }
  }

  // --- BOTTOM SECTION: CANDIDATE DECLARATION & VERIFICATION ---
  const declY = bodyY + 6 + questionsPerColumn * rowHeight + 3;
  const bottomWidth = pageWidth - 18; // ~192mm

  // Box 1: DECLARATION BY THE CANDIDATE (Left)
  const declColWidth = 64;
  const declHeight = 44;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(leftColX, declY, declColWidth, declHeight);

  // Header
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(leftColX, declY, declColWidth, 4.5, 'F');
  doc.line(leftColX, declY + 4.5, leftColX + declColWidth, declY + 4.5);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text('DECLARATION BY THE CANDIDATE', leftColX + declColWidth / 2, declY + 3.2, { align: 'center' });

  // Declaration text
  doc.setFontSize(4.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  const declLines = doc.splitTextToSize(
    'I declare that particulars and signature on this OMR Answer Sheet are mine and are same as in the attached Sheet. I further declare that particulars filled-in and signature as well as the circles darkened on this ORIGINAL Copy is same as in the MERITWISE official record.',
    declColWidth - 4
  );
  doc.text(declLines, leftColX + 2, declY + 8);

  // Sub-box: Signature with time
  const sigY = declY + 23;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(leftColX + 2, sigY, declColWidth - 4, 11);
  doc.setFontSize(5);
  doc.setFont('helvetica', 'bold');
  doc.text('Signature with time (in running handwriting)', leftColX + 3.5, sigY + 3.2);

  // Dynamic candidate signature representation (in cursive style italic font)
  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(graphiteBlack[0], graphiteBlack[1], graphiteBlack[2]);
  doc.text(studentName, leftColX + 5, sigY + 8.5);

  // Timestamp
  const finalTime = submissionTime || new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(115, 120, 110);
  doc.text(finalTime, leftColX + declColWidth - 5, sigY + 9, { align: 'right' });

  // Sub-box: Candidate's Name
  const nameY = sigY + 12;
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(leftColX + 2, nameY, declColWidth - 4, 4, 'F');
  doc.rect(leftColX + 2, nameY, declColWidth - 4, 4, 'D');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text("CANDIDATE'S NAME (in running handwriting)", leftColX + (declColWidth - 4) / 2 + 2, nameY + 2.8, {
    align: 'center',
  });

  // Middle Column (Width: 63mm)
  const midColX = leftColX + declColWidth + 2;
  const midColWidth = 63;

  // Mother's Name Box
  const motherBoxHeight = 16;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(midColX, declY, midColWidth, motherBoxHeight);
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(midColX, declY, midColWidth, 4.5, 'F');
  doc.line(midColX, declY + 4.5, midColX + midColWidth, declY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text("MOTHER'S NAME (in running handwriting)", midColX + midColWidth / 2, declY + 3.2, { align: 'center' });
  if (motherName) {
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.text(motherName, midColX + 4, declY + 11.5);
  }

  // Thumb Impression Box
  const thumbY = declY + motherBoxHeight + 2;
  const thumbHeight = declHeight - motherBoxHeight - 2;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(midColX, thumbY, midColWidth, thumbHeight);
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(midColX, thumbY, midColWidth, 4.5, 'F');
  doc.line(midColX, thumbY + 4.5, midColX + midColWidth, thumbY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text("CANDIDATE'S LEFT HAND THUMB IMPRESSION", midColX + midColWidth / 2, thumbY + 3.2, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(146, 149, 141);
  doc.text('NOT REQUIRED — DIGITAL EXAMINATION', midColX + midColWidth / 2, thumbY + 16, { align: 'center' });

  // Right Column (Width: 61mm)
  const rightColX = midColX + midColWidth + 2;
  const rightColWidth = pageWidth - rightColX - 8;

  // Father's Name Box
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(rightColX, declY, rightColWidth, motherBoxHeight);
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(rightColX, declY, rightColWidth, 4.5, 'F');
  doc.line(rightColX, declY + 4.5, rightColX + rightColWidth, declY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text("FATHER'S NAME (in running handwriting)", rightColX + rightColWidth / 2, declY + 3.2, { align: 'center' });
  if (fatherName) {
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.text(fatherName, rightColX + 4, declY + 11.5);
  }

  // Invigilator's Signature Box
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.rect(rightColX, thumbY, rightColWidth, thumbHeight);
  doc.setFillColor(sageHeader[0], sageHeader[1], sageHeader[2]);
  doc.rect(rightColX, thumbY, rightColWidth, 4.5, 'F');
  doc.line(rightColX, thumbY + 4.5, rightColX + rightColWidth, thumbY + 4.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(darkForest[0], darkForest[1], darkForest[2]);
  doc.text("SIGNATURE OF INVIGILATOR'S WITH TIME", rightColX + rightColWidth / 2, thumbY + 3.2, { align: 'center' });

  // Sub-slots 1 and 2
  const slotHeight = (thumbHeight - 4.5) / 2;
  doc.setDrawColor(redBorder[0], redBorder[1], redBorder[2]);
  doc.line(rightColX, thumbY + 4.5 + slotHeight, rightColX + rightColWidth, thumbY + 4.5 + slotHeight);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.text('1', rightColX + 2, thumbY + 9);
  doc.text('2', rightColX + 2, thumbY + 4.5 + slotHeight + 4.5);

  // Automatic download if requested
  const sanitizedReg = registrationId.replace(/[^A-Za-z0-9_-]/g, '_');
  const sanitizedAtt = attemptId.replace(/[^A-Za-z0-9_-]/g, '_');
  const filename = `MERITWISE_OMR_${sanitizedReg}_${sanitizedAtt}.pdf`;

  if (autoDownload && typeof window !== 'undefined') {
    doc.save(filename);
  }

  return doc;
}
