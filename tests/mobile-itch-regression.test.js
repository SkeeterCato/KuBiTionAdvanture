const fs = require('fs');
const assert = require('assert');

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

const sourceCss = read('index.css');
const distDir = fs.existsSync('dist/itch-html5-v0.34-flat')
  ? 'dist/itch-html5-v0.34-flat'
  : 'dist/itch-html5-v0.33-flat';
const distCss = read(`${distDir}/index.css`);
const sourceMain = read('src/main.js');
const distMain = read(`${distDir}/main.js`);

function assertMobileClassSupport(css, label) {
  assert(
    css.includes('.forceMobileLayout .mobileTopStatus'),
    `${label} must expose mobile layout through a JS-applied class`
  );
  assert(
    css.includes('.forceMobileLayout .desktopGameArea > .equipMain'),
    `${label} must hide the desktop bag when mobile layout is forced`
  );
  assert(
    css.includes('html.forceMobileLayout .main') && css.includes('width:100%'),
    `${label} must keep forced mobile layout full width inside the iframe`
  );
  assert(
    !css.includes('--mobile-shell-width'),
    `${label} must not center forced mobile layout in a narrow shell`
  );
  assert(
    css.includes('.forceMobileLayout .mobilePlace') && css.includes('justify-content:center'),
    `${label} must center the mobile place text`
  );
}

function assertButtonDefaultSuppression(js, label) {
  assert(
    js.includes('type') && js.includes('button'),
    `${label} buttons must set type="button"`
  );
  assert(
    js.includes('event.preventDefault') && js.includes('event.stopPropagation'),
    `${label} button handlers must prevent default mobile iframe navigation`
  );
}

function assertMobileDetection(js, label) {
  assert(
    js.includes('forceMobileLayout') && js.includes('matchMedia'),
    `${label} must apply forceMobileLayout from JS mobile/touch detection`
  );
}

assertMobileClassSupport(sourceCss, 'source CSS');
assertMobileClassSupport(distCss, 'dist CSS');
assertButtonDefaultSuppression(sourceMain, 'source JS');
assertButtonDefaultSuppression(distMain, 'dist JS');
assertMobileDetection(sourceMain, 'source JS');
assertMobileDetection(distMain, 'dist JS');

console.log('mobile itch regression checks passed');
