import tokensFile from './tokens.json';
import postcss, { Container, Root } from 'postcss';
import { colord } from 'colord';
import postcssJs from 'postcss-js';
import { writeFile } from 'fs/promises';

const FILEPATH = './app/theme.css';

/**
 * Normalizes PostCSS output where generated declarations can leave semicolons
 * on their own line or omit the final semicolon before a block closes.
 */
function formatGeneratedCss(css: string): string {
  return css
    .replace(/^([ \t]*[^{}\r\n]+:[^\r\n;{}]+)\r?\n[ \t]*;[ \t]*$/gmu, '$1;')
    .replace(/[ \t]*;?[ \t]*(?:\r?\n[ \t]*)+\}$/gu, ';\n}');
}

/**
 * Custom error for invalid color reference strings in design tokens.
 * Includes the problematic colorRef and an optional cause.
 *
 * @class ColorTokenParsingError
 * @extends Error
 * @property {string} colorRef - The invalid color reference string that caused the error.
 * @constructor
 * @param {string} colorRef - The invalid color reference string.
 * @param {Error} [cause] - Optional underlying error cause for additional context.
 *
 * @example
 * ```ts
 * try {
 *   colorRefToCssVar("invalid.color.ref");
 * } catch (error) {
 *   if (error instanceof ColorTokenParsingError) {
 *     console.error(error.message); // "Invalid color reference: invalid.color.ref"
 *     console.error(error.colorRef); // "invalid.color.ref"
 *     console.error(error.cause); // Original error with parsing details
 *   }
 * }
 * ```
 */
class ColorTokenParsingError extends Error {
  /**
   * The invalid color reference string that caused the error.
   */
  public colorRef: string;

  /**
   * Constructs a new ColorTokenParsingError.
   * @param colorRef - The invalid color reference string.
   * @param cause - Optional underlying error cause.
   */
  constructor(colorRef: string, cause?: Error) {
    super(`Invalid color reference: ${colorRef}`, { cause });
    this.name = 'ColorTokenParsingError';
    this.colorRef = colorRef;
  }
}

/**
 * @type
 * Mode: Represents the semantic color mapping for a specific theme mode (light or dark).
 * Each key is a semantic color name (e.g. "primary", "secondary") and the value is a reference string to a base color token (e.g. "colors.sky.500").
 * @property background - A nested object mapping semantic background color names to their token references.
 * @property text - A nested object mapping semantic text color names to their token references.
 * @property [key: string] - Allows for additional semantic color categories (e.g. "border", "accent") to be included in the future.
 *
 * @example
 * ```ts
 * const lightMode: Mode = {
 *  background: {
 *   primary: "colors.azure.900",
 *   secondary: "colors.ocean.600",
 * },
 * text: {
 *  primary: "colors.black",
 *  secondary: "colors.ocean.500",
 * }
 * }
 * ```
 */
type Mode = {
  background: Record<string, string>;
  text: Record<string, string>;
  [key: string]: Record<string, string>;
};

/**
 * Palette: Contains both light and dark Mode mappings for semantic colors.
 * Example: { light: Mode, dark: Mode }
 */
type Palette = { light: Mode; dark: Mode };

/**
 * ColorScale: Maps numeric scale steps (e.g. "100", "500") to hex color values.
 * Example: { "100": "#f0f0f0", "500": "#0077ff" }
 */
type ColorScale = Record<string, string> | string;

/**
 * BaseColors: Maps color families (e.g. "sky", "mist") to their ColorScale.
 * Example: { sky: ColorScale, mist: ColorScale }
 */
type BaseColors = Record<string, ColorScale>;

/**
 * @type
 * SpacingScale: Defines the spacing scale for the theme.
 * @property space-unit - The base spacing unit (e.g. "8px") that other spacing tokens are multiples of.
 * @property [key: string] - Additional spacing tokens (e.g. "xs", "sm", "md", "lg", "xl") that map to numeric multiples of the base space unit.
 *
 * Example:
 * {
 *   'space-unit': '8px',
 *   'xs': 0.5,
 *   'sm': 1,
 *   'md': 2,
 *   'lg': 4,
 *   'xl': 8
 * }
 */
type SpacingScale = {
  'space-unit': string;
  [key: string]: string | number;
};

interface Typography {
  fontSize: Record<string, string>;
  [key: string]: string | Record<string, string>;
}

/**
 * BorderWidthScale: Defines the border width scale for the theme.
 *
 * Maps border width token names (e.g., 'thin', 'medium', 'thick') to their CSS values (e.g., '1px', '2px').
 *
 * Example:
 * {
 *   'thin': '1px',
 *   'medium': '2px',
 *   'thick': '4px'
 * }
 */
type BorderWidthScale = Record<string, string>;

/**
 * BreakpointScale: Defines the viewport min-width scale used by Tailwind v4
 * responsive variants.
 *
 * Tailwind v4 consumes these through `--breakpoint-*` variables in `@theme`.
 */
type BreakpointScale = Record<string, string>;

/**
 * @interface
 * Theme: Contains the semantic palette for both light and dark modes.
 * @property colors - The semantic color palette for the theme, mapping to a Palette of light and dark modes.
 * @property spacing - The spacing scale for the theme, mapping to a SpacingScale object.
 * @property borderWidth - The border width scale for the theme, mapping to a BorderWidthScale object.
 * @property [key: string] - Allows for additional theme properties (e.g. typography) to be included in the future.
 *
 * @example
 * ```ts
 * const theme: Theme = {
 *  colors: {
 *     palette: {
 *       light: { primary: "colors.sky.500", accent: "colors.mist.500" },
 *       dark: { primary: "colors.sky.100", accent: "colors.mist.100" }
 *     }
 *   },
 *   spacing: {
 *  'space-unit': '8px',
 *   'xs': 0.5,
 *   'sm': 1,
 *   'md': 2,
 *   'lg': 4,
 *   'xl': 8
 * }
 * }
 * ```
 */
interface Theme {
  colors: { palette: Palette };
  spacing: SpacingScale;
  typography: Typography;
  borderWidth: BorderWidthScale;
  breakpoints: BreakpointScale;
  [key: string]:
    | string
    | { palette: Palette }
    | SpacingScale
    | BreakpointScale
    | BorderWidthScale
    | Record<string, Record<string, string>>
    | Typography;
}

/**
 * @interface Tokens
 * Tokens: Root object for all design tokens, including base color scales and theme palettes.
 * @property colors - The base color scales, mapping color families to their scale steps and hex values.
 * @property theme - The semantic color palette for the theme.
 * @property [key: string] - Allows for additional token categories (e.g. typography) to be included in the future.
 *
 * @example
 * ```ts
 * const tokens: Tokens = {
 *   colors: {
 *     sky: { "100": "#f0f0f0", "500": "#0077ff" },
 *     mist: { "100": "#e0e0e0", "500": "#00ccaa" }
 *   },
 *   theme: {
 *     colors: {
 *       palette: {
 *         light: { primary: "colors.sky.500", accent: "colors.mist.500" },
 *         dark: { primary: "colors.sky.100", accent: "colors.mist.100" }
 *       }
 *     },
 *     spacing: {
 *       'space-unit': '8px'
 *       'xs': 0.5,
 *       'sm': 1,
 *       'md': 2,
 *       'lg': 4,
 *       'xl': 8
 *     }
 *   }
 * }
 * ```
 */
interface Tokens {
  colors: BaseColors;
  theme: Theme;
  [key: string]:
    | string
    | Record<string, string>
    | BaseColors
    | Theme
    | SpacingScale;
}

/**
 * @function
 * colorRefToCssVar - Converts a color reference string (e.g. "colors.sky.500") to a CSS variable reference (e.g. "var(--sky-500)").
 * Throws an error if the reference is not in the expected format.
 * @param colorRef - The color reference string from the palette (e.g. "colors.sky.500").
 * @returns The CSS variable reference string (e.g. "var(--sky-500)").
 * @throws {ColorTokenParsingError} If the color reference is not in the format "colors.{family}.{scale}".
 *
 * @example
 * ```ts
 * colorRefToCssVar("colors.sky.500") // returns "var(--sky-500)"
 * ```
 */
function colorRefToCssVar(colorRef: string): string {
  const parts = colorRef.split('.');
  if (parts.length > 3 || parts.length < 2 || parts[0] !== 'colors') {
    throw new ColorTokenParsingError(
      colorRef,
      new Error(
        'Color reference must be in the format "colors.{family}.{scale}" | "colors.{name}"',
      ),
    );
  }

  const [category, family, scale] = parts;
  return `var(--${category.replace('s', '')}-${family}${scale ? `-${scale}` : ''})`;
}

/**
 * Appends CSS variable declarations for all base color scales to the :root selector.
 * Each color family and scale step is converted to a CSS variable (e.g. --color-sky-500: #0077ff;).
 *
 * @param root - The PostCSS Root node to append the :root rule to.
 * @param baseColors - The base color scales object mapping families to their scales.
 * @param spacing - The spacing scale object containing the base space unit and any additional spacing tokens.
 *
 * @example
 * ```ts
 * appendRootBaseTokens(root, {
 *   sky: { "100": "#f0f0f0", "500": "#0077ff" },
 *   mist: { "100": "#e0e0e0", "500": "#00ccaa" }
 * }, {
 *   'space-unit': '8px',
 *   'xs': 0.5,
 *   'sm': 1,
 *   'md': 2,
 *   'lg': 4,
 *   'xl': 8
 * });
 * // Appends the following CSS to :root:
 * ```
 * ```css
 * :root {
 *   --color-sky-100: #f0f0f0;
 *   --color-sky-500: #0077ff;
 *   --color-mist-100: #e0e0e0;
 *   --color-mist-500: #00ccaa;
 *   --space-unit: 8px;
 * }
 * ```
 */
function appendRootBaseTokens(
  root: Root,
  baseColors: BaseColors,
  spacing: SpacingScale,
): void {
  const rootRule = postcss.rule({ selector: ':root' });

  Object.entries(baseColors).forEach(([family, scale]) => {
    if (typeof scale === 'object') {
      Object.entries(scale).forEach(([step, hex]) => {
        const { r: red, g: green, b: blue } = colord(hex).toRgb();
        rootRule.append(
          postcss.decl({
            prop: `--color-${family}-${step}`,
            value: `${red} ${green} ${blue}`,
          }),
        );
      });
    } else if (typeof scale === 'string') {
      const { r: red, g: green, b: blue } = colord(scale).toRgb();
      rootRule.append(
        postcss.decl({
          prop: `--color-${family}`,
          value: `${red} ${green} ${blue}`,
        }),
      );
    }
  });

  rootRule.append(
    postcss.decl({
      prop: `--space-unit`,
      value: spacing['space-unit'],
    }),
  );

  root.append(rootRule);
}

/**
 * Appends typography tokens (font sizes) as CSS variables to :root.
 * @param root - PostCSS root node
 * @param typography - Object containing a `fontSize` map
 */
function appendTypographyTokens(
  root: Root,
  typography?: { fontSize?: Record<string, string> },
): void {
  if (!typography || !typography.fontSize) return;
  const rule = postcss.rule({ selector: ':root' });
  Object.entries(typography.fontSize).forEach(([name, value]) => {
    rule.append(
      postcss.decl({ prop: `--font-size-${name}`, value: `${value}` }),
    );
  });
  root.append(rule);
}

/**
 * Maps a semantic color category to its corresponding CSS variable namespace.
 *
 * @param category - The semantic color category (e.g., 'background', 'text', 'border', or custom).
 * @returns The CSS variable namespace string for the given category.
 *
 * @example
 * categoryToThemeNamespace('background'); // '--background-color'
 * categoryToThemeNamespace('primary');    // '--color-primary'
 */
function categoryToThemeNamespace(category: string): string {
  if (category === 'background') return '--background-color';
  if (category === 'text') return '--text-color';
  if (category === 'border') return '--border-color';
  if (category === 'outline') return '--outline-color';
  if (category === 'caret') return '--caret-color';
  if (category === 'ring') return '--ring-color';
  return `--color-${category}`;
}

/**
 * Appends semantic color and spacing CSS variable declarations to a @theme inline at-rule.
 *
 * Each semantic color is mapped to a CSS variable pass-through (e.g. --color-primary: var(--color-primary)),
 * so that Tailwind utilities reference the semantic variable, which is then set by :root or [data-theme] selectors.
 * This enables dynamic theme switching via CSS variable inheritance.
 *
 * Also appends spacing variables, including the base spacing unit and scaled spacing tokens.
 *
 * @param container - The PostCSS Container (root or at-rule) to append the @theme inline rule to.
 * @param mode - The semantic color mapping for the current theme mode (light or dark).
 * @param spacing - The spacing scale for the theme.
 * @param borderWidths - The border width scale for the theme.
 * @param breakpoints - The breakpoint scale for Tailwind responsive variants.
 *
 * @example
 * appendThemeInline(container, {
 *   primary: "colors.sky.500",
 *   accent: "colors.mist.500"
 * }, spacing);
 * // Appends the following CSS to the container:
 * // @theme inline {
 * //   --color-primary: var(--color-primary);
 * //   --color-accent: var(--color-accent);
 * //   ...
 * //   --spacing: 8px;
 * //   --spacing-xs: 4px;
 * //   ...
 * // }
 */
function appendThemeInline(
  container: Container,
  mode: Mode,
  spacing: SpacingScale,
  borderWidths: BorderWidthScale,
  breakpoints: BreakpointScale,
  typography?: { fontSize?: Record<string, string> },
): void {
  const themeRule = postcss.atRule({ name: 'theme', params: 'inline' });
  Object.entries(mode).forEach(([category, categoryTokens]) => {
    const namespace = categoryToThemeNamespace(category);
    Object.entries(categoryTokens).forEach(([semanticName]) => {
      themeRule.append(
        postcss.decl({
          prop: `${namespace}-${semanticName}`,
          value: `var(--${category}-${semanticName})`,
        }),
      );
    });
  });

  const spacingUnit = Number(spacing['space-unit'].replace(/px$/, ''));

  themeRule.append(
    postcss.decl({
      prop: '--spacing',
      value: spacing['space-unit'],
    }),
  );

  Object.entries(borderWidths).forEach(
    ([borderWidthName, borderWidthValue]) => {
      themeRule.append(
        postcss.decl({
          prop: `--border-width-${borderWidthName}`,
          value: borderWidthValue,
        }),
      );
    },
  );

  Object.entries(breakpoints).forEach(([breakpointName, breakpointValue]) => {
    themeRule.append(
      postcss.decl({
        prop: `--breakpoint-${breakpointName}`,
        value: breakpointValue,
      }),
    );
  });

  Object.entries(spacing).forEach(([spacingName, spacingValue]) => {
    if (spacingName !== 'space-unit') {
      themeRule.append(
        postcss.decl({
          prop: `--spacing-${spacingName}`,
          value: `${spacingUnit * (spacingValue as number)}px`,
        }),
      );
    }
  });

  if (typography?.fontSize) {
    Object.entries(typography.fontSize).forEach(([name]) => {
      themeRule.append(
        postcss.decl({
          prop: `--font-size-${name}`,
          value: `var(--font-size-${name})`,
        }),
      );
    });
  }

  container.append(themeRule);
}

/**
 * Appends semantic color CSS variable declarations to a plain selector rule.
 * Unlike appendThemeInline, this emits raw CSS custom properties (no @theme inline)
 * so they work inside element selectors like [data-theme="dark"].
 *
 * @param root - The PostCSS Root node to append the selector rule to.
 * @param selector - The CSS selector string (e.g. '[data-theme="dark"]').
 * @param mode - The semantic color mapping for the theme mode.
 *
 * @example
 * ```ts
 * appendSelectorVars(root, '[data-theme="dark"]', {
 *   primary: "colors.sky.100",
 *   accent: "colors.mist.100"
 * });
 * // Appends the following CSS to the root:
 * ```
 * ```css
 * [data-theme="dark"] {
 *   --color-primary: rgb(240 240 240);
 *   --color-accent: rgb(224 224 224);
 *   ...
 * }
 * ```
 */
function appendSelectorVars(root: Root, selector: string, mode: Mode): void {
  const rule = postcss.rule({ selector });
  Object.entries(mode).forEach(([category, categoryTokens]) => {
    Object.entries(categoryTokens).forEach(([semanticName, tokenRef]) => {
      try {
        rule.append(
          postcss.decl({
            prop: `--${category}-${semanticName}`,
            value: `rgb(${colorRefToCssVar(tokenRef)})`,
          }),
        );
      } catch (error: unknown) {
        if (error instanceof ColorTokenParsingError || error instanceof Error) {
          console.error(error.message);
        }
        console.error(
          'Unknown error while parsing semantic color:',
          semanticName,
        );
      }
    });
  });
  root.append(rule);
}

/**
 * Generates the complete CSS string for base color variables and semantic theme variables.
 *
 * Per Tailwind v4 docs, when using @custom-variant dark with a data-attribute selector,
 * the @media (prefers-color-scheme: dark) @theme inline block conflicts with that approach.
 * Instead, explicit [data-theme] selector rules are used so both dark: utilities and
 * CSS variable-based colors respond to the same data-theme attribute.
 *
 * System preference is handled in JS via matchMedia.
 *
 * @param tokens - The full design tokens object containing base colors and theme palettes.
 * @returns The generated CSS string.
 */
function generateTheme(tokens: Tokens): string {
  const root = postcss.root();

  appendRootBaseTokens(root, tokens.colors, tokens.theme.spacing);
  appendTypographyTokens(root, tokens.theme?.typography);

  appendSelectorVars(root, ':root', tokens.theme.colors.palette.light);

  appendThemeInline(
    root,
    tokens.theme.colors.palette.light,
    tokens.theme.spacing,
    tokens.theme.borderWidth,
    tokens.theme.breakpoints,
    tokens.theme.typography,
  );

  appendSelectorVars(
    root,
    '[data-theme="light"]',
    tokens.theme.colors.palette.light,
  );
  appendSelectorVars(
    root,
    '[data-theme="dark"]',
    tokens.theme.colors.palette.dark,
  );

  return root.toString();
}

async function buildCssFile(source: string): Promise<void> {
  const root = postcss.parse(source);
  const cssObject = postcssJs.objectify(root);
  const result = await postcss().process(cssObject, {
    parser: postcssJs as unknown as postcss.Parser,
    from: undefined,
  });

  const formattedRoot = postcss.parse(result.css);
  const formattedCss = `${formattedRoot.nodes
    .map((node) => formatGeneratedCss(node.toString()))
    .join('\n\n')}\n`;

  await writeFile(FILEPATH, formattedCss, 'utf8');
  console.log(`✅ Successfully wrote theme CSS to ${FILEPATH}`);
}

const parsedTheme = generateTheme(tokensFile);

console.log('🎨 Generated CSS Theme');

console.log(`💾 Writing theme CSS to ${FILEPATH}...`);
await buildCssFile(parsedTheme);
