import type { JSX, MouseEvent } from 'react';
import { Select } from '@/components/ui';
import { useTheme, THEME_MODES, THEME_OPTIONS } from '@/lib';
import type { ThemeMode } from '@/lib';

/**
 * Theme mode selector component.
 *
 * Renders a Select dropdown for choosing the application theme mode (system, light, dark).
 * Integrates with the useTheme hook to update and reflect the current mode.
 *
 * @returns {JSX.Element} The theme selector dropdown component.
 * @example
 * ```tsx
 * import { Selector } from '@/components/theme/Selector';
 *
 * function App() {
 *  return (
 *     <div>
 *      <Selector />
 *    </div>
 * );
 * ```
 */
const Selector = (): JSX.Element => {
  const { mode, setMode } = useTheme();

  const handleChange = (event: MouseEvent<HTMLLIElement>) => {
    const newValue = event.currentTarget.getAttribute('data-value');
    if (newValue && THEME_MODES.includes(newValue as ThemeMode)) {
      setMode(newValue as ThemeMode);
    }
  };

  return (
    <Select
      label="Theme"
      options={THEME_OPTIONS}
      value={mode}
      onChange={handleChange}
    />
  );
};

export { Selector };
