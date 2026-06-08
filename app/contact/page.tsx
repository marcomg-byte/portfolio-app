'use client';
import { useState } from 'react';
import {
  Button,
  Form,
  Page,
  Link,
  List,
  ListItem,
  TextArea,
  TextInput,
  Typography,
} from '@/components/ui';
import type { FormValue } from '@/components/ui';
import Image from 'next/image';
import {
  faArrowRight,
  faCheckCircle,
  faCircle,
  faFile,
  faLock,
  faMailBulk,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Rocket = () => (
  <div className="mg:relative mg:flex mg:h-36 mg:w-full mg:max-w-48 mg:shrink-0 mg:items-center mg:justify-center mg:self-center mg:overflow-visible mg:sm:h-44 mg:sm:max-w-56 mg:md:h-48 mg:md:max-w-52 mg:md:self-start">
    <div className="mg:absolute mg:top-0 mg:left-8 mg:w-1.5 mg:h-1.5 mg:rounded-full mg:bg-indigo-400/80 mg:animate-particle-float mg:sm:-top-2 mg:sm:left-10.5 mg:sm:w-2 mg:sm:h-2" />
    <div
      className="mg:absolute mg:top-8 mg:right-6 mg:w-1.5 mg:h-1.5 mg:rounded-full mg:bg-amber-400/90 mg:animate-particle-drift mg:sm:top-[39px] mg:sm:right-1"
      style={{ animationDelay: '0.7s' }}
    />
    <div
      className="mg:absolute mg:hidden mg:top-16.5 mg:right-[7px] mg:w-1 mg:h-1 mg:rounded-full mg:bg-sky-400/80 mg:animate-particle-float mg:sm:block"
      style={{ animationDelay: '1.3s' }}
    />
    <div
      className="mg:absolute mg:bottom-0 mg:left-8 mg:w-1.5 mg:h-1.5 mg:rounded-full mg:bg-amber-500/80 mg:animate-particle-drift mg:sm:-bottom-2 mg:sm:left-10.5 mg:sm:w-2 mg:sm:h-2"
      style={{ animationDelay: '0.3s' }}
    />
    <div
      className="mg:absolute mg:hidden mg:top-[131px] mg:left-1 mg:w-1.5 mg:h-1.5 mg:rounded-full mg:bg-violet-400/80 mg:animate-particle-float mg:sm:block"
      style={{ animationDelay: '1.8s' }}
    />
    <div
      className="mg:absolute mg:hidden mg:top-[39px] mg:left-[5px] mg:w-1 mg:h-1 mg:rounded-full mg:bg-indigo-300/90 mg:animate-particle-drift mg:sm:block"
      style={{ animationDelay: '1.0s' }}
    />
    <div className="mg:rounded-full mg:w-32 mg:h-32 mg:bg-primary-subtle mg:flex mg:items-center mg:justify-center mg:transition-transform mg:duration-500 mg:hover:scale-105 mg:sm:w-40 mg:sm:h-40 mg:md:w-44 mg:md:h-44">
      <Image
        src="/images/rocket.png"
        alt="Rocket Icon"
        width={240}
        height={240}
        preload
        sizes="(max-width: 640px) 7rem, (max-width: 768px) 9rem, 11rem"
        className="mg:w-28 mg:h-28 mg:object-contain mg:animate-rocket-fly mg:sm:w-36 mg:sm:h-36 mg:md:w-44 mg:md:h-44"
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
  <div className="mg:flex mg:min-w-44 mg:max-w-52 mg:shrink-0 mg:snap-start mg:flex-col mg:gap-2 mg:justify-start mg:rounded-lg mg:bg-secondary mg:p-3 mg:shadow-lg mg:shadow-black/20 mg:transition-transform mg:duration-500 mg:hover:scale-105 mg:sm:min-w-48 mg:sm:p-4 mg:md:min-w-0 mg:md:flex-1">
    <Image
      src={image?.src || ''}
      alt={image?.alt || ''}
      width={80}
      height={80}
      sizes="(max-width: 640px) 3.5rem, (max-width: 768px) 4rem, 5rem"
      className="mg:w-14 mg:h-14 mg:object-contain mg:-ml-1 mg:animate-fade-in mg:duration-500 mg:sm:w-16 mg:sm:h-16 mg:md:w-20 mg:md:h-20"
    />
    <div className="mg:flex mg:flex-col mg:gap-1 mg:w-full">
      <Typography removePadding bold color="white" variant="h4">
        {title}
      </Typography>
      <Typography removePadding color="white" variant="base">
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
  link?: { text?: string; target?: string; href?: string };
  title?: string;
}

const ContactCard = ({ image, link, text, title }: ContactCardProps) => (
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
      <Typography bold color="white" removePadding variant="h4">
        {title}
      </Typography>
      {link ? (
        <Link
          color="white"
          href={link?.href}
          target={link?.target}
          removePadding
          variant="base"
        >
          {link?.text}
        </Link>
      ) : (
        <Typography color="white" removePadding variant="base">
          {text}
        </Typography>
      )}
    </div>
  </div>
);

const contactCards: ContactCardProps[] = [
  {
    image: { src: '/images/mail.png', alt: 'Mail Icon' },
    link: {
      text: 'marcomg_777@outlook.com',
      target: '_blank',
      href: 'mail:marcomg_777@outlook.com',
    },
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
    link: {
      text: 'See linkedin profile',
      href: 'https://www.linkedin.com/in/marco-antonio-melo-software-arch/',
      target: '_blank',
    },
    title: 'LinkedIn',
  },
  {
    image: { src: '/images/github.png', alt: 'Github Icon' },
    link: {
      text: 'See github profile',
      href: 'https://github.com/marcomg-byte',
      target: '_blank',
    },
    title: 'Github',
  },
  {
    image: { src: '/images/internet.png', alt: 'Internet Icon' },
    link: {
      text: 'See personal page',
      href: 'marcoantoniomelo.dev',
      target: '_blank',
    },
    title: 'Website',
  },
];

export default function Contact() {
  const [values, setValues] = useState<FormValue[]>([]);
  const [error, setError] = useState<boolean>(false);

  return (
    <Page title="Contact">
      <div className="mg:flex mg:flex-col mg:items-center mg:gap-6 mg:w-full mg:pt-6 mg:px-4 mg:pb-4 mg:overflow-x-hidden mg:sm:px-6 mg:md:flex-row mg:md:items-start mg:md:justify-between mg:md:gap-4">
        <div className="mg:flex mg:flex-col mg:gap-2 mg:w-full mg:md:w-2/3">
          <div className="mg:flex mg:flex-col mg:gap-1 mg:w-full">
            <Typography
              className="mg:text-lg mg:sm:text-xl mg:lg:text-3xl"
              color="accent"
              variant="h2"
              removePadding
            >
              GET IN TOUCH
            </Typography>
            <Typography
              clamp={10}
              className="mg:pb-1"
              removePadding
              variant="h1"
            >
              Let&apos;s build something amazing{' '}
              <span className="mg:text-accent">together</span>.
            </Typography>
          </div>
          <Typography clamp={10} variant="base">
            I&apos;m always open to discussing new opportunities, interesting
            projcts or just having achat about technology and architecture.
          </Typography>
          <div className="mg:flex mg:snap-x mg:gap-3 mg:items-stretch mg:w-full mg:overflow-x-auto mg:scrollbar-subtle mg:mt-6 mg:pb-2 mg:md:overflow-visible mg:md:pb-0">
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
      <div className="mg:flex mg:flex-col mg:items-stretch mg:gap-5 mg:px-4 mg:pb-6 mg:w-full mg:sm:px-6 mg:lg:flex-row mg:lg:justify-between mg:lg:gap-8">
        <div className="mg:flex mg:flex-col mg:rounded-lg mg:bg-secondary mg:w-full mg:shadow-lg mg:shadow-black/20 mg:lg:w-3/5">
          <Form
            adornmentColor="white"
            classes={{
              body: 'mg:gap-4',
              form: 'mg:p-4 mg:gap-4 mg:sm:p-6',
            }}
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
            <div className="mg:w-full mg:bg-inherit mg:flex mg:flex-col mg:gap-4 mg:sm:flex-row mg:sm:justify-between">
              <TextInput
                adornmentColor="white"
                clearable
                fullWidth
                label="name"
                name="name"
                required
                color="white"
                placeholder="name"
                startAdornment={faPerson}
                classes={{ container: 'mg:w-full' }}
              />
              <TextInput
                adornmentColor="white"
                clearable
                fullWidth
                label="mail"
                name="mail"
                required
                color="white"
                placeholder="email"
                showPasswordToggle
                startAdornment={faMailBulk}
                classes={{ container: 'mg:w-full' }}
              />
            </div>
            <TextInput
              adornmentColor="white"
              clearable
              fullWidth
              label="subject"
              name="subject"
              required
              color="white"
              placeholder="subject"
              showPasswordToggle
              startAdornment={faFile}
              classes={{ container: 'mg:w-full' }}
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
              classes={{ container: 'mg:w-full', textarea: 'mg:min-h-40' }}
            />
          </Form>
        </div>
        <div className="mg:flex mg:flex-col mg:rounded-lg mg:p-4 mg:bg-secondary mg:w-full mg:shadow-lg mg:shadow-black/20 mg:lg:w-2/5">
          <div className="mg:flex mg:flex-col mg:gap-2 mg:pb-4 mg:w-full">
            <div className="mg:flex mg:items-center mg:gap-2 mg:w-full">
              <Image
                src="/images/contact.png"
                alt="Contact Icon"
                width={32}
                height={32}
                className="mg:object-contain mg:animate-fade-in mg:transition-transform mg:duration-500 mg:hover:scale-110"
              />
              <Typography removePadding color="white" variant="h2">
                Contact Information
              </Typography>
            </div>
            <Typography removePadding color="white" variant="base">
              Here&apos;s how you can reach me
            </Typography>
          </div>
          <div className="mg:flex mg:flex-col mg:gap-4 mg:w-full">
            {contactCards.map((card, index) => (
              <ContactCard
                image={card?.image}
                key={`card-${index}`}
                text={card?.text}
                link={card?.link}
                title={card?.title}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mg:flex mg:flex-col mg:gap-6 mg:w-full mg:px-4 mg:pb-6 mg:pt-2 mg:sm:px-6 mg:lg:flex-row mg:lg:items-center mg:lg:gap-4">
        <div className="mg:flex mg:flex-col mg:gap-3 mg:w-full mg:lg:w-1/3 mg:lg:pr-2">
          <div className="mg:flex mg:flex-col mg:gap-4">
            <div className="mg:flex mg:items-center mg:gap-3">
              <div className="mg:shrink-0 mg:pt-1 mg:sm:pt-2">
                <Image
                  src="/images/target.png"
                  alt="Target Icon"
                  width={48}
                  height={48}
                  className="mg:object-contain mg:animate-fade-in mg:duration-500"
                />
              </div>
              <Typography color="primary" removePadding variant="h2">
                Let&apos;s create impact
              </Typography>
            </div>
            <Typography color="primary" clamp={8} removePadding variant="base">
              I&apos;m passionate about solving complex problems and building
              scalable, secure and maintainable systems that make a difference.
            </Typography>
            <Typography color="primary" clamp={8} removePadding variant="base">
              Whether you have a project in mind, need technichal consultation
              or just want to connect, I&apos;d love to hear from you.
            </Typography>
            <div className="mg:flex mg:w-full mg:sm:w-auto">
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
        <div className="mg:flex mg:w-full mg:justify-center mg:lg:w-1/3">
          <div className="mg:relative mg:w-56 mg:max-w-full mg:aspect-square mg:rounded-full mg:overflow-hidden mg:transition-transform mg:duration-200 mg:hover:scale-105 mg:sm:w-72 mg:lg:w-full">
            <Image
              src="/images/coding.jpg"
              alt="Coding Image"
              fill
              preload
              sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 33vw"
              className="mg:object-cover mg:animate-fade-in mg:duration-500"
            />
          </div>
        </div>
        <div className="mg:flex mg:flex-col mg:gap-4 mg:w-full mg:lg:w-1/3 mg:lg:gap-6 mg:lg:pl-2">
          <div className="mg:flex mg:items-start mg:gap-3">
            <FontAwesomeIcon
              icon={faCircle}
              className="mg:text-lg mg:text-success mg:pt-2 mg:animate-fade-in mg:duration-500 mg:sm:pt-4"
            />
            <Typography color="primary" removePadding variant="h2">
              Currently available for
            </Typography>
          </div>
          <List
            divider
            fullWidth
            adornmentColor="success"
            background="secondary"
            color="white"
            selectable={false}
          >
            <ListItem
              adornment={faCheckCircle}
              title="Full Time Opportunities"
            />
            <ListItem
              adornment={faCheckCircle}
              title="Contract & freelance projects"
            />
            <ListItem adornment={faCheckCircle} title="Technical consulting" />
            <ListItem adornment={faCheckCircle} title="Architecture advisory" />
          </List>
        </div>
      </div>
    </Page>
  );
}
