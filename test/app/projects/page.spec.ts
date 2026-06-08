import { createElement } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Projects from '@/app/projects/page';

afterEach(cleanup);

describe('Projects page', () => {
  it('renders the project hero, filters, and initial project cards', () => {
    render(createElement(Projects));

    expect(screen.getByText('MY PROJECTS')).toBeDefined();
    expect(
      screen.getByRole('heading', { name: "Solutions I've built" }),
    ).toBeDefined();
    expect(screen.getByAltText('Server Room')).toBeDefined();
    expect(screen.getByRole('button', { name: 'All' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Backend' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Cybersecurity' })).toBeDefined();
    expect(
      screen.getByRole('button', { name: 'Web Applications' }),
    ).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    expect(
      screen.getByRole('heading', { name: 'Portfolio Website' }),
    ).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Offser' })).toBeDefined();
  });

  it('filters project cards by category and resets to all projects', () => {
    render(createElement(Projects));

    fireEvent.click(screen.getByRole('button', { name: 'Backend' }));
    expect(screen.getByRole('heading', { name: 'Offser' })).toBeDefined();
    expect(
      screen.queryByRole('heading', { name: 'Portfolio Website' }),
    ).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Web Applications' }));
    expect(
      screen.getByRole('heading', { name: 'Portfolio Website' }),
    ).toBeDefined();
    expect(screen.queryByRole('heading', { name: 'Offser' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(
      screen.getByRole('heading', { name: 'Portfolio Website' }),
    ).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Offser' })).toBeDefined();
  });

  it('renders the contact call to action and project links', () => {
    render(createElement(Projects));

    expect(
      screen.getByRole('heading', { name: 'Have an idea in mind?' }),
    ).toBeDefined();
    expect(
      screen.getByRole('link', { name: "LET'S CONNECT" }).getAttribute('href'),
    ).toBe('/contact');
    expect(screen.getByAltText('Desktop with iMacs Image')).toBeDefined();
    expect(
      screen.getAllByRole('button', { name: /View on GitHub/ }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole('button', { name: /Use case/ }).length,
    ).toBeGreaterThan(0);
  });
});
