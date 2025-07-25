// src/components/dashboard/TopStreamsByArtist.tsx
import React from 'react';
import Tilt from 'react-parallax-tilt';
import type { ArtistStreamCount } from '../../types';
import { formatWithCommas } from '../../utils/formatters';
import '../../styles/components/TopStreamsByArtist.css'; // Styles now include podium

interface TopStreamsByArtistProps {
  topArtists: ArtistStreamCount[];
  onArtistSelect: (artistName: string) => void;
}

// Helper for stream count color grades
const getStreamColorClass = (streams: number) => {
  if (streams > 20_000_000_000) return 'stream-grade-7';
  if (streams > 10_000_000_000) return 'stream-grade-6';
  if (streams > 5_000_000_000) return 'stream-grade-5';
  if (streams > 2_000_000_000) return 'stream-grade-4';
  if (streams > 1_000_000_000) return 'stream-grade-3';
  if (streams > 100_000_000) return 'stream-grade-2';
  return 'stream-grade-1';
};

// Internal Podium component now accepts onArtistSelect
const Podium: React.FC<{ artists: ArtistStreamCount[]; onArtistSelect: (artistName: string) => void; }> = ({ artists, onArtistSelect }) => {
  const goldArtist = artists[0];
  const silverArtist = artists[1];
  const bronzeArtist = artists[2];

  const renderPodiumSpot = (artist: ArtistStreamCount, medal: 'gold' | 'silver' | 'bronze') => {
    const medalEmojis = { gold: '🥇', silver: '🥈', bronze: '🥉' };
    return (
      // Added onClick handler here
      <div className={`podium-spot ${medal}`} onClick={() => onArtistSelect(artist.artistName)}>
        <div className="podium-rank-label">{medalEmojis[medal]}</div>
        <h3 className="podium-artist-name">{artist.artistName}</h3>
        <p className="podium-artist-streams">{formatWithCommas(artist.totalStreams)} streams</p>
      </div>
    );
  };

  return (
    <div className="podium-container">
      {renderPodiumSpot(silverArtist, 'silver')}
      {renderPodiumSpot(goldArtist, 'gold')}
      {renderPodiumSpot(bronzeArtist, 'bronze')}
    </div>
  );
};

export const TopStreamsByArtist: React.FC<TopStreamsByArtistProps> = ({ topArtists, onArtistSelect }) => {
  // Split artists for podium and list
  const podiumArtists = topArtists.slice(0, 3);
  const listArtists = topArtists.slice(3);

  return (
    <div className="top-artists-container">
      <h2 className="top-artists-title">Top Streams by Artist</h2>
      
      {/* Render Podium if we have enough artists and pass the handler */}
      {podiumArtists.length === 3 && <Podium artists={podiumArtists} onArtistSelect={onArtistSelect} />}

      {/* Render the rest of the artists in a list */}
      <div className="top-artists-list">
        {listArtists.map((artist, index) => (
          <Tilt
            key={index}
            scale={1.05}
            glareEnable={true}
            glareMaxOpacity={0.5}
            tiltMaxAngleX={25}
            tiltMaxAngleY={25}
          >
            <div className="top-artist-item" onClick={() => onArtistSelect(artist.artistName)}>
              <div className="top-artist-rank">{index + 4}</div> {/* Start rank from 4 */}
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