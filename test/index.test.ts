import { describe, expect, test } from 'vitest';
import { detect, Level } from '../src/index.js';

describe('low detector', () => {
  test('returns true on a g-only string', () => {
    expect(detect('g', Level.Low)).toBe(true);
    expect(detect('gggggggg g', Level.Low)).toBe(true);
    expect(detect('g⅁ 🅶🅶🅶', Level.Low)).toBe(true);
    expect(detect('🅶🅖🄶🄖ｇＧꬶꞬꞡꞠℊḡḠᶢᶃᵹᵷᵍᴳʛǵǤ⅁ĜĝĞğɢɡɠƓģĢġĠgG', Level.Low)).toBe(true);
  });

  test('returns false on a non-g string', () => {
    expect(detect('g-g', Level.Low)).toBe(false);
    expect(detect('greetings', Level.Low)).toBe(false);
    expect(detect('i think g is a letter', Level.Low)).toBe(false);
    expect(detect('the letter g', Level.Low)).toBe(false);
    expect(detect('i love the letter h', Level.Low)).toBe(false);
    expect(detect('. .', Level.Low)).toBe(false);
    expect(detect(',', Level.Low)).toBe(false);
    expect(detect('', Level.Low)).toBe(false);
  });
});

describe('medium detector', () => {
  test('returns true on a string that has standalone g', () => {
    expect(detect('g', Level.Medium)).toBe(true);
    expect(detect('g-g', Level.Medium)).toBe(true);
    expect(detect('I AM A SPY. I LOVE G!!!', Level.Medium)).toBe(true);
    expect(detect('the letter g tho', Level.Medium)).toBe(true);
    expect(detect('g!asbot', Level.Medium)).toBe(true);
  });

  test('returns false on a non-g string', () => {
    expect(detect('greetings', Level.Medium)).toBe(false);
    expect(detect('hamburger', Level.Medium)).toBe(false);
    expect(detect('pogging', Level.Medium)).toBe(false);
    expect(detect('. .', Level.Medium)).toBe(false);
    expect(detect(',', Level.Medium)).toBe(false);
    expect(detect('', Level.Medium)).toBe(false);
  });

  test('whitelists substrings correctly', () => {
    expect(detect('g-spy', Level.Medium)).toBe(false);
    expect(detect('no u g-spy', Level.Medium)).toBe(false);
    expect(detect('this is a g-spy. g-spy says g. it wasnt very effective', Level.Medium)).toBe(true);
  });
});

describe('high detector', () => {
  test('returns true on strings containing g', () => {
    expect(detect('gg', Level.High)).toBe(true);
    expect(detect('gregory', Level.High)).toBe(true);
    expect(detect('germany', Level.High)).toBe(true);
    expect(detect('qwertyuiopasdf🇬h', Level.High)).toBe(true);
  });

  test('returns false on strings not containing g', () => {
    expect(detect('HIIIIIIIIIIIIIIIIIIIIII', Level.High)).toBe(false);
    expect(detect('the real', Level.High)).toBe(false);
    expect(detect('. .', Level.High)).toBe(false);
    expect(detect(',', Level.High)).toBe(false);
    expect(detect('', Level.High)).toBe(false);
  });

  test('whitelists substrings correctly', () => {
    expect(detect('g-spy', Level.High)).toBe(false);
    expect(detect('no u g-spy', Level.High)).toBe(false);
    expect(detect('this is a g-spy. g-spy says g. it wasnt very effective', Level.High)).toBe(true);
    expect(detect('this is a g-spy. he doesnt like hamburger', Level.High)).toBe(true);
  });
});
