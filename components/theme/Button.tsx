import type { JSX } from 'react';
import { IconButton } from '@/components/ui';
import { useTheme } from '@/lib';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

/**
 * Theme toggle button component.
 *
 * Renders an IconButton that toggles between light and dark theme modes.
 * Displays a moon icon for light mode and a sun icon for dark mode.
 *
 * @returns {JSX.Element} The theme toggle button.
 * @example
 * ```tsx
 * import { Button } from '@/components/theme/Button';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Button />
 *     </div>
 *   );
 * }
 * ```
 */
const Button = (): JSX.Element => {
  const { mode, setMode } = useTheme();

  const handleToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={handleToggle}>
      {mode === 'light' ? faMoon : faSun}
    </IconButton>
  );
};

export { Button };
