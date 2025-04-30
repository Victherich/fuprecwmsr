
import React from 'react';
import styled from 'styled-components';
import heroImage from '../Images/ggg9.jpg'; // Add a hero image to your Images folder

const PageContainer = styled.div`
  font-family: 'Segoe UI', sans-serif;
  color: #1f2937;
`;

const Hero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url(${heroImage}) center/cover no-repeat;
  color: white;
  padding: 5rem 1rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 5px #000;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const HeroText = styled.p`
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #064e3b;
  margin-bottom: 2rem;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const CourseCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  border-left: 5px solid #065f46;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }
`;

const CTASection = styled.section`
  background: #e6f4ec;
  text-align: center;
  padding: 3rem 1rem;
`;

const CTAButton = styled.a`
  background: #065f46;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  display: inline-block;
  margin-top: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover {
    background: #047857;
  }
`;

const ContactInfo = styled.section`
  background: #d1fae5;
  padding: 2rem 1rem;
  font-size: 0.95rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    text-align: left;
  }
`;

const ContactBlock = styled.div`
  h4 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  a {
    color: #064e3b;
    text-decoration: underline;
  }
`;

const ShortCoursesPage = () => {
  const courses = [
    "Petroleum Waste Management",
    "Environmental Impact Assessment (EIA) in Oil and Gas",
    "Health, Safety, and Environmental (HSE) Management in Oil and Gas",
    "Sustainable Resource Management in Oil and Gas",
    "Oil Spill Response and Remediation",
    "Drilling Waste Management",
    "Wastewater Treatment in the Oil and Gas Industry",
    "Air Quality Management in Oil and Gas Operations",
    "Hazardous Waste Management in Oil and Gas",
    "Environmental Compliance and Auditing in the Oil and Gas Sector",
    "Carbon Capture and Storage (CCS) in the Oil and Gas Industry",
    "Fire and Emergency Response in Oil and Gas",
    "Offshore and Onshore Waste Management",
    "Remediation of Contaminated Sites in Oil and Gas",
    "Oil and Gas Environmental Law and Policy",
    "Energy Efficiency and Waste Minimization in Oil and Gas Operations",
    "Pipeline Integrity and Environmental Protection",
    "Advanced Monitoring Technologies for Environmental Management",
    "Life Cycle Assessment (LCA) in Oil and Gas Projects",
    "Waste Heat Recovery and Utilization in Oil and Gas Facilities",
    "Non-Destructive Testing Training for Oil and Gas Sector"
  ];

  return (
    <PageContainer>
      <Hero>
        <HeroTitle>CWMSR Short Courses</HeroTitle>
        <HeroSubtitle>Innovate. Transform. Lead.</HeroSubtitle>
        <HeroText>
          Industry-relevant training & certifications | Hands-on sessions & mentorship | Solutions for sustainability in the Oil & Gas Sector
        </HeroText>
      </Hero>

      <Section>
        <SectionTitle>Professional Training Courses</SectionTitle>
        <CoursesGrid>
          {courses.map((course, index) => (
            <CourseCard key={index}>{course}</CourseCard>
          ))}
        </CoursesGrid>
      </Section>

      {/* <CTASection>
        <h3 className="text-xl font-semibold mb-2">Get Started Today!</h3>
        <p>Join our flexible learning programs – Online & In-Person options available</p>
        <CTAButton href="mailto:wmsr@fupre.edu.ng">Register Now</CTAButton>
      </CTASection> */}

      {/* <ContactInfo>
        <ContactBlock>
          <h4>Call/WhatsApp</h4>
          <p>+234 903 022 3041</p>
          <p>+234 908 107 2955</p>
        </ContactBlock>
        <ContactBlock>
          <h4>Email</h4>
          <p>wmsr@fupre.edu.ng</p>
        </ContactBlock>
        <ContactBlock>
          <h4>Website</h4>
          <a href="https://cwmsrfupre.com.ng" target="_blank" rel="noreferrer">
            cwmsrfupre.com.ng
          </a>
        </ContactBlock>
      </ContactInfo> */}
    </PageContainer>
  );
};

export default ShortCoursesPage;
