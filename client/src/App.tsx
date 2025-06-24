// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Hooks
import { useArtistData } from './hooks/useArtistData';

// Services
import { calculateMetrics, processSongsData, fetchArtistData } from './services/api';

// Components
import { ArtistHeader } from './components/header/ArtistHeader';
import { SongsList } from './components/songs/SongsList';
import { AVAILABLE_ARTISTS } from './components/common/Constants';
import type { ArtistData, ArtistMetrics } from './types';

function App() {
  const [selectedArtist, setSelectedArtist] = useState(AVAILABLE_ARTISTS[0]);
  const { artistData, loading: artistLoading, error: artistError } = useArtistData(selectedArtist);
  
  const [allArtistsData, setAllArtistsData] = useState<ArtistData[]>([]);
  const [allArtistsLoading, setAllArtistsLoading] = useState(true);
  const [allArtistsError, setAllArtistsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setAllArtistsLoading(true);
      setAllArtistsError(null);
      try {
        const data = await Promise.all(
          AVAILABLE_ARTISTS.map(artist => fetchArtistData(artist))
        );
        setAllArtistsData(data);
      } catch (err: any) {
        setAllArtistsError(err.message);
        console.error("Failed to fetch all artists data", err);
      } finally {
        setAllArtistsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleArtistChange = (artist: string) => {
    setSelectedArtist(artist);
  };

  // Combined loading and error states
  if (artistLoading || allArtistsLoading) {
    return <div className="loading">Loading...</div>;
  }

  const error = artistError || allArtistsError;
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!artistData) {
    return <div className="no-data">No data available for {selectedArtist}</div>;
  }

  // Calculate metrics and process songs data
  const metrics = calculateMetrics(artistData.name, allArtistsData);
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