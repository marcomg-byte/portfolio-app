'use client';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  JSX,
  MouseEvent,
  ReactNode,
  Ref,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Supported adornments for the Button component: either a FontAwesome icon or an image.
 */
type Adornment = IconDefinition | ButtonImage;

/**
 * Image object for use as a button adornment.
 *
 * @property {string} [src] - Image source URL.
 * @property {string} [alt] - Alternative text for the image.
 */
interface ButtonImage {
  src?: string;
  alt?: string;
}

/**
 * Supported button types for the native button element.
 *
 * - 'button': Standard button (default)
 * - 'submit': Submits a form
 * - 'reset': Resets a form
 */
type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Visual style variants for the Button component.
 *
 * - 'primary': Main action button
 * - 'secondary': Secondary action button
 * - 'text': Text-only button
 * - 'outline': Outlined button
 */
type ButtonVariant = 'primary' | 'secondary' | 'text' | 'outline';

/**
 * Common props for the Button component, shared by both anchor and button variants.
 *
 * @property {ReactNode} [children] - Content to display inside the button.
 * @property {string} [className] - Additional CSS classes for the button.
 * @property {Adornment} [endAdornment] - Icon or image to display at the end of the button.
 * @property {'sm' | 'md' | 'lg'} [size] - Size of the button.
 * @property {Adornment} [startAdornment] - Icon or image to display at the start of the button.
 * @property {Ref<HTMLAnchorElement>} [ref] - Ref for the anchor or button element.
 * @property {ButtonVariant} [variant] - Visual style variant for the button.
 */
interface BaseProps {
  children?: ReactNode;
  className?: string;
  endAdornment?: Adornment;
  size?: 'sm' | 'md' | 'lg';
  startAdornment?: Adornment;
  ref?: Ref<HTMLAnchorElement>;
  variant?: ButtonVariant;
}

/**
 * Props for the anchor variant of the Button component.
 *
 * @property {ReactNode} [children] - The content of the anchor.
 * @property {string} href - The URL to link to (required for anchor usage).
 * @property {'sm' | 'md' | 'lg'} [size] - The size of the anchor button.
 * @property {never} [type] - Not allowed for anchor usage.
 * @property {(event: MouseEvent<HTMLAnchorElement>) => void} [onClick] - Click event handler for the anchor.
 * @property {Ref<HTMLAnchorElement>} [ref] - Ref for the anchor element.
 * @property {'primary' | 'secondary' | 'text' | 'outline'} [variant] - The visual style of the anchor button.
 */
interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  ref?: Ref<HTMLAnchorElement>;
  target?: string;
  type?: never;
}

/**
 * Props for the button variant of the Button component.
 *
 * @property {ReactNode} [children] - The content of the button.
 * @property {never} [href] - Not allowed for button usage.
 * @property {'sm' | 'md' | 'lg'} [size] - The size of the button.
 * @property {ButtonType} [type] - The button type attribute.
 * @property {(event: MouseEvent<HTMLButtonElement>) => void} [onClick] - Click event handler for the button.
 * @property {Ref<HTMLButtonElement>} [ref] - Ref for the button element.
 * @property {'primary' | 'secondary' | 'text' | 'outline'} [variant] - The visual style of the button.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  ref?: Ref<HTMLButtonElement>;
  target?: never;
  type?: ButtonType;
}

/**
 * Props for the Button component, supporting both anchor and button variants.
 * Combines common button props with either anchor-specific or button-specific props, allowing the component to render as a link or a button.
 * The component will determine which element to render based on the presence of the 'href' prop:
 * - If 'href' is provided, it renders as an anchor (<a>).
 * - If 'href' is not provided, it renders as a button (<button>).
 */
type ButtonComponentProps = (AnchorProps | ButtonProps) & BaseProps;

/**
 * Utility function to render a button adornment (icon or image).
 *
 * @param {Adornment} adornment - The adornment to render (FontAwesome icon or image object).
 * @returns {JSX.Element} The rendered icon or image element.
 */
const renderAdornment = (adornment: Adornment) => {
  if ('iconName' in adornment) {
    return <FontAwesomeIcon icon={adornment} className="mg:text-sm" />;
  }

  return (
    <Image
      alt={adornment.alt || ''}
      src={adornment.src || ''}
      width={16}
      height={16}
      className="mg-object-contain"
    />
  );
};

/**
 * Button component supporting both anchor (<a>) and button (<button>) variants.
 *
 * Renders a styled button or anchor element with optional start/end adornments (icon or image),
 * supporting multiple visual variants and sizes. The element type is determined by the presence of the 'href' prop:
 * - If 'href' is provided, renders an anchor (<a>).
 * - Otherwise, renders a native button (<button>).
 *
 * @param {ButtonComponentProps} props - Button or anchor props.
 * @returns {JSX.Element} The rendered button or anchor element.
 *
 * @example
 * ```tsx
 * import { Button } from '@/components/ui/atomics';
 * import { faCoffee } from '@fortawesome/free-solid-svg-icons';
 *
 * const MyButton = () => (
 *  <Button
 *    variant="primary"
 *    size="md"
 *    startAdornment={faCoffee}
 *  >
 *    Click Me
 *  </Button>
 * );
 * ```
 */
function Button(props: AnchorProps & BaseProps): JSX.Element;
function Button(props: ButtonProps & BaseProps): JSX.Element;
function Button({
  children,
  className,
  endAdornment,
  href,
  size = 'md',
  startAdornment,
  ref,
  target,
  type = 'button',
  variant = 'primary',
  onClick,
  ...rest
}: ButtonComponentProps): JSX.Element {
  const isStartAdornmentIcon = startAdornment && 'iconName' in startAdornment;
  const isEndAdornmentIcon = endAdornment && 'iconName' in endAdornment;
  const isStartAdornmentImage = startAdornment && 'src' in startAdornment;
  const isEndAdornmentImage = endAdornment && 'src' in endAdornment;

  const classes = classNames(
    'mg:inline-flex mg:items-center mg:justify-between mg:font-body mg:text-primary mg:hover:text-inverse mg:hover:cursor-pointer mg:min-w-20',
    {
      'mg:px-1.5 mg:py-1 mg:rounded-sm': size === 'sm',
      'mg:px-2.5 mg:py-2 mg:rounded': size === 'md',
      'mg:px-3.5 mg:py-3 mg:rounded-lg': size === 'lg',
      'mg:text-sm': size === 'sm' || size === 'md',
      'mg:text-base': size === 'lg',
      'mg:bg-primary mg:hover:bg-primary-hover': variant === 'primary',
      'mg:bg-secondary mg:hover:bg-secondary-hover': variant === 'secondary',
      'mg:bg-transparent mg:hover:border-solid mg:hover:border-1 mg:hover:border-accent':
        variant === 'text',
      'mg:border-solid mg:border-1 mg:border-primary mg:hover:border-primary-hover':
        variant === 'outline',
      'mg:gap-2': (isStartAdornmentIcon || isEndAdornmentIcon) && children,
      'mg:gap-1': (isStartAdornmentImage || isEndAdornmentImage) && children,
    },
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={classes}
        href={href}
        onClick={onClick as (event: MouseEvent<HTMLAnchorElement>) => void}
        target={target}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {startAdornment && renderAdornment(startAdornment)}
        {children}
        {endAdornment && renderAdornment(endAdornment)}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      className={classes}
      type={type}
      onClick={onClick as (event: MouseEvent<HTMLButtonElement>) => void}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {startAdornment && renderAdornment(startAdornment)}
      {children}
      {endAdornment && renderAdornment(endAdornment)}
    </button>
  );
}

Button.displayName = 'Button';

export { Button };
export type { Adornment, ButtonVariant };
