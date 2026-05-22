'use client';
import type {
  ChangeEvent,
  FC,
  FormHTMLAttributes,
  JSX,
  Ref,
  SubmitEvent,
} from 'react';
import { ReactNode } from 'react';
import classNames from 'classnames';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@/components/ui';
import Image from 'next/image';

/**
 * A form adornment can be either a FontAwesome `IconDefinition` or an image descriptor.
 * - When an `IconDefinition` is passed, the component renders a FontAwesome icon.
 * - When an object is passed it should provide a `src` (image `src`) and optional `alt` text.
 */
type FormAdornment = IconDefinition | { src: string; alt?: string };

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Accessible label for the form (maps to `aria-label`). */
  'aria-label'?: string;
  /** ID of an element that labels the form (maps to `aria-labelledby`). */
  'aria-labelledby'?: string;
  /** Native HTML `action` attribute (submission URL). */
  action?: JSX.IntrinsicElements['form']['action'];
  /** Child nodes to render inside the form (inputs, buttons, etc.). */
  children?: ReactNode;
  /** Additional CSS class names applied to the form container. */
  className?: string;
  /** Encoding type for the form, e.g. `multipart/form-data` for file uploads. */
  encType?: JSX.IntrinsicElements['form']['encType'];
  /** Optional adornment to render at the end of the form header (icon or image). */
  endAdornment?: FormAdornment;
  /** `id` attribute for the form element. */
  id?: string;
  /** HTTP method used when submitting the form (`get` | `post`). */
  method?: JSX.IntrinsicElements['form']['method'];
  /** `name` attribute for the form. */
  name?: string;
  /** When true, disables the browser's native validation (`noValidate`). */
  noValidate?: boolean;
  /** Change event handler for the form element. */
  onChange?: (event: ChangeEvent<HTMLFormElement>) => void;
  /** Reset event handler for the form element. */
  onReset?: (event: SubmitEvent<HTMLFormElement>) => void;
  /** Submit event handler for the form element. */
  onSubmit?: (event: SubmitEvent<HTMLFormElement>) => void;
  /** Ref to access the underlying HTML form element. */
  ref?: Ref<HTMLFormElement>;
  /** Optional adornment to render at the start of the form header (icon or image). */
  startAdornment?: FormAdornment;
  /** Optional title displayed next to adornments in the form header. */
  title?: string;
}

/**
 * Render a form adornment.
 *
 * If a FontAwesome `IconDefinition` is provided, this returns a
 * `FontAwesomeIcon`. Otherwise it renders a Next.js `Image` using the
 * adornment object's `string` as the `src` and optional `alt` text.
 *
 * @param {FormAdornment} adornment - IconDefinition or image descriptor.
 * @returns {JSX.Element} A `FontAwesomeIcon` or `Image` element.
 */
const renderAdornment = (adornment: FormAdornment): JSX.Element => {
  if ('iconName' in adornment) {
    return <FontAwesomeIcon icon={adornment} />;
  }

  return (
    <Image
      alt={adornment.alt || ''}
      src={adornment.src || ''}
      width={32}
      height={32}
      className="mg:animate-fade-in mg:duration-500"
    />
  );
};

/**
 * Form component - a wrapper around the native HTML `<form>` element.
 *
 * Renders optional `startAdornment` and `endAdornment` (icons or images) with
 * an optional `title`, then renders `children` which should contain form
 * controls. All standard HTML form attributes are forwarded via `...rest`.
 *
 * @param {FormProps} props - Configuration props for the form component.
 * @returns {JSX.Element} The rendered form element.
 * @example
 * ```tsx
 * import { Form, Button } from '@/components/ui/atomics';
 * import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
 *
 * const MyForm = () => (
 *  <Form
 *    action="/submit"
 *    method="post"
 *    title="Contact Us"
 *    startAdornment={faPaperPlane}
 *  >
 *    <input type="text" name="name" placeholder="Your Name" required />
 *    <input type="email" name="email" placeholder="Your Email" required />
 *    <Button type="submit">Send</Button>
 *  </Form>
 * );
 * ```
 */
const Form: FC<FormProps> = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  action,
  children,
  className,
  encType,
  endAdornment,
  id,
  method,
  name,
  noValidate,
  onChange,
  onReset,
  onSubmit,
  ref,
  startAdornment,
  title,
  ...rest
}) => {
  const classes = classNames(
    'mg:flex mg:flex-col mg:p-6 mg:gap-4 mg:bg-inherit',
    className,
  );

  return (
    <form
      action={action}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classes}
      encType={encType}
      id={id}
      method={method}
      name={name}
      noValidate={noValidate}
      onChange={onChange}
      onReset={onReset}
      onSubmit={onSubmit}
      ref={ref}
      {...rest}
    >
      <div className="mg:flex mg:items-center mg:justify-between mg:w-full mg:pb-2">
        <div className="mg:flex mg:items-center mg:gap-2">
          {startAdornment && renderAdornment(startAdornment)}
          {title && (
            <Typography className="mg:text-white mg:text-xl" variant="h2">
              {title}
            </Typography>
          )}
        </div>
        {endAdornment && renderAdornment(endAdornment)}
      </div>
      <div className="mg:flex mg:flex-col mg:items-start mg:gap-3 mg:bg-inherit mg:w-full">
        {children}
      </div>
    </form>
  );
};

export { Form };
