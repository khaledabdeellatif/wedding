import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Hero Component
 * Main hero section with tour.webp image and elegant animated typography
 * Design: Luxury wedding hero with parallax and cinematic text reveals
 */

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : i * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const titleText = "مريم & غسان";

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: 'max(100vh, 600px)', aspectRatio: '16 / 9' }}>
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: prefersReducedMotion ? 0 : scrollY * 0.3,
        }}
      >
        <img
          src="/tour.jpg"
          alt="مريم & غسان"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay for premium depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
        }} />
      </motion.div>

      {/* Floating rose particles */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${15 + (i * 10)}%`,
            }}
            animate={{
              y: [window.innerHeight, -20],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-4xl text-center px-4 sm:px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative top element */}
        <motion.div
          className="mb-6"
          variants={scaleInVariants}
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-transparent to-accent/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.5, delay: 0.8 }}
            />
            <span className="text-accent text-lg">✦</span>
            <motion.div
              className="h-px w-12 bg-gradient-to-l from-transparent to-accent/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.5, delay: 0.8 }}
            />
          </div>
        </motion.div>

        

        {/* Main Title */}
        <motion.div className="mb-6 overflow-hidden" variants={fadeUpVariants}>
          <h1 className="text-5xl sm:text-6xl md:text-9xl lg:text-9xl font-bold text-white mb-2 leading-tight" dir="rtl" style={{ letterSpacing: '0.05em' }}>
            {titleText}
          </h1>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          variants={fadeUpVariants}
        >
          <motion.div
            className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 1.5 }}
          />
          <motion.span
            className="text-accent text-xs"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            ❋
          </motion.span>
          <motion.div
            className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 1.5 }}
          />
        </motion.div>

        {/* Date with elegant styling */}
        <motion.div
          variants={fadeUpVariants}
          className="mb-6"
        >
          <p className="text-lg md:text-2xl text-white/90 font-light" dir="rtl">
            10 سبتمبر 2026
          </p>
        </motion.div>

        {/* Location */}
        <motion.div
          variants={fadeUpVariants}
          className="mb-8"
        >
          
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          يشرفنا أن ندعوكم للاحتفال بزفافنا. انضموا إلينا ليوم مليء بالحب والفرح واللحظات التي لا تُنسى.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: prefersReducedMotion ? 0 : 2,
          repeat: Infinity,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/50 text-xs font-light tracking-widest uppercase">اكتشف</p>
          <svg
            className="w-5 h-5 text-accent/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
