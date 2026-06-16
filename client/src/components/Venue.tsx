import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

interface VenueInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  distance: string;
}

const venues: VenueInfo[] = [
  {
    name: 'Babylon\'s Garden',
    address: 'P786+2RF, mornag, Tunisie',
    phone: '+216 51 883 360',
    email: 'contact@babylons-garden.com',
    website: 'https://www.google.com/maps/dir//Babylon\'s+Garden,+P786%2B2RF/',
    description: 'مكان سحري للاحتفال بعلاقتنا',
    distance: 'المطار: 20 دقيقة | لا مارسة: 30 دقيقة | الحمامات: ساعة',
  },
];

export default function Venue() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
            المكان
          </h2>
          <p className="text-muted font-light">حيث نحتفل</p>
        </motion.div>

        <motion.div
          className="mb-12 rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/bayb.webp"
            alt="Babylon's Garden"
            className="w-full h-48 sm:h-64 md:h-96 object-cover"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            {venues.map((venue) => (
              <div key={venue.name}>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {venue.name}
                </h3>
                <p className="text-muted font-light mb-6">{venue.description}</p>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Adresse</p>
                      <p className="text-muted font-light">{venue.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Téléphone</p>
                      <a
                        href={`tel:${venue.phone}`}
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        {venue.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <a
                      href="https://www.google.com/maps/dir//Babylon's+Garden,+P786%2B2RF/@36.7851983,10.1370799,14.25z/data=!4m8!4m7!1m0!1m5!1m1!1s0x12fd490027b5fd57:0x8c1b6d3f83bb26d6!2m2!1d10.262048!2d36.7150746?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Obtenir l'itinéraire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="rounded-lg overflow-hidden h-64 sm:h-80 md:h-96 border border-accent/20 shadow-inner relative"
            variants={itemVariants}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3200.7516805165977!2d10.259859300000002!3d36.7150746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd490027b5fd57%3A0x8c1b6d3f83bb26d6!2sBabylon's%20Garden!5e0!3m2!1sfr!2stn!4v1718536800000!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </motion.div>

        <motion.div
          className="gold-divider my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="text-center text-muted font-light italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          نوصي بالحضور قبل 15 دقيقة من وقت البداية.
        </motion.p>
      </div>
    </section>
  );
}
