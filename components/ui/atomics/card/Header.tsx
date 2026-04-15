import type {
  ComponentProps,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { cloneElement, isValidElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '../badge';
import { Typography } from '../typography';

/**
 * Props for the Card Header component.
 *
 * @property {ReactElement<ComponentProps<typeof Badge>>} [badge] - Optional badge element to display.
 * @property {IconDefinition} [icon] - Optional FontAwesome icon to display.
 * @property {Ref<HTMLDivElement>} [ref] - Ref for the header div.
 * @property {ReactNode} [subtitle] - Optional subtitle content.
 * @property {string} title - Main title text (required).
 */
interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  badge?: ReactElement<ComponentProps<typeof Badge>>;
  icon?: IconDefinition;
  ref?: Ref<HTMLDivElement>;
  subtitle?: ReactNode;
  title: string;
}

/**
 * @constant clonedBadge - Utility to clone a Badge element with animation and size props for consistent display in the header.
 * The function checks if the provided badge is a valid React element, and if so, it clones it with additional props for animation and size. If the badge is not valid, it returns the original badge without modification.
 *
 * @param {ReactElement<ComponentProps<typeof Badge>>} badge - The Badge element to clone and enhance.
 * @returns {ReactElement} The cloned Badge element with additional props, or the original if not valid.
 */
const clonedBadge = (badge: ReactElement<ComponentProps<typeof Badge>>) => {
  if (isValidElement(badge)) {
    return cloneElement(badge, {
      className: 'mg:animate-fade-in',
      size: 'xs',
      style: { animationDuration: '2s' },
    });
  }
  return badge;
};

/**
 * Card Header component for displaying a title, optional icon, badge, and subtitle.
 *
 * @param {HeaderProps} props - Props for configuring the header content and appearance.
 * @returns {JSX.Element} The rendered card header.
 *
 * @example
 * ```tsx
 * import { Header } from '@/components/ui/atomics';
 * import { faStar } from '@fortawesome/free-solid-svg-icons';
 *
 * const MyCardHeader = () => (
 *  <Header
 *    title="Card Title"
 *    subtitle="This is a subtitle for the card header."
 *    icon={faStar}
 *  />
 * );
 * ```
 */
const Header: FC<HeaderProps> = ({
  badge,
  icon,
  ref,
  subtitle,
  title,
  ...rest
}) => {
  return (
    <div
      className="mg:flex mg:flex-col mg:gap-1 mg:px-3 mg:py-2"
      ref={ref}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      <div className="mg:flex mg:items-center mg:justify-between">
        {icon && <FontAwesomeIcon icon={icon} className="mg:text-sm" />}
        <Typography bold className="mg:text-base" variant="h2">
          {title}
        </Typography>
        {badge && clonedBadge(badge)}
      </div>
      {subtitle && (
        <Typography clamp={5} variant="small">
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

Header.displayName = 'Card.Header';

export { Header };
