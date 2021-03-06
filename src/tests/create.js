'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const create_1 = require('./fixtures/create');
const txTools_1 = require('./utils/txTools');
for (const f of create_1.fixtures) {
  tape('Test: ' + f.description, t => {
    const psbt = new psbt_1.Psbt(txTools_1.getDefaultTx(2));
    for (const input of f.input.addInputs) {
      psbt.addInput(input);
    }
    for (const output of f.input.addOutputs) {
      psbt.addOutput(output);
    }
    t.equal(psbt.toBase64(), f.expectedBeforeUpdate);
    for (const [i, input] of f.input.updateInputData.entries()) {
      psbt.updateInput(i, input);
    }
    for (const [i, output] of f.input.updateOutputData.entries()) {
      psbt.updateOutput(i, output);
    }
    t.equal(psbt.toBase64(), f.expectedAfterUpdate);
    t.end();
  });
}
