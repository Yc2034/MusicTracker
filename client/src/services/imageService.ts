// src/services/imageService.ts
import TheWeekndImage from '../assets/the-weeknd-min.png';
import PostMaloneImage from '../assets/post-malone-min.png';
import BillieEilishImage from '../assets/billie-eilish-min.png';
import IUImage from '../assets/iu-min.png';
import LEImage from '../assets/lesserafim-min.png';
import TaylorImage from '../assets/taylorswift-min.png';
import BlackpinkImage from '../assets/blackpink.jpg';
import KatyImage from '../assets/katy-perry-min.png';
import SabImage from '../assets/sabrina-carpenter-min.png';
import BenImage from '../assets/benson-boone-min.png';
import GidleImage from '../assets/Gidle-min.png';
import IveImage from '../assets/ive-min.png';
import ItzyImage from '../assets/itzy-min.png';
import AespaImage from '../assets/aespa-min.png';
// Import other artist images here
// e.g. import OliviaRodrigoImage from '../assets/olivia-rodrigo.png';

const artistImages: { [key: string]: string } = {
  'The Weeknd': TheWeekndImage,
  'Post Malone': PostMaloneImage,
  'Billie Eilish': BillieEilishImage,
  'IU': IUImage,
  'LE SSERAFIM': LEImage,
  'Taylor Swift': TaylorImage,
  'Blackpink': BlackpinkImage,
  'Katy Perry': KatyImage,
  'Sabrina Carpenter': SabImage,
  'Benson Boone': BenImage,
  'G-idle': GidleImage,
  'Ive': IveImage,
  'Itzy': ItzyImage,
  'Aespa': AespaImage,
  // 'Olivia Rodrigo': OliviaRodrigoImage,
  // Add other artists and their imported images here
};

export const getArtistImage = (artistName: string): string | undefined => {
  return artistImages[artistName];
};