// src/services/imageService.ts
import TheWeekndImage from '../assets/the-weeknd.png';
// Import other artist images here
// e.g. import OliviaRodrigoImage from '../assets/olivia-rodrigo.png';

const artistImages: { [key: string]: string } = {
  'The Weeknd': TheWeekndImage,
  // 'Olivia Rodrigo': OliviaRodrigoImage,
  // Add other artists and their imported images here
};

export const getArtistImage = (artistName: string): string | undefined => {
  return artistImages[artistName];
};