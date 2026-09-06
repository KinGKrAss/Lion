import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import LandingPage from './components/LandingPage';
import { MODULE_DEFINITIONS, PLATFORM_INTEGRATIONS, SCENARIOS } from './constants';

test('module definitions remain aligned with available scenarios', () => {
  assert.equal(MODULE_DEFINITIONS.length, SCENARIOS.length);
  assert.deepEqual(
    MODULE_DEFINITIONS.map(({ id }) => id),
    SCENARIOS.map(({ id }) => id)
  );

  const zoe = MODULE_DEFINITIONS.find(({ id }) => id === 'zoe');
  assert.ok(zoe);
  assert.match(zoe.description, /unterstützte Arbeitsabläufe/);
  assert.match(zoe.guardrail, /Keine autonome Ausführung/);

  const fortuna = MODULE_DEFINITIONS.find(({ id }) => id === 'fortuna');
  assert.ok(fortuna);
  assert.match(fortuna.guardrail, /keine Zahlungen oder Freigaben/i);
});

test('landing page exposes consistent module and luna status copy', () => {
  const html = renderToStaticMarkup(<LandingPage onStart={() => undefined} />);

  assert.match(html, /href="#module-overview"/);
  assert.match(html, /Aktueller Funktionsrahmen/);
  assert.match(html, /keine autonomen Aktionen/i);
  assert.match(html, /ZOE AI/);
  assert.match(html, /Nicht verbunden/);

  const luna = PLATFORM_INTEGRATIONS.find(({ id }) => id === 'luna');
  assert.ok(luna);
  assert.match(luna.note, /TODO:/);
});
