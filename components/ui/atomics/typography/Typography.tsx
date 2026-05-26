import type { HTMLAttributes, JSX, ReactNode, Ref } from 'react';
import classNames from 'classnames';

/**
 * Number of lines to clamp text to.
 * Used for truncating text with CSS line clamping utilities.
 * Valid values: 1 to 10.
 */
type ClampLine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * @constant - clampClasses
 * Maps ClampLine values to their corresponding CSS utility classes for line clamping.
 * Used internally by Typography to apply the correct line-clamp class.
 * @see ClampLine
 */
const clampClasses: Record<ClampLine, string> = {
  1: 'mg:line-clamp-1',
  2: 'mg:line-clamp-2',
  3: 'mg:line-clamp-3',
  4: 'mg:line-clamp-4',
  5: 'mg:line-clamp-5',
  6: 'mg:line-clamp-6',
  7: 'mg:line-clamp-7',
  8: 'mg:line-clamp-8',
  9: 'mg:line-clamp-9',
  10: 'mg:line-clamp-10',
};

/**
 * Color options for Typography text.
 * Determines the text color utility class applied.
 *
 * - 'black': Solid black color
 * - 'primary': Main foreground color
 * - 'secondary': Secondary color
 * - 'accent': Accent color
 * - 'subtle': Subtle/less prominent color
 * - 'inverse': For use on dark backgrounds
 * - 'white': Solid white color
 */
type Color =
  | 'black'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'subtle'
  | 'inverse'
  | 'white';

/**
 * Heading tag variants for Typography.
 * Determines which HTML heading element is rendered.
 * Valid values: 'h1' through 'h6'.
 */
type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * List of all valid heading variants for Typography.
 * Used internally for type checks and rendering.
 * @see HeadingVariant
 */
const headingVariants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as HeadingVariant[];

/**
 * Paragraph style variants for Typography.
 * Determines the text size and style for paragraphs and spans.
 * Valid values: 'base', 'small', 'large'.
 */
type ParagraphVariant = 'base' | 'small' | 'large';

/**
 * List of all valid paragraph variants for Typography.
 * Used internally for type checks and rendering.
 * @see ParagraphVariant
 */
const paragraphVariants = ['base', 'small', 'large'] as ParagraphVariant[];

/**
 * Common base props for Typography components.
 *
 * @property {'left' | 'center' | 'right'} [align] - Text alignment.
 * @property {boolean} [bold] - Whether to use bold font weight.
 * @property {string} [className] - Additional CSS classes to apply.
 * @property {Color} [color] - Text color variant.
 * @property {ClampLine} [clamp] - Number of lines to clamp (truncates overflow).
 * @property {ReactNode} [children] - Content to render inside the component.
 * @property {boolean} [removePadding] - If true, removes default vertical padding.
 * @property {boolean} [span] - Render as a <span> instead of a heading or paragraph.
 * @property {boolean} [truncate] - Truncate text with ellipsis if it overflows.
 * @property {boolean} [underline] - Underline the text.
 */
interface BaseProps {
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  className?: string;
  color?: Color;
  clamp?: ClampLine;
  children?: ReactNode;
  removePadding?: boolean;
  span?: boolean;
  truncate?: boolean;
  underline?: boolean;
}

/**
 * Props for heading elements (h1-h6) in Typography.
 *
 * @property {Ref<HTMLHeadingElement>} [ref] - React ref for the heading element.
 * @property {HeadingVariant} [variant] - Specifies which heading tag to render (h1-h6).
 * Inherited: All standard HTML heading element attributes.
 */
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
  variant?: HeadingVariant;
}

/**
 * Props for paragraph elements in Typography.
 *
 * @property {Ref<HTMLParagraphElement>} [ref] - React ref for the paragraph element.
 * @property {ParagraphVariant} [variant] - Paragraph style variant (base, small, large).
 * Inherited: All standard HTML paragraph element attributes.
 */
interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  ref?: Ref<HTMLParagraphElement>;
  variant?: ParagraphVariant;
}

/**
 * Props for span elements in Typography.
 *
 * @property {Ref<HTMLSpanElement>} [ref] - React ref for the span element.
 * @property {ParagraphVariant} [variant] - Span style variant (base, small, large).
 * Inherited: All standard HTML span element attributes.
 */
interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  variant?: ParagraphVariant;
}

/**
 * All valid props for the Typography component.
 *
 * Combines base props with props for headings, paragraphs, and spans.
 *
 * @see BaseProps
 * @see HeadingProps
 * @see ParagraphProps
 * @see SpanProps
 */
type TypographyProps = BaseProps & (HeadingProps | ParagraphProps | SpanProps);

/**
 * Typography component for rendering headings, paragraphs, or spans with flexible styling.
 *
 * Renders the appropriate HTML element (h1-h6, p, or span) based on the `variant` and `span` props.
 * Applies utility classes for alignment, color, font weight, truncation, underline, and line clamping.
 *
 * @param {TypographyProps} props - Props for controlling typography style and element type.
 * @returns {JSX.Element} The rendered typography element.
 *
 * @example
 * ```tsx
 * import { Typography } from './Typography';
 *
 * function MyComponent() {
 *  return (
 *    <div>
 *       <Typography variant="h1" color="primary" bold>
 *         Heading 1
 *       </Typography>
 *       <Typography variant="base" color="secondary" clamp={3}>
 *         This is a paragraph that will be clamped to 3 lines if it exceeds the limit.
 *       </Typography>
 *     </div>
 *   );
 * }
 * ```
 */
function Typography(props: HeadingProps & BaseProps): JSX.Element;
function Typography(props: ParagraphProps & BaseProps): JSX.Element;
function Typography(props: SpanProps & BaseProps): JSX.Element;
function Typography({
  align = 'left',
  bold = false,
  className,
  children,
  clamp = 2,
  color = 'primary',
  removePadding = false,
  span = false,
  truncate = false,
  underline = false,
  variant = 'base',
  ...rest
}: TypographyProps): JSX.Element {
  const isHeading = headingVariants.includes(variant as HeadingVariant);
  const isParagraph = paragraphVariants.includes(variant as ParagraphVariant);

  const headingClasses = isHeading
    ? classNames({
        'mg:font-extrabold': bold,
        'mg:font-heading': !bold,
      })
    : '';

  const paragraphClasses = isParagraph
    ? classNames({
        'mg:font-bold': bold,
        'mg:font-body': !bold,
      })
    : '';

  const spanClasses = span
    ? classNames({
        'mg:font-bold': bold,
        'mg:font-body': isParagraph,
        'mg:font-heading': isHeading,
      })
    : '';

  const classes = classNames(
    {
      'mg:py-1': !removePadding,
      'mg:text-left': align === 'left',
      'mg:text-center': align === 'center',
      'mg:text-right': align === 'right',
      'mg:truncate': truncate,
      'mg:underline': underline,
      'mg:text-sm': variant === 'small' || variant === 'h6',
      'mg:text-base': variant === 'base' || variant === 'h5',
      'mg:text-lg': variant === 'large' || variant === 'h4',
      'mg:text-8xl': variant === 'h1',
      'mg:text-7xl': variant === 'h2',
      'mg:text-6xl': variant === 'h3',
      'mg:text-black': color === 'black',
      'mg:text-primary': color === 'primary',
      'mg:text-secondary': color === 'secondary',
      'mg:text-accent': color === 'accent',
      'mg:text-subtle': color === 'subtle',
      'mg:text-inverse': color === 'inverse',
      'mg:text-white': color === 'white',
    },
    headingClasses,
    paragraphClasses,
    spanClasses,
    clamp ? clampClasses[clamp] : '',
    className,
  );

  if (span) {
    return (
      <span
        className={classes}
        {...(rest as HTMLAttributes<HTMLSpanElement>)}
      ></span>
    );
  }

  if (isHeading) {
    const Component = variant as HeadingVariant;
    return (
      <Component
        className={classes}
        {...(rest as HTMLAttributes<HTMLHeadingElement>)}
      >
        {children}
      </Component>
    );
  }

  return (
    <p className={classes} {...(rest as HTMLAttributes<HTMLParagraphElement>)}>
      {children}
    </p>
  );
}

Typography.displayName = 'Typography';

export { Typography };
export type { HeadingVariant, ParagraphVariant };
