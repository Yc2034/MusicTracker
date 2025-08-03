// src/components/header/ArtistSelector.styles.ts
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const ArtistSelectorOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: flex;
  /* align-items: center; <--- THIS LINE IS REMOVED */
  justify-content: center;
  overflow-y: auto; /* This will now work correctly */
  padding-top: 80px; /* Add some padding to space the list from the top */
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
  background: transparent;
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    color: var(--accent-cedar);
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
`;

export const ArtistListItem = styled(motion.li)<{ $isSelected: boolean }>`
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      cursor: not-allowed;
      ${ArtistName} {
        color: var(--accent-cedar);
        transform: translateX(20px);
      }
    `}

  ${({ $isSelected }) =>
    !$isSelected &&
    css`
      &:hover {
        ${ArtistName} {
          color: var(--accent-cedar);
          transform: translateX(20px);
        }
      }
    `}
`;