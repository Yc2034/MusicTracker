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
      <div className="song-list-card">
        <div className="song-list-rank">#{rank.toString().padStart(2, '0')}</div>
        <div className="song-list-streams">{formatWithCommas(song.currentStreams)}</div>
        <div className="song-list-info">
          <div className="song-list-artist">{song.artistName}</div>
          <div className="song-list-title" title={song.title}>{song.title}</div>
        </div>
        <div className="song-list-meta">
          {song.release_date && <span>Released: {formatDate(song.release_date)}</span>}
          {song.live_event_date && <span>Live: {formatDate(song.live_event_date)}</span>}
        </div>
        <div className="song-list-accent"></div>
      </div>
    </div>
  );
};