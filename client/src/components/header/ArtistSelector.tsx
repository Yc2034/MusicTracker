// src/components/header/ArtistSelector.tsx
import React from 'react';
import '../../styles/components/ArtistSelector.css';

interface ArtistSelectorProps {
  selectedArtist: string;
  availableArtists: string[];
  onArtistChange: (artist: string) => void;
  onClose: () => void;
}

export const ArtistSelector: React.FC<ArtistSelectorProps> = ({
  selectedArtist,
  availableArtists,
  onArtistChange,
  onClose
}) => {
  const handleSelectArtist = (artist: string) => {
    onArtistChange(artist);
    onClose();
  };

  return (
    <div className="artist-selector-modal" onClick={onClose}>
      <div className="artist-selector-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="artist-selector-title">Select an Artist</h2>
        <div className="artist-selector-grid">
          {availableArtists.map(artist => (
            <div
              key={artist}
              className={`artist-card ${selectedArtist === artist ? 'selected' : ''}`}
              onClick={() => handleSelectArtist(artist)}
            >
              {artist}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};