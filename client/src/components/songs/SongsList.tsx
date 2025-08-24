// src/components/songs/SongsList.tsx
import React from 'react';
import type { ProcessedSong } from '../../types';
import { SongItem } from './SongItem';
import { FixedSizeList as List } from 'react-window';

interface SongsListProps {
  songs: ProcessedSong[];
  maxSongs?: number;
}

// Row component to render each song item
const Row = ({ index, style, data }: { index: number; style: React.CSSProperties; data: ProcessedSong[] }) => {
  const song = data[index];
  return (
    <div style={style}>
      <SongItem key={song.id} song={song} />
    </div>
  );
};

export const SongsList: React.FC<SongsListProps> = ({ songs, maxSongs = 50 }) => {
  const displaySongs = songs.slice(0, maxSongs);

  return (
    <div className="songs-section-v2">
      <h2 className="songs-title-v2">TOP SONGS</h2>
      
      <div className="songs-list-v2">
        <List
          height={800} // You can adjust this height
          itemCount={displaySongs.length}
          itemSize={150} // Approximate height of a single SongItem
          width={'100%'}
          itemData={displaySongs}
        >
          {Row}
        </List>
      </div>
    </div>
  );
};