// src/components/dashboard/PersonalRankingDashboard.tsx
import React from 'react';
import { AVAILABLE_ARTISTS, PERSONAL_RANKING } from '../common/Constants';
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
    const isWhiteKeyArtistAvailable = AVAILABLE_ARTISTS.includes(whiteKeyArtist);
    const whiteKeyRank = rank;
    i++;
    rank++;

    const isBlackKeyPosition = [0, 1, 3, 4, 5].includes((whiteKeyRank - 1) % 7);

    if (isBlackKeyPosition && i < PERSONAL_RANKING.length) {
      const blackKeyArtist = PERSONAL_RANKING[i];
      const isBlackKeyArtistAvailable = AVAILABLE_ARTISTS.includes(blackKeyArtist);
      const blackKeyRank = rank;
      i++;
      rank++;
      
      keys.push(
        <KeySet key={i}>
          <WhiteKey 
            onClick={() => isWhiteKeyArtistAvailable && onArtistSelect(whiteKeyArtist)}
            disabled={!isWhiteKeyArtistAvailable}
          >
            <ArtistRank>#{whiteKeyRank}</ArtistRank>
            <ArtistName>{whiteKeyArtist}</ArtistName>
          </WhiteKey>
          <BlackKey 
            onClick={() => isBlackKeyArtistAvailable && onArtistSelect(blackKeyArtist)}
            disabled={!isBlackKeyArtistAvailable}
          >
            <ArtistRank>#{blackKeyRank}</ArtistRank>
            <ArtistName>{blackKeyArtist}</ArtistName>
          </BlackKey>
        </KeySet>
      );
    } else {
      keys.push(
        <KeySet key={i}>
          <WhiteKey 
            onClick={() => isWhiteKeyArtistAvailable && onArtistSelect(whiteKeyArtist)}
            disabled={!isWhiteKeyArtistAvailable}
          >
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