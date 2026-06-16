import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Countdown Component
 * Animated countdown timer with flip effect
 * Design: Luxury wedding countdown with elegant typography
 */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Wedding date: September 10, 2026
      const weddingDate = new Date('2026-09-10T16:30:00').getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const FlipNumber = ({ value, label }: { value: number; label: string }) => {
    const displayValue = String(value).padStart(2, '0');

    return (
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        viewport={{ once: true }}
      >
        {/* Number Display */}
        <div className="relative h-24 w-20 md:h-32 md:w-28 mb-4">
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/80 rounded-lg border-2 border-accent/20 shadow-lg"
            key={displayValue}
            initial={prefersReducedMotion ? {} : { rotateX: 90, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { rotateX: 0, opacity: 1 }}
            exit={prefersReducedMotion ? {} : { rotateX: -90, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          >
            <span className="text-4xl md:text-5xl font-bold text-accent">
              {displayValue}
            </span>
          </motion.div>
        </div>

        {/* Label */}
        <p className="text-sm md:text-base font-light text-muted uppercase tracking-widest">
          {label}
        </p>
      </motion.div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">✦</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            العد التنازلي
          </h2>
          <p className="text-muted font-light">حتى 10 سبتمبر 2026</p>
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          <FlipNumber value={timeLeft.days} label="أيام" />
          <FlipNumber value={timeLeft.hours} label="ساعات" />
          <FlipNumber value={timeLeft.minutes} label="دقائق" />
          <FlipNumber value={timeLeft.seconds} label="ثوان" />
        </div>

        {/* Divider */}
        <motion.div
          className="gold-divider my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />

        {/* Message */}
        <motion.p
          className="text-center text-muted font-light max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          نحن بانتظار مبادلة هذه اللحظة الخاصة معكم. كل يوم يمر يقربنا من احتفال الحب هذا.
        </motion.p>
      </div>
    </section>
  );
}
