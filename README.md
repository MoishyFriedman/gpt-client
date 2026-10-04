# GPT Cube

A pixel-accurate rebuild of the **"GPT Cube"** panel ("קוביית GPT") — a prompt-configuration UI from a Figma design — as a real, interactive React component. The panel lets a user write instructions for a model, insert cube/field references inline (via `@` mentions or a popover), pick template prompts, configure advanced output settings (max answer length, output format), and preview the model's output — all with full RTL (Hebrew) layout and light/dark theming.

This is a UI-only rebuild: there is no backend. All data (templates, fields, sample output) is mocked in `src/data/mockData.ts`.

## Tech stack

- **React 19** + **TypeScript**, bundled with **Vite 8**
- **antd 6** (Ant Design) for base components (Select, Collapse, Checkbox, Segmented, etc.), themed via `ConfigProvider`
- **usehooks-ts** — `useDarkMode` drives light/dark theme switching (no manual ternaries)
- **CSS Modules** (`*.module.css`) for all component styling — no inline `style={{}}` for design values
- **Oxlint** for linting (`.oxlintrc.json`)

## Getting started

```bash
npm install
npm run dev       # start dev server with HMR
npm run build     # type-check (tsc -b) + production build to dist/
npm run preview   # preview the production build locally
npm run lint       # run oxlint
```

## Project structure

```
src/
  App.tsx                     # root shell, mounts GptCube
  theme/
    ThemeContext.tsx          # wraps usehooks-ts useDarkMode, sets data-theme on <html>
    theme.css                 # global CSS variables (--color-*, shadows, etc.)
    tokens.ts                 # antd ConfigProvider theme tokens
  data/
    mockData.ts                # all mock content: templates, fields, sample JSON output, labels
  components/gpt-cube-modal/
    gpt-cube/                  # outer card shell wrapping PromptPanel
    prompt-panel/              # main panel: composes the sections below
    content-header-row/        # brand icon + light/dark Segmented toggle + model Select
    mention-prompt-input/       # the instructions textarea with inline "@field" mention chips
    input-chips/                # row of selected-template chips + "add field" button
    add-cube-field-popover/     # popover for inserting a cube field reference
    templates-row/              # row of example/template prompt suggestions
    advanced-section/           # collapsible: max answer length + retrieval instructions
    display-settings/           # output format controls (plain / regex / JSON / closed list)
    code-preview/               # read-only preview of the model's JSON output
```

**Conventions** (see also `GPT_CUBE_DESIGN_PLAN.md`):

- One folder per component, with its `.tsx` + `.module.css` (+ any private sub-components/hooks) colocated.
- Component files are kept small (~100 lines); once a logical chunk grows past that, it's split into its own file inside the same folder (e.g. `useMentionMenu.ts` holds the Selection/Range mention logic separately from `MentionPromptInput.tsx`).
- Styling lives in CSS Modules, driven by the CSS variables defined in `theme/theme.css` — not ad-hoc inline styles.
- Dark/light mode is sourced from `usehooks-ts`'s `useDarkMode`, bridged to antd's `ConfigProvider theme={{ algorithm }}`.

## Design source & workflow

The UI is being rebuilt round-by-round from a Figma file (canvas **"GPT cube"**, frame **"קוביית GPT"**). `GPT_CUBE_DESIGN_PLAN.md` (in Hebrew) is the living log of that process: what each component should look like per Figma, what's been matched/fixed so far, and open questions. The Figma API has been rate-limited during this work, so some detail came from previously-saved dumps/screenshots rather than fresh API pulls — anything still uncertain is flagged there as "דורש שליפה טרייה" (needs a fresh pull).

If you're picking this project back up, that file is the best place to check current status before changing a component's styling.
