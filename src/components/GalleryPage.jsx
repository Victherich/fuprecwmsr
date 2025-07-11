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

import p1 from '../Images2/p1.jpg'
import p2 from '../Images2/p2.jpg'
import p3 from '../Images2/p3.jpg'
import p4 from '../Images2/p4.jpg'
import p5 from '../Images2/p5.jpg'
import p6 from '../Images2/p6.jpg'
import p7 from '../Images2/p7.jpg'
import p8 from '../Images2/p8.jpg'
import p9 from '../Images2/p9.jpg'
import p10 from '../Images2/p10.jpg'
import p11 from '../Images2/p11.jpg'
import p12 from '../Images2/p12.jpg'
import p13 from '../Images2/p13.jpg'
import p14 from '../Images2/p14.jpg'
import p15 from '../Images2/p15.jpg'
import p16 from '../Images2/p16.jpg'
import p17 from '../Images2/p17.jpg'
import p18 from '../Images2/p18.jpg'
import p19 from '../Images2/p19.jpg'
import p20 from '../Images2/p20.jpg'
import p21 from '../Images2/p21.jpg'
import p22 from '../Images2/p22.jpg'
import p23 from '../Images2/p23.jpg'
import p24 from '../Images2/p24.jpg'
import p25 from '../Images2/p25.jpg'
import p26 from '../Images2/p26.jpg'
import p27 from '../Images2/p27.jpg'
import p28 from '../Images2/p28.jpg'
import p29 from '../Images2/p29.jpg'
import p30 from '../Images2/p30.jpg'
import p31 from '../Images2/p31.jpg'
import p32 from '../Images2/p32.jpg'
import p33 from '../Images2/p33.jpg'
import p34 from '../Images2/p34.jpg'
import p35 from '../Images2/p35.jpg'
import p36 from '../Images2/p36.jpg'
import p37 from '../Images2/p37.jpg'
import p38 from '../Images2/p38.jpg'
import p39 from '../Images2/p39.jpg'
import p40 from '../Images2/p40.jpg'
import p41 from '../Images2/p41.jpg'
import p42 from '../Images2/p42.jpg'
import p43 from '../Images2/p43.jpg'
import p44 from '../Images2/p44.jpg'
import p45 from '../Images2/p45.jpg'
import p46 from '../Images2/p46.jpg'
import p47 from '../Images2/p47.jpg'
import p48 from '../Images2/p48.jpg'
import p49 from '../Images2/p49.jpg'
import p50 from '../Images2/p50.jpg'
import p51 from '../Images2/p51.jpg'
import p52 from '../Images2/p52.jpg'
import p53 from '../Images2/p53.jpg'
import p54 from '../Images2/p54.jpg'
import p55 from '../Images2/p55.jpg'
import p56 from '../Images2/p56.jpg'
import p57 from '../Images2/p57.jpg'
import p58 from '../Images2/p58.jpg'
import p59 from '../Images2/p59.jpg'
import p60 from '../Images2/p60.jpg'
import p61 from '../Images2/p61.jpg'
import p62 from '../Images2/p62.jpg'
import p63 from '../Images2/p63.jpg'
import p64 from '../Images2/p64.jpg'
import p65 from '../Images2/p65.jpg'
import p66 from '../Images2/p66.jpg'
import p67 from '../Images2/p67.jpg'
import p68 from '../Images2/p68.jpg'
import p69 from '../Images2/p69.jpg'
import p70 from '../Images2/p70.jpg'
import p71 from '../Images2/p71.jpg'
import p72 from '../Images2/p72.jpg'
import p73 from '../Images2/p73.jpg'
import p74 from '../Images2/p74.jpg'
import p75 from '../Images2/p75.jpg'
import p76 from '../Images2/p76.jpg'
import p77 from '../Images2/p77.jpg'
import p78 from '../Images2/p78.jpg'
import p79 from '../Images2/p79.jpg'
import p80 from '../Images2/p80.jpg'
import p81 from '../Images2/p81.jpg'
import p82 from '../Images2/p82.jpg'
import p83 from '../Images2/p83.jpg'
import p84 from '../Images2/p84.jpg'
import p85 from '../Images2/p85.jpg'
import p86 from '../Images2/p86.jpg'
import p87 from '../Images2/p87.jpg'
import p88 from '../Images2/p88.jpg'
import p89 from '../Images2/p89.jpg'
import p90 from '../Images2/p90.jpg'
import p91 from '../Images2/p91.jpg'
import p92 from '../Images2/p92.jpg'
import p93 from '../Images2/p93.jpg'
import p94 from '../Images2/p94.jpg'
import p95 from '../Images2/p95.jpg'
import p96 from '../Images2/p96.jpg'
import p97 from '../Images2/p97.jpg'
import p98 from '../Images2/p98.jpg'
import p99 from '../Images2/p99.jpg'
import p100 from '../Images2/p100.jpg'
import p101 from '../Images2/p101.jpg'
import p102 from '../Images2/p102.jpg'
import p103 from '../Images2/p103.jpg'
import p104 from '../Images2/p104.jpg'
import p105 from '../Images2/p105.jpg'


// Images grouped into 3 sections
const imagesGroup1 = [cd1, cd2, cd3, cd4, ci1, ci2, ci3, ci4, ci5];
const imagesGroup2 = [ggg1, ggg2, ggg3, ggg4, ggg5, ggg6, ggg7, ggg8, ggg9, ggg10, ggg11, ggg12, ggg13];
const imagesGroup3 = [gl1, gl2, gl3, gl4, gl5, gl6, gl7, gl8, gl9, gl10, gl11, gl12, gl13, pic1, pic2, pic3, pic4, pic5, pic6, phd];
const imagesGroup4 = [
  p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
  p21, p22, p23, p24, p25, p26, p27, p28, p29, p30,
  p31, p32, p33, p34, p35, p36, p37, p38, p39, p40,
  p41, p42, p43, p44, p45, p46, p47, p48, p49, p50,
  p51, p52, p53, p54, p55, p56, p57, p58, p59, p60,
  p61, p62, p63, p64, p65, p66, p67, p68, p69, p70,
  p71, p72, p73, p74, p75, p76, p77, p78, p79, p80,
  p81, p82, p83, p84, p85, p86, p87, p88, p89, p90,
  p91, p92, p93, p94, p95, p96, p97, p98, p99, p100,
  p101, p102, p103, p104, p105
];




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


       <h2>Section 4</h2>
      <p>(Click an image below to enlarge)</p>
      <GallerySection>
        {imagesGroup4.map((img, index) => (
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
