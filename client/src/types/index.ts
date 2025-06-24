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
  chartPosition: number;
  peakPosition: number;
}

export type RankChangeType = 'up' | 'down' | 'same';