// src/components/dashboard/PersonalSongsDashboard.tsx
import React from 'react';
import type { ArtistData, ProcessedSong } from '../../types';
import { processSongsData } from '../../services/api';
import { SongListItem } from '../songs/SongListItem';
import '../../styles/components/PersonalSongsDashboard.css';

interface PersonalSongsDashboardProps {
  allArtistsData: ArtistData[];
}

export const PersonalSongsDashboard: React.FC<PersonalSongsDashboardProps> = ({ allArtistsData }) => {
  const allSongs: ProcessedSong[] = allArtistsData.flatMap(artist => 
    processSongsData(artist.songs, artist.name)
  );

  const sortedSongs = allSongs.sort((a, b) => b.currentStreams - a.currentStreams);

  const top50Songs = sortedSongs.slice(0, 50);

  return (
    <div className="personal-songs-dashboard">
      <h1 className="personal-songs-title">Top Streamed Songs I've Seen Live</h1>
      <div className="songs-list">
        {top50Songs.map((song, index) => (
          <SongListItem key={`${song.id}-${song.artistName}`} song={song} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};
