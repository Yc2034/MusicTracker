// src/components/metrics/MainMetrics.tsx
import React from 'react';
import type { ArtistMetrics } from '../../types';
import { PercentageIndicator } from '../common/PercentageIndicator';
import { formatNumber, formatWithCommas } from '../../utils/formatters';

interface MainMetricsProps {
  metrics: ArtistMetrics;
}

export const MainMetrics: React.FC<MainMetricsProps> = ({ metrics }) => {
  return (
    <div className="main-metrics">
      <div className="primary-metric">
        <div className="metric-value">{formatNumber(metrics.dailyStreams)}</div>
        <div className="metric-label">{formatWithCommas(metrics.totalStreams)} total stream</div>
      </div>
      <div className="metric-changes">
        <div className="daily-change">
          <PercentageIndicator value={1.18} isPositive={true} />
          <span className="change-detail">+{formatWithCommas(metrics.dailyChange)}</span>
          <span className="change-period">24,307,153 in yesterday</span>
        </div>
        <div className="weekly-change">
          <PercentageIndicator value={47.73} isPositive={true} />
          <span className="change-detail">+{formatWithCommas(metrics.weeklyChange)}</span>
          <span className="change-period">16,648,389 in last week</span>
        </div>
      </div>
    </div>
  );
};