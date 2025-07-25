// src/components/header/ArtistSelector.tsx
import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const artistsPerPage = 10;
  const totalPages = Math.ceil(availableArtists.length / artistsPerPage);

  const handleSelectArtist = (artist: string) => {
    onArtistChange(artist);
    onClose();
  };

  const getCurrentPageArtists = () => {
    const startIndex = currentPage * artistsPerPage;
    const endIndex = startIndex + artistsPerPage;
    return availableArtists.slice(startIndex, endIndex);
  };

  const getCircularPosition = (index: number) => {
    // Calculate angle for clockwise positioning (starting from top)
    const angle = (index * (360 / 10)) - 90; // -90 to start from top
    const radians = (angle * Math.PI) / 180;
    const radius = 180; // Increased radius for better spacing
    
    // Adjust position to place clickable area above the divider line
    // For bottom positions (angles between 90 and 270 degrees), offset upward
    const adjustedAngle = angle + 90; // Convert to 0-360 range
    const isBottomHalf = adjustedAngle > 90 && adjustedAngle < 270;
    const yOffset = isBottomHalf ? -40 : 0; // Move up by 40px for bottom positions
    
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius + yOffset,
    };
  };

  const getDividerLinePosition = (index: number) => {
    // Calculate angle for divider lines
    const angle = (index * (360 / 10)) - 90;
    const radians = (angle * Math.PI) / 180;
    const innerRadius = 140;
    const outerRadius = 200;
    
    return {
      x1: Math.cos(radians) * innerRadius,
      y1: Math.sin(radians) * innerRadius,
      x2: Math.cos(radians) * outerRadius,
      y2: Math.sin(radians) * outerRadius,
    };
  };

  const currentPageArtists = getCurrentPageArtists();

  return (
    <div className="artist-selector-modal" onClick={onClose}>
      <div className="artist-selector-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="artist-selector-title">Select an Artist</h2>
        
        {totalPages > 1 && (
          <div className="pagination-info">
            Page {currentPage + 1} of {totalPages}
          </div>
        )}

        <div className="artist-circle-container">
          <div className="artist-circle">
            {/* SVG for divider lines */}
            <svg className="circle-dividers" width="450" height="450" viewBox="0 0 450 450">
              {Array.from({ length: 10 }, (_, index) => {
                const line = getDividerLinePosition(index);
                return (
                  <line
                    key={`divider-${index}`}
                    x1={225 + line.x1}
                    y1={225 + line.y1}
                    x2={225 + line.x2}
                    y2={225 + line.y2}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                );
              })}
            </svg>

            {/* Artist slots */}
            {Array.from({ length: 10 }, (_, index) => {
              const artist = currentPageArtists[index];
              const position = getCircularPosition(index);
              
              return (
                <div
                  key={`slot-${index}`}
                  className={`artist-slot ${artist ? 'has-artist' : 'empty-slot'}`}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                  }}
                >
                  {artist && (
                    <div
                      className={`artist-card ${selectedArtist === artist ? 'selected' : ''}`}
                      onClick={() => handleSelectArtist(artist)}
                    >
                      {artist}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              ← Previous
            </button>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};