// src/utils/formatters.ts

/**
 * Format large numbers for display (e.g., 24500000 -> "24.500")
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(3);
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
};

/**
 * Format numbers with commas (e.g., 1234567 -> "1,234,567")
 */
export const formatWithCommas = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Format percentage with proper sign and decimals
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Calculate percentage change between two numbers
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};