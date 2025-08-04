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

// Internal V2 Podium component
const PodiumV2: React.FC<{ artists: ArtistStreamCount[]; onArtistSelect: (artistName: string) => void; }> = ({ artists, onArtistSelect }) => {
  const [gold, silver, bronze] = artists;

  const renderPodiumSpot = (artist: ArtistStreamCount, rank: 'gold' | 'silver' | 'bronze') => {
    const rankText = { gold: '1ST', silver: '2ND', bronze: '3RD' };
    return (
      <div className={`podium-spot-v2 ${rank}`} onClick={() => onArtistSelect(artist.artistName)}>
        <div className="podium-details-v2">
          <span className="podium-rank-v2">{rankText[rank]}</span>
          <h3 className="podium-artist-name-v2">{artist.artistName}</h3>
          <p className="podium-artist-streams-v2">{formatWithCommas(artist.totalStreams)} streams</p>
        </div>
      </div>
    );
  };

  return (
    <div className="podium-container-v2">
      {renderPodiumSpot(silver, 'silver')}
      {renderPodiumSpot(gold, 'gold')}
      {renderPodiumSpot(bronze, 'bronze')}
    </div>
  );
};

export const TopStreamsByArtist: React.FC<TopStreamsByArtistProps> = ({ topArtists, onArtistSelect }) => {
  const podiumArtists = topArtists.slice(0, 3);
  const listArtists = topArtists.slice(3);

  return (
    <div className="top-artists-container-v2">
      <h2 className="top-artists-title-v2">Top Streams by Artist</h2>
      
      {podiumArtists.length === 3 && <PodiumV2 artists={podiumArtists} onArtistSelect={onArtistSelect} />}

      <div className="top-artists-list-v2">
        {listArtists.map((artist, index) => (
          <Tilt
            key={index}
            scale={1.05}
            glareEnable={true}
            glareMaxOpacity={0.5}
            tiltMaxAngleX={25}
            tiltMaxAngleY={25}
          >
            <div className="top-artist-item-v2" onClick={() => onArtistSelect(artist.artistName)}>
              <div className="top-artist-rank-v2">{index + 4}</div>
              <div className="top-artist-details-v2">
                <div className="top-artist-name-v2">{artist.artistName}</div>
                <div className={`top-artist-song-count-v2 ${getStreamColorClass(artist.totalStreams)}`}>
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