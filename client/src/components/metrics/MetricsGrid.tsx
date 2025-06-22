// src/components/metrics/MetricsGrid.tsx
import React from 'react';
import type { ArtistMetrics } from '../../types';
import { MetricCard } from '../common/MetricCard';

interface MetricsGridProps {
  metrics: ArtistMetrics;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  const metricsData = [
    { count: metrics.songsAbove1M, threshold: '1M', color: '#8B5CF6' },
    { count: metrics.songsAbove500K, threshold: '500K', color: '#F97316' },
    { count: metrics.totalSongsTop10, threshold: 'TOP 10 SONGS', color: '#8B5CF6' },
    { count: metrics.songsAbove300K, threshold: '300K', color: '#F97316' },
    { count: metrics.songsAbove100K, threshold: '100K', color: '#8B5CF6' }
  ];

  return (
    <div className="metrics-grid">
      {metricsData.map((metric, index) => (
        <MetricCard
          key={index}
          count={metric.count}
          threshold={metric.threshold}
          color={metric.color}
        />
      ))}
    </div>
  );
};