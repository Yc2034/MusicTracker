// src/components/dashboard/MusicLive.tsx
import React from 'react';
import { AVAILABLE_ARTISTS, PERSONAL_RANKING } from '../common/Constants';
import '../../styles/components/MusicLive.css';

export const MusicLive = () => {
  // Find artists in PERSONAL_RANKING but not in AVAILABLE_ARTISTS
  const unavailableArtists = PERSONAL_RANKING.filter(
    (artist) => !AVAILABLE_ARTISTS.includes(artist)
  );

  return (
    <div className="music-live-container">
      <div className="unavailable-artists-section">
        <h2 className="unavailable-artists-title">Music Live</h2>
        <div className="artist-table-container">
          <table className="artist-table">
            <thead>
              <tr>
                <th>Switch between artist</th>
              </tr>
            </thead>
            <tbody>
              {unavailableArtists.map((artist, index) => (
                <tr key={index}>
                  <td>{artist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};