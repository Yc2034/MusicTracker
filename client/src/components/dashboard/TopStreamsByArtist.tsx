// src/components/dashboard/TopStreamsByArtist.tsx
import React from 'react';
import type { ArtistStreamCount } from '../../types';
import { formatWithCommas } from '../../utils/formatters';
import '../../styles/components/TopStreamsByArtist.css';

interface TopStreamsByArtistProps {
  topArtists: ArtistStreamCount[];
}

export const TopStreamsByArtist: React.FC<TopStreamsByArtistProps> = ({ topArtists }) => {
  return (
    <div className="top-artists-container">
      <h2 className="top-artists-title">Top Streams by Artist</h2>
      <div className="top-artists-list">
        {topArtists.map((artist, index) => (
          <div key={index} className="top-artist-item">
            <div className="top-artist-rank">{index + 1}</div>
            <div className="top-artist-details">
              <div className="top-artist-name">{artist.artistName}</div>
              <div className="top-artist-song-count">{formatWithCommas(artist.totalStreams)} streams</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};