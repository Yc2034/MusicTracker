// src/hooks/useArtistData.ts
import { useState, useEffect } from 'react';
import type { ArtistData } from '../types';
import { fetchArtistData } from '../services/api';

interface UseArtistDataReturn {
  artistData: ArtistData | null;
  loading: boolean;
  error: string | null;
}

export const useArtistData = (selectedArtist: string): UseArtistDataReturn => {
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtistData = async () => {
      // Reset state when artist changes
      setArtistData(null);
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchArtistData(selectedArtist);
        setArtistData(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching artist data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArtistData();
  }, [selectedArtist]);

  return { artistData, loading, error };
};