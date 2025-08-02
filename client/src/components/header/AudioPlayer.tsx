// src/components/header/AudioPlayer.tsx
import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  artistName: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ artistName }) => {
  const [isAudioAvailable, setIsAudioAvailable] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicSrc = `/music/${artistName.toLowerCase().replace(/\s/g, '-')}.m4a`;

  useEffect(() => {
    setIsAudioAvailable(null);
    const audio = new Audio(musicSrc);

    const handleCanPlay = () => {
      setDuration(audio.duration);
      setIsAudioAvailable(true);
    };

    const handleError = () => {
      setIsAudioAvailable(false);
    };
    
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [musicSrc]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.play().catch(() => setIsPlaying(false));
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, isAudioAvailable]);
  
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [isAudioAvailable]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
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
  
  if (isAudioAvailable !== true) {
    return null;
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={musicSrc} loop preload="auto" />
      
      <div className="player-controls">
        <button onClick={togglePlay} className="control-button">
          {isPlaying ? <span className="pause-icon">❚❚</span> : <span className="play-icon">▶</span>}
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
            />
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="volume-section">
            <button className="volume-icon" onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
                🔊
            </button>
            {isVolumeOpen && (
                <div className="volume-popup">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume * 100}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
