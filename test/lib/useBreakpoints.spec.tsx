import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { useBreakpoints } from '@/lib/useBreakpoints';

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  });
};

beforeEach(() => {
  document.documentElement.style.fontSize = '16px';
  setViewportWidth(480);
});

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute('style');
});

describe('useBreakpoints', () => {
  it('resolves the current breakpoint from the viewport width', () => {
    setViewportWidth(1024);

    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.breakpoint).toBe('lg');
    expect(result.current.breakpoints.sm).toBe('40rem');
    expect(result.current.isAtLeast('md')).toBe(true);
    expect(result.current.isBelow('xl')).toBe(true);
  });

  it('updates when the viewport emits a resize event', () => {
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.breakpoint).toBe('xs');

    act(() => {
      setViewportWidth(1280);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.breakpoint).toBe('xl');
    expect(result.current.isAtLeast('lg')).toBe(true);
    expect(result.current.isBelow('xl')).toBe(false);
  });

  it('updates on orientation changes', () => {
    const { result } = renderHook(() => useBreakpoints());

    act(() => {
      setViewportWidth(768);
      window.dispatchEvent(new Event('orientationchange'));
    });

    expect(result.current.breakpoint).toBe('md');
  });
});
