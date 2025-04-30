import React from "react";
import styled from "styled-components";
import { FaRecycle, FaChalkboardTeacher, FaMicroscope, FaGlobeAfrica } from "react-icons/fa";
import { GiTreeGrowth, GiClothes } from "react-icons/gi";
import heroBg from "../Images/cd3.jpeg"; // Replace with actual path
import eventsBg from "../Images/ggg5.jpg"; // Decorative background SVG
import SuccessStory from "./SuccessStory";
import InitiativesSection from "./InitiativesSection";
import LeadershipSection from "./LeaderShipSection";
import CommunityEngagement from "./CommunityEngagement";
import EPhotoGallery from "./EPhotoGallery";
import DirectorInspirationLinks from "./DirectorInspirationLinks";
import PressRelease from "./PressRelease";

const Events = () => {
  return (
    <Wrapper>
  <HeroSection>
        <Overlay />
        <Content>
          <h1>🌍 CWMSR Events & Milestones</h1>
          <p>
            Join us in our journey towards a zero-waste future. Every event is a step forward in shaping a greener tomorrow 🌱✨
          </p>
        </Content>
      </HeroSection>   

<SuccessStory/>
<InitiativesSection/>

     <LeadershipSection/>
     <DirectorInspirationLinks/>
     <CommunityEngagement/>
     <EPhotoGallery/>

      <Quote>
        “We are not just dreaming; we are bringing our dreams to life.” – CWMSR Vision
      </Quote>
      <PressRelease/>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  font-family: 'Segoe UI', sans-serif;
//   background: url(${eventsBg}) repeat;
  padding: 0;
  margin: 0;
  color: #1c2e1f;
`;

const HeroSection = styled.section`
  background: url(${heroBg}) center/cover no-repeat;
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Overlay = styled.div`
  background-color: rgba(0, 100, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 20px;

  h1 {
    font-size: 3rem;
    color: #ffffff;
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin: 2rem 0;
  color: #0c5b34;
  font-size: 2.5rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const EventCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 16px rgba(34, 139, 34, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #f4f4f4;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(255, 102, 0, 0.2);
  }

  h3 {
    color: #ff6600;
    margin-top: 1rem;
  }

  p {
    color: #333;
    font-size: 0.95rem;
    margin-top: 0.5rem;
  }

  svg {
    color: #0c5b34;
  }
`;

const Quote = styled.blockquote`
  margin: 4rem auto;
  font-style: italic;
  text-align: center;
  font-size: 1.5rem;
  color: #0c5b34;
  max-width: 800px;
  padding: 1rem;
  border-left: 5px solid #ff6600;
  background: #f5fff5;
`;



export default Events;
