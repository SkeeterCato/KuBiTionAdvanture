# KuBiTionAdvanture Agent Notes

## Project Shape

- This is an older HTML5 React text game. Source JSX lives in `src/main.js`; data definitions live in `src/data*.js`.
- `index.css` is the source stylesheet.
- The current itch.io upload bundle uses the precompiled flat files in `dist/itch-html5-v0.34-flat/`.
- Keep the active release flat directory in sync with source changes before publishing. Older flat directories are kept for version history.
- `docs/` contains project notes, known issues, data tables, and specs.

## Local Run

- Do not open `index.html` directly.
- Start a local HTTP server from the project root for source-mode development:

```powershell
py -3 -m http.server 8123
```

- Open `http://127.0.0.1:8123/`.

## Build Flat Bundle

After JSX changes, compile `src/main.js` to `dist/itch-html5-v0.34-flat/main.js` with the bundled Babel runtime:

```powershell
@'
const fs = require('fs');
const babel = require('./build/browser.min.js');
const source = fs.readFileSync('src/main.js', 'utf8');
const result = babel.transform(source, { blacklist: ['useStrict'] });
fs.writeFileSync('dist/itch-html5-v0.34-flat/main.js', result.code + '\n', 'utf8');
'@ | node -
```

After CSS or data changes, copy the changed flat files:

```powershell
Copy-Item .\index.css .\dist\itch-html5-v0.34-flat\index.css
Copy-Item .\src\data.js .\dist\itch-html5-v0.34-flat\data.js
Copy-Item .\src\data_item.js .\dist\itch-html5-v0.34-flat\data_item.js
Copy-Item .\src\data_studio.js .\dist\itch-html5-v0.34-flat\data_studio.js
```

Do not copy the source `index.html` into the flat directory. Flat `index.html` must reference root-level `main.js`, `data*.js`, `bootstrap.min.css`, `fastclick.js`, and root-level audio files.

## Itch.io Release

Rebuild the upload zip from the flat directory:

```powershell
Compress-Archive -Path ".\dist\itch-html5-v0.34-flat\*" -DestinationPath ".\dist\超苦逼冒险者-v0.34-html5-flat.zip" -Force
```

Keep the ZIP root flat. Do not upload a ZIP that contains a nested `src/`, `build/`, `res/`, or `itch-html5-v*-flat/` folder as the playable root.

## Mobile Layout

- Mobile support is split between CSS media queries and JS-applied `forceMobileLayout` on touch/mobile browsers such as Via.
- Game buttons must remain `type="button"` and suppress default click behavior. This avoids mobile iframe/browser navigation when saving or loading.
- The mobile location pill text is centered in both media-query and forced-mobile layouts.

## Rule Entry Points

- Robber home-raid logic is in `src/main.js`, `handleDayOver`, under the `//set robber` section.
- Combat hit, damage, cost, and special effects are in `BattleComponent` in `src/main.js`.
- Weapon base attributes come from `ITEM_DATA` entries with `type: 'weapon'` in `src/data_item.js`.
- Weapon durability is tracked by item ID in `durableSaveData`, not per individual weapon instance.

## Docs

- Weapon attributes and combat notes: `docs/武器属性表.md`
- Food attributes: `docs/食品属性表.md`
- Potion attributes: `docs/药剂属性表.md`
- Known issues: `docs/已知问题.md`
- Mobile portrait spec: `docs/移动竖屏改动规格.md`
- v0.34 implemented BUG/value fixes: `docs/v0.34更新内容.md`
- v0.35 planned UI/UX improvements: `docs/v0.35更新内容.md`

## Verification

Run these before publishing:

```powershell
node tests/mobile-itch-regression.test.js
node tests/v0.34-data-regression.test.js
node --check .\dist\itch-html5-v0.34-flat\main.js
```

Before publishing, also run a local HTTP server from the flat directory and verify the page:

```powershell
cd .\dist\itch-html5-v0.34-flat
py -3 -m http.server 8123
```
