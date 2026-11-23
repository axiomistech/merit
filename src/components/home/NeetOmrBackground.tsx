import React from 'react';

/**
 * Authentic 2D Vector NEET OMR Answer Sheet Background Canvas.
 * Rendered in straight 2D grayscale with precise question columns,
 * Roll No. grid, Test Booklet Code, and vertical margin notices.
 */
export function NeetOmrBackground() {
  // Generate question row items for the 4 visible columns
  const col1 = [
    '001', '002', '003', '004', '005', '006', '007', '008', '009', '010',
    '011', '012', '013', '014', '015', '016', '017', '018', '019', '020',
    '021', '022', '023', '024', '025', '026', '027', '028', '029', '030',
    '031', '032', '033', '034', '035', '036', '037', '038', '039', '040',
    '041', '042', '043', '044', '045'
  ];

  const col2 = [
    '051', '052', '053', '054', '055', '056', '057', '058', '059', '060',
    '061', '062', '063', '064', '065', '066', '067', '068', '069', '070',
    '071', '072', '073', '074', '075', '076', '077', '078', '079', '080',
    '081', '082', '083', '084', '085', '086', '087', '088', '089', '090',
    '091', '092', '093', '094', '095'
  ];

  const col3 = [
    '101', '102', '103', '104', '105', '106', '107', '108', '109', '110',
    '111', '112', '113', '114', '115', '116', '117', '118', '119', '120',
    '121', '122', '123', '124', '125', '126', '127', '128', '129', '130',
    '131', '132', '133', '134', '135', '136', '137', '138', '139', '140',
    '141', '142', '143', '144', '145'
  ];

  const col4 = [
    '151', '152', '153', '154', '155', '156', '157', '158', '159', '160',
    '161', '162', '163', '164', '165', '166', '167', '168', '169', '170',
    '171', '172', '173', '174', '175', '176', '177', '178', '179', '180',
    '181', '182', '183', '184', '185', '186', '187', '188', '189', '190',
    '191', '192', '193', '194', '195'
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, black 0%, black 70%, rgba(0, 0, 0, 0.4) 86%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, black 70%, rgba(0, 0, 0, 0.4) 86%, transparent 100%)',
      }}
    >
      {/* 1. Straight 2D Vector OMR Sheet etched in Deep Charcoal (#141A11) */}
      <svg
        viewBox="0 0 1440 860"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-full object-cover text-[#141A11]"
        style={{
          opacity: 0.11,
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.80) 60%, rgba(0, 0, 0, 1) 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.80) 60%, rgba(0, 0, 0, 1) 100%)',
        }}
      >
        <defs>
          <pattern id="timing-marks" width="10" height="18" patternUnits="userSpaceOnUse">
            <rect x="0" y="3" width="7" height="5" fill="currentColor" fillOpacity="0.45" />
          </pattern>
        </defs>

        {/* Optical Timing Marks on Left Edge */}
        <rect x="14" y="20" width="7" height="820" fill="url(#timing-marks)" />

        {/* Left Vertical Notice */}
        <g transform="translate(48, 620) rotate(-90)">
          <text
            x="0"
            y="0"
            fill="currentColor"
            fillOpacity="0.65"
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
          y="72"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.55"
          fontSize="20"
          fontWeight="900"
          letterSpacing="3"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          NEET OMR ANSWER SHEET
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
            fillOpacity="0.6"
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
                  strokeOpacity="0.3"
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
                      strokeOpacity="0.3"
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
        {/* TEST BOOKLET CODE (Bottom Left)                                */}
        {/* ============================================================== */}
        <g transform="translate(80, 720)">
          <text
            x="0"
            y="0"
            fill="currentColor"
            fillOpacity="0.55"
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
            fillOpacity="0.25"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        </g>

        {/* ============================================================== */}
        {/* QUESTION & RESPONSE COLUMNS (Center & Right)                  */}
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
              fillOpacity="0.65"
              fontSize="11"
              fontWeight="800"
              fontFamily="monospace, sans-serif"
            >
              Q. No.
            </text>
            <line x1="46" y1="0" x2="46" y2="740" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            <text
              x="128"
              y="16"
              textAnchor="middle"
              fill="currentColor"
              fillOpacity="0.65"
              fontSize="11"
              fontWeight="800"
              letterSpacing="1"
              fontFamily="monospace, sans-serif"
            >
              Response
            </text>
            <line x1="0" y1="24" x2="210" y2="24" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />

            {/* Questions List */}
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
                    fillOpacity="0.7"
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
                          fillOpacity={isFilled ? '0.45' : '0'}
                          stroke="currentColor"
                          strokeOpacity="0.38"
                          strokeWidth="1"
                        />
                        <text
                          x={cx}
                          y="0.5"
                          textAnchor="middle"
                          fill="currentColor"
                          fillOpacity={isFilled ? '0.1' : '0.65'}
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
          </g>
        ))}

        {/* 5th Column along right edge showing bubbles (4) (4) (4) */}
        <g transform="translate(1370, 92)">
          <text
            x="18"
            y="16"
            textAnchor="middle"
            fill="currentColor"
            fillOpacity="0.5"
            fontSize="10"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            Response
          </text>
          {Array.from({ length: 42 }).map((_, rowIdx) => (
            <g key={`c5-${rowIdx}`} transform={`translate(18, ${44 + rowIdx * 15.5})`}>
              <circle
                cx="0"
                cy="-3"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <text
                x="0"
                y="0.5"
                textAnchor="middle"
                fill="currentColor"
                fillOpacity="0.55"
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
        <rect x="1420" y="20" width="7" height="820" fill="url(#timing-marks)" />
      </svg>

      {/* 2. Soft Top Specular Atmosphere */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.45) 0%, transparent 80%)',
        }}
      />


      {/* 4. Top Ambient Lighting with soft glacier undertone */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[360px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(220, 236, 241, 0.35) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

export default NeetOmrBackground;
