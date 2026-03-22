# Design System Specification: The Precision Lab

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Equation"**

This design system rejects the cluttered, "dashboard-heavy" tropes of traditional data tools. Instead, it adopts the persona of a premium laboratory—an environment where high-stakes mathematics meets editorial elegance. We move beyond standard UI by treating the interface as a physical workspace of stacked fine paper and etched glass. 

To break the "template" look, we utilize **intentional asymmetry**. Align primary data visualizations to a rigorous grid, but allow secondary insights and labels to breathe in wider, off-center margins. The goal is a high-contrast, "quiet" luxury that signals authority and absolute precision.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the absence of traditional "tech blues." We use a sophisticated Deep Slate (`primary: #002d1f`) and Emerald (`inverse_primary: #8bd6b6`) to ground the experience, while Amber (`on_tertiary_container: #f48c24`) serves as a high-visibility surgical tool for critical alerts.

### The "No-Line" Rule
Sectioning must never be achieved through 1px solid black or grey borders. Use background color shifts to define zones. For instance, a sidebar using `surface_container_low` should sit flush against a `surface` main stage. The boundary is perceived by the eye through tonal contrast, not a structural line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface_container` tiers to create a "nested" depth:
- **Base Layer:** `surface` (#f7f9fb) for the main application background.
- **Mid Layer:** `surface_container` (#eceef0) for primary content areas.
- **Top Layer:** `surface_container_highest` (#e0e3e5) for focused utility panels or active states.

### The "Glass & Gradient" Rule
Floating elements (modals, popovers) must utilize **Glassmorphism**. Apply `surface_container_lowest` at 80% opacity with a `backdrop-blur` of 12px. This ensures the mathematical data "underneath" remains visible but diffused, maintaining the lab-like transparency.

---

## 3. Typography
The system employs a dual-font strategy to separate navigational intent from raw data.

*   **Display & Headlines (Space Grotesk):** A geometric sans-serif that feels engineered. Use `display-lg` (3.5rem) for high-impact hero numbers and `headline-sm` (1.5rem) for section titles. The wide apertures of Space Grotesk mirror the "openness" of the layout.
*   **Body & UI (Inter):** The workhorse. Use `body-md` (0.875rem) for all instructional text. It provides a neutral, high-legibility counterpoint to the more expressive display face.
*   **Numerical Data (Monospace - System Fallback):** All mathematical outputs must use a refined mono-spaced font. This ensures that decimal points align vertically in tables, maintaining the "High-End Data Tool" aesthetic.

---

## 4. Elevation & Depth
We eschew traditional material shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** To lift a card, do not add a shadow. Instead, change the token from `surface_container_low` to `surface_container_lowest`. The "glow" of the brighter white creates a natural lift.
*   **Ambient Shadows:** If a floating element (like a context menu) requires a shadow, it must be an "Ambient Shadow": `0px 20px 40px rgba(25, 28, 30, 0.06)`. The tint is derived from `on_surface` to mimic natural light refraction.
*   **The "Ghost Border":** For high-density data tables where separation is critical, use a "Ghost Border": `outline_variant` (#c3c7ca) at **15% opacity**. This is the only acceptable use of a structural line.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on_primary` text. Use `radius-sm` (0.125rem) for a sharp, architectural feel. 
*   **Secondary:** `outline` border (Ghost Border style) with `primary` text. No fill.
*   **State:** On hover, primary buttons should transition to `primary_container`.

### Input Fields
*   Avoid boxes. Use a bottom-border only (`outline_variant`) that animates to 2px `surface_tint` (#1b6b51) on focus.
*   Numerical inputs should always use the `label-md` typography to maintain the mathematical precision.

### Cards & Lists
*   **Forbid Dividers:** Do not use horizontal lines to separate list items. Use `spacing-4` (1.4rem) of vertical whitespace. If the list is dense, use alternating backgrounds between `surface` and `surface_container_low`.

### Data Visualization (Signature Component)
*   **The "Emerald Pulse":** Use `inverse_primary` for active data lines. 
*   **The "Amber Alert":** Use `tertiary_fixed_dim` for outliers or mathematical errors. These accents should be thin (1.5px to 2px) to maintain the "fine-tip pen" laboratory aesthetic.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use `spacing-16` (5.5rem) or `spacing-20` (7rem) for page margins. Luxury is defined by how much space you "waste."
*   **Do** align all text to a baseline grid to ensure the precise feel of a technical manual.
*   **Do** use `surface_bright` for interactive components that need to pop against a `surface_dim` background.

### Don’t:
*   **Don't** use `radius-full` (pills) for anything other than status tags. It breaks the architectural rigidity of the system.
*   **Don't** use pure black (#000000). Use `on_surface` (#191c1e) for all "black" text to keep the palette sophisticated and soft.
*   **Don't** use standard "Success" green. Use the Emerald tokens provided (`primary_fixed_dim`) to stay within the signature color story.