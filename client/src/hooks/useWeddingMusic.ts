import { useRef, useCallback, useState } from 'react';

/**
 * useWeddingMusic Hook
 * Plays the wedding.mp3 audio file with play/pause controls
 */

export function useWeddingMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = useCallback(() => {
    if (!audioRef.current) {
      // Create audio element if it doesn't exist
      const audio = new Audio('/wedding.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
      audio.play().catch(err => {
        console.log('Autoplay was prevented:', err);
        // Autoplay policy prevents automatic playback - user must interact first
      });
      setIsPlaying(true);
    } else if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [startMusic, stopMusic]);

  return { startMusic, stopMusic, toggleMusic, isPlaying };
}
