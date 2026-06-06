'use client';
import type { FC, HTMLAttributes, Ref } from 'react';
import { useState } from 'react';
import { Button, Drawer, IconButton } from '../../atomics';
import { Button as ThemeButton } from '@/components/theme';
import { usePathname } from 'next/navigation';
import { useBreakpoints } from '@/lib';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

interface AppbarButton {
  target?: string;
  text: string;
  variant?: 'primary' | 'secondary' | 'text' | 'outline';
  href: string;
}

/**
 * Props for the Appbar component.
 *
 * Extends all standard HTML div attributes.
 *
 * @property {Ref<HTMLDivElement>} [ref] - Ref for the root div element.
 */
interface AppbarProps extends HTMLAttributes<HTMLDivElement> {
  pages: AppbarButton[];
  ref?: Ref<HTMLDivElement>;
}

/**
 * Appbar component.
 *
 * Renders a horizontal navigation bar with a set of page links and a theme toggle button.
 * Accepts all standard HTML div attributes via props.
 * Highlights the current page based on the URL path and provides a link to the home page when on a different page.
 *
 * @param {AppbarProps} props - The props for the Appbar component.
 * @param {Array<{text: string, variant?: 'primary' | 'secondary' | 'text' | 'outline', href: string}>} props.pages - Navigation links to display in the app bar. Each page includes the button text, an optional variant, and the link href.
 * @param {Ref<HTMLDivElement>} [props.ref] - Ref for the root div element.
 * @returns {JSX.Element} The rendered app bar.
 *
 * @example
 * ```tsx
 * import { Appbar } from '@/components/app-bar/Appbar';
 *
 * const MyComponent = () => (
 *   <Appbar
 *     pages={[
 *       { text: 'Home', href: '/', variant: 'primary' },
 *       { text: 'About', href: '/about', variant: 'secondary' },
 *     ]}
 *   />
 * );
 * ```
 *
 * @see Button
 * @see ThemeButton
 */
const Appbar: FC<AppbarProps> = ({ pages, ref, ...rest }) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { isBelow } = useBreakpoints();
  const isBelowSm = isBelow('sm');

  const rootClasses = classNames(
    'mg:flex mg:items-center mg:gap-4 mg:py-3 mg:px-6 mg:bg-secondary',
    {
      'mg:justify-end': !isBelowSm,
      'mg:justify-between': isBelowSm,
    },
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackdropClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={rootClasses} ref={ref} {...rest}>
        {isBelowSm ? (
          <IconButton onClick={handleOpen}>{faBars}</IconButton>
        ) : (
          pages.map((page, index) => {
            const isCurrentPath = page.href === pathname;

            return (
              <Button
                key={`appbar-button-${index}`}
                variant={page.variant || 'text'}
                href={isCurrentPath ? '/' : page.href}
                target={page?.target}
              >
                {isCurrentPath ? 'Home' : page.text}
              </Button>
            );
          })
        )}
        <ThemeButton />
        {isBelowSm && open && (
          <Drawer
            onBackdropClick={handleBackdropClick}
            onClose={handleClose}
            open={open}
          >
            {pages.map((page, index) => {
              const isCurrentPath = page.href === pathname;

              return (
                <Button
                  classes={{ button: 'mg:rounded-none mg:px-6' }}
                  href={isCurrentPath ? '/' : page.href}
                  key={`appbar-button-${index + 1}`}
                  target={page?.target}
                  variant="text"
                >
                  {isCurrentPath ? 'Home' : page.text}
                </Button>
              );
            })}
          </Drawer>
        )}
      </div>
    </>
  );
};

Appbar.displayName = 'Appbar';

export { Appbar };
