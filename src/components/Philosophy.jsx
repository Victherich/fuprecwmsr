import React from "react";
import styled from "styled-components";
import { FaEye, FaBook, FaGlobe, FaUniversity } from "react-icons/fa";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
  margin-top: 30px;
  

  @media(max-width:768px){
   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  text-align: left;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  color: orangered;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: green;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
`;

const Philosophy = () => {
  return (
    <Container>
      <h1 style={{ color: "orangered", fontSize: "2.5rem", fontWeight: "bold" }}>🌍 Our Philosophy & Mission</h1>
      <Grid>
        {/* Philosophy Card */}
        <Card>
          <Icon><FaBook /></Icon>
          <Title>Philosophy of the Programmes 📖</Title>
          <Text>
            Our programmes train graduates from diverse disciplines to the highest standards in identifying, 
            understanding, and resolving environmental issues. We focus on developing skilled professionals 
            for public, private, and international organizations, particularly in the oil, gas, and allied industries.
          </Text>
        </Card>

        {/* Vision Card */}
        <Card>
          <Icon><FaEye /></Icon>
          <Title>Our Vision 👀</Title>
          <Text>
            We aim to develop competent environmentalists skilled in industrial applications, 
            providing innovative solutions to environmental challenges in the oil, gas, and allied industries.
          </Text>
        </Card>

        {/* Core Values Card */}
        <Card>
          <Icon><FaGlobe /></Icon>
          <Title>Core Values 🌟</Title>
          <Text>
            We uphold Excellence, Integrity, Commitment, and Relevance in all our academic and research activities.
          </Text>
        </Card>

        {/* Mission Card */}
        <Card>
          <Icon><FaUniversity /></Icon>
          <Title>Mission of the University 🎓</Title>
          <Text>
            👉 Create top-quality human resources for the oil, gas, and energy industries. <br />
            👉 Deliver cutting-edge education and training for professionals. <br />
            👉 Engage in research, consultancy, and development for oil and gas sector growth. <br />
            👉 Promote economic development through education, training, and outreach.
          </Text>
        </Card>
      </Grid>
    </Container>
  );
};

export default Philosophy;
