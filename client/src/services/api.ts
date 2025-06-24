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
    dailyChange: Math.floor(Math.random() * 1000000), // Mock data
    weeklyChange: Math.floor(Math.random() * 10000000), // Mock data
    monthlyListeners: '67,207,721',
    chartPosition: 24,
    peakPosition: 4
  };
};

/**
 * Process songs data with mock analytics
 */
export const processSongsData = (songs: Song[]): ProcessedSong[] => {
  return songs.map((song, index) => {
    const currentStreams = song.stream_records[0] ? parseInt(song.stream_records[0].streams) : 0;
    const dailyChange = Math.floor(Math.random() * 100000) - 50000; // Mock daily change
    const weeklyChange = Math.floor(Math.random() * 500000) - 250000; // Mock weekly change
    
    return {
      ...song,
      rank: index + 1,
      currentStreams,
      dailyChange,
      weeklyChange,
      dailyPercentage: currentStreams > 0 ? (dailyChange / currentStreams) * 100 : 0,
      weeklyPercentage: currentStreams > 0 ? (weeklyChange / currentStreams) * 100 : 0,
      rankChange: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'same'
    };
  });
};