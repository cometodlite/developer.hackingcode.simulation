# Phase 1 notes — Screen hierarchy first

## What exists now
- `app-ui.js` already builds a shell with five main views: home, codes, shop, lab, coming.
- `homeCockpit` groups status, actions, and today summary.
- `inventorySubtabs` split CODES / ITEMS.
- `lab` contains stage and campaign.
- `coming` contains campaign, zero-day, and special.

## Decisions
- Default first screen: **Home / active run view**
- Dominant element on default screen: **Main action button**
- Legacy UI: **keep reachable through the same nav**

## Current home layout snapshot
- Home cockpit is already a 2-column grid.
- Status and action areas are visually stronger than other sections, but still contain too much information.
- Today summary is useful, but it currently competes with the main action area instead of supporting it.
- Live hint is a good concept, but it should be secondary to the primary action.

## Main UI problems to solve
- Still too much visual weight inside the active play area.
- Home view contains management blocks that compete with the primary action.
- Codes view is still detail-heavy.
- Lab / coming are useful, but they should feel secondary to the active run.
- The layout needs a clearer hierarchy: current run state first, support systems second, meta third.

## Files most relevant for the screen pass
- `app-ui.js` — view composition and shell routing.
- `style.css` — layout, responsive grid, panel sizing, visibility rules.
- `index.html` — source DOM structure if reordering is needed.
- `app-core.js` — only for content labels/state hooks if the layout expects them.

## Implementation intent for this slice
- Keep the legacy screens as fallback.
- Create a clearer “active run” main view.
- Reduce the number of always-visible elements on home.
- Make the action area and danger/status area more prominent.
- Preserve current functionality while changing layout first.
