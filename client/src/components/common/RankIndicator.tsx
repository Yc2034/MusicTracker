// src/components/common/RankIndicator.tsx
import React from 'react';
import type { RankChangeType } from '../../types';

interface RankIndicatorProps {
  change: RankChangeType;
}

export const RankIndicator: React.FC<RankIndicatorProps> = ({ change }) => {
  const getSymbol = () => {
    switch (change) {
      case 'up': return '▲';
      case 'down': return '▼';
      case 'same': return '=';
      default: return '=';
    }
  };

  return (
    <span className={`rank-indicator ${change}`}>
      {getSymbol()}
    </span>
  );
};