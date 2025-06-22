// client/src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

// 修正后的类型定义
interface StreamRecord {
  streams: string; // 后端传来的是字符串, 这里用 string 接收
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

// 可选的歌手列表
const availableArtists = ['olivia rodrigo', 'the weeknd'];

function App() {
  // 使用 state 来管理当前选择的歌手，默认为列表中的第一个
  const [selectedArtist, setSelectedArtist] = useState(availableArtists[0]);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect 的依赖项数组中加入了 selectedArtist
  // 这样每当 selectedArtist 变化时，都会重新获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 当切换歌手时，先清空旧数据并显示加载状态
      setArtistData(null); 
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`http://localhost:3001/api/artist/${selectedArtist}`);
        setArtistData(response.data);

      } catch (err: any) { // 捕获更详细的错误信息
        if (err.response) {
          // 请求已发出，但服务器返回了错误状态码 (如 404, 500)
          setError(`Error: ${err.response.status} - ${err.response.data.error || 'Artist not found'}`);
        } else if (err.request) {
          // 请求已发出，但没有收到响应 (服务器没开，或者网络问题)
          setError('Failed to fetch data. Is the server running and accessible?');
        } else {
          // 其他类型的错误
          setError('An unexpected error occurred.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedArtist]); // <-- 修改点：依赖于 selectedArtist

  const handleArtistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArtist(event.target.value);
  };

  return (
    <div className="app-container" style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      
      {/* 歌手选择下拉菜单 */}
      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="artist-select" style={{ marginRight: '1rem', fontWeight: 'bold' }}>选择歌手:</label>
        <select id="artist-select" value={selectedArtist} onChange={handleArtistChange} style={{ padding: '0.5rem', fontSize: '1rem' }}>
          {availableArtists.map(artist => (
            <option key={artist} value={artist}>
              {artist.charAt(0).toUpperCase() + artist.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* 加载、错误和数据显示逻辑 */}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {/* 仅在没有加载且没有错误时显示数据 */}
      {!loading && !error && artistData && (
        <>
          <h1 style={{ textTransform: 'capitalize' }}>{artistData.name}</h1>
          
          <h2>Top Daily Streaming Songs</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {artistData.songs.map((song, index) => (
              <li key={song.id} style={{ backgroundColor: 'white', margin: '0.5rem 0', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ fontSize: '1.2rem' }}>{index + 1}. {song.title}</strong>
                <div style={{ color: '#555', marginTop: '0.5rem' }}>
                  Song name: 
                  <span style={{ fontWeight: 'bold', color: '#111', marginLeft: '0.5rem' }}>
                    {song.title ? song.title : 'N/A'}
                  </span>
                  <br></br>
                  Latest Streams: 
                  <span style={{ fontWeight: 'bold', color: '#111', marginLeft: '0.5rem' }}>
                    {song.stream_records[0]?.streams ? Number(song.stream_records[0].streams).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {!loading && !error && !artistData && (
        <div>No data available for {selectedArtist}</div>
      )}

    </div>
  );
}

export default App;
