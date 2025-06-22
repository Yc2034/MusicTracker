// client/src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Type definitions
interface StreamRecord {
  streams: string;
  record_date: string;
}

interface Song {
  id: number;
  title: string;
  stream_records: StreamRecord[];
}

interface ArtistData {
  name: string;
  songs: Song[];
}

interface ProcessedSong extends Song {
  rank: number;
  currentStreams: number;
  dailyChange: number;
  weeklyChange: number;
  dailyPercentage: number;
  weeklyPercentage: number;
  rankChange: 'up' | 'down' | 'same';
}

interface ArtistMetrics {
  totalStreams: number;
  dailyStreams: number;
  dailyChange: number;
  weeklyChange: number;
  monthlyListeners: string;
  chartPosition: number;
  peakPosition: number;
  songsAbove1M: number;
  songsAbove500K: number;
  songsAbove300K: number;
  songsAbove100K: number;
  totalSongsTop10: number;
}

// Available artists
const availableArtists = ['olivia rodrigo', 'the weeknd'];

// Component for metric cards
const MetricCard = ({ count, threshold, color }: { count: number; threshold: string; color: string }) => (
  <div className="metric-card" style={{ backgroundColor: color }}>
    <div className="metric-count">{count}</div>
    <div className="metric-threshold">
      SONGS WITH<br />STREAMS<br />ABOVE<br />{threshold}
    </div>
  </div>
);

// Component for percentage indicators
const PercentageIndicator = ({ value, isPositive }: { value: number; isPositive: boolean }) => (
  <span className={`percentage ${isPositive ? 'positive' : 'negative'}`}>
    {isPositive ? '+' : ''}{value.toFixed(2)}%
  </span>
);

// Component for rank change indicator
const RankIndicator = ({ change }: { change: 'up' | 'down' | 'same' }) => {
  const symbol = change === 'up' ? '▲' : change === 'down' ? '▼' : '=';
  return <span className={`rank-indicator ${change}`}>{symbol}</span>;
};

// Helper function to format large numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(3);
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
};

// Helper function to calculate metrics from songs data
const calculateMetrics = (songs: Song[]): ArtistMetrics => {
  const processedSongs = songs.map(song => {
    const currentStreams = song.stream_records[0] ? parseInt(song.stream_records[0].streams) : 0;
    return { ...song, currentStreams };
  });

  const totalStreams = processedSongs.reduce((sum, song) => sum + song.currentStreams, 0);
  const dailyStreams = Math.floor(totalStreams * 0.1); // Mock daily streams
  
  return {
    totalStreams,
    dailyStreams,
    dailyChange: Math.floor(Math.random() * 1000000), // Mock data
    weeklyChange: Math.floor(Math.random() * 10000000), // Mock data
    monthlyListeners: '67,207,721',
    chartPosition: 24,
    peakPosition: 4,
    songsAbove1M: processedSongs.filter(s => s.currentStreams > 1000000).length,
    songsAbove500K: processedSongs.filter(s => s.currentStreams > 500000).length,
    songsAbove300K: processedSongs.filter(s => s.currentStreams > 300000).length,
    songsAbove100K: processedSongs.filter(s => s.currentStreams > 100000).length,
    totalSongsTop10: Math.min(processedSongs.length, 10)
  };
};

// Helper function to process songs with mock analytics data
const processSongsData = (songs: Song[]): ProcessedSong[] => {
  return songs.map((song, index) => {
    const currentStreams = song.stream_records[0] ? parseInt(song.stream_records[0].streams) : 0;
    const dailyChange = Math.floor(Math.random() * 100000) - 50000; // Mock daily change
    const weeklyChange = Math.floor(Math.random() * 500000) - 250000; // Mock weekly change
    
    return {
      ...song,
      rank: index + 1,
      currentStreams,
      dailyChange,
      weeklyChange,
      dailyPercentage: (dailyChange / currentStreams) * 100,
      weeklyPercentage: (weeklyChange / currentStreams) * 100,
      rankChange: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'same'
    };
  });
};

function App() {
  const [selectedArtist, setSelectedArtist] = useState(availableArtists[0]);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setArtistData(null);
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`http://localhost:3001/api/artist/${selectedArtist}`);
        setArtistData(response.data);
      } catch (err: any) {
        if (err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data.error || 'Artist not found'}`);
        } else if (err.request) {
          setError('Failed to fetch data. Is the server running and accessible?');
        } else {
          setError('An unexpected error occurred.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedArtist]);

  const handleArtistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArtist(event.target.value);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!artistData) return <div className="no-data">No data available for {selectedArtist}</div>;

  const metrics = calculateMetrics(artistData.songs);
  const processedSongs = processSongsData(artistData.songs);

  return (
    <div className="dashboard">
      {/* Artist Header */}
      <div className="artist-header">
        <div className="artist-info">
          <h1 className="artist-name">{artistData.name.toUpperCase()}</h1>
          <div className="artist-stats">
            <span className="monthly-listeners">
              {metrics.monthlyListeners}(+465,993) Monthly Listeners
            </span>
            <span className="chart-date">Chart Dated Jun12, 2025 (Thursday)</span>
          </div>
          <div className="chart-positions">
            <span className="chart-position">No.{metrics.chartPosition}</span>
            <span className="peak-position">{metrics.peakPosition}</span>
            <span className="total-listeners">{(metrics.totalStreams / 1000000).toFixed(3)}</span>
          </div>
        </div>
        
        {/* Artist Selection */}
        <div className="artist-selector">
          <select value={selectedArtist} onChange={handleArtistChange}>
            {availableArtists.map(artist => (
              <option key={artist} value={artist}>
                {artist.charAt(0).toUpperCase() + artist.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="main-metrics">
        <div className="primary-metric">
          <div className="metric-value">{formatNumber(metrics.dailyStreams)}</div>
          <div className="metric-label">{metrics.totalStreams.toLocaleString()} total stream</div>
        </div>
        <div className="metric-changes">
          <div className="daily-change">
            <PercentageIndicator value={1.18} isPositive={true} />
            <span className="change-detail">+{metrics.dailyChange.toLocaleString()}</span>
            <span className="change-period">24,307,153 in yesterday</span>
          </div>
          <div className="weekly-change">
            <PercentageIndicator value={47.73} isPositive={true} />
            <span className="change-detail">+{metrics.weeklyChange.toLocaleString()}</span>
            <span className="change-period">16,648,389 in last week</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <MetricCard count={metrics.songsAbove1M} threshold="1M" color="#8B5CF6" />
        <MetricCard count={metrics.songsAbove500K} threshold="500K" color="#F97316" />
        <MetricCard count={metrics.totalSongsTop10} threshold="TOP 10 SONGS" color="#8B5CF6" />
        <MetricCard count={metrics.songsAbove300K} threshold="300K" color="#F97316" />
        <MetricCard count={metrics.songsAbove100K} threshold="100K" color="#8B5CF6" />
      </div>

      {/* Songs List */}
      <div className="songs-section">
        <h2 className="songs-title">TOP DAILY STREAMING SONGS</h2>
        <div className="songs-disclaimer">
          Data are retrieved from iworld. Glitches might exist when encountering new releases due to delayed update of data of new songs. We apologise for any inconvenience brought.
        </div>
        
        <div className="songs-grid">
          {processedSongs.slice(0, 20).map((song, index) => (
            <div key={song.id} className="song-item">
              <div className="song-rank">
                <span className="rank-number">{song.rank}</span>
                <RankIndicator change={song.rankChange} />
                <span className="song-title">{song.title}</span>
              </div>
              
              <div className="song-streams">
                <div className="stream-count">{song.currentStreams.toLocaleString()}</div>
                <div className="stream-total">{song.currentStreams.toLocaleString()} in total</div>
              </div>
              
              <div className="song-changes">
                <div className="daily-change">
                  <PercentageIndicator 
                    value={Math.abs(song.dailyPercentage)} 
                    isPositive={song.dailyChange > 0} 
                  />
                  <span className="change-detail">
                    {song.dailyChange > 0 ? '+' : ''}{song.dailyChange.toLocaleString()} on 06.11
                  </span>
                </div>
                <div className="weekly-change">
                  <PercentageIndicator 
                    value={Math.abs(song.weeklyPercentage)} 
                    isPositive={song.weeklyChange > 0} 
                  />
                  <span className="change-detail">
                    {song.weeklyChange > 0 ? '+' : ''}{song.weeklyChange.toLocaleString()} on 06.05
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;