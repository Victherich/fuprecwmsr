import React from 'react';
import styled from 'styled-components';

const ShortCourses = () => {
  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <h1>📚 Short Courses & Certificate Programs</h1>
        <p>CWMSR offers a variety of short courses and professional certificates tailored for individuals seeking to upgrade their knowledge in specific areas of environmental management, oil and gas, and sustainable development, including:</p>
      </HeroSection>

      {/* Short Courses Section */}
      <Content>
        <Section>
          <h2>🔬 Short Courses Relevant to Oil & Gas</h2>
          <ul>
            <li>Petroleum Waste Management</li>
            <li>Environmental Impact Assessment (EIA) in Oil and Gas</li>
            <li>Health, Safety, and Environmental (HSE) Management in Oil and Gas</li>
            <li>Sustainable Resource Management in Oil and Gas</li>
            <li>Oil Spill Response and Remediation</li>
            <li>Drilling Waste Management</li>
            <li>Wastewater Treatment in the Oil and Gas Industry</li>
            <li>Air Quality Management in Oil and Gas Operations</li>
            <li>Hazardous Waste Management in Oil and Gas</li>
            <li>Environmental Compliance and Auditing in the Oil and Gas Sector</li>
            <li>Carbon Capture and Storage (CCS) in the Oil and Gas Industry</li>
            <li>Fire and Emergency Response in Oil and Gas</li>
            <li>Offshore and Onshore Waste Management</li>
            <li>Remediation of Contaminated Sites in Oil and Gas</li>
            <li>Oil and Gas Environmental Law and Policy</li>
            <li>Energy Efficiency and Waste Minimization in Oil and Gas Operations</li>
            <li>Pipeline Integrity and Environmental Protection</li>
            <li>Advanced Monitoring Technologies for Environmental Management</li>
            <li>Life Cycle Assessment (LCA) in Oil and Gas Projects</li>
            <li>Waste Heat Recovery and Utilization in Oil and Gas Facilities</li>
            <li>Non-Destructive Testing Training for Oil and Gas Sector</li>
          </ul>
        </Section>

        <Section>
          <h2>🌍 Short Courses in General Waste Management (WM)</h2>
          <ul>
            <li>Fundamentals of Waste Management</li>
            <li>Solid Waste Management and Recycling</li>
            <li>Composting and Organic Waste Management</li>
            <li>E-Waste Management and Recycling</li>
            <li>Hazardous Waste Management</li>
            <li>Waste Minimization and Pollution Prevention</li>
            <li>Integrated Waste Management Systems</li>
            <li>Biodegradable Waste Treatment Technologies</li>
            <li>Marine and Coastal Waste Management</li>
            <li>Waste Management Policy and Legislation</li>
            <li>Resource Recovery from Waste</li>
            <li>Life Cycle Assessment (LCA) for Waste Management</li>
            <li>Waste to Energy Technologies</li>
            <li>Community-Based Waste Management</li>
            <li>Circular Economy and Waste Management</li>
            <li>Plastic Waste Management and Recycling</li>
            <li>Industrial Waste Management</li>
            <li>Municipal Solid Waste Management</li>
            <li>Waste Management in Healthcare Facilities</li>
            <li>Advanced Sorting and Separation Technologies</li>
          </ul>
        </Section>
      </Content>
    </Container>
  );
};





 const Container = styled.div`
  padding: 40px;
  background-color: #f4f7f9;
  text-align: center;
`;

 const HeroSection = styled.div`
  background: #2d6187;
  color: white;
  padding: 50px 20px;
  border-radius: 10px;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  background: white;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color:darkorange;
  }

  ul {
    padding-left: 20px;
    list-style-type: none;
  }

  ul li {
    font-size: 1rem;
    padding: 5px 0;
    position: relative;
  }

  ul li::before {
    content: "✔";
    color: #2d6187;
    font-weight: bold;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;


export default ShortCourses;
