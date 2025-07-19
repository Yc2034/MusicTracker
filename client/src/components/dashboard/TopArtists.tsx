// src/components/dashboard/TopArtists.tsx
import React from 'react';
import Tilt from 'react-parallax-tilt';
import type { ArtistSongCount } from '../../types';
import { Stars } from '../common/Stars';
import '../../styles/components/TopArtists.css';

interface TopArtistsProps {
  topArtists: ArtistSongCount[];
  onArtistSelect: (artistName: string) => void;
}

export const TopArtists: React.FC<TopArtistsProps> = ({ topArtists, onArtistSelect }) => {
  return (
    <div className="top-artists-container">
      <div className="stars-canvas-container">
        <Stars />
      </div>
      <div className="top-artists-content">
        <h2 className="top-artists-title">Top Listened Artists</h2>
        <div className="top-artists-list">
          {topArtists.map((artist, index) => (
            <Tilt
              key={index}
              scale={1.05}
              glareEnable={true}
              glareMaxOpacity={0.5}
              tiltMaxAngleX={25}
              tiltMaxAngleY={25}
            >
              <div className="top-artist-item" onClick={() => onArtistSelect(artist.artistName)}>
                <div className="top-artist-rank">{index + 1}</div>
                <div className="top-artist-details">
                  <div className="top-artist-name">{artist.artistName}</div>
                  <div className="top-artist-song-count">{artist.songCount} songs</div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
};