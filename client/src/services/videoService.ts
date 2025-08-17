// src/services/videoService.ts
import type { Video } from '../types';

const artistVideos: { [key: string]: Video[] } = {
  'Zhou Shen': [
    {
      videoSrc: 'zhoushen-1.mp4',
      title: '开场',
      description: 'A brief description of the video.',
      date: '2025-01-01',
    },
    {
      videoSrc: 'zhoushen-2.mp4',
      title: 'Song Title 2',
      description: 'Another brief description.',
      date: '2025-02-15',
    },
    {
      videoSrc: 'zhoushen-3.mp4',
      title: 'Song Title 3',
      description: 'Another brief description 3.',
      date: '2025-02-15',
    },
  ],
  'G.E.M': [
    {
      videoSrc: 'gem-1.mp4',
      title: 'Light Years Away',
      description: 'Theme song for the movie "Passengers".',
      date: '2024-12-20',
    },
  ],
  // Add other artists and their videos here
};

export const getArtistVideos = (artistName: string): Video[] => {
  return artistVideos[artistName] || [];
};