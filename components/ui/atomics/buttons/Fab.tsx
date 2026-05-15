import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  JSX,
  MouseEvent,
  ReactNode,
  Ref,
} from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import classNames from 'classnames';

type FabAdornment = IconDefinition | FabImage;

type FabColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

type FabImage = { alt?: string; src: string };

type FabVariant = 'circular' | 'extended';

interface BaseProps {
  children?: ReactNode;
  className?: string;
  color?: FabColor;
  endAdornment?: FabAdornment;
  size?: 'sm' | 'md' | 'lg';
  startAdornment?: FabAdornment;
  variant?: FabVariant;
}

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  ref?: Ref<HTMLAnchorElement>;
  target?: string;
  type?: never;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  ref?: Ref<HTMLButtonElement>;
  target?: never;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

type FabProps = (AnchorProps | ButtonProps) & BaseProps;

const renderAdornment = (adornment: FabAdornment) => {
  if ('iconName' in adornment) {
    return <FontAwesomeIcon className="mg:text-xs" icon={adornment} />;
  }

  return (
    <Image
      alt={adornment.alt || ''}
      className="mg:object-contain"
      height={16}
      src={adornment.src || ''}
      width={16}
    />
  );
};

function Fab(props: AnchorProps & BaseProps): JSX.Element;
function Fab(props: ButtonProps & BaseProps): JSX.Element;
function Fab({
  children,
  className,
  color = 'primary',
  endAdornment,
  href,
  onClick,
  target,
  type,
  ref,
  size = 'md',
  startAdornment,
  variant = 'circular',
  ...rest
}: FabProps): JSX.Element {
  const circularClasses =
    variant === 'circular'
      ? classNames('mg:rounded-full', {
          'mg:h-4 mg:w-4': size === 'sm',
          'mg:h-6 mg:w-6': size === 'md',
          'mg:h-8 mg:w-8': size === 'lg',
        })
      : '';
  const extendedClasses =
    variant === 'extended'
      ? classNames('mg:rounded-lg', {
          'mg:w-4 mg:h-2': size === 'sm',
          'mg:w-5 mg:h-3': size === 'md',
          'mg:w-6 mg:h-4': size === 'lg',
        })
      : '';
  const classes = classNames(
    'mg:inline-flex mg:items-center mg:justify-center mg:border-solid mg:border-1 mg:hover:cursor-pointer',
    {
      'mg:border-primary mg:hover:border-primary-hover mg:text-primary mg:hover:text-primary-hover':
        color === 'primary',
      'mg:border-secondary mg:hover:border-secondary-hover mg:text-secondary mg:hover:text-secondary-hover':
        color === 'secondary',
      'mg:border-accent mg:hover:border-accent-hover mg:text-accent mg:hover:text-accent-hover':
        color === 'accent',
      'mg:border-error mg:hover:border-error-hover mg:text-danger mg:hover:text-danger-hover':
        color === 'error',
      'mg:border-info mg:hover:border-info-hover mg:text-info mg:hover:text-info-hover':
        color === 'info',
      'mg:border-success mg:hover:border-success-hover mg:text-success mg:hover:text-success-hover':
        color === 'success',
      'mg:border-warning mg:hover:border-warning-hover mg:text-warning mg:hover:text-warning-hover':
        color === 'warning',
    },
    circularClasses,
    extendedClasses,
    className,
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick as (event: MouseEvent<HTMLAnchorElement>) => void}
        target={target}
        ref={ref as Ref<HTMLAnchorElement>}
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
      className={classes}
      onClick={onClick as (event: MouseEvent<HTMLButtonElement>) => void}
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {startAdornment && renderAdornment(startAdornment)}
      {children}
      {endAdornment && renderAdornment(endAdornment)}
    </button>
  );
}

Fab.displayName = 'Fab';

export { Fab };
