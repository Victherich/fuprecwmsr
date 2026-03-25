import React from "react";
import styled from "styled-components";
import fl from '../Images/fl.png'

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width:900px;
  height: auto;

  object-fit: cover;
  border-radius: 12px;

  /* Mobile optimization */
  @media (max-width: 768px) {

    border-radius: 8px;
  }
`;

const ResponsiveImage = () => {
  return (
    <ImageWrapper>
      <StyledImage src={fl} alt='flyer' />
    </ImageWrapper>
  );
};

export default ResponsiveImage;