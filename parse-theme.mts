import tokensFile from './tokens.json';
import postcss, { Container, Root } from 'postcss';
import { colord } from 'colord';
import postcssJs from 'postcss-js';
import { writeFile } from 'fs/promises';

const FILEPATH = './app/theme.css';

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
 * Mode: Maps semantic color names (e.g. "primary", "accent") to color references (e.g. "colors.sky.500").
 * Example: { primary: "colors.sky.500", ... }
 */
type Mode = Record<string, string>;

/**
 * Palette: Contains both light and dark Mode mappings for semantic colors.
 * Example: { light: Mode, dark: Mode }
 */
type Palette = { light: Mode; dark: Mode };

/**
 * ColorScale: Maps numeric scale steps (e.g. "100", "500") to hex color values.
 * Example: { "100": "#f0f0f0", "500": "#0077ff" }
 */
type ColorScale = Record<string, string>;

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

/**
 * @interface
 * Theme: Contains the semantic palette for both light and dark modes.
 * @property colors - The semantic color palette for the theme, mapping to a Palette of light and dark modes.
 * @property spacing - The spacing scale for the theme, mapping to a SpacingScale object.
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
  [key: string]: string | { palette: Palette } | SpacingScale;
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
  if (parts.length !== 3 || parts[0] !== 'colors') {
    throw new ColorTokenParsingError(
      colorRef,
      new Error(
        'Color reference must be in the format "colors.{family}.{scale}"',
      ),
    );
  }

  const [_unused, family, scale] = parts;
  return `var(--color-${family}-${scale})`;
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
    Object.entries(scale).forEach(([step, hex]) => {
      const { r: red, g: green, b: blue } = colord(hex).toRgb();
      rootRule.append(
        postcss.decl({
          prop: `--color-${family}-${step}`,
          value: `${red} ${green} ${blue}`,
        }),
      );
    });
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
 * Appends semantic color CSS variable declarations to a @theme inline at-rule.
 * Each semantic color is mapped to a CSS variable referencing a base color variable.
 * Handles and logs errors for invalid color references.
 *
 * @param container - The PostCSS Container (root or at-rule) to append the @theme inline rule to.
 * @param mode - The semantic color mapping for the current theme mode (light or dark).
 *
 * @example
 * ```ts
 * appendThemeInline(container, {
 *  primary: "colors.sky.500",
 *  accent: "colors.mist.500"
 * });
 * // Appends the following CSS to the container:
 * ```
 * ```css
 *  @theme inline {
 *   --color-primary: rgb(var(--color-sky-500));
 *   --color-accent: rgb(var(--color-mist-500));
 * }
 * ```
 */
function appendThemeInline(
  container: Container,
  mode: Mode,
  spacing: SpacingScale,
): void {
  const themeRule = postcss.atRule({ name: 'theme', params: 'inline' });
  Object.entries(mode).forEach(([semanticName, tokenRef]) => {
    try {
      themeRule.append(
        postcss.decl({
          prop: `--color-${semanticName}`,
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

  const spacingUnit = Number(spacing['space-unit'].replace(/px$/, ''));

  themeRule.append(
    postcss.decl({
      prop: '--spacing',
      value: spacing['space-unit'],
    }),
  );

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

  container.append(themeRule);
}

/**
 * Generates the complete CSS string for base color variables and semantic theme variables (light and dark modes).
 * @param tokens - The full design tokens object containing base colors and theme palettes.
 *
 * - Appends all base color variables to :root.
 * - Appends semantic variables for the light palette to {@theme} inline.
 * - Appends semantic variables for the dark palette to {@theme} inline inside a dark media query.
 * @returns The generated CSS string.
 *
 * @example
 * ```ts
 * const css = generateTheme(tokensFile);
 * // css will contain :root, {@theme} inline, and {@media} (prefers-color-scheme: dark) blocks
 * ```
 */
function generateTheme(tokens: Tokens): string {
  const root = postcss.root();

  appendRootBaseTokens(root, tokens.colors, tokens.theme.spacing);

  appendThemeInline(
    root,
    tokens.theme.colors.palette.light,
    tokens.theme.spacing,
  );

  const darkMedia = postcss.atRule({
    name: 'media',
    params: '(prefers-color-scheme: dark)',
  });

  appendThemeInline(
    darkMedia,
    tokens.theme.colors.palette.dark,
    tokens.theme.spacing,
  );
  root.append(darkMedia);
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
    .map((node) => node.toString())
    .join('\n\n')}\n`;

  await writeFile(FILEPATH, formattedCss, 'utf8');
  console.log(`✅ Successfully wrote theme CSS to ${FILEPATH}`);
}

const parsedTheme = generateTheme(tokensFile);

console.log('🎨 Generated CSS Theme');

console.log(`💾 Writing theme CSS to ${FILEPATH}...`);
await buildCssFile(parsedTheme);
