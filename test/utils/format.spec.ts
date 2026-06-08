import { describe, expect, it } from 'vitest';

import { capitalize } from '../../utils/format';

describe('capitalize', () => {
  it('capitalizes the first character of a lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('preserves the rest of the string casing', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });

  it('returns an empty string when the input is empty', () => {
    expect(capitalize('')).toBe('');
  });
});
