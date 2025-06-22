// src/components/header/ArtistSelector.tsx
import React from 'react';

interface ArtistSelectorProps {
  selectedArtist: string;
  availableArtists: string[];
  onArtistChange: (artist: string) => void;
}

export const ArtistSelector: React.FC<ArtistSelectorProps> = ({
  selectedArtist,
  availableArtists,
  onArtistChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onArtistChange(event.target.value);
  };

  return (
    <div className="artist-selector">
      <select value={selectedArtist} onChange={handleChange}>
        {availableArtists.map(artist => (
          <option key={artist} value={artist}>
            {artist.charAt(0).toUpperCase() + artist.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};