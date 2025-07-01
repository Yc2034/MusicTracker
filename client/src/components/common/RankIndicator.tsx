// src/components/common/RankIndicator.tsx
import React from 'react';

interface RankIndicatorProps {
  is_liked: boolean;
}

export const RankIndicator: React.FC<RankIndicatorProps> = ({ is_liked }) => {
  const getSymbol = () => {
    return is_liked ? '❤️' : '🎶';
  };

  const likeStatusClass = is_liked ? 'liked' : 'not-liked';

  return (
    <span className={`rank-indicator ${likeStatusClass}`}>
      {getSymbol()}
    </span>
  );
};