// src/components/dashboard/Podium.tsx
import React from 'react';
import type { ArtistStreamCount } from '../../types';
import { formatWithCommas } from '../../utils/formatters';
import '../../styles/components/Podium.css';

interface PodiumProps {
  topArtists: ArtistStreamCount[];
}

export const Podium: React.FC<PodiumProps> = ({ topArtists }) => {
  if (!topArtists || topArtists.length < 3) {
    return null; // Don't render if there aren't enough artists
  }

  const goldArtist = topArtists[0];
  const silverArtist = topArtists[1];
  const bronzeArtist = topArtists[2];

  const renderPodiumSpot = (artist: ArtistStreamCount, medal: 'gold' | 'silver' | 'bronze') => {
    const medalEmojis = {
      gold: '🥇',
      silver: '🥈',
      bronze: '🥉'
    };

    return (
      <div className={`podium-spot ${medal}`}>
        <div className="podium-rank-label">{medalEmojis[medal]}</div>
        <h3 className="podium-artist-name">{artist.artistName}</h3>
        <p className="podium-artist-streams">{formatWithCommas(artist.totalStreams)} streams</p>
      </div>
    );
  };

  return (
    <div className="podium-wrapper">
      <div className="podium-container">
        {renderPodiumSpot(silverArtist, 'silver')}
        {renderPodiumSpot(goldArtist, 'gold')}
        {renderPodiumSpot(bronzeArtist, 'bronze')}
      </div>
    </div>
  );
};