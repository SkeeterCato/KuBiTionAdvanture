const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const context = {
  console,
  SCIENCE_DATA: {},
  PLACE_DATA: {},
  EVENT_DATA: {},
  PREFIX_DATA: {},
  clone(value) {
    return JSON.parse(JSON.stringify(value));
  },
};

vm.createContext(context);
for (const file of ['src/data_item.js', 'src/data.js', 'src/data_studio.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}

function getValue(give) {
  const item = context.ITEM_DATA[give];
  if (item.value) return item.value;

  let value = 0;
  if (item.effect) {
    for (const attr in item.effect) {
      const mul = attr === 'ps' ? 0.5 : 1;
      value += mul * (item.effect[attr] > 0 && attr !== 'temp' ? item.effect[attr] : 0);
    }
    return value;
  }

  for (const data of [context.MAKE_DATA, context.ALCHEMY_DATA, context.MAGIC_DATA]) {
    if (!data[give]) continue;
    for (const attr in data[give].require) {
      value += getValue(attr) * data[give].require[attr];
    }
    return value;
  }

  return value;
}

assert(!context.COOK_DATA.some(recipe => recipe.require.includes('flour')));
assert.strictEqual(getValue('alco'), 20);
assert.strictEqual(getValue('icePotion'), 20);
assert.strictEqual(getValue('firePotion'), 20);
assert.strictEqual(JSON.stringify(context.ITEM_DATA.icePotion.effect), JSON.stringify({ moist: 10, temp: -35 }));
assert.strictEqual(JSON.stringify(context.ITEM_DATA.firePotion.effect), JSON.stringify({ full: 10, temp: 35 }));
assert.strictEqual(JSON.stringify(context.ALCHEMY_DATA.firePotion.require), JSON.stringify({ fire: 2 }));
assert.notStrictEqual(context.ITEM_DATA.sniper.desc, context.ITEM_DATA.goodSniper.desc);

const main = fs.readFileSync('src/main.js', 'utf8');
assert(main.includes('Math.min(bag.humanMeat || 0, 1000)'));
assert(main.includes('dmg += amount * 2'));

console.log('v0.34 data regression checks passed');
