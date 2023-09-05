# `mode` - Theme mode manager

Dark/light theme mode manager for web

## Usage

```ts
import { mode } from '@-ft/mode';

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
  document.cookie = 'mode=' + mode;
});
```
