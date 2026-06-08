import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Contact from '@/app/contact/page';

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

describe('Contact page', () => {
  it('renders the contact hero, value cards, and form shell', () => {
    render(createElement(Contact));

    expect(screen.getByText('GET IN TOUCH')).toBeDefined();
    expect(
      screen.getByRole('heading', {
        name: "Let's build something amazing together.",
      }),
    ).toBeDefined();
    expect(
      screen.getByRole('heading', { name: 'Quick Response' }),
    ).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Professional' })).toBeDefined();
    expect(
      screen.getByRole('heading', { name: 'Collaborative' }),
    ).toBeDefined();
    expect(screen.getByAltText('Rocket Icon')).toBeDefined();
    expect(
      screen.getByRole('heading', { name: 'Send a Message' }),
    ).toBeDefined();
    expect(
      screen.getByText(
        'Your information is safe with me. I will never share your data.',
      ),
    ).toBeDefined();
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'RESET' })).toBeDefined();
  });

  it('renders and updates the controlled message fields', () => {
    render(createElement(Contact));

    const name = screen.getByPlaceholderText('name') as HTMLInputElement;
    const email = screen.getByPlaceholderText('email') as HTMLInputElement;
    const subject = screen.getByPlaceholderText('subject') as HTMLInputElement;
    const message = screen.getByPlaceholderText(
      'Your Message',
    ) as HTMLTextAreaElement;

    fireEvent.change(name, { target: { value: 'Marco' } });
    fireEvent.change(email, { target: { value: 'marco@example.com' } });
    fireEvent.change(subject, { target: { value: 'Project' } });
    fireEvent.change(message, { target: { value: 'Hello there' } });

    expect(name.value).toBe('Marco');
    expect(email.value).toBe('marco@example.com');
    expect(subject.value).toBe('Project');
    expect(message.value).toBe('Hello there');
  });

  it('renders contact channels, availability items, and the projects CTA', () => {
    render(createElement(Contact));

    expect(
      screen.getByRole('heading', { name: 'Contact Information' }),
    ).toBeDefined();
    expect(screen.getByText("Here's how you can reach me")).toBeDefined();
    expect(screen.getByText('marcomg_777@outlook.com')).toBeDefined();
    expect(screen.getByText('+52 562 642 3205')).toBeDefined();
    expect(screen.getByText('Mexico City, Mexico')).toBeDefined();
    expect(
      screen.getByRole('link', { name: 'See linkedin profile' }),
    ).toBeDefined();
    expect(
      screen.getByRole('link', { name: 'See github profile' }),
    ).toBeDefined();
    expect(
      screen.getByRole('link', { name: 'See personal page' }),
    ).toBeDefined();
    expect(screen.getByText('Full Time Opportunities')).toBeDefined();
    expect(screen.getByText('Architecture advisory')).toBeDefined();
    expect(
      screen.getByRole('heading', { name: "Let's create impact" }),
    ).toBeDefined();
    expect(screen.getByRole('link', { name: 'PROJECTS' })).toBeDefined();
    expect(screen.getByAltText('Coding Image')).toBeDefined();
  });
});
