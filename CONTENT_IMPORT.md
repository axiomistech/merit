# FORT Learning — Content Import & Question Bank Management

## 1. Overview

Content can be authored directly through the FORT Control Admin Question Bank CMS or imported via validated JSON/CSV payloads.

---

## 2. Question Schema

```json
{
  "questionType": "single_correct",
  "subjectSlug": "physics",
  "conceptSlug": "electrostatics",
  "difficulty": "medium",
  "text": "A point charge $q$ is placed at the center of a hollow cubical conductor...",
  "options": [
    { "key": "A", "text": "$\\frac{q}{\\varepsilon_0}$" },
    { "key": "B", "text": "$\\frac{q}{6\\varepsilon_0}$" },
    { "key": "C", "text": "$\\frac{q}{24\\varepsilon_0}$" },
    { "key": "D", "text": "Zero" }
  ],
  "marks": 4,
  "negativeMarks": 1,
  "answerKey": {
    "correctOptions": ["B"]
  },
  "explanation": {
    "text": "By Gauss Law, total flux enclosed through all 6 faces..."
  }
}
```
