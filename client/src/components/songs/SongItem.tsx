// src/components/songs/SongItem.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { RankIndicator } from '../common/RankIndicator';
import { formatWithCommas } from '../../utils/formatters';

interface SongItemProps {
  song: ProcessedSong;
}

export const SongItem: React.FC<SongItemProps> = ({ song }) => {
  return (
    <div className="song-item">
      <div className="song-rank">
        <span className="rank-number">{song.rank}</span>
        <RankIndicator change={song.rankChange} />
        <span className="song-title">{song.title}</span>
      </div>
      
      <div className="song-streams">
        <div className="stream-count">{formatWithCommas(song.currentStreams)}</div>
      </div>
      
    </div>
  );
};