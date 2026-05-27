'use client';
import type {
  ComponentProps,
  JSX,
  HTMLAttributes,
  OlHTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { useControlled } from '@/lib';
import { ListItem as ListItemComponent } from './ListItem';

type ElementWithChildren = ReactElement<{ children?: ReactNode }>;

type ListAdornmentColor =
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

type ListStatus = 'error' | 'info' | 'success' | 'warning';

type ListBackground = 'primary' | 'secondary' | 'subtle' | 'inverse';

type ListColor =
  | 'accent'
  | 'black'
  | 'inverse'
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'white';

interface ListItem {
  key?: string;
  label?: string;
  selected?: boolean;
  value?: string | number;
}

type Item = Omit<ListItem, 'selected'>;

type ListItemElement = ReactElement<ComponentProps<typeof ListItemComponent>>;

type ListItemProps = ComponentProps<typeof ListItemComponent>;

interface BaseProps {
  as?: 'ul' | 'ol' | 'div';
  adornmentColor?: ListAdornmentColor;
  background?: ListBackground;
  children?: ReactNode;
  className?: string;
  color?: ListColor;
  compact?: boolean;
  divider?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  itemsAs?: 'a' | 'div' | 'li';
  onChange?: (selectedItems: Item[]) => void;
  selectable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: ListStatus;
  value?: ListItem[];
}

interface DivProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  ref?: Ref<HTMLDivElement>;
  role?: JSX.IntrinsicElements['div']['role'];
}

interface OlProps extends Omit<OlHTMLAttributes<HTMLOListElement>, 'onChange'> {
  ref?: Ref<HTMLOListElement>;
  role?: JSX.IntrinsicElements['ol']['role'];
}

interface UlProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  ref?: Ref<HTMLUListElement>;
  role?: JSX.IntrinsicElements['ul']['role'];
}

type ListProps = (DivProps | OlProps | UlProps) & BaseProps;

function List(props: DivProps & BaseProps): JSX.Element;
function List(props: OlProps & BaseProps): JSX.Element;
function List(props: UlProps & BaseProps): JSX.Element;
function List({
  as = 'ul',
  adornmentColor,
  background = 'primary',
  children,
  className,
  color,
  divider = false,
  disabled = false,
  fullWidth = false,
  itemsAs,
  onChange,
  ref,
  selectable = true,
  size = 'md',
  status,
  value: valueProp,
  ...rest
}: ListProps) {
  const mapState = (children: ReactNode): ListItem[] => {
    let counter = 0;
    const results: ListItem[] = [];

    const walk = (node?: ReactNode) => {
      Children.forEach(node, (child) => {
        if (!isValidElement(child)) return;

        if (isValidElement(child) && child.type === ListItemComponent) {
          counter++;
          const key = `list-item-${counter}`;
          const props = child.props as ListItemProps;
          results.push({
            key,
            label: props?.label || '',
            selected:
              (props?.selected || props?.defaultSelected || false) &&
              selectable,
            value: props?.value,
          });
        }

        if (
          isValidElement(child) &&
          (child as ElementWithChildren).props?.children
        ) {
          walk((child as ElementWithChildren).props.children);
        }
      });
    };

    walk(children);
    return results;
  };

  const initialState: ListItem[] = selectable ? mapState(children) : [];
  const controlledInitialState: Item[] = initialState
    .filter((item) => item?.selected)
    .map((item) => ({
      key: item?.key,
      label: item?.label,
      value: item?.value,
    }));
  const [items, setItems] = useState<ListItem[]>(initialState);
  const [, setValue] = useControlled<Item[]>({
    defaultValue: controlledInitialState,
    value: valueProp,
  });
  const controlledValue = useMemo<Item[]>(
    () =>
      items
        .filter((item) => item.selected)
        .map((item) => ({
          key: item?.key,
          label: item?.label,
          value: item?.value,
        })),
    [items],
  );

  const classes = twMerge(
    classNames('mg:flex mg:flex-col mg:rounded-lg', {
      'mg:bg-inverse': background === 'inverse',
      'mg:bg-primary': background === 'primary',
      'mg:bg-secondary': background === 'secondary',
      'mg:bg-subtle': background === 'subtle',
      'mg:w-full': fullWidth,
      'mg:w-24': size === 'sm' && !fullWidth,
      'mg:w-32': size === 'md' && !fullWidth,
      'mg:w-40': size === 'lg' && !fullWidth,
    }),
    className,
  );

  const handleClick = (key: string) => {
    if (selectable) {
      const newItemsState = items.map((item) => {
        if (item.key === key) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
      setItems(newItemsState);
    }
  };

  const renderChildren = (children: ReactNode) => {
    let counter = 0;
    const results: ListItemElement[] = [];

    const walk = (node?: ReactNode) => {
      const nodeArray = Children.toArray(node);
      nodeArray.forEach((child) => {
        if (!isValidElement(child)) return;

        if (isValidElement(child) && child.type === ListItemComponent) {
          counter++;
          const key = `list-item-${counter}`;
          results.push(
            cloneElement(child as ListItemElement, {
              key,
              as: itemsAs,
              adornmentColor,
              color,
              divider,
              disabled,
              onClick: () => handleClick(key),
              selected: items.find((item) => item.key === key)?.selected,
              selectable,
              status,
            }),
          );
        }

        if (
          isValidElement(child) &&
          (child as ElementWithChildren).props?.children
        ) {
          walk((child as ElementWithChildren).props?.children);
        }
      });
    };

    walk(children);
    const indexedResults = results.map((child, index) =>
      cloneElement(child, {
        firstIndex: index === 0,
        lastIndex: results.length - 1 === index,
      }),
    );
    return indexedResults;
  };

  useEffect(() => {
    if (selectable) {
      if (onChange) {
        onChange(controlledValue);
      } else {
        setValue(controlledValue);
      }
    }
  }, [items, setValue, onChange, controlledValue, selectable]);

  if (as === 'div') {
    return (
      <div
        className={classes}
        ref={ref as Ref<HTMLDivElement>}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      >
        {children && renderChildren(children)}
      </div>
    );
  }

  if (as === 'ol') {
    return (
      <ol
        className={classes}
        ref={ref as Ref<HTMLOListElement>}
        {...(rest as OlHTMLAttributes<HTMLOListElement>)}
      >
        {children && renderChildren(children)}
      </ol>
    );
  }

  return (
    <ul
      className={classes}
      ref={ref as Ref<HTMLUListElement>}
      {...(rest as HTMLAttributes<HTMLUListElement>)}
    >
      {children && renderChildren(children)}
    </ul>
  );
}

List.displayName = 'List';

export { List };
export type { Item };
