# Design Reference Library

A curated collection of design references used by the daily redesign pipeline. Each day, the pipeline selects 3–5 relevant references from this library based on the current brief and feeds them to the design agents as inspiration.

---

## How to Add a Reference

1. Save a screenshot into this directory as a `.png` or `.jpg` file.
2. Open `index.yml` and add an entry under `references:`.

```yaml
- file: your-screenshot.png
  url: https://source-url.com
  description: "One sentence describing what makes this reference worth keeping."
  tags:
    composition: poster
    mood: dramatic
    density: sparse
```

3. Commit `index.yml`. The image file is gitignored — it stays local only.

---

## Tag Reference

### composition
How the layout is structured spatially.

| Value | Meaning |
|-------|---------|
| `poster` | Single dominant element, full-bleed or centered |
| `broadsheet` | Multi-column editorial grid, newspaper-like |
| `gallery` | Grid of equal-weight items |
| `scroll` | Vertical narrative flow, one section after another |
| `split` | Two-panel or left/right division |
| `stack` | Stacked horizontal bands or sections |
| `specimen` | Type or element showcase, catalog-like |
| `index` | List or directory structure, text-heavy |

### mood
The emotional register of the design.

| Value | Meaning |
|-------|---------|
| `warm` | Earthy tones, approachable, human |
| `cold` | Blue-grey palette, precise, clinical |
| `energetic` | High contrast, bold moves, kinetic |
| `calm` | Low contrast, generous whitespace, unhurried |
| `dramatic` | Strong shadows, tension, high stakes |
| `minimal` | Near-nothing, reduction as statement |
| `playful` | Unexpected choices, delight, wit |
| `serious` | Restrained, authoritative, no-nonsense |

### density
How much information is packed into the space.

| Value | Meaning |
|-------|---------|
| `sparse` | Lots of breathing room, few elements |
| `moderate` | Balanced — enough to feel complete |
| `dense` | Information-rich, maximalist, layered |

---

## How the Pipeline Uses References

When the daily brief is generated, the pipeline reads `index.yml` and scores each reference against the brief's intent. The 3–5 highest-scoring references are passed as context to the Layout Architect and Design Director agents. References influence layout composition, typographic mood, and spacing decisions — they do not override the brief, they inform it.

The image files themselves are gitignored so this library stays lightweight in the repo. Only the YAML index is tracked.
