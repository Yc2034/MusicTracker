// src/components/songs/SongItem.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { RankIndicator } from '../common/RankIndicator';
import { formatWithCommas, formatDate } from '../../utils/formatters';

interface SongItemProps {
  song: ProcessedSong;
}

export const SongItem: React.FC<SongItemProps> = ({ song }) => {
  return (
    <div className="song-item">
      <div className="song-rank">
        <span className="rank-number">{song.rank}</span>
        <RankIndicator change={song.rankChange} />
        <div className="song-title-container">
            <span className="song-title">{song.title}</span>
            <div className="song-meta">
              {song.live_event_date && (
                <span className="meta-item">
                  Live {formatDate(song.live_event_date)} at {song.live_event_location}
                </span>
              )}
            </div>
        </div>
      </div>
      
      <div className="song-streams">
        <div className="stream-count">{formatWithCommas(song.currentStreams)}</div>
      </div>
      
    </div>
  );
};