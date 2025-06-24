// src/App.tsx
import React, { useState } from 'react';
import './App.css';

// Hooks
import { useArtistData } from './hooks/useArtistData';

// Services
import { calculateMetrics, processSongsData } from './services/api';

// Components
import { ArtistHeader } from './components/header/ArtistHeader';
import { SongsList } from './components/songs/SongsList';
import { AVAILABLE_ARTISTS } from './components/common/Constants';


function App() {
  const [selectedArtist, setSelectedArtist] = useState(AVAILABLE_ARTISTS[0]);
  const { artistData, loading, error } = useArtistData(selectedArtist);

  const handleArtistChange = (artist: string) => {
    setSelectedArtist(artist);
  };

  // Loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  // No data state
  if (!artistData) {
    return <div className="no-data">No data available for {selectedArtist}</div>;
  }

  // Calculate metrics and process songs data
  const metrics = calculateMetrics(artistData.songs);
  const processedSongs = processSongsData(artistData.songs);

  return (
    <div className="dashboard">
      {/* Artist Header */}
      <ArtistHeader
        artistName={artistData.name}
        metrics={metrics}
        selectedArtist={selectedArtist}
        availableArtists={AVAILABLE_ARTISTS}
        onArtistChange={handleArtistChange}
      />

      {/* Songs List */}
      <SongsList songs={processedSongs} maxSongs={20} />
    </div>
  );
}

export default App;