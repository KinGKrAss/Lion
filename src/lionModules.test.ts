import assert from 'node:assert/strict';
import test from 'node:test';

import { LANDING_PAGE_COPY, MODULE_DEFINITIONS, PLATFORM_INTEGRATIONS, SCENARIOS } from './constants';

test('module definitions stay aligned with scenarios', () => {
  assert.equal(MODULE_DEFINITIONS.length, SCENARIOS.length);
  assert.deepEqual(
    MODULE_DEFINITIONS.map(({ id }) => id),
    SCENARIOS.map(({ id }) => id)
  );
});

test('guardrail wording for sensitive modules is preserved', () => {
  const fortuna = MODULE_DEFINITIONS.find(({ id }) => id === 'fortuna');
  const zoe = MODULE_DEFINITIONS.find(({ id }) => id === 'zoe');

  assert.ok(fortuna);
  assert.ok(zoe);
  assert.match(fortuna.guardrail, /keine Zahlungen oder Freigaben/i);
  assert.match(zoe.guardrail, /Keine autonome Ausführung/);
});

test('landing copy and luna placeholder metadata stay consistent', () => {
  assert.equal(LANDING_PAGE_COPY.moduleSectionHref, '#module-overview');
  assert.equal(LANDING_PAGE_COPY.moduleSectionId, 'module-overview');

  const luna = PLATFORM_INTEGRATIONS.find(({ id }) => id === 'luna');
  assert.ok(luna);
  assert.match(luna.status, /Nicht verbunden/);
  assert.match(luna.note, /TODO:/);
});
