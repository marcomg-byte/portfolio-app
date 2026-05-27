'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Page,
  Typography,
} from '@/components/ui';
import type { FooterAction } from '@/components/ui/atomics';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faArrowRotateBack,
  faEarth,
  faCode,
  faToolbox,
  faCloud,
  faServer,
  faShield,
  faBook,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

type Category =
  | 'All'
  | 'Backend'
  | 'Web Applications'
  | 'Cybersecurity'
  | 'Developer Tools'
  | 'Cloud & DevOps'
  | 'Libraries/Design Systems';

interface CategoryButton {
  name: Category;
  icon?: IconDefinition;
}

interface Project {
  actions: FooterAction[];
  category: Category[];
  adornment: {
    src: string;
    alt: string;
  };
  description: string;
  title: string;
  subtitle: string;
}

const categories: CategoryButton[] = [
  { name: 'All', icon: faEarth },
  { name: 'Backend', icon: faServer },
  { name: 'Cybersecurity', icon: faShield },
  { name: 'Web Applications', icon: faCode },
  { name: 'Developer Tools', icon: faToolbox },
  { name: 'Cloud & DevOps', icon: faCloud },
  { name: 'Libraries/Design Systems', icon: faBook },
];

const projects: Project[] = [
  {
    actions: [
      {
        label: 'View on GitHub',
        startAdornment: { src: '/images/github.png', alt: 'GitHub Logo' },
      },
      {
        label: 'Use case',
        startAdornment: { src: '/images/eyeglasses.png', alt: 'Usage Icon' },
      },
    ],
    adornment: { src: '/images/atom.png', alt: 'React Logo' },
    category: ['Web Applications'],
    description:
      'A modern web application built with React and Next.js, featuring a sleek design and seamless user experience.',
    title: 'Portfolio Website',
    subtitle: 'Web Application',
  },
  {
    actions: [
      {
        label: 'View on GitHub',
        startAdornment: { src: '/images/github.png', alt: 'GitHub Logo' },
      },
      {
        label: 'Use case',
        startAdornment: { src: '/images/eyeglasses.png', alt: 'Usage Icon' },
      },
    ],
    adornment: {
      src: '/images/cyber-security.png',
      alt: 'Cyber Security Image',
    },
    category: ['Backend', 'Cybersecurity'],
    description:
      'A TypeScript-powered Express.js server for sending emails via SMTP with robust validation, template rendering, advanced logging, modular architecture, and comprehensive error handling',
    title: 'Offser',
    subtitle: 'Server',
  },
];

export default function Projects() {
  const [selectedProjects, setSelectedProjects] = useState<Project[]>(projects);

  const handleCategorySelect = (category: Category) => {
    if (category === 'All') {
      setSelectedProjects(projects);
    } else {
      setSelectedProjects(
        projects.filter((project) => project.category.includes(category)),
      );
    }
  };

  const handleReset = () => {
    setSelectedProjects(projects);
  };

  return (
    <Page title="Projects">
      <div className="mg:flex mg:w-full mg:pb-4">
        <div className="mg:flex mg:flex-col mg:gap-1 mg:pt-6 mg:pl-6">
          <Typography
            removePadding
            className="mg:text-xl"
            color="secondary"
            variant="h1"
          >
            MY PROJECTS
          </Typography>
          <div className="mg:flex mg:flex-col mg:gap-2">
            <Typography removePadding variant="h1" className="mb-4">
              Solutions I&apos;ve built
            </Typography>
            <Typography variant="base" clamp={6}>
              A collection of projects that showcase my passion for building
              scalable systems, developer tooling and modern web applications
              with a strong focus on architecture, performance and usability.
            </Typography>
          </div>
        </div>
        <div className="mg:flex mg:w-full mg:pt-4 mg:px-4">
          <div className="mg:relative mg:w-full mg:aspect-video mg:rounded-full mg:overflow-hidden mg:transition-transform mg:duration-200 mg:hover:scale-105">
            <Image
              src="/images/site.jpg"
              alt="Server Room"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 300px"
              className="mg:object-cover mg:animate-fade-in mg:duration-500"
            />
          </div>
        </div>
      </div>
      <div className="mg:flex mg:flex-col mg:w-full mg:gap-2 mg:pt-4 mg:pb-6 mg:px-6">
        <div className="mg:flex mg:w-full mg:gap-4 mg:overflow-x-scroll">
          {categories.map((category, index) => (
            <Button
              key={`category-${index}`}
              variant="outline"
              startAdornment={category.icon}
              onClick={() => handleCategorySelect(category.name)}
            >
              {category.name}
            </Button>
          ))}
          <Button
            onClick={handleReset}
            startAdornment={faArrowRotateBack}
            variant="outline"
          >
            Reset
          </Button>
        </div>
        <div className="mg:flex mg:flex-wrap mg:w-full mg:gap-y-8 mg:gap-1 mg:justify-evenly mg:p-6 mg:overflow-auto">
          {selectedProjects.map((project, index) => (
            <Card key={`project-${index}`}>
              <CardHeader
                title={project.title}
                subtitle={project.subtitle}
                adornment={{
                  src: project.adornment.src,
                  alt: project.adornment.alt,
                }}
              />
              <CardFooter
                description={project.description}
                actions={project.actions.map((action) => ({
                  ...action,
                  variant: 'secondary',
                }))}
              />
            </Card>
          ))}
        </div>
      </div>
      <div className="mg:flex mg:w-full mg:items-center mg:justify-between mg:px-6 mg:pb-6">
        <div className="mg:flex mg:gap-8 mg:w-2/3">
          <Image
            width={160}
            height={160}
            src="/images/team-work.png"
            alt="Team Work Icon"
            className="mg:animate-fade-in mg:duration-500"
            style={{ width: 'auto', height: 'auto' }}
          />
          <div className="mg:flex mg:flex-col mg:gap-4 mg:grow">
            <Typography variant="h2">Have an idea in mind?</Typography>
            <Typography variant="base">
              I&apos;m always open to new opportunities and collaborations. If
              you have a project in mind or just want to chat about technology,
              feel free to reach out!
            </Typography>
          </div>
        </div>
        <Button
          endAdornment={faArrowRight}
          target="_blank"
          href="/contact"
          variant="outline"
        >
          LET&apos;S CONNECT
        </Button>
      </div>
    </Page>
  );
}
