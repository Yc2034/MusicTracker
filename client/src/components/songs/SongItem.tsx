// src/components/songs/SongItem.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { formatWithCommas, formatDate } from '../../utils/formatters';

interface SongItemProps {
  song: ProcessedSong;
}

export const SongItem: React.FC<SongItemProps> = ({ song }) => {
  return (
    <div className="song-item-v2">
      <div className="song-rank-v2">
        <span>{song.rank.toString().padStart(2, '0')}</span>
      </div>
      <div className="song-details-v2">
        <span className="song-title-v2" title={song.title}>
          {song.title.toUpperCase()}
        </span>
        <div className="song-meta-v2">
          {/* Display Release Date if it exists */}
          {song.release_date && (
            <span className="meta-item-v2">
              Released: {formatDate(song.release_date)}
            </span>
          )}
          {/* Display Live Event Date if it exists */}
          {song.live_event_date && (
            <span className="meta-item-v2">
              Live: {formatDate(song.live_event_date)} at {song.live_event_location}
            </span>
          )}
        </div>
      </div>
      <div className="song-streams-v2">
        <span>{formatWithCommas(song.currentStreams)}</span>
      </div>
    </div>
  );
};