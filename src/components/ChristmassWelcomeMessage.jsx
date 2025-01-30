import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChristmassImg from "../Images/ChristmassImg.png"

// Styled container for the full-page overlay
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
//   animation: fadeOut 2s forwards;
  pointer-events: none;

//   @keyframes fadeOut {
//     0% {
//       opacity: 1;
//     }
//     100% {
//       opacity: 0;
//     }
  }
`;

// Styled image for responsiveness
const ChristmasImage = styled.img`
  width: 300px; /* Occupies most of the viewport width */
  height: 200px; /* Maintain aspect ratio */
  max-width: 1200px; /* Limits the image's size on large screens */
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    // width: 90%; /* Slightly smaller for tablets */
  }

  @media (max-width: 480px) {
    // width: 90%; /* Full width on mobile screens */
    border-radius: 5px; /* Reduce border radius on smaller screens */
  }
`;

const ChristmasOverlay = () => {
 

  return (
    <OverlayContainer>
      <ChristmasImage
        src={ChristmassImg} // Replace with the actual image URL
        alt="Merry Christmas"
      />
    </OverlayContainer>
  );
};

export default ChristmasOverlay;
