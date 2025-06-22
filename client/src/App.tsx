// client/src/App.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

// 修正后的类型定义
interface StreamRecord {
  streams: string; // <-- 修改点 1: 后端传来的是字符串, 这里用 string 接收
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

function App() {
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // <-- 修改点 2: 查询我们数据库里已存在的歌手
  const artistName = "olivia rodrigo";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // 在每次请求前重置错误状态
        
        const response = await axios.get(`http://localhost:3001/api/artist/${artistName}`);
        setArtistData(response.data);

      } catch (err: any) { // 捕获更详细的错误信息
        // <-- 修改点 3: 显示更具体的错误信息，方便调试
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
  }, []); // 空依赖数组意味着这个 effect 只在组件首次挂载时运行一次

  if (loading) return <div>Loading...</div>;
  
  // 分开处理错误和数据不存在的情况
  if (error) return <div>{error}</div>;
  if (!artistData) return <div>No data available for {artistName}</div>;

  return (
    <div className="app-container" style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1>{artistData.name}</h1>
      
      <h2>Top Daily Streaming Songs</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {artistData.songs.map((song, index) => (
          <li key={song.id} style={{ backgroundColor: 'white', margin: '0.5rem 0', padding: '1rem', borderRadius: '8px' }}>
            <strong style={{ fontSize: '1.2rem' }}>{index + 1}. {song.title}</strong>
            <div style={{ color: '#555', marginTop: '0.5rem' }}>
              Latest Streams: 
              <span style={{ fontWeight: 'bold', color: '#111', marginLeft: '0.5rem' }}>
                {/* 直接使用后端传来的字符串 */}
                {song.stream_records[0]?.streams ? Number(song.stream_records[0].streams).toLocaleString() : 'N/A'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
