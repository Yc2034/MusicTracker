// src/components/dashboard/TopArtists.tsx
import React from 'react';
// Import Variants alongside motion
import { motion, type Variants } from 'framer-motion';
import type { ArtistSongCount } from '../../types';
import '../../styles/components/TopArtists.css';

interface TopArtistsProps {
  topArtists: ArtistSongCount[];
  onArtistSelect: (artistName: string) => void;
}

// Add the : Variants type annotation
const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

// Add the : Variants type annotation here as well
const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
};

const itemVariantsRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
      },
    },
  };

export const TopArtists: React.FC<TopArtistsProps> = ({ topArtists, onArtistSelect }) => {
  // ... rest of your component code remains the same
  return (
    <div className="top-artists-container">
      <h2 className="top-artists-title">Most Songs Collected</h2>
      <motion.div
        className="top-artists-list"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {topArtists.map((artist, index) => (
          <motion.div
            key={index}
            className={`top-artist-item ${index % 2 !== 0 ? 'right-aligned' : ''}`}
            onClick={() => onArtistSelect(artist.artistName)}
            variants={index % 2 === 0 ? itemVariants : itemVariantsRight}
            whileHover={{
              x: 8,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="top-artist-accent" />
            <div className="top-artist-rank">#{(index + 1).toString().padStart(2, '0')}</div>
            <div className="top-artist-details">
              <div className="top-artist-name">{artist.artistName}</div>
              <div className="top-artist-song-count">{artist.songCount} songs</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};