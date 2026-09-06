import assert from 'node:assert/strict';
import test from 'node:test';

import { LANDING_PAGE_COPY, MODULE_DEFINITIONS, PLATFORM_INTEGRATIONS, SCENARIOS } from './constants';

test('module definitions stay aligned with scenarios', () => {
  assert.equal(MODULE_DEFINITIONS.length, SCENARIOS.length);
  assert.deepEqual(
    MODULE_DEFINITIONS.map(({ id }) => id),
    SCENARIOS.map(({ id }) => id)
  );

  const zoe = MODULE_DEFINITIONS.find(({ id }) => id === 'zoe');
  assert.ok(zoe);
  assert.match(zoe.guardrail, /Keine autonome Ausführung/);

  const fortuna = MODULE_DEFINITIONS.find(({ id }) => id === 'fortuna');
  assert.ok(fortuna);
  assert.match(fortuna.guardrail, /keine Zahlungen oder Freigaben/i);
});

test('landing copy and luna integration text are consistent', () => {
  assert.equal(LANDING_PAGE_COPY.moduleSectionHref, '#module-overview');
  assert.equal(LANDING_PAGE_COPY.moduleSectionId, 'module-overview');
  assert.match(LANDING_PAGE_COPY.capabilityNoticeBody, /keine autonomen Aktionen/i);

  const luna = PLATFORM_INTEGRATIONS.find(({ id }) => id === 'luna');
  assert.ok(luna);
  assert.equal(luna.status, 'Nicht verbunden');
  assert.match(luna.note, /TODO:/);
});
