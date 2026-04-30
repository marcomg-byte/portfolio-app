/**
 * Capitalizes the first character of a string.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} The input string with the first character in uppercase.
 *
 * @example
 * ```ts
 * capitalize('hello'); // 'Hello'
 * capitalize('world'); // 'World'
 * ```
 */
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export { capitalize };
