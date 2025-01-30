import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for sliding text
const slide = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Styled container for the sliding banner
const BannerContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0;
  background: linear-gradient(90deg, #ff0000, #008000); /* Christmas colors */
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  padding: 0.8rem 0;
  border-top: 3px solid #fff;
  border-bottom: 3px solid #fff;
  z-index: 1000;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.6rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
`;

// Styled sliding text
const SlidingText = styled.div`
  display: inline-block;
  animation: ${slide} 24s linear infinite;
  white-space: nowrap;
`;

// Icon styles
const Icon = styled.span`
  margin: 0 0.5rem;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BannerContent = styled.div`
  display: inline-flex;
  align-items: center;
`;

const FooterBanner = () => {
  return (
    <BannerContainer>
      <SlidingText>
        <BannerContent>
          <Icon aria-hidden="true">🎄</Icon>
          Merry Christmas and Happy New Year from us
          <Icon aria-hidden="true">🎅</Icon>
          <Icon aria-hidden="true">🎄</Icon>
          Merry Christmas and Happy New Year from us
          <Icon aria-hidden="true">🎅</Icon>
          
        </BannerContent>
        
      </SlidingText>
      
    </BannerContainer>
  );
};

export default FooterBanner;
