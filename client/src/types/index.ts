// src/types/index.ts

export interface StreamRecord {
  id: number;
  songId: number;
  streams: string;
  record_date: string;
}

export interface Song {
  id: number;
  title: string;
  artistId: number;
  is_liked: boolean;
  live_event_date: string | null;
  live_event_location: string | null;
  release_date: string | null;
  stream_records: StreamRecord[];
}

export interface ArtistData {
  id: number;
  name: string;
  kword_url: string | null;
  songs: Song[];
}

export interface ProcessedSong extends Song {
  rank: number;
  currentStreams: number;
  rankChange: 'up' | 'down' | 'same';
  artistName: string;
}

export interface ArtistMetrics {
  totalStreams: number;
  chartPosition: number;
}

export type RankChangeType = 'up' | 'down' | 'same';

export interface ArtistSongCount {
  artistName: string;
  songCount: number;
}

export interface ArtistStreamCount {
  artistName: string;
  totalStreams: number;
}