'use client';
import type { FC, HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';

interface ConnectorProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the connector is currently active (uses active styling). */
  active?: boolean;
  /** Additional CSS class names applied to the connector wrapper. */
  className?: string;
  /** Whether the preceding step has been completed. */
  completed?: boolean;
  /** If true, the connector will not be rendered for the last step. */
  lastIndex?: boolean;
  /** Orientation of the connector: horizontal or vertical. */
  orientation?: 'horizontal' | 'vertical';
  /** Ref forwarded to the connector container element. */
  ref?: Ref<HTMLDivElement>;
}

/**
 * @component Connector
 * @description Visual divider between steps. Renders a horizontal or vertical line whose
 * appearance reflects whether the step is active, completed, or pending.
 *
 * @param {ConnectorProps} props - Configuration for rendering the connector.
 * @returns {JSX.Element | null} The connector element or `null` for the last step.
 * @example
 * ```tsx
 * import { Connector } from '@/components/ui/atomics';
 *
 * const MyConnector = () => (
 *  <Connector active={true} completed={false} orientation="horizontal" />
 * );
 * ```
 */
const Connector: FC<ConnectorProps> = ({
  active = false,
  className,
  completed = false,
  lastIndex = false,
  orientation = 'horizontal',
  ref,
  ...rest
}) => {
  const classes = classNames(
    'mg:relative mg:transform mg:translate-y-7',
    {
      'mg:h-2px mg:w-full': orientation === 'horizontal',
      'mg:w-2px mg:h-full': orientation === 'vertical',
      'mg:bg-accent': !active && !completed,
      'mg:bg-primary': active,
      'mg:bg-success-primary': completed,
    },
    className,
  );

  if (lastIndex) {
    return null;
  }

  return (
    <div className="mg:relative mg:flex mg:h-full mg:grow" ref={ref} {...rest}>
      <div className={classes} />
    </div>
  );
};

export { Connector };
