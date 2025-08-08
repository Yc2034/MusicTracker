// src/components/header/ArtistSelector.styles.ts
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const ArtistSelectorOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Use the new music gradient for the background */
  background: var(--background-music);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding-top: 80px;
  padding-bottom: 80px;
`;

export const ArtistSelectorContent = styled(motion.div)`
  width: 90%;
  max-width: 800px;
  padding: 40px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  /* Make the button background slightly opaque for better visibility */
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%; /* Make it circular */
  color: #fff;
  font-size: 24px; /* Adjusted font size */
  cursor: pointer;
  z-index: 1001;
  width: 50px; /* Set width */
  height: 50px; /* Set height */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

export const ArtistList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const ArtistName = styled(motion.span)`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 300;
  color: #fff;
  display: block;
  transition: color 0.3s ease, transform 0.3s ease;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Add a subtle shadow to text */
`;

export const ArtistListItem = styled(motion.li)<{ $isSelected: boolean }>`
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Make border lighter */

  &:last-child {
    border-bottom: none;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      cursor: not-allowed;
      ${ArtistName} {
        /* Use a more vibrant color for selected item to pop against the gradient */
        color: var(--sand-warm);
        transform: translateX(20px);
      }
    `}

  ${({ $isSelected }) =>
    !$isSelected &&
    css`
      &:hover {
        ${ArtistName} {
          color: var(--sand-warm);
          transform: translateX(20px);
        }
      }
    `}
`;