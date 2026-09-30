/**
 * Career dates the site counts from. Values are computed at build time and
 * recomputed in the browser (see the inline script in Base.astro), so they stay
 * right between deploys.
 */
export const PRODUCT_SINCE = '2020-01';

/** Whole years from a "YYYY-MM" date until `now`. */
export function yearsSince(since: string, now = new Date()): number {
  const [year, month] = since.split('-').map(Number);
  let years = now.getFullYear() - year;
  if (now.getMonth() + 1 < month) years -= 1;
  return years;
}

const WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
];

/** "six" for 6; digits past twenty. Keep in sync with the inline script in Base.astro. */
export function inWords(n: number): string {
  return WORDS[n] ?? String(n);
}
