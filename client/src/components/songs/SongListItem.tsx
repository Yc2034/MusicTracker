// src/components/songs/SongListItem.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { formatWithCommas, formatDate } from '../../utils/formatters';

interface SongListItemProps {
  song: ProcessedSong;
  rank: number;
}

export const SongListItem: React.FC<SongListItemProps> = ({ song, rank }) => {
  const songItemClasses = `song-list-item ${!song.live_event_date ? 'no-live-event' : ''}`;
  return (
    <div className={songItemClasses}>
      <div className="song-list-rank">{rank}</div>
      <div className="song-list-details">
        <div className="song-list-title">{song.title}</div>
        <div className="song-list-artist">{song.artistName}</div>
        <div className="song-list-meta">
          
          {song.release_date && <span>Released Date: {formatDate(song.release_date)}</span>}
        </div>
      </div>
      <div className="song-list-streams">{formatWithCommas(song.currentStreams)}</div>
    </div>
  );
};