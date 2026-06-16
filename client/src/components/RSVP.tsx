import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

/**
 * RSVP Component
 * Wedding RSVP form with validation and animations
 * Design: Luxury form with elegant styling
 */

export default function RSVP() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: 1,
    dietary: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Merci! Votre reponse a ete enregistree.');
      setFormData({
        name: '',
        email: '',
        attending: 'yes',
        guests: 1,
        dietary: '',
        message: '',
      });
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez reessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container max-w-2xl">
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
            Confirmation
          </h2>
          <p className="text-muted font-light">
            Faites-nous savoir si vous serez des notres
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/50 backdrop-blur-sm border border-accent/20 rounded-lg p-8 md:p-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Name Field */}
          <motion.div className="mb-6" variants={itemVariants}>
            <Label htmlFor="name" className="text-foreground font-semibold mb-2 block">
              Nom complet
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-accent/20 focus:border-accent"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div className="mb-6" variants={itemVariants}>
            <Label htmlFor="email" className="text-foreground font-semibold mb-2 block">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votre.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-accent/20 focus:border-accent"
            />
          </motion.div>

          {/* Attending */}
          <motion.div className="mb-6" variants={itemVariants}>
            <Label className="text-foreground font-semibold mb-4 block">
              Serez-vous present(e)?
            </Label>
            <RadioGroup value={formData.attending} onValueChange={(value) => setFormData({ ...formData, attending: value })}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="yes" id="attending-yes" />
                <Label htmlFor="attending-yes" className="font-normal cursor-pointer">
                  Oui, j\'y serai
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="attending-no" />
                <Label htmlFor="attending-no" className="font-normal cursor-pointer">
                  Malheureusement, je ne pourrai pas venir
                </Label>
              </div>
            </RadioGroup>
          </motion.div>

          {/* Guests */}
          {formData.attending === 'yes' && (
            <motion.div className="mb-6" variants={itemVariants}>
              <Label htmlFor="guests" className="text-foreground font-semibold mb-2 block">
                Nombre de personnes
              </Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="5"
                value={formData.guests}
                onChange={handleChange}
                className="border-accent/20 focus:border-accent"
              />
            </motion.div>
          )}

          {/* Dietary */}
          {formData.attending === 'yes' && (
            <motion.div className="mb-6" variants={itemVariants}>
              <Label htmlFor="dietary" className="text-foreground font-semibold mb-2 block">
                Regime alimentaire
              </Label>
              <Input
                id="dietary"
                name="dietary"
                type="text"
                placeholder="ex: vegetarien, allergies, etc."
                value={formData.dietary}
                onChange={handleChange}
                className="border-accent/20 focus:border-accent"
              />
            </motion.div>
          )}

          {/* Message */}
          <motion.div className="mb-8" variants={itemVariants}>
            <Label htmlFor="message" className="text-foreground font-semibold mb-2 block">
              Message (optionnel)
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Y a-t-il quelque chose que vous aimeriez nous dire?"
              value={formData.message}
              onChange={handleChange}
              className="border-accent/20 focus:border-accent min-h-24"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-lg transition-all duration-300"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma reponse'}
            </Button>
          </motion.div>
        </motion.form>

        {/* Divider */}
        <motion.div
          className="gold-divider my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        />

        {/* Note */}
        <motion.p
          className="text-center text-muted font-light text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Merci de confirmer votre presence avant le 1er septembre 2026.
        </motion.p>
      </div>
    </section>
  );
}
