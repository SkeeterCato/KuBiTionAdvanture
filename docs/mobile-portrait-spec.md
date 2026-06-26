# Mobile Portrait SPEC

## Problem Statement

The project runs well on itch.io as an HTML5 game, but the current interface is still desktop-oriented. In mobile portrait, the right-side bag/detail area does not fit well, and mouse right-click / hover interactions do not map naturally to touch input.

## Proposed Solution

- Keep the original central action area as the default mobile main screen.
- Add a fixed top status bar for season, day, time color block, location, hp, hunger, moisture, stamina, and sanity.
- Add a fixed bottom navigation with only Bag, Skill, and Menu.
- Bag and Skill replace the central content area on mobile, while keeping the top status bar and bottom navigation visible.
- Menu opens as a full-screen overlay and provides its existing return button.
- Do not create a separate equipment page. Item detail actions such as use/equip should stay in the item detail area.
- Skill uses a mobile-friendly list + description layout, reusing the existing skill data and rules.

## Technical Constraints

- Keep desktop behavior unchanged.
- Avoid changing gameplay rules, item exchange logic, combat logic, save data shape, or skill progression.
- Prefer layout and touch-entry changes over data or rule changes.
- Target the itch.io HTML5 embedded mobile portrait view.

## Non-goals

- No landscape-specific layout.
- No tablet-specific layout.
- No separate equipment system page.
- No major visual redesign.
- No full rewrite of bag, combat, or skill systems.

## Success Criteria

- The main action area remains usable in itch.io mobile portrait.
- The top status bar remains visible without covering core actions.
- Bag can be opened from the bottom navigation.
- Items can be selected to show detail, and existing use/equip actions are available from detail on touch devices.
- Skill page shows a skill list and the selected skill description.
- Menu opens full-screen and can return to the game.
- Desktop layout and existing desktop interactions still work.
- Local page is verified before reporting completion; itch.io verification is reported separately if unavailable.
