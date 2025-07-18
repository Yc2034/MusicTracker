// src/components/dashboard/TopArtists.tsx
import React from 'react';
import type { ArtistSongCount } from '../../types';
import { Stars } from '../common/Stars';
import '../../styles/components/TopArtists.css';

interface TopArtistsProps {
  topArtists: ArtistSongCount[];
}

export const TopArtists: React.FC<TopArtistsProps> = ({ topArtists }) => {
  return (
    <div className="top-artists-container">
      <div className="stars-canvas-container">
        <Stars />
      </div>
      <div className="top-artists-content">
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
    </div>
  );
};