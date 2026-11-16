const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

const source = readFileSync(`${__dirname}/../assets/js/main.js`, 'utf8');
const key = 'portfolio.analytics.excluded';

function run({ url = 'https://kareem-gameel.github.io/', saved, blocked = false,
  referrer = '', controls = false } = {}) {
  const values = new Map(saved ? [[key, saved]] : []);
  const scripts = [];
  const listeners = {};
  const checkbox = { checked: false, disabled: true,
    addEventListener: (event, fn) => { listeners[event] = fn; } };
  const status = { textContent: '' };
  const window = { addEventListener: (event, fn) => { listeners[event] = fn; } };
  const context = {
    location: new URL(url), URL, window,
    localStorage: {
      getItem: (name) => { if (blocked) throw Error('Blocked'); return values.get(name) ?? null; },
      setItem: (name, value) => { if (blocked) throw Error('Blocked'); values.set(name, value); }
    },
    document: {
      referrer,
      querySelector: (selector) => controls
        ? ({ '#analytics-exclusion': checkbox, '#analytics-status': status }[selector] ?? null)
        : null,
      createElement: () => ({ dataset: {} }),
      head: { appendChild: (script) => scripts.push(script) }
    }
  };
  vm.runInNewContext(source, context);
  return { scripts, values, window, checkbox, status, listeners };
}

test('ordinary visits load one tracker with no query or referring path', () => {
  const result = run({ url: 'https://kareem-gameel.github.io/datasets/qm9-wb97mv/?secret=1#part',
    referrer: 'https://example.org/private?q=secret' });
  assert.equal(result.scripts.length, 1);
  assert.equal(result.scripts[0].dataset.goatcounter, 'https://kareem-gameel.goatcounter.com/count');
  assert.equal(result.window.goatcounter.path(), '/datasets/qm9-wb97mv/');
  assert.equal(result.window.goatcounter.referrer, 'https://example.org');
  assert.equal(result.window.goatcounter.no_events, true);
});

test('excluded browsers never load the tracker on any research page', () => {
  for (const path of ['/', '/projects/cura-solubility/', '/datasets/qm9-wb97mv/']) {
    assert.equal(run({ url: `https://kareem-gameel.github.io${path}`, saved: 'true' }).scripts.length, 0);
  }
});

test('opt-out shortcut persists exclusion and is safe to open repeatedly', () => {
  for (const saved of [undefined, 'false', 'true']) {
    const result = run({ url: 'https://kareem-gameel.github.io/privacy/#exclude-analytics', saved, controls: true });
    assert.equal(result.scripts.length, 0);
    assert.equal(result.values.get(key), 'true');
    assert.equal(result.checkbox.checked, true);
    assert.match(result.status.textContent, /are excluded/);
  }
});

test('privacy control saves changes without counting the privacy page', () => {
  const result = run({ url: 'https://kareem-gameel.github.io/privacy/', controls: true });
  assert.equal(result.checkbox.disabled, false);
  result.checkbox.checked = true;
  result.listeners.change();
  assert.equal(result.values.get(key), 'true');
  result.checkbox.checked = false;
  result.listeners.change();
  assert.equal(result.values.get(key), 'false');
  assert.equal(result.scripts.length, 0);
});

test('storage errors fail closed and do not claim a saved exclusion', () => {
  const result = run({ blocked: true, controls: true });
  assert.equal(result.scripts.length, 0);
  assert.equal(result.checkbox.disabled, true);
  assert.match(result.status.textContent, /cannot be saved/);
});

test('local previews, other hosts, HTTP, and privacy variants are never counted', () => {
  for (const url of ['http://localhost:8001/', 'file:///tmp/index.html',
    'https://example.com/', 'http://kareem-gameel.github.io/',
    'https://kareem-gameel.github.io/privacy/', 'https://kareem-gameel.github.io/privacy/index.html']) {
    assert.equal(run({ url }).scripts.length, 0, url);
  }
});

test('an exclusion saved before the async tracker sends also suppresses the visit', () => {
  const result = run();
  result.values.set(key, 'true');
  assert.equal(result.window.goatcounter.path(), null);
});

test('internal referrers are omitted and index.html is normalized', () => {
  const result = run({ url: 'https://kareem-gameel.github.io/index.html',
    referrer: 'https://kareem-gameel.github.io/privacy/' });
  assert.equal(result.window.goatcounter.referrer, '');
  assert.equal(result.window.goatcounter.path(), '/');
});
