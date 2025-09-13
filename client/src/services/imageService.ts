// src/services/imageService.ts
import TheWeekndImage from '../assets/the-weeknd.png';
import PostMaloneImage from '../assets/post-malone.png';
import BillieEilishImage from '../assets/billie-eilish.png';
import IUImage from '../assets/iu.png';
import LEImage from '../assets/lesserafim.png';
import TaylorImage from '../assets/taylorswift.png';
// Import other artist images here
// e.g. import OliviaRodrigoImage from '../assets/olivia-rodrigo.png';

const artistImages: { [key: string]: string } = {
  'The Weeknd': TheWeekndImage,
  'Post Malone': PostMaloneImage,
  'Billie Eilish': BillieEilishImage,
  'IU': IUImage,
  'LE SSERAFIM': LEImage,
  'Taylor Swift': TaylorImage,
  // 'Olivia Rodrigo': OliviaRodrigoImage,
  // Add other artists and their imported images here
};

export const getArtistImage = (artistName: string): string | undefined => {
  return artistImages[artistName];
};