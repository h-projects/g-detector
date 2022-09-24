import blocklist from './blocklist.json' assert { type: 'json' };

const boundaries = '[\\s!-/:-@[-`{-¿ -⁯]';

export function checkLow(content: string): boolean {
  if (!/[^\s]/u.test(content)) {
    return false;
  }

  return !RegExp(`[^\\s${blocklist}]`, 'iu').test(content);
}

export function checkMedium(content: string): boolean {
  return RegExp(`(?<=${boundaries}|^)[${blocklist}]+(?=${boundaries}|$)`, 'iu').test(content) || checkLow(content);
}

export function checkHigh(content: string): boolean {
  return RegExp(`[${blocklist}]`, 'iu').test(content);
}
