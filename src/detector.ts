import { allowlist } from './allowlist.ts';
import { checkHigh, checkLow, checkMedium } from './levels.ts';

export enum Level {
  Low,
  Medium,
  High
}

const SEPARATOR = /[.ᅟᅠㅤﾠ]/gu;
const ALLOWED_SENTENCES = RegExp(`(?<=^|\\P{L})(${allowlist.join('|')})(?=\\P{L}|$)`, 'giu');

export function detect(content: string, level: Level): boolean {
  const cleanContent = content.replaceAll(SEPARATOR, '').replaceAll(ALLOWED_SENTENCES, '');

  switch (level) {
    case Level.Low:
      return checkLow(cleanContent);
    case Level.Medium:
      return checkMedium(cleanContent);
    case Level.High:
      return checkHigh(cleanContent);
  }
}
