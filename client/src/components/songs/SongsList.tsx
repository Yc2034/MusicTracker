// src/components/songs/SongsList.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { SongItem } from './SongItem';

interface SongsListProps {
  songs: ProcessedSong[];
  maxSongs?: number;
}

export const SongsList: React.FC<SongsListProps> = ({ songs, maxSongs = 20 }) => {
  const displaySongs = songs.slice(0, maxSongs);

  return (
    <div className="songs-section">
      <h2 className="songs-title">TOP DAILY STREAMING SONGS</h2>
      <div className="songs-disclaimer">
        Data are retrieved from iworld. Glitches might exist when encountering new releases due to delayed update of data of new songs. We apologise for any inconvenience brought.
      </div>
      
      <div className="songs-grid">
        {displaySongs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};