// src/components/header/ArtistHeader.tsx
import React, { useState } from 'react';
import type { ArtistMetrics } from '../../types';
import { ArtistSelector } from './ArtistSelector';
import { formatWithCommas } from '../../utils/formatters';

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
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  return (
    <>
      <div className="artist-header">
        <div className="artist-info">
          <h1 className="artist-name">{artistName.toUpperCase()}</h1>

          <div className="chart-positions">
            <span className="chart-position">
              No.{metrics.chartPosition} in personal live ({formatWithCommas(metrics.totalStreams)} streams)
            </span>
          </div>
        </div>
        
        <button className="change-artist-btn" onClick={() => setIsSelectorOpen(true)}>
          Change Artist
        </button>
      </div>

      {isSelectorOpen && (
        <ArtistSelector
          selectedArtist={selectedArtist}
          availableArtists={availableArtists}
          onArtistChange={onArtistChange}
          onClose={() => setIsSelectorOpen(false)}
        />
      )}
    </>
  );
};