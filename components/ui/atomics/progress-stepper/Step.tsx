'use client';
import type { HTMLAttributes, FC, MouseEvent, ReactNode, Ref } from 'react';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '../buttons';
import { Node } from './Node';
import { Typography } from '../typography';

/**
 * @description Allowed color variants for the step/node components.
 * - `primary`: Uses the primary color from the theme.
 * - `secondary`: Uses the secondary color from the theme.
 * - `accent`: Uses the accent color from the theme.
 * - `error`: Uses the error color from the theme.
 * - `info`: Uses the info color from the theme.
 * - `warning`: Uses the warning color from the theme.
 */
type StepColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'error'
  | 'info'
  | 'warning';

/**
 * @interface StepProps
 * @extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>
 * @description Props accepted by the `Step` component.
 */
interface StepProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Whether the step is currently active (shows expanded content). */
  active?: boolean;
  /** Additional CSS class names applied to the step container. */
  className?: string;
  /** Color variant for the step node. */
  color?: StepColor;
  /** Whether the step is marked as completed. */
  completed?: boolean;
  /** Optional descriptive content displayed when the step is active. */
  description?: ReactNode;
  /** Optional FontAwesome icon rendered inside the node. */
  icon?: IconDefinition;
  /** Zero-based index assigned by the parent stepper. */
  index?: number;
  /** Optional label displayed when step is active. */
  label?: string;
  /** When true, stepper enforces linear progression; when false the step is interactive. */
  linear?: boolean;
  /** Click handler for interactive (non-linear) steps. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Layout orientation for the step content. */
  orientation?: 'horizontal' | 'vertical';
  /** Ref forwarded to the step container element. */
  ref?: Ref<HTMLDivElement>;
  /** Title displayed when the step is active. */
  title?: string;
}

/**
 * @component Step
 * @description
 * Renders a single step node used by `ProgressStepper`.
 * - When `linear` is `true`, renders a static `Node`; when `false`, renders an interactive `Fab`.
 * - When `active` is `true`, the step displays its `title` and `description`.
 *
 * @param {StepProps} props - Props for configuring appearance and behavior.
 * @returns {JSX.Element} The rendered step element.
 *
 * @example
 * ```tsx
 * import { Step } from '@/components/ui/atomics';
 *
 * const MyStep = () => (
 *  <Step
 *   active={true}
 *   color="primary"
 *   title="Step Title"
 *   description="Detailed description of the step content."
 *   icon={faMugHot}
 *  />
 * );
 * ```
 */
const Step: FC<StepProps> = ({
  active = false,
  className,
  color = 'primary',
  completed = false,
  description,
  icon,
  index: indexProp,
  label,
  linear = true,
  onClick,
  orientation = 'horizontal',
  ref,
  title,
  ...rest
}) => {
  const containerClasses = classNames(
    'mg:flex mg:max-w-44 mg:p-3 mg:rounded-md',
    {
      'mg:flex-col mg:gap-1': orientation === 'horizontal',
      'mg:justify-between mg:items-start': orientation === 'vertical',
      'mg:relative mg:z-10 mg:min-w-32 mg:hover:bg-primary mg:transition-all mg:duration-200 mg:ease-in-out mg:hover:scale-105 mg:hover:shadow-lg':
        active,
    },
    className,
  );

  const index = indexProp !== undefined ? (indexProp + 1).toString() : '–';

  if (!linear) {
    return (
      <div className={containerClasses} ref={ref} {...rest}>
        <div className="mg:flex mg:pb-2">
          <Fab
            aria-label={label}
            color={completed ? 'success' : color}
            onClick={onClick}
            variant="circular"
          >
            {icon ? <FontAwesomeIcon icon={icon} /> : index}
          </Fab>
        </div>
        {active && (
          <div className="mg:animate-fade-in mg:transition-opacity mg:duration-300">
            <Typography
              removePadding
              className="mg:text-base"
              bold
              color="primary"
              variant="h3"
            >
              {title}
            </Typography>
            <div className="mg:flex mg:flex-col mg:text-primary mg:gap-1">
              {description}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClasses} ref={ref} {...rest}>
      <div className="mg:flex mg:pb-2">
        <Node
          aria-label={label}
          color={completed ? 'success' : color}
          variant="circular"
        >
          {icon ? <FontAwesomeIcon icon={icon} /> : index}
        </Node>
      </div>
      {active && (
        <div className="mg:animate-fade-in mg:transition-opacity mg:duration-300">
          <Typography
            removePadding
            className="mg:text-base"
            bold
            color="primary"
            variant="h3"
          >
            {title}
          </Typography>
          <div className="mg:flex mg:flex-col mg:text-primary mg:gap-1">
            {description}
          </div>
        </div>
      )}
    </div>
  );
};

Step.displayName = 'ProgressStepper.Step';
export { Step };
