// src/components/dashboard/TopStreamsByArtist.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { ArtistStreamCount } from '../../types';
import { formatWithCommas } from '../../utils/formatters';
import '../../styles/components/TopStreamsByArtist.css';

interface TopStreamsByArtistProps {
  topArtists: ArtistStreamCount[];
  onArtistSelect: (artistName: string) => void;
}

// Helper for stream count color grades (no changes)
const getStreamColorClass = (streams: number) => {
  if (streams > 20_000_000_000) return 'stream-grade-7';
  if (streams > 10_000_000_000) return 'stream-grade-6';
  if (streams > 5_000_000_000) return 'stream-grade-5';
  if (streams > 2_000_000_000) return 'stream-grade-4';
  if (streams > 1_000_000_000) return 'stream-grade-3';
  if (streams > 100_000_000) return 'stream-grade-2';
  return 'stream-grade-1';
};

// Internal V2 Podium component (no changes)
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
  
  // Find the max stream count among the list artists to normalize bar widths
  const maxStreams = Math.max(...listArtists.map(a => a.totalStreams), 0);

  return (
    <div className="top-artists-container-v2">
      <h2 className="top-artists-title-v2">Top Streams by Artist</h2>
      
      {podiumArtists.length === 3 && <PodiumV2 artists={podiumArtists} onArtistSelect={onArtistSelect} />}

      <div className="artist-bar-chart-list">
        {listArtists.map((artist, index) => {
          const barWidth = maxStreams > 0 ? (artist.totalStreams / maxStreams) * 100 : 0;
          return (
            <motion.div
              key={index}
              className="artist-bar-item"
              onClick={() => onArtistSelect(artist.artistName)}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            >
              <div className="bar-rank">#{index + 4}</div>
              <div className="bar-artist-name">{artist.artistName}</div>
              <div className="bar-graph">
                <motion.div
                  className="bar-fill"
                  style={{ width: `${barWidth}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="bar-stream-count">{formatWithCommas(artist.totalStreams)}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};