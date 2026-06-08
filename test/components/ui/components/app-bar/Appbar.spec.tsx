import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Appbar } from '@/components/ui/components/app-bar/Appbar';

const routeState = vi.hoisted(() => ({
  pathname: '/about',
  belowSm: false,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => routeState.pathname,
}));

vi.mock('@/lib', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib')>();
  return {
    ...actual,
    useBreakpoints: () => ({
      breakpoint: routeState.belowSm ? 'xs' : 'lg',
      breakpoints: {},
      isAtLeast: () => !routeState.belowSm,
      isBelow: (breakpoint: string) =>
        breakpoint === 'sm' ? routeState.belowSm : false,
    }),
  };
});

vi.mock('@/components/theme', () => ({
  Button: () => <button type="button">Theme</button>,
}));

const pages = [
  { text: 'About', href: '/about', variant: 'text' as const },
  { text: 'Projects', href: '/projects', variant: 'outline' as const },
  { text: 'External', href: 'https://example.com', target: '_blank' },
];

beforeEach(() => {
  routeState.pathname = '/about';
  routeState.belowSm = false;
});

afterEach(cleanup);

describe('Appbar', () => {
  it('renders desktop navigation and swaps the current route label to Home', () => {
    render(<Appbar pages={pages} data-testid="appbar" />);

    const appbar = screen.getByTestId('appbar');
    const home = screen.getByRole('link', { name: 'Home' });
    const projects = screen.getByRole('link', { name: 'Projects' });
    const external = screen.getByRole('link', { name: 'External' });

    expect(appbar.className).toContain('mg:bg-secondary');
    expect(home.getAttribute('href')).toBe('/');
    expect(projects.getAttribute('href')).toBe('/projects');
    expect(external.getAttribute('href')).toBe('https://example.com');
    expect(external.getAttribute('target')).toBe('_blank');
    expect(screen.getByRole('button', { name: 'Theme' })).toBeDefined();
  });

  it('renders non-current route text unchanged on desktop', () => {
    routeState.pathname = '/contact';

    render(<Appbar pages={pages} />);

    expect(
      screen.getByRole('link', { name: 'About' }).getAttribute('href'),
    ).toBe('/about');
    expect(screen.queryByRole('link', { name: 'Home' })).toBeNull();
  });

  it('opens and closes the mobile drawer navigation', () => {
    routeState.belowSm = true;

    const { container } = render(<Appbar pages={pages} />);

    const menuButton = container
      .querySelector('button svg[data-icon="bars"]')
      ?.closest('button') as HTMLButtonElement;

    expect(menuButton).toBeDefined();
    expect(screen.queryByRole('link', { name: 'Projects' })).toBeNull();

    fireEvent.click(menuButton);

    expect(
      screen.getByRole('link', { name: 'Home' }).getAttribute('href'),
    ).toBe('/');
    expect(screen.getByRole('link', { name: 'Projects' })).toBeDefined();

    fireEvent.click(
      container.querySelector('div[aria-hidden="true"]') as Element,
    );

    expect(screen.queryByRole('link', { name: 'Projects' })).toBeNull();
  });

  it('closes the mobile drawer from its close button', () => {
    routeState.belowSm = true;

    const { container } = render(<Appbar pages={pages} />);

    fireEvent.click(
      container
        .querySelector('button svg[data-icon="bars"]')
        ?.closest('button') as HTMLButtonElement,
    );

    const closeButton = container
      .querySelector('button svg[data-icon="xmark"]')
      ?.closest('button') as HTMLButtonElement;

    fireEvent.click(closeButton);

    expect(screen.queryByRole('link', { name: 'Projects' })).toBeNull();
  });

  it('applies custom class overrides', () => {
    render(
      <Appbar
        pages={pages}
        data-testid="appbar"
        classes={{
          root: 'custom-root',
          button: { button: 'custom-button' },
        }}
      />,
    );

    expect(screen.getByTestId('appbar').className).toContain('custom-root');
    expect(screen.getByRole('link', { name: 'Projects' }).className).toContain(
      'custom-button',
    );
  });
});
