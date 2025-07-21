// src/components/dashboard/PersonalRankingDashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_RANKING } from '../common/Constants';
import { Stars } from '../common/Stars';
import '../../styles/components/PersonalRankingDashboard.css';

interface PersonalRankingDashboardProps {
  onArtistSelect: (artistName: string) => void;
}

export const PersonalRankingDashboard: React.FC<PersonalRankingDashboardProps> = ({ onArtistSelect }) => {
  return (
    <div className="personal-ranking-dashboard">
      <div className="stars-canvas-container">
        <Stars />
      </div>
      <div className="personal-ranking-content">
        <h1 className="personal-ranking-title">My Personal Artist Ranking</h1>
        <ol className="personal-ranking-list">
          {PERSONAL_RANKING.map((artist, index) => (
            <motion.li
              key={index}
              className="ranking-list-item"
              // Add this style to pass the index to CSS
              style={{ '--i': index } as React.CSSProperties}
              onClick={() => onArtistSelect(artist)}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && onArtistSelect(artist)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="ranking-number">{index + 1}</span>
              <span className="ranking-artist-name">{artist}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
};