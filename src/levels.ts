import { blocklist } from './blocklist.js';

export function checkLow(content: string): boolean {
  if (!/[^\s]/u.test(content)) {
    return false;
  }

  return !RegExp(`[^\\s${blocklist}]`, 'iu').test(content);
}

export function checkMedium(content: string): boolean {
  return RegExp(`(?<=^|\\P{L})[${blocklist}]+(?=\\P{L}|$)`, 'iu').test(content) || checkLow(content);
}

export function checkHigh(content: string): boolean {
  return RegExp(`[${blocklist}]`, 'iu').test(content);
}
