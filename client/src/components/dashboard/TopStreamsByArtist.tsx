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

  return (
    <div className="top-artists-container-v2">
      <h2 className="top-artists-title-v2">Top Streams by Artist</h2>
      
      {podiumArtists.length === 3 && <PodiumV2 artists={podiumArtists} onArtistSelect={onArtistSelect} />}

      <motion.div 
        className="artist-honeycomb-v2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        {listArtists.map((artist, index) => (
          <motion.div
            key={index}
            className="honeycomb-cell-v2"
            onClick={() => onArtistSelect(artist.artistName)}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Front Face */}
            <div className="honeycomb-face honeycomb-face--front">
              <div className="honeycomb-rank-v2">#{index + 4}</div>
              <div className="honeycomb-artist-name-v2">{artist.artistName}</div>
              <div className={`honeycomb-artist-streams-v2 ${getStreamColorClass(artist.totalStreams)}`}>
                {formatWithCommas(artist.totalStreams)} streams
              </div>
            </div>

            {/* Back Face */}
            <div className="honeycomb-face honeycomb-face--back">
              View Stats
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};