
import React from "react";
import styled from "styled-components";

const photos = [
  // Add your actual image paths or URLs here
  require("../Images/ep1.jpeg"),
  require("../Images/ep2.jpeg"),
  require("../Images/ep3.jpeg"),

];

const EPhotoGallery = () => {
  return (
    <GalleryWrapper>
      <Title>📸 CWMSR</Title>
      <Grid>
        {photos.map((photo, index) => (
          <ImageContainer key={index}>
            <img src={photo} alt={`Gallery ${index + 1}`} />
          </ImageContainer>
        ))}
      </Grid>
    </GalleryWrapper>
  );
};

const GalleryWrapper = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #0c5b34;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    // transform: scale(1.05);
  }
`;

export default EPhotoGallery;
