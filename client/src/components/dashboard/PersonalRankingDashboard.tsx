// src/components/dashboard/PersonalRankingDashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_RANKING } from '../common/Constants';
import { Stars } from '../common/Stars';
import {
  PersonalRankingContainer,
  StarsCanvasContainer,
  PersonalRankingContent,
  PersonalRankingTitle,
  PersonalRankingList,
  RankingListItem,
  RankingCard,
  RankingNumber,
  RankingArtistName,
  RankingAccent,
} from './PersonalRankingDashboard.styles';

interface PersonalRankingDashboardProps {
  onArtistSelect: (artistName: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardHoverVariants = {
  hover: { 
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  tap: { 
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

export const PersonalRankingDashboard: React.FC<PersonalRankingDashboardProps> = ({ onArtistSelect }) => {
  return (
    <PersonalRankingContainer>
      <StarsCanvasContainer>
        <Stars />
      </StarsCanvasContainer>
      <PersonalRankingContent>
        <PersonalRankingTitle>My Personal Artist Ranking</PersonalRankingTitle>
        <PersonalRankingList
          as={motion.ol}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {PERSONAL_RANKING.map((artist, index) => (
            <RankingListItem
              key={index}
              $index={index}
              variants={itemVariants}
              onClick={() => onArtistSelect(artist)}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && onArtistSelect(artist)}
            >
              <RankingCard
                $index={index}
                variants={cardHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <RankingNumber>#{(index + 1).toString().padStart(2, '0')}</RankingNumber>
                <RankingArtistName>{artist}</RankingArtistName>
                <RankingAccent $index={index} />
              </RankingCard>
            </RankingListItem>
          ))}
        </PersonalRankingList>
      </PersonalRankingContent>
    </PersonalRankingContainer>
  );
};