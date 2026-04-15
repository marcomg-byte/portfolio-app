'use client';
import type { FC, HTMLAttributes, Ref } from 'react';
import { Button } from '../../atomics';
import { Button as ThemeButton } from '@/components/theme';
import { usePathname } from 'next/navigation';

/**
 * Props for the Appbar component.
 *
 * Extends all standard HTML div attributes.
 *
 * @property {Array<{text: string, variant?: 'primary' | 'secondary' | 'text' | 'outline', href: string}>} pages - Navigation links to display in the app bar. Each page includes the button text, an optional variant, and the link href.
 * @property {Ref<HTMLDivElement>} [ref] - Ref for the root div element.
 */
interface AppbarProps extends HTMLAttributes<HTMLDivElement> {
  pages: {
    text: string;
    variant?: 'primary' | 'secondary' | 'text' | 'outline';
    href: string;
  }[];
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
  const pathname = usePathname();

  return (
    <div
      className="mg:flex mg:items-center mg:justify-end mg:gap-4 mg:py-3 mg:px-6 mg:bg-secondary"
      ref={ref}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {pages.map((page, index) => {
        const isCurrentPath = page.href === pathname;

        return (
          <Button
            key={`appbar-button-${index}`}
            variant={page.variant || 'text'}
            href={isCurrentPath ? '/' : page.href}
          >
            {isCurrentPath ? 'Home' : page.text}
          </Button>
        );
      })}
      <ThemeButton />
    </div>
  );
};

Appbar.displayName = 'Appbar';

export { Appbar };
