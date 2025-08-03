// src/components/header/ArtistSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArtistSelectorOverlay,
  ArtistSelectorContent,
  ArtistList,
  ArtistListItem,
  ArtistName,
  CloseButton
} from './ArtistSelector.styles';
import { AVAILABLE_ARTISTS } from '../common/Constants'; // Import the master list

interface ArtistSelectorProps {
  selectedArtist: string;
  availableArtists: string[]; // This prop is kept for compatibility but will be ignored
  onArtistChange: (artist: string) => void;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const ArtistSelector: React.FC<ArtistSelectorProps> = ({
  selectedArtist,
  onArtistChange,
  onClose
}) => {

  const handleSelectArtist = (artist: string) => {
    if (artist === selectedArtist) {
      return;
    }
    onArtistChange(artist);
    onClose();
  };

  // Ensure we only ever use the top 25 artists from the definitive list
  const top13Artists = AVAILABLE_ARTISTS.slice(0, 25);

  return (
    <ArtistSelectorOverlay
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ArtistSelectorContent>
        <ArtistList
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {top13Artists.map((artist) => { // Render using the corrected top 13 list
            const isSelected = artist === selectedArtist;
            return (
              <ArtistListItem
                key={artist}
                variants={itemVariants}
                onClick={() => handleSelectArtist(artist)}
                $isSelected={isSelected}
                whileHover={!isSelected ? { scale: 1.02 } : {}}
                whileTap={!isSelected ? { scale: 0.98 } : {}}
              >
                <ArtistName>{artist}</ArtistName>
              </ArtistListItem>
            );
          })}
        </ArtistList>
      </ArtistSelectorContent>
    </ArtistSelectorOverlay>
  );
};