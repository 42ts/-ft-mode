import { mode } from '@-ft/mode';
import { getCookie } from './getCookie';

// initialize mode manager with persistent settings if available
const modeManager = mode(getCookie('mode') ?? 'system');

// apply actual theme when theme is changed
modeManager.watchTheme((theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// save persistent theme settings when mode is changed
modeManager.watchMode((mode) => {
  document.cookie = 'mode=' + mode + '; path=/';
});

export { modeManager };
