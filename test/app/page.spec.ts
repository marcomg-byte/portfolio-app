import { createElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '@/app/page';

const emblaState = vi.hoisted(() => ({
  selected: 0,
  snaps: [0, 1],
  ref: vi.fn(),
  api: {
    on: vi.fn(),
    off: vi.fn(),
    reInit: vi.fn(),
    scrollNext: vi.fn(),
    scrollPrev: vi.fn(),
    scrollTo: vi.fn((index: number) => {
      emblaState.selected = index;
    }),
    scrollSnapList: vi.fn(() => emblaState.snaps),
    selectedScrollSnap: vi.fn(() => emblaState.selected),
  },
}));

vi.mock('embla-carousel-react', () => ({
  default: vi.fn(() => [emblaState.ref, emblaState.api]),
}));

vi.mock('embla-carousel-fade', () => ({
  default: vi.fn(() => ({ name: 'fade' })),
}));

beforeEach(() => {
  emblaState.selected = 0;
  Object.values(emblaState.api).forEach((method) => {
    method.mockClear();
  });
});

afterEach(cleanup);

describe('Home page', () => {
  it('renders the hero profile content and primary navigation actions', () => {
    render(createElement(Home));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Marco Antonio Melo' }),
    ).toBeDefined();
    expect(
      screen.getByText('Cloud Architect * Full Stack Engineer * Pentester'),
    ).toBeDefined();
    expect(screen.getByRole('link', { name: 'About Me' })).toBeDefined();
    expect(
      screen.getAllByRole('link', { name: 'Projects' }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: 'Contact' }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByAltText('Banner Image')).toBeDefined();
  });

  it('renders the expertise summary cards with media and actions', () => {
    render(createElement(Home));

    expect(screen.getByRole('heading', { name: 'Expertise' })).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Innovation' })).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeDefined();
    expect(screen.getByAltText('Notebook Image')).toBeDefined();
    expect(screen.getByAltText('Technology Image')).toBeDefined();
    expect(
      screen.getAllByRole('link', { name: /See Profile/ }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('link', { name: /See Projects/ }).length,
    ).toBeGreaterThan(0);
  });

  it('renders featured project slides and project actions', () => {
    render(createElement(Home));

    expect(
      screen.getByRole('heading', { name: 'Featured Projects' }),
    ).toBeDefined();
    expect(screen.getByText('A selection of my recent work')).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Offser' })).toBeDefined();
    expect(
      screen.getByRole('heading', { name: 'Portfolio App' }),
    ).toBeDefined();
    expect(screen.getByRole('link', { name: /See Package/ })).toBeDefined();
    expect(
      screen.getAllByRole('link', { name: /See Code/ }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByAltText('Server Image').length).toBeGreaterThan(0);
  });
});
