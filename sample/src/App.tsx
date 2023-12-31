import { useCallback, useEffect, useState } from 'react';
import { modeManager } from './modeManager';

export function App() {
  const [theme, setTheme] = useState(modeManager.getTheme());
  useEffect(() => modeManager.watchTheme((theme) => setTheme(theme)));

  const [mode, setMode] = useState(modeManager.getMode());
  useEffect(() => modeManager.watchMode((mode) => setMode(mode)));

  const setLightMode = useCallback(() => {
    modeManager.setMode('light');
  }, []);
  const setDarkMode = useCallback(() => {
    modeManager.setMode('dark');
  }, []);
  const setSystemMode = useCallback(() => {
    modeManager.setMode('system');
  }, []);

  return (
    <>
      <p>current theme is {theme}</p>
      <p>current mode is {mode}</p>
      <button onClick={setLightMode}>set light mode</button>
      <button onClick={setDarkMode}>set dark mode</button>
      <button onClick={setSystemMode}>set system mode</button>
    </>
  );
}
