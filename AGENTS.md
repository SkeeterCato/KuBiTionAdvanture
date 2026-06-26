# KuBiTionAdvanture Agent Notes

## Project Shape

- This is an older HTML5 React text game. Source JSX lives in `src/main.js`; the itch.io upload bundle uses the precompiled flat files in `dist/itch-html5-v0.33-flat/`.
- `index.css` is the source stylesheet. After CSS changes, copy it to `dist/itch-html5-v0.33-flat/index.css`.
- After JSX changes, compile `src/main.js` to `dist/itch-html5-v0.33-flat/main.js` with the bundled Babel runtime:

```powershell
@'
const fs = require('fs');
const babel = require('./build/browser.min.js');
const source = fs.readFileSync('src/main.js', 'utf8');
const result = babel.transform(source, { blacklist: ['useStrict'] });
fs.writeFileSync('dist/itch-html5-v0.33-flat/main.js', result.code + '\n', 'utf8');
'@ | node -
```

## Itch.io Release

- Rebuild the upload zip from the flat directory:

```powershell
Compress-Archive -Path ".\dist\itch-html5-v0.33-flat\*" -DestinationPath ".\dist\超苦逼冒险者-v0.33-html5-flat.zip" -Force
```

- Keep the ZIP root flat. Do not upload a ZIP that contains a nested `src/`, `build/`, `res/`, or `itch-html5-v0.33-flat/` folder as the playable root.

## Mobile Layout

- Mobile support is split between CSS media queries and JS-applied `forceMobileLayout` on touch/mobile browsers such as Via.
- Game buttons must remain `type="button"` and suppress default click behavior. This avoids mobile iframe/browser navigation when saving or loading.
- The mobile location pill text is centered in both media-query and forced-mobile layouts.

## Verification

Run these before publishing:

```powershell
node tests/mobile-itch-regression.test.js
node --check .\dist\itch-html5-v0.33-flat\main.js
```
