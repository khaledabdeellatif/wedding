import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

const events: TimelineEvent[] = [
  {
    time: '16:30',
    title: 'استقبال الضيوف',
    description: 'أهلا وسهلا بأحبائنا الكرام',
    icon: '🚪',
  },
  {
    time: '17:00',
    title: 'عقد الزواج',
    description: 'توقيع عقد الزواج',
    icon: '📜',
  },
  {
    time: '20:00',
    title: 'نهاية الحفل',
    description: 'اختتام الحفل، شكراً على حضوركم',
    icon: '✨',
  },
];

export default function Timeline() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">✦</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            مسار اليوم
          </h2>
          <p className="text-muted font-light text-sm sm:text-base">10 سبتمبر 2026</p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Vertical line - full height */}
          <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          <div className="space-y-8 sm:space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row sm:gap-0"
                variants={itemVariants}
              >
                {/* Mobile/Tablet: Events on left side only. Desktop: Alternate */}
                <div className="w-full sm:w-1/2 sm:pr-8" style={{
                  paddingLeft: 'calc(2rem + 1.5rem)', // 2rem for the dot + padding
                }}>
                  <motion.div
                    className="bg-white/50 backdrop-blur-sm border border-accent/20 rounded-lg p-4 sm:p-6 hover:border-accent/40 transition-colors duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="text-2xl sm:text-3xl flex-shrink-0">{event.icon}</span>
                      <div className="min-w-0">
                        <p className="text-accent font-semibold text-sm sm:text-lg">{event.time}</p>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 sm:mb-2 break-words">
                          {event.title}
                        </h3>
                        <p className="text-muted font-light text-xs sm:text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Dot in the timeline - hidden on mobile, centered on tablet+ */}
                <div className="absolute left-0 sm:relative sm:w-0 flex justify-center sm:justify-center -translate-x-3 sm:translate-x-0">
                  <motion.div
                    className="w-6 h-6 sm:w-6 sm:h-6 bg-accent rounded-full border-4 border-background shadow-lg"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                {/* Right side spacer for desktop layout - hidden on mobile/tablet */}
                <div className="hidden sm:block sm:w-1/2 sm:pl-8" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="gold-divider my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="text-center text-muted font-light italic text-xs sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          الأوقات تقريبية وقد تُعدّل في يوم الزفاف.
        </motion.p>
      </div>
    </section>
  );
}
