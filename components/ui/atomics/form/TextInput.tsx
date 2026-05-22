'use client';
import type {
  ChangeEvent,
  FC,
  FocusEvent,
  InputEvent,
  InputHTMLAttributes,
  JSX,
  KeyboardEvent,
  MouseEvent,
  Ref,
} from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { IconButton } from '@/components/ui';
import { useControlled } from '@/lib';

type TextInputAdornment = IconDefinition | { src: string; alt?: string };

type TextInputAdornmentColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'subtle'
  | 'inverse'
  | 'black'
  | 'white';

interface TextInputClasses {
  container?: string;
  clearButton?: string;
  endAdornment?: string;
  helper?: string;
  input?: string;
  inputContainer?: string;
  label?: string;
  startAdornment?: string;
  toggleButton?: string;
}

type TextInputColor = 'black' | 'inverse' | 'primary' | 'white';

type TextInputSize = 'sm' | 'md' | 'lg';

type TextInputStatus = 'success' | 'warning' | 'error';

type TextInputType = Exclude<
  JSX.IntrinsicElements['input']['type'],
  | 'button'
  | 'checkbox'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'radio'
  | 'range'
  | 'time'
  | 'week'
>;

interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'pattern' | 'onError'
> {
  'aria-describedby'?: string;
  'aria-label'?: string;
  'aria-invalid'?: boolean;
  adornmentColor?: TextInputAdornmentColor;
  autoComplete?: string;
  autoFocus?: boolean;
  classes?: TextInputClasses;
  clearable?: boolean;
  color?: TextInputColor;
  defaultValue?: string;
  disabled?: boolean;
  endAdornment?: TextInputAdornment;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  id?: string;
  inputMode?: JSX.IntrinsicElements['input']['inputMode'];
  label?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  pattern?: RegExp;
  placeholder?: string;
  readOnly?: boolean;
  ref?: Ref<HTMLInputElement>;
  required?: boolean;
  showPasswordToggle?: boolean;
  size?: TextInputSize;
  status?: TextInputStatus;
  spellCheck?: boolean;
  startAdornment?: TextInputAdornment;
  type?: TextInputType;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear?: (event: MouseEvent<HTMLButtonElement>, error: boolean) => void;
  onError?: (error: boolean) => void;
  onInput?: (event: InputEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
}

const renderAdornment = (
  adornment: TextInputAdornment,
  color: TextInputAdornmentColor = 'white',
  className?: string,
) => {
  const iconClasses = classNames(
    'mg:text-base',
    {
      'mg:text-white': color === 'white',
      'mg:text-black': color === 'black',
      'mg:text-primary': color === 'primary',
      'mg:text-secondary': color === 'secondary',
      'mg:text-accent': color === 'accent',
      'mg:text-subtle': color === 'subtle',
    },
    className,
  );

  const imageClasses = classNames(
    'mg:object-contain mg:animate-fade-in mg:duration-500',
    className,
  );

  if ('iconName' in adornment) {
    return <FontAwesomeIcon icon={adornment} className={iconClasses} />;
  } else {
    return (
      <Image
        src={adornment.src || ''}
        alt={adornment.alt || ''}
        width={16}
        height={16}
        className={imageClasses}
      />
    );
  }
};

const TextInput: FC<TextInputProps> = ({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-invalid': ariaInvalid,
  autoComplete = false,
  adornmentColor,
  autoFocus = false,
  classes = {},
  clearable = false,
  color = 'black',
  defaultValue,
  disabled = false,
  endAdornment,
  error: errorProp,
  fullWidth = false,
  helperText,
  id,
  inputMode,
  label,
  maxLength,
  minLength,
  name,
  pattern,
  placeholder,
  readOnly = false,
  ref,
  required = false,
  showPasswordToggle = true,
  status,
  size = 'md',
  spellCheck = false,
  startAdornment,
  type: typeProp = 'text',
  onChange,
  onClear,
  onError,
  onInput,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  value: valueProp,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useControlled<boolean>({
    defaultValue: false,
    value: errorProp,
  });
  const [value, setValue] = useControlled<string>({
    defaultValue: defaultValue,
    value: valueProp,
  });

  const containerClasses = classNames(
    'mg:flex mg:flex-col mg:gap-2 mg:relative mg:bg-inherit mg:pt-0.5 mg:pb-3',
    {
      'mg:w-full': fullWidth,
    },
    classes?.container,
  );

  const clearButtonClasses = classNames(
    {
      'mg:text-accent': adornmentColor === 'accent',
      'mg:text-black': adornmentColor === 'black',
      'mg:text-inverse': adornmentColor === 'inverse',
      'mg:text-primary': adornmentColor === 'primary',
      'mg:text-secondary': adornmentColor === 'secondary',
      'mg:text-subtle': adornmentColor === 'subtle',
      'mg:text-white': adornmentColor === 'white',
      'mg:shrink-0': fullWidth,
    },
    classes?.clearButton,
  );

  const helperClasses = classNames(
    'mg:font-body mg:text-sm',
    {
      'mg:text-accent': adornmentColor === 'accent' && !status && !error,
      'mg:text-black': adornmentColor === 'black' && !status && !error,
      'mg:text-inverse': adornmentColor === 'inverse' && !status && !error,
      'mg:text-primary': adornmentColor === 'primary' && !status && !error,
      'mg:text-secondary': adornmentColor === 'secondary' && !status && !error,
      'mg:text-subtle': adornmentColor === 'subtle' && !status && !error,
      'mg:text-white': adornmentColor === 'white' && !status && !error,
      'mg:text-success': status === 'success' && !error,
      'mg:text-warning': status === 'warning' && !error,
      'mg:text-danger': status === 'error' || error,
    },
    classes?.helper,
  );

  const inputClasses = classNames(
    'mg:focus-visible:outline-0 mg:caret-white',
    {
      'mg:text-black': color === 'black',
      'mg:text-inverse': color === 'inverse',
      'mg:text-primary': color === 'primary',
      'mg:text-white': color === 'white',
      'mg:w-12': size === 'sm' && !fullWidth,
      'mg:w-32': size === 'md' && !fullWidth,
      'mg:w-52': size === 'lg' && !fullWidth,
      'mg:grow': fullWidth,
    },
    classes?.input,
  );

  const inputContainerClasses = classNames(
    'mg:flex mg:items-center mg:border-solid mg:gap-2 mg:border-1 mg:rounded-md mg:px-3 mg:py-2 mg:hover:border-accent',
    {
      'mg:border-danger': error || status === 'error',
      'mg:border-warning': status === 'warning',
      'mg:border-success': status === 'success',
      'mg:border-primary': !error && !status,
      'mg:w-full': fullWidth,
    },
    classes?.inputContainer,
  );

  const labelClasses = classNames(
    'mg:font-body mg:text-sm',
    {
      'mg:text-accent': adornmentColor === 'accent' && !status && !error,
      'mg:text-black': adornmentColor === 'black' && !status && !error,
      'mg:text-inverse': adornmentColor === 'inverse' && !status && !error,
      'mg:text-primary': adornmentColor === 'primary' && !status && !error,
      'mg:text-secondary': adornmentColor === 'secondary' && !status && !error,
      'mg:text-subtle': adornmentColor === 'subtle' && !status && !error,
      'mg:text-white': adornmentColor === 'white' && !status && !error,
      'mg:text-success': status === 'success' && !error,
      'mg:text-warning': status === 'warning' && !error,
      'mg:text-danger': status === 'error' || error,
    },
    classes?.label,
  );

  const toggleButtonClasses = classNames(
    {
      'mg:text-accent': adornmentColor === 'accent',
      'mg:text-black': adornmentColor === 'black',
      'mg:text-inverse': adornmentColor === 'inverse',
      'mg:text-primary': adornmentColor === 'primary',
      'mg:text-secondary': adornmentColor === 'secondary',
      'mg:text-subtle': adornmentColor === 'subtle',
      'mg:text-white': adornmentColor === 'white',
      'mg:shrink-0': fullWidth,
    },
    classes?.toggleButton,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (pattern) {
      const isValid = pattern.test(event.target.value);
      if (onError) {
        onError(!isValid);
      } else {
        setError(!isValid);
      }
    }

    if (onChange) {
      onChange(event);
    } else {
      setValue(event.target.value);
    }
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    setValue('');
    if (onClear) {
      onClear(event, false);
    } else {
      setError(false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (status === 'error') {
      if (onError) onError(true);
      else setError(true);
    } else if (!pattern) {
      if (onError) onError(false);
      else setError(false);
    }
  }, [pattern, status, onError, setError]);

  const type = typeProp === 'password' && showPassword ? 'text' : typeProp;

  return (
    <div className={containerClasses} ref={ref} {...rest}>
      <div className="mg:absolute mg:-top-0.75 mg:bg-inherit mg:left-3.5 mg:animate-slide-in-top">
        {label && (
          <p className={labelClasses}>
            {label}
            {required && <span className="mg:text-danger"> *</span>}
          </p>
        )}
      </div>
      <div className={inputContainerClasses}>
        {clearable && (
          <IconButton
            aria-label="Clear input"
            className={clearButtonClasses}
            onClick={handleClear}
            type="button"
          >
            {faXmark}
          </IconButton>
        )}
        {startAdornment &&
          renderAdornment(
            startAdornment,
            adornmentColor,
            classes?.startAdornment,
          )}
        <input
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid}
          autoComplete={autoComplete ? 'on' : 'off'}
          autoFocus={autoFocus}
          className={inputClasses}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          inputMode={inputMode}
          maxLength={maxLength}
          minLength={minLength}
          name={name}
          onChange={handleChange}
          onInput={onInput}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          spellCheck={spellCheck}
          type={type}
          value={value ?? ''}
        />
        {typeProp !== 'password' &&
          endAdornment &&
          renderAdornment(endAdornment, adornmentColor, classes?.endAdornment)}
        {typeProp === 'password' && showPasswordToggle && (
          <IconButton
            aria-label="Toggle password visibility"
            className={toggleButtonClasses}
            onClick={handlePasswordToggle}
            type="button"
          >
            {showPassword ? faEyeSlash : faEye}
          </IconButton>
        )}
      </div>
      <div className="mg:absolute mg:bottom-0 mg:left-3.5 mg:animate-slide-in-bottom">
        {helperText && (
          <p className={helperClasses}>
            {helperText}
            {required && <span className="mg:text-danger"> *</span>}
          </p>
        )}
      </div>
    </div>
  );
};

export { TextInput };
