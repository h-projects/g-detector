import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { Level, detect } from '../src/index.js';

describe('low detector', () => {
  test('returns true on a g-only string', () => {
    assert.equal(detect('g', Level.Low), true);
    assert.equal(detect('gggggggg g', Level.Low), true);
    assert.equal(detect('g⅁ 🅶🅶🅶', Level.Low), true);
    assert.equal(detect('🅶🅖🄶🄖ｇＧꬶꞬꞡꞠℊḡḠᶢᶃᵹᵷᵍᴳʛǵǤ⅁ĜĝĞğɢɡɠƓģĢġĠgG⒢', Level.Low), true);
  });

  test('returns false on a non-g string', () => {
    assert.equal(detect('g-g', Level.Low), false);
    assert.equal(detect('greetings', Level.Low), false);
    assert.equal(detect('i think g is a letter', Level.Low), false);
    assert.equal(detect('the letter g', Level.Low), false);
    assert.equal(detect('i love the letter h', Level.Low), false);
    assert.equal(detect('. .', Level.Low), false);
    assert.equal(detect(',', Level.Low), false);
    assert.equal(detect('', Level.Low), false);
  });
});

describe('medium detector', () => {
  test('returns true on a string that has standalone g', () => {
    assert.equal(detect('g', Level.Medium), true);
    assert.equal(detect('g-g', Level.Medium), true);
    assert.equal(detect('g_eometry dash', Level.Medium), true);
    assert.equal(detect('weird unicode space characters: ᅟg ᅠg ㅤg ﾠg', Level.Medium), true);
    assert.equal(detect('I AM A SPY. I LOVE G!!!', Level.Medium), true);
    assert.equal(detect('the letter g tho', Level.Medium), true);
    assert.equal(detect('g!asbot', Level.Medium), true);
  });

  test('returns false on a non-g string', () => {
    assert.equal(detect('greetings', Level.Medium), false);
    assert.equal(detect('hamburger', Level.Medium), false);
    assert.equal(detect('pogging', Level.Medium), false);
    assert.equal(detect('. .', Level.Medium), false);
    assert.equal(detect(',', Level.Medium), false);
    assert.equal(detect('', Level.Medium), false);
  });

  test('whitelists substrings correctly', () => {
    assert.equal(detect('g-spy', Level.Medium), false);
    assert.equal(detect('no u g-spy', Level.Medium), false);
    assert.equal(detect('this is a g-spy. g-spy says g. it wasnt very effective', Level.Medium), true);
  });
});

describe('high detector', () => {
  test('returns true on strings containing g', () => {
    assert.equal(detect('gg', Level.High), true);
    assert.equal(detect('gregory', Level.High), true);
    assert.equal(detect('germany', Level.High), true);
    assert.equal(detect('qwertyuiopasdf🇬h', Level.High), true);
  });

  test('returns false on strings not containing g', () => {
    assert.equal(detect('HIIIIIIIIIIIIIIIIIIIIII', Level.High), false);
    assert.equal(detect('the real', Level.High), false);
    assert.equal(detect('. .', Level.High), false);
    assert.equal(detect(',', Level.High), false);
    assert.equal(detect('', Level.High), false);
  });

  test('whitelists substrings correctly', () => {
    assert.equal(detect('g-spy', Level.High), false);
    assert.equal(detect('no u g-spy', Level.High), false);
    assert.equal(detect('this is a g-spy. g-spy says g. it wasnt very effective', Level.High), true);
    assert.equal(detect('this is a g-spy. he doesnt like hamburger', Level.High), true);
  });
});
