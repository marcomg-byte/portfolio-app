'use client';
import type { FC, HTMLAttributes, MouseEvent, Ref } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useControlled } from '@/lib';
import { capitalize } from '@/utils';
import classNames from 'classnames';

/**
 * Option for the Select component.
 *
 * @property {string} value - The value of the option (used for form submission and selection logic).
 * @property {string} label - The display label for the option.
 * @property {IconDefinition} [icon] - Optional icon to display alongside the label.
 */
interface Option {
  value: string;
  label: string;
  icon?: IconDefinition;
}

/**
 * Props for the Select component.
 *
 * Supports both controlled and uncontrolled usage:
 * - Use `value` and `onChange` for controlled mode.
 * - Use `defaultValue` for uncontrolled mode.
 *
 * @property {string} [defaultValue] - The initial value for uncontrolled mode.
 * @property {boolean} [disabled] - Whether the select is disabled.
 * @property {string} [label] - The label to display above the select.
 * @property {string} [name] - The name for the hidden input (for form integration).
 * @property {(event: MouseEvent<HTMLLIElement>) => void} [onChange] - Callback fired when an option is selected. Receives the click event for the selected option.
 * @property {Option[]} [options] - The list of selectable options. See {@link Option}.
 * @property {string} [placeholder] - Placeholder text when no value is selected.
 * @property {Ref<HTMLDivElement>} [ref] - Ref for the root div element.
 * @property {number} [tabIndex] - Tab index for keyboard navigation.
 * @property {'outline' | 'filled'} [variant] - Visual style of the select dropdown.
 * @property {string} [value] - The controlled value (if provided, component is controlled).
 */
interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange?: (event: MouseEvent<HTMLLIElement>) => void;
  options?: Option[];
  placeholder?: string;
  ref?: Ref<HTMLDivElement>;
  tabIndex?: number;
  variant?: 'outline' | 'filled';
  value?: string;
}

/**
 * Select dropdown component.
 *
 * Renders a styled dropdown menu for selecting an option from a list.
 * Supports both controlled and uncontrolled usage, keyboard navigation, and optional icons for options.
 *
 * - Controlled: Provide `value` and `onChange` props to manage selection state externally.
 * - Uncontrolled: Provide `defaultValue` for initial selection and let the component manage state internally.
 *
 * @param {SelectProps} props - The props for the Select component.
 * @returns {JSX.Element} The rendered select dropdown.
 *
 * @example
 * ```tsx
 * import { Select } from '@/components/select/Select';
 *
 * function App() {
 *  const options = [
 *   { value: 'option1', label: 'Option 1' },
 *   { value: 'option2', label: 'Option 2', icon: faStar },
 * ];
 *
 * return (
 *   <Select
 *    label="Choose an option"
 *    options={options}
 *    placeholder="Select an option"
 * />
 * );
 * ```
 *
 * @see Option
 * @see SelectProps
 */
const Select: FC<SelectProps> = ({
  defaultValue,
  disabled = false,
  label,
  name,
  onChange,
  options = [],
  placeholder,
  ref,
  tabIndex = 0,
  value,
  variant = 'outline',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useControlled<Option>({
    defaultValue: defaultValue
      ? { value: defaultValue, label: capitalize(defaultValue) }
      : undefined,
    value: value ? { value: value, label: capitalize(value) } : undefined,
  });

  const containerClasses = classNames(
    'mg:relative mg:flex mg:justify-start mg:items-center mg:gap-1 mg:rounded-sm mg:w-full mg:h-full',
    {
      'mg:border-1 mg:border-solid mg:border-primary mg:hover:border-hover':
        variant === 'outline',
      'mg:bg-primary': variant === 'filled',
      'mg:cursor-not-allowed mg:opacity-50': disabled,
      'mg:hover:cursor-pointer': !disabled,
    },
  );

  const optionsContainerClasses = classNames(
    'mg:absolute mg:top-full mg:left-0 mg:mt-1 mg:flex mg:flex-col mg:justify-start mg:items-center mg:w-full',
    {
      'mg:border-solid mg:border-1 mg:border-primary mg:rounded-sm mg:bg-secondary':
        variant === 'outline',
    },
  );

  const optionClasses = classNames(
    'mg:flex mg:justify-between mg:items-center mg:px-1.5 mg:py-1 mg:w-full mg:text-xs',
    {
      'mg:hover:text-accent': variant === 'outline',
    },
  );

  const iconClasses = classNames(
    'mg:text-sm mg:transition-transform mg:duration-200',
    {
      'mg:rotate-180': isOpen,
    },
  );

  const handleClickAway = useCallback((event: globalThis.MouseEvent) => {
    if (!containerRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleOnChange = (event: MouseEvent<HTMLLIElement>) => {
    setIsOpen(false);
    if (onChange) {
      onChange(event);
    } else {
      const newValue = event.currentTarget.getAttribute('data-value');
      setCurrentValue({
        value: newValue ?? '',
        label: capitalize(newValue ?? ''),
      });
    }
  };

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [isOpen, handleClickAway]);

  return (
    <div
      className="mg:inline-flex mg:flex-col mg:items-start mg:justify-center mg:gap-0.5 mg:min-w-12 mg:min-h-2 mg:h-full mg:font-body mg:text-inverse"
      ref={ref}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      {label && <label className="mg:text-xs">{label}</label>}
      <div
        aria-disabled={disabled}
        className={containerClasses}
        onClick={toggleOpen}
        ref={containerRef}
        tabIndex={disabled ? -1 : tabIndex}
      >
        <div className="mg:relative mg:flex mg:justify-start mg:items-center mg:gap-1 mg:p-1 mg:text-xs mg:w-full">
          {currentValue?.label || placeholder || 'Select an option'}
        </div>
        <div className="mg:relative mg:flex mg:justify-center mg:items-center mg:p-0.5">
          <FontAwesomeIcon className={iconClasses} icon={faChevronDown} />
        </div>
        {isOpen && options.length > 0 && (
          <ul className={optionsContainerClasses}>
            {options.map((option, index) => (
              <li
                className={optionClasses}
                data-value={option.value}
                key={`select-option-${index}`}
                onClick={handleOnChange}
                tabIndex={disabled ? -1 : tabIndex + (index + 1)}
              >
                {option.icon && (
                  <FontAwesomeIcon className="mg:text-sm" icon={option.icon} />
                )}
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {name && (
        <input type="hidden" name={name} value={value ?? defaultValue ?? ''} />
      )}
    </div>
  );
};

Select.displayName = 'Select';

export { Select };
