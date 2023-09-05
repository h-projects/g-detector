import allowlist from './allowlist.json';
import { checkHigh, checkLow, checkMedium } from './levels.js';

export enum Level {
  Low,
  Medium,
  High
}

export function detect(content: string, level: Level | 'low' | 'medium' | 'high'): boolean {
  let cleanContent = content.replaceAll(/[.,ᅟᅠㅤﾠ]/gu, '').toLowerCase();
  for (const word of allowlist) {
    cleanContent = cleanContent.replaceAll(RegExp(`(?<=^|\\P{L})${word}(?=\\P{L}|$)`, 'giu'), '');
  }

  switch (level) {
    case Level.Low:
    case 'low':
      return checkLow(cleanContent);
    case Level.Medium:
    case 'medium':
      return checkMedium(cleanContent);
    case Level.High:
    case 'high':
      return checkHigh(cleanContent);
  }
}
