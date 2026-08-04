# 11 Design System

## Brand Direction
Premium, modern, elegant, trustworthy, and luxurious.

## Color System
- Primary (Brand Purple): `#8a2b8f`
- Primary Strong: `#6a1f70`
- Secondary: `#2b2733`
- Accent Gold: `#c5a15b`
- Background: `#f8f5fb`
- Surface/Card: `#fffdff`
- Border: `#e4dcec`
- Muted Text: `#6b6675`

Defined in: `src/app/globals.css`

## Typography System
- Heading: Cormorant Garamond
- Body/UI: Manrope

## Spacing System
- Section: `py-12`, `py-16`
- Container: `max-w-7xl`
- Card internal spacing: `p-5` to `p-8`

## Radius System
- Card radius: `1.25rem`
- Button radius: `0.85rem`

## Shadow System
- Soft elevation: `--shadow-soft`
- Premium glow: `--shadow-glow`

## Component Guidelines
- Keep cards rounded with soft elevation.
- Use subtle gradients and glass-like overlays only in hero/CTA contexts.
- Use motion for hierarchy, not decoration.
- Maintain strong contrast for text and controls.

## Interaction Guidelines
- Hover: translate and scale subtly (`< 6px`, `< 1.06x`).
- Focus: visible ring on interactive controls.
- Form errors: short, explicit text under fields.
