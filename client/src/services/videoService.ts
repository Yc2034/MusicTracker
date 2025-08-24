// src/services/videoService.ts
import type { Video } from '../types';

const artistVideos: { [key: string]: Video[] } = {
  'Zhou Shen': [
    {
      videoSrc: 'zhoushen-1.mp4',
      title: '9.29Hz演唱会开场',
      description: '完整歌单 https://open.spotify.com/playlist/3gNNFiLoWShDfGP9jvDifz',
      date: '2025-03-09',
    },
  ],
  'G.E.M': [
    {
      videoSrc: 'gem-1.mp4',
      title: 'Light Years Away',
      description: 'Theme song for the movie "Passengers".',
      date: '2025-03-29',
    },
  ],
  'JJ Lin': [
    {
      videoSrc: 'gem-1.mp4',
      title: 'Light Years Away',
      description: 'Theme song for the movie "Passengers".',
      date: '2025-02-22',
    },
  ],
  'Ed Sheeran': [
    {
      videoSrc: 'ed-sheeran-1.mp4',
      title: 'Divide Tour % 演唱会',
      description: '完整歌单 https://www.setlist.fm/stats/average-setlist/ed-sheeran-53d5f3bd.html?year=2018',
      date: '2018-10-20',
    },
  ],
  // Add other artists and their videos here
};

export const getArtistVideos = (artistName: string): Video[] => {
  return artistVideos[artistName] || [];
};