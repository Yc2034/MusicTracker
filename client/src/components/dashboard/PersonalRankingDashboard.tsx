// src/components/dashboard/PersonalRankingDashboard.tsx
import React from 'react';
import { PERSONAL_RANKING } from '../common/Constants';
import '../../styles/components/PersonalRankingDashboard.css';

export const PersonalRankingDashboard: React.FC = () => {
  return (
    <div className="personal-ranking-dashboard">
      <h1 className="personal-ranking-title">My Personal Artist Ranking</h1>
      <ol className="personal-ranking-list">
        {PERSONAL_RANKING.map((artist, index) => (
          <li key={index} className="ranking-list-item">
            <span className="ranking-number">{index + 1}</span>
            <span className="ranking-artist-name">{artist}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};