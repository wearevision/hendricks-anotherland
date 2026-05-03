# Lanzamiento Another — Hendrick's Another Launch

<!-- AUTO-MANAGED: project-description -->
## Project Description

Immersive event proposal and microsite for the Hendrick's Another gin launch in Santiago de Chile. The concept is "Anotherland" — a surreal, theatrical world. Deliverables include an interactive storytelling site and a 16:9 print/PDF proposal deck.
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->
## Architecture

```
site/
  index.html        # Interactive storytelling site (web browser)
  print.html        # 16:9 (1920×1080) print/PDF proposal deck — all styles inline
  css/              # Stylesheets for index.html
  js/               # Scripts for index.html
  images/
    brand/          # Hendrick's brand assets (SVG logos, vine PNGs)
    venue/          # Venue photography
    renders/        # Character/scene AI renders
    props/          # Product and prop imagery

Root assets (not served):
  anotherland-proposal.pdf   # Generated PDF from print.html
  Brandbook Hendrick´s .pdf
  Brief Lanzamiento Santiago de Chile.pdf
```
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->
## Conventions

### print.html slide authoring
- Each slide is a `<div class="slide sN">` with `page-break-after: always` and `break-after: page`
- All CSS lives in the inline `<style>` block — no external stylesheet
- Slide-specific rules use `.sN__*` BEM-style selectors (e.g. `.s2__grid`, `.s8__char`)
- Shared layout classes: `.split` (48/52% text-left/image-right), `.split--rev` (reversed), `.fullbg` (full-bleed image + overlay)
- Corner decorations: `.corner-tl` / `.corner-br` (gold border fragments, opacity 0.25)
- Slide number: `.slide-num` (absolute, bottom-center)
- Print fidelity: `-webkit-print-color-adjust: exact; print-color-adjust: exact` on `html, body`

### Brand palette (CSS custom properties)
| Token | Value | Use |
|-------|-------|-----|
| `--black` | `#0a0a0a` | Base background |
| `--gold` | `#c8a96e` | Primary accent, labels, rules |
| `--gold2` | `#d4ba82` | Secondary gold, `<strong>` text |
| `--cream` | `#f5f0e8` | Body text |
| `--muted` | `#9a9088` | Subdued text, slide numbers |
| `--green` | `#2d5a27` | Accent |
| `--orange` | `#e8721d` | Accent |

### Spacing tokens (CSS custom properties)
| Token | Value | Use |
|-------|-------|-----|
| `--pad-y` | `96px` | Vertical padding for slide content |
| `--pad-x` | `96px` | Horizontal padding for split text panels |
| `--pad-x-lg` | `120px` | Horizontal for fullbg / centered / wide layouts |

Always use these tokens — never hardcode padding values (e.g. `80px 64px`, `80px 90px`).

### Typography roles
| Token | Font | Use |
|-------|------|-----|
| `--f-title` | Baskervville (serif) | `.h1`–`.h4`, slide titles |
| `--f-body` | Cormorant Garamond (serif) | Body copy, `.lead`, `.body` |
| `--f-ui` | Inter (sans-serif) | Labels, slide numbers, uppercase captions |

### Gold rule separator
```html
<div class="rule"></div>          <!-- left-aligned -->
<div class="rule rule--center"></div>  <!-- centered -->
```

### Agenda/timing table (`.journey__*`)
- Grid: `220px` time column + `1fr` description; gap `40px`; row padding `22px 0`
- Time: Inter, 16px, gold uppercase; description: Cormorant, 24px; `<em>` title block: Baskervville, 28px italic cream
- The Journey slide is split into two slides: Part I "Before The Portal" (4 rows) and Part II "Into Anotherland · Crossing The Portal" (3 rows)
- Part label: `.journey__part` — uppercase Inter gold label rendered above the table
- Decorative assets: `.journey__vine-tl` / `.journey__vine-br` (vine overlays, corner-positioned), `.journey__hand-tr` / `.journey__hand-bl` (blossom hand overlays, corner-positioned)
- New brand assets: `images/brand/hand-blossom-left.png`, `images/brand/hand-blossom-right.png`, `images/brand/small-vine-right.png`

### Catering quantities (`.selection__*`)
- Grid: `100px` quantity + `1fr` label
- Quantity in Baskervville gold; label in Inter uppercase cream

### Character grid (`.s8__chars`)
- 4-column grid for Anotherlanders slide; each cell is `.s8__char` with `.s8__char-caption`, `.s8__char-count`, `.s8__char-name`

### Closing credits slide (`.s-credits`)
- Classes: `.s-credits__logo` (centered brand logo), `.s-credits__divider` (gold rule), `.s-credits__agency`, `.s-credits__contact`
- Follows standard corner decorations + centered layout

### Total slides
- 21 slides: Cover → Brief → Strategy → (concept/venue slides) → Venue Transform → Anotherlanders → The Journey Part I → The Journey Part II → Another Selection → Act I–III → Botanical Sorbets → The Toast → The Unbox → Farewell → Credits
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: patterns -->
## Patterns

- **Overlay gradient direction matches image edge**: left-panel splits use `to right` gradient; right-panel splits use `to left`; fullbg slides use `135deg`
- **Section dividers**: gold `<div class="rule">` precedes section label (`.label`), which precedes heading
- **Image subdirectory by type**: brand assets → `images/brand/`, location photos → `images/venue/`, AI-generated scenes/characters → `images/renders/`, bottles/botanicals → `images/props/`
- **Italic gold accent in headings**: `<em>` inside `.h1`/`.h2` renders in `--gold` italic
- **Per-slide font-size overrides**: use inline `style="font-size:Npx"` on individual `<p>` elements to override shared `.lead` / `.body` class sizes for a specific slide
- **Image crop alignment**: use inline `style="object-position:center"` (or `center top`) on `<img>` tags to control crop point after swapping renders
- **PDF-specific renders**: filenames under `images/renders/` use `pdf-` prefix (e.g. `pdf-greenhouse-sorbet.jpg`) to distinguish PDF-optimised crops from generic renders
<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: git-insights -->
## Git Insights

- Real proposal images were added to `print.html` slides in place of placeholder content
- PDF generation workflow assumed: open `site/print.html` in browser → Print → Save as PDF (1920×1080 landscape, no margins)
- Latest slides added: "The Journey" (agenda/timing) and "Another Selection" (catering quantities)
- Sorbet slide render swapped to greenhouse variant (`pdf-greenhouse-sorbet.jpg`); `object-position:center` used for image crop alignment
- Slide 2 font sizes fine-tuned via inline overrides: label 11→12px, value 22→25px, lead paragraph 31px, body paragraph 25px
- Padding system unified: replaced all hardcoded values with `--pad-y` / `--pad-x` / `--pad-x-lg` tokens (96/96/120px) across `.split__text`, `.fullbg__content`, and inline-styled slide divs
- Journey slide copy restored from client PDF: full verbose descriptions per row; "Anotherland Open" uses plain `<strong>` for portal close time (no `<em>` wrapper)
- `.journey__*` grid compacted (220→200px column, 18→11px row padding, 20→16px desc font) to fit all rows at 1080px height
- "The Journey" slide split into Part I (4 rows, "Before The Portal") and Part II (3 rows, "Into Anotherland · Crossing The Portal"); total slides increased from 20 to 21
- New decorative CSS classes added to Journey slides: `.journey__vine-tl`, `.journey__vine-br`, `.journey__hand-tr`, `.journey__hand-bl`, `.journey__part`
- New brand assets added: `images/brand/hand-blossom-left.png`, `images/brand/hand-blossom-right.png`, `images/brand/small-vine-right.png`
- Journey slide font sizes enlarged for legibility: `.journey__time` 14→16px, `.journey__desc` 19→24px, `.journey__desc em` 22→28px
<!-- END AUTO-MANAGED -->
