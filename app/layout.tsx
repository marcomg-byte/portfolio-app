import type { Metadata } from 'next';
import { Appbar } from '@/components/ui';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Marco Antonio Melo',
  description:
    'Explore Marco’s portfolio of responsive web projects, frontend experiments, and software development work.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mg:h-full mg:antialiased">
      <body className="mg:min-h-full mg:flex mg:flex-col mg:bg-primary">
        <Appbar
          pages={[
            { text: 'About', href: '/about' },
            { text: 'Projects', href: '/projects' },
            { text: 'Contact', href: '/contact' },
            {
              text: 'Resume',
              href: '/files/CV.pdf',
              target: '_blank',
              variant: 'outline',
            },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
