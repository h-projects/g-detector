import { equal } from 'node:assert/strict';
import { describe, test } from 'node:test';
import { detect, Level } from '../src/index.ts';

function assertDetects(content: string, level: Level, expected: boolean) {
  return equal(detect(content, level), expected, `Expected "${content}" to ${expected ? 'get' : 'not get'} detected`);
}

describe('low detector', () => {
  test('returns true on a g-only string', () => {
    assertDetects('g', Level.Low, true);
    assertDetects('gggggggg g', Level.Low, true);
    assertDetects('g⅁ 🅶🅶🅶', Level.Low, true);
    assertDetects('🅶🅖🄶🄖ｇＧꬶꞬꞡꞠℊḡḠᶢᶃᵹᵷᵍᴳʛǵǤ⅁ĜĝĞğɢɡɠƓģĢġĠgG⒢', Level.Low, true);
  });

  test('returns false on a non-g string', () => {
    assertDetects('g-g', Level.Low, false);
    assertDetects('greetings', Level.Low, false);
    assertDetects('i think g is a letter', Level.Low, false);
    assertDetects('the letter g', Level.Low, false);
    assertDetects('i love the letter h', Level.Low, false);
    assertDetects('. .', Level.Low, false);
    assertDetects(',', Level.Low, false);
    assertDetects('', Level.Low, false);
  });
});

describe('medium detector', () => {
  test('returns true on a string that has standalone g', () => {
    assertDetects('g', Level.Medium, true);
    assertDetects('g-g', Level.Medium, true);
    assertDetects('g_eometry dash', Level.Medium, true);
    assertDetects('weird unicode space characters: ᅟg ᅠg ㅤg ﾠg', Level.Medium, true);
    assertDetects('I AM A SPY. I LOVE G!!!', Level.Medium, true);
    assertDetects('the letter g tho', Level.Medium, true);
    assertDetects('g!asbot', Level.Medium, true);
  });

  test('returns false on a non-g string', () => {
    assertDetects('greetings', Level.Medium, false);
    assertDetects('hamburger', Level.Medium, false);
    assertDetects('pogging', Level.Medium, false);
    assertDetects('. .', Level.Medium, false);
    assertDetects(',', Level.Medium, false);
    assertDetects('', Level.Medium, false);
  });

  test('whitelists substrings correctly', () => {
    assertDetects('g-spy', Level.Medium, false);
    assertDetects('no u g-spy', Level.Medium, false);
    assertDetects('this is a g-spy. g-spy says g. it wasnt very effective', Level.Medium, true);
  });
});

describe('high detector', () => {
  test('returns true on strings containing g', () => {
    assertDetects('gg', Level.High, true);
    assertDetects('gregory', Level.High, true);
    assertDetects('germany', Level.High, true);
    assertDetects('qwertyuiopasdf🇬h', Level.High, true);
  });

  test('returns false on strings not containing g', () => {
    assertDetects('HIIIIIIIIIIIIIIIIIIIIII', Level.High, false);
    assertDetects('the real', Level.High, false);
    assertDetects('. .', Level.High, false);
    assertDetects(',', Level.High, false);
    assertDetects('', Level.High, false);
  });

  test('whitelists substrings correctly', () => {
    assertDetects('g-spy', Level.High, false);
    assertDetects('no u g-spy', Level.High, false);
    assertDetects('this is a g-spy. g-spy says g. it wasnt very effective', Level.High, true);
    assertDetects('this is a g-spy. he doesnt like hamburger', Level.High, true);
  });
});
