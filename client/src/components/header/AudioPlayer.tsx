// src/components/header/AudioPlayer.tsx
import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  artistName: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ artistName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicSrc = `/music/${artistName.toLowerCase().replace(/\s/g, '-')}.m4a`;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error);
          setIsPlaying(false);
          setHasError(true);
          setIsLoading(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(false);
    setHasError(false);
    if (audioRef.current) {
      audioRef.current.src = musicSrc;
      audioRef.current.volume = volume;
      audioRef.current.load();
    }
  }, [musicSrc, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={musicSrc} loop />
      
      <div className="player-controls">
        <button 
          onClick={togglePlay} 
          className={`control-button ${isLoading ? 'loading' : ''}`}
          disabled={hasError || isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner">⟳</span>
          ) : hasError ? (
            '✕'
          ) : isPlaying ? (
            <span className="pause-icon">❚❚</span>
          ) : (
            <span className="play-icon">▶</span>
          )}
        </button>

        <div className="progress-section">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div className="progress-container">
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercentage}
              onChange={handleProgressChange}
              className="progress-bar"
              disabled={hasError}
            />
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="volume-section">
          <span className="volume-icon">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>

      {hasError && (
        <div className="error-message">
          Audio unavailable
        </div>
      )}
    </div>
  );
};