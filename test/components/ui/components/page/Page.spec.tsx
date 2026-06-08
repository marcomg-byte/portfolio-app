import { afterEach, describe, expect, it } from 'vitest';
import { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Page } from '@/components/ui/components/page/Page';

afterEach(cleanup);

describe('Page', () => {
  it('renders children inside a main landmark with default layout classes', () => {
    render(
      <Page data-testid="page">
        <h1>Portfolio</h1>
      </Page>,
    );

    const page = screen.getByRole('main');

    expect(page.tagName).toBe('MAIN');
    expect(page.className).toContain('mg:flex');
    expect(page.className).toContain('mg:flex-col');
    expect(page.className).toContain('mg:bg-primary');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Portfolio' }),
    ).toBeDefined();
  });

  it('applies secondary and subtle color variants', () => {
    const { rerender } = render(<Page color="secondary">Secondary page</Page>);

    expect(screen.getByRole('main').className).toContain('mg:bg-secondary');

    rerender(<Page color="subtle">Subtle page</Page>);

    expect(screen.getByRole('main').className).toContain('mg:bg-subtle');
  });

  it('forwards standard main attributes and refs', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Page id="content" aria-label="Main content" ref={ref}>
        Content
      </Page>,
    );

    const page = screen.getByRole('main', { name: 'Main content' });

    expect(page.getAttribute('id')).toBe('content');
    expect(ref.current).toBe(page);
  });
});
