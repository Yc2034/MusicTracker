// src/services/api.ts
import axios from 'axios';
import type { ArtistData, ArtistMetrics, ProcessedSong, Song, ArtistSongCount } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetch artist data from the API
 */
export const fetchArtistData = async (artistName: string): Promise<ArtistData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/artist/${artistName}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Error: ${error.response.status} - ${error.response.data.error || 'Artist not found'}`);
    } else if (error.request) {
      throw new Error('Failed to fetch data. Is the server running and accessible?');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

/**
 * Calculate metrics from songs data
 */
export const calculateMetrics = (
  selectedArtistName: string,
  allArtistsData: ArtistData[]
): ArtistMetrics => {
  // Guard against undefined or non-array data
  if (!Array.isArray(allArtistsData)) {
    return { totalStreams: 0, chartPosition: 0 };
  }

  const artistStreams = allArtistsData
    .filter(artist => artist && artist.songs) // Ensure artist and songs exist
    .map(artist => {
      const totalStreams = artist.songs.reduce((sum, song) => {
        const currentStreams = song.stream_records && song.stream_records[0] ? parseInt(song.stream_records[0].streams, 10) : 0;
        return sum + currentStreams;
      }, 0);
      return { artistName: artist.name, totalStreams };
    });

  artistStreams.sort((a, b) => b.totalStreams - a.totalStreams);

  const chartPosition = artistStreams.findIndex(artist => artist.artistName === selectedArtistName) + 1;

  const selectedArtistMetrics = artistStreams.find(artist => artist.artistName === selectedArtistName);

  return {
    totalStreams: selectedArtistMetrics ? selectedArtistMetrics.totalStreams : 0,
    chartPosition: chartPosition || 0,
  };
};


/**
 * Process songs data with mock analytics
 */
export const processSongsData = (songs: Song[], artistName: string): ProcessedSong[] => {
  const sortedSongs = songs
    .map(song => {
      const currentStreams = song.stream_records[0] ? parseInt(song.stream_records[0].streams) : 0;
      return {
        ...song,
        currentStreams,
        artistName,
        // Default rank and rankChange, will be updated after sorting
        rank: 0,
        rankChange: 'same' as const,
      };
    })
    .sort((a, b) => b.currentStreams - a.currentStreams);

  return sortedSongs.map((song, index) => ({
    ...song,
    rank: index + 1,
    rankChange: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'same',
  }));
};

/**
 * Calculate top artists by song count.
 */
export const getTopArtistsBySongCount = (allArtistsData: ArtistData[]): ArtistSongCount[] => {
  const artistSongCounts: ArtistSongCount[] = allArtistsData.map(artist => ({
    artistName: artist.name,
    songCount: artist.songs.length
  }));

  return artistSongCounts.sort((a, b) => b.songCount - a.songCount).slice(0, 3);
};