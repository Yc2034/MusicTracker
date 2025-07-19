// src/components/dashboard/TopStreamsByArtist.tsx
import React from 'react';
import Tilt from 'react-parallax-tilt';
import type { ArtistStreamCount } from '../../types';
import { formatWithCommas } from '../../utils/formatters';
import '../../styles/components/TopStreamsByArtist.css';

interface TopStreamsByArtistProps {
  topArtists: ArtistStreamCount[];
  onArtistSelect: (artistName: string) => void;
}

const getStreamColorClass = (streams: number) => {
  if (streams > 20_000_000_000) return 'stream-grade-7';
  if (streams > 10_000_000_000) return 'stream-grade-6';
  if (streams > 5_000_000_000) return 'stream-grade-5';
  if (streams > 2_000_000_000) return 'stream-grade-4';
  if (streams > 1_000_000_000) return 'stream-grade-3';
  if (streams > 100_000_000) return 'stream-grade-2';
  return 'stream-grade-1';
};

export const TopStreamsByArtist: React.FC<TopStreamsByArtistProps> = ({ topArtists, onArtistSelect }) => {
  return (
    <div className="top-artists-container">
      <h2 className="top-artists-title">Top Streams by Artist</h2>
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
                <div className={`top-artist-song-count ${getStreamColorClass(artist.totalStreams)}`}>
                  {formatWithCommas(artist.totalStreams)} streams
                </div>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};