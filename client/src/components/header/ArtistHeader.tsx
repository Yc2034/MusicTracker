// src/components/header/ArtistHeader.tsx
import React, { useState } from 'react';
import type { ArtistMetrics } from '../../types';
import { ArtistSelector } from './ArtistSelector';
import { AudioPlayer } from './AudioPlayer';
import { formatWithCommas } from '../../utils/formatters';

interface ArtistHeaderProps {
  artistName: string;
  artistImage?: string;
  metrics: ArtistMetrics;
  selectedArtist: string;
  availableArtists: string[];
  onArtistChange: (artist: string) => void;
}

export const ArtistHeader: React.FC<ArtistHeaderProps> = ({
  artistName,
  artistImage,
  metrics,
  selectedArtist,
  availableArtists,
  onArtistChange
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const headerStyle = artistImage ? {
    backgroundImage: `linear-gradient(rgba(29, 35, 42, 0.7), rgba(29, 35, 42, 0.7)), url(${artistImage})`,
  } : {};

  return (
    <>
      <div className="artist-header" style={headerStyle}>
        <div className="artist-info">
          <h1 className="artist-name">{artistName.toUpperCase()}</h1>

          <div className="chart-positions">
            <span className="chart-position">
              No.{metrics.chartPosition} in personal live ({formatWithCommas(metrics.totalStreams)} streams)
            </span>
          </div>
        </div>
        
        <div className="header-controls">
            <AudioPlayer artistName={artistName} />
            <button className="change-artist-btn" onClick={() => setIsSelectorOpen(true)}>
              Change Artist
            </button>
        </div>
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