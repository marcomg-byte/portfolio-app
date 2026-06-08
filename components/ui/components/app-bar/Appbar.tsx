'use client';
import type { FC, HTMLAttributes, Ref } from 'react';
import { useState } from 'react';
import { Button, Drawer, IconButton } from '../../atomics';
import type {
  ButtonClasses,
  DrawerClasses,
  IconButtonClasses,
} from '../../atomics';
import { Button as ThemeButton } from '@/components/theme';
import { usePathname } from 'next/navigation';
import { useBreakpoints } from '@/lib';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

/**
 * Descriptor for one navigation item rendered by the app bar.
 */
interface AppbarButton {
  /** Optional link target such as `_blank`. */
  target?: string;
  /** Text shown on the button. */
  text: string;
  /** Visual variant for the navigation button. */
  variant?: 'primary' | 'secondary' | 'text' | 'outline';
  /** Destination href for the navigation button. */
  href: string;
}

/**
 * Class name overrides for the app bar sub-elements.
 */
interface AppbarClasses {
  /** Class overrides for the main button styling. */
  button?: ButtonClasses;
  /** Class overrides for the drawer container and content. */
  drawer?: DrawerClasses;
  /** Class overrides for the mobile icon button. */
  iconButton?: IconButtonClasses;
  /** Class applied to the root app bar container. */
  root?: string;
}

/**
 * Props for the Appbar component.
 *
 * Extends all standard HTML div attributes.
 *
 * @property {Ref<HTMLDivElement>} [ref] - Ref for the root div element.
 */
interface AppbarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'className'
> {
  /** Optional class name overrides for the internal app bar parts. */
  classes?: AppbarClasses;
  /** Navigation entries rendered by the app bar. */
  pages: AppbarButton[];
  /** Ref for the root div element. */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Responsive app bar with desktop navigation links, a mobile drawer menu,
 * and a theme toggle button.
 *
 * Highlights the current route, swaps the active page link to `Home`, and
 * collapses into a drawer on small screens.
 *
 * @param {AppbarProps} props - The props for the Appbar component.
 * @param {AppbarButton[]} props.pages - Navigation links to display in the app bar.
 * @param {AppbarClasses} [props.classes] - Optional class overrides for the app bar parts.
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
const Appbar: FC<AppbarProps> = ({ classes = {}, pages, ref, ...rest }) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { isBelow } = useBreakpoints();
  const isBelowSm = isBelow('sm');

  const rootClasses = twMerge(
    'mg:flex mg:items-center mg:gap-4 mg:py-3 mg:px-6 mg:bg-secondary mg:justify-between mg:sm:justify-end',
    classes?.root,
  );

  const buttonClasses: ButtonClasses = {
    adornment: classes?.button?.adornment,
    button: classNames('mg:rounded-none mg:px-6', classes?.button?.button),
  };

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
          <IconButton classes={classes?.iconButton} onClick={handleOpen}>
            {faBars}
          </IconButton>
        ) : (
          pages.map((page, index) => {
            const isCurrentPath = page.href === pathname;

            return (
              <Button
                key={`appbar-button-${index}`}
                classes={classes?.button}
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
            classes={classes?.drawer}
            onBackdropClick={handleBackdropClick}
            onClose={handleClose}
            open={open}
          >
            {pages.map((page, index) => {
              const isCurrentPath = page.href === pathname;

              return (
                <Button
                  classes={buttonClasses}
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
