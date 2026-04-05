# 2026-04-05

**Design Brief:** A light, spacious spring palette (teal-green neutrals, warm amber accents) with ceremonial precision (tight letter-spacing, measured leading) paired with golden warmth—Radiohead's geometry holding My Morning Jacket's light—across an enforced-pacing Scroll layout that makes a Ming-Dao Deng quote and a GPU-building game both feel earned and contemplative.

## Signals


## Claude's Rationale

The design for doug-march.com on Easter Sunday 2026 honors a dual personality: Radiohead's angular precision (achieved through tight, negative letter-spacing on large display type and maximally-tracked labels) paired with My Morning Jacket's golden warmth (expressed through amber-gold accents and warm-tinted shadows on a spring teal-green palette). The Scroll archetype—rejected initially but ultimately chosen—serves the brief's core requirement: contemplative pacing. Rather than optional browsing (Specimen) or relentless momentum (typical Scroll), this implementation uses enforced section heights (50–100vh) to require lingering, making the Ming-Dao Deng quote (60vh section, nothing else) genuinely powerful through temporal rhythm rather than spatial hierarchy. Light mode is justified by Easter's spring clarity and the waning gibbous moon's 85% illumination—high contrast is earned, not imposed. Cormorant Garamond (display serif) + Lora (warm, text serif) avoids the geometric coldness a sans would introduce, keeping the overall voice measured yet organic. The single structural irregularity—expanding the HN callout content width to 800px vs. 720px standard—makes editorial weight visible without visual drama, following the "whisper not shout" directive.

## Files Changed

- elements/preset.ts
- app/routes/__root.tsx
- app/components/Layout.tsx
- app/components/Sidebar.tsx
- app/routes/index.tsx
- app/routes/about.tsx
- app/routes/work.$slug.tsx
