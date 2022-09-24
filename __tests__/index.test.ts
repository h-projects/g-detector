import { describe, expect, test } from 'vitest';
import { detect, Level } from '../src/index.js';

describe('low detector', () => {
  test('returns true on a g-only string', () => {
    expect(detect('g', Level.Low)).toStrictEqual(true);
    expect(detect('gggggggg g', Level.Low)).toStrictEqual(true);
    expect(detect('g⅁ 🅶🅶🅶', Level.Low)).toStrictEqual(true);
  });

  test('returns false on a non-g string', () => {
    expect(detect('g-g', Level.Low)).toStrictEqual(false);
    expect(detect('greetings', Level.Low)).toStrictEqual(false);
    expect(detect('i think g is a letter', Level.Low)).toStrictEqual(false);
    expect(detect('the letter g', Level.Low)).toStrictEqual(false);
    expect(detect('i love the letter h', Level.Low)).toStrictEqual(false);
    expect(detect('. .', Level.Low)).toStrictEqual(false);
    expect(detect(',', Level.Low)).toStrictEqual(false);
    expect(detect('', Level.Low)).toStrictEqual(false);
  });
});

describe('medium detector', () => {
  test('returns true on a string that has standalone g', () => {
    expect(detect('g', Level.Medium)).toStrictEqual(true);
    expect(detect('g-g', Level.Medium)).toStrictEqual(true);
    expect(detect('I AM A SPY. I LOVE G!!!', Level.Medium)).toStrictEqual(true);
    expect(detect('the letter g tho', Level.Medium)).toStrictEqual(true);
    expect(detect('g!asbot', Level.Medium)).toStrictEqual(true);
  });

  test('returns false on a non-g string', () => {
    expect(detect('greetings', Level.Medium)).toStrictEqual(false);
    expect(detect('hamburger', Level.Medium)).toStrictEqual(false);
    expect(detect('pogging', Level.Medium)).toStrictEqual(false);
    expect(detect('. .', Level.Medium)).toStrictEqual(false);
    expect(detect(',', Level.Medium)).toStrictEqual(false);
    expect(detect('', Level.Medium)).toStrictEqual(false);
  });

  test('whitelists substrings correctly', () => {
    expect(detect('g-spy', Level.Medium)).toStrictEqual(false);
    expect(detect('no u g-spy', Level.Medium)).toStrictEqual(false);
    expect(detect('this is a g-spy. g-spy says g. it wasnt very effective', Level.Medium)).toStrictEqual(true);
  });
});

describe('high detector', () => {
  test('returns true on strings containing g', () => {
    expect(detect('gg', Level.High)).toStrictEqual(true);
    expect(detect('gregory', Level.High)).toStrictEqual(true);
    expect(detect('germany', Level.High)).toStrictEqual(true);
    expect(detect('qwertyuiopasdf🇬h', Level.High)).toStrictEqual(true);
  });

  test('returns false on strings not containing g', () => {
    expect(detect('HIIIIIIIIIIIIIIIIIIIIII', Level.High)).toStrictEqual(false);
    expect(detect('the real', Level.High)).toStrictEqual(false);
    expect(detect('. .', Level.High)).toStrictEqual(false);
    expect(detect(',', Level.High)).toStrictEqual(false);
    expect(detect('', Level.High)).toStrictEqual(false);
  });

  test('whitelists substrings correctly', () => {
    expect(detect('g-spy', Level.High)).toStrictEqual(false);
    expect(detect('no u g-spy', Level.High)).toStrictEqual(false);
    expect(detect('this is a g-spy. g-spy says g. it wasnt very effective', Level.High)).toStrictEqual(true);
    expect(detect('this is a g-spy. he doesnt like hamburger', Level.High)).toStrictEqual(true);
  });
});
