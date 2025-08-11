// src/components/dashboard/PersonalSongsDashboard.tsx
import React from 'react';
import type { ArtistData, ProcessedSong } from '../../types';
import { processSongsData, getTopArtistsBySongCount, getTopArtistsByStreamCount } from '../../services/api';
import { SongListItem } from '../songs/SongListItem';
import { TopArtists } from './TopArtists';
import { TopStreamsByArtist } from './TopStreamsByArtist'; // The only component needed now
import '../../styles/components/PersonalSongsDashboard.css';

interface PersonalSongsDashboardProps {
  allArtistsData: ArtistData[];
  onArtistSelect: (artistName: string) => void;
}

export const PersonalSongsDashboard: React.FC<PersonalSongsDashboardProps> = ({ allArtistsData, onArtistSelect }) => {
  const allSongs: ProcessedSong[] = allArtistsData.flatMap(artist =>
    processSongsData(artist.songs, artist.name)
  );

  const songsSeenLive = allSongs.filter(song => song.live_event_date);
  const sortedSongs = songsSeenLive.sort((a, b) => b.currentStreams - a.currentStreams);
  const top100Songs = sortedSongs.slice(0, 100);

  const topArtistsBySongCount = getTopArtistsBySongCount(allArtistsData);
  const topArtistsByStreams = getTopArtistsByStreamCount(allArtistsData);

  return (
    <div className="personal-songs-dashboard">
      <TopArtists topArtists={topArtistsBySongCount} onArtistSelect={onArtistSelect} />
      
      {/* Simplified: Just pass all top streamed artists to the component */}
      <TopStreamsByArtist topArtists={topArtistsByStreams} onArtistSelect={onArtistSelect} />
      
      <h1 className="personal-songs-title">Top Streamed Songs I've Seen Live</h1>
      <div className="songs-list">
        {top100Songs.map((song, index) => (
          <SongListItem key={`${song.id}-${song.artistName}`} song={song} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};