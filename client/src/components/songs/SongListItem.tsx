// src/components/songs/SongListItem.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { formatWithCommas } from '../../utils/formatters';

interface SongListItemProps {
  song: ProcessedSong;
  rank: number;
}

export const SongListItem: React.FC<SongListItemProps> = ({ song, rank }) => {
  return (
    <div className="song-list-item">
      <div className="song-list-rank">{rank}</div>
      <div className="song-list-details">
        <div className="song-list-title">{song.title}</div>
        <div className="song-list-artist">{song.artistName}</div>
      </div>
      <div className="song-list-streams">{formatWithCommas(song.currentStreams)}</div>
    </div>
  );
};
