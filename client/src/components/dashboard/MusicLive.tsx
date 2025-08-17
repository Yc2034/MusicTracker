// src/components/dashboard/MusicLive.tsx
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AVAILABLE_ARTISTS, PERSONAL_RANKING } from '../common/Constants';
import { getArtistVideos } from '../../services/videoService';
import type { Video } from '../../types';
import { Stars } from '../common/Stars';
import '../../styles/components/MusicLive.css';

export const MusicLive = () => {
  const unavailableArtists = PERSONAL_RANKING.filter(
    (artist) => !AVAILABLE_ARTISTS.includes(artist)
  );

  const [selectedArtist, setSelectedArtist] = useState<string>(unavailableArtists[0] || '');
  const videos = getArtistVideos(selectedArtist);

  return (
    <div className="music-live-container-v2">
      <div className="stars-background">
        <Stars />
      </div>
      <div className="artist-sidebar">
        <h2 className="sidebar-title">Music Live</h2>
        <ul className="artist-list">
          {unavailableArtists.map((artist) => (
            <li
              key={artist}
              className={`artist-list-item ${selectedArtist === artist ? 'active' : ''}`}
              onClick={() => setSelectedArtist(artist)}
            >
              <span className="artist-name">{artist}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArtist}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="artist-video-header">
              <h1 className="current-artist-title">{selectedArtist}</h1>
              <p className="video-count-subtitle">
                {videos.length} {videos.length === 1 ? 'video' : 'videos'} available
              </p>
            </header>

            <div className="video-gallery">
              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <motion.div
                    key={index}
                    className="video-card-v2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="video-wrapper">
                      <video
                        controls
                        className="video-player-v2"
                        src={`/video/${video.videoSrc}`}
                      />
                    </div>
                    <div className="video-info-v2">
                      <h3 className="video-title-v2">{video.title}</h3>
                      <p className="video-date-v2">{video.date}</p>
                      <p className="video-description-v2">{video.description}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="no-videos-message-v2">
                  <p>No videos available for this artist yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};