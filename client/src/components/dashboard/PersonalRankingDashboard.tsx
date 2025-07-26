// src/components/dashboard/PersonalRankingDashboard.tsx
import React from 'react';
import { PERSONAL_RANKING } from '../common/Constants';
import { Stars } from '../common/Stars';
import {
  PersonalRankingContainer,
  StarsCanvasContainer,
  PersonalRankingContent,
  PersonalRankingTitle,
  PersonalRankingList,
  RankingListItem,
  RankingNumber,
  RankingArtistName,
} from './PersonalRankingDashboard.styles';

interface PersonalRankingDashboardProps {
  onArtistSelect: (artistName: string) => void;
}

export const PersonalRankingDashboard: React.FC<PersonalRankingDashboardProps> = ({ onArtistSelect }) => {
  return (
    <PersonalRankingContainer>
      <StarsCanvasContainer>
        <Stars />
      </StarsCanvasContainer>
      <PersonalRankingContent>
        <PersonalRankingTitle>My Personal Artist Ranking</PersonalRankingTitle>
        <PersonalRankingList>
          {PERSONAL_RANKING.map((artist, index) => (
            <RankingListItem
              key={index}
              $index={index}
              onClick={() => onArtistSelect(artist)}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && onArtistSelect(artist)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <RankingNumber>{index + 1}</RankingNumber>
              <RankingArtistName>{artist}</RankingArtistName>
            </RankingListItem>
          ))}
        </PersonalRankingList>
      </PersonalRankingContent>
    </PersonalRankingContainer>
  );
};