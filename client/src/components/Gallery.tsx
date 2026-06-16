import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/92788882/BfbWGKdsPXjboUtF29kw7Y/gallery-moment-1-bQhzSyYMRWd6itazeQtQk4.webp',
    alt: 'Moment romantique',
  },
  {
    id: 2,
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/92788882/BfbWGKdsPXjboUtF29kw7Y/gallery-moment-2-UoJ7e3AnWFtQbFXaffdfUH.webp',
    alt: 'Celebration',
  },
  {
    id: 3,
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/92788882/BfbWGKdsPXjboUtF29kw7Y/hero-background-luxury-agACuKSAC5EtKApBDDoDpT.webp',
    alt: 'Venue elegante',
  },
  {
    id: 4,
    src: '/bayb.webp',
    alt: 'Moment special',
  },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">✦</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Galerie
          </h2>
          <p className="text-muted font-light">Moments precieux captures</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              variants={itemVariants}
              onClick={() => setSelectedId(image.id)}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 sm:h-60 md:h-80 object-cover"
              />

              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="text-white text-center"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                  <p className="font-semibold">Agrandir</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="gold-divider my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="text-center text-muted font-light max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Cliquez sur une image pour l'agrandir et decouvrir les moments magiques de notre histoire.
        </motion.p>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
              >
                <X size={32} />
              </button>

              <img
                src={galleryImages.find((img) => img.id === selectedId)?.src}
                alt="Enlarged"
                className="w-full rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
