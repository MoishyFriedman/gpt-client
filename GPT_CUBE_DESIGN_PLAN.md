# תכנון עיצוב — מודל "קוביית GPT"

מקור: Figma "Main Glow" → canvas **"GPT cube"** (`309:17394`) → frame **"קוביית GPT"** (`316:27902`) → Modal instance (`316:28029`).

הערה: ה-API של Figma חסום כרגע (rate limit, ~4.5 ימים), אז כל הנתונים כאן מגיעים מ-2 dumps שכבר נשמרו בסשן קודם ונקראו עד הסוף. איפה שחסר מידע מדויק — מסומן "**דורש שליפה טרייה**".

עובדים סבב-סבב: קודם מציגים כאן מה כל קומפוננטה **אמורה** לכלול לפי פיגמה, ואז בכל סבב תופסים קומפוננטה אחת, משווים לקוד הקיים, מתקנים, בודקים ויזואלית, וממשיכים הלאה.

## כללי מבנה (לכל סבב מכאן ואילך)

1. **CSS בקובץ נפרד** — לא `style={{...}}` inline. כל ערכי העיצוב (padding/gap/צבע/radius) עוברים לקובץ סגנון ייעודי.
2. **תיקייה נפרדת לכל קומפוננטה**, עם כל הקבצים הרלוונטים לה (קומפוננטה + סגנון + תת-קומפוננטות שרק היא צריכה).
3. **Dark/light mode** — דרך `usehooks-ts` (`useDarkMode`), לא ternary ידני. AntD עדיין צריך גשר קטן שיזין את ה-boolean הזה ל-`ConfigProvider theme={{algorithm}}`.
4. **מקסימום ~100 שורות לקובץ קומפוננטה**, וכל קומפוננטה עם הלוגיקה הייעודית שלה בקובץ נפרד משלה — לא לערבב כמה קומפוננטות/חלקים לוגיים בקובץ אחד. ברגע שחלק גדל מעבר לזה, מפרידים אותו לקובץ נפרד (עדיין בתוך תיקיית הקומפוננטה מרול 2).

---

## סטטוס כללי (אחרי הסבב הקודם)

תוקנו כבר: רוחב המודל (full-screen), padding/gap של ה-Content Wrapper, ה-header row הפנימי (gap, segmented toggle, select — כעת קומפוננטה נפרדת), צבעי הצ'יפים בתיבת הקלט, וכפתור ה-"+" להוספת שדה. **טרם אומתו ויזואלית בדפדפן.**

**תשתית (הוקמה בסבב 2):** `usehooks-ts` הותקן, `ThemeContext.tsx` עכשיו מבוסס על `useDarkMode` שלה ומגדיר `data-theme` על `<html>`. `src/theme/theme.css` מכיל את משתני ה-CSS הגלובליים (`--color-*`, `--segment-track-bg`, `--shadow-tertiary`) שכל קובץ `.module.css` חדש אמור להשתמש בהם. תבנית לקומפוננטה חדשה: תיקייה עם `Name.tsx` + `Name.module.css` (CSS Modules — נתמך מובנה ב-Vite/tsconfig, בלי תלות נוספת).

---

## סבב 1 — Modal Shell — ❌ הוסר (לא בשימוש)

המשתמש אישר: ה-Head row (כפתור סגירה + כותרת "קוביית GPT" + אייקון בעיגול טורקיז) וה-Footer (כפתורי שמור/בטל) הם "מעטפת שלא בשימוש" באפליקציה האמיתית — רק ה-Modal בפיגמה עטף אותם להדגמה. **הוסרו לגמרי** מ-`GptCube.tsx`; הקומפוננטה מרנדרת עכשיו רק כרטיס חיצוני (רקע/radius/shadow) שעוטף ישירות את `PromptPanel`, בלי title bar ובלי כפתורי פעולה. `modalTitle` ומפתח `save` הוסרו מ-`mockData.ts` בהתאם (לא נשאר להם consumer).

---

## סבב 2 — Content Header Row (חלק עליון של `PromptPanel.tsx`)

**התפקיד:** שורת בקרה עליונה בתוך תיבת התוכן — אייקון מותג, מתג ערכת נושא, ובחירת מודל.

- מיכל שורה: `gap: 8px`, `align-items: stretch`.
- **Segmented (בהיר/כהה)**: מסילה חיצונית `padding 2px`, רקע `#F8F8F8` (כהה: `#141414`), `radius 4px`, `height 24`. פריט פעיל: pill (לא עיגול!) `height 22`, `padding 0 12px`, `radius 4px`, רקע לבן + צל `0px 1px 2px rgba(0,0,0,.03), 0px 1px 6px -1px rgba(0,0,0,.02), 0px 2px 4px rgba(0,0,0,.02)`. פריט לא-פעיל: ללא רקע/צל.
- **Divider**: קו אנכי 1px, `#F0F0F0`.
- **Select מודל**: `height 32`, `padding 0 12px`, `radius 8px`, border `1px #D9D9D9`, **רוחב מלא (fill)** של מה שנשאר בשורה — לא קבוע.

**סטטוס:** ✅ הופרד לקומפוננטה עצמאית: `src/components/gpt-cube-modal/content-header-row/{ContentHeaderRow,ThemeToggle}.tsx` + קבצי `.module.css` תואמים. אייקון המותג הוחלף מ-`icon-brand.svg` (פייסבוק — placeholder שגוי) ל-`icon-ai-light.svg` (הספארקל הצבעוני, ללא עיגול רקע). **פתוח:** אין כרגע גרסת asset כהה לאייקון (`icon-ai-light` בלבד) — ה-highlight הלבן שבו עלול "להיעלם" על רקע בהיר במצב כהה הפוך; להחליף כש-asset יסופק. אימות ויזואלי בדפדפן טרם בוצע.

---

## סבב 3 — תיבת הקלט והצ'יפים (בתוך `PromptPanel.tsx`, פלוס `AddCubeFieldPopover.tsx` ו-`MentionPromptInput.tsx`)

**התפקיד:** האזור המרכזי — תווית "הנחיות למודל", תיבת קלט עם צ'יפים נבחרים, וכפתור הוספת שדה.

- תווית "הנחיות למודל": Base/Ag Medium (500, 14px/22px).
- **מיכל תיבת קלט**: border `1px #D9D9D9`, `radius 8px`, `padding 10px 12px`.
- **שורת צ'יפים**: בפיגמה מיושרת לקצה (flex-end). **עדכון:** בהתחלה הוחלט להשאיר גובה אוטומטי (flexWrap, בלי 152px קבוע), אבל בפועל עם הרבה תוכן זה דחף את כל המודל למטה — המשתמש חזר בו וביקש בפירוש גובה קבוע + גלילה פנימית. `InputChips.module.css` עודכן ל-`height: 152px; overflow-y: auto` (תואם בדיוק לערך שממנו יצאנו — Figma: Height Fixed 152px).
- **צ'יפ רגיל / "+N"**: ללא border, רקע `rgba(0,0,0,.04)` (כהה: `rgba(255,255,255,.04)`), `radius 4px`, `padding 0 8px`, טקסט `rgba(0,0,0,.88)`.
- **כפתור "+" הוספת שדה**: `height 24`, `padding 4px`, `radius 4px`, border `1px #D9D9D9`, רקע לבן — לא עיגול שקוף.
- **AddCubeFieldPopover** (נפתח מהכפתור): לפי הדאטה שנתפס — Head עם כפתור סגירה + כותרת "הוסף ערכים מקוביות בקובץ" (Large/Ag Medium), Content Wrapper עם checkbox + 2 Select inputs + כפתור "add chip", Footer עם כפתור primary+secondary. המבנה הזה **כבר תואם** למה שיש היום ב-`AddCubeFieldPopover.tsx` (checkbox, 2 selects, footer עם 2 כפתורים) — אבל הצבעים/מרווחים המדויקים של הרכיבים הפנימיים (checkbox, select) **דורשים שליפה טרייה** כי הם מקודדים ב-Figma דרך template refs שלא נפתרו במלואם ב-dump השמור.
- **צ'יפ mention בתוך MentionPromptInput** (כשמזכירים שדה עם @): בקוד קיים סגנון שונה במכוון — רקע `#DCF4F7`, טקסט `#13A2B5` — זה כנראה highlight ייעודי, לא אותו צ'יפ נייטרלי. **דורש אימות** אם זה תואם לפיגמה או שגם הוא צריך לעבור לצבעי הצ'יפ הרגיל.

**סטטוס:** ✅ הופרד לקומפוננטות עצמאיות: `src/components/gpt-cube-modal/input-chips/{InputChips,ChipsRow}.tsx` + `.module.css` תואמים. סדר ה-DOM בכפתור ה-"+" הוא **אחרי** הצ'יפים (לא לפניהם) — ב-RTL טבעי (בלי `direction` מאולץ) זה ממקם את הצ'יפים מימין וה-"+" בקצה השמאלי, כמו בתמונת הייחוס. **תוקן:** `justify-content` היה `flex-end` (=דוחף את כל הצביר שמאלה ב-RTL, עם המון רווח ריק מימין) — שונה ל-`flex-start` כדי שהצביר (צ'יפים+כפתור) יידבק לימין, מתחת לתווית "הנחיות למודל". ה-popover (פותח מ-"+" או מ-@) עכשיו מרונדר דרך `createPortal` ל-`document.body` עם `position:fixed`, כדי לא להיחתך ע"י ה-`overflow-y:auto` שנוסף לתיבה.

**עדכון מהותי מהמשתמש:** שורת הצ'יפים הזו אמורה להראות **רק תבניות שנבחרו** (`selectedQuestions`, מ-Templates Row) — לא הפניות לשדות קוביה. הוסר `referencedFields` לגמרי מ-`PromptState`. הוספות שדה/קוביה (דרך כפתור "+" **או** דרך "@") מוכנסות עכשיו **כצ'יפ בתוך הטקסט של "הנחיות למודל" עצמו** (`MentionPromptInput`), לא כצ'יפ נפרד בשורה. מומש עם `forwardRef`+`useImperativeHandle`: `MentionPromptInput` חושף `insertChips(labels)`, ו-`InputChips` מחזיק `ref` אליו כדי ש-`ChipsRow`'s "+" יזריק לתוך הטקסט בדיוק כמו @. הלוגיקה של זיהוי/הכנסת mentions הופרדה להוק `useMentionMenu.ts` (עדיין 140 שורות — קצת מעל הגבול, אבל לוגיקת Selection/Range API מורכבת מטבעה; פיצול נוסף יפגע בקריאות יותר משיעזור).

---

## סבב 4 — שאלות לדוגמא / תבניות לשימוש (בתוך `PromptPanel.tsx`)

**התפקיד:** שורת הצעות לשאלות/תבניות מתחת לתיבת הקלט.

- מאומת בצילום מסך + Figma inspect: מיכל אנכי, `gap: 8px` (לא 12 כמו שהוערך קודם מה-dump), `width`/`height` הם hug טבעי מהתוכן (684×60 בקנבס המבודד — לא לקבע). תווית "תבניות לשימוש" (לא "שאלות לדוגמא" — התיקון בוצע) בטקסט רגיל, לא אפור/secondary.
- **תוקן:** בניגוד למה שהוערך תחילה מהצילום החתוך — השורה **לא** צריכה `direction: ltr`. המשתמש אישר מפורשות שזה חייב להישאר RTL רגיל כמו כל טקסט עברי (ה-"+5" בצד ימין, הכפתורים נמשכים שמאלה). לקח: crop צר של תמונת פיגמה לא מוכיח כיוון פריסה — לבדוק תמיד מול ההנחיה המפורשת, וה-LTR-fix מסבב 2 (Content Header Row) היה הוראה מפורשת שם, לא כלל גורף לכל שורת צ'יפים.
- צ'יפ "+5" בשורה הזו: `height 32`, `font-size 16px/line-height 24px` (Large/Normal — שונה מהצ'יפים הקטנים ב-14px שבתוך תיבת הקלט), אותו רקע `rgba(0,0,0,.04)`/`radius 4px`.
- כפתורי תבנית (4): `padding 4px 16px`, `radius 8px`, border `1px #D9D9D9`, רקע לבן — כבר תואם ל-AntD `Button` ברירת מחדל (טוקן `borderRadius:8` גלובלי).

**סטטוס:** ✅ הופרד לקומפוננטה עצמאית: `src/components/gpt-cube-modal/templates-row/TemplatesRow.tsx` + `.module.css`. שמות שונו ב-`mockData.ts`: `exampleQuestions` → `templates`, `modalSectionLabels.exampleQuestions` → `templatesLabel` (ערך: "תבניות לשימוש"). אימות ויזואלי בדפדפן טרם בוצע.

---

## סבב 5 — הנחיות מתקדמות (Collapse item 1 בתוך `PromptPanel.tsx`)

**התפקיד:** אזור מתקפל עם הגדרות מתקדמות — אורך תשובה מקסימלי + הנחיות שליפה.

- Divider אופקי מעל (צבע לא ניתן לחילוץ מה-SVG, כנראה `#D9D9D9`/`#F0F0F0`).
- שורת כותרת מתקפלת: `gap 8px`, label "הנחיות מתקדמות (לא חובה)" (Base/Ag Medium) + אייקון שברון 16×16.
- Body: `padding 0px 24px`, `gap 12px`, `align-items: flex-end`.
  - שורת "אורך תשובה מקסימלי": label ברוחב קבוע 125 + stepper מספרי — רוחב **150**, `height 32`, border `1px #D9D9D9`, `radius 8px`.
  - טקסטאריה "הנחיות שליפה": רוחב קבוע **569**, גובה **78**, `padding 5px 12px`, border+radius זהים.

**סטטוס:** ✅ הופרד לקומפוננטה עצמאית: `src/components/gpt-cube-modal/advanced-section/AdvancedSection.tsx` + `.module.css`. תוקן באג layout אמיתי: התווית "הנחיות נוספות למודל (system prompt)" הוצגה בעבר כ-caption אפור קטן **מתחת** לטקסטאריה — לפי צילום מסך היא בפועל תווית רגילה **לצד** הטקסטאריה (אותו תבנית כמו שורת "אורך תשובה מקסימלי"). רוחב ה-stepper תוקן ל-150px (היה 120).

---

## סבב 6 — הגדרות תצוגה + Code Preview (Collapse item 2 + `CodePreview.tsx`)

**התפקיד:** בחירת פורמט פלט + תצוגה מקדימה של קוד.

- כותרת "פורמט פלט (לא חובה)" (Base/Ag Medium).
- Radio group: `gap 8px`, יישור flex-end. כל אפשרות: label + עיגול 16×16 — לא נבחר: border `1px #D9D9D9`; נבחר: border `1px #13BBD1` (הצבע הראשי של המותג — תואם ל-`brand.teal` ב-`tokens.ts`).
- Code viewport (כש-JSON/REGEX נבחר): `803×785`, `padding 12`, `radius 8`, border חיצוני `1px #F0F0F0`, gutter מספרי שורות 48px רוחב, טקסט `rgba(0,0,0,.45)`.

**סטטוס:** ✅ 4 קומפוננטות: `src/components/gpt-cube-modal/display-settings/{DisplaySettings,RegexInput,ClosedListInput}.tsx` + `CodePreview.tsx` (בתיקיית האב) — כולן + `.module.css`.
- תוקן טקסט אמיתי: האופציה הראשונה ברדיו הייתה `'נוספות'` (ניחוש שגוי) — עכשיו `'תשובות מרשימה סגורה'` (הערך כבר היה מוגדר ולא בשימוש, עכשיו במערך `outputFormats` עצמו).
- **סדר הרדיו הפוך** (`outputFormats` reversed) — לפי בקשת המשתמש.
- **JSON (`CodePreview`) שוכתב לגמרי**: רוחב מלא (100%, לא 803px קבוע) + **ניתן לעריכה בפועל** (AntD `TextArea` אמיתי, controlled דרך `PromptState.jsonOutput`). זה ביטל את ה-syntax highlighting הצבעוני שהיה קיים (highlight מותאם + gutter מספרי שורות) — אין דרך פשוטה לשלב highlighting צבעוני עם שדה עריכה אמיתי בלי ספריית code-editor (Monaco/CodeMirror). נוקה קוד מת בעקבות זה: `paletteExtras`/`codeString` (`tokens.ts`, `ThemeContext.tsx`), `.ltr-block` (`index.css`).
- **RegexInput פושט**: הדוגמה עברה להיות ה-`placeholder` של השדה עצמו (לא שורה נפרדת מתחת).
- **ClosedListInput חדש**: תיבה עם צ'יפים סגורים (AntD `Tag` ברירת מחדל) + שדה טקסט להוספת פריט חדש (Enter/blur מוסיף), מופיעה כש-"תשובות מרשימה סגורה" נבחר. נוסף `closedListItems: string[]` ל-`PromptState`.
- נוסף גם `jsonOutput: string` ל-`PromptState` (ברירת מחדל: `jsonOutputSample`).

---

## איך ממשיכים

בכל סבב: פותחים את הקטע הרלוונטי כאן, משווים לקוד, מסמנים החלטות פתוחות (יש כמה מסומנות למעלה), מיישמים, ומריצים `npm run dev` (פורט 5183) לבדיקה ויזואלית לפני מעבר לסבב הבא.
