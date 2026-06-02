'use client';
import type { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { Children, useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import classNames from 'classnames';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../buttons';
import type { IconButtonVariant } from '../buttons';

/**
 * Gap size (in px) between carousel slides.
 * @type {8|16|24|32|40|48}
 */
type CarouselGap = 8 | 16 | 24 | 32 | 40 | 48;

/**
 * ARIA role for the carousel container for accessibility.
 * @type {'region'|'listbox'|'group'}
 */
type CarouselRole = 'region' | 'listbox' | 'group';

/**
 * Number of slides visible at once in the carousel.
 * @type {1|2|3|4|5}
 */
type CarouselSlidesPerView = 1 | 2 | 3 | 4 | 5;

/**
 * Number of slides to scroll per navigation action.
 * @type {1|2|3|4|5}
 */
type CarouselSlidesPerGroup = 1 | 2 | 3 | 4 | 5;

/**
 * Type of transition animation between slides.
 * @type {'fade'|'slide'}
 */
type CarouselTransition = 'fade' | 'slide';

/**
 * Props for the Carousel component.
 *
 * @property {'region' | 'listbox' | 'group'} [role] - ARIA role for accessibility.
 * @property {string} ['aria-label'] - ARIA label for accessibility.
 * @property {boolean} [autoPlay] - Enables automatic slide transition.
 * @property {ReactNode} [children] - Carousel slides as children.
 * @property {IconButtonVariant} [controlsVariant] - Variant for control buttons.
 * @property {number} [defaultIndex] - Initial slide index.
 * @property {boolean} [enableSwipe] - Enables swipe gesture navigation.
 * @property {CarouselGap} [gap] - Gap between slides (px).
 * @property {number} [interval] - Autoplay interval in ms.
 * @property {CarouselSlidesPerView} [slidesPerView] - Number of slides visible at once.
 * @property {CarouselSlidesPerGroup} [slidesPerGroup] - Number of slides to scroll per navigation.
 * @property {boolean} [loop] - Enables infinite looping.
 * @property {boolean} [pauseOnHover] - Pauses autoplay on hover.
 * @property {boolean} [showControls] - Shows navigation controls.
 * @property {boolean} [showDots] - Shows pagination dots.
 * @property {'fade' | 'slide'} [transition] - Transition animation type.
 * @property {number} [transitionDuration] - Transition duration in ms.
 */
interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  'aria-label'?: string;
  autoPlay?: boolean;
  children?: ReactNode;
  controlsVariant?: IconButtonVariant;
  defaultIndex?: number;
  enableSwipe?: boolean;
  gap?: CarouselGap;
  interval?: number;
  slidesPerView?: CarouselSlidesPerView;
  slidesPerGroup?: CarouselSlidesPerGroup;
  loop?: boolean;
  pauseOnHover?: boolean;
  role?: CarouselRole;
  ref?: Ref<HTMLDivElement>;
  showControls?: boolean;
  showDots?: boolean;
  transition?: CarouselTransition;
  transitionDuration?: number;
}

/**
 * Carousel component for displaying a set of slides with optional autoplay, navigation controls, dots, and swipe support.
 *
 * @param {CarouselProps} props - Props for configuring the carousel behavior and appearance.
 * @returns {JSX.Element} The rendered carousel component.
 *
 * @example
 * ```tsx
 * import { Carousel } from '@/components/ui/atomics';
 *
 * const MyCarousel = () => (
 *  <Carousel
 *     aria-label="Example Carousel"
 *     autoPlay
 *     interval={5000}
 *     slidesPerView={1}
 *     showControls
 *     showDots
 *     transition="fade"
 *     transitionDuration={50}
 * >
 *    <div>Slide 1</div>
 *    <div>Slide 2</div>
 *    <div>Slide 3</div>
 * </Carousel>
 * );
 * ```
 */
const Carousel: FC<CarouselProps> = ({
  'aria-label': ariaLabel,
  autoPlay = false,
  children,
  controlsVariant = 'filled',
  defaultIndex = 0,
  enableSwipe = true,
  gap = 16,
  interval = 3000,
  slidesPerView = 3,
  slidesPerGroup = 3,
  loop = true,
  pauseOnHover = true,
  ref,
  role = 'region',
  showControls = true,
  showDots = true,
  transition = 'slide',
  transitionDuration = 25,
  ...rest
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      startIndex: defaultIndex,
      watchDrag: enableSwipe,
      slidesToScroll: slidesPerGroup,
      duration: Math.min(Math.max(transitionDuration, 20), 60),
    },
    [...(transition === 'fade' ? [Fade()] : [])],
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const isPaused = useRef(false);

  const slidesLength = Children.toArray(children).length;
  const isUniqueView = slidesLength === slidesPerView;

  const handleMouseEnter = () => {
    if (pauseOnHover) isPaused.current = true;
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) isPaused.current = false;
  };

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    const lastSnapIndex = emblaApi.scrollSnapList().length - 1;
    const isLastSnap = emblaApi.selectedScrollSnap() === lastSnapIndex;

    if (loop && isLastSnap) {
      emblaApi.scrollTo(0);
      return;
    }

    emblaApi.scrollNext();
  }, [emblaApi, loop]);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleScrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi?.scrollTo(index);
  };

  const handlePrev = () => {
    if (!emblaApi) return;
    const lastSnapIndex = emblaApi.scrollSnapList().length - 1;
    const isFirstSnap = emblaApi.selectedScrollSnap() === 0;

    if (loop && isFirstSnap) {
      emblaApi.scrollTo(lastSnapIndex);
      return;
    }

    emblaApi.scrollPrev();
  };

  const containerClasses = classNames(
    'mg:relative mg:flex mg:justify-start mg:w-full mg:pt-6 mg:px-8 mg:overflow-hidden',
    {
      'mg:cursor-grab': enableSwipe,
    },
  );

  const dotClasses = (index: number) =>
    classNames('mg:w-2 mg:h-2 mg:rounded-full mg:hover:cursor-pointer', {
      'mg:bg-secondary': index === selectedIndex,
      'mg:bg-secondary-subtle': index !== selectedIndex,
    });

  const slideContainerClasses = classNames(
    'mg:flex mg:items-stretch mg:justify-start mg:pb-3 mg:w-full',
    {
      'mg:gap-8': gap === 8 && isUniqueView,
      'mg:gap-16': gap === 16 && isUniqueView,
      'mg:gap-24': gap === 24 && isUniqueView,
      'mg:gap-32': gap === 32 && isUniqueView,
      'mg:gap-40': gap === 40 && isUniqueView,
      'mg:gap-48': gap === 48 && isUniqueView,
    },
  );

  const slideClasses = classNames(
    'mg:h-full mg:flex mg:justify-center mg:items-stretch mg:w-9/10 mg:shrink-0',
    {
      'mg:gap-8': gap === 8,
      'mg:gap-16': gap === 16,
      'mg:gap-24': gap === 24,
      'mg:gap-32': gap === 32,
      'mg:gap-40': gap === 40,
      'mg:gap-48': gap === 48,
    },
  );

  const renderSlides = (children: ReactNode) => {
    const slides = Children.toArray(children);
    const numberOfViews = Math.ceil(slides.length / slidesPerView);
    const views: ReactNode[][] = new Array(Math.ceil(numberOfViews))
      .fill(null)
      .map(() => []);
    let viewCount = 0;

    if (slides.length === 0) return [];
    if (views.length === 1) return slides;

    slides.forEach((slide, index) => {
      if (index % slidesPerView === 0 && index > 0) {
        viewCount++;
      }
      views[viewCount].push(slide);
    });

    return views.map((view, index) => (
      <div key={`view-${index}`} className={slideClasses}>
        {view}
      </div>
    ));
  };

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
      if (!isPaused.current) handleNext();
    };
    const timer = setInterval(tick, interval);
    return () => clearInterval(timer);
  }, [autoPlay, emblaApi, handleNext, interval]);

  useEffect(() => {
    setScrollSnaps(emblaApi?.scrollSnapList() || []);
  }, [children, emblaApi]);

  return (
    <div
      className="mg:flex mg:flex-col mg:justify-center mg:items-center mg:w-full"
      ref={ref}
      {...(rest as HTMLAttributes<HTMLDivElement>)}
    >
      <div
        aria-label={ariaLabel}
        role={role}
        className={containerClasses}
        ref={emblaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={slideContainerClasses}>{renderSlides(children)}</div>
        {showControls && !isUniqueView && (
          <div className="mg:absolute mg:top-1/2 mg:left-0 mg:w-full mg:flex mg:items-center mg:justify-between mg:px-2 mg:pointer-events-none">
            <IconButton
              variant={controlsVariant}
              color="secondary"
              classes={{ iconButton: 'mg:pointer-events-auto' }}
              onClick={handlePrev}
            >
              {faChevronLeft}
            </IconButton>
            <IconButton
              variant={controlsVariant}
              color="secondary"
              classes={{ iconButton: 'mg:pointer-events-auto' }}
              onClick={handleNext}
            >
              {faChevronRight}
            </IconButton>
          </div>
        )}
      </div>
      {showDots && scrollSnaps.length >= 1 && (
        <div className="mg:flex mg:justify-center mg:items-center mg:gap-2 mg:w-full mg:h-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={`dot-${index}`}
              className={dotClasses(index)}
              onClick={() => handleScrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Carousel.displayName = 'Carousel';

export { Carousel };
