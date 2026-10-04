export const templates = [
  'חילוץ טקסטים',
  'חילוץ מילות מפתח',
  'חילוץ תאריכים',
  'חילוץ מספרים',
]

export const outputFormats = ['ללא', 'REGEX', 'JSON', 'תשובות מרשימה סגורה'] as const

// A fragment of the model's JSON output — deliberately longer than the
// preview box so only part of it is visible without scrolling.
export const jsonOutputSample = `{
  "מספר": "48213",
  "ת.ז": "302145678",
  "מוזמנים": 128,
  "קליטה": "2026-09-02T10:00:00",
  "שעה": "14:30",
  "GEO": {
    "lat": 32.0853,
    "lng": 34.7818
  },
  "מסמך": "https://files.example.com/doc/48213.pdf",
  "תוצאות": {
    "סטטוס": "הושלם",
    "אחוז_הכלה": 82,
    "שדות_ריקים": false
  },
  "מטא_נתונים": {
    "גרסה": "Alpha 2.1",
    "מודל": "GPT-דגם Alpha 2.1",
    "זמן_עיבוד_מילישניות": 842,
    "הצלחה": true
  },
  "שדות_נוספים": [
    "כתובת",
    "טלפון",
    "אימייל"
  ]
  // ... שאר הפלט מוצג בגלילה
}`

export const modalSectionLabels = {
  modelPrompt: 'הנחיות למודל',
  promptPlaceholder: 'הזן פרומפט למודל',
  templatesLabel: 'תבניות לשימוש',
  advancedInstructions: 'הנחיות מתקדמות (לא חובה)',
  displaySettings: 'הגדרות תצוגה (לא חובה)',
  maxAnswerLength: 'אורך תשובה מקסימלי',
  retrievalInstructions: 'הנחיות שליפה',
  systemPrompt: 'הנחיות נוספות למודל (system promt)',
  outputFormat: 'פורמט פלט (לא חובה)',
  closedListPlaceholder: 'הוסף פריט',
  cancel: 'בטל',
  addCubeFieldTitle: 'הוסף ערכים מקוביות בקובץ בקונטקסט',
  applyToAllRecords: 'החל על כלל הרשומות',
  cube: 'קובייה',
  field: 'שדה',
  add: 'הוסף',
}

export const modelName = 'GPT-דגם Alpha 2.1'

export const mockCubes = ['אפיון מתכונים כשרים', 'אפיון מתכונים כופרים']
export const mockFields = ['מספר', 'ת.ז', 'מוזמנים', 'קליטה', 'שעה', 'GEO', 'מסמך']
