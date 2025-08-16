// src/components/dashboard/PersonalRankingDashboard.styles.ts
import styled, { css } from 'styled-components';

export const PersonalRankingContainer = styled.div`
  min-height: 100vh;
  background: var(--background-music);
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

export const PianoContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 480px;
`;

export const KeySet = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const disabledKeyStyles = css`
  opacity: 0.5;
  cursor: not-allowed;
  &:hover {
    background: #f8f6f0;
    transform: translateY(0);
  }
`;

const disabledBlackKeyStyles = css`
  opacity: 0.5;
  cursor: not-allowed;
  &:hover {
    background: #2c2b28;
    transform: translateX(-50%) translateY(0);
  }
`;

export const WhiteKey = styled.div<{ disabled: boolean }>`
  width: 120px;
  height: 540px;
  background: #f8f6f0;
  border: 1px solid #2c2b28;
  margin-right: -1px;
  color: #2c2b28;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e1db;
    transform: translateY(-5px);
  }

  ${({ disabled }) => disabled && disabledKeyStyles}
`;

export const BlackKey = styled.div<{ disabled: boolean }>`
  position: absolute;
  top: 0;
  left: 100%;
  transform: translateX(-50%);
  width: 70px;
  height: 280px;
  background: #2c2b28;
  border: 1px solid #2c2b28;
  color: #f8f6f0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  &:hover {
    background: #3d3b36;
    transform: translateX(-50%) translateY(-5px);
  }

  ${({ disabled }) => disabled && disabledBlackKeyStyles}
`;


export const ArtistName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  text-align: right;
  margin-top: 10px;
`;

export const ArtistRank = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;