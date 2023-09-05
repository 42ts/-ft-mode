type Theme = 'light' | 'dark';
type Mode = Theme | 'system';

interface ModeManager {
  mode: Mode;
  watchMode(handler: (mode: Mode) => void): () => void;
  readonly theme: Theme;
  watchTheme(handler: (theme: Theme) => void): () => void;
}

export function mode(initialMode: string): ModeManager {
  let currentTheme: Theme = 'light';
  const themeWatchers: ((theme: Theme) => void)[] = [];
  function setTheme(theme: Theme): void {
    currentTheme = theme;
    themeWatchers.forEach((watcher) => watcher(theme));
  }
  function watchTheme(watcher: (typeof themeWatchers)[number]) {
    const wrapped: typeof watcher = (mode) => watcher(mode);
    wrapped(currentTheme);
    themeWatchers.push(wrapped);
    return () => {
      const index = themeWatchers.indexOf(wrapped);
      if (index !== -1) {
        themeWatchers.splice(index, 1);
      }
    };
  }

  function modeWatcher() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const eventListener = (e: MediaQueryListEvent) => {
      const theme = e.matches ? 'dark' : 'light';
      setTheme(theme);
    };
    let mediaQueryListener: typeof eventListener | undefined;
    return (mode: Mode) => {
      if (mediaQueryListener) {
        mediaQuery.removeEventListener('change', mediaQueryListener);
        mediaQueryListener = undefined;
      }
      if (mode === 'system') {
        mediaQueryListener = eventListener;
        mediaQuery.addEventListener('change', mediaQueryListener);
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(newTheme);
      } else {
        setTheme(mode);
      }
    };
  }

  let currentMode: Mode = 'light';
  const modeWatchers: ((mode: Mode) => void)[] = [modeWatcher()];
  function setMode(mode: Mode) {
    currentMode = mode;
    modeWatchers.forEach((listener) => listener(mode));
  }
  function watchMode(watcher: (typeof modeWatchers)[number]) {
    const wrapped: typeof watcher = (mode) => watcher(mode);
    wrapped(currentMode);
    modeWatchers.push(wrapped);
    return () => {
      const index = modeWatchers.indexOf(wrapped);
      if (index !== -1) {
        modeWatchers.splice(index, 1);
      }
    };
  }

  function sanitizeMode(mode: string): Mode {
    return mode === 'light' || mode === 'dark' ? mode : 'system';
  }

  setMode(sanitizeMode(initialMode));

  return {
    get mode() {
      return currentMode;
    },
    set mode(mode: Mode) {
      setMode(sanitizeMode(mode));
    },
    watchMode,
    get theme() {
      return currentTheme;
    },
    watchTheme,
  };
}
