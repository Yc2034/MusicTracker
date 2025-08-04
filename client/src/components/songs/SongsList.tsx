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
    <div className="songs-section-v2">
      <h2 className="songs-title-v2">TOP SONGS</h2>
      
      <div className="songs-list-v2">
        {displaySongs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};