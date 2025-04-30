import React, { useState } from "react";
import styled from "styled-components";

// Importing images
import cd1 from "../Images/cd1.jpeg";
import cd2 from "../Images/cd2.jpg";
import cd3 from "../Images/cd3.jpeg";
import cd4 from "../Images/cd4.png";
import ci1 from "../Images/ci1.jpeg";
import ci2 from "../Images/ci2.jpeg";
import ci3 from "../Images/ci3.jpeg";
import ci4 from "../Images/ci4.jpeg";
import ci5 from "../Images/ci5.jpeg";
import ggg1 from "../Images/ggg1.jpg";
import ggg2 from "../Images/ggg2.jpg";
import ggg3 from "../Images/ggg3.jpg";
import ggg4 from "../Images/ggg4.jpg";
import ggg5 from "../Images/ggg5.jpg";
import ggg6 from "../Images/ggg6.jpg";
import ggg7 from "../Images/ggg7.jpg";
import ggg8 from "../Images/ggg8.jpg";
import ggg9 from "../Images/ggg9.jpg";
import ggg10 from "../Images/ggg10.jpg";
import ggg11 from "../Images/ggg11.jpg";
import ggg12 from "../Images/ggg12.jpeg";
import ggg13 from "../Images/ggg13.jpeg";
import gl1 from "../Images/gl1.jpeg";
import gl2 from "../Images/gl2.jpeg";
import gl3 from "../Images/gl3.jpeg";
import gl4 from "../Images/gl4.jpeg";
import gl5 from "../Images/gl5.jpeg";
import gl6 from "../Images/gl6.jpg";
import gl7 from "../Images/gl7.jpg";
import gl8 from "../Images/gl8.jpg";
import gl9 from "../Images/gl9.jpg";
import gl10 from "../Images/gl10.jpg";
import gl11 from "../Images/gl11.jpg";
import gl12 from "../Images/gl12.jpeg";
import gl13 from "../Images/gl13.jpeg";
import pic1 from "../Images/pic1.jpg";
import pic2 from "../Images/pic2.jpg";
import pic3 from "../Images/pic3.jpg";
import pic4 from "../Images/pic4.jpg";
import pic5 from "../Images/pic5.jpg";
import pic6 from "../Images/pic6.jpeg";
import phd from "../Images/phd.jpeg";
import space from '../Images/space.jpg'
import CommunityImpact from "./CommunityImpact";

// Images grouped into 3 sections
const imagesGroup1 = [cd1, cd2, cd3, cd4, ci1, ci2, ci3, ci4, ci5];
const imagesGroup2 = [ggg1, ggg2, ggg3, ggg4, ggg5, ggg6, ggg7, ggg8, ggg9, ggg10, ggg11, ggg12, ggg13];
const imagesGroup3 = [gl1, gl2, gl3, gl4, gl5, gl6, gl7, gl8, gl9, gl10, gl11, gl12, gl13, pic1, pic2, pic3, pic4, pic5, pic6, phd];

// Styled Components
const GalleryContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background:lightgray;
  padding:10px;
//   background-image:url(${space});
   background-attachment: fixed; 
   background-size:cover;

  h2{
    margin-top:50px;
    color:green;
  }

  p{
    font-style:italic;
    margin-top:20px;
  }
`;

const HeroSection = styled.div`
  background: url(${ggg5}) center/cover no-repeat;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  font-size: 2.5rem;
  font-weight: bold;
`;

const GallerySection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 10px;
  margin: 20px 0;
  
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:nth-child(2n) {
    grid-row: span 2;
  }

  &:nth-child(3n) {
    grid-column: span 2;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

// Fullscreen Image
const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
`;

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <GalleryContainer>
      <HeroSection>Explore Our Gallery</HeroSection>

      <h2>Section 1</h2>
      <p>(Click an image below to enlarge)</p>
      <GallerySection>
        {imagesGroup1.map((img, index) => (
          <ImageWrapper key={index} onClick={() => setSelectedImage(img)}>
            <img src={img} alt={`Gallery Image ${index + 1}`} />
          </ImageWrapper>
        ))}
      </GallerySection>


<CommunityImpact/>

      
    
      <h2>Section 2</h2>
      <p>(Click an image below to enlarge)</p>
      <GallerySection>
        {imagesGroup2.map((img, index) => (
          <ImageWrapper key={index} onClick={() => setSelectedImage(img)}>
            <img src={img} alt={`Gallery Image ${index + 1}`} />
          </ImageWrapper>
        ))}
      </GallerySection>


      <CommunityImpact/>
      
      <h2>Section 3</h2>
      <p>(Click an image below to enlarge)</p>
      <GallerySection>
        {imagesGroup3.map((img, index) => (
          <ImageWrapper key={index} onClick={() => setSelectedImage(img)}>
            <img src={img} alt={`Gallery Image ${index + 1}`} />
          </ImageWrapper>
        ))}
      </GallerySection>

      {/* Fullscreen Image Overlay */}
      {selectedImage && (
        <FullScreenOverlay onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Fullscreen" />
        </FullScreenOverlay>
      )}
    </GalleryContainer>
  );
};

export default Gallery;
