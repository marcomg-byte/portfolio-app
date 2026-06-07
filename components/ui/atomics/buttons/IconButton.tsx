import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
  JSX,
  MouseEvent,
  ReactElement,
  Ref,
} from 'react';
import { cloneElement, isValidElement } from 'react';
import Image from 'next/image';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type IconButtonChildren = IconDefinition | ReactElement;

interface IconButtonClasses {
  children?: string;
  iconButton?: string;
}

/**
 * Color options for the IconButton component.
 *
 * - 'primary': Primary color style
 * - 'secondary': Secondary color style
 * - 'accent': Accent color style
 */
type IconButtonColor = 'primary' | 'secondary' | 'accent';

/**
 * Size options for the IconButton component.
 *
 * - 'sm': Small
 * - 'md': Medium
 * - 'lg': Large
 */
type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Visual style variants for the IconButton component.
 *
 * - 'outline': Bordered, transparent background
 * - 'filled': Solid background
 */
type IconButtonVariant = 'outline' | 'filled';

type ImageComponent = ReactElement<ComponentProps<typeof Image>>;

interface BaseProps {
  children?: IconButtonChildren;
  classes?: IconButtonClasses;
  color?: IconButtonColor;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
}

/**
 * Props for the anchor variant of the IconButton component.
 *
 * @property {IconDefinition} [children] - The icon to display inside the anchor.
 * @property {string} [className] - Additional CSS classes for the anchor.
 * @property {IconButtonColor} [color] - The color style of the anchor.
 * @property {string} href - The URL to link to (required for anchor usage).
 * @property {IconButtonSize} [size] - The size of the anchor button.
 * @property {(event: MouseEvent<HTMLAnchorElement>) => void} [onClick] - Click event handler for the anchor.
 * @property {Ref<HTMLAnchorElement>} [ref] - Ref for the anchor element.
 * @property {IconButtonVariant} [variant] - The visual style of the anchor button.
 * @property {(event: MouseEvent<HTMLAnchorElement>) => void} [onClick] - Click event handler for the anchor.
 * @property {Ref<HTMLAnchorElement>} [ref] - Ref for the anchor element.
 * @property {IconButtonVariant} [variant] - The visual style of the anchor button.
 */
interface AnchorProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'className'
> {
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  ref?: Ref<HTMLAnchorElement>;
  target?: string;
}

/**
 * Props for the button variant of the IconButton component.
 *
 * @property {IconDefinition} [children] - The icon to display inside the button.
 * @property {string} [className] - Additional CSS classes for the button.
 * @property {IconButtonColor} [color] - The color style of the button.
 * @property {never} [href] - Not allowed for button usage.
 * @property {IconButtonSize} [size] - The size of the button.
 * @property {(event: MouseEvent<HTMLButtonElement>) => void} [onClick] - Click event handler for the button.
 * @property {Ref<HTMLButtonElement>} [ref] - Ref for the button element.
 * @property {IconButtonVariant} [variant] - The visual style of the button.
 */
interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className'
> {
  href?: never;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  ref?: Ref<HTMLButtonElement>;
  target?: never;
}

type IconButtonProps = (AnchorProps | ButtonProps) & BaseProps;

const renderChildren = (children: IconButtonChildren, className?: string) => {
  const imageClasses = twMerge(
    'mg:object-cover mg:animate-fade-in mg:duration-500',
    className,
  );

  if ('iconName' in children) {
    return (
      <FontAwesomeIcon
        key={children.iconName}
        className={className}
        icon={children}
      />
    );
  }

  if (isValidElement(children) && children.type === Image) {
    const imageProps = children.props as ImageComponent['props'];
    return cloneElement(children as ImageComponent, {
      src: imageProps.src || '',
      alt: imageProps.alt || '',
      width: 24,
      height: 24,
      className: imageClasses,
    });
  }

  return children;
};

/**
 * IconButton component.
 *
 * Renders a styled button or anchor containing a FontAwesome icon, supporting different sizes, variants, and color styles.
 * The element type is determined by the presence of the 'href' prop:
 * - If 'href' is provided, renders an anchor (<a>).
 * - Otherwise, renders a native button (<button>).
 *
 * @param {AnchorProps | ButtonProps} props - Props for the anchor or button variant.
 * @returns {JSX.Element} The rendered icon button element.
 *
 * @example
 * ```tsx
 * import { IconButton } from '@/components/ui/atomics';
 * import { faCoffee } from '@fortawesome/free-solid-svg-icons';
 *
 * const MyIconButton = () => (
 *  <IconButton
 *    color="primary"
 *    size="md"
 *    variant="outline"
 *    onClick={() => alert('Icon button clicked!')}
 *  >
 *    faCoffee
 *  </IconButton>
 * );
 * ```
 */
function IconButton(props: AnchorProps & BaseProps): JSX.Element;
function IconButton(props: ButtonProps & BaseProps): JSX.Element;
function IconButton({
  children,
  classes = {},
  color = 'primary',
  href,
  size = 'sm',
  onClick,
  variant = 'outline',
  ...rest
}: IconButtonProps): JSX.Element {
  const containerClasses = classNames(
    'mg:flex mg:items-center mg:justify-center mg:rounded-lg mg:font-body mg:p-1 mg:min-h-2 mg:min-w-2 mg:hover:cursor-pointer',
    'mg:focus-visible:outline-1 mg:focus-visible:outline-offset-4 mg:focus-visible:outline-primary',
    {
      'mg:text-sm': size === 'sm',
      'mg:text-base': size === 'md',
      'mg:text-lg': size === 'lg',
    },
  );

  const outlineClasses =
    variant === 'outline'
      ? classNames(
          'mg:border-solid mg:border-1 mg:hover:border-accent mg:bg-transparent mg:text-primary',
          {
            'mg:text-primary mg:border-primary': color === 'primary',
            'mg:text-secondary mg:border-secondary': color === 'secondary',
            'mg:text-accent mg:border-accent': color === 'accent',
          },
        )
      : '';

  const filledClasses =
    variant === 'filled'
      ? classNames('mg:text-primary mg:hover:text-inverse', {
          'mg:bg-primary mg:hover:bg-primary-hover': color === 'primary',
          'mg:bg-secondary mg:hover:bg-secondary-hover': color === 'secondary',
          'mg:bg-accent mg:hover:bg-accent-hover': color === 'accent',
        })
      : '';

  const iconButtonClasses = twMerge(
    classNames(containerClasses, outlineClasses, filledClasses),
    classes?.iconButton,
  );

  if (href) {
    return (
      <a
        className={iconButtonClasses}
        href={href}
        onClick={onClick as (event: MouseEvent<HTMLAnchorElement>) => void}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children && renderChildren(children, classes?.children)}
      </a>
    );
  }

  return (
    <button
      className={iconButtonClasses}
      onClick={onClick as (event: MouseEvent<HTMLButtonElement>) => void}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children && renderChildren(children, classes?.children)}
    </button>
  );
}

IconButton.displayName = 'IconButton';

export { IconButton };
export type { IconButtonClasses, IconButtonVariant };
