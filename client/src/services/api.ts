// src/services/api.ts
import axios from 'axios';
import type { ArtistData, ArtistMetrics, ProcessedSong, Song } from '../types';

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
export const calculateMetrics = (songs: Song[]): ArtistMetrics => {
  const processedSongs = songs.map(song => {
    const currentStreams = song.stream_records[0] ? parseInt(song.stream_records[0].streams) : 0;
    return { ...song, currentStreams };
  });

  const totalStreams = processedSongs.reduce((sum, song) => sum + song.currentStreams, 0);

  
  return {
    totalStreams,
    chartPosition: 1,
    peakPosition: 2
  };
};

/**
 * Process songs data with mock analytics
 */
export const processSongsData = (songs: Song[]): ProcessedSong[] => {
  return songs.map((song, index) => {
    const currentStreams = song.stream_records[0] ? parseInt(song.stream_records[0].streams) : 0;
    
    return {
      ...song,
      rank: index + 1,
      currentStreams,
      rankChange: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'same'
    };
  });
};