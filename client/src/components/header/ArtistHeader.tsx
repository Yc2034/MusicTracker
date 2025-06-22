// src/components/header/ArtistHeader.tsx
import React from 'react';
import type { ArtistMetrics } from '../../types';
import { ArtistSelector } from './ArtistSelector';

interface ArtistHeaderProps {
  artistName: string;
  metrics: ArtistMetrics;
  selectedArtist: string;
  availableArtists: string[];
  onArtistChange: (artist: string) => void;
}

export const ArtistHeader: React.FC<ArtistHeaderProps> = ({
  artistName,
  metrics,
  selectedArtist,
  availableArtists,
  onArtistChange
}) => {
  return (
    <div className="artist-header">
      <div className="artist-info">
        <h1 className="artist-name">{artistName.toUpperCase()}</h1>
        <div className="artist-stats">
          <span className="monthly-listeners">
            {metrics.monthlyListeners}(+465,993) Monthly Listeners
          </span>
          <span className="chart-date">Chart Dated Jun12, 2025 (Thursday)</span>
        </div>
        <div className="chart-positions">
          <span className="chart-position">No.{metrics.chartPosition}</span>
          <span className="peak-position">{metrics.peakPosition}</span>
          <span className="total-listeners">
            {(metrics.totalStreams / 1000000).toFixed(3)}
          </span>
        </div>
      </div>
      
      <ArtistSelector
        selectedArtist={selectedArtist}
        availableArtists={availableArtists}
        onArtistChange={onArtistChange}
      />
    </div>
  );
};