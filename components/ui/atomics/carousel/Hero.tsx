'use client';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import classNames from 'classnames';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import NextImage from 'next/image';
import { Button, IconButton, Typography } from '@/components/ui';
import type { HeadingVariant, ParagraphVariant } from '@/components/ui';

/**
 * Represents a link/button in the Hero section.
 * @property {string} href - The URL the link points to.
 * @property {string} label - The display text for the link.
 * @property {'primary' | 'secondary' | 'text' | 'outline'} [variant] - Visual style of the link/button.
 */
interface HeroLink {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'text' | 'outline';
}

/**
 * Header content for the Hero section, including title, description, and links.
 * @property {string} [description] - Optional description text.
 * @property {HeroLink[]} [links] - Optional array of action links/buttons.
 * @property {ReactNode} [title] - Optional title content (can be string or JSX).
 * @property {ParagraphVariant} [descriptionVariant] - Typography variant for the description.
 * @property {HeadingVariant} [variant] - Typography variant for the title.
 */
interface HeroHeader {
  description?: string;
  links?: HeroLink[];
  title?: ReactNode;
  descriptionVariant?: ParagraphVariant;
  variant?: HeadingVariant;
}

/**
 * Represents an image displayed in the Hero carousel.
 * @property {string} src - Image source URL.
 * @property {string} alt - Alternative text for accessibility.
 */
interface HeroImage {
  src: string;
  alt: string;
}

/**
 * Allowed height options for the Hero component.
 * @type {'sm'|'md'|'lg'|'xl'|'full'}
 */
type HeroHeight = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Maps HeroHeight values to Tailwind CSS height classes.
 * @property {'sm'} sm - Small height class.
 * @property {'md'} md - Medium height class.
 * @property {'lg'} lg - Large height class.
 * @property {'xl'} xl - Extra large height class.
 * @property {'full'} full - Full height class.
 */
const heightClasses: Record<HeroHeight, string> = {
  sm: 'mg:h-[300px]',
  md: 'mg:h-[450px]',
  lg: 'mg:h-[600px]',
  xl: 'mg:h-[750px]',
  full: 'mg:h-full',
};

/**
 * Allowed aspect ratio options for the Hero component.
 * @type {'16:9'|'4:3'|'1:1'}
 */
type HeroAspectRatio = '16:9' | '4:3' | '1:1';

/**
 * Maps HeroAspectRatio values to Tailwind CSS aspect ratio classes.
 * @property {'16:9'} '16:9' - 16:9 aspect ratio class.
 * @property {'4:3'} '4:3' - 4:3 aspect ratio class.
 * @property {'1:1'} '1:1' - 1:1 aspect ratio class.
 */
const aspectRatioClasses: Record<HeroAspectRatio, string> = {
  '16:9': 'mg:aspect-[16/9]',
  '4:3': 'mg:aspect-[4/3]',
  '1:1': 'mg:aspect-square',
};

/**
 * Props for the Hero component, configuring layout, images, header, and carousel behavior.
 *
 * @property {HeroAspectRatio} [aspectRatio] - Aspect ratio of the hero image area.
 * @property {boolean} [autoPlay] - Enables automatic slide transition.
 * @property {boolean} [enableSwipe] - Enables swipe gesture navigation.
 * @property {HeroHeader} [header] - Header content (title, description, links).
 * @property {HeroHeight} [height] - Height of the hero section.
 * @property {HeroImage[]} [images] - Array of images to display in the carousel.
 * @property {number} [interval] - Autoplay interval in ms.
 * @property {boolean} [lazyLoad] - Enables lazy loading for images.
 * @property {boolean} [loop] - Enables infinite looping of slides.
 * @property {'cover'|'contain'|'fill'|'none'|'scale-down'} [objectFit] - CSS object-fit for images.
 * @property {boolean} [showControls] - Shows navigation controls.
 * @property {boolean} [pauseOnHover] - Pauses autoplay on hover.
 * @property {boolean} [responsive] - Makes the hero section responsive.
 * @property {boolean} [showDots] - Shows pagination dots.
 * @property {'fade'|'slide'} [transition] - Transition animation type.
 * @property {number} [transitionDuration] - Transition duration in ms.
 */
interface HeroProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: HeroAspectRatio;
  autoPlay?: boolean;
  enableSwipe?: boolean;
  header?: HeroHeader;
  height?: HeroHeight;
  images?: HeroImage[];
  interval?: number;
  lazyLoad?: boolean;
  loop?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  showControls?: boolean;
  pauseOnHover?: boolean;
  responsive?: boolean;
  showDots?: boolean;
  transition?: 'fade' | 'slide';
  transitionDuration?: number;
}

/**
 * Hero component for displaying a prominent section with images, header, and carousel features.
 *
 * @param {HeroProps} props - Props for configuring the hero section's layout, images, and behavior.
 * @returns {JSX.Element} The rendered hero section.
 *
 * @example
 * ```tsx
 * import { Hero } from '@/components/ui/atomics';
 *
 * const MyHero = () => (
 *  <Hero
 *     aspectRatio="16:9"
 *     autoPlay
 *     header={{
 *      title: 'Welcome to Our Site',
 *      description: 'Discover our amazing products and services.',
 *      links: [
 *        { href: '/products', label: 'Shop Now', variant: 'primary' },
 *        { href: '/about', label: 'Learn More', variant: 'secondary' },
 *      ],
 *    }}
 *    height="lg"
 *    images={[
 *      { src: '/images/hero1.jpg', alt: 'Hero Image 1' },
 *      { src: '/images/hero2.jpg', alt: 'Hero Image 2' },
 *    ]}
 *    interval={5000}
 *    lazyLoad
 *    loop
 *    objectFit="cover"
 *    showControls
 *    pauseOnHover
 *    responsive
 *    showDots
 *    transition="fade"
 *    transitionDuration={700}
 *  >
 *    {Hero content goes here}
 *  </Hero>
 * );
 * ```
 */
const Hero: FC<HeroProps> = ({
  aspectRatio,
  autoPlay = false,
  enableSwipe = true,
  header = { links: [], variant: 'h2' },
  height = 'md',
  images = [],
  interval = 3000,
  lazyLoad = false,
  loop = true,
  objectFit = 'cover',
  showControls = true,
  pauseOnHover = true,
  responsive = true,
  showDots = true,
  transition = 'slide',
  transitionDuration = 500,
  ...rest
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    watchDrag: enableSwipe,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>(() =>
    images.map((_, i) => i),
  );
  const isPaused = useRef(false);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleMouseEnter = () => {
    if (pauseOnHover) isPaused.current = true;
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) isPaused.current = false;
  };

  const handleNext = () => {
    if (!emblaApi) return;
    emblaApi?.scrollNext();
  };

  const handlePrev = () => {
    if (!emblaApi) return;
    emblaApi?.scrollPrev();
  };

  const handleScrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi?.scrollTo(index);
  };

  const imageContainerClasses = aspectRatio
    ? aspectRatioClasses[aspectRatio]
    : heightClasses[height];

  const containerClasses = classNames(
    'mg:relative mg:overflow-hidden',
    responsive && 'mg:w-full',
    enableSwipe && 'mg:cursor-grab',
  );

  const dotClasses = (index: number) =>
    classNames(
      'mg:w-2 mg:h-2 mg:rounded-full mg:transition-colors mg:hover:cursor-pointer',
      {
        'mg:bg-secondary': index === selectedIndex,
        'mg:bg-secondary-subtle': index !== selectedIndex,
      },
    );

  const slideClasses = classNames(
    'mg:flex-[0_0_100%] mg:relative',
    imageContainerClasses,
    {
      'mg:transition-opacity': transition === 'fade',
    },
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onReInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('reInit', onReInit);
    emblaApi.on('select', handleSelect);
    return () => {
      emblaApi.off('reInit', onReInit);
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  useEffect(() => {
    if (!autoPlay || !emblaApi) return;
    const tick = () => {
      if (!isPaused.current) emblaApi.scrollNext();
    };
    const timer = setInterval(tick, interval);
    return () => clearInterval(timer);
  }, [autoPlay, emblaApi, interval]);

  return (
    <div
      className={containerClasses}
      ref={emblaRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      <div className="mg:flex">
        {images.map((image, index) => (
          <div
            key={`hero-image-${index}`}
            className={slideClasses}
            style={
              transition === 'fade'
                ? {
                    opacity: index === selectedIndex ? 1 : 0,
                    transitionDuration: `${transitionDuration}ms`,
                  }
                : undefined
            }
          >
            <NextImage
              src={image.src}
              alt={image.alt}
              fill
              loading={lazyLoad ? 'lazy' : 'eager'}
              style={{ objectFit }}
            />
          </div>
        ))}
      </div>
      <div className="mg:absolute mg:top-1/4 mg:left-1/6 mg:flex mg:flex-col mg:gap-4">
        {header.title && (
          <Typography color="inverse" variant={header?.variant}>
            {header.title}
          </Typography>
        )}
        {header?.description && (
          <Typography color="inverse" variant={header?.descriptionVariant}>
            {header?.description}
          </Typography>
        )}
        <div className="mg:flex mg:justify-start mg:items-center mg:gap-4">
          {header?.links?.map((link, index) => (
            <Button
              key={`hero-link-${index}`}
              href={link.href}
              variant={link.variant}
              classes={{ button: 'mg:animate-fade-in mg:duration-500' }}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
      {showControls && images.length > 1 && (
        <div className="mg:absolute mg:top-1/3 mg:w-full mg:flex mg:items-center mg:justify-between mg:px-6">
          <IconButton
            variant="filled"
            color="secondary"
            classes={{ iconButton: 'mg:animate-slide-in-left' }}
            onClick={handlePrev}
          >
            {faChevronLeft}
          </IconButton>
          <IconButton
            variant="filled"
            color="secondary"
            classes={{ iconButton: 'mg:animate-slide-in-right' }}
            onClick={handleNext}
          >
            {faChevronRight}
          </IconButton>
        </div>
      )}
      {showDots && scrollSnaps.length > 1 && (
        <div className="mg:absolute mg:bottom-4 mg:left-1/2 mg:-translate-x-1/2 mg:flex mg:gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={`hero-dot-${index}`}
              className={dotClasses(index)}
              onClick={() => handleScrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Hero.displayName = 'Hero';

export { Hero };
