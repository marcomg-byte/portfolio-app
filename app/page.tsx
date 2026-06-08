import type { ReactNode } from 'react';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Carousel,
  Hero,
  Typography,
  CardMedia,
} from '@/components/ui/atomics';
import { Page } from '@/components/ui/components';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faStar,
  faHandsBubbles,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

interface CardData {
  title: string;
  subtitle?: ReactNode;
  badge?: IconDefinition;
}

const cards: CardData[] = [
  {
    title: 'Expertise',
    subtitle:
      'TypeScript, Node, React, Angular 2+, Java, C#, Spring Boot, Maven, Gradle, GCP, Docker, Kubernetes, Terraform...',
    badge: faStar,
  },
  {
    title: 'Innovation',
    subtitle:
      'Leading innovation at scale by designing cloud-native platforms, standardizing engineering practices, and empowering teams through robust design systems and architecture.',
    badge: faLightbulb,
  },
  {
    title: 'Experience',
    subtitle:
      '6+ years delivering high-impact solutions across complex systems, translating business needs into scalable, efficient, and maintainable software.',
    badge: faHandsBubbles,
  },
];

export default function Home() {
  return (
    <Page>
      <Hero
        autoPlay
        showControls={false}
        classes={{
          header: { title: 'mg:text-3xl mg:sm:text-4xl mg:lg:text-6xl' },
        }}
        header={{
          title: "Hello I'm",
          description: (
            <div className="mg:flex mg:flex-col mg:gap-3 mg:pb-3">
              <Typography
                className="mg:text-3xl mg:sm:text-4xl mg:lg:text-6xl"
                variant="h1"
                color="white"
                removePadding
              >
                Marco Antonio Melo
              </Typography>
              <Typography
                className="mg:text-xl mg:sm:text-2xl mg:lg:text-4xl"
                variant="h1"
                color="accent"
                removePadding
              >
                Cloud Architect * Full Stack Engineer * Pentester
              </Typography>
            </div>
          ),
          variant: 'h1',
          links: [
            { href: '/about', label: 'About Me', variant: 'secondary' },
            { href: '/projects', label: 'Projects', variant: 'secondary' },
            { href: '/contact', label: 'Contact', variant: 'secondary' },
          ],
        }}
        height="lg"
        images={[
          { src: '/images/banner.png', alt: 'Banner Image' },
          {
            src: '/images/notebook.jpg',
            alt: 'Notebook Image',
          },
          {
            src: '/images/technology.jpg',
            alt: 'Technology Image',
          },
        ]}
      />
      <div className="mg:flex mg:items-stretch mg:justify-start mg:sm:justify-center mg:w-full mg:gap-16 mg:overflow-x-scroll mg:scrollbar-subtle mg:p-6">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader
              badge={<Badge icon={card.badge} />}
              title={card.title}
              subtitle={card.subtitle}
            />
            <CardFooter
              actions={[
                {
                  label: 'See Profile',
                  href: 'https://www.linkedin.com/in/marco-antonio-melo-software-arch/',
                  target: '_blank',
                  startAdornment: {
                    src: '/images/linkedin.png',
                    alt: 'LinkedIn Icon',
                  },
                  variant: 'secondary',
                },
                {
                  label: 'See Projects',
                  href: 'https://github.com/marcomg-byte',
                  target: '_blank',
                  startAdornment: {
                    src: '/images/github.png',
                    alt: 'GitHub Icon',
                  },
                  variant: 'secondary',
                },
              ]}
            />
          </Card>
        ))}
      </div>
      <div className="mg:flex mg:flex-col mg:items-center mg:justify-center mg:w-full mg:bg-primary">
        <div className="mg:flex mg:flex-col mg:items-start mg:justify-center mg:w-full mg:gap-1 mg:px-6">
          <Typography variant="h2">Featured Projects</Typography>
          <Typography variant="base">A selection of my recent work</Typography>
        </div>
        <Carousel
          transitionDuration={50}
          transition="slide"
          enableSwipe
          slidesPerView={2}
          slidesPerGroup={2}
          loop
        >
          <Card>
            <CardMedia
              src="/images/pentest.jpg"
              alt="Server Image"
              aspectRatio="4:3"
              priority="eager"
            />
            <CardFooter
              title="Offser"
              subtitle="A TypeScript-powered Express.js server for sending emails via SMTP with robust validation, template rendering, advanced logging, modular architecture, and comprehensive error handling"
              actions={[
                {
                  label: 'See Package',
                  href: 'https://www.npmjs.com/package/offser',
                  target: '_blank',
                  startAdornment: {
                    src: '/images/npm.png',
                    alt: 'NPM Icon',
                  },
                  variant: 'secondary',
                },
                {
                  label: 'See Code',
                  href: 'https://github.com/marcomg-byte/offser',
                  target: '_blank',
                  startAdornment: {
                    src: '/images/github.png',
                    alt: 'GitHub Icon',
                  },
                  variant: 'secondary',
                },
              ]}
            />
          </Card>
          <Card>
            <CardMedia
              src="/images/suitcase.jpg"
              priority="eager"
              alt="Server Image"
              aspectRatio="4:3"
            />
            <CardFooter
              title="Portfolio App"
              subtitle="A personal portfolio website built with Next.js and TypeScript, showcasing my projects, skills, and experience in a clean and responsive design."
              actions={[
                {
                  label: 'See Code',
                  href: 'https://github.com/marcomg-byte/offser',
                  target: '_blank',
                  startAdornment: {
                    src: '/images/github.png',
                    alt: 'GitHub Icon',
                  },
                  variant: 'secondary',
                },
              ]}
            />
          </Card>
        </Carousel>
      </div>
    </Page>
  );
}
