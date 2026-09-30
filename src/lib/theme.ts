/**
 * Colour theme: "auto" follows the system, "light"/"dark" are the visitor's
 * explicit choice (stored in localStorage). The inline script in Base.astro
 * applies a stored choice before first paint; this module handles changes.
 */
export type ThemeChoice = 'auto' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

const KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#0f0f0e' };
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function getChoice(): ThemeChoice {
  const t = document.documentElement.dataset.theme;
  return t === 'light' || t === 'dark' ? t : 'auto';
}

export function getTheme(): Theme {
  const choice = getChoice();
  if (choice !== 'auto') return choice;
  return systemDark.matches ? 'dark' : 'light';
}

function syncThemeColor() {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[getTheme()]);
}

function apply(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === 'auto') delete root.dataset.theme;
  else root.dataset.theme = choice;
  try {
    if (choice === 'auto') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {
    // Private mode or storage blocked: the choice lasts for this page only.
  }
  syncThemeColor();
  document.dispatchEvent(new CustomEvent('themechange'));
}

/** Switch theme with a short crossfade where supported. */
export function setChoice(choice: ThemeChoice) {
  if (choice === getChoice()) return;
  if (!document.startViewTransition || reducedMotion.matches) {
    apply(choice);
    return;
  }
  document.startViewTransition(() => apply(choice));
}

/** Run `fn` now and whenever the effective theme or the choice changes. */
export function onThemeChange(fn: () => void) {
  fn();
  document.addEventListener('themechange', fn);
  systemDark.addEventListener('change', () => {
    if (getChoice() === 'auto') {
      syncThemeColor();
      fn();
    }
  });
}
