// src/components/common/MetricCard.tsx
import React from 'react';

interface MetricCardProps {
  count: number;
  threshold: string;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ count, threshold, color }) => {
  return (
    <div className="metric-card" style={{ backgroundColor: color }}>
      <div className="metric-count">{count}</div>
      <div className="metric-threshold">
        SONGS WITH<br />STREAMS<br />ABOVE<br />{threshold}
      </div>
    </div>
  );
};