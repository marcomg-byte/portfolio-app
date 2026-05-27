'use client';
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  JSX,
  KeyboardEvent,
  LiHTMLAttributes,
  MouseEvent,
  Ref,
} from 'react';
import Image from 'next/image';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@/components/ui';
import { useControlled } from '@/lib';

type ListItemAdornment = IconDefinition | { src: string; alt?: string };

type ListItemAdornmentColor =
  | 'accent'
  | 'black'
  | 'danger'
  | 'error'
  | 'info'
  | 'inverse'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'subtle'
  | 'warning'
  | 'white';

type ListItemStatus = 'success' | 'warning' | 'error' | 'info';

interface ListItemClasses {
  adornment?: string;
  button?: string;
  children?: string;
  container?: string;
  root?: string;
  label?: string;
  title?: string;
}

type ListItemColor =
  | 'accent'
  | 'black'
  | 'inverse'
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'white';

interface BaseProps {
  as?: 'a' | 'div' | 'li';
  adornment?: ListItemAdornment;
  adornmentColor?: ListItemAdornmentColor;
  classes?: ListItemClasses;
  color?: ListItemColor;
  defaultSelected?: boolean;
  disabled?: boolean;
  divider?: boolean;
  firstIndex?: boolean;
  href?: string;
  label?: string;
  lastIndex?: boolean;
  selectable?: boolean;
  status?: ListItemStatus;
  tabIndex?: number;
  title?: string;
  selected?: boolean;
  value?: string | number;
}

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLAnchorElement>) => void;
  ref?: Ref<HTMLAnchorElement>;
  role?: JSX.IntrinsicElements['a']['role'];
  target?: string;
}

interface DivProps extends HTMLAttributes<HTMLDivElement> {
  href?: never;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  ref?: Ref<HTMLDivElement>;
  role?: JSX.IntrinsicElements['div']['role'];
  target?: never;
}

interface LiProps extends LiHTMLAttributes<HTMLLIElement> {
  href?: never;
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void;
  ref?: Ref<HTMLLIElement>;
  role?: JSX.IntrinsicElements['li']['role'];
  target?: never;
}

type ListItemProps = (AnchorProps | DivProps | LiProps) & BaseProps;

const renderAdornment = (adornment: ListItemAdornment, className?: string) => {
  const imageClasses = twMerge(
    'mg:object-contain mg:animate-fade-in mg:duration-500',
    className,
  );

  if ('iconName' in adornment) {
    return <FontAwesomeIcon icon={adornment} className={className} />;
  }

  return (
    <Image
      src={adornment?.src || ''}
      alt={adornment?.alt || ''}
      width={40}
      height={40}
      className={imageClasses}
    />
  );
};

function ListItem(props: AnchorProps & BaseProps): JSX.Element;
function ListItem(props: DivProps & BaseProps): JSX.Element;
function ListItem(props: LiProps & BaseProps): JSX.Element;
function ListItem({
  as = 'li',
  adornment,
  adornmentColor = 'primary',
  disabled = false,
  defaultSelected,
  divider = false,
  classes = {},
  color = 'primary',
  firstIndex = false,
  href,
  label,
  lastIndex = false,
  onClick,
  ref,
  selectable = true,
  selected: selectedProp,
  status,
  tabIndex = 0,
  target,
  title,
  ...rest
}: ListItemProps) {
  const [selected, setSelected] = useControlled<boolean>({
    defaultValue: defaultSelected && selectable,
    value: selectedProp,
  });

  const adornmentClasses = classNames(
    'mg:text-base mg:p-1 mg:group-hover:text-accent',
    {
      'mg:text-accent': adornmentColor === 'accent' && !status,
      'mg:text-black': adornmentColor === 'black' && !status,
      'mg:text-inverse': adornmentColor === 'inverse' && !status,
      'mg:text-primary': adornmentColor === 'primary' && !status,
      'mg:text-secondary': adornmentColor === 'secondary' && !status,
      'mg:text-subtle': adornmentColor === 'subtle' && !status,
      'mg:text-white': adornmentColor === 'white' && !status,
      'mg:text-success': status === 'success' || adornmentColor === 'success',
      'mg:text-danger': status === 'error' || adornmentColor === 'danger',
      'mg:text-info': status === 'info' || adornmentColor === 'info',
      'mg:text-warning': status === 'warning' || adornmentColor === 'warning',
    },
    classes?.adornment,
  );

  const rootClasses = twMerge(
    classNames(
      'mg:flex mg:flex-col mg:items-center mg:w-full mg:transition-all',
      'mg:focus-visible:outline-1 mg:focus-visible:outline-offset-4 mg:focus-visible:outline-primary',
      {
        'mg:group mg:hover:cursor-pointer mg:duration-200': selectable,
        'mg:rounded-t-lg': firstIndex,
        'mg:bg-black/50': selected,
        'mg:opacity-80': disabled,
        'mg:rounded-b-lg': lastIndex,
        'mg:hover:scale-105 mg:hover:px-2 mg:duration-500': !selectable,
      },
    ),
    classes?.root,
  );

  const containerClasses = twMerge(
    classNames('mg:flex mg:items-center mg:w-full'),
    classes?.container,
  );

  const childrenClasses = twMerge(
    classNames('mg:flex mg:flex-col mg:grow mg:gap-2 mg:py-2 mg:pr-2'),
    classes?.children,
  );

  const labelClasses = twMerge(
    classNames('mg:group-hover:text-accent'),
    classes?.label,
  );

  const titleClasses = twMerge(
    classNames('mg:group-hover:text-accent'),
    classes?.title,
  );

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLLIElement>,
  ) => {
    if (onClick) {
      if ((as === 'a' || href) && onClick) {
        (onClick as AnchorProps['onClick'])!(
          event as MouseEvent<HTMLAnchorElement>,
        );
      } else if (as === 'div') {
        (onClick as DivProps['onClick'])!(event as MouseEvent<HTMLDivElement>);
      } else {
        (onClick as LiProps['onClick'])!(event as MouseEvent<HTMLLIElement>);
      }
    } else {
      setSelected(true);
    }
  };

  if (as === 'a' || href) {
    return (
      <a
        className={rootClasses}
        href={href}
        onClick={handleClick}
        ref={ref as Ref<HTMLAnchorElement>}
        tabIndex={selectable ? tabIndex : -1}
        target={target}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <div className={containerClasses}>
          {adornment && renderAdornment(adornment, adornmentClasses)}
          <div className={childrenClasses}>
            {title && (
              <Typography className={titleClasses} color={color} removePadding>
                {title}
              </Typography>
            )}
            {label && (
              <Typography className={labelClasses} color={color} removePadding>
                {label}
              </Typography>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (as === 'div') {
    return (
      <div
        className={rootClasses}
        tabIndex={selectable ? tabIndex : -1}
        onClick={handleClick}
        ref={ref as Ref<HTMLDivElement>}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      >
        <div className={containerClasses}>
          {adornment && renderAdornment(adornment, adornmentClasses)}
          <div className={childrenClasses}>
            {title && (
              <Typography className={titleClasses} color={color} removePadding>
                {title}
              </Typography>
            )}
            {label && (
              <Typography className={labelClasses} color={color} removePadding>
                {label}
              </Typography>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <li
      className={rootClasses}
      onClick={handleClick}
      ref={ref as Ref<HTMLLIElement>}
      tabIndex={selectable ? tabIndex : -1}
      {...(rest as LiHTMLAttributes<HTMLLIElement>)}
    >
      <div className={containerClasses}>
        {adornment && renderAdornment(adornment, adornmentClasses)}
        <div className={childrenClasses}>
          {title && (
            <Typography className={titleClasses} color={color} removePadding>
              {title}
            </Typography>
          )}
          {label && (
            <Typography className={labelClasses} color={color} removePadding>
              {label}
            </Typography>
          )}
        </div>
      </div>
      {divider && !lastIndex && (
        <div className="mg:w-9/10 mg:h-0 mg:border-solid mg:border-b-1 mg:border-b-primary" />
      )}
    </li>
  );
}

ListItem.displayName = 'List.ListItem';

export { ListItem };
