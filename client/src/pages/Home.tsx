import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import EnvelopeOpening from '@/components/EnvelopeOpening';
import Countdown from '@/components/Countdown';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import RSVP from '@/components/RSVP';
import Venue from '@/components/Venue';
import Footer from '@/components/Footer';
import MusicToggle from '@/components/MusicToggle';
import { useWeddingMusic } from '@/hooks/useWeddingMusic';

export default function Home() {
  const { startMusic, toggleMusic, isPlaying } = useWeddingMusic();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Auto-play music when component mounts (after user gesture)
  useEffect(() => {
    // Start playing music when the page loads (browser autoplay policy allows this after user gesture)
    const handleUserInteraction = () => {
      startMusic();
      // Remove listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Listen for user interaction to start music
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [startMusic]);

  // Show envelope opening first, then the rest of the site
  if (!envelopeOpened) {
    return (
      <EnvelopeOpening
        onOpen={() => {
          setEnvelopeOpened(true);
          startMusic();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Timeline />
      <Venue />
      <Countdown />

      
      <Footer />

      {/* Floating music toggle button */}
      <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
    </div>
  );
}
