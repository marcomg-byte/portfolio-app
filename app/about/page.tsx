import type { FC } from 'react';
import { Typography } from '@/components/ui';
import { Page } from '@/components/ui/components';
import Image from 'next/image';

interface SkillBadgeProps {
  altText: string;
  imageSrc: string;
  proficiency: string;
  skillName: string;
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

export default function About() {
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
    </Page>
  );
}
