'use client';
import { useState } from 'react';
import {
  Button,
  Form,
  Page,
  TextArea,
  TextInput,
  Typography,
} from '@/components/ui';
import type { FormValue } from '@/components/ui';
import Image from 'next/image';
import {
  faArrowRight,
  faCircle,
  faFile,
  faLock,
  faMailBulk,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rocket = () => (
  <div className="mg:relative mg:h-48">
    <div className="mg:absolute mg:-top-2 mg:left-10.5 mg:w-2 mg:h-2 mg:rounded-full mg:bg-indigo-400/80 mg:animate-particle-float" />
    <div
      className="mg:absolute mg:top-[39px] mg:right-1 mg:w-1.5 mg:h-1.5 mg:rounded-full mg:bg-amber-400/90 mg:animate-particle-drift"
      style={{ animationDelay: '0.7s' }}
    />
    <div
      className="mg:absolute mg:top-16.5 mg:right-[7px] mg:w-1 mg:h-1 mg:rounded-full mg:bg-sky-400/80 mg:animate-particle-float"
      style={{ animationDelay: '1.3s' }}
    />
    <div
      className="mg:absolute mg:-bottom-2 mg:left-10.5 mg:w-2 mg:h-2 mg:rounded-full mg:bg-amber-500/80 mg:animate-particle-drift"
      style={{ animationDelay: '0.3s' }}
    />
    <div
      className="mg:absolute mg:top-[131px] mg:left-1 mg:w-1.5 mg:h-1.5 mg:rounded-full mg:bg-violet-400/80 mg:animate-particle-float"
      style={{ animationDelay: '1.8s' }}
    />
    <div
      className="mg:absolute mg:top-[39px] mg:left-[5px] mg:w-1 mg:h-1 mg:rounded-full mg:bg-indigo-300/90 mg:animate-particle-drift"
      style={{ animationDelay: '1.0s' }}
    />
    <div className="mg:rounded-full mg:w-44 mg:h-44 mg:bg-primary-subtle mg:flex mg:items-center mg:justify-center mg:transition-transform mg:duration-500 mg:hover:scale-105">
      <Image
        src="/images/rocket.png"
        alt="Rocket Icon"
        width={240}
        height={240}
        priority
        sizes="(max-width: 768px) 100vw, 300px"
        className="mg:object-cover mg:animate-rocket-fly"
      />
    </div>
  </div>
);

interface SkillCardProps {
  description?: string;
  image?: { src: string; alt?: string };
  title?: string;
}

const SkillCard = ({ description, image, title }: SkillCardProps) => (
  <div className="mg:flex mg:flex-col mg:p-4 mg:gap-2 mg:justify-start mg:rounded-lg mg:bg-secondary mg:shadow-lg mg:shadow-black/20 mg:transition-transform mg:duration-500 mg:hover:scale-105">
    <Image
      src={image?.src || ''}
      alt={image?.alt || ''}
      width={80}
      height={80}
      className="mg:object-contain mg:-ml-1 mg:animate-fade-in"
    />
    <div className="mg:flex mg:flex-col mg:gap-1 mg:max-w-24">
      <Typography removePadding bold className="mg:text-white" variant="h4">
        {title}
      </Typography>
      <Typography removePadding className="mg:text-white" variant="base">
        {description}
      </Typography>
    </div>
  </div>
);

const skills: SkillCardProps[] = [
  {
    description: 'I usually reply within 24 hours',
    image: { src: '/images/responsibility.png', alt: 'Responsiility Image' },
    title: 'Quick Response',
  },
  {
    description: 'Clear communication and reliable follow-up',
    image: { src: '/images/badge.png', alt: 'Badge Image' },
    title: 'Professional',
  },
  {
    description: 'Open to new ideas and meaningful parternships',
    image: { src: '/images/deal.png', alt: 'Deal Image' },
    title: 'Collaborative',
  },
];

interface ContactCardProps {
  image?: { src: string; alt?: string };
  text?: string;
  title?: string;
}

const ContactCard = ({ image, text, title }: ContactCardProps) => (
  <div className="mg:flex mg:gap-3 mg:transition-transform mg:duration-500 mg:hover:scale-105">
    <Image
      src={image?.src || ''}
      alt={image?.alt || ''}
      width={32}
      height={32}
      style={{ width: '32px', height: '32px' }}
      className="mg:object-contain mg:animate-fade-in mg:transition-transform mg:duration-500 mg:hover:scale-110"
    />
    <div className="mg:flex mg:flex-col mg:gap-1">
      <Typography bold className="mg:text-white" removePadding variant="h4">
        {title}
      </Typography>
      <Typography className="mg:text-white" removePadding variant="base">
        {text}
      </Typography>
    </div>
  </div>
);

const contactCards: ContactCardProps[] = [
  {
    image: { src: '/images/mail.png', alt: 'Mail Icon' },
    text: 'marcomg_777@outlook.com',
    title: 'Email',
  },
  {
    image: { src: '/images/telephone.png', alt: 'Telephone Icon' },
    text: '+52 562 642 3205',
    title: 'Phone',
  },
  {
    image: { src: '/images/location.png', alt: 'Loaction Mark Icon' },
    text: 'Mexico City, Mexico',
    title: 'Location',
  },
  {
    image: { src: '/images/linkedin-outline.png', alt: 'LinkedIn Icon' },
    text: 'https://www.linkedin.com/in/marco-antonio-melo-software-arch/',
    title: 'LinkedIn',
  },
  {
    image: { src: '/images/github.png', alt: 'Github Icon' },
    text: 'https://github.com/marcomg-byte',
    title: 'Github',
  },
  {
    image: { src: '/images/internet.png', alt: 'Internet Icon' },
    text: 'marcoantoniomelo.dev',
    title: 'Website',
  },
];

export default function Contact() {
  const [values, setValues] = useState<FormValue[]>([]);
  const [error, setError] = useState<boolean>(false);

  return (
    <Page title="Contact">
      <div className="mg:flex mg:justify-between mg:gap-2 mg:w-full mg:pt-6 mg:px-6 mg:pb-4 mg:overflow-x-hidden">
        <div className="mg:flex mg:flex-col mg:gap-2 mg:w-2/3">
          <div className="mg:flex mg:flex-col mg:gap-1 mg:w-full">
            <Typography
              className="mg:text-xl"
              color="accent"
              variant="h2"
              removePadding
            >
              GET IN TOUCH
            </Typography>
            <Typography className="mg:pb-1" removePadding variant="h1">
              Let&apos;s build something amazing{' '}
              <span className="mg:text-accent">together</span>.
            </Typography>
          </div>
          <Typography variant="base">
            I&apos;m always open to discussing new opportunities, interesting
            projcts or just having achat about technology and architecture.
          </Typography>
          <div className="mg:flex mg:gap-3 mg:items-center mg:w-full mg:mt-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={`skill-${index}`}
                description={skill.description}
                image={skill.image}
                title={skill.title}
              />
            ))}
          </div>
        </div>
        <Rocket />
      </div>
      <hr className="mg:w-9/10 mg:h-2px mg:bg-accent mg:mt-3 mg:mb-6" />
      <div className="mg:flex mg:justify-between mg:gap-8 mg:px-6 mg:pb-6 mg:w-full">
        <div className="mg:flex mg:flex-col mg:rounded-lg mg:bg-secondary mg:w-2/3 mg:shadow-lg mg:shadow-black/20">
          <Form
            adornmentColor="white"
            color="white"
            onChange={(val, err) => {
              setValues(val);
              setError(err);
            }}
            disclaimer={{
              adornment: faLock,
              text: 'Your information is safe with me. I will never share your data.',
            }}
            error={error}
            startAdornment={faPerson}
            title="Send a Message"
            value={values}
          >
            <div className="mg:w-full mg:bg-inherit mg:flex mg:gap-4 mg:justify-between">
              <TextInput
                adornmentColor="white"
                pattern={/[0-9]+/}
                fullWidth
                label="name"
                name="name"
                required
                color="white"
                placeholder="name"
                startAdornment={faPerson}
              />
              <TextInput
                adornmentColor="white"
                fullWidth
                label="mail"
                name="mail"
                required
                color="white"
                placeholder="email"
                showPasswordToggle
                startAdornment={faMailBulk}
              />
            </div>
            <TextInput
              adornmentColor="white"
              fullWidth
              label="subject"
              name="subject"
              required
              color="white"
              placeholder="subject"
              showPasswordToggle
              startAdornment={faFile}
            />
            <TextArea
              adornmentColor="white"
              clearable
              color="white"
              fullWidth
              label="message"
              name="message"
              placeholder="Your Message"
              required
            />
          </Form>
        </div>
        <div className="mg:flex mg:flex-col mg:rounded-lg mg:p-4 mg:bg-secondary mg:w-2/3 mg:shadow-lg mg:shadow-black/20">
          <div className="mg:flex mg:flex-col mg:gap-2 mg:pb-4 mg:w-full">
            <div className="mg:flex mg:items-end mg:gap-2 mg:w-full">
              <Image
                src="/images/contact.png"
                alt="Contact Icon"
                width={32}
                height={32}
                className="mg:object-contain mg:animate-fade-in mg:transition-transform mg:duration-500 mg:hover:scale-110"
              />
              <Typography
                removePadding
                className="mg:text-white mg:text-xl"
                variant="h2"
              >
                Contact Information
              </Typography>
            </div>
            <Typography removePadding className="mg:text-white" variant="base">
              Here&apos;s how you can reach me
            </Typography>
          </div>
          <div className="mg:flex mg:flex-col mg:gap-4 mg:w-full">
            {contactCards.map((card, index) => (
              <ContactCard
                image={card.image}
                key={`card-${index}`}
                text={card.text}
                title={card.title}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mg:flex mg:gap-4 mg:w-full mg:p-6">
        <div className="mg:flex mg:flex-col mg:gap-3 mg:pr-2 mg:w-1/3">
          <div className="mg:flex mg:flex-col mg:gap-4">
            <div className="mg:flex mg:gap-3">
              <Image
                src="/images/target.png"
                alt="Target Icon"
                width={48}
                height={48}
                style={{ width: '48px', height: '48px' }}
                className="mg:object-contain mg:animate-fade-in mg:duration-500 mg:pt-2"
              />
              <Typography color="primary" removePadding variant="h2">
                Let&apos;s create impact
              </Typography>
            </div>
            <Typography
              align="justify"
              color="primary"
              clamp={8}
              removePadding
              variant="base"
            >
              I&apos;m passionate about solving complex problems and building
              scalable, secure and maintainable systems that make a difference.
            </Typography>
            <Typography
              align="justify"
              color="primary"
              clamp={8}
              removePadding
              variant="base"
            >
              Whether you have a project in mind, need technichal consultation
              or just want to connect, I&apos;d love to hear from you.
            </Typography>
            <div className="mg:flex">
              <Button
                endAdornment={faArrowRight}
                href="/projects"
                variant="outline"
              >
                PROJECTS
              </Button>
            </div>
          </div>
        </div>
        <div className="mg:flex mg:w-1/3">
          <div className="mg:relative mg:w-full mg:aspect-square mg:rounded-full mg:overflow-hidden mg:transition-transform mg:duration-200 mg:hover:scale-105">
            <Image
              src="/images/coding.jpg"
              alt="Coding Image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 300px"
              className="mg:object-cover mg:animate-fade-in mg:duration-500"
            />
          </div>
        </div>
        <div className="mg:flex mg:flex-col mg:pl-2 mg:w-1/3">
          <div className="mg:flex mg:gap-3">
            <FontAwesomeIcon
              icon={faCircle}
              className="mg:text-lg mg:text-success mg:pt-4 mg:animate-fade-in mg:duration-500"
            />
            <Typography color="primary" removePadding variant="h2">
              Currently available for
            </Typography>
          </div>
        </div>
      </div>
    </Page>
  );
}
