import React from 'react';

/**
 * Authentic 2D Vector NEET OMR Answer Sheet Background Canvas.
 * Rendered in straight 2D grayscale with full 200-question columns,
 * Roll No. grid, Test Booklet Code, and optical timing marks.
 * Extends across 85-90% of hero height with a cinematic matte-black merge mask.
 */
export function NeetOmrBackground() {
  // Generate question numbers for official 4 columns (50 questions each = 200 questions)
  const generateNumbers = (start: number, count: number) =>
    Array.from({ length: count }, (_, i) => String(start + i).padStart(3, '0'));

  const col1 = generateNumbers(1, 50);    // 001 - 050 (Physics)
  const col2 = generateNumbers(51, 50);   // 051 - 100 (Chemistry)
  const col3 = generateNumbers(101, 50);  // 101 - 150 (Botany)
  const col4 = generateNumbers(151, 50);  // 151 - 200 (Zoology)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.85) 75%, rgba(0, 0, 0, 0.45) 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 65%, rgba(0, 0, 0, 0.85) 75%, rgba(0, 0, 0, 0.45) 88%, transparent 100%)',
      }}
    >
      {/* 1. Straight 2D Vector OMR Sheet */}
      <svg
        viewBox="0 0 1440 1020"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-full object-cover text-[#C4C8CE]"
        style={{
          opacity: 0.25,
          filter: 'grayscale(100%)',
        }}
      >
        <defs>
          <pattern id="timing-marks" width="10" height="18" patternUnits="userSpaceOnUse">
            <rect x="0" y="3" width="7" height="5" fill="currentColor" fillOpacity="0.55" />
          </pattern>
        </defs>

        {/* Optical Timing Marks on Left Edge */}
        <rect x="14" y="20" width="7" height="970" fill="url(#timing-marks)" />

        {/* Left Vertical Notice */}
        <g transform="translate(48, 680) rotate(-90)">
          <text
            x="0"
            y="0"
            fill="currentColor"
            fillOpacity="0.68"
            fontSize="14"
            fontWeight="700"
            letterSpacing="2.5"
            fontFamily="monospace, sans-serif"
          >
            Candidate MUST NOT Carry ORIGINAL or Office Copy
          </text>
        </g>

        {/* Top Header: NEET OMR ANSWER SHEET */}
        <text
          x="1080"
          y="70"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.60"
          fontSize="20"
          fontWeight="900"
          letterSpacing="3"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          NEET OMR ANSWER SHEET
        </text>
        <text
          x="1080"
          y="86"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.45"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fontFamily="monospace, sans-serif"
        >
          SIDE - 1 • 200 QUESTIONS BLUEPRINT
        </text>

        {/* ============================================================== */}
        {/* ROLL NO. BOX GRID (Top Left)                                   */}
        {/* ============================================================== */}
        <g transform="translate(80, 40)">
          <text
            x="85"
            y="14"
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.65"
            fontSize="12"
            fontWeight="800"
            letterSpacing="1.5"
            fontFamily="monospace, sans-serif"
          >
            ROLL NO.
          </text>
          {/* 10 Digit Boxes */}
          <g transform="translate(0, 22)">
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={`box-${i}`} transform={`translate(${i * 17}, 0)`}>
                <rect
                  x="0"
                  y="0"
                  width="17"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
              </g>
            ))}
          </g>
          {/* Digit Bubble Matrix (10 columns x 10 rows) */}
          <g transform="translate(0, 48)">
            {Array.from({ length: 10 }).map((_, row) => (
              <g key={`row-${row}`} transform={`translate(0, ${row * 15})`}>
                {Array.from({ length: 10 }).map((_, col) => (
                  <g key={`bubble-${row}-${col}`} transform={`translate(${col * 17 + 8.5}, 6)`}>
                    <circle
                      r="5.5"
                      fill={col === (row * 3) % 10 ? 'currentColor' : 'none'}
                      fillOpacity={col === (row * 3) % 10 ? '0.5' : '0'}
                      stroke="currentColor"
                      strokeOpacity="0.32"
                      strokeWidth="0.9"
                    />
                    <text
                      y="2"
                      textAnchor="middle"
                      fill="currentColor"
                      fillOpacity="0.5"
                      fontSize="6"
                      fontWeight="700"
                      fontFamily="monospace, sans-serif"
                    >
                      {row}
                    </text>
                  </g>
                ))}
              </g>
            ))}
          </g>
        </g>

        {/* ============================================================== */}
        {/* TEST BOOKLET CODE (Left Lower)                                 */}
        {/* ============================================================== */}
        <g transform="translate(80, 700)">
          <text
            x="0"
            y="0"
            fill="currentColor"
            fillOpacity="0.60"
            fontSize="13"
            fontWeight="700"
            letterSpacing="1"
            fontFamily="monospace, sans-serif"
          >
            Test Booklet Code
          </text>
          <text
            x="2"
            y="42"
            fill="currentColor"
            fillOpacity="0.75"
            fontSize="34"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            A
          </text>
          <circle
            cx="80"
            cy="28"
            r="12"
            fill="currentColor"
            fillOpacity="0.30"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <text
            x="80"
            y="32"
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.80"
            fontSize="12"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            A
          </text>
        </g>

        {/* ============================================================== */}
        {/* QUESTION & RESPONSE COLUMNS (4 Columns x 50 Questions = 200)   */}
        {/* ============================================================== */}
        {[
          { items: col1, x: 380 },
          { items: col2, x: 630 },
          { items: col3, x: 880 },
          { items: col4, x: 1130 },
        ].map((column, colIdx) => (
          <g key={`col-${colIdx}`} transform={`translate(${column.x}, 92)`}>
            {/* Column Header */}
            <line x1="0" y1="0" x2="210" y2="0" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
            <text
              x="22"
              y="16"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.60"
              fontSize="11"
              fontWeight="800"
              fontFamily="monospace, sans-serif"
            >
              Q. No.
            </text>
            <line x1="46" y1="0" x2="46" y2="818" stroke="currentColor" strokeOpacity="0.20" strokeWidth="1" />
            <text
              x="128"
              y="16"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.60"
              fontSize="11"
              fontWeight="800"
              letterSpacing="1"
              fontFamily="monospace, sans-serif"
            >
              Response
            </text>
            <line x1="0" y1="24" x2="210" y2="24" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />

            {/* Questions List (50 rows) */}
            {column.items.map((qNum, rowIdx) => {
              const yPos = 44 + rowIdx * 15.5;
              return (
                <g key={`q-${qNum}`} transform={`translate(0, ${yPos})`}>
                  {/* Question Number */}
                  <text
                    x="23"
                    y="0"
                    textAnchor="middle"
                    fill="currentColor"
                    fillOpacity="0.65"
                    fontSize="9.5"
                    fontWeight="700"
                    fontFamily="monospace, sans-serif"
                  >
                    {qNum}
                  </text>

                  {/* 4 Answer Bubbles: (1) (2) (3) (4) */}
                  {[1, 2, 3, 4].map((choice, cIdx) => {
                    const cx = 68 + cIdx * 38;
                    const isFilled = (rowIdx + colIdx) % 7 === cIdx;
                    return (
                      <g key={`choice-${cIdx}`}>
                        <circle
                          cx={cx}
                          cy="-3"
                          r="6.5"
                          fill={isFilled ? 'currentColor' : 'none'}
                          fillOpacity={isFilled ? '0.40' : '0'}
                          stroke="currentColor"
                          strokeOpacity="0.32"
                          strokeWidth="1"
                        />
                        <text
                          x={cx}
                          y="0.5"
                          textAnchor="middle"
                          fill="currentColor"
                          fillOpacity={isFilled ? '0.1' : '0.60'}
                          fontSize="7"
                          fontWeight="700"
                          fontFamily="sans-serif"
                        >
                          {choice}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
            <line x1="0" y1="822" x2="210" y2="822" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
          </g>
        ))}

        {/* 5th Column along right edge showing bubbles (4) */}
        <g transform="translate(1370, 92)">
          <text
            x="18"
            y="16"
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.50"
            fontSize="10"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            Response
          </text>
          {Array.from({ length: 50 }).map((_, rowIdx) => (
            <g key={`c5-${rowIdx}`} transform={`translate(18, ${44 + rowIdx * 15.5})`}>
              <circle
                cx="0"
                cy="-3"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.30"
                strokeWidth="1"
              />
              <text
                x="0"
                y="0.5"
                textAnchor="middle"
                fill="currentColor"
                fillOpacity="0.50"
                fontSize="7"
                fontWeight="700"
                fontFamily="sans-serif"
              >
                4
              </text>
            </g>
          ))}
        </g>

        {/* Optical Timing Marks on Right Edge */}
        <rect x="1420" y="20" width="7" height="970" fill="url(#timing-marks)" />

        {/* ============================================================== */}
        {/* BOTTOM VERIFICATION & SIGNATURES (y = 926 - 990)               */}
        {/* ============================================================== */}
        <g transform="translate(380, 928)">
          {/* Candidate Signature Box */}
          <rect
            x="0"
            y="0"
            width="220"
            height="36"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x="110"
            y="13"
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.50"
            fontSize="7.5"
            fontWeight="700"
            fontFamily="monospace, sans-serif"
          >
            Signature of Candidate (In Running Hand)
          </text>
          <path
            d="M 30 26 Q 55 18 80 26 T 130 22 T 190 26"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1.2"
          />

          {/* Invigilator Signature Box */}
          <g transform="translate(250, 0)">
            <rect
              x="0"
              y="0"
              width="220"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.22"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text
              x="110"
              y="13"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.50"
              fontSize="7.5"
              fontWeight="700"
              fontFamily="monospace, sans-serif"
            >
              Signature of Invigilator (With Date &amp; Time)
            </text>
            <path
              d="M 40 25 Q 70 17 100 25 T 150 21 T 180 25"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.22"
              strokeWidth="1.2"
            />
          </g>

          {/* Center Barcode Track */}
          <g transform="translate(500, 4)">
            <rect x="0" y="0" width="180" height="24" fill="url(#timing-marks)" opacity="0.45" />
            <text
              x="90"
              y="32"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.45"
              fontSize="7.5"
              fontWeight="700"
              letterSpacing="1"
              fontFamily="monospace, sans-serif"
            >
              *NEET-UG-2026-OMR-A*
            </text>
          </g>
        </g>

        {/* Declaration Notice */}
        <g transform="translate(380, 982)">
          <text
            x="0"
            y="0"
            fill="currentColor"
            fillOpacity="0.40"
            fontSize="7"
            fontWeight="600"
            letterSpacing="0.8"
            fontFamily="monospace, sans-serif"
          >
            I hereby declare that all entries made in this answer sheet are authentic and verified by candidate.
          </text>
        </g>
      </svg>

      {/* 2. Soft Top Specular Atmosphere */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 80%)',
        }}
      />

      {/* 3. Top Ambient Lighting for Specular Atmosphere */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[360px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

export default NeetOmrBackground;
