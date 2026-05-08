'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  cta?: {
    text: string;
    href: string;
    secondary?: {
      text: string;
      href: string;
    };
  };
  gradient?: string;
  icon?: 'sparkles' | 'trending' | 'award';
}

const slides: Slide[] = [
  {
    id: 1,
    src: '/home-hero/s25-ultra.webp',
    alt: 'Samsung Galaxy S25 Ultra',
    width: 1120,
    height: 320,
    title: 'Samsung Galaxy S25 Ultra',
    subtitle: 'The Ultimate Flagship Experience',
    badge: 'New Arrival',
    icon: 'sparkles',
    gradient: 'from-blue-500/30 via-purple-500/25 to-pink-500/20',
    cta: {
      text: 'Explore Now',
      href: '/products/phones-tablets',
      secondary: {
        text: 'Learn More',
        href: '/products/phones-tablets'
      }
    }
  },
  {
    id: 2,
    src: '/home-hero/z-flip.jpg',
    alt: 'Samsung Galaxy Z Flip',
    width: 2334,
    height: 668,
    title: 'Galaxy Z Flip',
    subtitle: 'Flip the Script on Style',
    badge: 'Trending',
    icon: 'trending',
    gradient: 'from-purple-500/30 via-pink-500/25 to-rose-500/20',
    cta: {
      text: 'Shop Now',
      href: '/products/phones-tablets',
      secondary: {
        text: 'View Specs',
        href: '/products/phones-tablets'
      }
    }
  },
  {
    id: 3,
    src: '/home-hero/Tab-s10.webp',
    alt: 'Samsung Galaxy Tab S10',
    width: 1120,
    height: 320,
    title: 'Galaxy Tab S10',
    subtitle: 'Power Meets Portability',
    badge: 'Premium',
    icon: 'award',
    gradient: 'from-indigo-500/30 via-blue-500/25 to-cyan-500/20',
    cta: {
      text: 'Discover More',
      href: '/products/phones-tablets',
      secondary: {
        text: 'Compare Models',
        href: '/products/phones-tablets'
      }
    }
  },
  {
    id: 4,
    src: '/home-hero/neon-smart.webp',
    alt: 'Neon Smart Phone',
    width: 1120,
    height: 320,
    title: 'Cutting-Edge Technology',
    subtitle: 'Experience Next-Gen Innovation',
    badge: 'Hot Deal',
    icon: 'sparkles',
    gradient: 'from-emerald-500/30 via-teal-500/25 to-cyan-500/20',
    cta: {
      text: 'View Offers',
      href: '/products/special-offers',
      secondary: {
        text: 'All Products',
        href: '/products'
      }
    }
  },
  {
    id: 5,
    src: '/home-hero/service-centers.png',
    alt: 'Gadgets By Kihoro Service Centers',
    width: 1024,
    height: 293,
    title: '25 Years of Excellence',
    subtitle: 'Your Trusted Tech Partner Since 1999',
    badge: 'Award Winning',
    icon: 'award',
    gradient: 'from-orange-500/30 via-amber-500/25 to-yellow-500/20',
    cta: {
      text: 'Find a Branch',
      href: '/contact',
      secondary: {
        text: 'Our Services',
        href: '/services'
      }
    }
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps'
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5" />;
      case 'award':
        return <Award className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0 motion-safe:animate-pulse"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Subtle Floating Orbs for Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl motion-safe:animate-float motion-reduce:hidden"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl motion-safe:animate-float-delayed motion-reduce:hidden"></div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="flex-[0_0_100%] min-w-0 px-2 sm:px-4"
              >
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                  <div className="relative max-w-6xl mx-auto">
                    {/* Main Content Card with Layered Design */}
                    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                      {/* Background Image with Overlay */}
                      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          width={slide.width}
                          height={slide.height}
                          priority={index === 0}
                          sizes="100vw"
                          className={`w-full h-full object-cover transition duration-700 transform-gpu ${
                            selectedIndex === index && !isTransitioning 
                              ? 'scale-100 opacity-100' 
                              : 'scale-105 opacity-90'
                          }`}
                        />
                        {/* Subtle Dynamic Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient || 'from-gray-900/20 to-gray-900/10'} mix-blend-multiply`}></div>
                        {/* Light Bottom Gradient for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14">
                        {/* Badge with Icon - Animated Entry */}
                        {slide.badge && (
                          <div className={`mb-4 md:mb-6 transition duration-700 delay-100 ${
                            selectedIndex === index && !isTransitioning
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 shadow-lg">
                              {getIcon(slide.icon)}
                              <span className="font-bold text-sm">{slide.badge}</span>
                            </div>
                          </div>
                        )}

                        {/* Title - Animated Entry */}
                        {slide.title && (
                          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 leading-tight transition duration-700 delay-200 ${
                            selectedIndex === index && !isTransitioning
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}
                          style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)' }}>
                            {slide.title}
                          </h2>
                        )}

                        {/* Subtitle - Animated Entry */}
                        {slide.subtitle && (
                          <p className={`text-base md:text-xl lg:text-2xl text-white/95 mb-6 md:mb-8 max-w-2xl font-medium transition duration-700 delay-300 ${
                            selectedIndex === index && !isTransitioning
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}
                          style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                            {slide.subtitle}
                          </p>
                        )}

                        {/* CTA Buttons - Animated Entry */}
                        {slide.cta && (
                          <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 transition duration-700 delay-400 ${
                            selectedIndex === index && !isTransitioning
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}>
                            <Link
                              href={slide.cta.href}
                              className="group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 rounded-xl font-bold text-sm md:text-base hover:bg-blue-600 hover:text-white transition shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu will-change-transform"
                            >
                              {slide.cta.text}
                              <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            {slide.cta.secondary && (
                              <Link
                                href={slide.cta.secondary.href}
                                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold text-sm md:text-base hover:bg-white/20 transition border border-white/30 shadow-lg hover:shadow-xl"
                              >
                                {slide.cta.secondary.text}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Decorative Corner Accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-bl-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-gray-900 hover:bg-white hover:scale-110 transition duration-300 group shadow-2xl hover:shadow-blue-600/20 transform-gpu will-change-transform"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>

        <button
          onClick={scrollNext}
          className="hidden md:flex absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-gray-900 hover:bg-white hover:scale-110 transition duration-300 group shadow-2xl hover:shadow-blue-600/20 transform-gpu will-change-transform"
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
        </button>

        {/* Modern Pagination Dots */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex gap-2 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition duration-500 rounded-full ${
                  index === selectedIndex
                    ? 'w-10 h-2.5 bg-white shadow-lg'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70 hover:scale-125'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Elegant Wave Divider with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 -mb-1 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#f9fafb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path 
            d="M0,40 C240,80 480,90 720,70 C960,50 1200,20 1440,50 L1440,120 L0,120 Z" 
            fill="url(#wave-gradient)"
          />
          <path 
            d="M0,60 C240,90 480,100 720,80 C960,60 1200,40 1440,65 L1440,120 L0,120 Z" 
            fill="white" 
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
