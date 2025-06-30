// src/components/dashboard/TopArtists.tsx
import React from 'react';
import type { ArtistSongCount } from '../../types';
import '../../styles/components/TopArtists.css';

interface TopArtistsProps {
  topArtists: ArtistSongCount[];
}

export const TopArtists: React.FC<TopArtistsProps> = ({ topArtists }) => {
  return (
    <div className="top-artists-container">
      <h2 className="top-artists-title">Top Listened Artists</h2>
      <div className="top-artists-list">
        {topArtists.map((artist, index) => (
          <div key={index} className="top-artist-item">
            <div className="top-artist-rank">{index + 1}</div>
            <div className="top-artist-details">
              <div className="top-artist-name">{artist.artistName}</div>
              <div className="top-artist-song-count">{artist.songCount} songs</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};