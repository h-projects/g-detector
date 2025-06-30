import { blocklist } from './blocklist.ts';

const NOT_WHITESPACE = /[^\s]/u;
const NOT_G = RegExp(`[^\\s${blocklist}]`, 'iu');
export function checkLow(content: string): boolean {
  if (!NOT_WHITESPACE.test(content)) {
    return false;
  }

  return !NOT_G.test(content);
}

const MEDIUM = RegExp(`(?<=^|\\P{L})[${blocklist}]+(?=\\P{L}|$)`, 'iu');
export function checkMedium(content: string): boolean {
  return MEDIUM.test(content) || checkLow(content);
}

const HIGH = RegExp(`[${blocklist}]`, 'iu');
export function checkHigh(content: string): boolean {
  return HIGH.test(content);
}
