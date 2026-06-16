import { motion } from 'framer-motion';

/**
 * MusicToggle Component
 * Floating button to toggle wedding music on/off
 * Design: Elegant, unobtrusive floating button with pulse animation
 */

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent/90 backdrop-blur-md text-accent-foreground shadow-lg border border-accent/30 flex items-center justify-center hover:bg-accent transition-colors duration-300"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isPlaying ? 'Couper la musique' : 'Activer la musique'}
    >
      {isPlaying ? (
        /* Music playing icon - animated notes */
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          {/* Animated sound waves */}
          <motion.div
            className="absolute -right-1 top-0 w-2 h-full flex flex-col justify-center gap-0.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <div className="w-0.5 h-1 bg-white rounded-full" />
            <div className="w-0.5 h-2 bg-white rounded-full" />
            <div className="w-0.5 h-1 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      ) : (
        /* Music muted icon */
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" opacity="0.5" />
          <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </motion.button>
  );
}
