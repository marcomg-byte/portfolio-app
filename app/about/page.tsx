'use client';
import type { FC } from 'react';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  Page,
  ProgressStepper,
  Step,
  Typography,
} from '@/components/ui';
import type { StepType } from '@/components/ui';
import {
  faCode,
  faLightbulb,
  faMobile,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface SkillBadgeProps {
  altText: string;
  imageSrc: string;
  proficiency: string;
  skillName: string;
}

interface KeySkillCard {
  adornment: { alt?: string; src: string };
  description: string;
  title: string;
}

interface HobbyCard {
  adornment: { alt?: string; src: string };
  title: string;
}

const SkillBadge: FC<SkillBadgeProps> = ({
  altText,
  imageSrc,
  proficiency,
  skillName,
}) => (
  <div className="mg:flex mg:items-center mg:gap-2 mg:rounded-lg mg:shadow-lg mg:transition-transform mg:duration-200 mg:hover:scale-105">
    <div className="mg:flex mg:py-1 mg:pl-1.5">
      <div className="mg:relative mg:w-10 mg:h-10">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="40px"
          priority
          className="mg:object-contain mg:animate-fade-in"
        />
      </div>
    </div>
    <div className="mg:flex mg:flex-col mg:pt-0.5 mg:pb-1 mg:pr-1.5 mg:gap-0.5">
      <Typography className="mg:text-lg" bold removePadding variant="h3">
        {skillName}
      </Typography>
      <Typography removePadding variant="base">
        {proficiency}
      </Typography>
    </div>
  </div>
);

const HobbyCard: FC<HobbyCard> = ({ adornment, title }) => (
  <div className="mg:flex mg:flex-col mg:items-center mg:justify-center mg:gap-2 mg:p-3 mg:rounded-lg mg:shadow-xl mg:transition-transform mg:duration-200 mg:hover:scale-105 mg:min-w-24 mg:bg-secondary">
    <Typography className="mg:text-white" variant="base">
      {title}
    </Typography>
    <Image
      src={adornment.src || ''}
      alt={adornment.alt || ''}
      width={40}
      height={40}
      className="mg:object-contain"
    />
  </div>
);

const hobbies: HobbyCard[] = [
  {
    adornment: { src: '/images/reading.png', alt: 'Reading Icon' },
    title: 'Reading',
  },
  {
    adornment: { src: '/images/console.png', alt: 'Video Games Icon' },
    title: 'Gaming',
  },
  {
    adornment: { src: '/images/film-reel.png', alt: 'Film reel Icon' },
    title: 'Movies',
  },
  {
    adornment: { src: '/images/traveling.png', alt: 'Travel Icon' },
    title: 'Traveling',
  },
  {
    adornment: { src: '/images/weight.png', alt: 'Weight Icon' },
    title: 'Sports & Fitness',
  },
];

const skills: SkillBadgeProps[] = [
  {
    altText: 'JavaScript Logo',
    imageSrc: '/images/javascript.png',
    proficiency: 'Expert',
    skillName: 'JavaScript',
  },
  {
    altText: 'TypeScript Logo',
    imageSrc: '/images/typescript.png',
    proficiency: 'Expert',
    skillName: 'TypeScript',
  },
  {
    altText: 'React Logo',
    imageSrc: '/images/atom.png',
    proficiency: 'Expert',
    skillName: 'React',
  },
  {
    altText: 'Node.js Logo',
    imageSrc: '/images/nodejs.png',
    proficiency: 'Expert',
    skillName: 'Node.js',
  },
  {
    altText: 'GCP Logo',
    imageSrc: '/images/google-cloud.png',
    proficiency: 'Architect',
    skillName: 'GCP',
  },
  {
    altText: 'Java Logo',
    imageSrc: '/images/java.png',
    proficiency: 'Expert',
    skillName: 'Java',
  },
  {
    altText: 'C# Logo',
    imageSrc: '/images/c-sharp.png',
    proficiency: 'Expert',
    skillName: 'C#',
  },
  {
    altText: 'C++ Logo',
    imageSrc: '/images/cpp.png',
    proficiency: 'Advanced',
    skillName: 'C++',
  },
  {
    altText: 'C Logo',
    imageSrc: '/images/c-lang.png',
    proficiency: 'Advanced',
    skillName: 'C',
  },
  {
    altText: 'Python Logo',
    imageSrc: '/images/python.png',
    proficiency: 'Expert',
    skillName: 'Python',
  },
  {
    altText: 'Bash Logo',
    imageSrc: '/images/gnu-bash.png',
    proficiency: 'Expert',
    skillName: 'Bash',
  },
  {
    altText: 'PowerShell Logo',
    imageSrc: '/images/powershell.png',
    proficiency: 'Expert',
    skillName: 'PowerShell',
  },
  {
    altText: 'Cybersecurity Image',
    imageSrc: '/images/cyber-security.png',
    proficiency: 'Expert',
    skillName: 'Cybersecurity',
  },
];

const keySkills: KeySkillCard[] = [
  {
    title: 'FrontEnd & Design Systems',
    description:
      'React, React Native, Redux, Tailwind CSS, TypeScript, JavaScript, Design Systems, Component Governance,Accessibility Standards.',
    adornment: {
      src: '/images/web-programming.png',
      alt: 'Web Programming Icon',
    },
  },
  {
    title: 'Backend & Platform Engineering',
    description:
      'Node.js, REST APIs, GraphQL, Backend Platform Services, API Design, Data Modeling, Input Validation, Error Handling, Logging.',
    adornment: {
      src: '/images/backend.png',
      alt: 'Backend Programming Icon',
    },
  },
  {
    title: 'Developer & Tooling Automation',
    description:
      'ESLint, Custom ESLint Plugins, AST Parsing, Codemods, MCP Server, Developer Tooling Platforms, Monorepos (Lerna), Git.',
    adornment: {
      src: '/images/tooling.png',
      alt: 'Tooling Automation Icon',
    },
  },
  {
    title: 'CI/CD & Engineering Producivity',
    description:
      'CI/CD Pipelines, Automated Code Quality Gates, Static Analysis, Organizational Standards Enforcement.',
    adornment: {
      src: '/images/devops.png',
      alt: 'CI/CD Icon',
    },
  },
  {
    title: 'Cloud Architecture (Google Cloud Platform)',
    description:
      'Google Cloud Platform (GCP), Cloud-Native Architecture, Microservices, Load Balancing, IAM, VPC Networking, Cloud Storage, Managed Databases, High Availability & Scalability, Cost Optimization.',
    adornment: {
      src: '/images/server.png',
      alt: 'Cloud Architecture Icon',
    },
  },
  {
    title: 'Security & Secure Engineering',
    description:
      'Authentication & Authorization, JWT, Cryptography, Secure Coding Practices, Web Security (XSS, CSRF, SSRF), Infrastructure Security, Threat Modeling.',
    adornment: {
      src: '/images/secure-engineering.png',
      alt: 'Security & Secure Engineering Icon',
    },
  },
  {
    title: 'Observability & Reliability',
    description:
      'Logging, Monitoring, Alerting, Reliability Engineering, Fault Tolerance.',
    adornment: {
      src: '/images/monitoring.png',
      alt: 'Observability & Reliability Icon',
    },
  },
  {
    title: 'Data & Persitence',
    description:
      'PL/SQL, NoSQL (MongoDB), Managed Databases, Data Integrity, Secure Data Access.',
    adornment: {
      src: '/images/database.png',
      alt: 'Data & Persistence Icon',
    },
  },
  {
    title: 'Cross-Platform & Mobile',
    description: 'React Native, Expo, Mobile Security Best Practices.',
    adornment: {
      src: '/images/mobile-app.png',
      alt: 'Cross-Platform & Mobile Icon',
    },
  },
  {
    title: 'Systems & Networking Fundamentals',
    description:
      'Linux, TCP/IP, DNS, HTTP/HTTPS, Network Infrastructure Concepts.',
    adornment: {
      src: '/images/computer.png',
      alt: 'Systems & Networking Fundamentals Icon',
    },
  },
  {
    title: 'Architecture & Leadership Practices',
    description:
      'System Design, Technical Governance, Platform Strategy, Developer Experience (DX), Cross-Team Enablement, Mentorship.',
    adornment: {
      src: '/images/blueprints.png',
      alt: 'Architecture & Leadership Practices Icon',
    },
  },
];

export default function About() {
  const [activeStep, setActiveStep] = useState<StepType>({});
  const [completed, setCompleted] = useState<boolean>(false);

  return (
    <Page>
      <div className="mg:flex mg:justify-center mg:items-start mg:w-full">
        <div className="mg:flex mg:flex-col mg:justify-center mg:items-start mg:grow mg:gap-2 mg:p-6">
          <Typography clamp={5} variant="h2">
            Building scalable solutions that drive <br />
            <span className="mg:text-secondary">real impact.</span>
          </Typography>
          <Typography clamp={5} className="mg:text-lg" variant="base">
            Software Engineer and Cloud Architect with 6+ years of experience in
            distributed systems, cloud-native architectures, and full-stack
            development. Passionate about building scalable platforms, improving
            developer experience, and delivering high-quality software at scale.
          </Typography>
        </div>
        <div className="mg:flex mg:w-full mg:p-6">
          <div className="mg:relative mg:w-full mg:bg-secondary-subtle mg:rounded-full mg:aspect-square mg:transition-transform mg:duration-200 mg:hover:scale-105">
            <Image
              src="/images/profile-photo.png"
              alt="Marco's Profile Photo"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 300px"
              className="mg:object-cover mg:animate-fade-in"
            />
          </div>
        </div>
      </div>
      <div className="mg:flex mg:justify-start mg:items-center mg:w-full mg:px-6 mg:pb-2">
        <Typography color="secondary" variant="h2" className="mg:text-2xl">
          Skills & Expertise
        </Typography>
      </div>
      <div className="mg:flex mg:justify-evenly mg:items-center mg:w-full mg:py-3 mg:px-6 mg:gap-4 mg:overflow-scroll">
        {skills.map((skill, index) => (
          <SkillBadge key={`skill-${index + 1}`} {...skill} />
        ))}
      </div>
      <div className="mg:flex mg:flex-col mg:gap-2 mg:w-full mg:px-6 mg:py-3">
        <Typography variant="h2">My Journey</Typography>
        <Typography className="mg:text-lg" clamp={4} variant="base">
          My path in tech has been driven by curiosity, constant learning and a
          passion for solving complex problems. From building secure systems to
          improving developer experience, and meaning digital infrastructure. I
          focus on creating value that scales.
        </Typography>
      </div>
      <div className="mg:flex mg:w-full">
        <ProgressStepper
          activeStep={activeStep}
          defaultStep={1}
          completed={completed}
          onComplete={(value) => setCompleted(value)}
          onInit={(step) => setActiveStep(step)}
          onStepClick={(_event, step) => setActiveStep(step)}
          orientation="horizontal"
        >
          <Step
            icon={faCode}
            label="LearnAla"
            title="Web Development Intern at LearnAla"
            description={
              <Typography variant="base" clamp={10}>
                Front End Developer with hands-on experience building
                interactive and data-driven user interfaces for a Learning
                Management System (LMS) using React. Focused on translating
                complex mathematical concepts into intuitive visual experiences
                through dynamic charts, equation rendering, and responsive UI
                components.
              </Typography>
            }
          />
          <Step
            icon={faMobile}
            label="Consorcio Jurídico"
            title="Mobile Full Stack Engineer at Consorcio Jurídico"
            description={
              <>
                <Typography variant="base" clamp={8}>
                  Mobile / Full Stack Developer with end-to-end ownership of a
                  cross-platform mobile application built with React Native and
                  Expo, backed by a secure Node.js REST API and a SQL Server
                  data
                </Typography>
                <Typography variant="base" clamp={10}>
                  Experienced in designing scalable mobile and backend
                  architectures, applying security best practices, and
                  delivering production-ready systems with a strong focus on
                  reliability, maintainability, and performance.
                </Typography>
              </>
            }
          />
          <Step
            icon={faShield}
            label="Deloitte"
            title="Risk Advisor at Deloitte"
            description={
              <>
                <Typography variant="base" clamp={8}>
                  Penetration Tester with experience conducting offensive
                  security assessments across banking, retail, energy,
                  insurance, and government environments.
                </Typography>
                <Typography variant="base" clamp={10}>
                  Combined real-world attack simulation with internal lab
                  development to continuously sharpen exploitation techniques
                  and validate detection and remediation strategies. Specialized
                  in infrastructure, web, and binary exploitation, delivering
                  actionable risk assessments grounded in realistic threat
                  models.
                </Typography>
              </>
            }
          />
          <Step
            icon={faLightbulb}
            label="IBM"
            title="Application Developer at IBM"
            description={
              <>
                <Typography variant="base" clamp={8}>
                  Full Stack Engineer who led the maintenance, evolution, and
                  governance of a companywide React and Tailwind design system,
                  operating at the intersection of frontend architecture,
                  backend developer platforms, and organizational standards.
                </Typography>
                <Typography variant="base" clamp={8}>
                  Drove multi-quarter initiatives that established enforceable
                  governance, enabled safe large-scale migrations, and scaled
                  consistent UI and architectural patterns across dozens of
                  repositories and teams.
                </Typography>
              </>
            }
          />
        </ProgressStepper>
      </div>
      <div className="mg:flex mg:flex-col mg:pb-6 mg:w-full mg:px-6">
        <Typography variant="h2">What I do</Typography>
        <div className="mg:flex mg:gap-6 mg:py-6 mg:w-full mg:overflow-x-scroll">
          {keySkills.map((skill, index) => (
            <Card key={`card-${index + 1}`}>
              <CardHeader adornment={skill.adornment} title={skill.title} />
              <CardFooter description={skill.description} />
            </Card>
          ))}
        </div>
      </div>
      <div className="mg:flex mg:flex-col mg:gap-2 mg:w-full mg:px-6 mg:pb-3">
        <Typography variant="h2">Beyond Code</Typography>
        <Typography variant="base">
          I&apos;m passionate about learning, sharing knowledge and building
          things that make a difference. When I&apos;m not coding, you can find
          me exploring new technologies, reading or watching a good movie, or
          spending time outdoors
        </Typography>
        <div className="mg:flex mg:w-full mg:gap-2 mg:py-3 mg:overflow-x-scroll">
          {hobbies.map((hobby, index) => (
            <HobbyCard
              key={`hobby-card-${index + 1}`}
              adornment={hobby.adornment}
              title={hobby.title}
            />
          ))}
        </div>
      </div>
    </Page>
  );
}
