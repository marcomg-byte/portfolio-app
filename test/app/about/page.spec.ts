import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import About from '@/app/about/page';

vi.mock('@/lib', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib')>();
  return {
    ...actual,
    useBreakpoints: () => ({
      isBelow: () => false,
      current: 'lg',
    }),
  };
});

afterEach(cleanup);

describe('About page', () => {
  it('renders the intro, profile image, and skills section', () => {
    render(createElement(About));

    expect(
      screen.getByRole('heading', {
        name: /Building scalable solutions that drive real impact\./,
      }),
    ).toBeDefined();
    expect(
      screen.getByText(/Software Engineer and Cloud Architect/),
    ).toBeDefined();
    expect(screen.getByAltText("Marco's Profile Photo")).toBeDefined();
    expect(
      screen.getByRole('heading', { name: 'Skills & Expertise' }),
    ).toBeDefined();
    expect(screen.getByText('JavaScript')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('GCP')).toBeDefined();
    expect(screen.getByText('Cybersecurity')).toBeDefined();
  });

  it('renders journey steps and current step content', () => {
    render(createElement(About));

    expect(screen.getByRole('heading', { name: 'My Journey' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'LearnAla' })).toBeDefined();
    expect(screen.getByRole('button', { name: /Consorcio/ })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Deloitte' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'IBM' })).toBeDefined();
    expect(
      screen.getByText('Web Development Intern at LearnAla'),
    ).toBeDefined();
  });

  it('renders expertise cards and beyond-code interests', () => {
    render(createElement(About));

    expect(screen.getByRole('heading', { name: 'What I do' })).toBeDefined();
    expect(
      screen.getByRole('heading', { name: /Design Systems/ }),
    ).toBeDefined();
    expect(
      screen.getByRole('heading', {
        name: 'Cloud Architecture (Google Cloud Platform)',
      }),
    ).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Beyond Code' })).toBeDefined();
    expect(screen.getByText('Reading')).toBeDefined();
    expect(screen.getByText('Gaming')).toBeDefined();
    expect(screen.getByText('Traveling')).toBeDefined();
  });
});
