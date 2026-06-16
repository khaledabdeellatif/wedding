import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <footer className="bg-secondary/50 border-t border-accent/20 py-12 md:py-16">
      <div className="container max-w-6xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <p className="text-accent text-sm font-semibold tracking-widest mb-2">✦</p>
            <h3 className="text-foreground font-bold mb-2">Mariem & Ghassen</h3>
            <p className="text-muted font-light text-sm">
              نحتفل بحبنا في 10 سبتمبر 2026.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-foreground font-bold mb-4">التنقل</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted hover:text-accent transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-accent transition-colors">
                  البرنامج
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-accent transition-colors">
                  المعرض
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-accent transition-colors">
                  اتصل
                </a>
              </li>
            </ul>
          </div>

         
        </motion.div>

        <motion.div
          className="gold-divider my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        />

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-muted font-light text-sm">
            بالحب والامتنان، مريم وغسان
          </p>
          <p className="text-muted/60 font-light text-xs mt-2">
            10 septembre 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
