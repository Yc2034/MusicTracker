import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PersonalRankingContainer = styled.div`
  min-height: 100vh;
  background: var(--background-coastal-primary);
  padding: 0;
  position: relative;
  overflow-x: hidden;
`;

export const StarsCanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.8;
`;

export const PersonalRankingContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 80px 80px;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    padding: 80px 40px 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 24px 40px;
  }
`;

export const PersonalRankingTitle = styled.h1`
  font-size: clamp(48px, 8vw, 120px);
  font-weight: 300;
  color: var(--text-inverse);
  margin: 0 0 120px 0;
  line-height: 0.9;
  letter-spacing: -0.02em;
  position: relative;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 60px;
    height: 2px;
    background: var(--accent-cedar);
  }

  @media (max-width: 768px) {
    margin-bottom: 80px;
    
    &::after {
      bottom: -24px;
      width: 40px;
    }
  }
`;

export const PersonalRankingList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px 60px;
  max-width: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const RankingListItem = styled(motion.li)<{ $index: number }>`
  position: relative;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transform-origin: center;
  
  /* Asymmetrical positioning for visual interest */
  ${props => props.$index % 3 === 1 && `
    margin-top: 60px;
    @media (max-width: 768px) {
      margin-top: 0;
    }
  `}
  
  ${props => props.$index % 4 === 3 && `
    margin-top: -40px;
    @media (max-width: 768px) {
      margin-top: 0;
    }
  `}

  &:hover {
    z-index: 10;
  }
`;

export const RankingCard = styled(motion.div)<{ $index: number }>`
  background: var(--background-card-dark);
  border: 1px solid rgba(248, 246, 240, 0.2);
  border-radius: 0;
  padding: 40px 32px;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(248, 246, 240, 0.15);
    transform: translateY(100%);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1;
  }

  &:hover::before {
    transform: translateY(0);
  }

  &:hover {
    border-color: var(--accent-cedar);
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    background: rgba(248, 246, 240, 0.2);
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
    height: 160px;
  }
`;

export const RankingNumber = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-inverse-secondary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;

  ${RankingCard}:hover & {
    color: var(--text-inverse);
  }
`;

export const RankingArtistName = styled.span`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 400;
  color: var(--text-inverse);
  line-height: 1.2;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 2;
  margin-top: auto;
  transition: all 0.3s ease;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);

  ${RankingCard}:hover & {
    color: var(--text-inverse);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const RankingAccent = styled.div<{ $index: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background: ${props => {
    const colors = [
      'var(--accent-cedar)',      /* Warm cedar */
      'var(--accent-ocean)',      /* Muted ocean blue-green */
      'var(--primary-sage)',      /* Muted sage green */
      'var(--accent-plum)',       /* Dusty plum */
      'var(--primary-clay)',      /* Soft clay brown */
      'var(--warning-amber)'      /* Warm amber */
    ];
    return colors[props.$index % colors.length];
  }};
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 3;

  ${RankingCard}:hover & {
    transform: scaleY(1);
  }
`;