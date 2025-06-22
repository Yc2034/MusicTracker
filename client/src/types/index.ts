// src/types/index.ts

export interface StreamRecord {
  streams: string;
  record_date: string;
}

export interface Song {
  id: number;
  title: string;
  stream_records: StreamRecord[];
}

export interface ArtistData {
  name: string;
  songs: Song[];
}

export interface ProcessedSong extends Song {
  rank: number;
  currentStreams: number;
  dailyChange: number;
  weeklyChange: number;
  dailyPercentage: number;
  weeklyPercentage: number;
  rankChange: 'up' | 'down' | 'same';
}

export interface ArtistMetrics {
  totalStreams: number;
  dailyStreams: number;
  dailyChange: number;
  weeklyChange: number;
  monthlyListeners: string;
  chartPosition: number;
  peakPosition: number;
  songsAbove1M: number;
  songsAbove500K: number;
  songsAbove300K: number;
  songsAbove100K: number;
  totalSongsTop10: number;
}

export type RankChangeType = 'up' | 'down' | 'same';