// src/components/dashboard/PersonalRankingDashboard.tsx
import React from 'react';
import { PERSONAL_RANKING } from '../common/Constants';
import { Stars } from '../common/Stars';
import {
  PersonalRankingContainer,
  StarsCanvasContainer,
  PersonalRankingContent,
  PersonalRankingTitle,
  PianoContainer,
  KeySet,
  WhiteKey,
  BlackKey,
  ArtistName,
  ArtistRank,
} from './PersonalRankingDashboard.styles';

interface PersonalRankingDashboardProps {
  onArtistSelect: (artistName: string) => void;
}

export const PersonalRankingDashboard: React.FC<PersonalRankingDashboardProps> = ({ onArtistSelect }) => {
  const keys = [];
  let i = 0;
  let rank = 1;

  while (i < PERSONAL_RANKING.length) {
    const whiteKeyArtist = PERSONAL_RANKING[i];
    const whiteKeyRank = rank;
    i++;
    rank++;

    const isBlackKeyPosition = [0, 1, 3, 4, 5].includes((whiteKeyRank - 1) % 7);

    if (isBlackKeyPosition && i < PERSONAL_RANKING.length) {
      const blackKeyArtist = PERSONAL_RANKING[i];
      const blackKeyRank = rank;
      i++;
      rank++;
      
      keys.push(
        <KeySet key={i}>
          <WhiteKey onClick={() => onArtistSelect(whiteKeyArtist)}>
            <ArtistRank>#{whiteKeyRank}</ArtistRank>
            <ArtistName>{whiteKeyArtist}</ArtistName>
          </WhiteKey>
          <BlackKey onClick={() => onArtistSelect(blackKeyArtist)}>
            <ArtistRank>#{blackKeyRank}</ArtistRank>
            <ArtistName>{blackKeyArtist}</ArtistName>
          </BlackKey>
        </KeySet>
      );
    } else {
      keys.push(
        <KeySet key={i}>
          <WhiteKey onClick={() => onArtistSelect(whiteKeyArtist)}>
            <ArtistRank>#{whiteKeyRank}</ArtistRank>
            <ArtistName>{whiteKeyArtist}</ArtistName>
          </WhiteKey>
        </KeySet>
      );
    }
  }

  return (
    <PersonalRankingContainer>
      <StarsCanvasContainer>
        <Stars />
      </StarsCanvasContainer>
      <PersonalRankingContent>
        <PersonalRankingTitle>My Personal Artist Ranking</PersonalRankingTitle>
        <PianoContainer>
          {keys}
        </PianoContainer>
      </PersonalRankingContent>
    </PersonalRankingContainer>
  );
};