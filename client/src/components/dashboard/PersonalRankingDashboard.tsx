// src/components/dashboard/PersonalRankingDashboard.tsx
import React from 'react';
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
            <li
              key={index}
              className="ranking-list-item"
              onClick={() => onArtistSelect(artist)}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && onArtistSelect(artist)}
            >
              <span className="ranking-number">{index + 1}</span>
              <span className="ranking-artist-name">{artist}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};