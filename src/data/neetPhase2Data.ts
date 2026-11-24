import { ExamPaperConfig, QuestionData } from '@/types/exam';

export const NEET_PHASE_2_PAPER: ExamPaperConfig = {
  "id": "neet-phase-2-code-bb-qq-xx",
  "name": "NEET Phase-2 (Code: BB-QQ-XX) Official Paper",
  "slug": "neet-phase-2-code-bb-qq-xx",
  "examSlug": "neet",
  "examName": "National Eligibility cum Entrance Test (NEET)",
  "durationMinutes": 180,
  "totalMarks": 720,
  "totalQuestions": 180,
  "instructions": [
    "The test contains 180 questions with a total duration of 180 minutes (3 hours).",
    "Part A: Chemistry (Questions 1 to 45).",
    "Part B: Biology (Questions 46 to 135: Botany & Zoology).",
    "Part C: Physics (Questions 136 to 180).",
    "Each correct answer awards +4 marks. Each incorrect answer incurs -1 mark penalty.",
    "Unattempted questions receive zero marks."
  ],
  "sections": [
    {
      "id": "sec-chemistry",
      "name": "Part A \u2014 Chemistry",
      "subjectSlug": "chemistry",
      "questionIndices": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45
      ]
    },
    {
      "id": "sec-biology",
      "name": "Part B \u2014 Biology",
      "subjectSlug": "biology",
      "questionIndices": [
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
        111,
        112,
        113,
        114,
        115,
        116,
        117,
        118,
        119,
        120,
        121,
        122,
        123,
        124,
        125,
        126,
        127,
        128,
        129,
        130,
        131,
        132,
        133,
        134,
        135
      ]
    },
    {
      "id": "sec-physics",
      "name": "Part C \u2014 Physics",
      "subjectSlug": "physics",
      "questionIndices": [
        136,
        137,
        138,
        139,
        140,
        141,
        142,
        143,
        144,
        145,
        146,
        147,
        148,
        149,
        150,
        151,
        152,
        153,
        154,
        155,
        156,
        157,
        158,
        159,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        174,
        175,
        176,
        177,
        178,
        179,
        180
      ]
    }
  ]
};

export const NEET_PHASE_2_QUESTIONS: QuestionData[] = [
  {
    "id": "neet-2016-p2-q001",
    "versionId": "neet-2016-p2-q001-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "amines-and-diazonium-salts",
    "unitName": "Organic Compounds Containing Nitrogen",
    "topic": "Diazonium Salts & Azo Coupling",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A given nitrogen-containing aromatic compound A reacts with Sn/HCl, followed by HNO2 to give an unstable compound B. B, on treatment with phenol, forms a beautiful coloured compound C with the molecular formula $\\ce{C12H10N2O}$. The structure of compound A is :",
    "options": [
      {
        "key": "A",
        "text": "Benzamide ($\\ce{C6H5CONH2}$)",
        "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_A.png"
      },
      {
        "key": "B",
        "text": "Benzamide ($\\ce{C6H5CONH2}$)",
        "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_B.png"
      },
      {
        "key": "C",
        "text": "Nitrobenzene ($\\ce{C6H5NO2}$)",
        "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_C.png"
      },
      {
        "key": "D",
        "text": "Benzonitrile ($\\ce{C6H5CN}$)",
        "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_D.png"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "\uf0be\uf0be\uf0be\uf0be      \uf0ae                 \uf0be\uf0be\uf0be   \uf0ae\n             A                                                      B\n\n                                                                          Phenol\n\n\n\n\n                                                                        N=N            OH\n\n                                                                                   C\n\n                                                                        (C12H10N2O)"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Diazonium Salts & Azo Coupling",
    "conceptSlug": "amines-and-diazonium-salts",
    "multilingual": {
      "hi": {
        "text": "\u090f\u0915 \u0926\u093f\u092f\u093e \u0917\u092f\u093e \u0928\u093e\u0907\u091f\u094d\u0930\u094b\u091c\u0928-\u092f\u0941\u0915\u094d\u0924 \u0910\u0930\u094b\u092e\u0948\u091f\u093f\u0915 \u092f\u094c\u0917\u093f\u0915 A, Sn/HCl \u0924\u0925\u093e \u092c\u093e\u0926 \u092e\u0947\u0902 HNO2 \u0938\u0947 \u0915\u094d\u0930\u093f\u092f\u093e \u0915\u0930\u0915\u0947 \u090f\u0915 \u0905\u0938\u094d\u0925\u093e\u092f\u0940 \u092f\u094c\u0917\u093f\u0915 B \u0926\u0947\u0924\u093e \u0939\u0948\u0964 B \u092b\u093f\u0928\u0949\u0932 \u0915\u0947 \u0938\u093e\u0925 \u0915\u094d\u0930\u093f\u092f\u093e \u0915\u0930\u0915\u0947 \u090f\u0915 \u0938\u0941\u0928\u094d\u0926\u0930 \u0930\u0902\u0917\u0940\u0928 \u092f\u094c\u0917\u093f\u0915 C \u092c\u0928\u093e\u0924\u093e \u0939\u0948, \u091c\u093f\u0938\u0915\u093e \u0905\u0923\u0941-\u0938\u0942\u0924\u094d\u0930 $\\ce{C12H10N2O}$ \u0939\u0948\u0964 \u092f\u094c\u0917\u093f\u0915 A \u0915\u0940 \u0938\u0902\u0930\u091a\u0928\u093e \u0939\u0948 -",
        "options": [
          {
            "key": "A",
            "text": "Benzamide ($\\ce{C6H5CONH2}$)",
            "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_A.png"
          },
          {
            "key": "B",
            "text": "Benzamide ($\\ce{C6H5CONH2}$)",
            "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_B.png"
          },
          {
            "key": "C",
            "text": "Nitrobenzene ($\\ce{C6H5NO2}$)",
            "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_C.png"
          },
          {
            "key": "D",
            "text": "Benzonitrile ($\\ce{C6H5CN}$)",
            "imageUrl": "/assets/scientific/neet-phase-2/q1_opt_D.png"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 1,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 1
  },
  {
    "id": "neet-2016-p2-q002",
    "versionId": "neet-2016-p2-q002-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "haloalkanes-and-haloarenes",
    "unitName": "Organic Compounds Containing Halogens",
    "topic": "SN2 Substitution & Solvent Effects",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Consider the reaction :\n$$\\ce{CH3CH2CH2Br + NaCN -> CH3CH2CH2CN + NaBr}$$\nThis reaction will be the fastest in :",
    "options": [
      {
        "key": "A",
        "text": "water (\u091c\u0932)"
      },
      {
        "key": "B",
        "text": "ethanol (\u090f\u0925\u0947\u0928\u0949\u0932)"
      },
      {
        "key": "C",
        "text": "methanol (\u092e\u0947\u0925\u0947\u0928\u0949\u0932)"
      },
      {
        "key": "D",
        "text": "N,N'-dimethylformamide (DMF) (N,N'-\u0921\u093e\u0907\u092e\u0947\u0925\u093f\u0932\u092b\u0949\u0930\u094d\u092e\u092e\u093e\u0907\u0921)"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "(Polar aprotic solvent)\n                          CH3\n               O\n\n\n       CH3\u2014CH2\u2014CH2\u2014Br + NaCN \uf0be\uf0be\n                              \uf0ae CH3\u2014CH2\u2014CH2\u2014CN + NaBr\n       This is a SN2 Reaction for which polar aprotic medium is suitable for faster rate of reaction."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "SN2 Substitution & Solvent Effects",
    "conceptSlug": "haloalkanes-and-haloarenes",
    "multilingual": {
      "hi": {
        "text": "\u0928\u093f\u092e\u094d\u0928 \u0905\u092d\u093f\u0915\u094d\u0930\u093f\u092f\u093e \u092a\u0930 \u0935\u093f\u091a\u093e\u0930 \u0915\u0940\u091c\u093f\u092f\u0947 -\n$$\\ce{CH3CH2CH2Br + NaCN -> CH3CH2CH2CN + NaBr}$$\n\u092f\u0939 \u0905\u092d\u093f\u0915\u094d\u0930\u093f\u092f\u093e \u0915\u093f\u0938\u092e\u0947\u0902 \u0905\u0924\u093f \u0936\u0940\u0918\u094d\u0930 \u0939\u094b\u0917\u0940?",
        "options": [
          {
            "key": "A",
            "text": "water (\u091c\u0932)"
          },
          {
            "key": "B",
            "text": "ethanol (\u090f\u0925\u0947\u0928\u0949\u0932)"
          },
          {
            "key": "C",
            "text": "methanol (\u092e\u0947\u0925\u0947\u0928\u0949\u0932)"
          },
          {
            "key": "D",
            "text": "N,N'-dimethylformamide (DMF) (N,N'-\u0921\u093e\u0907\u092e\u0947\u0925\u093f\u0932\u092b\u0949\u0930\u094d\u092e\u092e\u093e\u0907\u0921)"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 2,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 2
  },
  {
    "id": "neet-2016-p2-q003",
    "versionId": "neet-2016-p2-q003-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "alcohols-phenols-ethers-carbonyls",
    "unitName": "Organic Compounds Containing Oxygen",
    "topic": "Aldehydes & Ketones - Selective Hydrogenation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The correct structure of the product A formed in the reaction is :",
    "options": [
      {
        "key": "A",
        "text": "Cyclohex-2-en-1-ol with C2 cation",
        "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_A.png"
      },
      {
        "key": "B",
        "text": "Cyclohex-3-en-1-ol",
        "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_B.png"
      },
      {
        "key": "C",
        "text": "Cyclohexanone",
        "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_C.png"
      },
      {
        "key": "D",
        "text": "Cyclohex-2-en-1-ol",
        "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_D.png"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "\uf0be\uf0be\uf0be\uf0be        \uf0ae\n\n\n       During hydrogenation of \uf061,\uf062 unsaturated carbonyl compound by pd catalyst selective reduction is\n       observed of double bond.\n\n\n\n\n                                                          www.vedantu.com                                2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Aldehydes & Ketones - Selective Hydrogenation",
    "conceptSlug": "alcohols-phenols-ethers-carbonyls",
    "imageUrl": "/assets/scientific/neet-phase-2/q3_reaction.png",
    "contentBlocks": [
      {
        "id": "q3-b1",
        "type": "text",
        "order": 1,
        "rawContent": "The correct structure of the product A formed in the reaction is :"
      },
      {
        "id": "q3-b2",
        "type": "chemical_reaction",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q3_reaction.png"
      }
    ],
    "multilingual": {
      "hi": {
        "text": "\u0905\u092d\u093f\u0915\u094d\u0930\u093f\u092f\u093e \u092e\u0947\u0902 \u092c\u0928\u0928\u0947 \u0935\u093e\u0932\u0947 \u0909\u0924\u094d\u092a\u093e\u0926 A \u0915\u0940 \u0938\u0939\u0940 \u0938\u0902\u0930\u091a\u0928\u093e \u0939\u0948 -",
        "options": [
          {
            "key": "A",
            "text": "Cyclohex-2-en-1-ol with C2 cation",
            "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_A.png"
          },
          {
            "key": "B",
            "text": "Cyclohex-3-en-1-ol",
            "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_B.png"
          },
          {
            "key": "C",
            "text": "Cyclohexanone",
            "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_C.png"
          },
          {
            "key": "D",
            "text": "Cyclohex-2-en-1-ol",
            "imageUrl": "/assets/scientific/neet-phase-2/q3_opt_D.png"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 3,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 2
    },
    "displayNumber": 3
  },
  {
    "id": "neet-2016-p2-q004",
    "versionId": "neet-2016-p2-q004-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "general-organic-chemistry",
    "unitName": "Some Basic Principles of Organic Chemistry",
    "topic": "Tautomerism & Bredt's Rule",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which among the given molecules can exhibit tautomerism?",
    "options": [
      {
        "key": "A",
        "text": "Both II and III (II \u0914\u0930 III \u0926\u094b\u0928\u094b\u0902)"
      },
      {
        "key": "B",
        "text": "III only (\u0915\u0947\u0935\u0932 III)"
      },
      {
        "key": "C",
        "text": "Both I and III (I \u0914\u0930 III \u0926\u094b\u0928\u094b\u0902)"
      },
      {
        "key": "D",
        "text": "Both I and II (I \u0914\u0930 II \u0926\u094b\u0928\u094b\u0902)"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Only III\n       \uf061-H at bridge head carbon never show tautomerism.\n                     O                           OH\n                         \uf0be\uf0be\uf0ae"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Tautomerism & Bredt's Rule",
    "conceptSlug": "general-organic-chemistry",
    "imageUrl": "/assets/scientific/neet-phase-2/q4_molecules.png",
    "contentBlocks": [
      {
        "id": "q4-b1",
        "type": "text",
        "order": 1,
        "rawContent": "Which among the given molecules can exhibit tautomerism?"
      },
      {
        "id": "q4-b2",
        "type": "molecular_group",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q4_molecules.png"
      }
    ],
    "multilingual": {
      "hi": {
        "text": "\u0926\u093f\u092f\u0947 \u0917\u092f\u0947 \u0905\u0923\u0941\u0913\u0902 \u092e\u0947\u0902 \u0938\u0947 \u0915\u093f\u0938\u092e\u0947\u0902 \u091a\u0932\u093e\u0935\u092f\u0935\u0924\u093e \u0939\u094b\u0917\u0940?",
        "options": [
          {
            "key": "A",
            "text": "Both II and III (II \u0914\u0930 III \u0926\u094b\u0928\u094b\u0902)"
          },
          {
            "key": "B",
            "text": "III only (\u0915\u0947\u0935\u0932 III)"
          },
          {
            "key": "C",
            "text": "Both I and III (I \u0914\u0930 III \u0926\u094b\u0928\u094b\u0902)"
          },
          {
            "key": "D",
            "text": "Both I and II (I \u0914\u0930 II \u0926\u094b\u0928\u094b\u0902)"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 4,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 3
    },
    "displayNumber": 4
  },
  {
    "id": "neet-2016-p2-q005",
    "versionId": "neet-2016-p2-q005-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "alcohols-phenols-ethers-carbonyls",
    "unitName": "Organic Compounds Containing Oxygen",
    "topic": "Carboxylic Acids - Acidic Strength",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The correct order of strengths of the carboxylic acids is :",
    "options": [
      {
        "key": "A",
        "text": "II > I > III"
      },
      {
        "key": "B",
        "text": "I > II > III"
      },
      {
        "key": "C",
        "text": "II > III > I"
      },
      {
        "key": "D",
        "text": "III > II > I"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "(II > III > I)\n       Acidic strength \uf061 \u2013I, \u2013M effect\n       \u2013I effect depand upon distance so II have stronger \u2013I effect than III."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Carboxylic Acids - Acidic Strength",
    "conceptSlug": "alcohols-phenols-ethers-carbonyls",
    "imageUrl": "/assets/scientific/neet-phase-2/q5_molecules.png",
    "contentBlocks": [
      {
        "id": "q5-b1",
        "type": "text",
        "order": 1,
        "rawContent": "The correct order of strengths of the carboxylic acids is :"
      },
      {
        "id": "q5-b2",
        "type": "molecular_group",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q5_molecules.png"
      }
    ],
    "multilingual": {
      "hi": {
        "text": "\u0915\u093e\u0930\u094d\u092c\u094b\u0915\u094d\u0938\u093f\u0932\u093f\u0915 \u0905\u092e\u094d\u0932 \u0915\u0947 \u0938\u093e\u092e\u0930\u094d\u0925\u094d\u092f \u0915\u093e \u0938\u0939\u0940 \u0915\u094d\u0930\u092e \u0939\u0948 -",
        "options": [
          {
            "key": "A",
            "text": "II > I > III"
          },
          {
            "key": "B",
            "text": "I > II > III"
          },
          {
            "key": "C",
            "text": "II > III > I"
          },
          {
            "key": "D",
            "text": "III > II > I"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 5,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 3
    },
    "displayNumber": 5
  },
  {
    "id": "neet-2016-p2-q006",
    "versionId": "neet-2016-p2-q006-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "hydrocarbons",
    "unitName": "Hydrocarbons",
    "topic": "Alkanes - Free Radical Halogenation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The compound that will react most readily with gaseous bromine has the formula :",
    "options": [
      {
        "key": "A",
        "text": "C2H4"
      },
      {
        "key": "B",
        "text": "C3H6"
      },
      {
        "key": "C",
        "text": "C2H2"
      },
      {
        "key": "D",
        "text": "C4H10"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Gaseous Bromine react fastest with alkane by free radical mechanism.\n               Br2\n       C4 H10 \uf0be\uf0be\uf0be  \uf0ae                         C H Br\n                                                4 9\n        Bu tan e                 ( free Radical substitution Re action )\n\n\n\n\n                                                                           www.vedantu.com                                          3"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Alkanes - Free Radical Halogenation",
    "conceptSlug": "hydrocarbons",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 6,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 6
  },
  {
    "id": "neet-2016-p2-q007",
    "versionId": "neet-2016-p2-q007-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "chemical-bonding-and-molecular-structure",
    "unitName": "Chemical Bonding and Molecular Structure",
    "topic": "Hydrogen Bonding in Biomolecules",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following compounds shows the presence of intramolecular hydrogen bond ?",
    "options": [
      {
        "key": "A",
        "text": "Concentrated acetic acid"
      },
      {
        "key": "B",
        "text": "H2O2"
      },
      {
        "key": "C",
        "text": "HCN"
      },
      {
        "key": "D",
        "text": "Cellulose"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Cellulose is example of intramolecular H-bonding"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Hydrogen Bonding in Biomolecules",
    "conceptSlug": "chemical-bonding-and-molecular-structure",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 7,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 7
  },
  {
    "id": "neet-2016-p2-q008",
    "versionId": "neet-2016-p2-q008-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "redox-reactions-and-electrochemistry",
    "unitName": "Redox Reactions and Electrochemistry",
    "topic": "Molar Conductivity of Electrolytes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The molar conductivity of a 0.5 mol/ dm3 solution of AgNO3 with electrolytic conductivity of 5.76 \u00d7 10\u20133 S \u20131 cm at 298 K is 3 \u20133 \u20131",
    "options": [
      {
        "key": "A",
        "text": "28.8 S cm2/mol"
      },
      {
        "key": "B",
        "text": "2.88 S cm2/mol"
      },
      {
        "key": "C",
        "text": "11.52 S cm2/mol"
      },
      {
        "key": "D",
        "text": "0.086 S cm2/mol"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "\u03bb\u00baM =              =\n                      M            0.5\n       = 11.52 S cm2 mol\u20131."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Molar Conductivity of Electrolytes",
    "conceptSlug": "redox-reactions-and-electrochemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 8,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 8
  },
  {
    "id": "neet-2016-p2-q009",
    "versionId": "neet-2016-p2-q009-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "chemical-kinetics",
    "unitName": "Chemical Kinetics",
    "topic": "Surface Catalysis & Zero/First Order Kinetics",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The decomposition of phosphine (PH3) on tungsten at low pressure is a first-order reaction. It is because the",
    "options": [
      {
        "key": "A",
        "text": "Rate of decomposition is very slow"
      },
      {
        "key": "B",
        "text": "Rate is proportional to the surface coverage"
      },
      {
        "key": "C",
        "text": "Rate is inversely proportional to the surface coverage"
      },
      {
        "key": "D",
        "text": "Rate is independent of the surface coverage"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "PH3                P+     H\n                               2 2\n       Rate = k[PH3].\n       It is independent of the surface coverage because zero order reaction depend on surface area covered\n       by reactant."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Surface Catalysis & Zero/First Order Kinetics",
    "conceptSlug": "chemical-kinetics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 9,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 9
  },
  {
    "id": "neet-2016-p2-q010",
    "versionId": "neet-2016-p2-q010-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "practical-chemistry",
    "unitName": "Principles Related to Practical Chemistry",
    "topic": "Colloids & Coagulation Values",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The coagulation values in millimoles per litre of the electrolytes used for the coagulation of As2S3 are given below : I. (NaCl) = 52, II. (BaCl2) = 0.69 III. (MgSO4) = 0.22 The correct order of their coagulating power is",
    "options": [
      {
        "key": "A",
        "text": "III > I > II"
      },
      {
        "key": "B",
        "text": "I > II > III"
      },
      {
        "key": "C",
        "text": "II > I > III"
      },
      {
        "key": "D",
        "text": "III > II > I"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Coagulation power \uf0b5\n                                     Coagulation value\n\n       Higher the coagulation power, lower is coagulation values in millimoles per litre.\n       MgSO4 > BaCl2 > NaCl."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Colloids & Coagulation Values",
    "conceptSlug": "practical-chemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 10,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 10
  },
  {
    "id": "neet-2016-p2-q011",
    "versionId": "neet-2016-p2-q011-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "redox-reactions-and-electrochemistry",
    "unitName": "Redox Reactions and Electrochemistry",
    "topic": "Faraday's Laws of Electrolysis",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "During the electrolysis of molten sodium chloride, the time required to produce 0.10 mol of chlorine gas using a current of 3 amperes is",
    "options": [
      {
        "key": "A",
        "text": "330 minutes"
      },
      {
        "key": "B",
        "text": "55 minutes"
      },
      {
        "key": "C",
        "text": "110 minutes"
      },
      {
        "key": "D",
        "text": "220 minutes"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "At Cathode : 2H2O \uf0be\uf0be\uf0be \uf0ae H2 + 2OH\u2013\n                        2e       \u2013\n       At anode : 2Cl- \uf0be\uf0be\uf0be \uf0ae Cl2 + 2e \u2013\n\n       w   It\n         =\n       E 96500\n\n\n\n\n                                                          www.vedantu.com                                    5\n\f                  3 \uf0b4 t(sec)\n       0.1 \u00d72 =\n                   96500\n       t = 6433 sec\n       t = 107.2 min\n        ~ 110 min\n        \u2013"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Faraday's Laws of Electrolysis",
    "conceptSlug": "redox-reactions-and-electrochemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 11,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 11
  },
  {
    "id": "neet-2016-p2-q012",
    "versionId": "neet-2016-p2-q012-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "atomic-structure",
    "unitName": "Atomic Structure",
    "topic": "Quantum Numbers & Orbitals",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "How many electrons can fit in the orbital for which n = 3 and \u03bb = 1 ?",
    "options": [
      {
        "key": "A",
        "text": "14"
      },
      {
        "key": "B",
        "text": "2"
      },
      {
        "key": "C",
        "text": "6"
      },
      {
        "key": "D",
        "text": "10"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "n=3                  \u03bb=1\n       3p orbital can have only 2 elelctron."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Quantum Numbers & Orbitals",
    "conceptSlug": "atomic-structure",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 12,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 12
  },
  {
    "id": "neet-2016-p2-q013",
    "versionId": "neet-2016-p2-q013-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "chemical-thermodynamics",
    "unitName": "Chemical Thermodynamics",
    "topic": "Entropy Changes in Isothermal Processes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "For a sample of perfect gas when its pressure is changed isothermally from pi to pf, the entropy change is given by \uf0e6p \uf0f6 \uf0e6p \uf0f6",
    "options": [
      {
        "key": "A",
        "text": "\uf044S = RT ln \uf0e7 i \uf0f7"
      },
      {
        "key": "B",
        "text": "\uf044S = nRln \uf0e7 f \uf0f7\n                      \uf0e8 pf \uf0f8                                               \uf0e8 pi \uf0f8\n\n                     \uf0e6p \uf0f6                                                    \uf0e6p \uf0f6"
      },
      {
        "key": "C",
        "text": "\uf044S = nRln \uf0e7 i \uf0f7"
      },
      {
        "key": "D",
        "text": "\uf044S = nRT ln \uf0e7 f \uf0f7"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "\uf044Ssys = nR \u03bbn      + nCp\u03bbn 2\n                       P2        T1\n\n       In isothermal process T1 = T2\n                       Pi\n       \uf044Ssys = nR\u03bbn\n                       Pf"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Entropy Changes in Isothermal Processes",
    "conceptSlug": "chemical-thermodynamics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 13,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 13
  },
  {
    "id": "neet-2016-p2-q014",
    "versionId": "neet-2016-p2-q014-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "solutions",
    "unitName": "Solutions",
    "topic": "Van't Hoff Factor for Strong Electrolytes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The van't Hoff factor (i) for a dilute aqueous solution of the strong electrolyte barium hydroxide is",
    "options": [
      {
        "key": "A",
        "text": "3"
      },
      {
        "key": "B",
        "text": "0"
      },
      {
        "key": "C",
        "text": "1"
      },
      {
        "key": "D",
        "text": "2"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Ba(OH)2 \uf0be\uf0ae\uf020Ba+2 + 2OH\u2013\n                            i = 3.\n\n\n\n\n                                                   www.vedantu.com                                               6"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Van't Hoff Factor for Strong Electrolytes",
    "conceptSlug": "solutions",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 14,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 14
  },
  {
    "id": "neet-2016-p2-q015",
    "versionId": "neet-2016-p2-q015-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "equilibrium",
    "unitName": "Equilibrium",
    "topic": "Weak Base Ionization & Percent Dissociation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The percentage of pyridine (C5H5N) that forms pyridinium ion (C5H5N+H) in a 0.10 M aqueous pyridine solution (Kb for C5H5N = 1.7 \u00d7 10\u20139) is",
    "options": [
      {
        "key": "A",
        "text": "1.6 %"
      },
      {
        "key": "B",
        "text": "0.0060 %"
      },
      {
        "key": "C",
        "text": "0.013 %"
      },
      {
        "key": "D",
        "text": "0.77 %"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "C5H5N + H2O = C5H5N+H + OH\u2013\n       0.1\n\n              Kb   1.7 \uf0b4 10 \u20139\n       \uf061\uf020=\uf020      =             = 1.7 \uf0b4 10\u20138 = 1.3 \uf0b4 10 \u20134\n              c        0.1\n                        \u20134\n       % \uf0b5\uf020= 1.3 \u00d710 \u00d7100\n                   \u20132\n       = 1.3 \u00d710 = 0.013."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Weak Base Ionization & Percent Dissociation",
    "conceptSlug": "equilibrium",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 15,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 15
  },
  {
    "id": "neet-2016-p2-q016",
    "versionId": "neet-2016-p2-q016-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "some-basic-concepts-in-chemistry",
    "unitName": "Some Basic Concepts in Chemistry",
    "topic": "Solid State & Coordination Numbers",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In calcium fluoride, having the fluorite structure, the coordination numbers for calcium ion (Ca2+) and fluoride ion (F\u2013) are",
    "options": [
      {
        "key": "A",
        "text": "4 and 8"
      },
      {
        "key": "B",
        "text": "4 and 2"
      },
      {
        "key": "C",
        "text": "6 and 6"
      },
      {
        "key": "D",
        "text": "8 and 4"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Ca2+ is surrounded by 8F\u2013\n       F\u2013 is surrounded by 4Ca+2\n\n\n               0"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Solid State & Coordination Numbers",
    "conceptSlug": "some-basic-concepts-in-chemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 16,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 16
  },
  {
    "id": "neet-2016-p2-q017",
    "versionId": "neet-2016-p2-q017-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "redox-reactions-and-electrochemistry",
    "unitName": "Redox Reactions and Electrochemistry",
    "topic": "Standard Cell Potential & Free Energy",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "If the ECell for a given reaction has a negative value, which of the following gives the correct relationships for the values of \uf044G0 and Keq ? 0",
    "options": [
      {
        "key": "A",
        "text": "\uf044G0 < 0 ; Keq < 1"
      },
      {
        "key": "B",
        "text": "\uf044G0 > 0; Keq < 1"
      },
      {
        "key": "C",
        "text": "\uf044G0 > 0; Keq > 1"
      },
      {
        "key": "D",
        "text": "\uf044G0 < 0; Keq > 1"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "E\u00b0cell < 0, so it is a non spontaneous process\n       \uf044G\u00b0= \u2013 nFE\u00b0 = +ve, so \uf044G\u00b0 > 0\n       \uf044G\u00b0= \u2013 2.303RT log K\n       So, K < 1"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Standard Cell Potential & Free Energy",
    "conceptSlug": "redox-reactions-and-electrochemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 17,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 17
  },
  {
    "id": "neet-2016-p2-q018",
    "versionId": "neet-2016-p2-q018-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "solutions",
    "unitName": "Solutions",
    "topic": "Thermodynamics of Ideal Solutions",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following is incorrect for ideal solution ?",
    "options": [
      {
        "key": "A",
        "text": "\uf044Gmix = 0"
      },
      {
        "key": "B",
        "text": "\uf044Hmix = 0"
      },
      {
        "key": "C",
        "text": "\uf044Umix = 0"
      },
      {
        "key": "D",
        "text": "\uf044P = Pobs \u2013 Pcalculated by Raoult's law = 0"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "For ideal solution inter molecular forces are identical so,\n       \uf044H\u00b0mix = O, \uf044Vmix = O \uf044Gmix < O\n       So 1st option is incorrect."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Thermodynamics of Ideal Solutions",
    "conceptSlug": "solutions",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 18,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 18
  },
  {
    "id": "neet-2016-p2-q019",
    "versionId": "neet-2016-p2-q019-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "equilibrium",
    "unitName": "Equilibrium",
    "topic": "Solubility Product & Common Ion Effect",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The solubility of AgCl(s) with solubility product 1.6 \u00d7 10\u201310 is in 0.1 M NaCl solution would be \u201311",
    "options": [
      {
        "key": "A",
        "text": "Zero"
      },
      {
        "key": "B",
        "text": "1.26 \u00d7 10\u20135 M"
      },
      {
        "key": "C",
        "text": "1.6 \u00d7 10\u20139 M"
      },
      {
        "key": "D",
        "text": "1.6 \u00d7 10        M"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "AgCl             Ag+ +       Cl\u2013\n                        S           S + 0.1\n                   Ksp = [Ag ] [Cl\u2013]\n                             +\n\n\n       1.6 \u00d7 10\u201310 = S \u00d7 (S + 0.1)\n                        = S \u00d7 0.1\n                   \u20139\n       1.6 \u00d7 10 = S"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Solubility Product & Common Ion Effect",
    "conceptSlug": "equilibrium",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 19,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 19
  },
  {
    "id": "neet-2016-p2-q020",
    "versionId": "neet-2016-p2-q020-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "some-basic-concepts-in-chemistry",
    "unitName": "Some Basic Concepts in Chemistry",
    "topic": "Mole Concept & Stoichiometry",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Suppose the elements X and Y combine to form two compounds XY2 and X3Y2. When 0.1 mole of XY2 and XY2 weights 10 g and 0.05 mole of X3Y2 weights 9 g, the atomic weights of X and Y are",
    "options": [
      {
        "key": "A",
        "text": "30, 20"
      },
      {
        "key": "B",
        "text": "40, 30"
      },
      {
        "key": "C",
        "text": "60, 40"
      },
      {
        "key": "D",
        "text": "20, 30"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "For         XY2       n=\n                                  M\n                             10\n                   0.1 =\n                           X + 2Y\n                   X + 2Y = 100                .......(1)\n                                  w\n       For         X3Y2      n=\n                                  M\n                                 9\n                   0.05 =\n                             3 X + 2Y\n                   3X + 2Y = 180               .......(2)\n       Form (1) and (2)\n                   2X = 80\n                   X = 40 and 2Y = 100 \u2013 40\n                                        = 60\n                                        = Y = 30"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Mole Concept & Stoichiometry",
    "conceptSlug": "some-basic-concepts-in-chemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 20,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 20
  },
  {
    "id": "neet-2016-p2-q021",
    "versionId": "neet-2016-p2-q021-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "redox-reactions-and-electrochemistry",
    "unitName": "Redox Reactions and Electrochemistry",
    "topic": "Quantitative Electrolysis & Electron Count",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The number of electrons delivered at the cathode during electrolysis by a current of 1 ampere in 60 seconds is (charge on electron = 1.60 \u00d7 10\u201319 C) = 1.60 \u00d7 10\u201319 C)",
    "options": [
      {
        "key": "A",
        "text": "7.48 \u00d7 1023"
      },
      {
        "key": "B",
        "text": "6 \u00d7 1023"
      },
      {
        "key": "C",
        "text": "6 \u00d7 1020"
      },
      {
        "key": "D",
        "text": "3.75 \u00d7 1020"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "=\n       E   96500\n                   6\n             =        = no. of mole e\u2013\n                 9650\n                        6\n       no. of e\u2013 =         \uf0b4 6.02 \uf0b4 10 23\n                      9650\n                                  20\n                    = 3.75 \u00d7 10\n\n\n\n\n                                                            www.vedantu.com                                         9"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Quantitative Electrolysis & Electron Count",
    "conceptSlug": "redox-reactions-and-electrochemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 21,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 21
  },
  {
    "id": "neet-2016-p2-q022",
    "versionId": "neet-2016-p2-q022-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "p-block-elements",
    "unitName": "p-Block Elements (Groups 13 to 18)",
    "topic": "Group 13 - Boric Acid Lewis Acidity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Boric acid is an acid because its molecule :\n$$\\ce{H3BO3 + H2O <=> B(OH)4- + H+}$$",
    "options": [
      {
        "key": "A",
        "text": "Combines with proton from water molecule"
      },
      {
        "key": "B",
        "text": "Contains replaceable H+ ion"
      },
      {
        "key": "C",
        "text": "Gives up a proton"
      },
      {
        "key": "D",
        "text": "Accepts OH\u2013 from water releasing proton"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "H3BO3 + H2O            B(OH) 4- + H+\n       H3BO3 is Lewis acid and accept OH\u2013 from H2O and releases H+."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Group 13 - Boric Acid Lewis Acidity",
    "conceptSlug": "p-block-elements",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 22,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 10
    },
    "displayNumber": 22
  },
  {
    "id": "neet-2016-p2-q023",
    "versionId": "neet-2016-p2-q023-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "p-block-elements",
    "unitName": "p-Block Elements (Groups 13 to 18)",
    "topic": "Group 13 - Complex Fluoride Formation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "$\\ce{AlF3}$ is soluble in $\\ce{HF}$ only in presence of $\\ce{KF}$. It is due to the formation of :",
    "options": [
      {
        "key": "A",
        "text": "$\\ce{K[AlF3H]}$"
      },
      {
        "key": "B",
        "text": "$\\ce{K3[AlF3H3]}$"
      },
      {
        "key": "C",
        "text": "$\\ce{K3[AlF6]}$"
      },
      {
        "key": "D",
        "text": "$\\ce{AlH3}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "AlF3 + KF \uf0be\uf0be\n                  \uf0be\uf0ae K3[AlF6]\n       (maximum C.N. of Al+3 is six so it form AlF63\u2013)."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Group 13 - Complex Fluoride Formation",
    "conceptSlug": "p-block-elements",
    "multilingual": {
      "hi": {
        "text": "$\\ce{AlF3}$ \u0915\u093e $\\ce{HF}$ \u092e\u0947\u0902 \u0935\u093f\u0932\u0947\u092f \u0915\u0947\u0935\u0932 $\\ce{KF}$ \u0915\u0940 \u0909\u092a\u0938\u094d\u0925\u093f\u0924\u093f \u092e\u0947\u0902 \u0939\u094b\u0924\u093e \u0939\u0948, \u0910\u0938\u093e \u0915\u093f\u0938\u0915\u0947 \u092c\u0928\u0928\u0947 \u0915\u0947 \u0915\u093e\u0930\u0923 \u0939\u094b\u0924\u093e \u0939\u0948\u2013",
        "options": [
          {
            "key": "A",
            "text": "$\\ce{K[AlF3H]}$"
          },
          {
            "key": "B",
            "text": "$\\ce{K3[AlF3H3]}$"
          },
          {
            "key": "C",
            "text": "$\\ce{K3[AlF6]}$"
          },
          {
            "key": "D",
            "text": "$\\ce{AlH3}$"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 23,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 10
    },
    "displayNumber": 23
  },
  {
    "id": "neet-2016-p2-q024",
    "versionId": "neet-2016-p2-q024-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "redox-reactions-and-electrochemistry",
    "unitName": "Redox Reactions and Electrochemistry",
    "topic": "Standard Electrode Potentials & Galvanization",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Zinc can be coated on iron to produce galvanized iron but the reverse is not possible. It is because",
    "options": [
      {
        "key": "A",
        "text": "Zinc has higher negative electrode potential than iron"
      },
      {
        "key": "B",
        "text": "Zinc is lighter than iron"
      },
      {
        "key": "C",
        "text": "Zinc has lower melting point than iron"
      },
      {
        "key": "D",
        "text": "Zinc has lower negative electrode potential than iron"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "E\uf0b0 Zn+2 / Zn = -0.76 V\n\n       E\uf0b0Fe+ 2 / Fe = -0.44 V\n\n       Zn has higher negative SRP (Standard reduction potential) so it work as anode and protect iron to\n       make iron as cathode."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Standard Electrode Potentials & Galvanization",
    "conceptSlug": "redox-reactions-and-electrochemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 24,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 24
  },
  {
    "id": "neet-2016-p2-q025",
    "versionId": "neet-2016-p2-q025-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "practical-chemistry",
    "unitName": "Principles Related to Practical Chemistry",
    "topic": "Suspensions & Milk of Lime",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The suspension of slaked lime in water is known as",
    "options": [
      {
        "key": "A",
        "text": "Aqueous solution of slaked lime"
      },
      {
        "key": "B",
        "text": "Limewater"
      },
      {
        "key": "C",
        "text": "Quicklime"
      },
      {
        "key": "D",
        "text": "Milk of lime"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Suspension of slaked lime is called milk of lime."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Suspensions & Milk of Lime",
    "conceptSlug": "practical-chemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 25,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 25
  },
  {
    "id": "neet-2016-p2-q026",
    "versionId": "neet-2016-p2-q026-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "chemical-bonding-and-molecular-structure",
    "unitName": "Chemical Bonding and Molecular Structure",
    "topic": "Hybridization of Nitrogen Species",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The hybridizations of atomic orbitals of nitrogen in NO2\uf02b ,NO3\u2013 and NH\uf02b4 respectively are",
    "options": [
      {
        "key": "A",
        "text": "sp2, sp and sp3"
      },
      {
        "key": "B",
        "text": "sp, sp3 and sp2"
      },
      {
        "key": "C",
        "text": "sp2, sp3 and sp"
      },
      {
        "key": "D",
        "text": "sp, sp2 and sp3"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "O=N=O                    N \uf0ae\uf020O     H             H\n                       \u2013\n             sp          O                      H\n                                sp2              3\n                                                sp\n\n\n\n\n                                                     www.vedantu.com                                   11"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Hybridization of Nitrogen Species",
    "conceptSlug": "chemical-bonding-and-molecular-structure",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 26,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 26
  },
  {
    "id": "neet-2016-p2-q027",
    "versionId": "neet-2016-p2-q027-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "chemical-bonding-and-molecular-structure",
    "unitName": "Chemical Bonding and Molecular Structure",
    "topic": "Lewis Acids and Bases",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following fluoro-compounds is most likely to behave as a Lewis base ?",
    "options": [
      {
        "key": "A",
        "text": "SiF4"
      },
      {
        "key": "B",
        "text": "BF3"
      },
      {
        "key": "C",
        "text": "PF3"
      },
      {
        "key": "D",
        "text": "CF4"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Lewis base \uf0ae\uf020\u03bb.p donar\n                    P\n       PF3\n                F F F"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Lewis Acids and Bases",
    "conceptSlug": "chemical-bonding-and-molecular-structure",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 27,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 27
  },
  {
    "id": "neet-2016-p2-q028",
    "versionId": "neet-2016-p2-q028-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "chemical-bonding-and-molecular-structure",
    "unitName": "Chemical Bonding and Molecular Structure",
    "topic": "Isoelectronic and Isostructural Species",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following pairs of ions is isoelectronic and isostructural ?",
    "options": [
      {
        "key": "A",
        "text": "ClO3\u2013 ,SO2\u2013\n                    3"
      },
      {
        "key": "B",
        "text": "CO32\u2013 ,NO3\u2013"
      },
      {
        "key": "C",
        "text": "ClO3\u2013 ,CO2\u2013\n                    3"
      },
      {
        "key": "D",
        "text": "SO32\u2013 ,CO23 \u2013"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "iso electronic\uf020\uf0ae\uf020same valence electron.\n       Iso structural \uf0ae\uf020same structure\n               Cl                 S           Both pyramidal but - valence\n       O            O\n                        \u2013 \u2013\n                              O       O\n                                          \u2013   electron are not same\n               O                  O\n               O                  O\n\n               C                  N           Both trigonal planar and\n       \u2013            \u2013\n                    O     \u2013\n                              O       O       isoelectronic\n           O"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Isoelectronic and Isostructural Species",
    "conceptSlug": "chemical-bonding-and-molecular-structure",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 28,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 28
  },
  {
    "id": "neet-2016-p2-q029",
    "versionId": "neet-2016-p2-q029-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "periodicity-in-properties",
    "unitName": "Classification of Elements and Periodicity",
    "topic": "Anomalous Properties of Beryllium",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In context with beryllium, which one of the following statements is incorrect ?",
    "options": [
      {
        "key": "A",
        "text": "Its hydride is electron-deficient and polymeric."
      },
      {
        "key": "B",
        "text": "It is rendered passive by nitric acid"
      },
      {
        "key": "C",
        "text": "It forms Be2C"
      },
      {
        "key": "D",
        "text": "Its salts rarely hydrolyze."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "B2H6 boron hydride, it is electron deficient and dimer of BH3.\n       A\u03bb, Cr are having passive nature with HNO3 but Be dissolve in conc. HNO3"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Anomalous Properties of Beryllium",
    "conceptSlug": "periodicity-in-properties",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 29,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 29
  },
  {
    "id": "neet-2016-p2-q030",
    "versionId": "neet-2016-p2-q030-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "p-block-elements",
    "unitName": "p-Block Elements (Groups 13 to 18)",
    "topic": "Group 16 - Sulfuric Acid Reactions",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Hot concentrated sulphuric acid is a moderately strong oxidizing agent. Which of the following reactions does not show oxidizing behaviour ?",
    "options": [
      {
        "key": "A",
        "text": "CaF2 + H2SO4 \uf0be\uf0be\uf0ae \uf020CaSO4 + 2HF"
      },
      {
        "key": "B",
        "text": "Cu + 2H2SO4 \uf0be\uf0be\uf0ae CuSO4 + SO2 + 2H2O"
      },
      {
        "key": "C",
        "text": "2S + 2H2SO4 \uf0be\uf0be\uf0ae 2SO2 + 2H2O"
      },
      {
        "key": "D",
        "text": "C + 2H2SO4 \uf0be\uf0be\uf0ae CO2 + 2SO2 + 2H2O"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "1st reaction is not a redox reaction as the oxidation number of elements remains unchanged."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Group 16 - Sulfuric Acid Reactions",
    "conceptSlug": "p-block-elements",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 30,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 30
  },
  {
    "id": "neet-2016-p2-q031",
    "versionId": "neet-2016-p2-q031-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "atomic-structure",
    "unitName": "Atomic Structure",
    "topic": "Spatial Orientation of d-Orbitals",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following pairs of d-orbitals will have electron density along the axis ?",
    "options": [
      {
        "key": "A",
        "text": "dxy , dx2 \u2013 y2"
      },
      {
        "key": "B",
        "text": "dz 2 , dxz"
      },
      {
        "key": "C",
        "text": "dxz , dyz"
      },
      {
        "key": "D",
        "text": "dz 2 , dx2 \u2013 y2"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "x\n\n\n                    2                        2   2\n               dZ                    dx \u2013y"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Spatial Orientation of d-Orbitals",
    "conceptSlug": "atomic-structure",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 31,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 31
  },
  {
    "id": "neet-2016-p2-q032",
    "versionId": "neet-2016-p2-q032-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "p-block-elements",
    "unitName": "p-Block Elements (Groups 13 to 18)",
    "topic": "Group 18 - Xenon Fluoride Geometry",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The correct geometry and hybridization for XeF4 are -",
    "options": [
      {
        "key": "A",
        "text": "square planar, sp3d2"
      },
      {
        "key": "B",
        "text": "Octahydral, sp3d2\n                                     3"
      },
      {
        "key": "C",
        "text": "trigonal bipyramidal, sp d"
      },
      {
        "key": "D",
        "text": "planar triangle, sp3d3"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "F                  F   Geometry\uf0ae electron pair arrangement\n                     Xe\n           F                  F   space\uf0ae atomic arrangement\n\n\n                                                           3 2\n       Geometry\uf0ae octahedral hybridization \uf0ae\uf020sp d"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Group 18 - Xenon Fluoride Geometry",
    "conceptSlug": "p-block-elements",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 32,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 32
  },
  {
    "id": "neet-2016-p2-q033",
    "versionId": "neet-2016-p2-q033-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "chemical-bonding-and-molecular-structure",
    "unitName": "Chemical Bonding and Molecular Structure",
    "topic": "VSEPR Geometry & Multiple Bonding",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Among the following, which one is a wrong statement?",
    "options": [
      {
        "key": "A",
        "text": "I3+ has bent geometry."
      },
      {
        "key": "B",
        "text": "PH5 and BiCl5 do not exist."
      },
      {
        "key": "C",
        "text": "p\uf070-d\uf070 bonds are present in SO2"
      },
      {
        "key": "D",
        "text": "SeF4 and CH4 have same shape."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Not same shape"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "VSEPR Geometry & Multiple Bonding",
    "conceptSlug": "chemical-bonding-and-molecular-structure",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 33,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 33
  },
  {
    "id": "neet-2016-p2-q034",
    "versionId": "neet-2016-p2-q034-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "co-ordination-compounds",
    "unitName": "Co-ordination Compounds",
    "topic": "Trans-Effect in Coordination Complexes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The correct increasing order of trans-effect of the following species is",
    "options": [
      {
        "key": "A",
        "text": "CN\u2013 > Br\u2013 > C6H5\u2013 > NH3"
      },
      {
        "key": "B",
        "text": "NH3 > CN\u2013> Br\u2013> C6H5\u2013"
      },
      {
        "key": "C",
        "text": "CN\u2013> C6H5\u2013 > Br\u2013 > NH3"
      },
      {
        "key": "D",
        "text": "Br\u2013 > CN\u2013> NH3 > C6H5\u2013"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Trans effect : The intensity of trans effect depend on increase in rate of substitution of the trans ligand.\n       F\u2013 < NH3 < Cl\u2013 < Br\u2013 < Ph\u2013 < CH3\u2013 < CN\u2013\n\n\n\n\n                                                         www.vedantu.com                                     14"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Trans-Effect in Coordination Complexes",
    "conceptSlug": "co-ordination-compounds",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 34,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 34
  },
  {
    "id": "neet-2016-p2-q035",
    "versionId": "neet-2016-p2-q035-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "d-and-f-block-elements",
    "unitName": "d- and f-Block Elements",
    "topic": "Lanthanoid Contraction & Basicity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following statements related to lanthanons is incorrect ?",
    "options": [
      {
        "key": "A",
        "text": "Ce (+4) solutions are widely used as oxidizing agent in volumetric analysis."
      },
      {
        "key": "B",
        "text": "Europium shows +2 oxidation state."
      },
      {
        "key": "C",
        "text": "The basicity decreases as the ionic radius decreases from Pr to Lu"
      },
      {
        "key": "D",
        "text": "All the lanthanous are much more reactive than aluminium"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Ce is strong oxidising agent and easily convert into Ce+3\n       Eu+2 exist and behave as reducing agent lanthanons are much more reactive than aluminum.\n       Lanthanoids are basic in nature and their acidity is three."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Lanthanoid Contraction & Basicity",
    "conceptSlug": "d-and-f-block-elements",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 35,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 35
  },
  {
    "id": "neet-2016-p2-q036",
    "versionId": "neet-2016-p2-q036-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "co-ordination-compounds",
    "unitName": "Co-ordination Compounds",
    "topic": "Jahn-Teller Effect in Octahedral Complexes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Jahn-Teller effect is not observed in high spin complexes of",
    "options": [
      {
        "key": "A",
        "text": "d9"
      },
      {
        "key": "B",
        "text": "d7"
      },
      {
        "key": "C",
        "text": "d8"
      },
      {
        "key": "D",
        "text": "d4"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Jahn teller effect : This is geometric distortion occur in unsymmetrical octahedral complexes for\n       example high spin complexes of (high spin)\n       d4                  d7                d8                  d9\n\n\n\n       unsymmetrical       unsymmetrical        Symmetrical           unsymmetrical"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Jahn-Teller Effect in Octahedral Complexes",
    "conceptSlug": "co-ordination-compounds",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 36,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 36
  },
  {
    "id": "neet-2016-p2-q037",
    "versionId": "neet-2016-p2-q037-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "hydrocarbons",
    "unitName": "Hydrocarbons",
    "topic": "Friedel-Crafts Alkylation Reagents",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following can be used as the halide component for Freidel \u2013Crafts reaction?",
    "options": [
      {
        "key": "A",
        "text": "Isopropyl chloride"
      },
      {
        "key": "B",
        "text": "Chlorobenzene"
      },
      {
        "key": "C",
        "text": "Bromobenzene"
      },
      {
        "key": "D",
        "text": "Chloroethene"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "CH2=CH\u2013Cl,                     Cl,          Br\n\n\n       Not suitable for friedal-craft Reaction in Benzene. Isopropyl chlrodie is suitable.\n                                               CH3         CH3\n                                                 CH\n             CH3\n       CH3\u2013CH\u2013Cl +                     AlCl3\n                                      \uf0be\uf0be \uf0be\uf0ae"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Friedel-Crafts Alkylation Reagents",
    "conceptSlug": "hydrocarbons",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 37,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 37
  },
  {
    "id": "neet-2016-p2-q038",
    "versionId": "neet-2016-p2-q038-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "general-organic-chemistry",
    "unitName": "Some Basic Principles of Organic Chemistry",
    "topic": "Coplanarity & Molecular Geometry",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In which of the following molecules, all atoms are coplanar?",
    "options": [
      {
        "key": "A",
        "text": "Bicyclohexyl",
        "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_A.png"
      },
      {
        "key": "B",
        "text": "Biphenyl",
        "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_B.png"
      },
      {
        "key": "C",
        "text": "Cyclohexane",
        "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_C.png"
      },
      {
        "key": "D",
        "text": "$\\ce{(CH3)2C=C(CN)2}$",
        "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_D.png"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Biphenyl\n\n\n\n       All carbon atom is sp2 hybridised and its geometry is trigonal planar."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Coplanarity & Molecular Geometry",
    "conceptSlug": "general-organic-chemistry",
    "multilingual": {
      "hi": {
        "text": "\u0928\u093f\u092e\u094d\u0928 \u092e\u0947\u0902 \u0938\u0947 \u0915\u093f\u0938 \u0905\u0923\u0941 \u092e\u0947\u0902 \u0938\u092d\u0940 \u092a\u0930\u092e\u093e\u0923\u0941 \u0938\u092e\u0924\u0932\u0940\u092f \u0939\u0948\u0902?",
        "options": [
          {
            "key": "A",
            "text": "Bicyclohexyl",
            "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_A.png"
          },
          {
            "key": "B",
            "text": "Biphenyl",
            "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_B.png"
          },
          {
            "key": "C",
            "text": "Cyclohexane",
            "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_C.png"
          },
          {
            "key": "D",
            "text": "$\\ce{(CH3)2C=C(CN)2}$",
            "imageUrl": "/assets/scientific/neet-phase-2/q38_opt_D.png"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 38,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 16
    },
    "displayNumber": 38
  },
  {
    "id": "neet-2016-p2-q039",
    "versionId": "neet-2016-p2-q039-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "biomolecules",
    "unitName": "Biomolecules",
    "topic": "Polymers - Polyamides (Nylon 6,6)",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following structures represents nylon 6,6 polymer?",
    "options": [
      {
        "key": "A",
        "text": "Nylon 6,6 polymer repeating unit",
        "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_A.png"
      },
      {
        "key": "B",
        "text": "Polyamide isomer structure B",
        "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_B.png"
      },
      {
        "key": "C",
        "text": "Polyamide isomer structure C",
        "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_C.png"
      },
      {
        "key": "D",
        "text": "Copolymer structure D",
        "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_D.png"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Nylon-66 \uf0ae adipic acid + Hexamethylenediamine\n       HOOC\u2013(CH2)2\u2013COOH+H2N\u2013(CH2)6\u2013NH2\n\n\n               \u2013C\u2013(CH2\u2013CH2)\u2013C\u2013NH\u2013(CH2)6\u2013NH\u2013\n                                           2\n                                                                              n\n                   O                           O"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Polymers - Polyamides (Nylon 6,6)",
    "conceptSlug": "biomolecules",
    "multilingual": {
      "hi": {
        "text": "\u0928\u093f\u092e\u094d\u0928 \u092e\u0947\u0902 \u0938\u0947 \u0915\u094c\u0928-\u0938\u0940 \u0938\u0902\u0930\u091a\u0928\u093e \u0928\u093e\u0907\u0932\u0949\u0928 6,6 \u092c\u0939\u0941\u0932\u0915 \u0915\u094b \u092a\u094d\u0930\u0926\u0930\u094d\u0936\u093f\u0924 \u0915\u0930\u0924\u0940 \u0939\u0948?",
        "options": [
          {
            "key": "A",
            "text": "Nylon 6,6 polymer repeating unit",
            "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_A.png"
          },
          {
            "key": "B",
            "text": "Polyamide isomer structure B",
            "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_B.png"
          },
          {
            "key": "C",
            "text": "Polyamide isomer structure C",
            "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_C.png"
          },
          {
            "key": "D",
            "text": "Copolymer structure D",
            "imageUrl": "/assets/scientific/neet-phase-2/q39_opt_D.png"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 39,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 16
    },
    "displayNumber": 39
  },
  {
    "id": "neet-2016-p2-q040",
    "versionId": "neet-2016-p2-q040-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "general-organic-chemistry",
    "unitName": "Some Basic Principles of Organic Chemistry",
    "topic": "Aromatic Heterocycles & Pyrrole Resonance",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In pyrrole 4 3 5 2 N 1 H the electron density is maximum on ik;jksy 4 3 5 2 N 1 H",
    "options": [
      {
        "key": "A",
        "text": "2 and 5"
      },
      {
        "key": "B",
        "text": "2 and 3"
      },
      {
        "key": "C",
        "text": "3 and 4"
      },
      {
        "key": "D",
        "text": "2 and 4"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "5                   2                                 2\n                                               5                      5                   2\n                   N1\n                                                       + N                    +N 1\n                   H                                    H                         H\n\n       Electron density is maximum on-2,4th carbon.\n\n\n\n\n                                                                              www.vedantu.com                                     17"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Aromatic Heterocycles & Pyrrole Resonance",
    "conceptSlug": "general-organic-chemistry",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 40,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 40
  },
  {
    "id": "neet-2016-p2-q041",
    "versionId": "neet-2016-p2-q041-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "hydrocarbons",
    "unitName": "Hydrocarbons",
    "topic": "Alkene Synthesis & Elimination Reactions",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following compounds shall not produce propene by reaction with HBr followed by elimination or direct only elimination reaction ? H2 H2 H2C\u2014CH2",
    "options": [
      {
        "key": "A",
        "text": "H3C\u2014C\u2014CH2Br"
      },
      {
        "key": "B",
        "text": ""
      },
      {
        "key": "C",
        "text": "H3C\u2014C\u2014CH2OH"
      },
      {
        "key": "D",
        "text": "H2C=C=O"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "(i) CH3\u2013CH2\u2013CH2\u2013Br                               CH3\u2013CH=CH2\n                                       elimination\n       (ii)                                             CH3\u2013CH=CH2\n\n\n                                             HBr                         elimination\n       (iii) CH3\u2013CH2\u2013CH2\u2013OH                          CH3\u2013CH2\u2013CH2\u2013Br                      CH3\u2013CH=CH2\n                                HBr\n       (iv) CH2=C=O                      No reaction."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Alkene Synthesis & Elimination Reactions",
    "conceptSlug": "hydrocarbons",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 41,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 41
  },
  {
    "id": "neet-2016-p2-q042",
    "versionId": "neet-2016-p2-q042-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "amines-and-diazonium-salts",
    "unitName": "Organic Compounds Containing Nitrogen",
    "topic": "Nitroalkanes & Nitrous Acid Reactivity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following nitro-compounds does not react with nitrous acid CH3 C H2",
    "options": [
      {
        "key": "A",
        "text": "H3C"
      },
      {
        "key": "B",
        "text": "H3C        C\n                         H NO2                                               C         NO2\n                     O                                                       H2\n                           H2\n               H 3C        C                                             H3C"
      },
      {
        "key": "C",
        "text": "CH        NO2"
      },
      {
        "key": "D",
        "text": "H3C\u2014 C\u2014NO2"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "1\u00b0 nitro compound, 2\u00b0 nitrocompound react with HNO2 acid but 3\u00b0 nitro compound does not react with\n       nitrous acid\n                         CH3                            CH3\n                                      HNO2\n       (i) CH3\u2013C\u2013CH\u2013NO2                        CH3\u2013C\u2013C\u2013NO2\n                 O       1\u00b0 nitro                     O N=O\n\n       (ii) CH3\u2013CH2\u2013CH2\u2013NO2 HO\u2013N=O                      CH3\u2013CH2\u2013C\u2013NO2\n                          1\u00b0 nitro                               N\u2013OH\n\n\n\n\n                                                           www.vedantu.com                                 18\n\f                                        HO\u2013N=O        CH3\u2013CH\u2013C\u2013NO2\n       (iii) CH3\u2013CH\u2013CH2\u2013NO2\n                   CH3     1\u00b0 nitro                             CH3 N\u2013OH\n                   HNO2\n       3\u00b0 nitro            No reaction"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Nitroalkanes & Nitrous Acid Reactivity",
    "conceptSlug": "amines-and-diazonium-salts",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 42,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 42
  },
  {
    "id": "neet-2016-p2-q043",
    "versionId": "neet-2016-p2-q043-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "biomolecules",
    "unitName": "Biomolecules",
    "topic": "Central Dogma of Molecular Genetics",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "the central dogma of molecular genetics states that the genetic information flows from",
    "options": [
      {
        "key": "A",
        "text": "DNA \uf0ae\uf020RNA \uf0ae Carbohydrates"
      },
      {
        "key": "B",
        "text": "Amino acids \uf0ae\uf020Proteins \uf0ae\uf020DNA"
      },
      {
        "key": "C",
        "text": "DNA \uf0ae Carbohydrates \uf0ae Proteins"
      },
      {
        "key": "D",
        "text": "DNA \uf0ae\uf020RNA \uf0ae\uf020Proteins"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "DNA \u2013 RNA \uf0ae\uf020Protein"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Central Dogma of Molecular Genetics",
    "conceptSlug": "biomolecules",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 43,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 43
  },
  {
    "id": "neet-2016-p2-q044",
    "versionId": "neet-2016-p2-q044-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "biomolecules",
    "unitName": "Biomolecules",
    "topic": "Carbohydrates - D/L Configuration of Aldoses",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The correct corresponding order of names of four aldoses with configuration given below CHO CHO CHO CHO H OH HO H HO H H OH H OH H OH HO H HO H CH2OH CH2OH CH2OH CH2OH respectively, is",
    "options": [
      {
        "key": "A",
        "text": "D-erythrose, D-threose, L-erythrose, L-threose"
      },
      {
        "key": "B",
        "text": "L-erythrose, L-threose, L-erythrose, D-threose"
      },
      {
        "key": "C",
        "text": "D-threose, D-erythrose, L-threose, L-erythrose"
      },
      {
        "key": "D",
        "text": "L-erythrose, L-threose, D-erythrose, D-threose"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "H            OH (D)            H            OH (D)     (L) HO             H       HO               H (L)\n              CH2OH                          CH2OH                         CH2OH                 CH2OH\n\n           D-erythrose                    D-threose                     L-erythose            L-threose"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Carbohydrates - D/L Configuration of Aldoses",
    "conceptSlug": "biomolecules",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 44,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 44
  },
  {
    "id": "neet-2016-p2-q045",
    "versionId": "neet-2016-p2-q045-v1",
    "examSlug": "neet",
    "subjectSlug": "chemistry",
    "subjectName": "Chemistry",
    "chapterSlug": "hydrocarbons",
    "unitName": "Hydrocarbons",
    "topic": "Electrophilic Aromatic Alkylation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In the given reaction: Benzene + Cyclohexene with HF (0\u00baC) $\\to$ P, the product P is :",
    "options": [
      {
        "key": "A",
        "text": "1,4-dicyclohexylbenzene",
        "imageUrl": "/assets/scientific/neet-phase-2/q45_opt_A.png"
      },
      {
        "key": "B",
        "text": "Fluorocyclohexane",
        "imageUrl": "/assets/scientific/neet-phase-2/q45_opt_B.png"
      },
      {
        "key": "C",
        "text": "Fluorinated cyclohexylbenzene adduct",
        "imageUrl": "/assets/scientific/neet-phase-2/q45_opt_C.png"
      },
      {
        "key": "D",
        "text": "Cyclohexylbenzene",
        "imageUrl": "/assets/scientific/neet-phase-2/q45_opt_D.png"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "+          \uf0be\uf0be\n                           \uf0be\uf0ae                 +        \uf0be\uf0be\uf0ae\n\n       This is a Freidal \u2013 Craft reaction.\n\n\n\n\n                                                      www.vedantu.com                                              20\n\f                                            PART B \u2013 BIOLOGY"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Electrophilic Aromatic Alkylation",
    "conceptSlug": "hydrocarbons",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 45,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "imageUrl": "/assets/scientific/neet-phase-2/q45_reaction.png",
    "displayNumber": 45
  },
  {
    "id": "neet-2016-p2-q046",
    "versionId": "neet-2016-p2-q046-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "biotechnology-and-its-applications",
    "unitName": "Biotechnology and Its Applications",
    "topic": "Tools of Recombinant DNA - Ligases",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A foreign DNA and plasmid cut by the same restriction endonuclease can be joined to form a recombinant plasmid using",
    "options": [
      {
        "key": "A",
        "text": "ligase"
      },
      {
        "key": "B",
        "text": "Eco RI"
      },
      {
        "key": "C",
        "text": "Taq polymerase"
      },
      {
        "key": "D",
        "text": "polymerase II"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Ligase are the enzymes used to join substrates. Here in case of DNA T4 DNA ligase is used.\n       ykbxst ,sls ,atkbEl gSa] tks v/k%Lrjksa dks tksM+us ds fy, iz;qDr fd;s tkrs gSaA ;gk\u00a1 DNA ds fy, T4 DNA ykbxst\n       iz;qDr fd;k tkrk gSA"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Tools of Recombinant DNA - Ligases",
    "conceptSlug": "biotechnology-and-its-applications",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 46,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 46
  },
  {
    "id": "neet-2016-p2-q047",
    "versionId": "neet-2016-p2-q047-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "biotechnology-and-its-applications",
    "unitName": "Biotechnology and Its Applications",
    "topic": "Downstream Processing Components",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is not a component of downstream processing?",
    "options": [
      {
        "key": "A",
        "text": "Expression"
      },
      {
        "key": "B",
        "text": "Separation"
      },
      {
        "key": "C",
        "text": "Purification"
      },
      {
        "key": "D",
        "text": "Preservation"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Expression of recombinant DNA is parts of upstream processing.\n       iqu;ksZXkt Mh,u, dh vfHkO;fDr] vuqizokg iz\u00d8e.k dk Hkkx gSA"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Downstream Processing Components",
    "conceptSlug": "biotechnology-and-its-applications",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 47,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 47
  },
  {
    "id": "neet-2016-p2-q048",
    "versionId": "neet-2016-p2-q048-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "biotechnology-and-its-applications",
    "unitName": "Biotechnology and Its Applications",
    "topic": "Restriction Enzymes & Blunt Ends",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following restriction enzymes produces blunt ends?",
    "options": [
      {
        "key": "A",
        "text": "Hind III"
      },
      {
        "key": "B",
        "text": "Sal I"
      },
      {
        "key": "C",
        "text": "Eco RV"
      },
      {
        "key": "D",
        "text": "Xho I"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Eco RV has restriction sequence \u2013\n       Eco RV fuEu izfrca/ku vuq\u00d8e j[krk gS&\n       5' \u2013 GAT        ATC \u2013 3'\n       3' \u2013 CTA        TAG \u2013 5'\n\n\n\n\n                                                  www.vedantu.com                                              21"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Restriction Enzymes & Blunt Ends",
    "conceptSlug": "biotechnology-and-its-applications",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 48,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 48
  },
  {
    "id": "neet-2016-p2-q049",
    "versionId": "neet-2016-p2-q049-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "biotechnology-and-its-applications",
    "unitName": "Biotechnology and Its Applications",
    "topic": "Gene Therapy for ADA Deficiency",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which kind of therapy was given in 1990 to a four-year-old girl with adenosine deaminase (ADA) deficiency?",
    "options": [
      {
        "key": "A",
        "text": "Radiation therapy"
      },
      {
        "key": "B",
        "text": "Gene therapy"
      },
      {
        "key": "C",
        "text": "Chemotherapy"
      },
      {
        "key": "D",
        "text": "Immunotherapy"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Gene Therapy for ADA Deficiency",
    "conceptSlug": "biotechnology-and-its-applications",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 49,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 49
  },
  {
    "id": "neet-2016-p2-q050",
    "versionId": "neet-2016-p2-q050-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Biodiversity Hotspots & Conservation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "How many hot spots of biodiversity in the world have been identified till date by Norman Myers?",
    "options": [
      {
        "key": "A",
        "text": "43"
      },
      {
        "key": "B",
        "text": "17"
      },
      {
        "key": "C",
        "text": "25"
      },
      {
        "key": "D",
        "text": "34"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Biodiversity Hotspots & Conservation",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 50,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 50
  },
  {
    "id": "neet-2016-p2-q051",
    "versionId": "neet-2016-p2-q051-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Hydrothermal Vent Ecosystems & Producers",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The primary producers of the deep-sea hydrothermal vent ecosystem are",
    "options": [
      {
        "key": "A",
        "text": "coral reefs"
      },
      {
        "key": "B",
        "text": "green algae"
      },
      {
        "key": "C",
        "text": "chemosynthetic bacteria"
      },
      {
        "key": "D",
        "text": "blue-green-algae"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Hydrothermal Vent Ecosystems & Producers",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 51,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 51
  },
  {
    "id": "neet-2016-p2-q052",
    "versionId": "neet-2016-p2-q052-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "r-Selected Species Life History",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is correct for r-selected species?",
    "options": [
      {
        "key": "A",
        "text": "Small number of progeny with large size"
      },
      {
        "key": "B",
        "text": "Large number of progeny with small size"
      },
      {
        "key": "C",
        "text": "Large number of progeny with large size"
      },
      {
        "key": "D",
        "text": "Small number of progeny with small size"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "r-Selected Species Life History",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 52,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 52
  },
  {
    "id": "neet-2016-p2-q053",
    "versionId": "neet-2016-p2-q053-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Population Interactions & Signs",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "If '+' sign is assigned to beneficial interaction, '\u2013' sign to detrimental and '0' sign to neutral interaction, then the population interaction represented by '+' '\u2013' refers to",
    "options": [
      {
        "key": "A",
        "text": "parasitism"
      },
      {
        "key": "B",
        "text": "mutualism"
      },
      {
        "key": "C",
        "text": "amensalism"
      },
      {
        "key": "D",
        "text": "commensalism"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Parasitism + , \u2013\n       Mutualism + , +\n       Amensalism 0, \u2013\n       Commensalism +, 0\n       ijthfork + , \u2013\n       lgksidkfjrk + , +\n       varjtkrh; ijthfork 0, \u2013\n       lgHkksftrk +, 0"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Population Interactions & Signs",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 53,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 53
  },
  {
    "id": "neet-2016-p2-q054",
    "versionId": "neet-2016-p2-q054-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Invasive Alien Species & Biodiversity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is correctly matched?",
    "options": [
      {
        "key": "A",
        "text": "Stratification-Population"
      },
      {
        "key": "B",
        "text": "Aerenchyma-Opuntia"
      },
      {
        "key": "C",
        "text": "Age pyramid-Biome"
      },
      {
        "key": "D",
        "text": "Parthenium hysterophorus-Threat to biodiversity"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "(1) Stratification :- Structural component of ecosystem\n       (2) Aerenchyma :- Feature of hydrophytes\n       (3) Age pyramid :- Food chain\n       (4) Parthenium hysterophorus :- Exotic species do not that allow the growth of other plants near it.\n       (1) Lrj.k :- ikfjra=k ds lajpukRed ?kVd\n       (2) Aerenchyma :- Feature of hydrophytes\n       (3) Age pyramid :- Food chain\n       (4) Parthenium hysterophorus :- Exotic species donot that allow the growth of other plants near it.\n\n\n\n\n                                                  www.vedantu.com                                             23"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Invasive Alien Species & Biodiversity",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 54,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 54
  },
  {
    "id": "neet-2016-p2-q055",
    "versionId": "neet-2016-p2-q055-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "IUCN Red List Categories",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Red List contains data or information on",
    "options": [
      {
        "key": "A",
        "text": "marine vertebrates only"
      },
      {
        "key": "B",
        "text": "all economically important plants"
      },
      {
        "key": "C",
        "text": "plants whose products are in international trade"
      },
      {
        "key": "D",
        "text": "threatened species"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Red list of red data bood IUCN (New name WCU) involve threatened species of plants & animals"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "IUCN Red List Categories",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 55,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 55
  },
  {
    "id": "neet-2016-p2-q056",
    "versionId": "neet-2016-p2-q056-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Kingdom Fungi & Cell Wall Composition",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following is wrong for fungi?",
    "options": [
      {
        "key": "A",
        "text": "They are both unicellular and multicellular."
      },
      {
        "key": "B",
        "text": "They are eukaryotic."
      },
      {
        "key": "C",
        "text": "All fungi possess a purely cellulosic cell wall."
      },
      {
        "key": "D",
        "text": "They are heterotrophic"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "In fungi, cell wall is usually composed of Chitin. Cellulosic cell wall is found in oomycetes of\n       phycomycetes in fungi."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Kingdom Fungi & Cell Wall Composition",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 56,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 56
  },
  {
    "id": "neet-2016-p2-q057",
    "versionId": "neet-2016-p2-q057-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Archaebacteria & Methanogens",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Methanogens belong to",
    "options": [
      {
        "key": "A",
        "text": "Slime moulds"
      },
      {
        "key": "B",
        "text": "Eubacteria"
      },
      {
        "key": "C",
        "text": "Archaebacteria"
      },
      {
        "key": "D",
        "text": "Dinoflagellates"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Biogas producing, obligate anaerobe, methanogens are type of Archaebacteria.\n\n\n\n\n                                                      www.vedantu.com                                     24"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Archaebacteria & Methanogens",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 57,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 57
  },
  {
    "id": "neet-2016-p2-q058",
    "versionId": "neet-2016-p2-q058-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Chrysophytes - Diatomaceous Earth",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Select the wrong statement.",
    "options": [
      {
        "key": "A",
        "text": "Diatoms are microscopic and float passively in water."
      },
      {
        "key": "B",
        "text": "The walls of diatoms are easily destructible."
      },
      {
        "key": "C",
        "text": "'Diatomaceous earth' is formed by the cell walls of diatoms."
      },
      {
        "key": "D",
        "text": "Diatoms are chief producers in the oceans."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The wall of diatoms contain cellulose & Silica. It is called frustule. It is non-degrodable. After death it is\n       deposited at the bottom in water & form diatomous earth."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Chrysophytes - Diatomaceous Earth",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 58,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 58
  },
  {
    "id": "neet-2016-p2-q059",
    "versionId": "neet-2016-p2-q059-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Taxonomic Aids - Herbarium Sheet Data",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The label of a herbarium sheet does not carry information on",
    "options": [
      {
        "key": "A",
        "text": "height of the plant"
      },
      {
        "key": "B",
        "text": "date of collection"
      },
      {
        "key": "C",
        "text": "name of collector"
      },
      {
        "key": "D",
        "text": "local names"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "The correct option is (1) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Taxonomic Aids - Herbarium Sheet Data",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 59,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 59
  },
  {
    "id": "neet-2016-p2-q060",
    "versionId": "neet-2016-p2-q060-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Gymnosperms - Conifer Adaptations",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Conifers are adapted to tolerate extreme environmental conditions because of",
    "options": [
      {
        "key": "A",
        "text": "presence of vessels"
      },
      {
        "key": "B",
        "text": "broad hardy leaves"
      },
      {
        "key": "C",
        "text": "superficial stomata"
      },
      {
        "key": "D",
        "text": "thick cuticle"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Presence of thick cuticle, presence of sunken stomata and needle like leaves are xerophytic\n       adaptations of conifers for tolerating extreme environmental conditions.\n\n\n\n\n                                                      www.vedantu.com                                          25"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Gymnosperms - Conifer Adaptations",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 60,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 60
  },
  {
    "id": "neet-2016-p2-q061",
    "versionId": "neet-2016-p2-q061-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Algae - Economic Uses & Phycocolloids",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following statements is wrong?",
    "options": [
      {
        "key": "A",
        "text": "Laminaria and Sargassum are used as food."
      },
      {
        "key": "B",
        "text": "Algae increase the level of dissolved oxygen in the immediate environment."
      },
      {
        "key": "C",
        "text": "Algin is obtained from red algae, and carrageenan from brown algae."
      },
      {
        "key": "D",
        "text": "Agar-agar is obtained from Gelidium. and Gracilaria."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Algin is obtained from Laminaria & Fucus \u2013Brown algae while Carrageenan from chondrus crispes \u2013\n       Red alage"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Algae - Economic Uses & Phycocolloids",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 61,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 61
  },
  {
    "id": "neet-2016-p2-q062",
    "versionId": "neet-2016-p2-q062-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Flower Morphology - Polyadelphous Stamens",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The term 'polyadelphous' is related to",
    "options": [
      {
        "key": "A",
        "text": "calyx"
      },
      {
        "key": "B",
        "text": "gynoecium"
      },
      {
        "key": "C",
        "text": "androecium"
      },
      {
        "key": "D",
        "text": "corolla"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "If filaments of Androecium are joined to form more than two groups but their Anthers separate, it is\n       called polyadelphous Eg :- Citrus."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Flower Morphology - Polyadelphous Stamens",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 62,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 62
  },
  {
    "id": "neet-2016-p2-q063",
    "versionId": "neet-2016-p2-q063-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Stamen Length Variations in Angiosperms",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "How many plants among Indigofera, Sesbania, Salvia, Allium, Aloe, mustard, groundnut, radish, gram and turnip have stamens with different lengths in their flowers?",
    "options": [
      {
        "key": "A",
        "text": "Six"
      },
      {
        "key": "B",
        "text": "Three"
      },
      {
        "key": "C",
        "text": "Four"
      },
      {
        "key": "D",
        "text": "Five"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Salvia, Mustard, Radish and turnip have stamens with different lengths in their flowers\n\n\n\n\n                                                      www.vedantu.com                                                  26"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Stamen Length Variations in Angiosperms",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 63,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 63
  },
  {
    "id": "neet-2016-p2-q064",
    "versionId": "neet-2016-p2-q064-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Flower Symmetry - Actinomorphic Flowers",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Radial symmetry is found in the flowers of",
    "options": [
      {
        "key": "A",
        "text": "Cassia"
      },
      {
        "key": "B",
        "text": "Brassica"
      },
      {
        "key": "C",
        "text": "Trifolium"
      },
      {
        "key": "D",
        "text": "Pisum"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Cassia, Trifolium & Pisum have zygomorphic flowers while Brassica has Actinomorphic flowers (Radial\n       symmerty)"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Flower Symmetry - Actinomorphic Flowers",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 64,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 64
  },
  {
    "id": "neet-2016-p2-q065",
    "versionId": "neet-2016-p2-q065-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Placentation Types - Free Central",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Free-central placentation is found in",
    "options": [
      {
        "key": "A",
        "text": "Citrus"
      },
      {
        "key": "B",
        "text": "Dianthus"
      },
      {
        "key": "C",
        "text": "Argemone"
      },
      {
        "key": "D",
        "text": "Brassica"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Free central placentation is found in Dianthus."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Placentation Types - Free Central",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 65,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 65
  },
  {
    "id": "neet-2016-p2-q066",
    "versionId": "neet-2016-p2-q066-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Plant Anatomy - Cortex & Stele",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Cortex is the region found between",
    "options": [
      {
        "key": "A",
        "text": "endodermis and vascular bundle"
      },
      {
        "key": "B",
        "text": "epidermis and stele"
      },
      {
        "key": "C",
        "text": "pericycle and endodermis"
      },
      {
        "key": "D",
        "text": "endodermis and pith"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Sequence from outside to inside in T.S. of stem is epidermeis, hypodermis, cortex, endodermis, stele\n       (pericycle + vascular tissues + pirh) hence cortex is present between epidermis & stele.\n\n\n\n\n                                                  www.vedantu.com                                     27"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Plant Anatomy - Cortex & Stele",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 66,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 66
  },
  {
    "id": "neet-2016-p2-q067",
    "versionId": "neet-2016-p2-q067-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Secondary Growth - Tyloses in Vessels",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The balloon-shaped structures called tyloses",
    "options": [
      {
        "key": "A",
        "text": "are linked to the ascent of sap through xylem vessels"
      },
      {
        "key": "B",
        "text": "originate in the lumen of vessels"
      },
      {
        "key": "C",
        "text": "characterize the sapwood"
      },
      {
        "key": "D",
        "text": "are extensions of xylem parenchyma cells into vessels"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Ballon like parenchymatous ingrowth in vessels called tyloses which inhibits trans portation of water &\n       minerals in xylem"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Secondary Growth - Tyloses in Vessels",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 67,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 67
  },
  {
    "id": "neet-2016-p2-q068",
    "versionId": "neet-2016-p2-q068-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Enzymes - Catalytic RNA & Ribozymes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A non-proteinaceous enzyme is",
    "options": [
      {
        "key": "A",
        "text": "deoxyribonuclease"
      },
      {
        "key": "B",
        "text": "lysozyme"
      },
      {
        "key": "C",
        "text": "Ribozyme"
      },
      {
        "key": "D",
        "text": "ligase"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Ribozyme is non proteinaceous enzyme as it is 23 rRNA acts as a catalyst during protein synthesis."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Enzymes - Catalytic RNA & Ribozymes",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 68,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 68
  },
  {
    "id": "neet-2016-p2-q069",
    "versionId": "neet-2016-p2-q069-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Cell Organelles - Plant vs. Animal Vacuoles",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Select the mismatch.",
    "options": [
      {
        "key": "A",
        "text": "Methanogens-Prokaryotes"
      },
      {
        "key": "B",
        "text": "Gas vacuoles-Green bacteria"
      },
      {
        "key": "C",
        "text": "Large central vacuoles-Animal cells"
      },
      {
        "key": "D",
        "text": "Protists-Eukaryotes"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Animal cells donot contain large central vacuole, their vacuole is poorely developed or absent.\n\n\n\n\n                                                       www.vedantu.com                                   28"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Cell Organelles - Plant vs. Animal Vacuoles",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 69,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 69
  },
  {
    "id": "neet-2016-p2-q070",
    "versionId": "neet-2016-p2-q070-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Bacterial Cell Appendages & Motility",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Select the wrong statement.",
    "options": [
      {
        "key": "A",
        "text": "Mycoplasma is a a wall-less microorganism."
      },
      {
        "key": "B",
        "text": "Bacterial cell wall is made up of peptidoglycan.cj"
      },
      {
        "key": "C",
        "text": "Pili and fimbriae are mainly involved in motility of bacterial cells."
      },
      {
        "key": "D",
        "text": "Cyanobacteria lack flagellated cells."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Motility is performed by flagella only in bacterial cells while fibriae provide attachment to base and pili\n       forms conjugation tube during conjugation"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Bacterial Cell Appendages & Motility",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 70,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 70
  },
  {
    "id": "neet-2016-p2-q071",
    "versionId": "neet-2016-p2-q071-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Endomembrane System - Lysosomes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A cell organelle containing hydrolytic enzymes is",
    "options": [
      {
        "key": "A",
        "text": "mesosome"
      },
      {
        "key": "B",
        "text": "lysosome"
      },
      {
        "key": "C",
        "text": "microsome"
      },
      {
        "key": "D",
        "text": "ribosome"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Hydrolylic enzyme containing vesicle is called lysosome."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Endomembrane System - Lysosomes",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 71,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 71
  },
  {
    "id": "neet-2016-p2-q072",
    "versionId": "neet-2016-p2-q072-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Cell Cycle - S Phase DNA Synthesis",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "During cell growth, DNA synthesis takes place in",
    "options": [
      {
        "key": "A",
        "text": "M phase"
      },
      {
        "key": "B",
        "text": "S Phase"
      },
      {
        "key": "C",
        "text": "G1 phase"
      },
      {
        "key": "D",
        "text": "G2 phase"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "DNA Polymerase enzyme is synthesized in G1 phase but activates in 'S' phase hence DNA replication\n       takes place in 'S' phase in the presence of DNA polymerase.\n\n\n\n\n                                                      www.vedantu.com                                     29"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Cell Cycle - S Phase DNA Synthesis",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 72,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 72
  },
  {
    "id": "neet-2016-p2-q073",
    "versionId": "neet-2016-p2-q073-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "plant-physiology",
    "unitName": "Plant Physiology",
    "topic": "Respiration - Amphibolic Acetyl-CoA Pathway",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following biomolecules is common to respiration-mediated breakdown of fats, carbohydrates and proteins?",
    "options": [
      {
        "key": "A",
        "text": "Acetyl CoA"
      },
      {
        "key": "B",
        "text": "Glucose-6-phosphate"
      },
      {
        "key": "C",
        "text": "Fructose 1,6-bisphosphate"
      },
      {
        "key": "D",
        "text": "Pyruvic acid"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Acetyl CoA is common intermediate of fats, carbonydrates & proteins during aerobic respiration."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Respiration - Amphibolic Acetyl-CoA Pathway",
    "conceptSlug": "plant-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 73,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 73
  },
  {
    "id": "neet-2016-p2-q074",
    "versionId": "neet-2016-p2-q074-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "plant-physiology",
    "unitName": "Plant Physiology",
    "topic": "Transport in Plants - Phloem Sap Characteristics",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A few drops of sap were collected by cutting across a plant stem by a suitable method. The sap was tested chemically. Which one of the following test results indicates that it is phloem sap?",
    "options": [
      {
        "key": "A",
        "text": "Absence of sugar"
      },
      {
        "key": "B",
        "text": "Acidic"
      },
      {
        "key": "C",
        "text": "Alkaline"
      },
      {
        "key": "D",
        "text": "Low refractive index"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Phloem sap is alkaline due to actively pumping of protons from companion cells to the outer cells."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Transport in Plants - Phloem Sap Characteristics",
    "conceptSlug": "plant-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 74,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 74
  },
  {
    "id": "neet-2016-p2-q075",
    "versionId": "neet-2016-p2-q075-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "plant-physiology",
    "unitName": "Plant Physiology",
    "topic": "Plant Hormones - Auxin & Cytokinin Organogenesis",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "You are given a tissue with its potential for differentiation in an artificial culture. Which of the following pairs of hormones would you add to the medium to secure shoots as well as roots?",
    "options": [
      {
        "key": "A",
        "text": "Gibberellin and abscisic acid"
      },
      {
        "key": "B",
        "text": "IAA and gibberellin"
      },
      {
        "key": "C",
        "text": "Auxin and cytokinin"
      },
      {
        "key": "D",
        "text": "Auxin and abscisic acid"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Auxin and cytokinin ratio regulates the growth of root & shoot as low cocentroation of Auxin and\n       cytokinin promotes shoot growth while higher ratio promotes root growth"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Plant Hormones - Auxin & Cytokinin Organogenesis",
    "conceptSlug": "plant-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 75,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 75
  },
  {
    "id": "neet-2016-p2-q076",
    "versionId": "neet-2016-p2-q076-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "plant-physiology",
    "unitName": "Plant Physiology",
    "topic": "Photoperiodism & Phytochromes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Phytochrome is a",
    "options": [
      {
        "key": "A",
        "text": "chromoprotein"
      },
      {
        "key": "B",
        "text": "flavoprotein"
      },
      {
        "key": "C",
        "text": "glycoprotein"
      },
      {
        "key": "D",
        "text": "lipoprotein"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Phytochromes are chromoproteins"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Photoperiodism & Phytochromes",
    "conceptSlug": "plant-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 76,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 76
  },
  {
    "id": "neet-2016-p2-q077",
    "versionId": "neet-2016-p2-q077-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "plant-physiology",
    "unitName": "Plant Physiology",
    "topic": "Mineral Nutrition - Calcium in Meristems",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which is essential for the growth of root tip?",
    "options": [
      {
        "key": "A",
        "text": "Mn"
      },
      {
        "key": "B",
        "text": "Zn"
      },
      {
        "key": "C",
        "text": "Fe"
      },
      {
        "key": "D",
        "text": "Ca"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Ca promotes the growth of root tip.\n\n\n\n\n                                                    www.vedantu.com                                           31"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Mineral Nutrition - Calcium in Meristems",
    "conceptSlug": "plant-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 77,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 77
  },
  {
    "id": "neet-2016-p2-q078",
    "versionId": "neet-2016-p2-q078-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "plant-physiology",
    "unitName": "Plant Physiology",
    "topic": "Photosynthesis - Photorespiration in C3/C4",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The process which makes major difference between C3 and C4 plants is",
    "options": [
      {
        "key": "A",
        "text": "respiration"
      },
      {
        "key": "B",
        "text": "glycolysis"
      },
      {
        "key": "C",
        "text": "Calvin cycle"
      },
      {
        "key": "D",
        "text": "photorespiration"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Photorospiration differentiat C3 plants from C4 plants due to having high CO2 concentration around\n       RuBP in bundle sheath cells"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Photosynthesis - Photorespiration in C3/C4",
    "conceptSlug": "plant-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 78,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 78
  },
  {
    "id": "neet-2016-p2-q079",
    "versionId": "neet-2016-p2-q079-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Vegetative Propagation in Modified Stems",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following statements is not correct?",
    "options": [
      {
        "key": "A",
        "text": "Water hyacinth, growing in the standing water, drains oxygen from water that leads to the death of\n       fishes."
      },
      {
        "key": "B",
        "text": "Offspring produced by the asexual roduction are called clone."
      },
      {
        "key": "C",
        "text": "Microscopic, motile asexual reproductive structures are called zoospores."
      },
      {
        "key": "D",
        "text": "In potato, banana and ginger, the plantlets arise from the internodes present in the modified stem."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Plantlet always arise from nodes of stem or modified stem\n\n\n\n\n                                                     www.vedantu.com                                      32"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Vegetative Propagation in Modified Stems",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 79,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 79
  },
  {
    "id": "neet-2016-p2-q080",
    "versionId": "neet-2016-p2-q080-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Sexual Reproduction & Genetic Recombination",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which one of the following in&generates new genetic combinations leading to variation?",
    "options": [
      {
        "key": "A",
        "text": "Nucellar polyembryony"
      },
      {
        "key": "B",
        "text": "Vegetative reproduction"
      },
      {
        "key": "C",
        "text": "Parthenogenesis"
      },
      {
        "key": "D",
        "text": "Sexual reproduction"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "New genetic combination develops after sexual reproduction due to following reasons\n       (1) Crossing over during gamete formation\n       (2) Chance combination of gametic fusion"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Sexual Reproduction & Genetic Recombination",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 80,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 80
  },
  {
    "id": "neet-2016-p2-q081",
    "versionId": "neet-2016-p2-q081-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Floral Structure & Pistil Fusion",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Match Column-I with Column-II and select the correct option using the codes given below : Column-I Column-II a. Pistils fused together (i) Gametogenesis b. Formation of gametes (ii) Pistillate c. Hyphae of higher Ascomycetes (iii) Syncarpous d. Unisexual female flower (iv) Dikaryotic dkWye-I dkWye-II d. ,dfyax eknk iq\"i (iv) f}dsU\u00e6dh Codes: a b c d",
    "options": [
      {
        "key": "A",
        "text": "(iii)   (i)         (iv)   (ii)"
      },
      {
        "key": "B",
        "text": "(iv)    (iii)       (i)    (ii)"
      },
      {
        "key": "C",
        "text": "(ii)    (i)         (iv)   (iii)"
      },
      {
        "key": "D",
        "text": "(i)     (ii)        (iv)   (iii)"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "The correct option is (1) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Floral Structure & Pistil Fusion",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 81,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 81
  },
  {
    "id": "neet-2016-p2-q082",
    "versionId": "neet-2016-p2-q082-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Megasporogenesis & Embryo Sac",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In majority of angiosperms",
    "options": [
      {
        "key": "A",
        "text": "a small central cell is present in the embryo sac:"
      },
      {
        "key": "B",
        "text": "egg has a filiform apparatus"
      },
      {
        "key": "C",
        "text": "there are numerous antipodal cells"
      },
      {
        "key": "D",
        "text": "reduction division occurs in the megaspore mother cells"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Megasporogenesis & Embryo Sac",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 82,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 82
  },
  {
    "id": "neet-2016-p2-q083",
    "versionId": "neet-2016-p2-q083-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Pollination Agents in Aquatic Plants",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Pollination in water hyacinth and water lily is brought about by the agency of",
    "options": [
      {
        "key": "A",
        "text": "bats"
      },
      {
        "key": "B",
        "text": "water"
      },
      {
        "key": "C",
        "text": "insects or wind"
      },
      {
        "key": "D",
        "text": "birds"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Pollination Agents in Aquatic Plants",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 83,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 83
  },
  {
    "id": "neet-2016-p2-q084",
    "versionId": "neet-2016-p2-q084-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Ovule Morphology & Megasporangium",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The ovule of an angiosperm is technically equivalent to",
    "options": [
      {
        "key": "A",
        "text": "megaspore"
      },
      {
        "key": "B",
        "text": "megasporangium"
      },
      {
        "key": "C",
        "text": "megasporophyll"
      },
      {
        "key": "D",
        "text": "megaspore mother cell"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Ovule Morphology & Megasporangium",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 84,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 84
  },
  {
    "id": "neet-2016-p2-q085",
    "versionId": "neet-2016-p2-q085-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Semiconservative Replication in Vicia faba",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Taylor conducted the experiments to prove semiconservative mode of chromosome replication on",
    "options": [
      {
        "key": "A",
        "text": "E. coli"
      },
      {
        "key": "B",
        "text": "Vinca rosea"
      },
      {
        "key": "C",
        "text": "Vida faba"
      },
      {
        "key": "D",
        "text": "Drosophila melanogaster"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Semiconservative Replication in Vicia faba",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 85,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 85
  },
  {
    "id": "neet-2016-p2-q086",
    "versionId": "neet-2016-p2-q086-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Chromosomal Mutations - Translocation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The mechanism that causes a gene to move from one linkage group to another is called",
    "options": [
      {
        "key": "A",
        "text": "Corossing-over"
      },
      {
        "key": "B",
        "text": "inversion"
      },
      {
        "key": "C",
        "text": "duplication"
      },
      {
        "key": "D",
        "text": "translocation"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Chromosomal Mutations - Translocation",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 86,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 86
  },
  {
    "id": "neet-2016-p2-q087",
    "versionId": "neet-2016-p2-q087-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Gene Structure - Cistron Concept",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The equivalent of a structural gene is A true breeding plant is",
    "options": [
      {
        "key": "A",
        "text": "recon"
      },
      {
        "key": "B",
        "text": "muton"
      },
      {
        "key": "C",
        "text": "cistron"
      },
      {
        "key": "D",
        "text": "operon"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Gene Structure - Cistron Concept",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 87,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 87
  },
  {
    "id": "neet-2016-p2-q088",
    "versionId": "neet-2016-p2-q088-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Mendelian Genetics - Pure Breeding Lines",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A true breeding plant is",
    "options": [
      {
        "key": "A",
        "text": "Always homozygous recessive in its genetic constitution"
      },
      {
        "key": "B",
        "text": "One that is able to bred on its own"
      },
      {
        "key": "C",
        "text": "Produced due to cross pollination among unrelated plants"
      },
      {
        "key": "D",
        "text": "near homozygous and produces offsspiring of its kind"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Mendelian Genetics - Pure Breeding Lines",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 88,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 88
  },
  {
    "id": "neet-2016-p2-q089",
    "versionId": "neet-2016-p2-q089-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Bacterial 23S rRNA Peptidyl Transferase",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following rRNAs acts as structural RNA as well as ribozyme in bacterial",
    "options": [
      {
        "key": "A",
        "text": "5\u00b78s rRNA"
      },
      {
        "key": "B",
        "text": "5S rRNA"
      },
      {
        "key": "C",
        "text": "18 S rRNA"
      },
      {
        "key": "D",
        "text": "23S rRNA"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Bacterial 23S rRNA Peptidyl Transferase",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 89,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 89
  },
  {
    "id": "neet-2016-p2-q090",
    "versionId": "neet-2016-p2-q090-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Botany)",
    "chapterSlug": "biotechnology-and-its-applications",
    "unitName": "Biotechnology and Its Applications",
    "topic": "Bioreactor Design & Aeration",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Stirred-tank bioreactors have been designed for",
    "options": [
      {
        "key": "A",
        "text": "ensuring anaerobic conditions in the culture vessel"
      },
      {
        "key": "B",
        "text": "purification of product"
      },
      {
        "key": "C",
        "text": "addition of preservatives to the product"
      },
      {
        "key": "D",
        "text": "ailability of oxygen throughout the process"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Bioreactor Design & Aeration",
    "conceptSlug": "biotechnology-and-its-applications",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 90,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 90
  },
  {
    "id": "neet-2016-p2-q091",
    "versionId": "neet-2016-p2-q091-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Criteria for Genetic Material",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A molecule that can act as a genetic material must fulfill the traits given, except",
    "options": [
      {
        "key": "A",
        "text": "it should provide the scope for slow changes that are required for evolution"
      },
      {
        "key": "B",
        "text": "it should be able to express itself in the form of 'Mendelian characters'"
      },
      {
        "key": "C",
        "text": "it should be able to generate its replica"
      },
      {
        "key": "D",
        "text": "it should be unstable structurally and chemicpally"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Genetic material should be stable (chemically) otherwise its expression will change leading to loss in\n\n       several metabolic functions or inconsistency in expression."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Criteria for Genetic Material",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 91,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 91
  },
  {
    "id": "neet-2016-p2-q092",
    "versionId": "neet-2016-p2-q092-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Transcription Template Strand",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "DNA- dependent RNA polymerase catalyzes transcription on the strand of the DNA which is called the",
    "options": [
      {
        "key": "A",
        "text": "antistrand"
      },
      {
        "key": "B",
        "text": "template strand"
      },
      {
        "key": "C",
        "text": "coding strand"
      },
      {
        "key": "D",
        "text": "alpha strand"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The strand of DNA on which RNA Polymerase binds to perform transcription is called template strand.\n\n\n\n\n                                                    www.vedantu.com                                            37"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Transcription Template Strand",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 92,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 92
  },
  {
    "id": "neet-2016-p2-q093",
    "versionId": "neet-2016-p2-q093-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "biology-and-human-welfare",
    "unitName": "Biology and Human Welfare",
    "topic": "Animal Breeding & Interspecific Hybridization",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Interespecific hybridization in the mating of",
    "options": [
      {
        "key": "A",
        "text": "more closely related individuals within same breed for 4-6 generations"
      },
      {
        "key": "B",
        "text": "animals within same breed without having common ancestors"
      },
      {
        "key": "C",
        "text": "two different related species"
      },
      {
        "key": "D",
        "text": "superior males and females of different breeds"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Animal Breeding & Interspecific Hybridization",
    "conceptSlug": "biology-and-human-welfare",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 93,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 93
  },
  {
    "id": "neet-2016-p2-q094",
    "versionId": "neet-2016-p2-q094-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "biology-and-human-welfare",
    "unitName": "Biology and Human Welfare",
    "topic": "HIV Pathogenesis & Immune Attack",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is correct regarding AIDS causative HIV?",
    "options": [
      {
        "key": "A",
        "text": "HIV does not escape but attacks the acquired immune response."
      },
      {
        "key": "B",
        "text": "HIV is enveloped virus containing one molecule of single-stranded RNA and one molecule of\n\n       reverse transcriptase."
      },
      {
        "key": "C",
        "text": "HIV is enveloped virus that contains two identical molecules of single-stranded RNA and tow\n\n       molecules of reverse transcriptase."
      },
      {
        "key": "D",
        "text": "HIV is unenveloped retrovirus."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "HIV attacks helper T cells and not try to hide from them.\n       HIV lgk;d T dksf'kdkvksa ij vk\u00d8e.k djrk gS rFkk buls Lo;a dks Nqikus dk iz;kl ugha djrk gSA"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "HIV Pathogenesis & Immune Attack",
    "conceptSlug": "biology-and-human-welfare",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 94,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 94
  },
  {
    "id": "neet-2016-p2-q095",
    "versionId": "neet-2016-p2-q095-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "biology-and-human-welfare",
    "unitName": "Biology and Human Welfare",
    "topic": "Fisheries - Omega-3 Rich Marine Fishes",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Among the following edible fishes, which one is a marine fish having rich source of omega-3 fatty acids?",
    "options": [
      {
        "key": "A",
        "text": "Mackerel"
      },
      {
        "key": "B",
        "text": "Mystus"
      },
      {
        "key": "C",
        "text": "Mangur"
      },
      {
        "key": "D",
        "text": "Mrigala"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "The correct option is (1) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Fisheries - Omega-3 Rich Marine Fishes",
    "conceptSlug": "biology-and-human-welfare",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 95,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 95
  },
  {
    "id": "neet-2016-p2-q096",
    "versionId": "neet-2016-p2-q096-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "biology-and-human-welfare",
    "unitName": "Biology and Human Welfare",
    "topic": "Industrial Microbes & Bioactive Chemicals",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Match Column-I with Column-II and select the correct option using the codes given below: Column-I Column-II a. Citric acid (i) Trichoderma b. Cyclosporin A (ii) Clostridium c. Statins (iii) Aspergillus d. Butyric (iv) Monascus dkWye-I dkWye-II a. flfV\u00aad vEy (i) V\u00aakbdksMekZ b. lkbDyksLiksfju A (ii) DykWfLV\u00aafM;e c. LVsfVu (iii) ,sLijftyl d. C;wfVfjd vEy (iv) eksuSLdl dwV : a b c d",
    "options": [
      {
        "key": "A",
        "text": "(iii)     (iv)     (i)    (ii)"
      },
      {
        "key": "B",
        "text": "(iii)     (i)      (ii)   (iv)"
      },
      {
        "key": "C",
        "text": "(iii)     (i)      (iv)   (ii)"
      },
      {
        "key": "D",
        "text": "(i)       (iv)     (ii)   (iii)"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Industrial Microbes & Bioactive Chemicals",
    "conceptSlug": "biology-and-human-welfare",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 96,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 96
  },
  {
    "id": "neet-2016-p2-q097",
    "versionId": "neet-2016-p2-q097-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Water Pollution - BOD Limitations",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Biochemical Oxygen Demand (BOD) may not be good index for pollution for water bodies receiving effluents from",
    "options": [
      {
        "key": "A",
        "text": "sugar industry"
      },
      {
        "key": "B",
        "text": "domestic sewage"
      },
      {
        "key": "C",
        "text": "dairy industry"
      },
      {
        "key": "D",
        "text": "petroleum industry"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "BOD is measure of Oxygen required by microbes to remove biodegradable chemicals"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Water Pollution - BOD Limitations",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 97,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 97
  },
  {
    "id": "neet-2016-p2-q098",
    "versionId": "neet-2016-p2-q098-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Competitive Exclusion Principle",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The principle of competitive exclusion was stated by",
    "options": [
      {
        "key": "A",
        "text": "Verhulst and Pearl"
      },
      {
        "key": "B",
        "text": "C. Darwin"
      },
      {
        "key": "C",
        "text": "G. F. Gause"
      },
      {
        "key": "D",
        "text": "MacArthur"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Competitive Exclusion Principle",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 98,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 98
  },
  {
    "id": "neet-2016-p2-q099",
    "versionId": "neet-2016-p2-q099-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Wildlife Conservation - Dachigam Hangul Sanctuary",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following National Parks is home to the famous musk deer or hangul?",
    "options": [
      {
        "key": "A",
        "text": "Dachigam National Park, jammu & Kashmir"
      },
      {
        "key": "B",
        "text": "Keibul Lamjao National Park, Manipur"
      },
      {
        "key": "C",
        "text": "Bandhavgrah National Park, Madhya Pradesh"
      },
      {
        "key": "D",
        "text": "Eaglenest Wildlife Sanctuary, Arunachal Pradesh"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "The correct option is (1) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Wildlife Conservation - Dachigam Hangul Sanctuary",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 99,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 99
  },
  {
    "id": "neet-2016-p2-q100",
    "versionId": "neet-2016-p2-q100-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Eutrophication & Aquatic Mortality",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A lake which is rich in organic waste may result in",
    "options": [
      {
        "key": "A",
        "text": "mortality of fish due to lack of oxygen"
      },
      {
        "key": "B",
        "text": "increased population of aquatic organisms due to minerals"
      },
      {
        "key": "C",
        "text": "drying of the lake due to algal bloom"
      },
      {
        "key": "D",
        "text": "increased population of fish due to lots of nutrients"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Lake with large amount of organic waste will increase BOD of water since microbes will use more\n       Dissolved Oxygen to degrade organic matter"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Eutrophication & Aquatic Mortality",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 100,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 100
  },
  {
    "id": "neet-2016-p2-q101",
    "versionId": "neet-2016-p2-q101-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "ecology-and-environment",
    "unitName": "Ecology and Environment",
    "topic": "Biomagnification of Toxicants (DDT)",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The highest DDT concentration in aquatic food chain shall occur in",
    "options": [
      {
        "key": "A",
        "text": "eel"
      },
      {
        "key": "B",
        "text": "phytoplankton"
      },
      {
        "key": "C",
        "text": "seagull"
      },
      {
        "key": "D",
        "text": "crab"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Bioamplification of nondegradable chemicals is seen as we move upwards in trophic level and thus in\n       Sea gull (bird) level of DDT will be maximum.\n\n\n\n\n                                                    www.vedantu.com                                41"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Biomagnification of Toxicants (DDT)",
    "conceptSlug": "ecology-and-environment",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 101,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 101
  },
  {
    "id": "neet-2016-p2-q102",
    "versionId": "neet-2016-p2-q102-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "biology-and-human-welfare",
    "unitName": "Biology and Human Welfare",
    "topic": "Bacterial Infectious Diseases",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following sets of diseases is caused by bacteria?",
    "options": [
      {
        "key": "A",
        "text": "Herpes and influenza"
      },
      {
        "key": "B",
        "text": "Cholera and tetanus"
      },
      {
        "key": "C",
        "text": "Typhoid and smallpox"
      },
      {
        "key": "D",
        "text": "Tetanus and mumps"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Bacterial Infectious Diseases",
    "conceptSlug": "biology-and-human-welfare",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 102,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 102
  },
  {
    "id": "neet-2016-p2-q103",
    "versionId": "neet-2016-p2-q103-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Taxonomic Hierarchy of Housefly",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Match Column-I with Column-II for housefly classification and select the correct option using the codes given below : Column-I Column-II a. Family (i) Diptera b. Order (ii) Arthropoda c. Clsass (iii) Muscidae d. Phylum (iv) Insecta dkWye-I dkWye-II Codes dwV : a b c d",
    "options": [
      {
        "key": "A",
        "text": "(iv)      (ii)    (i)      (iii)"
      },
      {
        "key": "B",
        "text": "(iii)     (i)     (iv)     (ii)"
      },
      {
        "key": "C",
        "text": "(iii)     (ii)    (iv)     (i)"
      },
      {
        "key": "D",
        "text": "(iv)      (iii)   (ii)     (i)"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Taxonomic Hierarchy of Housefly",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 103,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 103
  },
  {
    "id": "neet-2016-p2-q104",
    "versionId": "neet-2016-p2-q104-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Chordata - Cyclostome Features",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Choose the correct statement.",
    "options": [
      {
        "key": "A",
        "text": "All Pisces have gills covered by an operculum."
      },
      {
        "key": "B",
        "text": "All mammals are viviparous."
      },
      {
        "key": "C",
        "text": "All cyclostomes do not possess jaws and paired fins."
      },
      {
        "key": "D",
        "text": "All reptiles have a three-chambered heart."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Chordata - Cyclostome Features",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 104,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 104
  },
  {
    "id": "neet-2016-p2-q105",
    "versionId": "neet-2016-p2-q105-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "diversity-in-living-world",
    "unitName": "Diversity in Living World",
    "topic": "Biological Species Concept & Growth",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Study the four statements (A - D) given below and select the two correct ones out of them : A. Definition of biological species was given by Ernst Mayr. B. Photoperiod does not affect reproduction in plants. C. Binomial nomenclature system was given by R. H. Whittaker. D. In unicellular organisms, reproduction is synonymous with growth. The two correct statements are",
    "options": [
      {
        "key": "A",
        "text": "A and B"
      },
      {
        "key": "B",
        "text": "B and C"
      },
      {
        "key": "C",
        "text": "C and D"
      },
      {
        "key": "D",
        "text": "A and D"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Biological Species Concept & Growth",
    "conceptSlug": "diversity-in-living-world",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 105,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 105
  },
  {
    "id": "neet-2016-p2-q106",
    "versionId": "neet-2016-p2-q106-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Cockroach Reproductive System",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In male cockroaches, sperms are stored in which part of the reproductive system?",
    "options": [
      {
        "key": "A",
        "text": "Vas deferens"
      },
      {
        "key": "B",
        "text": "Seminal vesicles"
      },
      {
        "key": "C",
        "text": "Mushroom glands"
      },
      {
        "key": "D",
        "text": "Testes"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Cockroach Reproductive System",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 106,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 106
  },
  {
    "id": "neet-2016-p2-q107",
    "versionId": "neet-2016-p2-q107-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "structural-organisation",
    "unitName": "Structural Organisation in Animals and Plants",
    "topic": "Animal Tissues - Smooth Muscle Characteristics",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Smooth muscles are",
    "options": [
      {
        "key": "A",
        "text": "voluntary, spindle-shaped, uninucleate"
      },
      {
        "key": "B",
        "text": "involuntary, fusiform, non-striated"
      },
      {
        "key": "C",
        "text": "voluntary, multinucleate, cylindrical"
      },
      {
        "key": "D",
        "text": "involuntary, cylindrical, striated"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Animal Tissues - Smooth Muscle Characteristics",
    "conceptSlug": "structural-organisation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 107,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 107
  },
  {
    "id": "neet-2016-p2-q108",
    "versionId": "neet-2016-p2-q108-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "plant-physiology",
    "unitName": "Plant Physiology",
    "topic": "Oxidative Phosphorylation & ATP Synthesis",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Oxidative phosphorylation is",
    "options": [
      {
        "key": "A",
        "text": "formation of ATP energy released from electrons removed during substrate oxidation"
      },
      {
        "key": "B",
        "text": "formation of ATP by transfer of phosphate group from a substrate to ADP."
      },
      {
        "key": "C",
        "text": "oxidation of phosphate group in ATP"
      },
      {
        "key": "D",
        "text": "addition of phosphate group to ATP"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Oxidative phosphorylation occurs when NADH + H or FADH2 are oxidized and their electron enters in\n       ETC creating proton gradient which finally produce ATP in F0-F1 particle."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Oxidative Phosphorylation & ATP Synthesis",
    "conceptSlug": "plant-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 108,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 108
  },
  {
    "id": "neet-2016-p2-q109",
    "versionId": "neet-2016-p2-q109-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Protein Tertiary Structure & Bonds",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is the least likely to be involved in stabilizing the three-dimensional folding of most proteins?",
    "options": [
      {
        "key": "A",
        "text": "Ester bonds"
      },
      {
        "key": "B",
        "text": "Hydrogen bonds"
      },
      {
        "key": "C",
        "text": "Electrostatic interaction"
      },
      {
        "key": "D",
        "text": "Hydrophobic interaction"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Ester bonds are formed in nucleic acids and lipids, but not proteins.\n       ,LVj ca/k] U;wfDyd vEyksa o fyfiM~~l esa curs gSa] izksVhuksa esa ughaA"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Protein Tertiary Structure & Bonds",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 109,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 109
  },
  {
    "id": "neet-2016-p2-q110",
    "versionId": "neet-2016-p2-q110-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Enzyme Catalysis & Activation Energy Graph",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following describes the given activation energy graph correctly?",
    "options": [
      {
        "key": "A",
        "text": "Exothermic reaction with energy A in absence of enzyme and B in presence of enzyme"
      },
      {
        "key": "B",
        "text": "Endothermic reaction with energy A in presence of enzyme and B in absence of enzyme"
      },
      {
        "key": "C",
        "text": "Exothermic reaction with energy A in presence of enzyme and B in absence of enzyme"
      },
      {
        "key": "D",
        "text": "Endothermic reaction with energy A in absence of enzyme and B in presence of enzyme."
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Enzyme Catalysis & Activation Energy Graph",
    "conceptSlug": "cell-structure-and-function",
    "imageUrl": "/assets/scientific/neet-phase-2/q110_diagram.png",
    "contentBlocks": [
      {
        "id": "q110-b1",
        "type": "text",
        "order": 1,
        "rawContent": "Which of the following describes the given activation energy graph correctly?"
      },
      {
        "id": "q110-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q110_diagram.png",
        "accessibilityDescription": "Potential energy vs reaction progress graph with enzyme (A) and without enzyme (B)"
      }
    ],
    "multilingual": {
      "hi": {
        "text": "\u0928\u093f\u092e\u094d\u0928 \u092e\u0947\u0902 \u0938\u0947 \u0915\u094c\u0928-\u0938\u093e \u0926\u093f\u092f\u0947 \u0917\u092f\u0947 \u0917\u094d\u0930\u093e\u092b \u0915\u093e \u0938\u0939\u0940 \u0935\u0930\u094d\u0923\u0928 \u0915\u0930\u0924\u093e \u0939\u0948?",
        "options": [
          {
            "key": "A",
            "text": "Exothermic reaction with energy A in absence of enzyme and B in presence of enzyme"
          },
          {
            "key": "B",
            "text": "Endothermic reaction with energy A in presence of enzyme and B in absence of enzyme"
          },
          {
            "key": "C",
            "text": "Exothermic reaction with energy A in presence of enzyme and B in absence of enzyme"
          },
          {
            "key": "D",
            "text": "Endothermic reaction with energy A in absence of enzyme and B in presence of enzyme."
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 110,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 45
    },
    "displayNumber": 110
  },
  {
    "id": "neet-2016-p2-q111",
    "versionId": "neet-2016-p2-q111-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Cell Cycle Checkpoints - G2/M Arrest",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "When cell has stalled DNA replication fork, which checkpoint should be predominantly activated?",
    "options": [
      {
        "key": "A",
        "text": "Both G2/M and M"
      },
      {
        "key": "B",
        "text": "G1/S"
      },
      {
        "key": "C",
        "text": "G2/M"
      },
      {
        "key": "D",
        "text": "M"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "G2/M check point ensures that DNA Replication is complete and no error is left.\n\n\n\n\n                                                 www.vedantu.com                                              46"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Cell Cycle Checkpoints - G2/M Arrest",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 111,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 111
  },
  {
    "id": "neet-2016-p2-q112",
    "versionId": "neet-2016-p2-q112-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "cell-structure-and-function",
    "unitName": "Cell Structure and Function",
    "topic": "Meiotic Stages - Prophase I Sub-phases",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Match the stages of meiosis in Column-I to their characteristic features in Column-II and select the correct option using the codes given below : Column-I Column-II a. Pachytene (i) Pairing of homologous chromosomes b. Metaphase I (ii) Terminalization of chiasmata - c. Diakinesis (iii) Grossing-over takes place d. Zygotenev (iV) Chromosomes align at equatorial plate Codes: a b c d",
    "options": [
      {
        "key": "A",
        "text": "(iv)      (iii)     (ii)    (i)"
      },
      {
        "key": "B",
        "text": "(iii)     (iv)      (ii)    (i)"
      },
      {
        "key": "C",
        "text": "(i)       (iv)      (ii)    (iii)"
      },
      {
        "key": "D",
        "text": "(ii)      (iv)      (iii)   (i)"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Meiotic Stages - Prophase I Sub-phases",
    "conceptSlug": "cell-structure-and-function",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 112,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 112
  },
  {
    "id": "neet-2016-p2-q113",
    "versionId": "neet-2016-p2-q113-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Gastrointestinal Hormones - CCK & Secretin",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which hormones do stimulate the production of pancreatic juice and bicarbonate?",
    "options": [
      {
        "key": "A",
        "text": "Insulin and glucagon"
      },
      {
        "key": "B",
        "text": "Angiotensin and epinephrine"
      },
      {
        "key": "C",
        "text": "Gastrin and insulin"
      },
      {
        "key": "D",
        "text": "Cholecystokinin and secretin"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Pancreatic juice rich in enzymes is secreted under influence of cholecystokinin, while pancreatic juice\n       rich in bicarbonates is secreted under influence of secretin.\n       ,atkbeksa ls izpqj vXuk'k;h jl] dksysfLkLVksdkbfuu ds izHkko esa \u00f2kfor fd;k tkrk gS] tcfd ckbdkcksZusV~l ls izpqj\n       vXuk'k;h jl flf\u00d8Vhu ds izHkko esa \u00f2kfor fd;k tkrk gSA"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Gastrointestinal Hormones - CCK & Secretin",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 113,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 113
  },
  {
    "id": "neet-2016-p2-q114",
    "versionId": "neet-2016-p2-q114-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Respiratory Physiology - Alveolar Gas Exchange",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The partial pressure of oxygen in the alveoli of the lungs is",
    "options": [
      {
        "key": "A",
        "text": "less than that of carbon dioxide"
      },
      {
        "key": "B",
        "text": "equal to that in the blood"
      },
      {
        "key": "C",
        "text": "more than that in the blood"
      },
      {
        "key": "D",
        "text": "less than that in the blood"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "pO2 in Alveoli is 104, while in oxygenated blood, it is 95.\n       dwfidkvksa esa pO2, 104 gksrk gS] tcfd vkWDlhtfur jDr esa ;g 95 gksrk gSA"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Respiratory Physiology - Alveolar Gas Exchange",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 114,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 114
  },
  {
    "id": "neet-2016-p2-q115",
    "versionId": "neet-2016-p2-q115-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Sensory Reception - Photoreceptor Potentials",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Choose the correct statement.",
    "options": [
      {
        "key": "A",
        "text": "Receptors do not produce graded potentials."
      },
      {
        "key": "B",
        "text": "Nociceptors respond to changes in pressure."
      },
      {
        "key": "C",
        "text": "Meissner's corpuscles are thermoreceptors."
      },
      {
        "key": "D",
        "text": "Photoreceptors in the human eye are depolarized during darkness and become hyperpolarized in"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Photoreceptors in the human eye are depolarized during darkness and become hyperpolarized in\n       response to the light stimulus."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Sensory Reception - Photoreceptor Potentials",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 115,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 115
  },
  {
    "id": "neet-2016-p2-q116",
    "versionId": "neet-2016-p2-q116-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Endocrine Disorders - Graves' Disease",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Graves' disease is caused due to",
    "options": [
      {
        "key": "A",
        "text": "hypersecretion of adrenal gland"
      },
      {
        "key": "B",
        "text": "hyposecretion of thyroid gland"
      },
      {
        "key": "C",
        "text": "hypersecretion of thyroid gland"
      },
      {
        "key": "D",
        "text": "hyposecretion of adrenal gland"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Graves' disease is caused due to hypersecretion of thyroid gland"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Endocrine Disorders - Graves' Disease",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 116,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 116
  },
  {
    "id": "neet-2016-p2-q117",
    "versionId": "neet-2016-p2-q117-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Muscular Contraction - Calcium Ion Unmasking",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Name the ion responsible for unmasking of active sites for myosin for cross-bridge activity during muscle contraction.",
    "options": [
      {
        "key": "A",
        "text": "Potassium"
      },
      {
        "key": "B",
        "text": "Calcium"
      },
      {
        "key": "C",
        "text": "Magnesium"
      },
      {
        "key": "D",
        "text": "Sodium"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Calcium ion is responsible for unmasking of active sites for myosin for cross-bridge activity during\n       muscle contraction"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Muscular Contraction - Calcium Ion Unmasking",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 117,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 117
  },
  {
    "id": "neet-2016-p2-q118",
    "versionId": "neet-2016-p2-q118-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Circulatory System - Thrombocytes & Clotting",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Name the blood cells, whose reduction in number can cause clotting disorder, leading to excessive loss of blood from the body.",
    "options": [
      {
        "key": "A",
        "text": "Thrombocytes"
      },
      {
        "key": "B",
        "text": "Erythrocytes"
      },
      {
        "key": "C",
        "text": "Leucocytes"
      },
      {
        "key": "D",
        "text": "Neutrophils"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Thrombocytes"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Circulatory System - Thrombocytes & Clotting",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 118,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 118
  },
  {
    "id": "neet-2016-p2-q119",
    "versionId": "neet-2016-p2-q119-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Endocrine Pancreas - Insulin Action",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Name a peptide hormone which acts mainly on hepatocytes, adipocytes and enhances cellular glucose uptake and utilization.",
    "options": [
      {
        "key": "A",
        "text": "Gastrin"
      },
      {
        "key": "B",
        "text": "Insulin"
      },
      {
        "key": "C",
        "text": "Glucagon"
      },
      {
        "key": "D",
        "text": "Secretin"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Insulin is a peptide hormone which acts mainly on hepatocytes, adipocytes and enhances cellular\n       glucose uptake and utilization."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Endocrine Pancreas - Insulin Action",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 119,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 119
  },
  {
    "id": "neet-2016-p2-q120",
    "versionId": "neet-2016-p2-q120-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Skeletal Disorders - Osteoporosis & Estrogen",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Osteoporosis, an age related disease of skeletal system , may occur due to",
    "options": [
      {
        "key": "A",
        "text": "accumulation of uric acid leading to inflammation of joints"
      },
      {
        "key": "B",
        "text": "immune disorder affecting neuromuscular junction leading to fatigue"
      },
      {
        "key": "C",
        "text": "high concentration of Ca++ and Na+"
      },
      {
        "key": "D",
        "text": "decreased level of estrogen"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Osteoporosis, an age related disease of skeletal system , may occur due to decreased level of\n       estrogen"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Skeletal Disorders - Osteoporosis & Estrogen",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 120,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 120
  },
  {
    "id": "neet-2016-p2-q121",
    "versionId": "neet-2016-p2-q121-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Body Fluids - Blood Serum Composition",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Serum differs from blood in",
    "options": [
      {
        "key": "A",
        "text": "lacking antibodies"
      },
      {
        "key": "B",
        "text": "lacking globulins"
      },
      {
        "key": "C",
        "text": "lacking albumins"
      },
      {
        "key": "D",
        "text": "lacking clotting factors"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Blood Plasma\u2013clotting factors =Serum\n\n\n\n\n                                                   www.vedantu.com                                     51"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Body Fluids - Blood Serum Composition",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 121,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 121
  },
  {
    "id": "neet-2016-p2-q122",
    "versionId": "neet-2016-p2-q122-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Breathing Mechanics - Intrapleural Pressure",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Lungs do not collapse between breaths and some air always remains in the lungs which can never be expelled because",
    "options": [
      {
        "key": "A",
        "text": "pressure in the lungs is higher than the atmospheric pressure"
      },
      {
        "key": "B",
        "text": "there is a negative pressure in the lungs"
      },
      {
        "key": "C",
        "text": "there is a negative intrapleural pressure pulling at the lung walls"
      },
      {
        "key": "D",
        "text": "there is a positive intrapleural pressure"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Lungs do not collapse between breaths and some air always remains in the lungs which can never be\n       expelled because there is a negative intrapleural pressure pulling at the lung walls"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Breathing Mechanics - Intrapleural Pressure",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 122,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 122
  },
  {
    "id": "neet-2016-p2-q123",
    "versionId": "neet-2016-p2-q123-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Pituitary Gland - Neurohypophysis Storage",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The posterior pituitary gland is not a 'true' endocrine gland because",
    "options": [
      {
        "key": "A",
        "text": "it secretes enzymes"
      },
      {
        "key": "B",
        "text": "it is provided with a duct"
      },
      {
        "key": "C",
        "text": "it only stores and releases hormones"
      },
      {
        "key": "D",
        "text": "it is under the regulation of hypothalamus"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The posterior pituitary gland is not a 'true' endocrine gland because it only stores and releases\n       hormones\n\n\n\n\n                                                      www.vedantu.com                                          52"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Pituitary Gland - Neurohypophysis Storage",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 123,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 123
  },
  {
    "id": "neet-2016-p2-q124",
    "versionId": "neet-2016-p2-q124-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "human-physiology",
    "unitName": "Human Physiology",
    "topic": "Excretory System - PCT Active Reabsorption",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The part of nephron involved in active reabsorption of sodium is",
    "options": [
      {
        "key": "A",
        "text": "descending limb of Henle's loop"
      },
      {
        "key": "B",
        "text": "distal convoluted tubule"
      },
      {
        "key": "C",
        "text": "proximal convoluted tubule"
      },
      {
        "key": "D",
        "text": "Bowman's capsule"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The part of nephron involved in active reabsorption of sodium is proximal convoluted tubule"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Excretory System - PCT Active Reabsorption",
    "conceptSlug": "human-physiology",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 124,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 124
  },
  {
    "id": "neet-2016-p2-q125",
    "versionId": "neet-2016-p2-q125-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Contraception - Hormone-Releasing IUDs",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is hormonereleasing IUD?",
    "options": [
      {
        "key": "A",
        "text": "Cu7"
      },
      {
        "key": "B",
        "text": "LNG-20"
      },
      {
        "key": "C",
        "text": "Multilpad 375"
      },
      {
        "key": "D",
        "text": "Lippes loop"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "LNG-20 is hormone releasing IUD clotting factors"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Contraception - Hormone-Releasing IUDs",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 125,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 125
  },
  {
    "id": "neet-2016-p2-q126",
    "versionId": "neet-2016-p2-q126-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Surgical Contraception - Vasectomy",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is incorrect .regarding vasectomy?",
    "options": [
      {
        "key": "A",
        "text": "Irreversible sterility"
      },
      {
        "key": "B",
        "text": "No sperm occurs in seminal fluid"
      },
      {
        "key": "C",
        "text": "No sperm occurs in epididymis"
      },
      {
        "key": "D",
        "text": "Vasa deferentia is cut and tied"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "No sperm occurs in epididymis"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Surgical Contraception - Vasectomy",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 126,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 126
  },
  {
    "id": "neet-2016-p2-q127",
    "versionId": "neet-2016-p2-q127-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "In Vitro Fertilization & Embryo Transfer",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Embryo with more than 16 blastomeres formed due to in vitro fertilization is transferred into",
    "options": [
      {
        "key": "A",
        "text": "cervix"
      },
      {
        "key": "B",
        "text": "uterus"
      },
      {
        "key": "C",
        "text": "fallopian tube"
      },
      {
        "key": "D",
        "text": "fimbriae"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Embryo with more than 16 blastomeres formed due to in vitro fertilization is transferred into uterus"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "In Vitro Fertilization & Embryo Transfer",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 127,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 127
  },
  {
    "id": "neet-2016-p2-q128",
    "versionId": "neet-2016-p2-q128-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Male Reproductive Duct Pathway",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following depicts the correct pathway of transport of sperms?",
    "options": [
      {
        "key": "A",
        "text": "Efferent ductules \uf0ae Rete testis \uf0ae Vas deferens \uf0ae Epididymis"
      },
      {
        "key": "B",
        "text": "Rete testis \uf0ae Efferent ductules \uf0ae Epididymis \uf0ae Vas deferens"
      },
      {
        "key": "C",
        "text": "Rete testis \uf0ae Epididymis \uf0ae Efferent ductules \uf0ae Vas deferens"
      },
      {
        "key": "D",
        "text": "Rete testis \uf0ae Vas deferens \uf0ae Efferent ductules \uf0ae Epididymis"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct pathway of transport of sperms is\n       Rete testis \uf0ae Efferent ductules \uf0ae Epididymis \uf0ae Vas deferens\n\n\n\n\n                                                     www.vedantu.com                                                 54"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Male Reproductive Duct Pathway",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 128,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 128
  },
  {
    "id": "neet-2016-p2-q129",
    "versionId": "neet-2016-p2-q129-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Human Reproductive Anatomy Terminology",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Match Column-I with Column-II and select the correct option using the codes given below : Column-I Column-II a. Mons pubis (i) Embryo formation b. Antrum (ii) Sperm c. Trophectoderm (iii) Female external genitalia d. Nebenkern (iv) Graafian follicle Codes: a b c d",
    "options": [
      {
        "key": "A",
        "text": "(i)     (iv)   (iii)   (ii)"
      },
      {
        "key": "B",
        "text": "(iii)   (iv)   (ii)    (i)"
      },
      {
        "key": "C",
        "text": "(iii)   (iv)   (i)     (ii)"
      },
      {
        "key": "D",
        "text": "(iii)   (i)    (iv)    (ii)"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Column-I                          Column-II\n         a. Mons pubis                     \u2013Female external genitalia\n         b. Antrum                         \u2013 Graafian follicle\n         c. Trophectoderm                  \u2013 Embryo formation\n         d. Nebenkern                      \u2013 Sperm\n\n\n\n\n                                                      www.vedantu.com                                             55"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Human Reproductive Anatomy Terminology",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 129,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 129
  },
  {
    "id": "neet-2016-p2-q130",
    "versionId": "neet-2016-p2-q130-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "reproduction",
    "unitName": "Reproduction",
    "topic": "Placental Endocrinology",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Several hormones like hCG, hPL, estrogen. progesterone are produced by",
    "options": [
      {
        "key": "A",
        "text": "pituitary"
      },
      {
        "key": "B",
        "text": "ovary"
      },
      {
        "key": "C",
        "text": "placenta"
      },
      {
        "key": "D",
        "text": "fallopian tube"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Colour blind man                     Normal homozygous women\n                   c\n                  XY                                 XX\n       Genotype of son \u2013 XY- normal vision\n       Son receives Y chromosome from father and X chromosomes from mother"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Placental Endocrinology",
    "conceptSlug": "reproduction",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 130,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 130
  },
  {
    "id": "neet-2016-p2-q131",
    "versionId": "neet-2016-p2-q131-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Sex-Linked Inheritance - Color Blindness",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "If a colour-blind man marries a woman who is homozygous for normal colour vision, the probability of their son being colour-blind is",
    "options": [
      {
        "key": "A",
        "text": "1"
      },
      {
        "key": "B",
        "text": "0"
      },
      {
        "key": "C",
        "text": "0\u00b75"
      },
      {
        "key": "D",
        "text": "0.75"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The correct option is (2) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Sex-Linked Inheritance - Color Blindness",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 131,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 131
  },
  {
    "id": "neet-2016-p2-q132",
    "versionId": "neet-2016-p2-q132-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Mechanisms of Evolution - Genetic Drift",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Genetic drift operates in",
    "options": [
      {
        "key": "A",
        "text": "slow reproductive population"
      },
      {
        "key": "B",
        "text": "small isolated population"
      },
      {
        "key": "C",
        "text": "large isolated population"
      },
      {
        "key": "D",
        "text": "non-reproductive population"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "Genetic drift operates in small isolated population"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Mechanisms of Evolution - Genetic Drift",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 132,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 132
  },
  {
    "id": "neet-2016-p2-q133",
    "versionId": "neet-2016-p2-q133-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Population Genetics - Hardy-Weinberg Equation",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In Hardy-Weinberg equation, the frequency of heterozygous individual is represented by",
    "options": [
      {
        "key": "A",
        "text": "q2"
      },
      {
        "key": "B",
        "text": "p2"
      },
      {
        "key": "C",
        "text": "2pq"
      },
      {
        "key": "D",
        "text": "pq"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "In Hardy-Weinberg equation, the frequency of heterozygous individual is represented by 2pq"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Population Genetics - Hardy-Weinberg Equation",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 133,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 133
  },
  {
    "id": "neet-2016-p2-q134",
    "versionId": "neet-2016-p2-q134-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Human Evolution Chronology",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The chronological order of human evolution from early to the recent is",
    "options": [
      {
        "key": "A",
        "text": "Australopithecus \uf0ae Homo habilis \uf0ae Ramapithecus \uf0ae Homo erectus"
      },
      {
        "key": "B",
        "text": "AustraloPithecus \uf0ae Ramapithecus \uf0ae Homo habilis \uf0ae Homo erectus"
      },
      {
        "key": "C",
        "text": "Ramapithecus \uf0ae Australopithecus\uf0ae Homo habilis \uf0ae Homo erectus"
      },
      {
        "key": "D",
        "text": "Ramapiihecus \uf0ae Homo habilis \uf0ae Australopithecus\uf0ae Homo erectus"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The chronological order of human evolution from early to the recent is\n       Ramapithecus \uf0ae Australopithecus\uf0ae Homo habilis \uf0ae Homo erectus"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Human Evolution Chronology",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 134,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 134
  },
  {
    "id": "neet-2016-p2-q135",
    "versionId": "neet-2016-p2-q135-v1",
    "examSlug": "neet",
    "subjectSlug": "biology",
    "subjectName": "Biology (Zoology)",
    "chapterSlug": "genetics-and-evolution",
    "unitName": "Genetics and Evolution",
    "topic": "Chemical Origin of Life Sequence",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following is the correct sequence of events in the origin of life? I. Formation of protobionts II. Synthesis of organic monomers III. Synthesis of organic polymers IV. Formation of DNA-based genetic systems",
    "options": [
      {
        "key": "A",
        "text": "II, III, IV, I"
      },
      {
        "key": "B",
        "text": "II, III, IV"
      },
      {
        "key": "C",
        "text": "I, III, II, IV"
      },
      {
        "key": "D",
        "text": "II, III, I, IV"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct sequence of events in the origin of life is\n       Synthesis of organic monomers \u2013 Synthesis of organic polymers \u2013 Formation of protobionts\n       \u2013 Formation of DNA-based genetic systems\n\n\n\n\n                                                    www.vedantu.com                               58\n\f                                              PART C \u2013 PHYSICS"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Chemical Origin of Life Sequence",
    "conceptSlug": "genetics-and-evolution",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 135,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 135
  },
  {
    "id": "neet-2016-p2-q136",
    "versionId": "neet-2016-p2-q136-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "optics",
    "unitName": "Optics",
    "topic": "Refraction & Vision Correction Lenses",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A person can see clearly object only when they lie between 50 cm and 400 cm from his eyes. In order to increase the maximum distance of distinct vision to infinity, the type and power of the correcting lens, the person has to use, will be :",
    "options": [
      {
        "key": "A",
        "text": "conves, +0.15 diopter"
      },
      {
        "key": "B",
        "text": "conves, +2.25 diopter"
      },
      {
        "key": "C",
        "text": "conves, \u20130.25 diopter"
      },
      {
        "key": "D",
        "text": "conves, \u20130.2 diopter"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "- =                        \u21d2              - =\n       v u f                                  - 4m \uf0a5 f\n                                                          1    1\n       \u21d2        f = \u2013 4m           \u21d2          power =       =    = \u2013 0.25D\n                                                          f   -4"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Refraction & Vision Correction Lenses",
    "conceptSlug": "optics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 136,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 136
  },
  {
    "id": "neet-2016-p2-q137",
    "versionId": "neet-2016-p2-q137-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "optics",
    "unitName": "Optics",
    "topic": "Wave Optics - Single Slit Diffraction Minima",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A linear aperture whose width is 0.02 cm is placed immediately in front of a lens of focal length 60 cm. The aperture is illuminated normally by a parallel beam of wavelength 5 \u00d7 10\u20135 cm. The distance of the first dark band of the diffraction pattern from the centre of the screen is :",
    "options": [
      {
        "key": "A",
        "text": "0.15 cm"
      },
      {
        "key": "B",
        "text": "0.10 cm"
      },
      {
        "key": "C",
        "text": "0.25 cm"
      },
      {
        "key": "D",
        "text": "0.20 cm"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "Position of Ist minima\n\n             \u03bbD (5 \uf0b4 10-8 )(0.6)\n       y=       =\n              a   0.02 \uf0b4 10-2\n       y = 0.15 cm"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Wave Optics - Single Slit Diffraction Minima",
    "conceptSlug": "optics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 137,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 137
  },
  {
    "id": "neet-2016-p2-q138",
    "versionId": "neet-2016-p2-q138-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "dual-nature-of-matter-and-radiation",
    "unitName": "Dual Nature of Matter and Radiation",
    "topic": "de-Broglie Wavelength & X-Ray Cutoff",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Electrons of mass $m$ with de-Broglie wavelength $\\lambda$ fall on the target in an X-ray tube. The cutoff wavelength ($\\lambda_0$) of the emitted X-rays is :",
    "options": [
      {
        "key": "A",
        "text": "$\\lambda_0 = \\lambda$"
      },
      {
        "key": "B",
        "text": "$\\lambda_0 = \\frac{2mc\\lambda^2}{h}$"
      },
      {
        "key": "C",
        "text": "$\\lambda_0 = \\frac{2h}{mc}$"
      },
      {
        "key": "D",
        "text": "$\\lambda_0 = \\frac{2m^2c^2\\lambda^3}{h^2}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "K.E. of electrons =    = \uf0e8 \uf0f8 =\n                           2m    2m   2m \u03bb2\n       So maximum energy of photon will also be this much.\n\n       hc    h2          2mc\u03bb2\n          =       \u21d2\uf020\u03bb0 =\n       \u03bb0   2m \u03bb2          h"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "de-Broglie Wavelength & X-Ray Cutoff",
    "conceptSlug": "dual-nature-of-matter-and-radiation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 138,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 138
  },
  {
    "id": "neet-2016-p2-q139",
    "versionId": "neet-2016-p2-q139-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "dual-nature-of-matter-and-radiation",
    "unitName": "Dual Nature of Matter and Radiation",
    "topic": "Photoelectric Effect - Stopping Potential",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Photons with energy 5 eV are incident on a cathode C in a photoelectric cell. The maximum energy of emitted photoelectrons is 2 eV. When photons of energy 6eV are incident on C, no photoelectrons will reach the anode A, if the stopping potential of A relative to C is :",
    "options": [
      {
        "key": "A",
        "text": "\u20133 V"
      },
      {
        "key": "B",
        "text": "+3 V"
      },
      {
        "key": "C",
        "text": "+4 V"
      },
      {
        "key": "D",
        "text": "\u20131 V"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "kmax = h\uf06e \u2013 \uf066\n       2eV = 5eV \u2013 \uf066 \u21d2 \uf066 = 3eV\n       So Vst = 3 volt\n       Vcathode \u2013 Vanode = 3 volt\n       Vanode \u2013 Vcathode = \u2013 3 volt"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Photoelectric Effect - Stopping Potential",
    "conceptSlug": "dual-nature-of-matter-and-radiation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 139,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 139
  },
  {
    "id": "neet-2016-p2-q140",
    "versionId": "neet-2016-p2-q140-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "atoms-and-nuclei",
    "unitName": "Atoms and Nuclei",
    "topic": "Hydrogen Spectrum - Orbital Transitions",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "If an electron in a hydrogen atom jumps from the 3rd orbit to the 2nd orbit, it emits a photon of wavelength $\\lambda$. When it jumps from the 4th orbit to the 3rd orbit, the corresponding wavelength of the photon will be :",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{20}{13}\\lambda$"
      },
      {
        "key": "B",
        "text": "$\\frac{16}{25}\\lambda$"
      },
      {
        "key": "C",
        "text": "$\\frac{9}{16}\\lambda$"
      },
      {
        "key": "D",
        "text": "$\\frac{20}{7}\\lambda$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "= Re \uf0e7 2 \u2013 2 \uf0f7\n       \u03bb      \uf0e82   3 \uf0f8\n\n       1       \uf0e6 1   1 \uf0f6\n          = Re \uf0e7 2 \u2013 2 \uf0f7\n       \u03bb'      \uf0e83   4 \uf0f8\n\n                       20\n       dividing \u03bb' =      \u03bb         \n                        7\n\n\n\n\n                                                    www.vedantu.com                                                 60"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Hydrogen Spectrum - Orbital Transitions",
    "conceptSlug": "atoms-and-nuclei",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 140,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 140
  },
  {
    "id": "neet-2016-p2-q141",
    "versionId": "neet-2016-p2-q141-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "atoms-and-nuclei",
    "unitName": "Atoms and Nuclei",
    "topic": "Radioactive Decay Kinetics & Half-Life",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The half-life of a radioactive substance is 30 minutes. The time (in minutes) taken between 40% decay and 85% decay of the same radioactive substance is :",
    "options": [
      {
        "key": "A",
        "text": "60"
      },
      {
        "key": "B",
        "text": "15"
      },
      {
        "key": "C",
        "text": "30"
      },
      {
        "key": "D",
        "text": "45"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "N1 = 0.6 N0\n       N2 = 0.15 N0\n                  2\n       N2 \uf0e6 1 \uf0f6\n         = \uf0e7 \uf0f7 so two half life period has passed\n       N1 \uf0e8 2 \uf0f8\n       so time taken = 2t1/2 = 2 \u00d7 30 = 60 minutes"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Radioactive Decay Kinetics & Half-Life",
    "conceptSlug": "atoms-and-nuclei",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 141,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 141
  },
  {
    "id": "neet-2016-p2-q142",
    "versionId": "neet-2016-p2-q142-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electronic-devices",
    "unitName": "Electronic Devices",
    "topic": "Transistor Amplifier in CE Configuration",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "For CE transistor amplifier, the audio signal voltage across the collector resistance of 2 k\u03a9 is 4V. If the current amplification factor of the transistor is 100 and the base resistance is 1 k\u03a9, then the input signal voltage is :",
    "options": [
      {
        "key": "A",
        "text": "15 mV"
      },
      {
        "key": "B",
        "text": "10 mV"
      },
      {
        "key": "C",
        "text": "20 mV"
      },
      {
        "key": "D",
        "text": "30 mV"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "AV = \uf062\n                Rin\n\n                       2k\u03a9\n       AV = 100 \u00d7                   \u21d2        AV = 200\n                       1k\u03a9\n\n              \uf028 Vout \uf029AC                                   4\n       AV =              = 200      \u21d2        (Vin)AC =        = 200 mV                \n               \uf028 Vm \uf029AC                                   200"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Transistor Amplifier in CE Configuration",
    "conceptSlug": "electronic-devices",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 142,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 142
  },
  {
    "id": "neet-2016-p2-q143",
    "versionId": "neet-2016-p2-q143-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electronic-devices",
    "unitName": "Electronic Devices",
    "topic": "Semiconductor Diodes in Circuit",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The given circuit has two ideal diodes connected as shown in the figure below. The current flowing through the resistance $\\text{R}_1$ will be :",
    "options": [
      {
        "key": "A",
        "text": "3.13 A"
      },
      {
        "key": "B",
        "text": "2.5 A"
      },
      {
        "key": "C",
        "text": "10.0 A"
      },
      {
        "key": "D",
        "text": "1.43 A"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "The diode D1 will be be in reverse bias, so it will block the current and diode D1 will be in forward bias,\n       so it will pass the current\n              10\n       i=        = 2.5 A               \n             2+2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Semiconductor Diodes in Circuit",
    "conceptSlug": "electronic-devices",
    "imageUrl": "/assets/scientific/neet-phase-2/q143_diagram.png",
    "contentBlocks": [
      {
        "id": "q143-b1",
        "type": "text",
        "order": 1,
        "rawContent": "The given circuit has two ideal diodes connected as shown in the figure below. The current flowing through the resistance $\\text{R}_1$ will be :"
      },
      {
        "id": "q143-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q143_diagram.png",
        "accessibilityDescription": "Circuit with 10V battery, R1=2 ohm, Diode D1, R2=3 ohm, Diode D2, R3=2 ohm"
      }
    ],
    "multilingual": {
      "hi": {
        "text": "\u0926\u094b \u0906\u0926\u0930\u094d\u0936 \u0921\u093e\u092f\u094b\u0921\u094b\u0902 \u0915\u094b \u092a\u0930\u093f\u092a\u0925 \u092e\u0947\u0902 \u0928\u0940\u091a\u0947 \u0926\u093f\u092f\u0947 \u0906\u0930\u0947\u0916 \u092e\u0947\u0902 \u0926\u0930\u094d\u0936\u093e\u092f\u0947 \u0917\u092f\u0947 \u0905\u0928\u0941\u0938\u093e\u0930 \u091c\u094b\u0921\u093c\u093e \u0917\u092f\u093e \u0939\u0948\u0964 $\\text{R}_1$ \u092a\u094d\u0930\u0924\u093f\u0930\u094b\u0927 \u0938\u0947 \u092a\u094d\u0930\u0935\u093e\u0939\u093f\u0924 \u0927\u093e\u0930\u093e \u0915\u093e \u092e\u093e\u0928 \u0939\u094b\u0917\u093e :",
        "options": [
          {
            "key": "A",
            "text": "3.13 A"
          },
          {
            "key": "B",
            "text": "2.5 A"
          },
          {
            "key": "C",
            "text": "10.0 A"
          },
          {
            "key": "D",
            "text": "1.43 A"
          }
        ]
      }
    },
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 143,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 61
    },
    "displayNumber": 143
  },
  {
    "id": "neet-2016-p2-q144",
    "versionId": "neet-2016-p2-q144-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electronic-devices",
    "unitName": "Electronic Devices",
    "topic": "Digital Electronics - Logic Gate Combinations",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "What is the output $\\text{Y}$ in the following circuit, when all the three inputs $\\text{A}, \\text{B}, \\text{C}$ are first 0 and then 1?",
    "options": [
      {
        "key": "A",
        "text": "1, 1"
      },
      {
        "key": "B",
        "text": "0, 1"
      },
      {
        "key": "C",
        "text": "0, 0"
      },
      {
        "key": "D",
        "text": "1, 0"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "1                     C 1"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Digital Electronics - Logic Gate Combinations",
    "conceptSlug": "electronic-devices",
    "imageUrl": "/assets/scientific/neet-phase-2/q144_diagram.png",
    "contentBlocks": [
      {
        "id": "q144-b1",
        "type": "text",
        "order": 1,
        "rawContent": "What is the output $\\text{Y}$ in the following circuit, when all the three inputs $\\text{A}, \\text{B}, \\text{C}$ are first 0 and then 1?"
      },
      {
        "id": "q144-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q144_diagram.png",
        "accessibilityDescription": "Logic gates circuit with AND gate P and NAND gate Q"
      }
    ],
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 144,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 62
    },
    "displayNumber": 144
  },
  {
    "id": "neet-2016-p2-q145",
    "versionId": "neet-2016-p2-q145-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "physics-and-measurement",
    "unitName": "Physics and Measurement",
    "topic": "Dimensional Analysis of Fundamental Constants",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Planck's constant (h), speed of light in vacuum (c) and Newton's gravitational constant (G) are three fundamental constants. Which of the following combinations of these has dimension of length? Gc hG hG hc",
    "options": [
      {
        "key": "A",
        "text": "3/2"
      },
      {
        "key": "B",
        "text": "3 / 2"
      },
      {
        "key": "C",
        "text": "5 / 2"
      },
      {
        "key": "D",
        "text": "h                          c                            c                          G"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "L = (h)a (c)b (G)c\n       m0L1T0 = (m1L2T\u20131)9 (L1T\u20131)B (m\u20131C3T\u20132)c\n       a \u2013 c = 0,           2a + b + 3c = 1,               \u2013 a \u2013 b \u2013 2c = 0\n       solving b = \u2013 3/2, a = 1/2, c = 1/2\n\n                 hG\n       L=        3/2\n                            \n             c\n\n\n\n\n                                                           www.vedantu.com                                           62"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Dimensional Analysis of Fundamental Constants",
    "conceptSlug": "physics-and-measurement",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 145,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 145
  },
  {
    "id": "neet-2016-p2-q146",
    "versionId": "neet-2016-p2-q146-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "kinematics",
    "unitName": "Kinematics",
    "topic": "Rectilinear Motion & Relative Velocity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Two cars P and Q start from a point at the same time in a straight line and their positions are represented by $x_P(t) = at + bt^2$ and $x_Q(t) = ft - t^2$. At what time do the cars have the same velocity?",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{f - a}{2(1 + b)}$"
      },
      {
        "key": "B",
        "text": "$\\frac{a - f}{1 + b}$"
      },
      {
        "key": "C",
        "text": "$\\frac{a + f}{2(b - 1)}$"
      },
      {
        "key": "D",
        "text": "$\\frac{a + f}{2(1 + b)}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "VP = VQ\n                                                     f \u2013a\n       a + 2bt = f \u2013 2t              \u21d2        t=                \n                                                   2 \uf028 b + 1\uf029\n\n                                          2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Rectilinear Motion & Relative Velocity",
    "conceptSlug": "kinematics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 146,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 146
  },
  {
    "id": "neet-2016-p2-q147",
    "versionId": "neet-2016-p2-q147-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "kinematics",
    "unitName": "Kinematics",
    "topic": "Circular Motion Acceleration Vector Resolution",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "In the given figure, $a = 15\\text{ m/s}^2$ represents the total acceleration of a particle moving in the clockwise direction in a circle of radius $R = 2.5\\text{ m}$ at a given instant of time. The speed of the particle is :",
    "options": [
      {
        "key": "A",
        "text": "6.2 m/s"
      },
      {
        "key": "B",
        "text": "4.5 m/s"
      },
      {
        "key": "C",
        "text": "5.0 m/s"
      },
      {
        "key": "D",
        "text": "5.7 m/s"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "V2\n       ac =\n               r\n\n                        V2\n       15cos30\u00b0 =\n                        2.5\n       V2 = 32.73\n       V = 5.7 m/sec          \n\n\n\n\n                                                        www.vedantu.com                                        63"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Circular Motion Acceleration Vector Resolution",
    "conceptSlug": "kinematics",
    "imageUrl": "/assets/scientific/neet-phase-2/q147_diagram.png",
    "contentBlocks": [
      {
        "id": "q147-b1",
        "type": "text",
        "order": 1,
        "rawContent": "In the given figure, $a = 15\\text{ m/s}^2$ represents the total acceleration of a particle moving in the clockwise direction in a circle of radius $R = 2.5\\text{ m}$ at a given instant of time. The speed of the particle is :"
      },
      {
        "id": "q147-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q147_diagram.png",
        "accessibilityDescription": "Circle with particle, radius R=2.5m, angle 30 degrees, acceleration a=15 m/s^2"
      }
    ],
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 147,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 63
    },
    "displayNumber": 147
  },
  {
    "id": "neet-2016-p2-q148",
    "versionId": "neet-2016-p2-q148-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "laws-of-motion",
    "unitName": "Laws of Motion",
    "topic": "Impulse-Momentum Theorem & Elastic Collision",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A rigid ball of mass $m$ strikes a rigid wall at $60^\\circ$ and gets reflected without loss of speed as shown in the figure below. The value of impulse imparted by the wall in the ball will be :",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{mV}{3}$"
      },
      {
        "key": "B",
        "text": "$mV$"
      },
      {
        "key": "C",
        "text": "$2mV$"
      },
      {
        "key": "D",
        "text": "$\\frac{mV}{2}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "J = 2mV cos 60 = mV"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Impulse-Momentum Theorem & Elastic Collision",
    "conceptSlug": "laws-of-motion",
    "imageUrl": "/assets/scientific/neet-phase-2/q148_diagram.png",
    "contentBlocks": [
      {
        "id": "q148-b1",
        "type": "text",
        "order": 1,
        "rawContent": "A rigid ball of mass $m$ strikes a rigid wall at $60^\\circ$ and gets reflected without loss of speed as shown in the figure below. The value of impulse imparted by the wall in the ball will be :"
      },
      {
        "id": "q148-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q148_diagram.png",
        "accessibilityDescription": "Rigid ball mass m striking wall at 60 degrees with speed V"
      }
    ],
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 148,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 64
    },
    "displayNumber": 148
  },
  {
    "id": "neet-2016-p2-q149",
    "versionId": "neet-2016-p2-q149-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "work-energy-power",
    "unitName": "Work, Energy, and Power",
    "topic": "Ballistic Pendulum & Conservation of Momentum",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A bullet of mass 10 g moving horizontally with a velocity of 400 ms\u20131 strikes of wooden block of mass 2 kg which is suspended by a light inextensible string of length 5 m. As a result the centre of gravity of the block is found to rise a vertical distance of 10 cm. The speed of the bullet after it emerges out horizontally from the block will be",
    "options": [
      {
        "key": "A",
        "text": "160 ms\u20131"
      },
      {
        "key": "B",
        "text": "100 ms\u20131"
      },
      {
        "key": "C",
        "text": "80 ms\u20131"
      },
      {
        "key": "D",
        "text": "120 ms\u20131"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "During the collision, apply moementum conservation\n       (0.01)(400) + 0 = (2)V + (0.01)V'\n       where V =            2gh\n\n       V=       2 \uf0b4 10 \uf0b4 0.1\n\n       V=       2\n       solving V' = 120 m/sec."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Ballistic Pendulum & Conservation of Momentum",
    "conceptSlug": "work-energy-power",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 149,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 149
  },
  {
    "id": "neet-2016-p2-q150",
    "versionId": "neet-2016-p2-q150-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "work-energy-power",
    "unitName": "Work, Energy, and Power",
    "topic": "1D Elastic Collisions of Equal Masses",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Two identical balls A and B having velocities of 0.5 m/s and \u20130.3 m/s respectively collide elastically in one dimension. The velocities of B and A after the collision respectively will be",
    "options": [
      {
        "key": "A",
        "text": "0.3 m/s and 0.5 m/s"
      },
      {
        "key": "B",
        "text": "\u2013 0.5 m/s and 0.3 m/s"
      },
      {
        "key": "C",
        "text": "0.5 m/s and \u2013 0.3 m/s"
      },
      {
        "key": "D",
        "text": "\u2013 0.3 m/s and 0.5 m/s"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Mass of balls are same and the collision is perfectly elastic, so their velocity will be interchanged.\n       So, VA = \u2013 0.3 m/s, VB = 0.5 m/s"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "1D Elastic Collisions of Equal Masses",
    "conceptSlug": "work-energy-power",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 150,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 150
  },
  {
    "id": "neet-2016-p2-q151",
    "versionId": "neet-2016-p2-q151-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "work-energy-power",
    "unitName": "Work, Energy, and Power",
    "topic": "Work Done by Vector Force",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A particle moves from a point (\u20132i\u02c6 \uf02b 5\u02c6j) to (4 \u02c6j \uf02b 3k) \u02c6 when a force of (4i\u02c6 \uf02b 3 \u02c6j)N is applied. How much work has been done by the force?",
    "options": [
      {
        "key": "A",
        "text": "2J"
      },
      {
        "key": "B",
        "text": "8 J"
      },
      {
        "key": "C",
        "text": "11 J"
      },
      {
        "key": "D",
        "text": "5 J"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "\uf028          \uf029 \uf028\n       S = rf \u2013 ri = 4\u02c6j + 3k\u02c6 \u2013 \u20132i\u02c6 + 5\u02c6j        \uf029\n       = 2i\u02c6 \u2013 \u02c6j + 3k\u02c6\n       \uf072\n       F = 4i\u02c6 + 3\u02c6j\n           \uf072\uf072\n                    \uf028             \uf029\uf028\n       \uf077 = F.S = 4i\u02c6 + 3\u02c6j . 2i\u02c6 \u2013 \u02c6j + 3k\u02c6   \uf029\n       = 8 \u2013 3 = 5J           \n\n\n\n\n                                                       www.vedantu.com                                          65"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Work Done by Vector Force",
    "conceptSlug": "work-energy-power",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 151,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 151
  },
  {
    "id": "neet-2016-p2-q152",
    "versionId": "neet-2016-p2-q152-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "rotational-motion",
    "unitName": "Rotational Motion",
    "topic": "Rotational Kinetic Energy & Angular Momentum",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Two rotating bodies A and B of masses m and 2m with moments of inertia \uf049A and \uf049B (\uf049B > \uf049A) have equal kinetic energy of rotation. If LA and LB be their angular momenta respectively, then L",
    "options": [
      {
        "key": "A",
        "text": "LA > LB"
      },
      {
        "key": "B",
        "text": "L A = B"
      },
      {
        "key": "C",
        "text": "LA = 2LB"
      },
      {
        "key": "D",
        "text": "LB > LA"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "KEA = KEB\n       1          1\n         I A \uf077A2 = IB \uf077B2           \u21d2        since IB > IA so \uf077B < \uf077A\n       2          2\n       1       1\n         LA\uf077A = LB\uf077B                \u21d2        LB > LA               \n       2       2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Rotational Kinetic Energy & Angular Momentum",
    "conceptSlug": "rotational-motion",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 152,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 152
  },
  {
    "id": "neet-2016-p2-q153",
    "versionId": "neet-2016-p2-q153-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "rotational-motion",
    "unitName": "Rotational Motion",
    "topic": "Moments of Inertia & Rotational Kinetic Energies",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A solid sphere of mass m and radius R is rotating about its diameter. A solid cylinder of the same mass and same radius is also rotating about its geometrical axis with an angular speed twice that of the sphere. The ratio of their kinetic energies of rotation (Esphere / E cylinder) will be :",
    "options": [
      {
        "key": "A",
        "text": "3 : 1"
      },
      {
        "key": "B",
        "text": "2 : 3"
      },
      {
        "key": "C",
        "text": "1 : 5"
      },
      {
        "key": "D",
        "text": "1 : 4"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "KE of sphere =            mR2 \uf0f7 \uf0772 = mR \uf077\n                          2 \uf0e7\uf0e8 5     \uf0f8     5\n\n                            1 \uf0e6 mR2 \uf0f6     2    2 2                       KE sphere        1\n       KE of cylinder =        \uf0e7    \uf0f7 (2\uf077) = mR \uf077                  So,                =           \n                            2 \uf0e7\uf0e8 2 \uf0f7\uf0f8                                    KEcylinder       5"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Moments of Inertia & Rotational Kinetic Energies",
    "conceptSlug": "rotational-motion",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 153,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 153
  },
  {
    "id": "neet-2016-p2-q154",
    "versionId": "neet-2016-p2-q154-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "rotational-motion",
    "unitName": "Rotational Motion",
    "topic": "Center of Mass & Moment of Inertia of Two Masses",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A light rod of length $l$ has two masses $m_1$ and $m_2$ attached to its two ends. The moment of inertia of the system about an axis perpendicular to the rod and passing through the centre of mass is :",
    "options": [
      {
        "key": "A",
        "text": "$\\sqrt{m_1 m_2}\\,l^2$"
      },
      {
        "key": "B",
        "text": "$\\frac{m_1 m_2}{m_1 + m_2}l^2$"
      },
      {
        "key": "C",
        "text": "$\\frac{m_1 + m_2}{m_1 m_2}l^2$"
      },
      {
        "key": "D",
        "text": "$(m_1 + m_2)l^2$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "m1                           m2\n\n                    \u03bb\n\n\n       I = m1r12 + m2r22\n                               2               2\n            \uf0e6 m2       \uf0f6      \uf0e6 m1      \uf0f6\n       = m1 \uf0e7        \u03bb \uf0f7 + m2 \uf0e7        \u03bb\uf0f7\n            \uf0e8 m1 + m2 \uf0f8       \uf0e8 m1 + m2 \uf0f8\n\n           m1m2 \uf028 m1 + m2 \uf029 \u03bb2\n       =                   2\n              \uf028m1 + m2 \uf029\n            m1m2 \u03bb2\n       =                   \n           \uf028m1 + m2 \uf029"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Center of Mass & Moment of Inertia of Two Masses",
    "conceptSlug": "rotational-motion",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 154,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "imageUrl": "/assets/scientific/neet-phase-2/q154_options.png",
    "displayNumber": 154
  },
  {
    "id": "neet-2016-p2-q155",
    "versionId": "neet-2016-p2-q155-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "gravitation",
    "unitName": "Gravitation",
    "topic": "Radial Variation of Acceleration Due to Gravity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Starting from the centre of the earth having radius r, the variation of g (acceleration due to gravity) is shown by g g",
    "options": [
      {
        "key": "A",
        "text": "Non-linear throughout"
      },
      {
        "key": "B",
        "text": "Linear increase followed by linear decrease"
      },
      {
        "key": "C",
        "text": "Linear from centre to surface (g = g0*r/R), then inverse square outside (g = g0*R^2/r^2)"
      },
      {
        "key": "D",
        "text": "Inverse square from centre"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "r\n       gin = go           go is 'g' at surface\n                  R\n                \uf0e6 R2 \uf0f6\n       gin = go \uf0e7 2 \uf0f7\n                \uf0e7r \uf0f7\n                \uf0e8    \uf0f8"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Radial Variation of Acceleration Due to Gravity",
    "conceptSlug": "gravitation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 155,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 155
  },
  {
    "id": "neet-2016-p2-q156",
    "versionId": "neet-2016-p2-q156-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "gravitation",
    "unitName": "Gravitation",
    "topic": "Orbital Energy of Satellites",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A satellite of mass $m$ is orbiting the earth (of radius $R$) at a height $h$ from its surface. The total energy of the satellite in terms of $g_0$, the value of acceleration due to gravity at the earth's surface, is :",
    "options": [
      {
        "key": "A",
        "text": "$-\\frac{2mg_0 R^2}{R + h}$"
      },
      {
        "key": "B",
        "text": "$\\frac{mg_0 R^2}{2(R + h)}$"
      },
      {
        "key": "C",
        "text": "$-\\frac{mg_0 R^2}{2(R + h)}$"
      },
      {
        "key": "D",
        "text": "$\\frac{Rmg_0 R^2}{R + h}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "TE = -              =-             = \u2013\n                  2(R + h)    2(R + h) R2     2(R + h)"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Orbital Energy of Satellites",
    "conceptSlug": "gravitation",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 156,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 156
  },
  {
    "id": "neet-2016-p2-q157",
    "versionId": "neet-2016-p2-q157-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "properties-of-solids-and-liquids",
    "unitName": "Properties of Solids and Liquids",
    "topic": "Surface Tension Work on Liquid Films",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A rectangular film of liquid is extended from (4 cm \u00d7 2cm) to (5 cm \u00d7 4 cm). If the work done is 3 \u00d7 10\u20134 J, the value of the surface tension of the liquid is",
    "options": [
      {
        "key": "A",
        "text": "8.0 Nm\u20131"
      },
      {
        "key": "B",
        "text": "0.250 N m\u20131"
      },
      {
        "key": "C",
        "text": "0.125 Nm\u20131"
      },
      {
        "key": "D",
        "text": "0.2 Nm\u20131"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Increase in surface area = (20 cm2 \u2013 8 cm2) \u00d7 2\n                                     = 12 \u00d7 2 cm2\n                                     = 24 cm2 (film has two surfaces)\n       So work done = T.\uf044S = T \u00d7 24 \u00d7 10\u20134 = 3 \u00d7 10\u2013\u20134\n                                    3       1\n                          so T =      N/ m = Nm -1 = 0.125 N/m\n                                   24       8\n\n\n\n\n                                                    www.vedantu.com                                          68"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Surface Tension Work on Liquid Films",
    "conceptSlug": "properties-of-solids-and-liquids",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 157,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 157
  },
  {
    "id": "neet-2016-p2-q158",
    "versionId": "neet-2016-p2-q158-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "properties-of-solids-and-liquids",
    "unitName": "Properties of Solids and Liquids",
    "topic": "Capillary Rise & Contact Angle",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Three liquids of densities $\\rho_1, \\rho_2$ and $\\rho_3$ (with $\\rho_1 > \\rho_2 > \\rho_3$), having the same value of surface tension $T$, rise to the same height in three identical capillaries. The angles of contact $\\theta_1, \\theta_2$ and $\\theta_3$ obey :",
    "options": [
      {
        "key": "A",
        "text": "$\\pi > \\theta_1 > \\theta_2 > \\theta_3 > \\frac{\\pi}{2}$"
      },
      {
        "key": "B",
        "text": "$\\frac{\\pi}{2} > \\theta_1 > \\theta_2 > \\theta_3 \\ge 0$"
      },
      {
        "key": "C",
        "text": "$0 \\le \\theta_1 < \\theta_2 < \\theta_3 < \\frac{\\pi}{2}$"
      },
      {
        "key": "D",
        "text": "$\\frac{\\pi}{2} < \\theta_1 > \\theta_2 > \\theta_3 < \\pi$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "h=\n               \uf072gr\n\n       cos \uf0711 cos \uf0712 cos \uf0713\n             =      =\n         \uf0721     \uf0722     \uf0723\n\n       cos\uf0711 > cos\uf0712 > cos\uf0713 as \uf0721 > \uf0722 > \uf0723\n       0 \uf0a3 \uf0711 < \uf0712 < \uf0713 < \uf070/2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Capillary Rise & Contact Angle",
    "conceptSlug": "properties-of-solids-and-liquids",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 158,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "imageUrl": "/assets/scientific/neet-phase-2/q158_options.png",
    "displayNumber": 158
  },
  {
    "id": "neet-2016-p2-q159",
    "versionId": "neet-2016-p2-q159-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "thermodynamics",
    "unitName": "Thermodynamics",
    "topic": "Calorimetry with Variable Heat Capacity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Two identical bodies are made of a material for which the heat capacity increases with temperature. One of these is at 100\u00baC, while the other one is at 0\u00baC. If the two bodies are brought into contact, then assuming no heat loss, the final common temperature is",
    "options": [
      {
        "key": "A",
        "text": "0\u00ba C"
      },
      {
        "key": "B",
        "text": "50\u00ba C"
      },
      {
        "key": "C",
        "text": "more then 50\u00ba C"
      },
      {
        "key": "D",
        "text": "less than 50\u00ba C but greater than 0\u00ba C"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Body at 100\u00b0C temperature has greater heat capacity than body at 0\u00b0C so final temperature will be\n       closer to 100\u00b0C. So Tc > 50\u00b0C\n\n\n\n\n                                                     www.vedantu.com                                               69"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Calorimetry with Variable Heat Capacity",
    "conceptSlug": "thermodynamics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 159,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 159
  },
  {
    "id": "neet-2016-p2-q160",
    "versionId": "neet-2016-p2-q160-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "thermodynamics",
    "unitName": "Thermodynamics",
    "topic": "Newton's Law of Cooling",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A body cools from a temperature $3T$ to $2T$ in 10 minutes. The room temperature is $T$. Assume that Newton's law of cooling is applicable. The temperature of the body at the end of next 10 minutes will be :",
    "options": [
      {
        "key": "A",
        "text": "$T$"
      },
      {
        "key": "B",
        "text": "$\\frac{7}{4}T$"
      },
      {
        "key": "C",
        "text": "$\\frac{3}{2}T$"
      },
      {
        "key": "D",
        "text": "$\\frac{4}{3}T$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "\uf044T = \uf044T0e\u2013\u03bbt\n                   \u2013\u03bb(10 min)\n        T = 2Te\n                                           2\n                                 \uf0e6 1\uf0f6  T\n        \uf044T' = 2Te\u2013\u03bb(20 min) = 2T \uf0e7 \uf0f7 =\n                                   2\n                                 \uf0e8 \uf0f8   2\n\n                                T   3T\n       So         Tf = T +        =\n                                2    2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Newton's Law of Cooling",
    "conceptSlug": "thermodynamics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 160,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 160
  },
  {
    "id": "neet-2016-p2-q161",
    "versionId": "neet-2016-p2-q161-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "thermodynamics",
    "unitName": "Thermodynamics",
    "topic": "Polytropic Gas Process & Molar Heat Capacity",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "One mole of an ideal monatomic gas undergoes a process described by the equation $PV^3 = \\text{constant}$. The heat capacity of the gas during this process is :",
    "options": [
      {
        "key": "A",
        "text": "$R$"
      },
      {
        "key": "B",
        "text": "$\\frac{3}{2}R$"
      },
      {
        "key": "C",
        "text": "$\\frac{5}{2}R$"
      },
      {
        "key": "D",
        "text": "$2R$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "PV3 = constant\n       for a polytropic process. PV\uf061 = constant\n                     R    3    R     3R R\n       C = Cv +          = R+      =    - =R\n                    1- \uf061  2   1- 3    2  2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Polytropic Gas Process & Molar Heat Capacity",
    "conceptSlug": "thermodynamics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 161,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 161
  },
  {
    "id": "neet-2016-p2-q162",
    "versionId": "neet-2016-p2-q162-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "thermodynamics",
    "unitName": "Thermodynamics",
    "topic": "Second Law of Thermodynamics - Refrigerator COP",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The temperature inside a refrigerator is $t_2\\,^\\circ\\mathrm{C}$ and the room temperature is $t_1\\,^\\circ\\mathrm{C}$. The amount of heat delivered to the room for each joule of electrical energy consumed ideally will be :",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{t_1 + t_2}{t_1 + 273}$"
      },
      {
        "key": "B",
        "text": "$\\frac{t_1}{t_1 - t_2}$"
      },
      {
        "key": "C",
        "text": "$\\frac{t_1 + 273}{t_1 - t_2}$"
      },
      {
        "key": "D",
        "text": "$\\frac{t_2 + 273}{t_1 - t_2}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "=              =             =                                   =\n        W      Qmore \u2013 Qless Tmore \u2013 Tless \uf028 t1 + 273 \uf029 \u2013 \uf028 t 2 + 273 \uf029            t1 \u2013 t 2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Second Law of Thermodynamics - Refrigerator COP",
    "conceptSlug": "thermodynamics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 162,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 162
  },
  {
    "id": "neet-2016-p2-q163",
    "versionId": "neet-2016-p2-q163-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "kinetic-theory-of-gases",
    "unitName": "Kinetic Theory of Gases",
    "topic": "Equation of State & Molecular Density",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A given sample of an ideal gas occupies a volume $V$ at a pressure $P$ and absolute temperature $T$. The mass of each molecule of the gas is $m$. Which of the following gives the density of the gas ?",
    "options": [
      {
        "key": "A",
        "text": "$mkT$"
      },
      {
        "key": "B",
        "text": "$\\frac{P}{kT}$"
      },
      {
        "key": "C",
        "text": "$\\frac{Pm}{kT}$"
      },
      {
        "key": "D",
        "text": "$\\frac{P}{kTV}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "n=       =         =\n             RT Molar mass RT\n\n                    mass    (Molar mass )P (m.N A )P mP\n       density =          =               =         =\n                   volume        RT          RT       KT"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Equation of State & Molecular Density",
    "conceptSlug": "kinetic-theory-of-gases",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 163,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 163
  },
  {
    "id": "neet-2016-p2-q164",
    "versionId": "neet-2016-p2-q164-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "oscillations-and-waves",
    "unitName": "Oscillations and Waves",
    "topic": "Spring-Mass Oscillator Time Period",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A body of mass $m$ is attached to the lower end of a spring whose upper end is fixed. The spring has negligible mass. When the mass $m$ is slightly pulled down and released, it oscillates with a time period of $3\\text{ s}$. When the mass $m$ is increased by $1\\text{ kg}$, the time period of oscillations becomes $5\\text{ s}$. The value of $m$ in $\\text{kg}$ is :",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{9}{16}\\,\\mathrm{kg}$"
      },
      {
        "key": "B",
        "text": "$\\frac{3}{4}\\,\\mathrm{kg}$"
      },
      {
        "key": "C",
        "text": "$\\frac{4}{3}\\,\\mathrm{kg}$"
      },
      {
        "key": "D",
        "text": "$\\frac{16}{9}\\,\\mathrm{kg}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "T = 2\uf070      = 3 sec\n                 k\n\n\n\n                                                                          k\n                m+1\n       T' = 2 \uf070     = 5 sec\n                 k\n                                                                       m\n                                           2\n                           \uf0e6 m \uf0f6 \uf0e63\uf0f6        9\n       dividing & squaring \uf0e7       \uf0f7=\uf0e7 \uf0f7 =\n                           \uf0e8 m + 1    5\n                                   \uf0f8 \uf0e8 \uf0f8   25\n\n                                          9\n       25m = 9m + 9              so m =         kg\n\n\n\n\n                                                     www.vedantu.com                                        71"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Spring-Mass Oscillator Time Period",
    "conceptSlug": "oscillations-and-waves",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 164,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 164
  },
  {
    "id": "neet-2016-p2-q165",
    "versionId": "neet-2016-p2-q165-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "oscillations-and-waves",
    "unitName": "Oscillations and Waves",
    "topic": "Organ Pipe Harmonic Resonance",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The second overtone of an open organ pipe has the same frequency as the first overtone of a closed pipe L meter long. The length of the open pipe will be L",
    "options": [
      {
        "key": "A",
        "text": "4L"
      },
      {
        "key": "B",
        "text": "L"
      },
      {
        "key": "C",
        "text": "2L"
      },
      {
        "key": "D",
        "text": "L / 2"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "Fundamental           I overtone        2 overtone\n\n\n\n\n       3\u03bb\n          = \u03bb0\n        2\n          3\u03bb\n       \u03bb= 0\n            3\n             3V\n       f=\n             2\u03bb 0\n\n\n\n\n       3\u03bb\n          = Lc\n        4\n           4L e\n       \u03bb=\n            3\n          3V      3V 3V\n       f=       =   =\n          4L e    4L 2\u03bb 0\n       \u03bb0 = 2L"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Organ Pipe Harmonic Resonance",
    "conceptSlug": "oscillations-and-waves",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 165,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 165
  },
  {
    "id": "neet-2016-p2-q166",
    "versionId": "neet-2016-p2-q166-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "oscillations-and-waves",
    "unitName": "Oscillations and Waves",
    "topic": "Superposition of Sound Waves & Beats",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Three sound waves of equal amplitudes have frequencies (n \u20131), n, (n + 1). They superimpose to give beats. The number of beats produced per second will be",
    "options": [
      {
        "key": "A",
        "text": "2"
      },
      {
        "key": "B",
        "text": "1"
      },
      {
        "key": "C",
        "text": "4"
      },
      {
        "key": "D",
        "text": "3"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "no. of beats = 1\n       (HCF of beat frequencies )\n\n                                                                                                    5"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Superposition of Sound Waves & Beats",
    "conceptSlug": "oscillations-and-waves",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 166,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 166
  },
  {
    "id": "neet-2016-p2-q167",
    "versionId": "neet-2016-p2-q167-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electrostatics",
    "unitName": "Electrostatics",
    "topic": "Torque on Electric Dipole in Uniform Field",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "An electric dipole is placed at an angle of 30\u00ba with an electric field intensity 2 \u00d710 N/C. It experiences a torque equal to 4 N m. The charge on the dipole, if the dipole length is 2cm, is",
    "options": [
      {
        "key": "A",
        "text": "7 \uf06dC"
      },
      {
        "key": "B",
        "text": "8 mC"
      },
      {
        "key": "C",
        "text": "2 mC"
      },
      {
        "key": "D",
        "text": "5 mC"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "\uf074 = PE sin\uf071\n                                      1\n                  4 = P \u00d7 2 \u00d7 105 \u00d7\n                                      2\n       \u21d2\uf020         P = 4 \u00d7 10\u20135 cm = q \u00d7 2 \u00d7 10\u20132\n                       4 \uf0b4 10-5\n       So         q=             = 2\u00d710\u20133 coulomb\n                       2 \uf0b4 10 -2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Torque on Electric Dipole in Uniform Field",
    "conceptSlug": "electrostatics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 167,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 167
  },
  {
    "id": "neet-2016-p2-q168",
    "versionId": "neet-2016-p2-q168-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electrostatics",
    "unitName": "Electrostatics",
    "topic": "Capacitor with Composite Dielectric Slabs",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A parallel-plate capacitor of area $A$, plate separation $d$ and capacitance $C$ is filled with four dielectric materials having dielectric constants $k_1, k_2, k_3$ and $k_4$ as shown in the figure below. If a single dielectric material is to be used to have the same capacitance $C$ in this capacitor, then its dielectric constant $k$ is given by :",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{1}{k} = \\frac{1}{k_1} + \\frac{1}{k_2} + \\frac{1}{k_3} + \\frac{3}{2k_4}$"
      },
      {
        "key": "B",
        "text": "$k = k_1 + k_2 + k_3 + 3k_4$"
      },
      {
        "key": "C",
        "text": "$k = \\frac{2}{3}(k_1 + k_2 + k_3) + 2k_4$"
      },
      {
        "key": "D",
        "text": "$\\frac{2}{k} = \\frac{3}{k_1 + k_2 + k_3} + \\frac{1}{k_4}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "C2    C3\n             k1           k2               k3\n                                                         C1\n\n                                                           C4/3            C4/3   C4/3\n           k4             k4              k4\n\n\n\n\n       1   3   3d      3d       3d \uf0ec 1     1\uf0fc\n         +   =      +         =      \uf0ed + \uf0fd\n       C1 C4 2k1\uf0650 A 2k 4 \uf0650 A 2\uf0650 A \uf0ee k1 k 4 \uf0fe\n\n                  K\uf0650 A 2\uf0650 A \uf0ec k1k 4    k k        kk \uf0fc\n       Ceq =           =      \uf0ed        + 2 4 + 3 4 \uf0fd\n                   d     3d \uf0ee k 2 + k 4 k 2 + k 4 k 3 + k 4 \uf0fe\n\n             2 \uf0ec k1k 4     k k        k k \uf0fc\n       k =     \uf0ed         + 2 4 + 3 4 \uf0fd\n             3 \uf0ee k1 + k 4 k 2 + k 4 k 3 + k 4 \uf0fe\n\n       Alter :\n       Wrong solution seems to be correct as per the options given.\n\n       2A\n           \uf0ce0\n       3 d\n         K1             K2           K3\n\n\n\n                                K4\n\n\n           2A \uf0ce0                                    A \uf0ce0\n       =         (k1 + k2 + k3) = CA            =        k4 = CB\n            3 d                                      d\n        1    1   1\n           =   +\n       Ceq. CA CB\n\n          d     3d                   d\n              =     (k1 + k2 + k3)\n       a\uf0650K eq 2A\uf0650                2A\uf0650k 4\n\n        1   3                      1\n           = \uf028 k1 + k 2 + k 3 \uf029 +\n       k eq 2                     2k 4\n\n\n\n\n                                                         www.vedantu.com                 74"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Capacitor with Composite Dielectric Slabs",
    "conceptSlug": "electrostatics",
    "imageUrl": "/assets/scientific/neet-phase-2/q168_diagram.png",
    "contentBlocks": [
      {
        "id": "q168-b1",
        "type": "text",
        "order": 1,
        "rawContent": "A parallel-plate capacitor of area $A$, plate separation $d$ and capacitance $C$ is filled with four dielectric materials having dielectric constants $k_1, k_2, k_3$ and $k_4$ as shown in the figure below. If a single dielectric material is to be used to have the same capacitance $C$ in this capacitor, then its dielectric constant $k$ is given by :"
      },
      {
        "id": "q168-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q168_diagram.png",
        "accessibilityDescription": "Capacitor with 4 dielectric slabs: k1, k2, k3 with area A/3 and thickness d/2, and k4 with area A and thickness d/2"
      }
    ],
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 168,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 73
    },
    "displayNumber": 168
  },
  {
    "id": "neet-2016-p2-q169",
    "versionId": "neet-2016-p2-q169-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "current-electricity",
    "unitName": "Current Electricity",
    "topic": "Kirchhoff's Voltage Law across Circuit Branches",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The potential difference $(V_A - V_B)$ between the points $A$ and $B$ in the given figure is :",
    "options": [
      {
        "key": "A",
        "text": "$+9\\text{ V}$"
      },
      {
        "key": "B",
        "text": "$-3\\text{ V}$"
      },
      {
        "key": "C",
        "text": "$+3\\text{ V}$"
      },
      {
        "key": "D",
        "text": "$+6\\text{ V}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "9V         2A                    5V         2V                           VB\n\n       VA \u2013 VB = 9volt"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Kirchhoff's Voltage Law across Circuit Branches",
    "conceptSlug": "current-electricity",
    "imageUrl": "/assets/scientific/neet-phase-2/q169_diagram.png",
    "contentBlocks": [
      {
        "id": "q169-b1",
        "type": "text",
        "order": 1,
        "rawContent": "The potential difference $(V_A - V_B)$ between the points $A$ and $B$ in the given figure is :"
      },
      {
        "id": "q169-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q169_diagram.png",
        "accessibilityDescription": "Linear circuit branch: Point A, current 2A, 2 ohm resistor, 3V battery, 1 ohm resistor, Point B"
      }
    ],
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 169,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 75
    },
    "displayNumber": 169
  },
  {
    "id": "neet-2016-p2-q170",
    "versionId": "neet-2016-p2-q170-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "current-electricity",
    "unitName": "Current Electricity",
    "topic": "Electric Power & Series Resistance for Rated Bulb",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A filament bulb (500 W, 100 V) is to be used in a 230 V main suply. When a resistance R is connected in series, it works perfectly and the bulb consumes 500 W. The value of R is :",
    "options": [
      {
        "key": "A",
        "text": "13 \u03a9"
      },
      {
        "key": "B",
        "text": "230 \u03a9"
      },
      {
        "key": "C",
        "text": "46 \u03a9"
      },
      {
        "key": "D",
        "text": "26 \u03a9"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "The correct option is (4) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Electric Power & Series Resistance for Rated Bulb",
    "conceptSlug": "current-electricity",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 170,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 170
  },
  {
    "id": "neet-2016-p2-q171",
    "versionId": "neet-2016-p2-q171-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "magnetic-effects-of-current-and-magnetism",
    "unitName": "Magnetic Effects of Current and Magnetism",
    "topic": "Magnetic Field at Centre of Circular Coils",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A long wire carrying a steady current is bent into a circular loop of one turn. The magnetic field at the centre of the loop is B. It is then bent into a circular coil of n turns. The magnetic field at the centre of this coil of n turns will be :",
    "options": [
      {
        "key": "A",
        "text": "2n2 B"
      },
      {
        "key": "B",
        "text": "nB"
      },
      {
        "key": "C",
        "text": "n2B"
      },
      {
        "key": "D",
        "text": "2nB"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "R\n\n                               i\n\n              \uf06d 0i \uf06d 0i(2\uf070) \uf06d 0 \uf070i\n       B=         =        =\n              2R     2(\u03bb)    2\u03bb\n\n                   r\n                           i\n\n              \uf06d 0ni     \uf06d 0ni     n 2 \uf06d 0 \uf070i\n       B\uf0a2 =         =           =            = n2B\n               2r      \uf0e6 \u03bb \uf0f6         2\u03bb\n                      2\uf0e7      \uf0f7\n                       \uf0e8 2n\uf070 \uf0f8"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Magnetic Field at Centre of Circular Coils",
    "conceptSlug": "magnetic-effects-of-current-and-magnetism",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 171,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 171
  },
  {
    "id": "neet-2016-p2-q172",
    "versionId": "neet-2016-p2-q172-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "magnetic-effects-of-current-and-magnetism",
    "unitName": "Magnetic Effects of Current and Magnetism",
    "topic": "Bar Magnet in Uniform Magnetic Field - Work & Torque",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A bar magnet is hung by a thin cotton thread in a uniform horizontal magnetic field and is in equilibrium state. The energy required to rotate it by 60\u00ba is W. Now the torque required to keep the magnet in this new position is : 2W W 3W",
    "options": [
      {
        "key": "A",
        "text": "2W / \u221a3"
      },
      {
        "key": "B",
        "text": "W / \u221a3"
      },
      {
        "key": "C",
        "text": "\u221a3 \u00b7 W"
      },
      {
        "key": "D",
        "text": "\u221a3 \u00b7 W / 2"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "W ext = Uf \u2013 Vi\n       = \u2013 MB cos 60\u00b0 \u2013 (\u2013MB)\n       = MB(1 \u2013 cos 60\u00b0) = MB/2 = W\n                                    3\n       r = MB sin 60\u00b0 = MB            = 3W\n                                   2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Bar Magnet in Uniform Magnetic Field - Work & Torque",
    "conceptSlug": "magnetic-effects-of-current-and-magnetism",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 172,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 172
  },
  {
    "id": "neet-2016-p2-q173",
    "versionId": "neet-2016-p2-q173-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "magnetic-effects-of-current-and-magnetism",
    "unitName": "Magnetic Effects of Current and Magnetism",
    "topic": "Cyclotron Frequency of Electron in Magnetic Field",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "An electron is moving in a circular path under the influence of a transverse magnetic field of 3.57 \u00d7 10\u20132 T. If the value of e/m is 1.76 \u00d7 1011 C/kg, the frequency of revolution of the electron is : \u20132",
    "options": [
      {
        "key": "A",
        "text": "6.82 MHz"
      },
      {
        "key": "B",
        "text": "1 GHz"
      },
      {
        "key": "C",
        "text": "100 MHz"
      },
      {
        "key": "D",
        "text": "62.8 MHz"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "R=\n             qB\n              V qB\n       \uf077=       =\n              R   m\n             \uf077   1 qB 1.76 \uf0b4 1011 \uf0b4 3.57 \uf0b4 10 -2\n       f=      =  .  =                           = 10 9 Hz\n             2\uf070 2\uf070 m          (2 \uf0b4 3.14)\n\n\n\n\n                                                     www.vedantu.com                                         76"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Cyclotron Frequency of Electron in Magnetic Field",
    "conceptSlug": "magnetic-effects-of-current-and-magnetism",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 173,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 173
  },
  {
    "id": "neet-2016-p2-q174",
    "versionId": "neet-2016-p2-q174-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electromagnetic-induction-and-ac",
    "unitName": "Electromagnetic Induction and Alternating Currents",
    "topic": "LCR Resonance Tuning & Quality Factor",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Which of the following combinations should be selected for better tuning of an L-C-R circuit used for communication? gksxk \\",
    "options": [
      {
        "key": "A",
        "text": "R = 25 \u03a9, L = 1.5 H, C = 45 \uf06dF"
      },
      {
        "key": "B",
        "text": "R = 20 \u03a9, L = 1.5 H, C = 35 \uf06dF"
      },
      {
        "key": "C",
        "text": "R = 25 \u03a9, L = 2.5 H, C = 45 \uf06dF"
      },
      {
        "key": "D",
        "text": "R = 15 \u03a9, L = 3.5 H, C = 30 \uf06dF"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Option with highest quality factor sould be chosen as most appropriate answer.\n             1 L\n       Q=\n             R C"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "LCR Resonance Tuning & Quality Factor",
    "conceptSlug": "electromagnetic-induction-and-ac",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 174,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 174
  },
  {
    "id": "neet-2016-p2-q175",
    "versionId": "neet-2016-p2-q175-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electromagnetic-induction-and-ac",
    "unitName": "Electromagnetic Induction and Alternating Currents",
    "topic": "Faraday's Law & Induced EMF in Concentric Loops",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A uniform magnetic field is restricted within a region of radius $r$. The magnetic field changes with time at a rate $\\frac{d\\vec{B}}{dt}$. Loop 1 of radius $R > r$ encloses the region $r$ and loop 2 of radius $R$ is outside the region of magnetic field as shown in the figure below. Then the e.m.f. generated is :",
    "options": [
      {
        "key": "A",
        "text": "$-\\frac{d\\vec{B}}{dt}\\pi r^2$ in loop 1 and zero in loop 2"
      },
      {
        "key": "B",
        "text": "zero in loop 1 and zero in loop 2"
      },
      {
        "key": "C",
        "text": "$-\\frac{d\\vec{B}}{dt}\\pi r^2$ in loop 1 and $-\\frac{d\\vec{B}}{dt}\\pi r^2$ in loop 2"
      },
      {
        "key": "D",
        "text": "$-\\frac{d\\vec{B}}{dt}\\pi R^2$ in loop 1 and zero in loop 2"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "e= -         = - {\uf070r 2B} = -\uf070r 2    in loop 1 & zero in loop 2.\n                 dt    dt               dt\n\n\n\n\n                                                    www.vedantu.com                                                 77"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Faraday's Law & Induced EMF in Concentric Loops",
    "conceptSlug": "electromagnetic-induction-and-ac",
    "imageUrl": "/assets/scientific/neet-phase-2/q175_diagram.png",
    "contentBlocks": [
      {
        "id": "q175-b1",
        "type": "text",
        "order": 1,
        "rawContent": "A uniform magnetic field is restricted within a region of radius $r$. The magnetic field changes with time at a rate $\\frac{d\\vec{B}}{dt}$. Loop 1 of radius $R > r$ encloses the region $r$ and loop 2 of radius $R$ is outside the region of magnetic field as shown in the figure below. Then the e.m.f. generated is :"
      },
      {
        "id": "q175-b2",
        "type": "scientific_diagram",
        "order": 2,
        "assetUrl": "/assets/scientific/neet-phase-2/q175_diagram.png",
        "accessibilityDescription": "Loop 1 enclosing magnetic field region r, and Loop 2 outside region r"
      }
    ],
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 175,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 77
    },
    "displayNumber": 175
  },
  {
    "id": "neet-2016-p2-q176",
    "versionId": "neet-2016-p2-q176-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electromagnetic-induction-and-ac",
    "unitName": "Electromagnetic Induction and Alternating Currents",
    "topic": "Power Factor in Series LCR Circuit",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The potential differences across the resistance, capacitance and inductance are 80 V, 40 V and 100 V respectively in an L-C-R circuit. The power factor of this circuit is",
    "options": [
      {
        "key": "A",
        "text": "1.0"
      },
      {
        "key": "B",
        "text": "0.4"
      },
      {
        "key": "C",
        "text": "0.5"
      },
      {
        "key": "D",
        "text": "0.8"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "Power factor =       =   =                         =       = 0.8\n                           z iz            2\n                                       (80) + (60 )   2       100"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Power Factor in Series LCR Circuit",
    "conceptSlug": "electromagnetic-induction-and-ac",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 176,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 176
  },
  {
    "id": "neet-2016-p2-q177",
    "versionId": "neet-2016-p2-q177-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "electromagnetic-waves",
    "unitName": "Electromagnetic Waves",
    "topic": "Displacement Current in Capacitor Circuits",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "A 100 \u03a9 resistance and a capacitor of 100 \u03a9 reactance are connected in series across a 220 V source. When the capacitor is 50% charged, the peak value of the displacement current is",
    "options": [
      {
        "key": "A",
        "text": "11 2A"
      },
      {
        "key": "B",
        "text": "2.2 A"
      },
      {
        "key": "C",
        "text": "11 A"
      },
      {
        "key": "D",
        "text": "4.4 A"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "B"
      ]
    },
    "explanation": {
      "text": "z=       R 2 + X 2c = (100 )2 + (100 )2 = 100 2\n                 v max 220 2\n       imax =         =       = 2.2\n                   z    100 2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Displacement Current in Capacitor Circuits",
    "conceptSlug": "electromagnetic-waves",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 177,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 177
  },
  {
    "id": "neet-2016-p2-q178",
    "versionId": "neet-2016-p2-q178-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "optics",
    "unitName": "Optics",
    "topic": "Lens Maker's Formula & Composite Lens Combinations",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "Two identical glass (\uf06dg = 3/2) equiconvex lenses of focal length f each are kept in contact. The space between that two lenses in filled with water (\uf06dw = 4/3). The focal length of the combination is 3f f 4f",
    "options": [
      {
        "key": "A",
        "text": "3f / 4"
      },
      {
        "key": "B",
        "text": "f / 3"
      },
      {
        "key": "C",
        "text": "f"
      },
      {
        "key": "D",
        "text": "4f / 3"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "A"
      ]
    },
    "explanation": {
      "text": "R             R R      R\n                     1 \uf0e63    \uf0f62 1\n                      = \uf0e7 - 1\uf0f7 =\n                     f \uf0e82 \uf0f8R R\n                     1 \uf0e64     \uf0f6\uf0ec 2 \uf0fc       2\n                       = \uf0e7 - 1\uf0f7 \uf0ed - \uf0fd = -\n                     f' \uf0e8 3   \uf0f8\uf0ee R \uf0fe      3R\n                      1 1 2 1 3-2+3 4\n       So               = -  + =    =\n                     feq f 3f f  3f   3f\n                3f\n       f eq =\n                4\n\n\n\n\n                                                          www.vedantu.com                                          78"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Lens Maker's Formula & Composite Lens Combinations",
    "conceptSlug": "optics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 178,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 178
  },
  {
    "id": "neet-2016-p2-q179",
    "versionId": "neet-2016-p2-q179-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "optics",
    "unitName": "Optics",
    "topic": "Refraction at Plane Surfaces & Apparent Depth",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "An air bubble in a glass slab with refractive index 1.5 (near normal incidence) is 5 cm deep when viewed from one surface and 3 cm deep when viewed from the opposite face. The thickness (in cm) of the slab is",
    "options": [
      {
        "key": "A",
        "text": "16"
      },
      {
        "key": "B",
        "text": "8"
      },
      {
        "key": "C",
        "text": "10"
      },
      {
        "key": "D",
        "text": "12"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "D"
      ]
    },
    "explanation": {
      "text": "x\n\n                            \u03bb\uf020\n\n       x (\u03bb - x)\n         +       =3+5\n       \uf06d    \uf06d\n       \u03bb\n         =8\n       \uf06d\n                     3\n       \u03bb=8\u00d7            = 12 cm\n                     2"
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Refraction at Plane Surfaces & Apparent Depth",
    "conceptSlug": "optics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 179,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 179
  },
  {
    "id": "neet-2016-p2-q180",
    "versionId": "neet-2016-p2-q180-v1",
    "examSlug": "neet",
    "subjectSlug": "physics",
    "subjectName": "Physics",
    "chapterSlug": "optics",
    "unitName": "Optics",
    "topic": "Wave Optics - Two-Source Interference Intensity Contrast",
    "questionType": "single_correct",
    "difficulty": "medium",
    "marks": 4,
    "negativeMarks": 1,
    "status": "published",
    "text": "The interference pattern is obtained with two coherent light sources of intensity ratio $n$. In the interference pattern, the ratio $\\frac{I_{\\max} - I_{\\min}}{I_{\\max} + I_{\\min}}$ will be :",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{2\\sqrt{n}}{(n + 1)^2}$"
      },
      {
        "key": "B",
        "text": "$\\frac{\\sqrt{n}}{n + 1}$"
      },
      {
        "key": "C",
        "text": "$\\frac{2\\sqrt{n}}{n + 1}$"
      },
      {
        "key": "D",
        "text": "$\\frac{\\sqrt{n}}{(n + 1)^2}$"
      }
    ],
    "answerKey": {
      "correctOptions": [
        "C"
      ]
    },
    "explanation": {
      "text": "The correct option is (3) per the official NEET Phase-2 (Code: BB-QQ-XX) answer key."
    },
    "created_at": "2026-11-24T14:00:00.000Z",
    "updated_at": "2026-11-24T14:00:00.000Z",
    "created_by": "CBSE / NTA NEET Official Archive",
    "conceptName": "Wave Optics - Two-Source Interference Intensity Contrast",
    "conceptSlug": "optics",
    "verificationStatus": "published",
    "sourceMetadata": {
      "examName": "NEET (UG)",
      "examYear": 2016,
      "examSession": "Phase-2",
      "paperCode": "BB-QQ-XX",
      "originalQuestionNumber": 180,
      "sourceDocName": "NEET_2016_Question_Paper_with_Answers_-_Phase-II_Code_XX_-_Free_Download.pdf",
      "pageNumber": 1
    },
    "displayNumber": 180
  }
];
