// src/components/common/PercentageIndicator.tsx
import React from 'react';

interface PercentageIndicatorProps {
  value: number;
  isPositive: boolean;
  showSign?: boolean;
  decimals?: number;
}

export const PercentageIndicator: React.FC<PercentageIndicatorProps> = ({ 
  value, 
  isPositive, 
  showSign = true,
  decimals = 2 
}) => {
  const displayValue = showSign && isPositive ? `+${value.toFixed(decimals)}` : value.toFixed(decimals);
  
  return (
    <span className={`percentage ${isPositive ? 'positive' : 'negative'}`}>
      {displayValue}%
    </span>
  );
};