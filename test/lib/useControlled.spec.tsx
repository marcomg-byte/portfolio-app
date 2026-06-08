import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useControlled } from '@/lib/useControlled';

describe('useControlled', () => {
  it('uses defaultValue and updates internal state when uncontrolled', () => {
    const { result } = renderHook(() =>
      useControlled<string>({ defaultValue: 'initial' }),
    );

    expect(result.current[0]).toBe('initial');

    act(() => {
      result.current[1]('next');
    });

    expect(result.current[0]).toBe('next');
  });

  it('uses the controlled value and ignores internal setter updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControlled<string>({ defaultValue: 'initial', value }),
      { initialProps: { value: 'controlled' } },
    );

    expect(result.current[0]).toBe('controlled');

    act(() => {
      result.current[1]('ignored');
    });

    expect(result.current[0]).toBe('controlled');

    rerender({ value: 'external update' });

    expect(result.current[0]).toBe('external update');
  });

  it('treats undefined value as uncontrolled', () => {
    const { result } = renderHook(() =>
      useControlled<number>({ defaultValue: 1, value: undefined }),
    );

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
  });
});
