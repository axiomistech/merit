import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      candidateName,
      registrationId,
      examName,
      paperName,
      attemptId,
      rollNumber,
      testBookletCode,
      answers,
    } = body;

    const cleanRoll = (rollNumber || '1029384756').padStart(10, '0').slice(-10);
    const cleanCode = testBookletCode || 'A';
    const cleanReg = registrationId || 'MW-26-000001';

    // Generate 180 questions bubble matrix
    const bubbles = Array.from({ length: 180 }, (_, i) => {
      const qNum = i + 1;
      const ansKey = answers ? answers[`q_${qNum}`] || answers[qNum] : null;
      const selectedOption = ansKey?.selectedOptions?.[0] || null;

      return {
        qNum,
        selectedOption,
        bubbleMarked: selectedOption ? selectedOption.charCodeAt(0) - 64 : null, // A->1, B->2, C->3, D->4
      };
    });

    const omrPayload = {
      specVersion: 'NTA-NEET-2026-A4',
      dimensions: {
        format: 'A4',
        widthMm: 210,
        heightMm: 297,
        columns: 4,
        questionsPerColumn: 45,
      },
      candidate: {
        name: candidateName || 'Candidate',
        registrationId: cleanReg,
        rollNumber: cleanRoll,
        rollNumberDigits: cleanRoll.split('').map(Number),
        testBookletCode: cleanCode,
        barcodeValue: cleanReg,
        declarationSigned: true,
      },
      examination: {
        examName: examName || 'NEET (UG) 2026',
        paperName: paperName || 'Full Simulation Mock #1',
        attemptId: attemptId || 'ATT-NEET-01',
        totalQuestions: 180,
      },
      bubbles,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: omrPayload,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate OMR data' },
      { status: 500 }
    );
  }
}
