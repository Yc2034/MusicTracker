// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Hooks
import { useArtistData } from './hooks/useArtistData';

// Services
import { calculateMetrics, processSongsData, fetchArtistData } from './services/api';
import { getArtistImage } from './services/imageService';

// Components
import { ArtistHeader } from './components/header/ArtistHeader';
import { SongsList } from './components/songs/SongsList';
import { PersonalSongsDashboard } from './components/dashboard/PersonalSongsDashboard';
import { PersonalRankingDashboard } from './components/dashboard/PersonalRankingDashboard';
import { AVAILABLE_ARTISTS } from './components/common/Constants';
import type { ArtistData } from './types';

type DashboardView = 'artist' | 'personal' | 'personal-ranking';

function App() {
  const [selectedArtist, setSelectedArtist] = useState(AVAILABLE_ARTISTS[0]);
  const { artistData, loading: artistLoading, error: artistError } = useArtistData(selectedArtist);
  
  const [allArtistsData, setAllArtistsData] = useState<ArtistData[]>([]);
  const [allArtistsLoading, setAllArtistsLoading] = useState(true);
  const [allArtistsError, setAllArtistsError] = useState<string | null>(null);

  const [dashboardView, setDashboardView] = useState<DashboardView>('artist');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      } finally {
        setAllArtistsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleArtistChange = (artist: string) => {
    setSelectedArtist(artist);
  };

  const handleSelectArtistFromRanking = (artistName: string) => {
    setSelectedArtist(artistName);
    setDashboardView('artist');
  };
  
  const handleNavClick = (view: DashboardView) => {
    setDashboardView(view);
    // setIsMenuOpen(false); // <-- This line is now removed
  };

  const renderArtistDashboard = () => {
    if (artistLoading) return <div className="loading">Loading artist data...</div>;
    if (artistError) return <div className="error">{artistError}</div>;
    if (!artistData) return <div className="no-data">No data available for {selectedArtist}</div>;
    
    const metrics = calculateMetrics(artistData.name, allArtistsData);
    const processedSongs = processSongsData(artistData.songs, artistData.name);
    const artistImage = getArtistImage(artistData.name);

    return (
      <>
        <ArtistHeader
          artistName={artistData.name}
          artistImage={artistImage}
          metrics={metrics}
          selectedArtist={selectedArtist}
          availableArtists={AVAILABLE_ARTISTS}
          onArtistChange={handleArtistChange}
        />
        <SongsList songs={processedSongs} maxSongs={20} />
      </>
    );
  }

  const renderDashboardContent = () => {
    switch (dashboardView) {
      case 'artist':
        return renderArtistDashboard();
      case 'personal':
        return <PersonalSongsDashboard allArtistsData={allArtistsData} onArtistSelect={handleSelectArtistFromRanking} />;
      case 'personal-ranking':
        return <PersonalRankingDashboard onArtistSelect={handleSelectArtistFromRanking} />;
      default:
        return renderArtistDashboard();
    }
  }

  if (allArtistsLoading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (allArtistsError) {
    return <div className="error">{allArtistsError}</div>;
  }

  return (
    <div className="dashboard">
      <div className="nav-container">
        <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <button 
            className={dashboardView === 'artist' ? 'active' : ''}
            onClick={() => handleNavClick('artist')}
          >
            Artist Dashboard
          </button>
          <button 
            className={dashboardView === 'personal' ? 'active' : ''}
            onClick={() => handleNavClick('personal')}
          >
            Personal Most Listened
          </button>
          <button 
            className={dashboardView === 'personal-ranking' ? 'active' : ''}
            onClick={() => handleNavClick('personal-ranking')}
          >
            Personal Ranking
          </button>
        </div>
        <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>
      
      {renderDashboardContent()}
    </div>
  );
}

export default App;