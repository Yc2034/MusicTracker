// src/components/songs/SongItem.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { RankIndicator } from '../common/RankIndicator';
import { PercentageIndicator } from '../common/PercentageIndicator';
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
        <div className="stream-total">{formatWithCommas(song.currentStreams)} in total</div>
      </div>
      
      <div className="song-changes">
        <div className="daily-change">
          <PercentageIndicator 
            value={Math.abs(song.dailyPercentage)} 
            isPositive={song.dailyChange > 0} 
          />
          <span className="change-detail">
            {song.dailyChange > 0 ? '+' : ''}{formatWithCommas(song.dailyChange)} on 06.11
          </span>
        </div>
        <div className="weekly-change">
          <PercentageIndicator 
            value={Math.abs(song.weeklyPercentage)} 
            isPositive={song.weeklyChange > 0} 
          />
          <span className="change-detail">
            {song.weeklyChange > 0 ? '+' : ''}{formatWithCommas(song.weeklyChange)} on 06.05
          </span>
        </div>
      </div>
    </div>
  );
};