import React from 'react';
import styled from 'styled-components';
import director2 from '../Images/director2.jpeg'
import deputydirector from '../Images/deputydirector.jpeg'
import headadmin from '../Images/headadmin.jpeg'
import pic6 from '../Images/pic6.jpeg'

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(135deg, #ffffff 60%, #e6f4e6);
  padding: 6rem 2rem 4rem 2rem;
  text-align: center;
  color: #228b22;
  border-bottom: 5px solid #ff6f00;
  background-image:url(${pic6});
  background-size:cover;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  }

  p {
    font-size: 1.2rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 3.2rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
`;

// Staff Layout
const StaffWrapper = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const StaffCard = styled.div`
  background: #ffffff;
  border: 2px solid #e0f7e0;
  border-left: 6px solid #ff6f00;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 128, 0, 0.5);
  text-align: center;
  animation: fadeIn 0.7s ease-in;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0, 128, 0, 0.15);
  }

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 4px solid #e0f7e0;
  }

  h2 {
    color: #228b22;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1rem;
    color: #ff6f00;
    margin-bottom: 0.3rem;
  }

  p {
    color: #333;
    font-size: 0.95rem;
  }
`;

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const StaffTeam = () => {
  return (
    <>
      <style>{fadeIn}</style>

      <HeroSection>
        <h1>Our Staff Team</h1>
        <p>The dedicated team leading CWMSR toward a cleaner, sustainable future.</p>
      </HeroSection>

      <StaffWrapper>
        <StaffCard>
          <img src={director2} alt="Dr. Akinyemi O. Ogunkeyede" />
          <h2>Dr Akinyemi Olufemi Ogunkeyede</h2>
          <h4>Acting Director</h4>
          <h5 style={{color:"#333"}}>Fellow-NSLP, Fellow-TETFAiR, MNES,MCSN</h5>
          {/* <p>Director, CWMSR FUPRE</p>  */}
        </StaffCard>

        <StaffCard>
          <img src={deputydirector} alt="Dr. Ozioma Nduagu" />
          <h2>Dr. Ozioma Nduagu</h2>
          <h4>Deputy Director</h4>
          {/* <p>Deputy Director, CWMSR</p> */}
        </StaffCard>

        <StaffCard>
          <img src={headadmin} alt="Miss Enyioko Ivy" />
          <h2>Miss Enyioko Ivy</h2>
          <h4>Head Admin & Collaboration</h4>
          {/* <p>Head Admin 2</p> */}
        </StaffCard>
      </StaffWrapper>
    </>
  );
};

export default StaffTeam;
